# Template EmailJS pour Digital Mind+

Copiez-collez ce code HTML dans votre template EmailJS :

## Template HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Brief Stratégique - Digital Mind+</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #E31E24 0%, #1A1C21 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h2 {
            color: #E31E24;
            border-bottom: 2px solid #E31E24;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .field {
            margin-bottom: 10px;
            padding: 8px;
            background: white;
            border-radius: 5px;
        }
        .field strong {
            color: #E31E24;
            display: inline-block;
            width: 200px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 NOUVEAU BRIEF STRATÉGIQUE</h1>
        <p><strong>Digital Mind+</strong> - Plateforme de Brief Stratégique</p>
    </div>
    
    <div class="content">
        <div class="section">
            <h2>👤 INFORMATIONS CLIENT</h2>
            <div class="field"><strong>Nom:</strong> {{from_name}}</div>
            <div class="field"><strong>Email:</strong> {{from_email}}</div>
            <div class="field"><strong>Téléphone:</strong> {{telephone}}</div>
            <div class="field"><strong>Entreprise:</strong> {{nom_entreprise}}</div>
        </div>

        <div class="section">
            <h2>🎯 INFORMATIONS PROJET</h2>
            <div class="field"><strong>Nom du projet:</strong> {{nom_projet}}</div>
            <div class="field"><strong>Objectif principal:</strong> {{objectif_principal}}</div>
            <div class="field"><strong>Public cible:</strong> {{public_cible}}</div>
            <div class="field"><strong>Budget:</strong> {{budget_global}}</div>
            <div class="field"><strong>Site actuel:</strong> {{site_actuel}}</div>
        </div>

        <div class="section">
            <h2>📊 RÉCAPITULATIF</h2>
            <div class="field"><strong>Taille entreprise:</strong> {{taille_entreprise}}</div>
            <div class="field"><strong>Secteur activité:</strong> {{secteur_activite}}</div>
            <div class="field"><strong>Phase entreprise:</strong> {{phase_entreprise}}</div>
            <div class="field"><strong>CMS préféré:</strong> {{cms_prefere}}</div>
            <div class="field"><strong>Langues du site:</strong> {{langues_site}}</div>
        </div>

        <div class="section">
            <h2>🛠️ FONCTIONNALITÉS</h2>
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
</body>
</html>
```

## Variables EmailJS requises

Assurez-vous que votre template EmailJS utilise ces variables exactes :

### Variables client
- `{{from_name}}` - Nom du client
- `{{from_email}}` - Email du client  
- `{{reply_to}}` - Email pour réponse (même que from_email)
- `{{telephone}}` - Téléphone du client

### Variables entreprise/projet
- `{{nom_entreprise}}` - Nom de l'entreprise
- `{{nom_projet}}` - Nom du projet
- `{{objectif_principal}}` - Objectif principal
- `{{public_cible}}` - Public cible
- `{{budget_global}}` - Budget
- `{{site_actuel}}` - Site actuel

### Variables techniques
- `{{taille_entreprise}}` - Taille de l'entreprise
- `{{secteur_activite}}` - Secteur d'activité
- `{{phase_entreprise}}` - Phase de l'entreprise
- `{{cms_prefere}}` - CMS préféré
- `{{langues_site}}` - Langues du site
- `{{pages_souhaitees}}` - Pages souhaitées
- `{{fonctionnalites_site}}` - Fonctionnalités du site

### Variables SEO
- `{{objectifs_seo}}` - Objectifs SEO
- `{{mots_cles}}` - Mots-clés principaux

### Variables système
- `{{date_soumission}}` - Date de soumission
- `{{heure_soumission}}` - Heure de soumission
- `{{to_email}}` - Email de destination (yesekayumpab@gmail.com)

## Configuration dans EmailJS

1. **To Email** : `{{to_email}}`
2. **Reply To** : `{{reply_to}}`
3. **Subject** : `Nouveau Brief Stratégique - {{nom_entreprise}} - {{from_name}}`

Ce template est basé sur le design exact de votre fonction `createEmailContent` existante.
