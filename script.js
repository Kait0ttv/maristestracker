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

    // Ajouter la section des commentaires à la carte photo
    const commentsSection = document.createElement("div");
    commentsSection.className = "comments-section";

    const commentsTitle = document.createElement("h3");
    commentsTitle.textContent = "Commentaires";
    commentsSection.appendChild(commentsTitle);

    const commentsList = document.createElement("div");
    commentsList.className = "comments-list";
    commentsSection.appendChild(commentsList);

    const commentInput = document.createElement("textarea");
    commentInput.className = "comment-input";
    commentInput.placeholder = "Ajouter un commentaire...";
    commentsSection.appendChild(commentInput);

    const submitCommentButton = document.createElement("button");
    submitCommentButton.className = "submit-comment";
    submitCommentButton.textContent = "Envoyer";

    // Ajout de l'événement de soumission de commentaire
    submitCommentButton.addEventListener('click', function() {
        const commentText = commentInput.value;
        if (commentText) {
            const commentBox = document.createElement("div");
            commentBox.className = "comment-box";
            commentBox.textContent = commentText;
            commentsList.appendChild(commentBox);
            commentInput.value = ''; // Réinitialiser le champ de saisie
        }
    });

    commentsSection.appendChild(submitCommentButton);

    // Ajouter les éléments à la carte photo
    photoCard.appendChild(img);
    photoCard.appendChild(captionElement);
    photoCard.appendChild(pseudoElement);
    photoCard.appendChild(commentsSection);

    gallery.appendChild(photoCard);

    // Réinitialiser les événements d'agrandissement après ajout de la photo
    initializePhotoCardEvents();
}

// Fonction pour agrandir l'image
function enlargeImage(imgSrc) {
    // Créer un élément pour le fond sombre
    const background = document.createElement('div');
    background.className = 'enlarged-background';
    background.addEventListener('click', () => {
        document.body.removeChild(background);
        document.body.removeChild(enlargedImage);
    });
    document.body.appendChild(background);

    // Créer l'élément pour l'image agrandie
    const enlargedImage = document.createElement('img');
    enlargedImage.src = imgSrc;
    enlargedImage.className = 'enlarged-image';
    enlargedImage.addEventListener('click', () => {
        document.body.removeChild(background);
        document.body.removeChild(enlargedImage);
    });
    document.body.appendChild(enlargedImage);
}

// Attacher l'événement d'agrandissement aux images
document.querySelectorAll('.photo-card img').forEach(img => {
    img.addEventListener('click', (event) => {
        enlargeImage(event.target.src);
    });
});
