function ajustarMenu() {
  const dropdowns = document.querySelectorAll('.navbar-item.has-dropdown');

  dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector('.navbar-dropdown');
    const link = dropdown.querySelector('.navbar-link');

    if (!dropdownMenu || !link) return;

    const originalDisplay = dropdownMenu.style.display;
    const originalVisibility = dropdownMenu.style.visibility;

    dropdownMenu.style.display = 'block';
    dropdownMenu.style.visibility = 'hidden';

    const items = dropdownMenu.querySelectorAll('.navbar-item');
    let maxWidth = 0;
    items.forEach(item => {
      const width = item.offsetWidth;
      if (width > maxWidth) maxWidth = width;
    });

    link.style.width = maxWidth + 'px';
    dropdownMenu.style.minWidth = maxWidth + 'px';

    dropdownMenu.style.display = originalDisplay;
    dropdownMenu.style.visibility = originalVisibility;
  });
}

function alinharLinks() {
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.style.gap = '8px';
  });
}

function initMenu() {
  alinharLinks();
  ajustarMenu();
}

window.addEventListener('load', initMenu);
window.addEventListener('resize', ajustarMenu);