$(document).ready(function() {
    // Initialisation de MauGallery
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top'
    });

    // Chargement du JSON pour le carousel
    fetch("assets/image.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const carouselInner = document.querySelector(".carousel-inner");
            const indicators = document.querySelector(".carousel-indicators");

            // Vider le carousel pour éviter les doublons
            carouselInner.innerHTML = "";
            indicators.innerHTML = "";

            data.carousel.forEach((image, index) => {
                // Créer les indicateurs
                const indicator = document.createElement("button");
                indicator.setAttribute("type", "button");
                indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
                indicator.setAttribute("data-bs-slide-to", index);
                indicator.setAttribute("aria-label", `Slide ${index + 1}`);
                if (index === 0) indicator.classList.add("active");

                indicators.appendChild(indicator);

                // Créer les éléments du carousel
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");
                if (index === 0) carouselItem.classList.add("active");

                const img = document.createElement("img");
                img.src = image.src;
                img.alt = image.alt;
                img.classList.add("d-block", "w-100");

                carouselItem.appendChild(img);
                carouselInner.appendChild(carouselItem);
            });
        })
        .catch(error => console.error("❌ Erreur lors du chargement des images :", error));
});
