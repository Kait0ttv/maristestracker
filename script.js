// script.js

// Fonction pour initialiser les événements d'agrandissement sur les cartes photo
function initializePhotoCardEvents() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            
            // Retirer la classe 'expanded' de toutes les cartes
            photoCards.forEach(c => c.classList.remove('expanded'));
            
            // Ajouter la classe 'expanded' à la carte cliquée si elle n'était pas agrandie
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    });
}

// Attendre que le DOM soit complètement chargé avant d'attacher les événements
document.addEventListener('DOMContentLoaded', () => {
    // Gestion du formulaire de téléchargement
    document.getElementById("uploadForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const pseudo = document.getElementById("pseudo").value;
        const caption = document.getElementById("caption").value;
        const photoInput = document.getElementById("photo");

        if (photoInput.files.length > 0) {
            const photo = photoInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const photoURL = e.target.result;
                addPhotoToGallery(photoURL, pseudo, caption);
            };

            reader.readAsDataURL(photo); 
        }
    });

    // Initialiser les événements sur les cartes photo au chargement
    initializePhotoCardEvents();
});

// Fonction pour ajouter une photo à la galerie
function addPhotoToGallery(photoURL, pseudo, caption) {
    const gallery = document.getElementById("gallery");

    const photoCard = document.createElement("div");
    photoCard.className = "photo-card";

    const img = document.createElement("img");
    img.src = photoURL;  
    img.alt = caption;

    const captionElement = document.createElement("p");
    captionElement.textContent = caption;

    const pseudoElement = document.createElement("p");
    pseudoElement.className = "pseudo";
    pseudoElement.textContent = "Publié par : " + pseudo;

    photoCard.appendChild(img);
    photoCard.appendChild(captionElement);
    photoCard.appendChild(pseudoElement);

    gallery.appendChild(photoCard);

    // Réinitialiser les événements d'agrandissement après ajout de la photo
    initializePhotoCardEvents();
}
