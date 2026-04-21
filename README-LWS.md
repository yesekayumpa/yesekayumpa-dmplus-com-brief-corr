# 🚀 Déploiement LWS - Digital Mind+ Brief Form

## 📋 Configuration Complète pour Hébergement LWS

Votre projet est maintenant **100% configuré pour LWS** avec tous les fichiers nécessaires.

---

## 🎯 Fichiers Créés pour LWS

### 1. **`.htaccess`** - Configuration Apache

- Gestion du routing React (SPA)
- Compression et cache
- En-têtes de sécurité

### 2. **`lws-deploy.php`** - API Email

- Envoi d'emails via PHPMailer
- Configuration SMTP LWS intégrée
- Double envoi: client + entreprise

### 3. **`composer.json`** - Dépendances PHP

- PHPMailer pour l'envoi d'emails
- Autoloading PSR-4

### 4. **`deploy-lws.sh`** - Script de déploiement

- Build automatique
- Création package ZIP
- Instructions détaillées

---

## 🚀 Étapes de Déploiement

### Étape 1: Build du Projet

```bash
npm run build
```

### Étape 2: Exécuter le Script de Déploiement

```bash
# Sur Windows (PowerShell)
.\deploy-lws.sh

# Sur Mac/Linux
./deploy-lws.sh
```

### Étape 3: Upload sur LWS

1. Connectez-vous à votre cPanel LWS
2. Allez dans "Gestionnaire de fichiers"
3. Uploadez `brief-form-lws.zip`
4. Décompressez le fichier dans votre domaine

### Étape 4: Configuration PHP sur LWS

Via cPanel LWS → "Sélecteur de PHP":

- **Version PHP**: 8.0 ou supérieur
- **Extensions requises**:
  - `mbstring`
  - `json`
  - `curl`
  - `openssl`

### Étape 5: Installation Dépendances

Via SSH LWS ou Terminal cPanel:

```bash
cd votre-dossier/
composer install
```

---

## ⚙️ Configuration Email

Votre configuration SMTP LWS est déjà intégrée:

```php
Host: mail.dmplus-group.com
Port: 465 (SSL)
Username: yesekayumpab@gmail.com
Password: Yumpa@2003
```

### Emails Envoyés:

1. **Au client**: Confirmation de réception
2. **À l'entreprise**: Nouveau brief reçu

---

## Accès et Test

### URLs:

- **Site principal**: `https://votre-domaine.com`
- **API Email**: `https://votre-domaine.com/lws-deploy.php`

### Test Complet:

1. Visitez votre domaine
2. Remplissez le formulaire (10 étapes)
3. Vérifiez la réception des emails

---

## ERREUR 404 - SOLUTION COMPLÈTE

### Problème :

```
Erreur lors de l'envoi: Erreur HTTP 404: <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
```

### Causes Possibles :

#### 1. **Fichier `lws-deploy.php` manquant ou mal placé**

**Solution :**

- Vérifiez que `lws-deploy.php` est bien à la **racine** de votre domaine
- Pas dans un sous-dossier comme `dist/` ou `src/`
- Le chemin exact doit être : `votre-domaine.com/lws-deploy.php`

#### 2. **Permissions incorrectes**

**Solution :**

```bash
# Via SSH LWS ou cPanel Terminal
chmod 644 lws-deploy.php
chmod 755 dossier-vendor/
```

#### 3. **Configuration `.htaccess` incorrecte**

**Solution :**

- Assurez-vous que `.htaccess` est bien à la racine
- Il ne doit **pas** bloquer l'accès aux fichiers PHP

#### 4. **Problème de chemin dans le frontend**

**Solution :**
Dans `src/services/emailService.ts`, le chemin doit être :

```typescript
const response = await fetch("./lws-deploy.php", {
  method: "POST",
  // ...
});
```

**ATTENTION** : Utilisez `./lws-deploy.php` (relatif) et PAS `/lws-deploy.php` (absolu)

#### 5. **Dossier `vendor` manquant**

**Solution :**

```bash
# Via SSH LWS
cd votre-dossier/
composer install
```

### Étapes de Diagnostic Complet :

1. **Test direct de l'API** :

   ```
   https://votre-domaine.com/lws-deploy.php
   ```

   Devrait afficher `{"error":"Méthode non autorisée"}` ou similaire

2. **Vérification des fichiers** :

   ```bash
   ls -la lws-deploy.php
   ls -la vendor/
   ```

3. **Test avec curl** :
   ```bash
   curl -X POST https://votre-domaine.com/lws-deploy.php \
        -H "Content-Type: application/json" \
        -d '{"test":"data"}'
   ```

### Solution Rapide (99% des cas) :

1. **Uploadez `lws-deploy.php` à la racine**
2. **Exécutez `composer install`**
3. **Vérifiez les permissions (644)**
4. **Testez à nouveau**

### Structure Dossier Correcte :

```
votre-domaine.com/
  index.html
  .htaccess
  lws-deploy.php
  composer.json
  vendor/
  assets/
```

### Si le problème persiste :

1. Contactez le support LWS : 01 84 13 00 00
2. Demandez de vérifier les logs d'erreurs Apache
3. Vérifiez que PHP 8.0+ est bien activé

---

## 🔧 Dépannage

### Si les emails ne partent pas:

1. Vérifiez les extensions PHP activées
2. Testez la configuration SMTP via cPanel
3. Consultez les logs d'erreurs LWS

### Si le site ne s'affiche pas:

1. Vérifiez que `.htaccess` est bien uploadé
2. Assurez-vous que `index.html` existe
3. Testez avec un navigateur en mode privé

---

## 📞 Support LWS

- **Documentation**: https://www.lws.fr/aide/
- **Support**: 01 84 13 00 00
- **Email**: support@lws.fr

---

## ✅ Checklist Déploiement

- [ ] Build React (`npm run build`)
- [ ] Exécuter script déploiement
- [ ] Upload ZIP sur LWS
- [ ] Décompresser les fichiers
- [ ] Configurer PHP 8.0+
- [ ] Installer dépendances (`composer install`)
- [ ] Tester le formulaire
- [ ] Vérifier réception emails

---

**🎉 Votre site est maintenant prêt pour LWS !**

_Tous les fichiers sont optimisés pour l'hébergement mutualisé LWS avec configuration email intégrée._
