import React from "react";
import ToggleButtonGroup from "./ToggleButtonGroup";
import { FormData, FormErrors, FormTouched } from "../types";
import {
  Check,
  AlertCircle,
  Globe,
  Target,
  Palette,
  Box,
  Settings,
  BarChart3,
  Mail,
  ShieldCheck,
  Zap,
  Info,
  ChartColumn,
  Settings as SettingsIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  errors: FormErrors;
  touched: FormTouched;
  setFieldTouched: (field: keyof FormData) => void;
}

const ErrorMessage = ({
  error,
  touched,
}: {
  error?: string;
  touched?: boolean;
}) => {
  if (!error || !touched) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex items-center gap-2 mt-2 text-xs text-brand-red font-bold uppercase tracking-wider"
    >
      <AlertCircle className="w-3 h-3" />
      {error}
    </motion.div>
  );
};

const InputWrapper = ({
  label,
  children,
  error,
  touched,
  description,
  value,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  touched?: boolean;
  description?: string;
  value?: any;
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const isError = touched && error;
  const isPopulated =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "" &&
    (Array.isArray(value) ? value.length > 0 : true);
  const shouldFloat = isFocused || isPopulated;

  return (
    <div className="field-group">
      <div
        className={`field-container ${isError ? "border-brand-red/50 bg-brand-red/5" : ""}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {children}
        <motion.label
          className="field-label"
          initial={false}
          animate={{
            top: shouldFloat ? "-8px" : "50%",
            left: shouldFloat ? "12px" : "20px",
            scale: shouldFloat ? 0.75 : 1,
            color: isError ? "#E31E24" : isFocused ? "#E31E24" : "#64748B",
            backgroundColor: shouldFloat
              ? "rgba(255, 255, 255, 0.98)"
              : "rgba(255, 255, 255, 0)",
            paddingLeft: shouldFloat ? "8px" : "0px",
            paddingRight: shouldFloat ? "8px" : "0px",
            fontWeight: shouldFloat ? 600 : 400,
            letterSpacing: shouldFloat ? "0.05em" : "0em",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          style={{
            originX: 0,
            originY: 0.5,
            y: "-50%",
            textTransform: shouldFloat ? "uppercase" : "none",
          }}
        >
          {label}
        </motion.label>
        <div className="ripple-line" />
      </div>
      {description && !isError && (
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2 block ml-1">
          {description}
        </span>
      )}
    </div>
  );
};

const CheckboxGroup = ({
  label,
  options,
  selected,
  onChange,
  redTitle,
  error,
  touched,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  redTitle?: boolean;
  error?: string;
  touched?: boolean;
}) => {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="space-y-4">
      <label
        className={`form-label ${redTitle ? "!text-brand-red !font-bold" : ""}`}
      >
        {label}
      </label>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-5 py-4 text-[10px] rounded-xl border transition-all duration-500 flex items-center justify-between group ${
              selected.includes(opt)
                ? "bg-brand-dark border-brand-red/30 text-white shadow-lg"
                : "bg-white/60 border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            <span className="font-bold uppercase tracking-wider text-left flex-1">
              {opt}
            </span>
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                selected.includes(opt)
                  ? "bg-white border-white"
                  : "border-slate-200"
              }`}
            >
              {selected.includes(opt) && (
                <Check className="w-2.5 h-2.5 text-brand-dark" />
              )}
            </div>
          </button>
        ))}
      </div>
      <ErrorMessage error={error} touched={touched} />
    </div>
  );
};

const RadioGroup = ({
  label,
  options,
  selected,
  onChange,
  redTitle,
  error,
  touched,
}: {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
  redTitle?: boolean;
  error?: string;
  touched?: boolean;
}) => (
  <div className="space-y-4">
    <label
      className={`form-label ${redTitle ? "!text-brand-red !font-bold" : ""}`}
    >
      {label}
    </label>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-5 py-4 text-[10px] rounded-xl border transition-all duration-500 flex items-center justify-between group ${
            selected === opt
              ? "bg-brand-dark border-brand-red/30 text-white shadow-lg"
              : "bg-white/60 border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <span className="font-bold uppercase tracking-wider text-left flex-1">
            {opt}
          </span>
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
              selected === opt ? "bg-white border-white" : "border-slate-200"
            }`}
          >
            {selected === opt && (
              <div className="w-2 h-2 rounded-full bg-brand-red" />
            )}
          </div>
        </button>
      ))}
    </div>
    <ErrorMessage error={error} touched={touched} />
  </div>
);

// --- STEP 1 ---
export const Step1 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <InputWrapper
          label="Nom de l'entreprise"
          value={formData.nomEntreprise}
          error={errors.nomEntreprise}
          touched={touched.nomEntreprise}
        >
          <input
            className="field-input"
            value={formData.nomEntreprise}
            onChange={(e) => updateFormData({ nomEntreprise: e.target.value })}
            onBlur={() => setFieldTouched("nomEntreprise")}
            required
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.nomEntreprise}
          touched={touched.nomEntreprise}
        />
      </div>
      <div>
        <InputWrapper
          label="Secteur d'activité"
          value={formData.secteurActivite}
          error={errors.secteurActivite}
          touched={touched.secteurActivite}
        >
          <input
            className="field-input"
            value={formData.secteurActivite}
            onChange={(e) =>
              updateFormData({ secteurActivite: e.target.value })
            }
            onBlur={() => setFieldTouched("secteurActivite")}
            required
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.secteurActivite}
          touched={touched.secteurActivite}
        />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <InputWrapper
          label="Pays / Ville du siège"
          value={formData.siegeSocial}
          error={errors.siegeSocial}
          touched={touched.siegeSocial}
        >
          <input
            className="field-input"
            value={formData.siegeSocial}
            onChange={(e) => updateFormData({ siegeSocial: e.target.value })}
            onBlur={() => setFieldTouched("siegeSocial")}
            required
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.siegeSocial}
          touched={touched.siegeSocial}
        />
      </div>
      <div>
        <InputWrapper
          label="Site internet actuel"
          value={formData.siteActuel}
          error={errors.siteActuel}
          touched={touched.siteActuel}
        >
          <input
            className="field-input hover:border-blue-500 focus:border-blue-500"
            placeholder="www.votresite.com"
            type="text"
            value={formData.siteActuel}
            onChange={(e) => updateFormData({ siteActuel: e.target.value })}
            onBlur={() => setFieldTouched("siteActuel")}
            required
          />
        </InputWrapper>
        <ErrorMessage error={errors.siteActuel} touched={touched.siteActuel} />
        {formData.siteActuel &&
          touched.siteActuel &&
          !/^(https?:\/\/)?(www\.)?[a-zA-Z-]+\.(com|fr|org|net|io|gov|edu|co|uk|ca|de|es|it|pt|be|ch|lu|mc|ma|tn|dz|ci|sn|ml|bf|ne|td|cf|cm|ga|gq|cd|cg|ao|za|na|bw|sz|ls|mw|zm|mw|et|ke|ug|tz|rw|bi|so|dj|er|sd|ly|eg|tn|dz|ma|eh|mr)(\.[a-zA-Z]{2,})?$/.test(
            formData.siteActuel,
          ) && (
            <p className="text-red-300 text-xs mt-1 font-medium">
              Veuillez entrer un nom de domaine valide
            </p>
          )}
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <InputWrapper
          label="Fonction / Titre"
          value={formData.fonctionTitre}
          error={errors.fonctionTitre}
          touched={touched.fonctionTitre}
        >
          <input
            className="field-input"
            value={formData.fonctionTitre}
            onChange={(e) => updateFormData({ fonctionTitre: e.target.value })}
            onBlur={() => setFieldTouched("fonctionTitre")}
            required
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.fonctionTitre}
          touched={touched.fonctionTitre}
        />
      </div>
      <div>
        <InputWrapper
          label="Email de contact"
          value={formData.emailContact}
          error={errors.emailContact}
          touched={touched.emailContact}
        >
          <input
            className="field-input hover:border-blue-500 focus:border-blue-500"
            placeholder="contact@entreprise.com"
            type="email"
            value={formData.emailContact}
            onChange={(e) => updateFormData({ emailContact: e.target.value })}
            onBlur={() => setFieldTouched("emailContact")}
            required
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.emailContact}
          touched={touched.emailContact}
        />
        {formData.emailContact &&
          touched.emailContact &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            formData.emailContact,
          ) && (
            <p className="text-red-300 text-xs mt-1 font-medium">
              Veuillez entrer une adresse email valide
            </p>
          )}
      </div>
      <div>
        <InputWrapper
          label="Téléphone"
          value={formData.telephone}
          error={errors.telephone}
          touched={touched.telephone}
        >
          <input
            className="field-input hover:border-blue-500 focus:border-blue-500"
            placeholder="+33 1 23 45 67 89"
            type="tel"
            value={formData.telephone}
            onChange={(e) => {
              const value = e.target.value;
              const filteredValue = value.replace(/[^0-9\s+]/g, "");
              updateFormData({ telephone: filteredValue });
            }}
            onBlur={() => setFieldTouched("telephone")}
            required
          />
        </InputWrapper>
        <ErrorMessage error={errors.telephone} touched={touched.telephone} />
        {formData.telephone &&
          touched.telephone &&
          !/^\+?[0-9\s]{10,}$/.test(formData.telephone.replace(/\s/g, "")) && (
            <p className="text-red-300 text-xs mt-1 font-medium">
              Veuillez entrer un numéro de téléphone valide
            </p>
          )}
      </div>
    </div>
    <RadioGroup
      label="Taille de l'entreprise"
      options={[
        "Indépendant / Freelance",
        "TPE (1-9 employés)",
        "PME (10-49 employés)",
        "ETI (50-250 employés)",
        "Grand groupe (250+)",
      ]}
      selected={formData.tailleEntreprise}
      onChange={(val) => updateFormData({ tailleEntreprise: val })}
      redTitle={true}
      error={errors.tailleEntreprise}
      touched={touched.tailleEntreprise}
    />
    <RadioGroup
      label="Phase de l'entreprise"
      options={[
        "Lancement / Startup",
        "En croissance",
        "Établie / Mature",
        "En restructuration / Pivot",
      ]}
      selected={formData.phaseEntreprise}
      onChange={(val) => updateFormData({ phaseEntreprise: val })}
      redTitle={true}
      error={errors.phaseEntreprise}
      touched={touched.phaseEntreprise}
    />
    <div>
      <InputWrapper
        label="Description de l'activité"
        value={formData.descriptionActivite}
        error={errors.descriptionActivite}
        touched={touched.descriptionActivite}
      >
        <textarea
          className="field-input min-h-[80px] py-4 resize-none"
          value={formData.descriptionActivite}
          onChange={(e) =>
            updateFormData({ descriptionActivite: e.target.value })
          }
          onBlur={() => setFieldTouched("descriptionActivite")}
          required
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.descriptionActivite}
        touched={touched.descriptionActivite}
      />
    </div>
    <div>
      <InputWrapper
        label="En quoi vous êtes différent de vos concurrents ?"
        value={formData.differenceConcurrents}
        error={errors.differenceConcurrents}
        touched={touched.differenceConcurrents}
      >
        <textarea
          className="field-input min-h-[80px] py-4 resize-none"
          value={formData.differenceConcurrents}
          onChange={(e) =>
            updateFormData({ differenceConcurrents: e.target.value })
          }
          onBlur={() => setFieldTouched("differenceConcurrents")}
          required
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.differenceConcurrents}
        touched={touched.differenceConcurrents}
      />
    </div>
  </div>
);

// --- STEP 2 ---
export const Step2 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <CheckboxGroup
      label="Objectifs principaux du site"
      options={[
        "Crédibiliser / légitimer l'entreprise",
        "Générer des contacts / leads qualifiés",
        "Présenter les produits / services",
        "Support à la prospection commerciale",
        "Vendre en ligne (e-commerce)",
        "Recrutement",
        "Autre",
      ]}
      selected={formData.objectifPrincipal}
      onChange={(val) => updateFormData({ objectifPrincipal: val })}
      redTitle={true}
      error={errors.objectifPrincipal}
      touched={touched.objectifPrincipal}
    />
    {formData.objectifPrincipal.includes("Autre") && (
      <div>
        <InputWrapper
          label="Si autre, précisez"
          value={formData.objectifAutre}
          error={errors.objectifAutre}
          touched={touched.objectifAutre}
        >
          <input
            className="field-input"
            value={formData.objectifAutre}
            onChange={(e) => updateFormData({ objectifAutre: e.target.value })}
            onBlur={() => setFieldTouched("objectifAutre")}
            required
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.objectifAutre}
          touched={touched.objectifAutre}
        />
      </div>
    )}
    <CheckboxGroup
      label="Cible principale du site"
      options={[
        "Grandes entreprises / Groupes internationaux",
        "PME / ETI",
        "Investisseurs / Fonds",
        "Particuliers (B2C)",
        "Institutions / ONG / Secteur public",
        "Partenaires / Distributeurs",
      ]}
      selected={[formData.ciblePrincipale]}
      onChange={(val) =>
        updateFormData({ ciblePrincipale: val[val.length - 1] || "" })
      }
      redTitle={true}
      error={errors.ciblePrincipale}
      touched={touched.ciblePrincipale}
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <InputWrapper
          label="Zones géographiques cibles"
          value={formData.zonesGeographiques}
          error={errors.zonesGeographiques}
          touched={touched.zonesGeographiques}
        >
          <input
            className="field-input"
            value={formData.zonesGeographiques}
            onChange={(e) =>
              updateFormData({ zonesGeographiques: e.target.value })
            }
            onBlur={() => setFieldTouched("zonesGeographiques")}
            required
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.zonesGeographiques}
          touched={touched.zonesGeographiques}
        />
      </div>
      <div>
        <InputWrapper
          label="Message clé du site"
          value={formData.messageCle}
          error={errors.messageCle}
          touched={touched.messageCle}
        >
          <input
            className="field-input"
            value={formData.messageCle}
            onChange={(e) => updateFormData({ messageCle: e.target.value })}
            onBlur={() => setFieldTouched("messageCle")}
            required
          />
        </InputWrapper>
        <ErrorMessage error={errors.messageCle} touched={touched.messageCle} />
      </div>
    </div>
    <div>
      <InputWrapper
        label="Objectifs à 12 mois via le site"
        value={formData.objectifs12Mois}
        error={errors.objectifs12Mois}
        touched={touched.objectifs12Mois}
      >
        <textarea
          className="field-input min-h-[80px] py-4 resize-none"
          value={formData.objectifs12Mois}
          onChange={(e) => updateFormData({ objectifs12Mois: e.target.value })}
          onBlur={() => setFieldTouched("objectifs12Mois")}
          required
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.objectifs12Mois}
        touched={touched.objectifs12Mois}
      />
    </div>
    <CheckboxGroup
      label="Ton et style souhaités"
      options={[
        "Professionnel & institutionnel",
        "Moderne & dynamique",
        "Premium & haut de gamme",
        "Accessible & humain",
        "Technique & expert",
        "Minimaliste & sobre",
      ]}
      selected={formData.tonStyle}
      onChange={(val) => updateFormData({ tonStyle: val })}
      redTitle={true}
      error={errors.tonStyle}
      touched={touched.tonStyle}
    />
  </div>
);

// --- STEP 3 ---
export const Step3 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <RadioGroup
      label="Budget global envisagé"
      options={[
        "Moins de 500 000 FCFA",
        "500 000 - 1 500 000 FCFA",
        "1 500 000 - 3 000 000 FCFA",
        "3 000 000 - 5 000 000 FCFA",
        "Plus de 5 000 000 FCFA",
        "À définir ensemble",
      ]}
      selected={formData.budgetGlobal}
      onChange={(val) => updateFormData({ budgetGlobal: val })}
      redTitle={true}
      error={errors.budgetGlobal}
      touched={touched.budgetGlobal}
    />
    <RadioGroup
      label="Modalités de paiement souhaitées"
      options={[
        "100% à la commande",
        "50% commande / 50% livraison",
        "30% / 40% / 30% (jalons)",
        "Autre (préciser)",
      ]}
      selected={formData.modalitesPaiement}
      onChange={(val) => updateFormData({ modalitesPaiement: val })}
      redTitle={true}
      error={errors.modalitesPaiement}
      touched={touched.modalitesPaiement}
    />
    {formData.modalitesPaiement === "Autre (préciser)" && (
      <div>
        <InputWrapper
          label="Si autre modalité, précisez"
          value={formData.modaliteAutre}
          error={errors.modaliteAutre}
          touched={touched.modaliteAutre}
        >
          <input
            className="field-input"
            value={formData.modaliteAutre}
            onChange={(e) => updateFormData({ modaliteAutre: e.target.value })}
            onBlur={() => setFieldTouched("modaliteAutre")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.modaliteAutre}
          touched={touched.modaliteAutre}
        />
      </div>
    )}
    <RadioGroup
      label="Délai de livraison souhaité"
      options={[
        "Urgent — moins de 2 semaines",
        "Standard — 3 à 5 semaines",
        "Flexible — 6 à 8 semaines",
        "Pas de contrainte particulière",
      ]}
      selected={formData.delaiLivraison}
      onChange={(val) => updateFormData({ delaiLivraison: val })}
      redTitle={true}
      error={errors.delaiLivraison}
      touched={touched.delaiLivraison}
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <InputWrapper
          label="Date de mise en ligne souhaitée"
          value={formData.dateMiseEnLigne}
          error={errors.dateMiseEnLigne}
          touched={touched.dateMiseEnLigne}
        >
          <input
            type="date"
            className="field-input"
            value={formData.dateMiseEnLigne}
            onChange={(e) =>
              updateFormData({ dateMiseEnLigne: e.target.value })
            }
            onBlur={() => setFieldTouched("dateMiseEnLigne")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.dateMiseEnLigne}
          touched={touched.dateMiseEnLigne}
        />
      </div>
      <div>
        <InputWrapper
          label="Contraintes particulières"
          value={formData.contraintesParticulieres}
          error={errors.contraintesParticulieres}
          touched={touched.contraintesParticulieres}
        >
          <textarea
            className="field-input h-[60px] py-4 resize-none"
            value={formData.contraintesParticulieres}
            onChange={(e) =>
              updateFormData({ contraintesParticulieres: e.target.value })
            }
            onBlur={() => setFieldTouched("contraintesParticulieres")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.contraintesParticulieres}
          touched={touched.contraintesParticulieres}
        />
      </div>
    </div>
  </div>
);

// --- STEP 4 ---
export const Step4 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <div>
      <InputWrapper
        label="Nom de domaine souhaité"
        value={formData.nomDomaineSouhaite}
        error={errors.nomDomaineSouhaite}
        touched={touched.nomDomaineSouhaite}
      >
        <input
          className="field-input hover:border-blue-500 focus:border-blue-500"
          placeholder="www.votresite.com"
          type="text"
          value={formData.nomDomaineSouhaite}
          onChange={(e) =>
            updateFormData({ nomDomaineSouhaite: e.target.value })
          }
          onBlur={() => setFieldTouched("nomDomaineSouhaite")}
          required
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.nomDomaineSouhaite}
        touched={touched.nomDomaineSouhaite}
      />
      {formData.nomDomaineSouhaite &&
        touched.nomDomaineSouhaite &&
        !/^(https?:\/\/)?(www\.)?[a-zA-Z-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(
          formData.nomDomaineSouhaite,
        ) && (
          <p className="text-red-300 text-xs mt-1 font-medium">
            Veuillez entrer un nom de domaine valide
          </p>
        )}
    </div>
    <RadioGroup
      label="Statut du nom de domaine"
      options={[
        "Déjà enregistré — je le fournis",
        "À vérifier et enregistrer par DM+",
        "Je ne sais pas — besoin de conseil",
      ]}
      selected={formData.statutDomaine}
      onChange={(val) => updateFormData({ statutDomaine: val })}
      redTitle={true}
      error={errors.statutDomaine}
      touched={touched.statutDomaine}
    />
    <RadioGroup
      label="CMS préféré"
      options={[
        "Webflow (recommandé premium)",
        "WordPress",
        "Pas de préférence — conseiller DM+",
        "Autre (préciser)",
      ]}
      selected={formData.cmsPrefere}
      onChange={(val) => updateFormData({ cmsPrefere: val })}
      redTitle={true}
      error={errors.cmsPrefere}
      touched={touched.cmsPrefere}
    />
    {formData.cmsPrefere === "Autre (préciser)" && (
      <div>
        <InputWrapper
          label="Si autre CMS, précisez"
          value={formData.cmsAutre}
          error={errors.cmsAutre}
          touched={touched.cmsAutre}
        >
          <input
            className="field-input"
            value={formData.cmsAutre}
            onChange={(e) => updateFormData({ cmsAutre: e.target.value })}
            onBlur={() => setFieldTouched("cmsAutre")}
          />
        </InputWrapper>
        <ErrorMessage error={errors.cmsAutre} touched={touched.cmsAutre} />
      </div>
    )}
    <RadioGroup
      label="Hébergement"
      options={[
        "Inclus dans la prestation DM+",
        "J'ai déjà un hébergeur",
        "À définir",
      ]}
      selected={formData.hebergement}
      onChange={(val) => updateFormData({ hebergement: val })}
      redTitle={true}
      error={errors.hebergement}
      touched={touched.hebergement}
    />
    {formData.statutDomaine === "Déjà enregistré - je le fournis" && (
      <div>
        <InputWrapper
          label="Nom de l'hébergeur actuel (si existant)"
          value={formData.hebergeurActuel}
          error={errors.hebergeurActuel}
          touched={touched.hebergeurActuel}
        >
          <input
            className="field-input"
            value={formData.hebergeurActuel}
            onChange={(e) =>
              updateFormData({ hebergeurActuel: e.target.value })
            }
            onBlur={() => setFieldTouched("hebergeurActuel")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.hebergeurActuel}
          touched={touched.hebergeurActuel}
        />
      </div>
    )}
    <CheckboxGroup
      label="Langues du site"
      options={[
        "Français",
        "Anglais",
        "Espagnol",
        "Allemand",
        "Italien",
        "Portugais",
        "Chinois",
        "Japonais",
        "Arabe",
        "Autre (préciser)",
      ]}
      selected={formData.languesSite}
      onChange={(val) => updateFormData({ languesSite: val })}
      redTitle={true}
      error={errors.languesSite}
      touched={touched.languesSite}
    />
    {formData.languesSite.includes("Autre (préciser)") && (
      <div>
        <InputWrapper
          label="Si autre langue, précisez"
          value={formData.langueAutre}
          error={errors.langueAutre}
          touched={touched.langueAutre}
        >
          <input
            className="field-input"
            value={formData.langueAutre}
            onChange={(e) => updateFormData({ langueAutre: e.target.value })}
            onBlur={() => setFieldTouched("langueAutre")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.langueAutre}
          touched={touched.langueAutre}
        />
      </div>
    )}
  </div>
);

// --- STEP 5 ---
export const Step5 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <RadioGroup
      label="Qui rédige les textes ?"
      options={[
        "Le client fournit tous les textes",
        "DM+ Com rédige l'ensemble (prestation supplémentaire)",
        "Rédaction partagée — à définir page par page",
        "Textes partiellement existants — à compléter",
      ]}
      selected={formData.redacteurTextes}
      onChange={(val) => updateFormData({ redacteurTextes: val })}
      redTitle={true}
      error={errors.redacteurTextes}
      touched={touched.redacteurTextes}
    />
    <RadioGroup
      label="Qui fournit les visuels / photos ?"
      options={[
        "Le client fournit photos et visuels",
        "DM+ intègre une banque d'images premium",
        "Shooting photo à prévoir (prestation supplémentaire)",
        "Mix des deux",
      ]}
      selected={formData.fournisseurVisuels}
      onChange={(val) => updateFormData({ fournisseurVisuels: val })}
      redTitle={true}
      error={errors.fournisseurVisuels}
      touched={touched.fournisseurVisuels}
    />
    <RadioGroup
      label="Avez-vous un logo ?"
      options={[
        "Oui — fichiers HD disponibles (AI, EPS, PNG)",
        "Oui — uniquement en basse résolution",
        "Non — création de logo à prévoir",
        "En cours de création",
      ]}
      selected={formData.avezLogo}
      onChange={(val) => updateFormData({ avezLogo: val })}
      redTitle={true}
      error={errors.avezLogo}
      touched={touched.avezLogo}
    />
    {(formData.avezLogo === "Oui — fichiers HD disponibles (AI, EPS, PNG)" ||
      formData.avezLogo === "Oui — uniquement en basse résolution") && (
      <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60">
        <label className="block text-sm font-bold text-slate-700 mb-3">
          Importer votre logo (AI, EPS, PNG, JPG - Max 10MB)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".ai,.eps,.png,.jpg,.jpeg,.svg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateFormData({ logoFile: file });
              }
            }}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-xl hover:bg-brand-dark transition-colors cursor-pointer text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Choisir un fichier
          </label>
          {formData.logoFile && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">{formData.logoFile.name}</span>
              <span className="text-xs">
                ({(formData.logoFile.size / 1024 / 1024).toFixed(1)} MB)
              </span>
            </div>
          )}
        </div>
      </div>
    )}

    <RadioGroup
      label="Avez-vous une charte graphique ?"
      options={[
        "Oui — charte complète disponible",
        "Oui — charte partielle / en cours",
        "Non — liberté laissée au designer DM+",
        "Non — à créer (prestation supplémentaire)",
      ]}
      selected={formData.avezCharte}
      onChange={(val) => updateFormData({ avezCharte: val })}
      redTitle={true}
      error={errors.avezCharte}
      touched={touched.avezCharte}
    />
    {(formData.avezCharte === "Oui — charte complète disponible" ||
      formData.avezCharte === "Oui — charte partielle / en cours") && (
      <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60">
        <label className="block text-sm font-bold text-slate-700 mb-3">
          Importer votre charte graphique (PDF, AI, EPS - Max 20MB)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".pdf,.ai,.eps,.zip"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateFormData({ charteFile: file });
              }
            }}
            className="hidden"
            id="charte-upload"
          />
          <label
            htmlFor="charte-upload"
            className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-xl hover:bg-brand-dark transition-colors cursor-pointer text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Choisir un fichier
          </label>
          {formData.charteFile && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">{formData.charteFile.name}</span>
              <span className="text-xs">
                ({(formData.charteFile.size / 1024 / 1024).toFixed(1)} MB)
              </span>
            </div>
          )}
        </div>
      </div>
    )}

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 !text-brand-red">
            Typographie Institutionnelle
          </h3>
        </div>
        <button
          type="button"
          onClick={() =>
            updateFormData({ typographieVisible: !formData.typographieVisible })
          }
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl hover:bg-white hover:border-brand-red/30 transition-all duration-300"
        >
          <span className="text-sm font-bold text-slate-700">
            {formData.typographieVisible ? "Masquer" : "Afficher"} les
            typographies
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${formData.typographieVisible ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {formData.typographieVisible && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { name: "Arial", family: "Arial" },
              { name: "Courier New", family: "Courier New" },
              { name: "Georgia", family: "Georgia" },
              { name: "Impact", family: "Impact" },
              { name: "Roboto", family: "Roboto" },
              { name: "Verdana", family: "Verdana" },
              { name: "Outfit", family: "Outfit" },
              { name: "Inter", family: "Inter" },
              { name: "Playfair Display", family: "Playfair Display" },
            ].map((font) => (
              <button
                key={font.name}
                type="button"
                onClick={() =>
                  updateFormData({ typographieSelectionnee: font.family })
                }
                className={`px-2 py-3 text-xs rounded-lg border transition-all duration-500 text-center backdrop-blur-sm bg-white/80 border-slate-200/60 text-slate-600 hover:border-brand-red/20 hover:text-slate-800 ${
                  formData.typographieSelectionnee === font.family
                    ? "border-brand-red ring-2 ring-brand-red/50 bg-brand-red/10 text-brand-dark"
                    : ""
                }`}
                style={{ fontFamily: font.family }}
              >
                {font.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                updateFormData({ typographieSelectionnee: "Autres" })
              }
              className={`px-2 py-3 text-xs rounded-lg border transition-all duration-500 text-center backdrop-blur-sm bg-white/80 border-slate-200/60 text-slate-600 hover:border-brand-red/20 hover:text-slate-800 ${
                formData.typographieSelectionnee === "Autres"
                  ? "border-brand-red ring-2 ring-brand-red/50 bg-brand-red/10 text-brand-dark"
                  : ""
              }`}
              style={{ fontFamily: "Inter" }}
            >
              Autres
            </button>
          </div>

          {formData.typographieSelectionnee &&
            formData.typographieSelectionnee !== "Autres" && (
              <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-bold text-slate-700">
                    Typographie sélectionnée:
                  </label>
                  <div
                    className="px-4 py-2 rounded-lg border-2 border-slate-300 bg-white shadow-inner"
                    style={{ fontFamily: formData.typographieSelectionnee }}
                  >
                    {formData.typographieSelectionnee}
                  </div>
                </div>
              </div>
            )}

          {formData.typographieSelectionnee === "Autres" && (
            <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60">
              <div>
                <InputWrapper
                  label="Précisez la typographie souhaitée"
                  value={formData.typographieAutre}
                  error={errors.typographieAutre}
                  touched={touched.typographieAutre}
                >
                  <input
                    className="field-input"
                    value={formData.typographieAutre}
                    onChange={(e) =>
                      updateFormData({ typographieAutre: e.target.value })
                    }
                    onBlur={() => setFieldTouched("typographieAutre")}
                    placeholder="Entrez le nom de votre typographie personnalisée"
                  />
                </InputWrapper>
                <ErrorMessage
                  error={errors.typographieAutre}
                  touched={touched.typographieAutre}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 !text-brand-red">
            Palette Chromatique
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Sélectionnez au minimum 3 couleurs (HEX / RGB / PMS)
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            updateFormData({ paletteVisible: !formData.paletteVisible })
          }
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl hover:bg-white hover:border-brand-red/30 transition-all duration-300"
        >
          <span className="text-sm font-bold text-slate-700">
            {formData.paletteVisible ? "Masquer" : "Afficher"} la palette
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${formData.paletteVisible ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {formData.paletteVisible && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {[
              { color: "#E31E24", rgb: "rgb(227, 30, 36)" },
              { color: "#0F172A", rgb: "rgb(15, 23, 42)" },
              { color: "#3B82F6", rgb: "rgb(59, 130, 246)" },
              { color: "#10B981", rgb: "rgb(16, 185, 129)" },
              { color: "#F59E0B", rgb: "rgb(245, 158, 11)" },
              { color: "#8B5CF6", rgb: "rgb(139, 92, 246)" },
              { color: "#EF4444", rgb: "rgb(239, 68, 68)" },
              { color: "#F97316", rgb: "rgb(249, 115, 22)" },
              { color: "#84CC16", rgb: "rgb(132, 204, 22)" },
              { color: "#06B6D4", rgb: "rgb(6, 182, 212)" },
              { color: "#6366F1", rgb: "rgb(99, 102, 241)" },
              { color: "#EC4899", rgb: "rgb(236, 72, 153)" },
              { color: "#64748B", rgb: "rgb(100, 116, 139)" },
              { color: "#475569", rgb: "rgb(71, 85, 105)" },
              { color: "#334155", rgb: "rgb(51, 65, 85)" },
              { color: "#1E293B", rgb: "rgb(30, 41, 59)" },
              { color: "#0F172A", rgb: "rgb(15, 23, 42)" },
              { color: "#F8FAFC", rgb: "rgb(248, 250, 252)" },
              { color: "#FFFFFF", rgb: "rgb(255, 255, 255)" },
              { color: "#F3F4F6", rgb: "rgb(243, 244, 246)" },
              { color: "#E5E7EB", rgb: "rgb(229, 231, 235)" },
              { color: "#D1D5DB", rgb: "rgb(209, 213, 219)" },
              { color: "#9CA3AF", rgb: "rgb(156, 163, 175)" },
              { color: "#6B7280", rgb: "rgb(107, 114, 128)" },
            ].map((item) => (
              <button
                key={item.color}
                type="button"
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  formData.couleursSelectionnees.includes(item.color)
                    ? "border-brand-red ring-2 ring-brand-red/50 scale-110"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                style={{ backgroundColor: item.rgb }}
                title={item.color}
                onClick={() => {
                  const currentColors = formData.couleursSelectionnees;
                  if (currentColors.includes(item.color)) {
                    updateFormData({
                      couleursSelectionnees: currentColors.filter(
                        (c) => c !== item.color,
                      ),
                    });
                  } else {
                    updateFormData({
                      couleursSelectionnees: [...currentColors, item.color],
                    });
                  }
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-3">
              <label className="text-sm font-bold text-slate-700">
                Palette de 3 couleurs :
              </label>
              <div className="flex gap-3">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="text-xs font-bold text-slate-600">
                      Couleur {index + 1}
                    </div>
                    <div className="relative group">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-slate-300 shadow-inner cursor-pointer transition-all hover:scale-105"
                        style={{
                          backgroundColor:
                            formData.couleursSelectionnees[index] || "#f3f4f6",
                        }}
                        onClick={() => {
                          const input = document.getElementById(
                            `color-input-${index}`,
                          ) as HTMLInputElement;
                          if (input) input.click();
                        }}
                        title={`Couleur ${index + 1}: ${formData.couleursSelectionnees[index] || "Non définie"}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById(
                            `color-input-${index}`,
                          ) as HTMLInputElement;
                          if (input) input.click();
                        }}
                        className="absolute inset-0 w-12 h-12 rounded-lg border-2 border-slate-300 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>
                    <input
                      id={`color-input-${index}`}
                      type="color"
                      value={formData.couleursSelectionnees[index] || "#000000"}
                      onChange={(e) => {
                        const newColors = [...formData.couleursSelectionnees];
                        newColors[index] = e.target.value;
                        updateFormData({ couleursSelectionnees: newColors });
                      }}
                      className="hidden"
                    />
                    {formData.couleursSelectionnees[index] && (
                      <div className="text-xs font-mono text-slate-600">
                        {formData.couleursSelectionnees[index]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <div>
      <InputWrapper
        label="Sites de référence appréciés"
        value={formData.sitesReference}
        error={errors.sitesReference}
        touched={touched.sitesReference}
      >
        <textarea
          className="field-input min-h-[80px] py-4 resize-none"
          value={formData.sitesReference}
          onChange={(e) => updateFormData({ sitesReference: e.target.value })}
          onBlur={() => setFieldTouched("sitesReference")}
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.sitesReference}
        touched={touched.sitesReference}
      />
    </div>

    <div>
      <InputWrapper
        label="Ce que vous ne voulez absolument pas"
        value={formData.ceQueVousNeVoulezPas}
        error={errors.ceQueVousNeVoulezPas}
        touched={touched.ceQueVousNeVoulezPas}
      >
        <textarea
          className="field-input min-h-[80px] py-4 resize-none"
          value={formData.ceQueVousNeVoulezPas}
          onChange={(e) =>
            updateFormData({ ceQueVousNeVoulezPas: e.target.value })
          }
          onBlur={() => setFieldTouched("ceQueVousNeVoulezPas")}
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.ceQueVousNeVoulezPas}
        touched={touched.ceQueVousNeVoulezPas}
      />
    </div>
  </div>
);

// --- STEP 6 ---
export const Step6 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <CheckboxGroup
      label="Pages souhaitées"
      options={[
        "Accueil / Home",
        "À propos / Qui sommes-nous",
        "Services / Expertises",
        "Réalisations / Portfolio",
        "Équipe",
        "Zones géographiques",
        "Actualités / Blog",
        "Témoignages / Références",
        "FAQ",
        "Contact",
        "Mentions légales",
        "Autre (préciser)",
      ]}
      selected={formData.pagesSouhaitees}
      onChange={(val) => updateFormData({ pagesSouhaitees: val })}
      redTitle={true}
      error={errors.pagesSouhaitees}
      touched={touched.pagesSouhaitees}
    />
    {formData.pagesSouhaitees.includes("Autre (préciser)") && (
      <div>
        <InputWrapper
          label="Si autres pages, précisez"
          value={formData.pagesAutres}
          error={errors.pagesAutres}
          touched={touched.pagesAutres}
        >
          <input
            className="field-input"
            value={formData.pagesAutres}
            onChange={(e) => updateFormData({ pagesAutres: e.target.value })}
            onBlur={() => setFieldTouched("pagesAutres")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.pagesAutres}
          touched={touched.pagesAutres}
        />
      </div>
    )}

    <div className="space-y-8">
      <div>
        <h3 className="form-label mb-6 !text-brand-red !font-bold">
          Type de site internet
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Type de site :
          </label>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <input
                id="site-marchand"
                checked={formData.typeSite === "marchand"}
                onChange={() => updateFormData({ typeSite: "marchand" })}
                className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
                type="radio"
                name="site-type"
              />
              <label htmlFor="site-marchand" className="text-sm text-gray-700">
                Site marchand
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="site-vitrine"
                checked={formData.typeSite === "vitrine"}
                onChange={() => updateFormData({ typeSite: "vitrine" })}
                className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
                type="radio"
                name="site-type"
              />
              <label htmlFor="site-vitrine" className="text-sm text-gray-700">
                Site vitrine
              </label>
            </div>
          </div>
        </div>
        <ErrorMessage error={errors.typeSite} touched={touched.typeSite} />
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-3">
            <input
              id="cms-existant"
              checked={formData.cmsExistant}
              onChange={(e) =>
                updateFormData({ cmsExistant: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
              type="checkbox"
            />
            <label htmlFor="cms-existant" className="text-sm text-gray-700">
              Utilisez-vous un CMS existant ?
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="nouveau-cms"
              checked={formData.nouveauCms}
              onChange={(e) => updateFormData({ nouveauCms: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
              type="checkbox"
            />
            <label htmlFor="nouveau-cms" className="text-sm text-gray-700">
              Souhaitez-vous un nouveau CMS ?
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="base-donnees"
              checked={formData.baseDonnees}
              onChange={(e) =>
                updateFormData({ baseDonnees: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
              type="checkbox"
            />
            <label htmlFor="base-donnees" className="text-sm text-gray-700">
              Avez-vous une base de données ?
            </label>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div>
        <h3 className="form-label !text-brand-red !font-bold">
          Quelle fonctionnalité aimeriez-vous avoir sur votre site internet ?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              id: "encart-bannieres",
              name: "Encart / bannières publicitaires",
              icon: "",
            },
            { id: "blog", name: "Blog", icon: "" },
            {
              id: "module-reservation",
              name: "Module de réservation",
              icon: "",
            },
            {
              id: "calendrier-evenements",
              name: "Calendrier d'événements",
              icon: "",
            },
            {
              id: "espace-client",
              name: "Espace client (compte client)",
              icon: "",
            },
            {
              id: "base-donnees-clients",
              name: "Base de données clients",
              icon: "",
            },
            {
              id: "annuaire-repertoire",
              name: "Annuaire/répertoire de marque/produits/etc.",
              icon: "",
            },
            { id: "e-commerce", name: "E-commerce", icon: "" },
            { id: "faq", name: "FAQ", icon: "" },
            { id: "formulaires", name: "Formulaires", icon: "" },
            { id: "forum", name: "Forum", icon: "" },
            { id: "newsletters", name: "Newsletters", icon: "" },
            { id: "galerie-photos", name: "Galerie photos", icon: "" },
            { id: "champ-promotions", name: "Champ de promotions", icon: "" },
            { id: "barre-recherche", name: "Barre de recherche", icon: "" },
            { id: "panier-achat", name: "Panier (achat)", icon: "" },
            { id: "statistiques", name: "Statistiques", icon: "" },
            { id: "autres", name: "Autres", icon: "" },
          ].map((feature) => (
            <button
              key={feature.id}
              type="button"
              onClick={() => {
                if (formData.fonctionnalitesSite.includes(feature.id)) {
                  updateFormData({
                    fonctionnalitesSite: formData.fonctionnalitesSite.filter(
                      (f) => f !== feature.id,
                    ),
                  });
                } else {
                  updateFormData({
                    fonctionnalitesSite: [
                      ...formData.fonctionnalitesSite,
                      feature.id,
                    ],
                  });
                }
              }}
              className={`px-4 py-3 rounded-xl border transition-all duration-700 flex items-center justify-between group backdrop-blur-sm bg-white/60 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-brand-dark ${
                formData.fonctionnalitesSite.includes(feature.id)
                  ? "border-brand-red ring-2 ring-brand-red/50 bg-brand-red/10 text-brand-dark"
                  : ""
              }`}
            >
              <span className="font-bold uppercase tracking-widest text-[10px] text-left">
                {feature.name}
              </span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                  formData.fonctionnalitesSite.includes(feature.id)
                    ? "border-brand-red bg-brand-red"
                    : "border-slate-200 group-hover:border-slate-300"
                }`}
              >
                {feature.icon}
              </div>
            </button>
          ))}
        </div>
        <ErrorMessage
          error={errors.fonctionnalitesSite}
          touched={touched.fonctionnalitesSite}
        />
      </div>
    </div>

    {formData.fonctionnalitesSite.includes("autres") && (
      <div>
        <InputWrapper
          label="Précisez les autres fonctionnalités souhaitées"
          value={formData.autresFonctionnalites}
          error={errors.autresFonctionnalites}
          touched={touched.autresFonctionnalites}
        >
          <textarea
            className="field-input min-h-[80px] py-4 resize-none"
            value={formData.autresFonctionnalites}
            onChange={(e) =>
              updateFormData({ autresFonctionnalites: e.target.value })
            }
            onBlur={() => setFieldTouched("autresFonctionnalites")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.autresFonctionnalites}
          touched={touched.autresFonctionnalites}
        />
      </div>
    )}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <InputWrapper
          label="Arborescence souhaitée"
          value={formData.arborescenceSouhaitee}
          error={errors.arborescenceSouhaitee}
          touched={touched.arborescenceSouhaitee}
        >
          <textarea
            className="field-input resize-none h-[60px]"
            value={formData.arborescenceSouhaitee}
            onChange={(e) =>
              updateFormData({ arborescenceSouhaitee: e.target.value })
            }
            onBlur={() => setFieldTouched("arborescenceSouhaitee")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.arborescenceSouhaitee}
          touched={touched.arborescenceSouhaitee}
        />
      </div>
      <div>
        <InputWrapper
          label="Page(s) prioritaire(s)"
          value={formData.pagePrioritaire}
          error={errors.pagePrioritaire}
          touched={touched.pagePrioritaire}
        >
          <input
            className="field-input min-h-[60px]"
            value={formData.pagePrioritaire}
            onChange={(e) =>
              updateFormData({ pagePrioritaire: e.target.value })
            }
            onBlur={() => setFieldTouched("pagePrioritaire")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.pagePrioritaire}
          touched={touched.pagePrioritaire}
        />
      </div>
    </div>
  </div>
);

// --- STEP 7 ---
export const Step7 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <CheckboxGroup
      label="Fonctionnalités à intégrer"
      options={[
        "Formulaire de contact",
        "Prise de rendez-vous (Calendly...)",
        "Paiement en ligne (Stripe...)",
        "Espace client / Compte utilisateur",
        "Newsletter / Emailing",
        "Blog / Actualités",
        "Galerie photos / vidéos",
        "Carte / Géolocalisation",
        "Chat en ligne",
        "Multi-langue",
        "Statistiques intégrées",
        "Autre (préciser)",
      ]}
      selected={formData.fonctionnalitesIntegrer}
      onChange={(val) => updateFormData({ fonctionnalitesIntegrer: val })}
      redTitle={true}
      error={errors.fonctionnalitesIntegrer}
      touched={touched.fonctionnalitesIntegrer}
    />
    {formData.fonctionnalitesIntegrer.includes("Autre (préciser)") && (
      <div>
        <InputWrapper
          label="Si autres fonctionnalités, précisez"
          value={formData.fonctionnaliteAutre}
          error={errors.fonctionnaliteAutre}
          touched={touched.fonctionnaliteAutre}
        >
          <input
            className="field-input"
            value={formData.fonctionnaliteAutre}
            onChange={(e) =>
              updateFormData({ fonctionnaliteAutre: e.target.value })
            }
            onBlur={() => setFieldTouched("fonctionnaliteAutre")}
          />
        </InputWrapper>
        <ErrorMessage
          error={errors.fonctionnaliteAutre}
          touched={touched.fonctionnaliteAutre}
        />
      </div>
    )}
    <CheckboxGroup
      label="Réseaux sociaux à intégrer"
      options={[
        "LinkedIn",
        "Instagram",
        "Facebook",
        "Twitter / X",
        "YouTube",
        "WhatsApp",
        "Aucun",
      ]}
      selected={formData.reseauxSociaux}
      onChange={(val) => updateFormData({ reseauxSociaux: val })}
      redTitle={true}
      error={errors.reseauxSociaux}
      touched={touched.reseauxSociaux}
    />
    <RadioGroup
      label="Adaptabilité mobile"
      options={[
        "Site responsive (obligatoire)",
        "Application mobile envisagée (ultérieurement)",
      ]}
      selected={formData.adaptabiliteMobile}
      onChange={(val) => updateFormData({ adaptabiliteMobile: val })}
      redTitle={true}
      error={errors.adaptabiliteMobile}
      touched={touched.adaptabiliteMobile}
    />
    <RadioGroup
      label="PWA (Progressive Web App)"
      options={["Oui", "Non"]}
      selected={formData.pwa ? "Oui" : "Non"}
      onChange={(val) => updateFormData({ pwa: val === "Oui" })}
      redTitle={true}
      error={errors.pwa}
      touched={touched.pwa}
    />
  </div>
);

// --- STEP 8 ---
export const Step8 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <div className="mb-8">
      <h3 className="text-xl font-bold text-brand-dark mb-2 !text-brand-red">
        Marketing Mix
      </h3>
      <p className="text-slate-600 text-sm">
        Définissez votre stratégie marketing complète
      </p>
    </div>

    <CheckboxGroup
      label="Objectifs Marketing Principaux"
      options={[
        "Notoriété de marque",
        "Génération de leads",
        "Conversion et ventes",
        "Fidélisation client",
        "Éducation de marché",
        "Lancement produit",
        "Autre",
      ]}
      selected={formData.marketingMix.objectifsMarketing}
      onChange={(val) =>
        updateFormData({
          marketingMix: {
            ...formData.marketingMix,
            objectifsMarketing: val,
          },
        })
      }
      redTitle={true}
      error={errors.marketingMix?.objectifsMarketing}
      touched={touched.marketingMix?.objectifsMarketing}
    />

    <CheckboxGroup
      label="Canaux Marketing Prioritaires"
      options={[
        "SEO / Référencement naturel",
        "Google Ads / PPC",
        "Réseaux Sociaux",
        "Email Marketing",
        "Content Marketing",
        "Marketing d'influence",
        "Affiliation",
        "Publicité programmatique",
      ]}
      selected={formData.marketingMix.canauxPrioritaires}
      onChange={(val) =>
        updateFormData({
          marketingMix: {
            ...formData.marketingMix,
            canauxPrioritaires: val,
          },
        })
      }
      redTitle={true}
      error={errors.marketingMix?.canauxPrioritaires}
      touched={touched.marketingMix?.canauxPrioritaires}
    />

    <div>
      <InputWrapper
        label="Indicateurs Clés de Performance (KPIs)"
        value={formData.marketingMix.kpisPrincipaux}
        error={errors.marketingMix?.kpisPrincipaux}
        touched={touched.marketingMix?.kpisPrincipaux}
      >
        <textarea
          className="field-input min-h-[80px] py-4 resize-none"
          value={formData.marketingMix.kpisPrincipaux}
          onChange={(e) =>
            updateFormData({
              marketingMix: {
                ...formData.marketingMix,
                kpisPrincipaux: e.target.value,
              },
            })
          }
          onBlur={() => setFieldTouched("marketingMix" as any)}
          placeholder="Trafic organique, taux de conversion, coût par acquisition, ROI, engagement..."
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.marketingMix?.kpisPrincipaux}
        touched={touched.marketingMix?.kpisPrincipaux}
      />
    </div>

    <div className="space-y-3 mt-4">
      <h4 className="text-sm font-semibold text-brand-dark !text-brand-red">
        Services Marketing Additionnels
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-md border border-slate-200/60 hover:border-brand-red/20 transition-all duration-300 group shadow-sm hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-slate-50 flex items-center justify-center group-hover:bg-brand-red/10 transition-all">
                <ChartColumn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-red" />
              </div>
              <label className="text-xs font-semibold text-slate-700">
                SEO Stratégique
              </label>
            </div>
            <ToggleButtonGroup
              value={formData.seoStrategique}
              onChange={(val) => updateFormData({ seoStrategique: val })}
            />
          </div>
        </div>

        <div className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-md border border-slate-200/60 hover:border-brand-red/20 transition-all duration-300 group shadow-sm hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-slate-50 flex items-center justify-center group-hover:bg-brand-red/10 transition-all">
                <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-red" />
              </div>
              <label className="text-xs font-semibold text-slate-700">
                Campagnes PPC
              </label>
            </div>
            <ToggleButtonGroup
              value={formData.campagnesPPC}
              onChange={(val) => updateFormData({ campagnesPPC: val })}
            />
          </div>
        </div>

        <div className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-md border border-slate-200/60 hover:border-brand-red/20 transition-all duration-300 group shadow-sm hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-slate-50 flex items-center justify-center group-hover:bg-brand-red/10 transition-all">
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-red" />
              </div>
              <label className="text-xs font-semibold text-slate-700">
                Email Marketing
              </label>
            </div>
            <ToggleButtonGroup
              value={formData.emailMarketing}
              onChange={(val) => updateFormData({ emailMarketing: val })}
            />
          </div>
        </div>

        <div className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-md border border-slate-200/60 hover:border-brand-red/20 transition-all duration-300 group shadow-sm hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-slate-50 flex items-center justify-center group-hover:bg-brand-red/10 transition-all">
                <SettingsIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-red" />
              </div>
              <label className="text-xs font-semibold text-slate-700">
                Mobile Strategy
              </label>
            </div>
            <ToggleButtonGroup
              value={formData.mobileStrategy}
              onChange={(val) => updateFormData({ mobileStrategy: val })}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 p-6 bg-brand-dark rounded-2xl relative overflow-hidden group shadow-lg">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px]"></div>
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <Info className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm font-medium leading-relaxed text-white/90">
          Votre stratégie marketing mix est maintenant définie. Prêt pour la
          validation finale.
        </p>
      </div>
    </div>
  </div>
);

// --- STEP 9 ---
export const Step9 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-6">
    <RadioGroup
      label="Maintenance souhaitée"
      options={[
        "Maintenance corrective incluse (3 mois)",
        "Contrat de maintenance mensuel DM+ Tech",
        "Gestion autonome par le client",
        "À définir après livraison",
      ]}
      selected={formData.maintenanceSouhaitee}
      onChange={(val) => updateFormData({ maintenanceSouhaitee: val })}
      redTitle={true}
      error={errors.maintenanceSouhaitee}
      touched={touched.maintenanceSouhaitee}
    />
    <RadioGroup
      label="Mises à jour du contenu"
      options={[
        "Client autonome (formation back-office incluse)",
        "Délégation à DM+ Com (abonnement mensuel)",
        "Au cas par cas (facturation séparée)",
      ]}
      selected={formData.misesAJour}
      onChange={(val) => updateFormData({ misesAJour: val })}
      redTitle={true}
      error={errors.misesAJour}
      touched={touched.misesAJour}
    />
    <RadioGroup
      label="Évolutions futures envisagées"
      options={[
        "Ajout de nouvelles pages",
        "Intégration e-commerce",
        "Application mobile",
        "Espace membre / plateforme",
        "Aucune évolution prévue",
      ]}
      selected={formData.evolutionsFutures}
      onChange={(val) => updateFormData({ evolutionsFutures: val })}
      redTitle={true}
      error={errors.evolutionsFutures}
      touched={touched.evolutionsFutures}
    />
    <div>
      <InputWrapper
        label="Autres informations utiles"
        value={formData.autresInfosUtiles}
        error={errors.autresInfosUtiles}
        touched={touched.autresInfosUtiles}
      >
        <textarea
          className="field-input min-h-[100px] py-4 resize-none"
          value={formData.autresInfosUtiles}
          onChange={(e) =>
            updateFormData({ autresInfosUtiles: e.target.value })
          }
          onBlur={() => setFieldTouched("autresInfosUtiles")}
        />
      </InputWrapper>
      <ErrorMessage
        error={errors.autresInfosUtiles}
        touched={touched.autresInfosUtiles}
      />
    </div>
  </div>
);

// --- STEP 10 ---
export const Step10 = ({
  formData,
  updateFormData,
  errors,
  touched,
  setFieldTouched,
}: StepProps) => (
  <div className="space-y-8">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="p-6 bg-white/40 border border-slate-200 rounded-2xl space-y-4"
      >
        <label className="form-label">Concurrent {i + 1}</label>
        <div>
          <InputWrapper
            label="Nom + URL du site"
            value={formData.concurrents[i].nom}
            error={errors.concurrents?.[i]?.nom}
            touched={touched.concurrents?.[i]?.nom}
          >
            <input
              className="field-input"
              value={formData.concurrents[i].nom}
              onChange={(e) => {
                const newC = [...formData.concurrents];
                newC[i].nom = e.target.value;
                updateFormData({ concurrents: newC });
              }}
              onBlur={() => setFieldTouched("concurrents" as any)}
            />
          </InputWrapper>
          <ErrorMessage
            error={errors.concurrents?.[i]?.nom}
            touched={touched.concurrents?.[i]?.nom}
          />
        </div>
        <div>
          <InputWrapper
            label="Ce qu'ils font bien"
            value={formData.concurrents[i].bien}
            error={errors.concurrents?.[i]?.bien}
            touched={touched.concurrents?.[i]?.bien}
          >
            <input
              className="field-input"
              value={formData.concurrents[i].bien}
              onChange={(e) => {
                const newC = [...formData.concurrents];
                newC[i].bien = e.target.value;
                updateFormData({ concurrents: newC });
              }}
              onBlur={() => setFieldTouched("concurrents" as any)}
            />
          </InputWrapper>
          <ErrorMessage
            error={errors.concurrents?.[i]?.bien}
            touched={touched.concurrents?.[i]?.bien}
          />
        </div>
        <div>
          <InputWrapper
            label="Ce que vous faites mieux"
            value={formData.concurrents[i].mieux}
            error={errors.concurrents?.[i]?.mieux}
            touched={touched.concurrents?.[i]?.mieux}
          >
            <input
              className="field-input"
              value={formData.concurrents[i].mieux}
              onChange={(e) => {
                const newC = [...formData.concurrents];
                newC[i].mieux = e.target.value;
                updateFormData({ concurrents: newC });
              }}
              onBlur={() => setFieldTouched("concurrents" as any)}
            />
          </InputWrapper>
          <ErrorMessage
            error={errors.concurrents?.[i]?.mieux}
            touched={touched.concurrents?.[i]?.mieux}
          />
        </div>
      </div>
    ))}

    <div className="p-8 bg-brand-dark rounded-[32px] relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
      <div className="relative z-10 flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-lg font-bold text-white mb-1">Dossier Complet</p>
          <p className="text-sm text-white/60">
            Votre brief stratégique est maintenant prêt à être transformé en
            réalité digitale.
          </p>
        </div>
      </div>
    </div>
  </div>
);
