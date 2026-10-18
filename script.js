
/* =========================
   SELECT ELEMENTS
========================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const imageCounter =
    document.getElementById("imageCounter");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const searchBtn =
    document.getElementById("searchBtn");


/* =========================
   VARIABLES
========================= */

let visibleImages = [];

let currentIndex = 0;


/* =========================
   UPDATE VISIBLE IMAGES
========================= */

function updateVisibleImages() {

    visibleImages = Array.from(galleryItems)
        .filter(item => {
            return !item.classList.contains("hide");
        });

}


/* =========================
   FILTER GALLERY
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        this.classList.add("active");

        // Get category
        const filter =
            this.getAttribute("data-filter");


        // Filter images
        galleryItems.forEach(item => {

            const category =
                item.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });


        updateVisibleImages();

    });

});


/* =========================
   OPEN LIGHTBOX
========================= */

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        updateVisibleImages();

        currentIndex =
            visibleImages.indexOf(this);

        showImage();

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


/* =========================
   SHOW IMAGE
========================= */

function showImage() {

    if (visibleImages.length === 0) {
        return;
    }

    const image =
        visibleImages[currentIndex]
        .querySelector("img");


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;


    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;

}


/* =========================
   NEXT IMAGE
========================= */

nextBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage();

});


/* =========================
   PREVIOUS IMAGE
========================= */

prevBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex =
            visibleImages.length - 1;
    }

    showImage();

});


/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}


closeBtn.addEventListener(
    "click",
    closeLightbox
);


/* =========================
   CLOSE OUTSIDE IMAGE
========================= */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("show")) {
        return;
    }


    if (event.key === "ArrowRight") {

        nextBtn.click();

    }


    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }


    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("show");

});


/* Close mobile menu after clicking link */

document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

        });

    });


/* =========================
   SEARCH BUTTON
========================= */

searchBtn.addEventListener("click", function () {

    const searchTerm =
        prompt("Search gallery category:");

    if (!searchTerm) {
        return;
    }


    const search =
        searchTerm.toLowerCase().trim();


    let found = false;


    galleryItems.forEach(item => {

        const category =
            item.getAttribute("data-category")
            .toLowerCase();


        const title =
            item.querySelector("h3")
            .textContent
            .toLowerCase();


        if (
            category.includes(search) ||
            title.includes(search)
        ) {

            item.classList.remove("hide");

            found = true;

        } else {

            item.classList.add("hide");

        }

    });


    updateVisibleImages();


    if (!found) {

        alert("No matching images found.");

        galleryItems.forEach(item => {
            item.classList.remove("hide");
        });

        updateVisibleImages();

    }

});


/* =========================
   INITIAL SETUP
========================= */

updateVisibleImages();