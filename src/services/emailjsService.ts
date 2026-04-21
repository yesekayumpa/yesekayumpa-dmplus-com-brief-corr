import { FormData as BriefFormData } from '../types';
import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'votre_cle_publique';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'votre_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'votre_template_id';
const EMAILJS_TEMPLATE_SUMMARY_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_SUMMARY_ID || 'votre_template_summary_id';


export interface EmailData {
  formData: BriefFormData;
  userName: string;
  userEmail: string;
}

// Initialiser EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Service d'envoi via EmailJS avec deux templates
export const sendEmailViaEmailJS = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Envoi d\'email via EmailJS...');
    console.log('Données:', emailData);

    // Préparer les paramètres communs pour EmailJS
    const baseParams = {
      to_email: 'yesekayumpab@gmail.com', // Email de l'entreprise
      from_name: emailData.userName,
      from_email: emailData.userEmail,
      reply_to: emailData.userEmail,
      date_soumission: new Date().toLocaleDateString('fr-FR'),
      heure_soumission: new Date().toLocaleTimeString('fr-FR'),
    };

    // Paramètres pour le premier email (simple)
    const firstTemplateParams = {
      ...baseParams,
      nom_entreprise: emailData.formData.nomEntreprise || emailData.formData.nomProjet || 'Projet sans nom',
      telephone: emailData.formData.telephone || 'non spécifié',
      objectif_principal: emailData.formData.objectifPrincipal || 'non spécifié',
      public_cible: emailData.formData.ciblePrincipale || 'non spécifié',
      budget_global: emailData.formData.budgetGlobal || emailData.formData.budgetAlloue || 'non spécifié',
      site_actuel: emailData.formData.siteActuel || 'non spécifié',
      taille_entreprise: emailData.formData.tailleEntreprise || 'non spécifié',
      secteur_activite: emailData.formData.secteurActivite || 'non spécifié',
      phase_entreprise: emailData.formData.phaseEntreprise || 'non spécifié',
      cms_prefere: emailData.formData.cmsPrefere || 'non spécifié',
      langues_site: Array.isArray(emailData.formData.languesSite)
        ? emailData.formData.languesSite.join(', ')
        : emailData.formData.languesSite || 'non spécifié',
      pages_souhaitees: Array.isArray(emailData.formData.pagesSouhaitees)
        ? emailData.formData.pagesSouhaitees.join(', ')
        : emailData.formData.pagesSouhaitees || 'non spécifié',
      fonctionnalites_site: Array.isArray(emailData.formData.fonctionnalitesSite)
        ? emailData.formData.fonctionnalitesSite.join(', ')
        : emailData.formData.fonctionnalitesSite || 'non spécifié',
      objectifs_seo: emailData.formData.objectifsSEO || 'non spécifié',
      mots_cles: emailData.formData.motsClesPrincipaux || 'non spécifié',
      message: `Brief stratégique complet reçu le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`
    };

    // Paramètres pour le second email (résumé complet)
    const summaryTemplateParams = {
      ...baseParams,
      // Informations dossier
      numero_dossier: `DMC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      conseiller_dm: '________________________',

      // Variables client/entreprise
      nom_entreprise: emailData.formData.nomEntreprise || 'Non spécifié',
      siege_social: emailData.formData.siegeSocial || 'Non spécifié',
      fonction_titre: emailData.formData.fonctionTitre || 'Non spécifié',
      description_activite: emailData.formData.descriptionActivite || 'Non spécifié',
      difference_concurrents: emailData.formData.differenceConcurrents || 'Non spécifié',

      // Variables objectifs
      objectifs_principaux: Array.isArray(emailData.formData.objectifPrincipal)
        ? emailData.formData.objectifPrincipal.join(', ') + (emailData.formData.objectifAutre ? ` (${emailData.formData.objectifAutre})` : '')
        : emailData.formData.objectifPrincipal || 'Non spécifié',
      cible_principale: emailData.formData.ciblePrincipale || 'Non spécifié',
      zones_geographiques: emailData.formData.zonesGeographiques || 'Non spécifié',
      message_cle: emailData.formData.messageCle || 'Non spécifié',
      objectifs_12_mois: emailData.formData.objectifs12Mois || 'Non spécifié',
      ton_style: Array.isArray(emailData.formData.tonStyle) ? emailData.formData.tonStyle.join(', ') : 'Non spécifié',

      // Variables budget/délais
      budget_global: emailData.formData.budgetGlobal || 'Non spécifié',
      modalites_paiement: emailData.formData.modalitesPaiement + (emailData.formData.modaliteAutre ? ` (${emailData.formData.modaliteAutre})` : ''),
      delai_livraison: emailData.formData.delaiLivraison || 'Non spécifié',
      date_mise_en_ligne: emailData.formData.dateMiseEnLigne || 'Non spécifié',
      contraintes_particulieres: emailData.formData.contraintesParticulieres || 'Non spécifié',

      // Variables techniques
      nom_domaine_souhaite: emailData.formData.nomDomaineSouhaite || 'Non spécifié',
      statut_domaine: emailData.formData.statutDomaine || 'Non spécifié',
      cms_prefere: emailData.formData.cmsPrefere + (emailData.formData.cmsAutre ? ` (${emailData.formData.cmsAutre})` : ''),
      hebergement: emailData.formData.hebergement || 'Non spécifié',
      hebergeur_actuel: emailData.formData.hebergeurActuel || 'Non spécifié',
      langues_site: Array.isArray(emailData.formData.languesSite)
        ? emailData.formData.languesSite.join(', ') + (emailData.formData.langueAutre ? ` (${emailData.formData.langueAutre})` : '')
        : emailData.formData.languesSite || 'Non spécifié',

      // Variables contenu
      redacteur_textes: emailData.formData.redacteurTextes || 'Non spécifié',
      fournisseur_visuels: emailData.formData.fournisseurVisuels || 'Non spécifié',
      avez_logo: emailData.formData.avezLogo || 'Non spécifié',
      avez_charte: emailData.formData.avezCharte || 'Non spécifié',
      couleurs_selectionnees: emailData.formData.couleursSelectionnees && emailData.formData.couleursSelectionnees.length > 0
        ? emailData.formData.couleursSelectionnees.join(', ') + (emailData.formData.couleursSelectionnees.length < 3 ? ' (minimum 3 requis)' : '')
        : 'Aucune couleur sélectionnée',
      typographie_souhaitee: emailData.formData.typographieSouhaitee || 'Non spécifié',
      sites_reference: emailData.formData.sitesReference || 'Non spécifié',
      ce_que_vous_ne_voulez_pas: emailData.formData.ceQueVousNeVoulezPas || 'Non spécifié',

      // Variables pages/fonctionnalités
      pages_souhaitees: Array.isArray(emailData.formData.pagesSouhaitees)
        ? emailData.formData.pagesSouhaitees.join(', ') + (emailData.formData.pagesAutres ? ` (${emailData.formData.pagesAutres})` : '')
        : 'Non spécifié',
      arborescence_souhaitee: emailData.formData.arborescenceSouhaitee || 'Non spécifié',
      page_prioritaire: emailData.formData.pagePrioritaire || 'Non spécifié',
      fonctionnalites_integrer: Array.isArray(emailData.formData.fonctionnalitesIntegrer)
        ? emailData.formData.fonctionnalitesIntegrer.join(', ') + (emailData.formData.fonctionnaliteAutre ? ` (${emailData.formData.fonctionnaliteAutre})` : '')
        : 'Non spécifié',
      reseaux_sociaux: Array.isArray(emailData.formData.reseauxSociaux) ? emailData.formData.reseauxSociaux.join(', ') : 'Non spécifié',
      adaptabilite_mobile: emailData.formData.adaptabiliteMobile || 'Non spécifié',
      pwa: emailData.formData.pwa ? 'Oui' : 'Non',

      // Variables marketing
      objectifs_marketing: Array.isArray(emailData.formData.marketingMix?.objectifsMarketing)
        ? emailData.formData.marketingMix.objectifsMarketing.join(', ')
        : 'Non spécifié',
      budget_marketing: emailData.formData.marketingMix?.budgetMarketing || 'Non spécifié',
      canaux_prioritaires: Array.isArray(emailData.formData.marketingMix?.canauxPrioritaires)
        ? emailData.formData.marketingMix.canauxPrioritaires.join(', ')
        : 'Non spécifié',
      contenu_marketing: emailData.formData.marketingMix?.contenuMarketing || 'Non spécifié',
      frequence_publication: emailData.formData.marketingMix?.frequencePublication || 'Non spécifié',
      kpis_principaux: emailData.formData.marketingMix?.kpisPrincipaux || 'Non spécifié',

      // Variables maintenance
      maintenance_souhaitee: emailData.formData.maintenanceSouhaitee || 'Non spécifié',
      mises_a_jour: emailData.formData.misesAJour || 'Non spécifié',
      evolutions_futures: emailData.formData.evolutionsFutures || 'Non spécifié',
      autres_infos_utiles: emailData.formData.autresInfosUtiles || 'Non spécifié',

      // Variables concurrents
      concurrents_analyse: emailData.formData.concurrents && emailData.formData.concurrents.length > 0
        ? emailData.formData.concurrents.filter(c => c.nom).map((c, i) =>
          `Concurrent ${i + 1}: ${c.nom}\nCe qu'ils font bien: ${c.bien}\nCe que vous faites mieux: ${c.mieux}`
        ).join('\n\n')
        : 'Aucun concurrent renseigné',
    };

    // Envoyer le premier email
    console.log('Envoi du premier email...');
    const firstResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      firstTemplateParams
    );
    console.log('Premier email envoyé:', firstResponse.id);

    // Envoyer le second email (résumé complet)
    console.log('Envoi du second email (résumé complet)...');
    const secondResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_SUMMARY_ID,
      summaryTemplateParams
    );
    console.log('Second email envoyé:', secondResponse.id);

    return {
      success: true,
      message: 'Deux emails envoyés avec succès via EmailJS !',
      messageId: `${firstResponse.id} + ${secondResponse.id}`
    };

  } catch (error) {
    console.error('Erreur lors de l\'envoi via EmailJS:', error);

    // Fallback: utiliser mailto
    return await sendViaMailtoFallback(emailData);
  }
};

// Fallback avec mailto si EmailJS échoue
const sendViaMailtoFallback = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const subject = `Nouveau Brief Stratégique - ${emailData.formData.nomProjet || 'Projet sans nom'} - ${emailData.userName}`;
    const body = `NOUVEAU BRIEF STRATÉGIQUE

Client: ${emailData.userName}
Email: ${emailData.userEmail}
Entreprise: ${emailData.formData.nomEntreprise || 'Non spécifié'}
Projet: ${emailData.formData.nomProjet || 'Non spécifié'}

Date: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}

Veuillez consulter la plateforme pour les détails complets.`;

    const mailtoLink = `mailto:yesekayumpab@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');

    return {
      success: true,
      message: 'Email envoyé via client mail (fallback)'
    };

  } catch (error) {
    return {
      success: false,
      message: 'Échec de tous les modes d\'envoi'
    };
  }
};

// Fonction pour configurer EmailJS (à appeler au démarrage de l'app)
export const configureEmailJS = (publicKey: string, serviceId: string, templateId: string) => {
  emailjs.init(publicKey);
  // Mettre à jour les variables globales
  (window as any).EMAILJS_SERVICE_ID = serviceId;
  (window as any).EMAILJS_TEMPLATE_ID = templateId;
};
