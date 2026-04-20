import { FormData as BriefFormData } from '../types';

// Types pour le service d'email
export interface EmailData {
  formData: BriefFormData;
  userName: string;
  userEmail: string;
}

// Service unifié pour l'envoi d'emails via LWS API
export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Envoi d\'email via EmailService...');
    console.log('Données:', emailData);

    // Créer le contenu de l'email au format HTML
    const emailContent = createEmailContent(emailData);

    // Envoyer via API LWS PHP
    const requestData = {
      userName: emailData.userName,
      userEmail: emailData.userEmail,
      nomEntreprise: emailData.formData.nomEntreprise || emailData.formData.nomProjet || 'Projet sans nom',
      telephone: emailData.formData.telephone || 'non spécifié',
      objectif: emailData.formData.objectifPrincipal || 'non spécifié',
      budget: emailData.formData.budgetGlobal || 'non spécifié'
    };

    const response = await fetch('./lws-deploy.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log('Réponse de l\'API:', result);

    return {
      success: true,
      message: 'Email envoyé avec succès'
    };

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      success: false,
      message: `Erreur lors de l'envoi: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    };
  }
};

// Fonction pour créer le contenu HTML de l'email
const createEmailContent = (emailData: EmailData): string => {
  return `
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
            <div class="field"><strong>Nom:</strong> ${emailData.userName}</div>
            <div class="field"><strong>Email:</strong> ${emailData.userEmail}</div>
            <div class="field"><strong>Téléphone:</strong> ${emailData.formData.telephone || 'non spécifié'}</div>
            <div class="field"><strong>Entreprise:</strong> ${emailData.formData.nomEntreprise || 'Non spécifié'}</div>
        </div>

        <div class="section">
            <h2>🎯 INFORMATIONS PROJET</h2>
            <div class="field"><strong>Nom du projet:</strong> ${emailData.formData.nomProjet || emailData.formData.nomEntreprise || 'Projet sans nom'}</div>
            <div class="field"><strong>Objectif principal:</strong> ${emailData.formData.objectifPrincipal || 'Non spécifié'}</div>
            <div class="field"><strong>Public cible:</strong> ${emailData.formData.ciblePrincipale || 'Non spécifié'}</div>
            <div class="field"><strong>Budget:</strong> ${emailData.formData.budgetGlobal || emailData.formData.budgetAlloue || 'Non spécifié'}</div>
            <div class="field"><strong>Site actuel:</strong> ${emailData.formData.siteActuel || 'Non spécifié'}</div>
        </div>

        <div class="section">
            <h2>📊 RÉCAPITULATIF</h2>
            <div class="field"><strong>Taille entreprise:</strong> ${emailData.formData.tailleEntreprise || 'Non spécifié'}</div>
            <div class="field"><strong>Secteur activité:</strong> ${emailData.formData.secteurActivite || 'Non spécifié'}</div>
            <div class="field"><strong>Phase entreprise:</strong> ${emailData.formData.phaseEntreprise || 'Non spécifié'}</div>
            <div class="field"><strong>CMS préféré:</strong> ${emailData.formData.cmsPrefere || 'Non spécifié'}</div>
            <div class="field"><strong>Langues du site:</strong> ${Array.isArray(emailData.formData.languesSite) ? emailData.formData.languesSite.join(', ') : emailData.formData.languesSite || 'Non spécifié'}</div>
        </div>
    </div>

    <div class="footer">
        <p>Cet email a été généré automatiquement depuis la plateforme Digital Mind+ le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
        <p>🚀 <strong>Digital Mind+</strong> - Votre partenaire stratégique digital</p>
    </div>
</body>
</html>
  `;
};
