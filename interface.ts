interface Siege {
    activite_principale: string;
    activite_principale_registre_metier: string | null;
    adresse: string;
    cedex: string | null;
    code_pays_etranger: string | null;
    code_postal: string;
    commune: string;
    complement_adresse: string;
    coordonnees: string;
    date_creation: string;
    date_debut_activite: string;
    departement: string;
    distribution_speciale: string | null;
    est_siege: boolean;
    etat_administratif: string;
    geo_adresse: string;
    geo_id: string;
    indice_repetition: string | null;
    latitude: string;
    libelle_cedex: string | null;
    libelle_commune: string;
    libelle_commune_etranger: string | null;
    libelle_pays_etranger: string | null;
    libelle_voie: string;
    liste_enseignes: string[];
    liste_finess: string[] | null;
    liste_id_bio: string[] | null;
    liste_idcc: string[];
    liste_id_organisme_formation: string[] | null;
    liste_rge: string[] | null;
    liste_uai: string[] | null;
    longitude: string;
    nom_commercial: string | null;
    numero_voie: string;
    region: string | null;
    siret: string;
    tranche_effectif_salarie: string;
    type_voie: string;
  }
  
  interface DirigeantPersonnePhysique {
    nom: string;
    prenoms: string;
    annee_de_naissance: string;
    qualite: string;
    type_dirigeant: string;
  }
  
  interface DirigeantPersonneMorale {
    siren: string;
    denomination: string;
    sigle: string | null;
    qualite: string;
    type_dirigeant: string;
  }
  
  type Dirigeant = DirigeantPersonnePhysique | DirigeantPersonneMorale;
  
  interface Etablissement {
    activite_principale: string;
    adresse: string;
    code_postal: string;
    commune: string;
    date_creation: string;
    date_debut_activite: string;
    est_siege: boolean;
    etat_administratif: string;
    geo_id: string;
    latitude: string;
    libelle_commune: string;
    liste_enseignes: string[] | null;
    liste_finess: string[] | null;
    liste_id_bio: string[] | null;
    liste_idcc: string[] | null;
    liste_id_organisme_formation: string[] | null;
    liste_rge: string[] | null;
    liste_uai: string[] | null;
    longitude: string;
    nom_commercial: string | null;
    region: string | null;
    siret: string;
  }
  
  interface FinancesAnnee {
    ca: number;
    resultat_net: number;
  }
  
  interface Complements {
    collectivite_territoriale: string | null;
    convention_collective_renseignee: boolean;
    egapro_renseignee: boolean;
    est_bio: boolean;
    est_entrepreneur_individuel: boolean;
    est_entrepreneur_spectacle: boolean;
    est_ess: boolean;
    est_finess: boolean;
    est_organisme_formation: boolean;
    est_qualiopi: boolean;
    liste_id_organisme_formation: string[];
    est_rge: boolean;
    est_service_public: boolean;
    est_societe_mission: boolean;
    est_uai: boolean;
    identifiant_association: string | null;
    statut_entrepreneur_spectacle: string | null;
  }
  
  export interface Company {
    siren: string;
    nom_complet: string;
    nom_raison_sociale: string;
    sigle: string | null;
    nombre_etablissements: number;
    nombre_etablissements_ouverts: number;
    siege: Siege;
    activite_principale: string;
    categorie_entreprise: string;
    annee_categorie_entreprise: string;
    date_creation: string;
    date_mise_a_jour: string;
    dirigeants: Dirigeant[];
    etat_administratif: string;
    nature_juridique: string;
    section_activite_principale: string;
    tranche_effectif_salarie: string;
    annee_tranche_effectif_salarie: string;
    statut_diffusion: string;
    matching_etablissements: Etablissement[];
    finances: Record<string, FinancesAnnee>;
    complements: Complements;
  }