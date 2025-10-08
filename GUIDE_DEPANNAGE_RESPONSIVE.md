# 🔧 Guide de Dépannage Responsive - RISO

## ⚠️ Le site n'est pas responsive ? Suivez ces étapes !

---

## 🚀 ÉTAPES IMMÉDIATES

### 1. Vider le Cache du Navigateur

Le CSS a été mis à jour mais votre navigateur affiche peut-être l'ancienne version.

**Chrome / Edge :**
1. Appuyez sur `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
2. OU : Clic droit sur la page → "Inspecter" → Onglet "Network" → Cochez "Disable cache" → Rafraîchir

**Firefox :**
1. Appuyez sur `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac)
2. OU : Ouvrez les DevTools → Onglet "Network" → Cochez "Disable cache"

**Safari :**
1. `Cmd + Option + R`
2. OU : Menu Develop → Empty Caches

---

### 2. Tester avec la Page de Test

J'ai créé une page de test : `test-responsive.html`

**Ouvrez ce fichier dans votre navigateur :**
```
file:///C:/Users/EMMA YAO/Documents/projet_RISO1/test-responsive.html
```

Cette page affiche :
- ✅ Votre taille d'écran actuelle
- ✅ Le breakpoint actif
- ✅ Un indicateur en temps réel
- ✅ Des tests de grilles
- ✅ Le statut du menu hamburger

---

### 3. Utiliser Chrome DevTools

**Méthode détaillée :**

1. **Ouvrir DevTools**
   - Appuyez sur `F12` ou `Ctrl + Shift + I`

2. **Activer le Mode Responsive**
   - Cliquez sur l'icône 📱 en haut à gauche
   - OU appuyez sur `Ctrl + Shift + M`

3. **Tester différents appareils**
   - En haut, sélectionnez : iPhone SE, iPhone 12, iPad, etc.
   - OU entrez une largeur manuellement (ex: 375px, 768px, 1024px)

4. **Vérifier les Media Queries**
   - Dans DevTools, onglet "Elements"
   - Cliquez sur "Sources" → Ouvrez `main.css`
   - Cherchez `@media` pour voir les breakpoints

---

## 🔍 DIAGNOSTICS

### Test 1 : Le Viewport est-il configuré ?

**Vérification :**
1. Ouvrez `index.html`
2. Ligne 5 doit contenir :
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

✅ **Statut :** CONFIGURÉ (présent dans le fichier)

---

### Test 2 : Le CSS est-il bien chargé ?

**Vérification :**
1. Ouvrez DevTools → Onglet "Network"
2. Rafraîchissez la page
3. Cherchez `main.css` dans la liste
4. Vérifiez que le statut est `200` (vert)

**Si le fichier n'apparaît pas ou est en erreur 404 :**
- Vérifiez que `styles/main.css` existe bien
- Vérifiez le chemin dans `index.html` ligne 7

---

### Test 3 : Les Media Queries fonctionnent-elles ?

**Test rapide :**

1. Ouvrez `index.html` dans votre navigateur
2. Ouvrez DevTools (F12)
3. Collez ce code dans la Console :

```javascript
// Test des breakpoints
const width = window.innerWidth;
console.log('Largeur actuelle:', width + 'px');

if (width > 1024) {
    console.log('✅ Breakpoint: Desktop Large');
} else if (width > 768) {
    console.log('✅ Breakpoint: Tablette');
} else if (width > 480) {
    console.log('✅ Breakpoint: Mobile');
} else {
    console.log('✅ Breakpoint: Petit Mobile');
}

// Vérifier si le CSS responsive est chargé
const hamburger = document.querySelector('.hamburger');
const display = window.getComputedStyle(hamburger).display;
console.log('Menu hamburger display:', display);
console.log('Hamburger devrait être visible:', width <= 768 ? 'OUI' : 'NON');
```

---

## 🎯 PROBLÈMES COURANTS ET SOLUTIONS

### Problème 1 : Le menu hamburger n'apparaît pas

**Symptôme :** Sur mobile (< 768px), le menu hamburger n'est pas visible

**Solutions :**
1. Vider le cache (Ctrl + Shift + R)
2. Vérifier que la largeur est bien < 768px
3. Inspecter l'élément avec DevTools :
   ```css
   .hamburger {
       display: flex; /* doit être "flex" sur mobile */
   }
   ```

---

### Problème 2 : Les grilles ne changent pas

**Symptôme :** Les services/cards restent en 3 colonnes sur mobile

**Solutions :**
1. Vider le cache
2. Vérifier dans DevTools → Onglet "Computed" :
   ```css
   .services-grid {
       grid-template-columns: 1fr; /* doit être "1fr" sur mobile */
   }
   ```

---

### Problème 3 : Débordement horizontal (scroll horizontal)

**Symptôme :** On peut faire défiler horizontalement sur mobile

**Solution :**
1. Ouvrez DevTools → Onglet "Elements"
2. Ajoutez temporairement ce CSS :
   ```css
   * {
       outline: 1px solid red;
   }
   ```
3. Identifiez l'élément qui dépasse
4. Vérifiez s'il a une largeur fixe en pixels

**Éléments à vérifier :**
- Images sans `max-width: 100%`
- Conteneurs avec `width` fixe
- Padding/margin trop grands

---

### Problème 4 : Textes trop petits sur mobile

**Symptôme :** Les textes sont illisibles sans zoom

**Vérification :**
Dans DevTools, vérifiez que ces tailles sont appliquées :

```css
/* Mobile (≤ 768px) */
.hero-title { font-size: 1.8rem; }
.section-title { font-size: 2rem; }

/* Petit Mobile (≤ 480px) */
.hero-title { font-size: 1.5rem; }
.section-title { font-size: 1.6rem; }
```

---

## 📱 TESTS RECOMMANDÉS

### Tailles d'écran à tester :

| Appareil | Largeur | Test |
|----------|---------|------|
| iPhone SE | 375px | ☐ Menu hamburger visible |
| iPhone 12 | 390px | ☐ 1 colonne pour services |
| iPhone 12 Pro Max | 428px | ☐ Textes lisibles |
| iPad Mini | 768px | ☐ 1-2 colonnes selon section |
| iPad Air | 820px | ☐ 2 colonnes pour services |
| Desktop | 1024px+ | ☐ 3 colonnes pour services |

---

## 🛠️ COMMANDES UTILES

### Pour forcer le rechargement du CSS :

**Méthode 1 : Version déjà appliquée**
Le fichier `index.html` ligne 7 contient déjà :
```html
<link rel="stylesheet" href="styles/main.css?v=4.0&responsive=true">
```

**Méthode 2 : Ajouter un timestamp**
Vous pouvez modifier la version manuellement :
```html
<link rel="stylesheet" href="styles/main.css?v=4.1">
```

---

## 🎨 VÉRIFICATION VISUELLE RAPIDE

### Ce qui DOIT se passer sur mobile (< 768px) :

✅ Menu hamburger visible en haut à droite
✅ Logo RISO centré ou à gauche
✅ Titre Hero lisible (pas trop grand, pas trop petit)
✅ Services en 1 colonne (pas côte à côte)
✅ Boutons en pleine largeur
✅ Formulaires occupent toute la largeur
✅ Pas de scroll horizontal
✅ Timeline verticale avec marqueurs à gauche
✅ Footer en 1 colonne

---

## 🚨 SI RIEN NE FONCTIONNE

### Dernière solution : Serveur Local

Le problème peut venir du fait que vous ouvrez le fichier directement (`file:///`).

**Installez un serveur local :**

1. **Avec Python (si installé) :**
   ```bash
   cd "C:\Users\EMMA YAO\Documents\projet_RISO1"
   python -m http.server 8000
   ```
   Puis ouvrez : `http://localhost:8000`

2. **Avec Node.js (si installé) :**
   ```bash
   npx http-server -p 8000
   ```
   Puis ouvrez : `http://localhost:8000`

3. **Extension VS Code :**
   - Installez "Live Server"
   - Clic droit sur `index.html` → "Open with Live Server"

---

## 📞 BESOIN D'AIDE ?

### Informations à fournir :

1. **Navigateur utilisé :**
   - Chrome / Firefox / Safari / Edge ?
   - Version ?

2. **Taille de votre écran :**
   - Ouvrez DevTools
   - Tapez dans la Console : `console.log(window.innerWidth + 'x' + window.innerHeight)`

3. **Capture d'écran :**
   - Faites une capture d'écran du problème
   - Montrez DevTools ouvert avec l'onglet "Elements"

4. **Message d'erreur :**
   - Ouvrez DevTools → Onglet "Console"
   - Copiez les erreurs en rouge (s'il y en a)

---

## ✅ CHECKLIST FINALE

Avant de dire que ça ne fonctionne pas, vérifiez :

- [ ] J'ai vidé le cache (Ctrl + Shift + R)
- [ ] J'ai testé sur différentes tailles (375px, 768px, 1024px)
- [ ] J'ai ouvert `test-responsive.html` pour voir l'indicateur
- [ ] J'ai vérifié dans DevTools que `main.css` est bien chargé
- [ ] J'ai testé dans un autre navigateur
- [ ] J'ai redémarré mon navigateur
- [ ] J'ai vérifié que le viewport meta tag est présent

---

## 🎉 RÉSULTAT ATTENDU

**Quand tout fonctionne, vous devriez voir :**

- Sur **mobile** : Menu hamburger, 1 colonne, textes adaptés
- Sur **tablette** : 2 colonnes, navigation normale
- Sur **desktop** : 3 colonnes, layout complet

**Testez maintenant avec `test-responsive.html` !**

---

**Dernière mise à jour :** 8 Octobre 2025
**Fichiers modifiés :** 
- `index.html` (cache-busting ajouté)
- `styles/main.css` (responsive complet)
- `test-responsive.html` (page de test créée)
