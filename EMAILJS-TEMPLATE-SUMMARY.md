# Template EmailJS de Résumé (Second Email)

Ce template sera envoyé juste après le premier email et contiendra le résumé complet du brief dans le même format que le PDF généré.

## Template HTML pour EmailJS

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Résumé Complet du Brief - Digital Mind+</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f8f9fa;
        }
        .header {
            background: linear-gradient(135deg, #1A1C21 0%, #E31E24 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin-bottom: 0;
        }
        .header h1 {
            font-size: 28px;
            margin: 0;
            font-weight: bold;
        }
        .header .subtitle {
            font-size: 16px;
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .section {
            margin-bottom: 30px;
            border-left: 4px solid #E31E24;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 0 8px 8px 0;
        }
        .section-header {
            background: #E31E24;
            color: white;
            padding: 10px 15px;
            margin: -20px -20px 20px -20px;
            font-weight: bold;
            font-size: 14px;
            border-radius: 4px 0 0 4px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        .info-item {
            background: white;
            padding: 12px;
            border-radius: 5px;
            border: 1px solid #e5e7eb;
        }
        .info-label {
            font-weight: bold;
            color: #E31E24;
            font-size: 12px;
            margin-bottom: 5px;
            display: block;
        }
        .info-value {
            color: #333;
            font-size: 13px;
        }
        .full-width {
            grid-column: 1 / -1;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            border-top: 2px solid #E31E24;
            font-size: 11px;
            color: #666;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .highlight {
            background: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #ffc107;
            margin-bottom: 20px;
        }
        .two-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        @media (max-width: 600px) {
            .info-grid, .two-columns {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>DM+ COM. & MARKETING</h1>
        <div class="subtitle">Digital Mind+ Group - RÉSUMÉ COMPLET DU BRIEF</div>
    </div>
    
    <div class="content">
        <div class="highlight">
            <strong>Informations du dossier :</strong> N° Dossier: {{numero_dossier}} | Date: {{date_soumission}} | Conseiller DM+: {{conseiller_dm}}
        </div>

        <!-- SECTION 01: INFORMATIONS CLIENT -->
        <div class="section">
            <div class="section-header">01 INFORMATIONS SUR LE CLIENT & L'ENTREPRISE</div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Nom de l'entreprise</span>
                    <span class="info-value">{{nom_entreprise}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Secteur d'activité</span>
                    <span class="info-value">{{secteur_activite}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Pays / Ville du siège</span>
                    <span class="info-value">{{siege_social}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Site internet actuel</span>
                    <span class="info-value">{{site_actuel}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Fonction / Titre</span>
                    <span class="info-value">{{fonction_titre}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Email de contact</span>
                    <span class="info-value">{{from_email}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Téléphone</span>
                    <span class="info-value">{{telephone}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Taille de l'entreprise</span>
                    <span class="info-value">{{taille_entreprise}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Phase de l'entreprise</span>
                    <span class="info-value">{{phase_entreprise}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Description de l'activité</span>
                    <span class="info-value">{{description_activite}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">En quoi vous êtes différent</span>
                    <span class="info-value">{{difference_concurrents}}</span>
                </div>
            </div>
        </div>

        <!-- SECTION 02: OBJECTIFS -->
        <div class="section">
            <div class="section-header">02 OBJECTIFS DU PROJET</div>
            <div class="info-grid">
                <div class="info-item full-width">
                    <span class="info-label">Objectifs principaux du site</span>
                    <span class="info-value">{{objectifs_principaux}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cible principale du site</span>
                    <span class="info-value">{{cible_principale}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Zones géographiques cibles</span>
                    <span class="info-value">{{zones_geographiques}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Message clé du site</span>
                    <span class="info-value">{{message_cle}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Objectifs à 12 mois via le site</span>
                    <span class="info-value">{{objectifs_12_mois}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ton et style souhaités</span>
                    <span class="info-value">{{ton_style}}</span>
                </div>
            </div>
        </div>

        <!-- SECTION 03: BUDGET & DÉLAIS -->
        <div class="section">
            <div class="section-header">03 BUDGET & DÉLAIS</div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Budget global envisagé</span>
                    <span class="info-value">{{budget_global}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Modalités de paiement</span>
                    <span class="info-value">{{modalites_paiement}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Délai de livraison souhaité</span>
                    <span class="info-value">{{delai_livraison}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Date de mise en ligne souhaitée</span>
                    <span class="info-value">{{date_mise_en_ligne}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Contraintes particulières</span>
                    <span class="info-value">{{contraintes_particulieres}}</span>
                </div>
            </div>
        </div>

        <!-- SECTION 04: TECHNIQUE -->
        <div class="section">
            <div class="section-header">04 NOM DE DOMAINE & ASPECTS TECHNIQUES</div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Nom de domaine souhaité</span>
                    <span class="info-value">{{nom_domaine_souhaite}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Statut du nom de domaine</span>
                    <span class="info-value">{{statut_domaine}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">CMS préféré</span>
                    <span class="info-value">{{cms_prefere}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Hébergement</span>
                    <span class="info-value">{{hebergement}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Nom de l'hébergeur actuel</span>
                    <span class="info-value">{{hebergeur_actuel}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Langues du site</span>
                    <span class="info-value">{{langues_site}}</span>
                </div>
            </div>
        </div>

        <!-- SECTION 05: CONTENU -->
        <div class="section">
            <div class="section-header">05 CONTENU DU SITE</div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Qui rédige les textes ?</span>
                    <span class="info-value">{{redacteur_textes}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Qui fournit les visuels ?</span>
                    <span class="info-value">{{fournisseur_visuels}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Avez-vous un logo ?</span>
                    <span class="info-value">{{avez_logo}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Avez-vous une charte ?</span>
                    <span class="info-value">{{avez_charte}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Couleurs souhaitées</span>
                    <span class="info-value">{{couleurs_selectionnees}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Typographie souhaitée</span>
                    <span class="info-value">{{typographie_souhaitee}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Sites de référence appréciés</span>
                    <span class="info-value">{{sites_reference}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Ce que vous ne voulez pas</span>
                    <span class="info-value">{{ce_que_vous_ne_voulez_pas}}</span>
                </div>
            </div>
        </div>

        <!-- SECTION 06 & 07: PAGES & FONCTIONNALITÉS -->
        <div class="two-columns">
            <div class="section">
                <div class="section-header">06 PAGES SOUHAITÉES</div>
                <div class="info-grid">
                    <div class="info-item full-width">
                        <span class="info-label">Pages souhaitées</span>
                        <span class="info-value">{{pages_souhaitees}}</span>
                    </div>
                    <div class="info-item full-width">
                        <span class="info-label">Arborescence souhaitée</span>
                        <span class="info-value">{{arborescence_souhaitee}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Page(s) prioritaire(s)</span>
                        <span class="info-value">{{page_prioritaire}}</span>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-header">07 FONCTIONNALITÉS SOUHAITÉES</div>
                <div class="info-grid">
                    <div class="info-item full-width">
                        <span class="info-label">Fonctionnalités à intégrer</span>
                        <span class="info-value">{{fonctionnalites_integrer}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Réseaux sociaux à intégrer</span>
                        <span class="info-value">{{reseaux_sociaux}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Adaptabilité mobile</span>
                        <span class="info-value">{{adaptabilite_mobile}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">PWA (Progressive Web App)</span>
                        <span class="info-value">{{pwa}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 08: MARKETING MIX -->
        <div class="section">
            <div class="section-header">08 MARKETING MIX</div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Objectifs Marketing</span>
                    <span class="info-value">{{objectifs_marketing}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Budget Marketing Mensuel</span>
                    <span class="info-value">{{budget_marketing}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Canaux Prioritaires</span>
                    <span class="info-value">{{canaux_prioritaires}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Contenu Marketing</span>
                    <span class="info-value">{{contenu_marketing}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Fréquence Publication</span>
                    <span class="info-value">{{frequence_publication}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">KPIs Principaux</span>
                    <span class="info-value">{{kpis_principaux}}</span>
                </div>
            </div>
        </div>

        <!-- SECTION 09: MAINTENANCE -->
        <div class="section">
            <div class="section-header">09 MAINTENANCE & ÉVOLUTION POST-LIVRAISON</div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Maintenance souhaitée</span>
                    <span class="info-value">{{maintenance_souhaitee}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Mises à jour du contenu</span>
                    <span class="info-value">{{mises_a_jour}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Évolutions futures envisagées</span>
                    <span class="info-value">{{evolutions_futures}}</span>
                </div>
                <div class="info-item full-width">
                    <span class="info-label">Autres informations utiles</span>
                    <span class="info-value">{{autres_infos_utiles}}</span>
                </div>
            </div>
        </div>

        <!-- SECTION 10: ANALYSE CONCURRENTIELLE -->
        <div class="section">
            <div class="section-header">10 ANALYSE CONCURRENTIELLE</div>
            <div class="info-grid">
                <div class="info-item full-width">
                    <span class="info-label">Concurrents analysés</span>
                    <span class="info-value">{{concurrents_analyse}}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>Digital Mind+ Group</strong> - Brief de développement complet</p>
        <p>Généré automatiquement le {{date_soumission}} à {{heure_soumission}}</p>
        <p>Contact: (+221) 76 619 34 10 / 33 829 58 06 | communication@dmplus-group.com</p>
        <p>NINEA : 006879227 | RCCM : SN STL 2018 A0973 | Médina rue 37x24 / Dakar, Sénégal</p>
    </div>
</body>
</html>
```

## Variables additionnelles requises

Ce template nécessite les variables supplémentaires suivantes dans votre service EmailJS :

```typescript
// Ajouter dans emailjsService.ts - templateParams
numero_dossier: `DMC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
conseiller_dm: '________________________',

// Variables client/entreprise
siege_social: emailData.formData.siegeSocial || 'Non spécifié',
fonction_titre: emailData.formData.fonctionTitre || 'Non spécifié',
description_activite: emailData.formData.descriptionActivite || 'Non spécifié',
difference_concurrents: emailData.formData.differenceConcurrents || 'Non spécifié',

// Variables objectifs
objectifs_principaux: Array.isArray(emailData.formData.objectifPrincipal) 
  ? emailData.formData.objectifPrincipal.join(', ') + (emailData.formData.objectifAutre ? ` (${emailData.formData.objectifAutre})` : '')
  : emailData.formData.objectifPrincipal || 'Non spécifié',
zones_geographiques: emailData.formData.zonesGeographiques || 'Non spécifié',
message_cle: emailData.formData.messageCle || 'Non spécifié',
objectifs_12_mois: emailData.formData.objectifs12Mois || 'Non spécifié',
ton_style: Array.isArray(emailData.formData.tonStyle) ? emailData.formData.tonStyle.join(', ') : 'Non spécifié',

// Variables budget/délais
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
```

## Configuration EmailJS

1. **Créez un deuxième template** dans votre dashboard EmailJS
2. **Utilisez le HTML ci-dessus** 
3. **Configurez les variables** avec la liste complète
4. **Mettez à jour le service** pour envoyer les deux emails séquentiellement

Ce template reproduit fidèlement la structure et le contenu du PDF généré par votre application.
