// CozyChi Gift Store - script.js

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#navMenu") || document.querySelector("nav");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");

      const expanded = navMenu.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Product filtering
  const filterButtons = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll("[data-category]");

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        productCards.forEach((card) => {
          const category = card.dataset.category;
          const show = filter === "all" || category === filter;

          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  // Simple cart counter
  const cartButtons = document.querySelectorAll("[data-add-to-cart]");
  const cartCount = document.querySelector("[data-cart-count]");

  let cartItems = Number(
    localStorage.getItem("cozychiCartCount") || 0
  );

  const updateCart = () => {
    if (cartCount) {
      cartCount.textContent = cartItems;
      cartCount.hidden = cartItems === 0;
    }

    localStorage.setItem(
      "cozychiCartCount",
      String(cartItems)
    );
  };

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartItems += 1;
      updateCart();

      const originalText = button.textContent;

      button.textContent = "Added ✓";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);
    });
  });

  updateCart();

  // Current year
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!menuToggle || !navMenu) return;

    const clickedInsideMenu =
      navMenu.contains(event.target) ||
      menuToggle.contains(event.target);

    if (!clickedInsideMenu) {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});
