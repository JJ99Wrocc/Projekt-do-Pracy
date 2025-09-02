document.addEventListener("DOMContentLoaded", () => {
  const offcanvasTitle = document.querySelector("#offcanvasMainTitle .title-text");
  const backIcon = document.getElementById("backIcon");
  const mainMenu = document.querySelector(".mainmenu");
  const submenus = document.querySelectorAll(".submenu");
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  let menuStack = []; // historia wejść w menu

  function hideAll() {
    submenus.forEach(sm => sm.style.display = "none");
    mainMenu.style.display = "none";
  }

  function updateTitle(title) {
    offcanvasTitle.textContent = title;
  }

  function updateBackIcon() {
    backIcon.style.display = menuStack.length > 0 ? "inline-block" : "none";
  }

  // Klik w link do submenu
  submenuToggles.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");

      hideAll();
      document.getElementById(targetId).style.display = "block";

      menuStack.push({
        id: targetId,
        title: link.textContent.trim()
      });

      updateTitle(link.textContent.trim());
      updateBackIcon();
    });
  });

  // Klik w nagłówek (strzałka lub napis)
  document.getElementById("offcanvasMainTitle").addEventListener("click", () => {
    if (menuStack.length === 0) return;

    const current = menuStack.pop(); // zamknij obecny poziom
    document.getElementById(current.id).style.display = "none";

    if (menuStack.length === 0) {
      mainMenu.style.display = "block"; // wróć do głównego
      updateTitle("Menu");
    } else {
      const prev = menuStack[menuStack.length - 1]; // pokaż poprzednie
      document.getElementById(prev.id).style.display = "block";
      updateTitle(prev.title);
    }

    updateBackIcon();
  });
});






document.addEventListener("DOMContentLoaded", () => {
  // NAV
  fetch('./components/nav.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('nav-placeholder').innerHTML = data;
    });

  // HEADER
  fetch('./components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    });
});
