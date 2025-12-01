// menu.js

function ajustarMenu() {
  const dropdowns = document.querySelectorAll('.navbar-item.has-dropdown');

  dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector('.navbar-dropdown');
    const link = dropdown.querySelector('.navbar-link');

    if (!dropdownMenu || !link) return;

    // Salva estilos atuais
    const originalDisplay = dropdownMenu.style.display;
    const originalVisibility = dropdownMenu.style.visibility;

    // Torna o dropdown visível temporariamente para medir
    dropdownMenu.style.display = 'block';
    dropdownMenu.style.visibility = 'hidden';

    // Mede o maior item do dropdown
    const items = dropdownMenu.querySelectorAll('.navbar-item');
    let maxWidth = 0;
    items.forEach(item => {
      const width = item.offsetWidth;
      if (width > maxWidth) maxWidth = width;
    });

    // Aplica a largura no link e no dropdown
    link.style.width = maxWidth + 'px';
    dropdownMenu.style.minWidth = maxWidth + 'px';

    // Restaura estilos originais
    dropdownMenu.style.display = originalDisplay;
    dropdownMenu.style.visibility = originalVisibility;
  });
}

// Alinha ícones e textos dos links principais
function alinharLinks() {
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.style.gap = '8px';
  });
}

// Inicializa
function initMenu() {
  alinharLinks();
  ajustarMenu();
}

window.addEventListener('load', initMenu);
window.addEventListener('resize', ajustarMenu);
