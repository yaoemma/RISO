// Forum d'Échange - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const askQuestionModal = document.getElementById('askQuestionModal');
    const askQuestionForm = document.getElementById('askQuestionForm');
    const cancelQuestionBtn = document.getElementById('cancelQuestion');
    const closeModalBtn = document.querySelector('.close');
    const searchInput = document.getElementById('searchInput');
    const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"]');
    
    // Variables globales
    let currentQuestions = [];
    let filteredQuestions = [];

    // Initialisation
    initForum();

    function initForum() {
        // Charger les questions depuis le localStorage ou données par défaut
        loadQuestions();
        
        // Événements
        setupEventListeners();
        
        // Afficher les questions
        displayQuestions();
        
        // Debug: Vérifier que le formulaire existe
        console.log('Formulaire trouvé:', askQuestionForm);
        console.log('Modal trouvé:', askQuestionModal);
        
        // Test: Ajouter une question de test pour vérifier l'affichage
        setTimeout(() => {
            console.log('=== TEST D\'AFFICHAGE ===');
            const testQuestion = {
                id: Date.now(),
                text: 'TEST: Ceci est une question de test. Si vous voyez ce texte, l\'affichage fonctionne correctement.',
                author: 'Testeur',
                category: 'orientation',
                date: new Date(),
                status: 'pending',
                views: 0,
                answers: 0,
                votes: 0,
                tags: []
            };
            
            console.log('Question de test créée:', testQuestion);
            currentQuestions.unshift(testQuestion);
            console.log('Questions dans la liste:', currentQuestions.length);
            applyCurrentFilters();
            console.log('=== FIN DU TEST ===');
        }, 2000);
    }

    function setupEventListeners() {
        // Vérifier que les éléments existent
        if (!askQuestionBtn || !askQuestionModal || !askQuestionForm) {
            console.error('Éléments du formulaire non trouvés');
            return;
        }
        
        // Modal pour poser une question
        askQuestionBtn.addEventListener('click', openAskQuestionModal);
        if (cancelQuestionBtn) {
            cancelQuestionBtn.addEventListener('click', closeAskQuestionModal);
        }
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeAskQuestionModal);
        }
        
        // Fermer le modal en cliquant à l'extérieur
        window.addEventListener('click', function(event) {
            if (event.target === askQuestionModal) {
                closeAskQuestionModal();
            }
        });
        
        // Formulaire de question
        askQuestionForm.addEventListener('submit', handleQuestionSubmit);
        
        // Recherche
        searchInput.addEventListener('input', handleSearch);
        
        // Filtres
        filterOptions.forEach(option => {
            option.addEventListener('change', handleFilter);
        });
        
        // Actions des cartes de questions
        setupQuestionCardEvents();
        
        // Pagination
        setupPaginationEvents();
    }

    function loadQuestions() {
        // Charger depuis localStorage ou utiliser les données par défaut
        const savedQuestions = localStorage.getItem('forumQuestions');
        if (savedQuestions) {
            currentQuestions = JSON.parse(savedQuestions);
        } else {
            // Questions par défaut
            currentQuestions = [
                {
                    id: 1,
                    text: "Bonjour, je suis en L3 Droit et je ne sais pas quelle spécialisation choisir. J'hésite entre le Droit des Affaires et le Droit Public. Quels sont les débouchés pour chaque option ?",
                    author: "Étudiant en Droit",
                    category: "orientation",
                    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2 heures
                    status: "answered",
                    views: 45,
                    answers: 3,
                    votes: 12,
                    tags: ["droit", "spécialisation", "orientation"]
                },
                {
                    id: 2,
                    text: "Je suis développeur junior et je souhaite me spécialiser. Entre un bootcamp intensif et une formation universitaire, que me conseillez-vous ?",
                    author: "Étudiant en Informatique",
                    category: "formation",
                    date: new Date(Date.now() - 4 * 60 * 60 * 1000), // Il y a 4 heures
                    status: "pending",
                    views: 23,
                    answers: 0,
                    votes: 5,
                    tags: ["développement", "formation", "web"]
                },
                {
                    id: 3,
                    text: "Je cherche un stage en entreprise mais je ne sais pas comment mettre en valeur mon parcours académique. Avez-vous des conseils pour rédiger un CV attractif ?",
                    author: "Étudiant en Économie",
                    category: "emploi",
                    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Il y a 1 jour
                    status: "answered",
                    views: 67,
                    answers: 5,
                    votes: 18,
                    tags: ["CV", "stage", "emploi"]
                }
            ];
            saveQuestions();
        }
        filteredQuestions = [...currentQuestions];
    }

    function saveQuestions() {
        localStorage.setItem('forumQuestions', JSON.stringify(currentQuestions));
    }

    function displayQuestions() {
        const questionsList = document.querySelector('.questions-list');
        if (!questionsList) {
            console.error('Élément .questions-list non trouvé');
            return;
        }

        // Vider la liste
        questionsList.innerHTML = '';

        // Afficher un message si aucune question
        if (filteredQuestions.length === 0) {
            questionsList.innerHTML = `
                <div class="no-questions-message">
                    <i class="fas fa-search"></i>
                    <h3>Aucune question trouvée</h3>
                    <p>Essayez de modifier vos critères de recherche ou de filtrage.</p>
                </div>
            `;
            return;
        }

        // Créer et afficher les cartes de questions
        filteredQuestions.forEach((question, index) => {
            console.log(`Création de la carte ${index + 1}:`, question);
            const questionCard = createQuestionCard(question);
            questionsList.appendChild(questionCard);
        });

        console.log(`${filteredQuestions.length} questions affichées`);
    }

    function createQuestionCard(question) {
        // Debug: Afficher les données de la question
        console.log('Création de la carte pour la question:', question);
        console.log('Titre:', question.title);
        console.log('Texte:', question.text);
        console.log('Catégorie:', question.category);
        
        const card = document.createElement('article');
        card.className = 'question-card';
        card.dataset.questionId = question.id;

        const timeAgo = getTimeAgo(question.date);
        const categoryLabels = {
            'orientation': 'Orientation',
            'formation': 'Formation',
            'emploi': 'Emploi',
            'bilan': 'Bilan de compétences',
            'autre': 'Autre'
        };
        
        // S'assurer que les données existent avec des valeurs par défaut
        const safeText = (question.text && question.text.trim()) ? question.text.trim() : 'AUCUN CONTENU TROUVÉ';
        const safeCategory = question.category || 'autre';
        const safeAuthor = question.author || 'Étudiant';
        
        console.log('=== CRÉATION DE LA CARTE ===');
        console.log('Question originale:', question);
        console.log('Texte sécurisé:', safeText);
        console.log('Catégorie:', safeCategory);
        console.log('============================');

        card.innerHTML = `
            <div class="question-header">
                <div class="question-meta">
                    <span class="question-author">
                        <i class="fas fa-user"></i>
                        ${safeAuthor}
                    </span>
                    <span class="question-date">
                        <i class="fas fa-clock"></i>
                        ${timeAgo}
                    </span>
                    <span class="question-category">
                        <i class="fas fa-tag"></i>
                        ${categoryLabels[safeCategory] || safeCategory}
                    </span>
                </div>
                <div class="question-status ${question.status}">
                    <i class="fas fa-${question.status === 'answered' ? 'check-circle' : 'clock'}"></i>
                    ${question.status === 'answered' ? 'Résolue' : 'En attente'}
                </div>
            </div>
            <div class="question-content">
                <p class="question-text">${safeText}</p>
            </div>
            <div class="question-stats">
                <span class="stat">
                    <i class="fas fa-eye"></i>
                    ${question.views} vues
                </span>
                <span class="stat">
                    <i class="fas fa-comment"></i>
                    ${question.answers} réponses
                </span>
                <span class="stat">
                    <i class="fas fa-thumbs-up"></i>
                    ${question.votes} votes
                </span>
            </div>
            <div class="question-actions">
                <button class="btn btn-outline view-answers-btn" data-question-id="${question.id}">
                    <i class="fas fa-eye"></i>
                    Voir les réponses
                </button>
                <button class="btn btn-outline share-btn" data-question-id="${question.id}">
                    <i class="fas fa-share"></i>
                    Partager
                </button>
                ${question.status === 'pending' ? `
                    <button class="btn btn-primary answer-btn" data-question-id="${question.id}">
                        <i class="fas fa-reply"></i>
                        Répondre
                    </button>
                ` : ''}
            </div>
        `;

        return card;
    }

    function getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `Il y a ${minutes} min`;
        } else if (hours < 24) {
            return `Il y a ${hours}h`;
        } else {
            return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
        }
    }

    function setupQuestionCardEvents() {
        // Utiliser la délégation d'événements pour les boutons dynamiques
        document.addEventListener('click', function(event) {
            const target = event.target.closest('.view-answers-btn, .share-btn, .answer-btn');
            if (!target) return;

            const questionId = parseInt(target.dataset.questionId);
            const action = target.classList.contains('view-answers-btn') ? 'view' :
                          target.classList.contains('share-btn') ? 'share' : 'answer';

            switch (action) {
                case 'view':
                    viewAnswers(questionId);
                    break;
                case 'share':
                    shareQuestion(questionId);
                    break;
                case 'answer':
                    answerQuestion(questionId);
                    break;
            }
        });
    }

    function viewAnswers(questionId) {
        const question = currentQuestions.find(q => q.id === questionId);
        if (!question) return;

        // Simuler l'ouverture d'une page de réponses
        alert(`Affichage des réponses pour : "${question.title}"\n\nCette fonctionnalité sera implémentée dans une page dédiée.`);
    }

    function shareQuestion(questionId) {
        const question = currentQuestions.find(q => q.id === questionId);
        if (!question) return;

        const shareUrl = `${window.location.origin}/forum-echange.html#question-${questionId}`;
        
        if (navigator.share) {
            navigator.share({
                title: question.title,
                text: question.text,
                url: shareUrl
            });
        } else {
            // Fallback : copier dans le presse-papiers
            navigator.clipboard.writeText(shareUrl).then(() => {
                showNotification('Lien copié dans le presse-papiers !', 'success');
            });
        }
    }

    function answerQuestion(questionId) {
        const question = currentQuestions.find(q => q.id === questionId);
        if (!question) return;

        alert(`Répondre à : "${question.title}"\n\nCette fonctionnalité sera implémentée dans une page dédiée.`);
    }

    function openAskQuestionModal() {
        askQuestionModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus sur le champ de question
        setTimeout(() => {
            document.getElementById('questionText').focus();
        }, 100);
    }

    function closeAskQuestionModal() {
        askQuestionModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        askQuestionForm.reset();
    }

    function handleQuestionSubmit(event) {
        event.preventDefault();
        
        // Récupérer les données du formulaire de manière plus directe
        const textElement = document.getElementById('questionText');
        const categoryElement = document.getElementById('questionCategory');
        
        const text = textElement ? textElement.value : '';
        const category = categoryElement ? categoryElement.value : '';
        
        // Debug: Afficher les valeurs récupérées
        console.log('=== DONNÉES DU FORMULAIRE ===');
        console.log('Element text:', textElement);
        console.log('Element category:', categoryElement);
        console.log('Valeur text:', text);
        console.log('Valeur category:', category);
        console.log('Text length:', text.length);
        console.log('================================');
        
        // Vérifier que les champs requis sont remplis
        if (!text || text.trim().length === 0) {
            alert('Veuillez écrire votre question.');
            return;
        }
        
        if (!category || category === '') {
            alert('Veuillez sélectionner un type de question.');
            return;
        }
        
        const questionData = {
            id: Date.now(),
            text: text.trim(),
            author: 'Étudiant',
            category: category,
            date: new Date(),
            status: 'pending',
            views: 0,
            answers: 0,
            votes: 0,
            tags: []
        };
        
        // Debug: Afficher l'objet question créé
        console.log('=== QUESTION CRÉÉE ===');
        console.log('Question complète:', questionData);
        console.log('Texte de la question:', questionData.text);
        console.log('========================');

        // Ajouter la nouvelle question au début de la liste
        currentQuestions.unshift(questionData);
        console.log('Question ajoutée à la liste. Total:', currentQuestions.length);
        console.log('Première question de la liste:', currentQuestions[0]);
        
        saveQuestions();
        
        // Appliquer les filtres actuels à la nouvelle liste
        applyCurrentFilters();
        
        // Fermer le modal
        closeAskQuestionModal();
        
        // Afficher une notification
        showNotification('Votre question a été publiée avec succès !', 'success');
        
        // Scroll vers la nouvelle question après un court délai
        setTimeout(() => {
            const newQuestion = document.querySelector(`[data-question-id="${questionData.id}"]`);
            if (newQuestion) {
                newQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Ajouter un effet visuel pour mettre en évidence la nouvelle question
                newQuestion.style.borderLeft = '4px solid #F28B2E';
                newQuestion.style.boxShadow = '0 8px 25px rgba(242, 139, 46, 0.3)';
                newQuestion.style.animation = 'pulse 2s ease-in-out';
                
                // Retirer l'effet après l'animation
                setTimeout(() => {
                    newQuestion.style.borderLeft = '4px solid #2E78C0';
                    newQuestion.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }, 2000);
            }
        }, 200);
    }

    function applyCurrentFilters() {
        // Appliquer la recherche actuelle
        const searchTerm = searchInput.value.toLowerCase();
        let questions = [...currentQuestions];
        
        if (searchTerm !== '') {
            questions = questions.filter(question => 
                question.title.toLowerCase().includes(searchTerm) ||
                question.text.toLowerCase().includes(searchTerm) ||
                question.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // Appliquer les filtres de catégories
        const selectedCategories = Array.from(filterOptions)
            .filter(option => option.checked)
            .map(option => option.value);
        
        if (selectedCategories.length > 0) {
            questions = questions.filter(question => 
                selectedCategories.includes(question.category)
            );
        }
        
        filteredQuestions = questions;
        displayQuestions();
    }

    function handleSearch(event) {
        applyCurrentFilters();
    }

    function handleFilter() {
        applyCurrentFilters();
    }

    function setupPaginationEvents() {
        // Cette fonction sera implémentée quand on aura plus de questions
        const paginationBtns = document.querySelectorAll('.pagination-btn, .pagination-number');
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('pagination-number')) {
                    const page = parseInt(this.textContent);
                    loadPage(page);
                } else if (this.classList.contains('pagination-btn') && !this.disabled) {
                    const isNext = this.textContent.includes('Suivant');
                    // Logique de pagination
                }
            });
        });
    }

    function loadPage(page) {
        // Logique de pagination (à implémenter)
        console.log(`Chargement de la page ${page}`);
    }

    function showNotification(message, type = 'info') {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Styles pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Animation CSS pour les notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
    `;
    document.head.appendChild(style);
});

// Fonction utilitaire pour formater les dates
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('fr-FR', options);
}

// Fonction pour gérer les liens d'ancrage (si quelqu'un partage un lien avec #question-id)
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#question-')) {
        const questionId = parseInt(hash.replace('#question-', ''));
        setTimeout(() => {
            const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                questionElement.style.animation = 'pulse 2s ease-in-out';
            }
        }, 500);
    }
});
