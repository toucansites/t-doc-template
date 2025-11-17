let __lastFocusedBeforeModal = null;
window.__activeIndex = -1;
function escapeHTML(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
function debounce(fn, wait = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
document.addEventListener('DOMContentLoaded', function () {
  function setupSearchListeners() {
    let activeIndex = -1;
    function getItems() {
      return Array.from(document.querySelectorAll('.result-item'));
    }
    function updateActive(items) {
      items.forEach((el, i) => {
        const isActive = i === activeIndex;
        el.classList.toggle('active', isActive);
        el.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      // Ensure the active item is scrolled into view
      const current = items[activeIndex];
      if (current && typeof current.scrollIntoView === 'function') {
        current.scrollIntoView({ block: 'nearest' });
      }
    }
    const searchInput = document.getElementById('search');
    const searchIcon = document.getElementById('search-icon');

    if (!searchInput || !searchIcon) {
      console.warn(
        'searchInput or searchIcon not found, please try again after the modal loads.'
      );
      return;
    }
    let currentRequestId = 0;
    let currentAbortController = null;

    function updateIcon() {
      if (searchInput.value.trim() === '') {
        searchIcon.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
          `;
      } else {
        searchIcon.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="clear-search" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
          `;

        const clearIcon = document.getElementById('clear-search');
        if (clearIcon) {
          clearIcon.style.cursor = 'pointer';
        }
      }
    }

    searchInput.addEventListener('input', updateIcon);

    searchIcon.addEventListener('click', function (event) {
      const clear = event.target.closest('#clear-search');
      if (clear) {
        searchInput.value = '';
        updateIcon();
        searchInput.focus();
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
          resultsContainer.innerHTML = '';
        }
      }
    });

    const runSearch = async () => {
      updateIcon();

      const query = searchInput.value.trim();
      const resultsContainer = document.getElementById('search-results');
      if (!resultsContainer) return;

      // Cancel any previous in-flight search
      currentRequestId += 1;
      const requestId = currentRequestId;
      if (currentAbortController) {
        try {
          currentAbortController.abort();
        } catch (_) {}
      }
      // If query too short, clear and bail early
      if (query.length <= 1 || !window.searchDocs) {
        resultsContainer.innerHTML = '';
        activeIndex = -1;
        window.__activeIndex = -1;
        resultsContainer.setAttribute('aria-activedescendant', '');
        return;
      }

      // New controller for this request (in case searchDocs uses fetch/signal internally)
      currentAbortController =
        typeof AbortController !== 'undefined' ? new AbortController() : null;

      try {
        const maybeOpts = currentAbortController
          ? { signal: currentAbortController.signal }
          : undefined;
        const results = await window.searchDocs(query, maybeOpts);

        // If a newer request started, ignore this result
        if (requestId !== currentRequestId) return;

        //console.log('Search results:', results);
        if (!Array.isArray(results) || results.length === 0) {
          resultsContainer.innerHTML = `
            <div class="no-results">
              <span>No results for '${escapeHTML(query)}'</span>
              <img src="/images/search_emptystate.png" alt="No results illustration">
            </div>
          `;
          activeIndex = -1;
          window.__activeIndex = -1;
          resultsContainer.setAttribute('aria-activedescendant', '');
          return;
        }

        const findSnippetWithQuery = (text, query) => {
          // Convert block-level tags to spaces first, then strip the rest and normalize whitespace
          const clean = text
            .replace(
              /<\/?(p|br|div|section|article|h[1-6]|li|ul|ol|blockquote|pre|code|table|tr|td|th|hr)[^>]*>/gi,
              ' '
            )
            .replace(/<\/?[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          if (!query) return '';

          const hay = clean.toLowerCase();
          const needle = query.toLowerCase();
          const idx = hay.indexOf(needle);
          if (idx === -1) return '';

          const preRadius = 20; // ~20 char before the hit
          const snippetLen = 70; // total snippet length

          let start = Math.max(0, idx - preRadius);
          // Try to snap start to previous whitespace (word boundary)
          const before = clean.slice(0, start);
          const lastSpace = Math.max(
            before.lastIndexOf(' '),
            before.lastIndexOf('\n'),
            before.lastIndexOf('\t')
          );
          if (lastSpace !== -1) {
            start = lastSpace + 1;
          }

          let end = start + snippetLen;
          // Ensure the snippet covers the whole match
          const matchEnd = idx + needle.length;
          if (end < matchEnd) {
            end = matchEnd;
          }
          if (end > clean.length) {
            end = clean.length;
          }

          let core = clean.slice(start, end).trim();
          const hasLeading = start > 0;
          const hasTrailing = end < clean.length;
          let snip =
            (hasLeading ? '… ' : '') + core + (hasTrailing ? ' …' : '');

          // Escape HTML first, then safely highlight the query occurrences
          const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const escapedSnippet = escapeHTML(snip);
          const re = new RegExp(`(${escapeRegExp(query)})`, 'ig');
          return escapedSnippet.replace(re, '<strong>$1</strong>');
        };

        const html = results
          .map((item, i) => {
            const snippet =
              findSnippetWithQuery(item.contents.html || '', query) ||
              findSnippetWithQuery(item.description || '', query) ||
              '';

            return `
                <div id="result-item-${i}" class="result-item" role="option" aria-selected="false" tabindex="-1" data-slug="${escapeHTML(
              item.slug
            )}">
                    <h1>${escapeHTML(item.title || item.slug)}</h1>
                    <p>${snippet}</p>
                </div>
              `;
          })
          .join('');

        resultsContainer.innerHTML =
          html + '<div class="scroll-gradient"></div>';
        activeIndex = -1;
        window.__activeIndex = -1;
        resultsContainer.setAttribute('aria-activedescendant', '');
      } catch (err) {
        // Ignore abort errors quietly
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return;
        }
        console.error('Search error:', err);
      }
    };

    // Debounced input listener
    const debouncedSearch = debounce(runSearch, 250);
    searchInput.addEventListener('input', debouncedSearch);

    searchInput.addEventListener('keydown', (e) => {
      const items = getItems();
      if (e.key === 'ArrowDown') {
        if (items.length) {
          activeIndex = (activeIndex + 1) % items.length;
          updateActive(items);
        }
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        if (items.length) {
          activeIndex = (activeIndex - 1 + items.length) % items.length;
          updateActive(items);
        }
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && items[activeIndex]) {
          items[activeIndex].click();
          e.preventDefault();
        }
      } else if (e.key === 'Escape') {
        closeModal();
        e.preventDefault();
      }
    });

    document.addEventListener('click', function (e) {
      const target = e.target.closest('.result-item');
      if (target && target.dataset.slug) {
        const baseUrl = window.__BASE_URL__;
        window.location.href = baseUrl + '/' + target.dataset.slug + '/';
      }
    });

    updateIcon();
  }

  function openModal() {
    __lastFocusedBeforeModal = document.activeElement;
    if (document.getElementById('custom-modal')) return;

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'custom-modal';
    modalOverlay.className = 'modal-overlay';

    modalOverlay.innerHTML = `
        <div class="modal-content" role="dialog" aria-modal="true" tabindex="-1">
            <div class="search-container">
              <div class="search-box">
                  <span id="search-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                  </span>
                  <input placeholder="Search..." autocomplete="off" id="search" type="input">
              </div>
              <div id="search-results" class="search-results" role="listbox" aria-label="Search results"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.focus();
      }
    }, 50);

    modalOverlay.addEventListener('click', function (event) {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });

    setupSearchListeners();

    const handleArrows = (e) => {
      const searchInputEl = document.getElementById('search');
      const items = Array.from(document.querySelectorAll('.result-item'));
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'Enter' ||
        e.key === 'Escape'
      ) {
        // Ensure the input keeps focus so typing works
        if (searchInputEl && document.activeElement !== searchInputEl) {
          searchInputEl.focus();
        }
      }
      if (e.key === 'ArrowDown') {
        if (items.length) {
          if (typeof window.__activeIndex === 'number') {
            window.__activeIndex = (window.__activeIndex + 1) % items.length;
          } else {
            window.__activeIndex = 0;
          }
          items.forEach((el, i) => {
            const isActive = i === window.__activeIndex;
            el.classList.toggle('active', isActive);
            el.setAttribute('aria-selected', isActive ? 'true' : 'false');
          });
          items[window.__activeIndex].scrollIntoView({ block: 'nearest' });
        }
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        if (items.length) {
          if (typeof window.__activeIndex === 'number') {
            window.__activeIndex =
              (window.__activeIndex - 1 + items.length) % items.length;
          } else {
            window.__activeIndex = items.length - 1;
          }
          items.forEach((el, i) => {
            const isActive = i === window.__activeIndex;
            el.classList.toggle('active', isActive);
            el.setAttribute('aria-selected', isActive ? 'true' : 'false');
          });
          items[window.__activeIndex].scrollIntoView({ block: 'nearest' });
        }
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (
          typeof window.__activeIndex === 'number' &&
          items[window.__activeIndex]
        ) {
          items[window.__activeIndex].click();
          e.preventDefault();
        }
      } else if (e.key === 'Escape') {
        closeModal();
        e.preventDefault();
      }
    };
    modalOverlay.addEventListener('keydown', handleArrows);

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modalOverlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusable).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      );
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    modalOverlay.addEventListener('keydown', trap);
  }

  function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
      if (
        __lastFocusedBeforeModal &&
        typeof __lastFocusedBeforeModal.focus === 'function'
      ) {
        __lastFocusedBeforeModal.focus();
      }
    }
  }

  const modalBtn = document.getElementById('open-modal-btn');
  if (modalBtn) {
    modalBtn.addEventListener('click', openModal);
  }

  const modalBtnMobile = document.getElementById('open-modal-btn-mobile');
  if (modalBtnMobile) {
    modalBtnMobile.addEventListener('click', openModal);
  }

  const images = document.querySelectorAll('article img');
    images.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        window.open(img.src, '_blank');
      });
    });

});
