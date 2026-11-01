
const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

// =================================
// HAMBURGER MENU
// =================================

if (menuToggle && navMenu) {

    // Buka dan tutup menu
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Tutup menu setelah link diklik
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Tutup menu ketika area luar diklik
    document.addEventListener("click", (event) => {
        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    // Tutup menu dengan tombol Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

// =================================
// NAVBAR AUTO HIDE ON SCROLL
// =================================

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Navbar selalu terlihat di bagian paling atas
    if (currentScrollY <= 50) {
        header.classList.remove("nav-hidden");
    }

    // Sembunyikan saat scroll ke bawah
    else if (currentScrollY > lastScrollY) {
        header.classList.add("nav-hidden");

        // Tutup hamburger jika sedang terbuka
        if (navMenu && menuToggle) {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }

    // Munculkan saat scroll ke atas
    else if (currentScrollY < lastScrollY) {
        header.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
}, { passive: true });

// ================================
// SCROLL REVEAL ANIMATION
// ================================

// Aktifkan animasi jika JavaScript berjalan
document.documentElement.classList.add("js-enabled");

const revealElements = document.querySelectorAll(".reveal");

// Cek dukungan Intersection Observer
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            // Jalankan animasi ketika elemen terlihat
            if (entry.isIntersecting) {
                entry.target.classList.add("show");

                // Animasi hanya dijalankan sekali
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px"
    });

    // Pantau semua elemen dengan class reveal
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {
    // Fallback jika browser tidak mendukung
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}