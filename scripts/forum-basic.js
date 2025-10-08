// Forum Basic - Version Ultra Simplifiée
console.log('Forum Basic démarré');

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé, initialisation...');
    
    // Variables globales
    let questions = [
        {
            id: 1,
            text: "Question d'exemple : Comment choisir ma spécialisation ?",
            author: "Étudiant",
            category: "orientation",
            date: new Date(),
            status: "pending",
            answers: []
        }
    ];
    
    let answers = []; // Stockage des réponses
    
    // Fonction pour afficher les questions
    function showQuestions() {
        console.log('Affichage des questions...');
        const container = document.querySelector('.questions-list');
        
        if (!container) {
            console.error('Container .questions-list non trouvé');
            return;
        }
        
        console.log('Container trouvé, affichage de', questions.length, 'questions');
        
        container.innerHTML = '';
        
        questions.forEach(function(question, index) {
            console.log('Affichage question', index + 1, ':', question.text);
            
            const div = document.createElement('div');
            div.className = 'question-card';
            div.style.cssText = `
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 15px;
                border-left: 4px solid #2E78C0;
            `;
            
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #666; font-size: 0.9rem;">
                        <i class="fas fa-user"></i> ${question.author} | 
                        <i class="fas fa-clock"></i> ${getTimeAgo(question.date)} |
                        <i class="fas fa-tag"></i> ${question.category}
                    </span>
                    <span style="background: #ffc107; color: #000; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">
                        ${question.status === 'answered' ? 'Résolue' : 'En attente'}
                    </span>
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; line-height: 1.5; color: #333;">${question.text}</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div style="display: flex; gap: 15px; color: #666; font-size: 0.9rem;">
                        <span><i class="fas fa-eye"></i> 0 vues</span>
                        <span><i class="fas fa-comment"></i> ${getAnswersForQuestion(question.id).length} réponses</span>
                        <span><i class="fas fa-thumbs-up"></i> 0 votes</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-outline view-answers-btn" data-question-id="${question.id}" style="padding: 5px 15px; border: 1px solid #2E78C0; background: transparent; color: #2E78C0; border-radius: 20px; cursor: pointer;">
                        Voir les réponses (${getAnswersForQuestion(question.id).length})
                    </button>
                    <button class="btn btn-primary answer-btn" data-question-id="${question.id}" style="padding: 5px 15px; background: #2E78C0; color: white; border: none; border-radius: 20px; cursor: pointer;">
                        Répondre
                    </button>
                </div>
            `;
            
            container.appendChild(div);
        });
        
        console.log('Questions affichées avec succès');
    }
    
    // Fonction pour ajouter une question
    function addQuestion(text, category) {
        console.log('Ajout d\'une nouvelle question:', text, category);
        
        const newQuestion = {
            id: Date.now(),
            text: text,
            author: 'Étudiant',
            category: category,
            date: new Date(),
            status: 'pending',
            answers: []
        };
        
        questions.unshift(newQuestion);
        console.log('Question ajoutée, total:', questions.length);
        
        showQuestions();
    }
    
    // Fonction pour gérer le formulaire
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('Soumission du formulaire...');
        
        const textarea = document.getElementById('questionText');
        const select = document.getElementById('questionCategory');
        
        if (!textarea || !select) {
            console.error('Éléments du formulaire non trouvés');
            alert('Erreur: éléments du formulaire non trouvés');
            return;
        }
        
        const text = textarea.value.trim();
        const category = select.value;
        
        console.log('Texte:', text);
        console.log('Catégorie:', category);
        
        if (!text) {
            alert('Veuillez écrire votre question');
            return;
        }
        
        if (!category) {
            alert('Veuillez sélectionner une catégorie');
            return;
        }
        
        // Ajouter la question
        addQuestion(text, category);
        
        // Fermer le modal
        const modal = document.getElementById('askQuestionModal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Reset du formulaire
        textarea.value = '';
        select.value = '';
        
        alert('Question publiée avec succès !');
        console.log('Formulaire traité avec succès');
    }
    
    // Fonction pour ouvrir le modal
    function openModal() {
        console.log('Ouverture du modal...');
        const modal = document.getElementById('askQuestionModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus sur le textarea
            setTimeout(function() {
                const textarea = document.getElementById('questionText');
                if (textarea) {
                    textarea.focus();
                }
            }, 100);
        }
    }
    
    // Fonction pour fermer le modal
    function closeModal() {
        console.log('Fermeture du modal...');
        const modal = document.getElementById('askQuestionModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Fonction pour récupérer les réponses d'une question
    function getAnswersForQuestion(questionId) {
        return answers.filter(answer => answer.questionId === questionId);
    }
    
    // Fonction pour voir les réponses
    function viewAnswers(questionId) {
        console.log('Voir les réponses pour la question:', questionId);
        const question = questions.find(q => q.id === questionId);
        const questionAnswers = getAnswersForQuestion(questionId);
        
        if (question) {
            // Créer un modal simple pour afficher les réponses
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            `;
            
            // Générer le HTML des réponses
            let answersHtml = '';
            if (questionAnswers.length > 0) {
                questionAnswers.forEach(answer => {
                    answersHtml += `
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #F28B2E;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span style="color: #666; font-size: 0.9rem;">
                                    <i class="fas fa-user"></i> ${answer.author}
                                </span>
                                <span style="color: #666; font-size: 0.8rem;">
                                    <i class="fas fa-clock"></i> ${getTimeAgo(answer.date)}
                                </span>
                            </div>
                            <p style="margin: 0; line-height: 1.5; color: #333;">${answer.text}</p>
                        </div>
                    `;
                });
            } else {
                answersHtml = `
                    <div style="text-align: center; padding: 40px 20px; color: #666;">
                        <i class="fas fa-comment" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                        <p style="margin: 0; font-size: 1.1rem;">Aucune réponse pour le moment.</p>
                        <p style="margin: 10px 0 0 0; font-size: 0.9rem;">Soyez le premier à répondre !</p>
                    </div>
                `;
            }
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 700px; max-height: 80vh; overflow-y: auto; position: relative; width: 90%;">
                    <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
                    <h3 style="margin-top: 0; color: #2E78C0; margin-bottom: 20px;">
                        <i class="fas fa-comments"></i> Réponses (${questionAnswers.length})
                    </h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #2E78C0;">
                        <p style="margin: 0; font-style: italic; color: #666;">"${question.text}"</p>
                    </div>
                    <div id="answers-container">
                        ${answersHtml}
                    </div>
                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="background: #2E78C0; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">
                            Fermer
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        }
    }
    
    // Fonction pour répondre à une question
    function answerQuestion(questionId) {
        console.log('Répondre à la question:', questionId);
        const question = questions.find(q => q.id === questionId);
        
        if (question) {
            // Créer un modal simple pour répondre
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            `;
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%; position: relative;">
                    <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
                    <h3 style="margin-top: 0; color: #2E78C0;">Répondre à la question</h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                        <p style="margin: 0; font-style: italic; color: #666;">"${question.text}"</p>
                    </div>
                    <form id="answer-form">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Votre réponse :</label>
                            <textarea id="answer-text" style="width: 100%; height: 120px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-family: inherit;" placeholder="Écrivez votre réponse ici..." required></textarea>
                        </div>
                        <div style="text-align: center;">
                            <button type="button" onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; margin-right: 10px;">
                                Annuler
                            </button>
                            <button type="submit" style="background: #2E78C0; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">
                                Publier la réponse
                            </button>
                        </div>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Gérer la soumission du formulaire de réponse
            const form = modal.querySelector('#answer-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const answerText = modal.querySelector('#answer-text').value.trim();
                
                if (answerText) {
                    // Créer la nouvelle réponse
                    const newAnswer = {
                        id: Date.now(),
                        questionId: questionId,
                        text: answerText,
                        author: 'Spécialiste',
                        date: new Date()
                    };
                    
                    console.log('Nouvelle réponse créée:', newAnswer);
                    
                    // Ajouter la réponse
                    answers.unshift(newAnswer);
                    
                    // Mettre à jour le statut de la question
                    const question = questions.find(q => q.id === questionId);
                    if (question) {
                        question.status = 'answered';
                        question.answers.push(newAnswer.id);
                    }
                    
                    console.log('Réponse ajoutée, total des réponses:', answers.length);
                    
                    // Fermer le modal
                    modal.remove();
                    
                    // Mettre à jour l'affichage des questions
                    showQuestions();
                    
                    // Notification de succès
                    alert('Votre réponse a été publiée avec succès !');
                    
                    console.log('Réponse publiée et affichage mis à jour');
                } else {
                    alert('Veuillez écrire une réponse.');
                }
            });
        }
    }
    
    // Fonction utilitaire pour le temps
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
    
    // Configuration des événements
    function setupEvents() {
        console.log('Configuration des événements...');
        
        // Bouton pour ouvrir le modal
        const askBtn = document.getElementById('askQuestionBtn');
        if (askBtn) {
            askBtn.addEventListener('click', openModal);
            console.log('Événement ajouté au bouton "Poser une Question"');
        } else {
            console.error('Bouton askQuestionBtn non trouvé');
        }
        
        // Formulaire
        const form = document.getElementById('askQuestionForm');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
            console.log('Événement ajouté au formulaire');
        } else {
            console.error('Formulaire askQuestionForm non trouvé');
        }
        
        // Bouton annuler
        const cancelBtn = document.getElementById('cancelQuestion');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModal);
            console.log('Événement ajouté au bouton annuler');
        }
        
        // Bouton fermer
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
            console.log('Événement ajouté au bouton fermer');
        }
        
        // Fermer en cliquant à l'extérieur
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('askQuestionModal');
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Gestion des boutons "Voir les réponses" et "Répondre" avec délégation d'événements
        document.addEventListener('click', function(event) {
            const target = event.target;
            
            // Bouton "Voir les réponses"
            if (target.classList.contains('view-answers-btn') || target.closest('.view-answers-btn')) {
                const button = target.classList.contains('view-answers-btn') ? target : target.closest('.view-answers-btn');
                const questionId = parseInt(button.getAttribute('data-question-id'));
                console.log('Clic sur "Voir les réponses" pour la question:', questionId);
                viewAnswers(questionId);
            }
            
            // Bouton "Répondre"
            if (target.classList.contains('answer-btn') || target.closest('.answer-btn')) {
                const button = target.classList.contains('answer-btn') ? target : target.closest('.answer-btn');
                const questionId = parseInt(button.getAttribute('data-question-id'));
                console.log('Clic sur "Répondre" pour la question:', questionId);
                answerQuestion(questionId);
            }
        });
        
        console.log('Événements configurés (y compris les boutons de réponse)');
    }
    
    // Initialisation
    console.log('Démarrage de l\'initialisation...');
    
    // Afficher les questions
    showQuestions();
    
    // Configurer les événements
    setupEvents();
    
    console.log('Forum Basic initialisé avec succès !');
    
    // Test automatique après 3 secondes
    setTimeout(function() {
        console.log('Test automatique - ajout d\'une question de test');
        addQuestion('Ceci est une question de test automatique', 'formation');
    }, 3000);
});
