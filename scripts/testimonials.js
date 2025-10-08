// Script pour le carrousel des témoignages RISO
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script témoignages chargé');

    // Récupération des éléments
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    console.log('Track:', track);
    console.log('Cards:', cards.length);
    console.log('Indicators:', indicators.length);
    console.log('PrevBtn:', prevBtn);
    console.log('NextBtn:', nextBtn);

    if (!track || cards.length === 0) {
        console.error('Éléments témoignages non trouvés');
        return;
    }

    let currentIndex = 0;
    const totalCards = cards.length;

    // Fonction pour afficher une carte spécifique
    function showCard(index) {
        console.log('Affichage carte:', index);

        // Masquer toutes les cartes
        cards.forEach(card => {
            card.classList.remove('active');
        });

        // Afficher la carte active
        cards[index].classList.add('active');

        // Mettre à jour les indicateurs
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        // Mettre à jour la position du track
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Fonction pour passer à la carte suivante
    function nextCard() {
        currentIndex = (currentIndex + 1) % totalCards;
        showCard(currentIndex);
    }

    // Fonction pour passer à la carte précédente
    function prevCard() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        showCard(currentIndex);
    }

    // Événements pour les boutons
    if (prevBtn) {
        console.log('Ajout événement prevBtn');
        prevBtn.addEventListener('click', function() {
            console.log('Clic bouton précédent');
            prevCard();
        });
    }

    if (nextBtn) {
        console.log('Ajout événement nextBtn');
        nextBtn.addEventListener('click', function() {
            console.log('Clic bouton suivant');
            nextCard();
        });
    }

    // Événements pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log('Clic indicateur:', index);
            currentIndex = index;
            showCard(currentIndex);
        });
    });

    // Carrousel automatique
    let autoPlayInterval = setInterval(nextCard, 5000);

    // Pause au survol
    track.addEventListener('mouseenter', function() {
        console.log('Pause carrousel témoignages');
        clearInterval(autoPlayInterval);
    });

    // Reprise après le survol
    track.addEventListener('mouseleave', function() {
        console.log('Reprise carrousel témoignages');
        autoPlayInterval = setInterval(nextCard, 5000);
    });

    // Initialisation
    console.log('Initialisation carrousel témoignages');
    showCard(0);

    // Test des boutons
    console.log('Test des boutons témoignages...');
    if (prevBtn) prevBtn.style.border = '2px solid red';
    if (nextBtn) nextBtn.style.border = '2px solid blue';
});
