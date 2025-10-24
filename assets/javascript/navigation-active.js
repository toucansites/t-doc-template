document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('#navigation .menu-items a');
  const currentPath = window.location.pathname.toLowerCase();

  links.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    if (currentPath != "/404.html") {
      if (currentPath.includes(linkText) && !currentPath.includes("github")) {
        link.classList.add('active');
      } else if (linkText == "docs" && currentPath != "/license/") {
        link.classList.add('active');
      }
    } 
  });

});
