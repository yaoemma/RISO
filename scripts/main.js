// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar-main');

    // Effet de transparence au défilement
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe 'animate-on-scroll'
    document.querySelectorAll('.service-card, .feature-card, .event-card, .member-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Validation des formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                } else {
                    input.style.borderColor = '#2E78C0';
                    input.style.boxShadow = '0 0 0 3px rgba(46, 120, 192, 0.1)';
                }
            });
            
            if (isValid) {
                // Simulation d'envoi réussi
                showNotification('Formulaire envoyé avec succès !', 'success');
                form.reset();
            } else {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            }
        });
    });

    // Système de notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Styles pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Bouton de fermeture
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-fermeture après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Animations CSS pour les notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        .notification-close:hover {
            background: rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(style);

    // Compteur animé pour les statistiques
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Observer les statistiques pour déclencher l'animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                const target = parseInt(statNumber.textContent.replace(/[^\d]/g, ''));
                animateCounter(statNumber, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Effet de parallaxe pour la section hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Lazy loading pour les images (si ajoutées plus tard)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Fonction pour générer un QR code (simulation)
function generateQRCode() {
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    if (qrPlaceholder) {
        qrPlaceholder.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    0deg,
                    #000,
                    #000 2px,
                    transparent 2px,
                    transparent 4px
                ),
                repeating-linear-gradient(
                    90deg,
                    #000,
                    #000 2px,
                    transparent 2px,
                    transparent 4px
                );
                background-size: 8px 8px;
                border-radius: 10px;
            "></div>
        `;
        showNotification('QR Code généré avec succès !', 'success');
    }
}

// Fonction pour simuler la création d'événement
function createEvent() {
    showNotification('Fonctionnalité de création d\'événement en cours de développement...', 'info');
}

// Fonction pour simuler l'inscription à un événement
function registerForEvent(eventName) {
    showNotification(`Inscription à "${eventName}" en cours...`, 'info');
    setTimeout(() => {
        showNotification(`Inscription à "${eventName}" confirmée !`, 'success');
    }, 2000);
}

// Ajouter les événements aux boutons
document.addEventListener('DOMContentLoaded', function() {
    // Boutons de génération de QR code
    document.querySelectorAll('.btn[onclick*="generateQRCode"]').forEach(btn => {
        btn.addEventListener('click', generateQRCode);
    });

    // Boutons de création d'événement
    document.querySelectorAll('.btn:contains("Créer un événement")').forEach(btn => {
        btn.addEventListener('click', createEvent);
    });

    // Boutons d'inscription aux événements
    document.querySelectorAll('.event-actions .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventName = this.closest('.event-card').querySelector('h3').textContent;
            registerForEvent(eventName);
        });
    });

    // Carrousel multimédia
    initMediaCarousel();
});



// Fonction pour initialiser le carrousel multimédia
function initMediaCarousel() {
    const track = document.querySelector('.media-track');
    const items = document.querySelectorAll('.media-item');
    const indicators = document.querySelectorAll('.media-carousel .indicator');
    const prevBtn = document.getElementById('mediaPrevBtn');
    const nextBtn = document.getElementById('mediaNextBtn');
    
    if (!track || items.length === 0) return;
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Fonction pour afficher un élément spécifique
    function showItem(index) {
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
    }
    
    // Fonction pour passer à l'élément suivant
    function nextItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
    }
    
    // Fonction pour passer à l'élément précédent
    function prevItem() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(currentIndex);
    }
    
    // Événements pour les boutons
    if (prevBtn) prevBtn.addEventListener('click', prevItem);
    if (nextBtn) nextBtn.addEventListener('click', nextItem);
    
    // Événements pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showItem(currentIndex);
        });
    });
    
    // Carrousel automatique plus rapide pour les médias
    let autoPlayInterval = setInterval(nextItem, 4000);
    
    // Pause au survol
    track.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    // Reprise après le survol
    track.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextItem, 4000);
    });
    
    // Initialisation : afficher le premier élément
    showItem(0);
    
    // Gestion des vidéos
    items.forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            // Pause la vidéo quand elle n'est pas active
            item.addEventListener('transitionend', () => {
                if (item.classList.contains('active')) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });
}



// Fonction pour afficher plus d'événements
function showMoreEvents() {
    const hiddenEvents = document.querySelectorAll('.hidden-event');
    const button = document.querySelector('.discover-articles-btn');
    
    hiddenEvents.forEach(event => {
        event.classList.add('show');
    });
    
    // Changer le texte du bouton
    button.innerHTML = 'Voir moins d\'événements';
    button.onclick = hideMoreEvents;
    
    // Scroll vers les nouveaux événements
    hiddenEvents[0].scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Fonction pour masquer les événements supplémentaires
function hideMoreEvents() {
    const hiddenEvents = document.querySelectorAll('.hidden-event');
    const button = document.querySelector('.discover-articles-btn');
    
    hiddenEvents.forEach(event => {
        event.classList.remove('show');
    });
    
    // Changer le texte du bouton
    button.innerHTML = 'Découvrez nos événements';
    button.onclick = showMoreEvents;
}

// Fonction pour afficher la galerie de formation
function showFormationGallery() {
    const modal = document.getElementById('formationModal');
    const galleryGrid = document.querySelector('.formation-gallery-grid');
    
    // Créer toutes les images de formation
    const formationImages = [];
    for (let i = 1; i <= 45; i++) {
        const imageNumber = i.toString().padStart(4, '0');
        formationImages.push(`IMG-20250922-WA${imageNumber}.jpg`);
    }
    
    // Vider la galerie existante
    galleryGrid.innerHTML = '';
    
    // Ajouter toutes les images
    formationImages.forEach((imageName, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="images/events/formation a l'ena/${imageName}" alt="Formation ENA - Image ${index + 1}" loading="lazy">`;
        galleryGrid.appendChild(galleryItem);
    });
    
    // Afficher la modale
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer la galerie de formation
function closeFormationGallery() {
    const modal = document.getElementById('formationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer la modale en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('formationModal');
    if (event.target === modal) {
        closeFormationGallery();
    }
}

// Animation de la chronologie au scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // Délai progressif pour chaque élément
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialiser l'animation de la chronologie au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    animateTimeline();
});

// Fonctions pour la galerie Formation ENA
function openEnaModal(imageSrc) {
    // Créer la modale si elle n'existe pas
    let modal = document.getElementById('enaModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'enaModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-graduation-cap"></i> Formation ENA - Septembre 2024</h3>
                    <span class="close" onclick="closeEnaModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <img id="enaModalImage" src="" alt="Formation ENA" style="max-width: 100%; height: auto; border-radius: 10px;">
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Afficher l'image dans la modale
    document.getElementById('enaModalImage').src = imageSrc;
    modal.style.display = 'block';
}

function closeEnaModal() {
    const modal = document.getElementById('enaModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showAllEnaImages() {
    // Créer une modale avec toutes les images ENA
    let modal = document.getElementById('enaAllModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'enaAllModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-images"></i> Toutes les photos - Formation ENA</h3>
                    <span class="close" onclick="closeEnaAllModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="ena-all-gallery">
                        <!-- Les images seront ajoutées dynamiquement -->
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Ajouter toutes les images ENA disponibles
    const galleryContainer = modal.querySelector('.ena-all-gallery');
    galleryContainer.innerHTML = '';
    
    // Liste des images disponibles
    const availableImages = [
        'IMG-20250922-WA0009.jpg', 'IMG-20250922-WA0011.jpg', 'IMG-20250922-WA0012.jpg',
        'IMG-20250922-WA0016.jpg', 'IMG-20250922-WA0018.jpg', 'IMG-20250922-WA0020.jpg',
        'IMG-20250922-WA0023.jpg', 'IMG-20250922-WA0024.jpg', 'IMG-20250922-WA0025.jpg',
        'IMG-20250922-WA0026.jpg', 'IMG-20250922-WA0027.jpg', 'IMG-20250922-WA0028.jpg',
        'IMG-20250922-WA0029.jpg', 'IMG-20250922-WA0030.jpg', 'IMG-20250922-WA0031.jpg',
        'IMG-20250922-WA0032.jpg', 'IMG-20250922-WA0033.jpg', 'IMG-20250922-WA0034.jpg',
        'IMG-20250922-WA0035.jpg', 'IMG-20250922-WA0036.jpg', 'IMG-20250922-WA0037.jpg',
        'IMG-20250922-WA0038.jpg', 'IMG-20250922-WA0039.jpg', 'IMG-20250922-WA0040.jpg',
        'IMG-20250922-WA0041.jpg', 'IMG-20250922-WA0042.jpg', 'IMG-20250922-WA0043.jpg',
        'IMG-20250922-WA0044.jpg', 'IMG-20250922-WA0045.jpg'
    ];
    
    availableImages.forEach((imageName, index) => {
        const imageSrc = `images/events/formation a l'ena/${imageName}`;
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'ena-all-gallery-item';
        imageDiv.innerHTML = `
            <img src="${imageSrc}" alt="Formation ENA ${index + 1}" onclick="openEnaModal('${imageSrc}')">
        `;
        galleryContainer.appendChild(imageDiv);
    });
    
    modal.style.display = 'block';
}

function closeEnaAllModal() {
    const modal = document.getElementById('enaAllModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fermer les modales en cliquant à l'extérieur
window.onclick = function(event) {
    const enaModal = document.getElementById('enaModal');
    const enaAllModal = document.getElementById('enaAllModal');
    
    if (event.target === enaModal) {
        closeEnaModal();
    }
    if (event.target === enaAllModal) {
        closeEnaAllModal();
    }
}


