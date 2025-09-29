document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('#navigation .menu-items a');
  const currentPath = window.location.pathname.toLowerCase();

  links.forEach(link => {
      const linkText = link.textContent.trim().toLowerCase();
      if (currentPath.includes(linkText)) {
        link.classList.add('active');
      } else if (currentPath == "/" && linkText == "docs") {
        link.classList.add('active');
      }
  });

});
