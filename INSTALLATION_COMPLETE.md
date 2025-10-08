# 🚀 Guide d'Installation Complète - RISO Backend & Frontend

## 📋 Vue d'ensemble

Ce guide vous accompagne dans l'installation complète du système RISO avec :
- **Frontend** : Site web statique (HTML/CSS/JS)
- **Backend** : API Node.js avec Express
- **Base de données** : MySQL
- **Authentification** : JWT
- **Email** : Nodemailer

## 🛠️ Prérequis

### Logiciels requis
- **Node.js** (version 16 ou supérieure) - [Télécharger](https://nodejs.org/)
- **MySQL** (version 5.7 ou supérieure) - [Télécharger](https://dev.mysql.com/downloads/)
- **Git** (optionnel) - [Télécharger](https://git-scm.com/)

### Comptes requis
- **Compte email** (Gmail recommandé) pour l'envoi d'emails
- **Accès MySQL** avec privilèges de création de base de données

## 📦 Installation Automatique (Recommandée)

### 1. Installation du backend
```bash
cd backend
node install.js
```

Le script d'installation vous guidera à travers :
- ✅ Vérification des prérequis
- ✅ Installation des dépendances npm
- ✅ Création des dossiers nécessaires
- ✅ Configuration de l'environnement
- ✅ Génération des clés de sécurité
- ✅ Création des templates d'email

### 2. Configuration de la base de données
```bash
# Créer la base de données
mysql -u root -p -e "CREATE DATABASE riso_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Importer le schéma
mysql -u root -p riso_db < database/schema.sql
```

### 3. Configuration de l'email
Modifiez le fichier `.env` dans le dossier `backend` :
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application
EMAIL_FROM=noreply@riso.ci
```

**Pour Gmail :**
1. Activez l'authentification à 2 facteurs
2. Générez un mot de passe d'application
3. Utilisez ce mot de passe dans `EMAIL_PASS`

## 🔧 Installation Manuelle

### 1. Backend

#### Installation des dépendances
```bash
cd backend
npm install
```

#### Configuration de l'environnement
```bash
cp config.env.example .env
# Modifiez le fichier .env avec vos paramètres
```

#### Création des dossiers
```bash
mkdir -p uploads/documents uploads/profiles uploads/events logs templates/emails
```

### 2. Base de données

#### Création de la base
```sql
CREATE DATABASE riso_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Import du schéma
```bash
mysql -u root -p riso_db < database/schema.sql
```

### 3. Frontend

Le frontend est déjà prêt ! Il suffit d'ouvrir `index.html` dans un navigateur.

## 🚀 Démarrage

### 1. Démarrer le backend
```bash
cd backend
npm run dev    # Mode développement
# ou
npm start      # Mode production
```

Le serveur sera accessible sur `http://localhost:3000`

### 2. Tester l'API
```bash
curl http://localhost:3000/api/health
```

Réponse attendue :
```json
{
  "status": "OK",
  "message": "API RISO fonctionnelle",
  "timestamp": "2024-12-20T10:30:00.000Z",
  "version": "1.0.0",
  "environment": "development"
}
```

### 3. Ouvrir le frontend
Ouvrez `index.html` dans votre navigateur ou utilisez un serveur local :
```bash
# Depuis le dossier racine du projet
python -m http.server 8000
# ou
npx http-server -p 8000
```

## 🔗 Intégration Frontend-Backend

### 1. Configuration de l'API
Le fichier `scripts/api.js` est déjà configuré pour communiquer avec le backend.

### 2. Test de l'intégration
1. Ouvrez le site sur `http://localhost:8000`
2. Allez sur la page "Création de compte RISO"
3. Créez un compte
4. Vérifiez que vous recevez l'email de vérification

### 3. Fonctionnalités disponibles
- ✅ Inscription/Connexion
- ✅ Vérification d'email
- ✅ Gestion des événements
- ✅ Upload de documents
- ✅ Système de contact
- ✅ Interface d'administration

## 🧪 Tests

### Test de l'authentification
```bash
# Inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "accountType": "particulier"
  }'

# Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test des événements
```bash
# Lister les événements
curl http://localhost:3000/api/events

# Créer un événement (avec token d'authentification)
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Formation Orientation",
    "description": "Formation sur l'orientation professionnelle",
    "eventType": "formation",
    "startDate": "2024-12-25T09:00:00Z",
    "endDate": "2024-12-25T17:00:00Z",
    "location": "Abidjan",
    "maxParticipants": 50,
    "price": 50000
  }'
```

## 🔒 Sécurité

### Configuration recommandée pour la production

1. **Variables d'environnement sécurisées**
```env
NODE_ENV=production
JWT_SECRET=votre_secret_tres_long_et_securise
DB_PASSWORD=mot_de_passe_mysql_securise
```

2. **Configuration HTTPS**
- Utilisez un certificat SSL
- Configurez le proxy inverse (Nginx/Apache)

3. **Sauvegarde de la base de données**
```bash
mysqldump -u root -p riso_db > backup_riso_$(date +%Y%m%d).sql
```

## 📊 Monitoring

### Logs
Les logs sont stockés dans `backend/logs/`

### Santé de l'API
```bash
curl http://localhost:3000/api/health
```

### Statistiques
```bash
curl http://localhost:3000/api/admin/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## 🚀 Déploiement

### Avec PM2 (Recommandé)
```bash
npm install -g pm2
pm2 start backend/server.js --name riso-backend
pm2 startup
pm2 save
```

### Avec Docker (Optionnel)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Maintenance

### Mise à jour
```bash
git pull
cd backend
npm install
pm2 restart riso-backend
```

### Sauvegarde complète
```bash
# Base de données
mysqldump -u root -p riso_db > backup_db.sql

# Fichiers uploadés
tar -czf backup_uploads.tar.gz backend/uploads/

# Configuration
cp backend/.env backup_env.txt
```

## 🆘 Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données**
   - Vérifiez que MySQL est démarré
   - Vérifiez les paramètres dans `.env`

2. **Erreur d'envoi d'email**
   - Vérifiez les paramètres email dans `.env`
   - Pour Gmail, utilisez un mot de passe d'application

3. **Erreur CORS**
   - Vérifiez `CORS_ORIGIN` dans `.env`
   - Assurez-vous que le frontend et le backend sont sur les bons ports

4. **Token JWT invalide**
   - Vérifiez `JWT_SECRET` dans `.env`
   - Redémarrez le serveur après modification

### Logs utiles
```bash
# Logs du serveur
tail -f backend/logs/app.log

# Logs PM2
pm2 logs riso-backend

# Logs MySQL
tail -f /var/log/mysql/error.log
```

## 📞 Support

Pour toute question ou problème :
- 📧 Email : contact@riso.ci
- 📚 Documentation : Voir les commentaires dans le code
- 🐛 Issues : Créez une issue sur le repository

## ✅ Checklist de Validation

### Installation
- [ ] Node.js installé et fonctionnel
- [ ] MySQL installé et accessible
- [ ] Dépendances npm installées
- [ ] Base de données créée et schéma importé
- [ ] Fichier `.env` configuré
- [ ] Dossiers créés

### Fonctionnement
- [ ] Serveur backend démarre sans erreur
- [ ] API répond sur `/api/health`
- [ ] Frontend s'affiche correctement
- [ ] Inscription fonctionne
- [ ] Email de vérification reçu
- [ ] Connexion fonctionne
- [ ] Interface d'administration accessible

### Sécurité
- [ ] Mot de passe admin changé
- [ ] JWT_SECRET configuré
- [ ] HTTPS configuré (production)
- [ ] Sauvegardes configurées

---

**🎉 Félicitations ! Votre système RISO est maintenant opérationnel !**

Le backend et le frontend sont maintenant connectés et fonctionnels. Vous pouvez commencer à utiliser toutes les fonctionnalités de la plateforme RISO.
