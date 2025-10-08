// Forum d'Échange - Version Simplifiée
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== FORUM SIMPLE DÉMARRÉ ===');
    
    // Éléments du DOM
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const askQuestionModal = document.getElementById('askQuestionModal');
    const askQuestionForm = document.getElementById('askQuestionForm');
    const cancelQuestionBtn = document.getElementById('cancelQuestion');
    const closeModalBtn = document.querySelector('.close');
    
    // Variables
    let questions = [];
    
    // Initialisation
    initSimpleForum();
    
    function initSimpleForum() {
        console.log('Initialisation du forum simple...');
        
        // Questions par défaut
        questions = [
            {
                id: 1,
                text: "Bonjour, je suis en L3 Droit et je ne sais pas quelle spécialisation choisir. J'hésite entre le Droit des Affaires et le Droit Public. Quels sont les débouchés pour chaque option ?",
                author: "Étudiant en Droit",
                category: "orientation",
                date: new Date(),
                status: "answered"
            }
        ];
        
        // Afficher les questions
        displayQuestions();
        
        // Événements
        if (askQuestionBtn) {
            askQuestionBtn.addEventListener('click', openModal);
        }
        
        if (cancelQuestionBtn) {
            cancelQuestionBtn.addEventListener('click', closeModal);
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        if (askQuestionForm) {
            askQuestionForm.addEventListener('submit', handleSubmit);
        }
        
        console.log('Forum simple initialisé avec', questions.length, 'questions');
    }
    
    function openModal() {
        console.log('Ouverture du modal...');
        if (askQuestionModal) {
            askQuestionModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus sur le textarea
            setTimeout(() => {
                const textarea = document.getElementById('questionText');
                if (textarea) {
                    textarea.focus();
                }
            }, 100);
        }
    }
    
    function closeModal() {
        console.log('Fermeture du modal...');
        if (askQuestionModal) {
            askQuestionModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset du formulaire
            if (askQuestionForm) {
                askQuestionForm.reset();
            }
        }
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log('=== SOUMISSION DU FORMULAIRE ===');
        
        // Récupérer les valeurs
        const textarea = document.getElementById('questionText');
        const select = document.getElementById('questionCategory');
        
        if (!textarea || !select) {
            console.error('Éléments du formulaire non trouvés');
            return;
        }
        
        const text = textarea.value;
        const category = select.value;
        
        console.log('Texte récupéré:', text);
        console.log('Catégorie récupérée:', category);
        
        // Vérification
        if (!text || text.trim().length === 0) {
            alert('Veuillez écrire votre question.');
            return;
        }
        
        if (!category) {
            alert('Veuillez sélectionner une catégorie.');
            return;
        }
        
        // Créer la nouvelle question
        const newQuestion = {
            id: Date.now(),
            text: text.trim(),
            author: 'Étudiant',
            category: category,
            date: new Date(),
            status: 'pending'
        };
        
        console.log('Nouvelle question créée:', newQuestion);
        
        // Ajouter à la liste
        questions.unshift(newQuestion);
        console.log('Questions dans la liste:', questions.length);
        
        // Afficher
        displayQuestions();
        
        // Fermer le modal
        closeModal();
        
        // Notification
        alert('Votre question a été publiée avec succès !');
        
        console.log('=== FIN SOUMISSION ===');
    }
    
    function displayQuestions() {
        console.log('=== AFFICHAGE DES QUESTIONS ===');
        console.log('Nombre de questions à afficher:', questions.length);
        
        const questionsList = document.querySelector('.questions-list');
        if (!questionsList) {
            console.error('Élément .questions-list non trouvé');
            return;
        }
        
        // Vider la liste
        questionsList.innerHTML = '';
        
        // Afficher chaque question
        questions.forEach((question, index) => {
            console.log(`Affichage de la question ${index + 1}:`, question);
            
            const card = document.createElement('article');
            card.className = 'question-card';
            
            const timeAgo = getTimeAgo(question.date);
            const categoryLabels = {
                'orientation': 'Orientation',
                'formation': 'Formation',
                'emploi': 'Emploi',
                'bilan': 'Bilan de compétences',
                'autre': 'Autre'
            };
            
            card.innerHTML = `
                <div class="question-header">
                    <div class="question-meta">
                        <span class="question-author">
                            <i class="fas fa-user"></i>
                            ${question.author}
                        </span>
                        <span class="question-date">
                            <i class="fas fa-clock"></i>
                            ${timeAgo}
                        </span>
                        <span class="question-category">
                            <i class="fas fa-tag"></i>
                            ${categoryLabels[question.category] || question.category}
                        </span>
                    </div>
                    <div class="question-status ${question.status}">
                        <i class="fas fa-${question.status === 'answered' ? 'check-circle' : 'clock'}"></i>
                        ${question.status === 'answered' ? 'Résolue' : 'En attente'}
                    </div>
                </div>
                <div class="question-content">
                    <p class="question-text">${question.text}</p>
                </div>
                <div class="question-stats">
                    <span class="stat">
                        <i class="fas fa-eye"></i>
                        0 vues
                    </span>
                    <span class="stat">
                        <i class="fas fa-comment"></i>
                        0 réponses
                    </span>
                    <span class="stat">
                        <i class="fas fa-thumbs-up"></i>
                        0 votes
                    </span>
                </div>
                <div class="question-actions">
                    <button class="btn btn-outline">
                        <i class="fas fa-eye"></i>
                        Voir les réponses
                    </button>
                    <button class="btn btn-outline">
                        <i class="fas fa-share"></i>
                        Partager
                    </button>
                    ${question.status === 'pending' ? `
                        <button class="btn btn-primary">
                            <i class="fas fa-reply"></i>
                            Répondre
                        </button>
                    ` : ''}
                </div>
            `;
            
            questionsList.appendChild(card);
        });
        
        console.log('Questions affichées:', questions.length);
        console.log('=== FIN AFFICHAGE ===');
    }
    
    function getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) return 'À l\'instant';
        if (minutes < 60) return `Il y a ${minutes} min`;
        
        const hours = Math.floor(diff / 3600000);
        if (hours < 24) return `Il y a ${hours}h`;
        
        const days = Math.floor(diff / 86400000);
        return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    }
    
    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        if (event.target === askQuestionModal) {
            closeModal();
        }
    });
    
    console.log('=== FORUM SIMPLE PRÊT ===');
});
