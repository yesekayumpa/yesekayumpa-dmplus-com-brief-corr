# Configuration EmailJS pour Digital Mind+

## 📧 Installation et Configuration

### 1. Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Inscrivez-vous avec votre email (yesekayumpab@gmail.com)
3. Vérifiez votre email

### 2. Créer un service email
1. Dans le dashboard EmailJS, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez "Gmail" (ou autre provider)
4. Connectez votre compte Gmail
5. Nommez le service (ex: "dmplus-gmail")

### 3. Créer un template email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce modèle HTML :

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouveau Brief Stratégique - Digital Mind+</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #E31E24; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px 20px; }
        .section { margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #E31E24; }
        .section h2 { color: #E31E24; margin-top: 0; margin-bottom: 15px; }
        .field { margin-bottom: 8px; padding: 5px 0; }
        .field strong { color: #333; display: inline-block; min-width: 150px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 NOUVEAU BRIEF STRATÉGIQUE</h1>
            <p><strong>Digital Mind+</strong> - Plateforme de Brief Stratégique</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <p><strong>Un client vient de soumettre un nouveau brief stratégique!</strong></p>
                <p>Date: {{date_soumission}} à {{heure_soumission}}</p>
            </div>

            <div class="section">
                <h2>👤 INFORMATIONS CLIENT</h2>
                <div class="field"><strong>Nom:</strong> {{from_name}}</div>
                <div class="field"><strong>Email:</strong> {{from_email}}</div>
                <div class="field"><strong>Téléphone:</strong> {{telephone}}</div>
            </div>

            <div class="section">
                <h2>🏢 INFORMATIONS ENTREPRISE</h2>
                <div class="field"><strong>Nom:</strong> {{nom_entreprise}}</div>
                <div class="field"><strong>Taille:</strong> {{taille_entreprise}}</div>
                <div class="field"><strong>Secteur:</strong> {{secteur_activite}}</div>
                <div class="field"><strong>Phase:</strong> {{phase_entreprise}}</div>
            </div>

            <div class="section">
                <h2>🎯 INFORMATIONS PROJET</h2>
                <div class="field"><strong>Objectif principal:</strong> {{objectif_principal}}</div>
                <div class="field"><strong>Public cible:</strong> {{public_cible}}</div>
                <div class="field"><strong>Budget:</strong> {{budget_global}}</div>
                <div class="field"><strong>Site actuel:</strong> {{site_actuel}}</div>
            </div>

            <div class="section">
                <h2>🛠️ TECHNIQUE</h2>
                <div class="field"><strong>CMS préféré:</strong> {{cms_prefere}}</div>
                <div class="field"><strong>Langues:</strong> {{langues_site}}</div>
                <div class="field"><strong>Pages souhaitées:</strong> {{pages_souhaitees}}</div>
                <div class="field"><strong>Fonctionnalités:</strong> {{fonctionnalites_site}}</div>
            </div>

            <div class="section">
                <h2>🔍 SEO</h2>
                <div class="field"><strong>Objectifs SEO:</strong> {{objectifs_seo}}</div>
                <div class="field"><strong>Mots-clés:</strong> {{mots_cles}}</div>
            </div>
        </div>

        <div class="footer">
            <p>Cet email a été généré automatiquement depuis la plateforme Digital Mind+ le {{date_soumission}} à {{heure_soumission}}</p>
            <p>🚀 <strong>Digital Mind+</strong> - Votre partenaire stratégique digital</p>
        </div>
    </div>
</body>
</html>
```

### 4. Récupérer les identifiants
Une fois le template créé, récupérez :
- **Public Key** : Dans Account > General > Public Key
- **Service ID** : Dans Email Services > cliquez sur votre service
- **Template ID** : Dans Email Templates > cliquez sur votre template

### 5. Configurer le projet
1. Copiez `.env.example` vers `.env`
2. Remplissez les identifiants :
```bash
VITE_EMAILJS_PUBLIC_KEY=votre_cle_publique
VITE_EMAILJS_SERVICE_ID=votre_service_id  
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
```

## 🚀 Utilisation

### En développement local
```bash
npm run dev
```
Les emails seront envoyés directement via EmailJS.

### En production
Déployez simplement votre build Vite sur n'importe quel hébergeur statique :
- Vercel
- Netlify  
- GitHub Pages
- LWS (avec les fichiers build)

## ⚠️ Limites Gratuites

- **200 emails par mois**
- **2 emails par seconde**
- Templates illimités

Pour plus d'envois, envisagez un plan payant EmailJS.

## 🔄 Fallback

Si EmailJS échoue, le système utilisera automatiquement `mailto:` pour ouvrir le client mail par défaut.

## 🐛 Débogage

Les logs EmailJS sont disponibles dans la console du navigateur. En cas d'erreur :
1. Vérifiez vos identifiants dans `.env`
2. Vérifiez les noms des variables dans le template
3. Consultez la console pour les détails de l'erreur
