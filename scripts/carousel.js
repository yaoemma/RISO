// Script simple pour le carrousel multimédia RISO
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script carrousel chargé');
    
    // Récupération des éléments
    const track = document.querySelector('.media-track');
    const items = document.querySelectorAll('.media-item');
    const prevBtn = document.getElementById('mediaPrevBtn');
    const nextBtn = document.getElementById('mediaNextBtn');
    const indicators = document.querySelectorAll('.media-carousel .indicator');
    
    console.log('Track:', track);
    console.log('Items:', items.length);
    console.log('PrevBtn:', prevBtn);
    console.log('NextBtn:', nextBtn);
    console.log('Indicators:', indicators.length);
    
    if (!track || items.length === 0) {
        console.error('Éléments carrousel non trouvés');
        return;
    }
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Fonction pour afficher un élément
    function showItem(index) {
        console.log('Affichage item:', index);
        
        // Masquer tous les éléments
        items.forEach(item => {
            item.classList.remove('active');
        });
        
        // Afficher l'élément actif
        items[index].classList.add('active');
        
        // Mettre à jour les indicateurs
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Mettre à jour la position du track
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Gestion des vidéos
        items.forEach((item, i) => {
            const video = item.querySelector('video');
            if (video) {
                if (i === index) {
                    console.log('Lecture vidéo item:', i);
                    video.play().catch(e => console.log('Erreur lecture vidéo:', e));
                } else {
                    console.log('Pause vidéo item:', i);
                    video.pause();
                }
            }
        });
    }
    
    // Fonction pour l'élément suivant
    function nextItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
    }
    
    // Fonction pour l'élément précédent
    function prevItem() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(currentIndex);
    }
    
    // Événements pour les boutons
    if (prevBtn) {
        console.log('Ajout événement prevBtn');
        prevBtn.addEventListener('click', function() {
            console.log('Clic bouton précédent');
            prevItem();
        });
    }
    
    if (nextBtn) {
        console.log('Ajout événement nextBtn');
        nextBtn.addEventListener('click', function() {
            console.log('Clic bouton suivant');
            nextItem();
        });
    }
    
    // Événements pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log('Clic indicateur:', index);
            currentIndex = index;
            showItem(currentIndex);
        });
    });
    
    // Carrousel automatique
    let autoPlayInterval = setInterval(nextItem, 5000);
    
    // Pause au survol
    track.addEventListener('mouseenter', function() {
        console.log('Pause carrousel');
        clearInterval(autoPlayInterval);
    });
    
    // Reprise après le survol
    track.addEventListener('mouseleave', function() {
        console.log('Reprise carrousel');
        autoPlayInterval = setInterval(nextItem, 5000);
    });
    
    // Initialisation
    console.log('Initialisation carrousel');
    showItem(0);
    
    // Test des boutons
    console.log('Test des boutons...');
    if (prevBtn) prevBtn.style.border = '2px solid red';
    if (nextBtn) nextBtn.style.border = '2px solid blue';
});
