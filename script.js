document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close');
    const backdrop = document.querySelector('.backdrop');
    const navLinks = mobileNav.querySelectorAll('a'); // Includes .nav__links and .number-mobile links

    // Toggle menu and backdrop when clicking hamburger
    hamburger.addEventListener('click', function() {
        const isOpen = this.classList.toggle('active');
        mobileNav.classList.toggle('active', isOpen);
        backdrop.classList.toggle('active', isOpen);
    });

    // Close menu and backdrop when clicking close button
    closeBtn.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        backdrop.classList.remove('active');
    });

    // Close menu and backdrop when clicking any link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            backdrop.classList.remove('active');
        });
    });

    // Close menu and backdrop when clicking outside or on backdrop
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !mobileNav.contains(event.target) && !closeBtn.contains(event.target)) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            backdrop.classList.remove('active');
        }
    });
});

// translations
const translations = {
  en: {
    "page-title": "Casa Pastel | The Best Bakery and Pastry Shop in Jaco, Costa Rica",
    "page-title-gallery": "Casa Pastel | Gallery",
    "nav-home": "Home",
    "nav-desserts": "Desserts",
    "nav-gallery": "Gallery",
    "nav-about": "About",
    "hero-title": "Cakes, <span class=\"accent\">sweet</span> tables for every occasion",
    "hero-title-accent": "sweet",
    "hero-description": "Variety, flavor, and art in every cake. We personalize your design with love and detail. Order today and reserve your date!",
    "hero-cta-reserve": "Reserve My Dessert",
    "hero-cta-menu": "View Menu",
    "hero-customers": "Over <strong>15,000</strong> happy customers",
    "postres-subtitle": "OUR",
    "postres-title": "DESSERTS",
    "card-lustre": "Buttercream Cakes",
    "card-tres-leches": "Tres Leches",
    "card-edible-prints": "Edible Prints",
    "card-strawberries": "Decorated Strawberries",
    "card-fondant": "Fondant Cakes",
    "card-cupcakes": "Decorated Cupcakes",
    "postres-gallery-btn": "View Gallery",
    "nosotros-title": "ABOUT <span class=\"accent\">CASA PASTEL</span>",
    "nosotros-title-accent": "CASA PASTEL",
    "nosotros-description": "At Casa Pastel, we’ve been sweetening special moments for over <strong>8 years</strong> with 100% personalized cakes tailored to your tastes and preferences.<br><br>We offer a wide variety of flavors, toppings, cupcakes, and complete event packages, perfect for those seeking a delicious and unique experience.",
    "nosotros-cta": "Reserve My Dessert",
    "footer-copyright": "Copyright © 2023 Casa Pastel. All rights reserved.",
    "gallery-btn": "Main Page"
  }
};

let currentLanguage = localStorage.getItem("language") || "es";
const originalTexts = {};

// Store original texts for elements with data-i18n
document.querySelectorAll("[data-i18n]").forEach(element => {
  const key = element.getAttribute("data-i18n");
  try {
    if (element.querySelector("img")) {
      const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
      originalTexts[key] = textNode ? textNode.textContent.trim() : element.textContent;
    } else {
      originalTexts[key] = element.innerHTML;
    }
  } catch (error) {
    console.error(`Error storing original text for key ${key}:`, error);
  }
});

function changeLanguage() {
  // Toggle language between 'es' and 'en'
  currentLanguage = currentLanguage === "es" ? "en" : "es";

  // Update all translatable elements
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    try {
      if (element.querySelector("img")) {
        const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
          textNode.textContent = (currentLanguage === "en" && translations.en[key]) ? translations.en[key] : originalTexts[key];
        }
      } else {
        element.innerHTML = (currentLanguage === "en" && translations.en[key]) ? translations.en[key] : originalTexts[key];
      }
    } catch (error) {
      console.error(`Error updating text for key ${key}:`, error);
    }
  });

  // Update flag in all toggle buttons
  document.querySelectorAll(".lang-toggle").forEach(btn => {
    try {
      const flagImg = btn.querySelector(".lang-flag");
      if (flagImg) {
        btn.setAttribute("data-lang", currentLanguage);
        flagImg.src = currentLanguage === "es" ? "assets/spain-flag.svg" : "assets/us-flag.svg";
        flagImg.alt = currentLanguage === "es" ? "Spain flag" : "US flag";
      }
    } catch (error) {
      console.error(`Error updating flag for button:`, error);
    }
  });

  // Update hero image source, class, and alt (for index.html)
  document.querySelectorAll(".hero-image, .hero-image-en").forEach(element => {
    try {
      if (currentLanguage === "en") {
        element.classList.remove("hero-image");
        element.classList.add("hero-image-en");
        element.src = element.getAttribute("data-lang-img-en") || element.src;
        element.alt = "Years of experience (English)";
      } else {
        element.classList.remove("hero-image-en");
        element.classList.add("hero-image");
        element.src = element.getAttribute("data-lang-img-es") || element.src;
        element.alt = "Years of experience (Spanish)";
      }
    } catch (error) {
      console.error(`Error updating hero image source, class, or alt:`, error);
    }
  });

  // Update review image source and alt (for index.html)
  document.querySelectorAll(".review-img").forEach(element => {
    try {
      if (currentLanguage === "en") {
        element.src = element.getAttribute("data-lang-img-en") || element.src;
        element.alt = "Review image (English)";
      } else {
        element.src = element.getAttribute("data-lang-img-es") || element.src;
        element.alt = "Review image (Spanish)";
      }
    } catch (error) {
      console.error(`Error updating review image source or alt:`, error);
    }
  });

  // Save the selected language to localStorage
  localStorage.setItem("language", currentLanguage);
  console.log(`Language saved to localStorage: ${currentLanguage}`);
}

document.addEventListener("DOMContentLoaded", () => {
  // Set initial flag for all toggle buttons
  document.querySelectorAll(".lang-toggle").forEach(btn => {
    try {
      const flagImg = btn.querySelector(".lang-flag");
      if (flagImg) {
        btn.setAttribute("data-lang", currentLanguage);
        flagImg.src = currentLanguage === "es" ? "assets/spain-flag.svg" : "assets/us-flag.svg";
        flagImg.alt = currentLanguage === "es" ? "Spain flag" : "US flag";
      }
    } catch (error) {
      console.error(`Error setting initial flag:`, error);
    }
  });

  // Set initial hero image source, class, and alt (for index.html)
  document.querySelectorAll(".hero-image, .hero-image-en").forEach(element => {
    try {
      if (currentLanguage === "en") {
        element.classList.remove("hero-image");
        element.classList.add("hero-image-en");
        element.src = element.getAttribute("data-lang-img-en") || element.src;
        element.alt = "Years of experience (English)";
      } else {
        element.classList.remove("hero-image-en");
        element.classList.add("hero-image");
        element.src = element.getAttribute("data-lang-img-es") || element.src;
        element.alt = "Years of experience (Spanish)";
      }
    } catch (error) {
      console.error(`Error setting initial hero image source, class, or alt:`, error);
    }
  });

  // Set initial review image source and alt (for index.html)
  document.querySelectorAll(".review-img").forEach(element => {
    try {
      if (currentLanguage === "en") {
        element.src = element.getAttribute("data-lang-img-en") || element.src;
        element.alt = "Review image (English)";
      } else {
        element.src = element.getAttribute("data-lang-img-es") || element.src;
        element.alt = "Review image (Spanish)";
      }
    } catch (error) {
      console.error(`Error setting initial review image source or alt:`, error);
    }
  });

  // Apply initial translations
  changeLanguage();

  // Add click event listeners to all toggle buttons
  document.querySelectorAll(".lang-toggle").forEach(btn => {
    try {
      btn.addEventListener("click", changeLanguage);
    } catch (error) {
      console.error(`Error adding event listener to toggle button:`, error);
    }
  });
});