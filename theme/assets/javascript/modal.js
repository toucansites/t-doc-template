document.addEventListener('DOMContentLoaded', function () {
  function setupSearchListeners() {
    const searchInput = document.getElementById('search');
    const searchIcon = document.getElementById('search-icon');

    if (!searchInput || !searchIcon) {
      console.warn(
        'searchInput vagy searchIcon nem található, modal betöltése után próbálkozz újra.'
      );
      return;
    }

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
      if (event.target.id === 'clear-search') {
        searchInput.value = '';
        updateIcon();
        searchInput.focus();
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
          resultsContainer.innerHTML = '';
        }
      }
    });

    searchInput.addEventListener('input', async function () {
      updateIcon();

      const query = searchInput.value.trim();
      const resultsContainer = document.getElementById('search-results');
      resultsContainer.innerHTML = '';
      if (query.length > 1 && window.searchDocs) {
        const results = await window.searchDocs(query);
        console.log('Search results:', results);
        if (results.length === 0) {
          resultsContainer.innerHTML =
            '<p class="no-results">No results found.</p>';
        } else {
          const findSnippetWithQuery = (text, query) => {
            const clean = text.replace(/<\/?[^>]+(>|$)/g, '');
            const sentences = clean.split(/(?<=[.!?])\s+/); // sentences after . ! ?
            const lowerQuery = query.toLowerCase();

            for (const sentence of sentences) {
              const index = sentence.toLowerCase().indexOf(lowerQuery);
              if (index !== -1) {
                let snippet = sentence.slice(0, 70).trim() + ' ...';

                snippet = snippet.replace(
                  new RegExp(`(${query})`, 'i'),
                  '<strong>$1</strong>'
                );

                return snippet;
              }
            }

            return '';
          };

          const html = results
            .map((item) => {
              const snippet = findSnippetWithQuery(
                item.contents.html || '',
                query
              );

              return `
                <div class="result-item" data-slug="${item.slug.value}">
                    <h1>${item.title || item.slug}</h1>
                    <p>${snippet}</p>
                </div>
              `;
            })
            .join('');

          resultsContainer.innerHTML = html;
        }
      }
    });

    document.addEventListener('click', function (e) {
      const target = e.target.closest('.result-item');
      if (target && target.dataset.slug) {
        window.location.href = '/' + target.dataset.slug + '/';
      }
    });

    updateIcon();
  }

  function openModal() {
    if (document.getElementById('custom-modal')) return;

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'custom-modal';
    modalOverlay.className = 'modal-overlay';

    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="search-container">
              <div class="search-box">
                  <span id="search-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                  </span>
                  <input placeholder="Search..." autocomplete="off" id="search" type="input">
              </div>
              <div id="search-results" class="search-results"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

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
  }

  function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
      modal.remove();
    }
  }

  const modalBtn = document.getElementById('open-modal-btn');
  if (modalBtn) {
    modalBtn.addEventListener('click', openModal);
  }
});
