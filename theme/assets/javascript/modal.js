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
                <span id="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </span>
                <input placeholder="Search..." autocomplete="off" id="search" type="input">
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
