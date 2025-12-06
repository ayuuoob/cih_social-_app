// Bilingual support for French and Arabic with RTL handling
export type Language = "fr" | "ar"

export const translations = {
  fr: {
    // Header & Navigation
    header: {
      title: "CIH Care",
      language: "Langue",
      logout: "Déconnexion",
    },
    nav: {
      home: "Accueil",
      requests: "Demandes",
      transactions: "Transactions",
      profile: "Profil",
    },
    // Onboarding
    onboarding: {
      title: "CIH Care",
      subtitle: "Votre filet de sécurité financière en cas de coup dur",
      description: "Solutions d'aide financière pour les situations de vulnérabilité",
      login: "Se connecter",
      signup: "Créer un compte",
    },
    // Auth
    auth: {
      email: "Email",
      phone: "Téléphone",
      firstName: "Prénom",
      lastName: "Nom",
      cin: "Numéro CIN",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      login: "Se connecter",
      signup: "S'inscrire",
      haveAccount: "Vous avez déjà un compte?",
      noAccount: "Pas encore de compte?",
      signupSuccess: "Compte créé avec succès",
      loginError: "Email/téléphone ou mot de passe incorrect",
    },
    // Dashboard
    dashboard: {
      balance: "Solde du wallet",
      status: "Statut",
      statusStandard: "Standard",
      statusPriority: "Prioritaire",
      statusHighVulnerability: "Fragilité élevée",
      recentTransactions: "Dernières transactions",
      myRequests: "Mes demandes CIH Care",
      availableServices: "Services disponibles",
    },
    // Services
    services: {
      death: "Avance décès CNSS",
      deathDesc: "Avance en cas de décès d'un assuré (conjoint, parent...)",
      funeral: "Avance frais d'obsèques",
      funeralDesc: "Aide pour les frais d'obsèques",
      medical: "Avance remboursement CNSS",
      medicalDesc: "Avance sur remboursement dossier médical",
      microcredit: "Micro-crédit solidaire",
      microcreditDesc: "Crédit solidaire pour besoins urgents",
      salary: "Avance sur salaire",
      salaryDesc: "Avance avant versement de votre salaire",
    },
    // Forms
    form: {
      submit: "Soumettre",
      cancel: "Annuler",
      required: "Champ obligatoire",
      save: "Enregistrer",
      update: "Mettre à jour",
      delete: "Supprimer",
      upload: "Télécharger un fichier",
      selectFile: "Sélectionner un fichier",
      noFile: "Aucun fichier sélectionné",
    },
    // Death Benefit
    death: {
      title: "Avance décès CNSS",
      defunctFirstName: "Prénom du défunt",
      defunctLastName: "Nom du défunt",
      defunctCin: "CIN du défunt",
      defunctCnss: "Numéro d'immatriculation CNSS du défunt",
      deathDate: "Date du décès",
      relationship: "Lien avec le défunt",
      deathCertificate: "Attestation de décès",
      cnssAffiliation: "Attestation d'affiliation CNSS",
      relationshipOptions: {
        spouse: "Conjoint(e)",
        parent: "Parent",
        child: "Enfant",
        other: "Autre",
      },
    },
    // Funeral
    funeral: {
      title: "Avance frais d'obsèques",
      defunctFirstName: "Prénom du défunt",
      defunctLastName: "Nom du défunt",
      cnssNumber: "Numéro d'immatriculation CNSS",
      estimatedCost: "Montant estimé des frais",
      invoice: "Facture ou devis",
    },
    // Medical
    medical: {
      title: "Avance remboursement CNSS",
      firstName: "Prénom",
      lastName: "Nom",
      cin: "Numéro CIN",
      cnssNumber: "Numéro d'immatriculation CNSS",
      fileNumber: "Numéro du dossier CNSS",
      description:
        "Vous avez un dossier de remboursement médical déposé à la CNSS. CIH Care peut vous verser une avance avant le remboursement.",
    },
    // Microcredit
    microcredit: {
      title: "Micro-crédit solidaire",
      amount: "Montant demandé (DH)",
      reason: "Motif du crédit",
      reasonOptions: {
        health: "Santé",
        living: "Charges de vie",
        education: "Scolarité",
        other: "Autre",
      },
      description:
        "Le micro-crédit solidaire est conçu pour vous aider en cas de besoin urgent avec des conditions avantageuses.",
    },
    // Salary advance
    salary: {
      title: "Avance sur salaire",
      amount: "Montant demandé (DH)",
      employer: "Nom de l'employeur",
      contractType: "Type de contrat",
      contractOptions: {
        cdi: "CDI",
        cdd: "CDD",
        other: "Autre",
      },
    },
    // Requests
    requests: {
      title: "Mes demandes",
      type: "Type",
      date: "Date",
      amount: "Montant",
      status: "Statut",
      statusPending: "En cours",
      statusAccepted: "Acceptée",
      statusRejected: "Refusée",
      statusPaid: "Versée",
      details: "Détails",
      timeline: "Chronologie",
      submitted: "Demande déposée",
      analyzing: "Analyse CIH",
      validating: "Validation CNSS",
      paid: "Avance versée",
      transactionRef: "Référence de transaction",
    },
    // Transactions
    transactions: {
      title: "Historique des transactions",
      type: "Type",
      date: "Date",
      amount: "Montant",
      status: "Statut",
      reference: "Référence",
      details: "Détails",
    },
    // Profile
    profile: {
      title: "Mon profil",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      cin: "CIN",
      situation: "Situation actuelle",
      situationOptions: {
        illness: "Maladie",
        mourning: "Deuil",
        unemployment: "Chômage",
        other: "Autre",
      },
      documents: "Mes justificatifs",
      update: "Mettre à jour",
      logout: "Déconnexion",
    },
    // Chat
    chat: {
      title: "M3ak - Assistance",
      placeholder: "Posez votre question...",
      send: "Envoyer",
      voice: "Mode vocal",
      close: "Fermer",
    },
  },
  ar: {
    // Header & Navigation
    header: {
      title: "CIH Care",
      language: "اللغة",
      logout: "تسجيل الخروج",
    },
    nav: {
      home: "الرئيسية",
      requests: "الطلبات",
      transactions: "المعاملات",
      profile: "الملف الشخصي",
    },
    // Onboarding
    onboarding: {
      title: "CIH Care",
      subtitle: "شبكة الأمان المالية الخاصة بك في أوقات الأزمات",
      description: "حلول المساعدة المالية للحالات الضعيفة",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
    },
    // Auth
    auth: {
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      cin: "رقم الهوية الوطنية",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      haveAccount: "هل لديك حساب بالفعل؟",
      noAccount: "ليس لديك حساب؟",
      signupSuccess: "تم إنشاء الحساب بنجاح",
      loginError: "البريد الإلكتروني/الهاتف أو كلمة المرور غير صحيحة",
    },
    // Dashboard
    dashboard: {
      balance: "رصيد المحفظة",
      status: "الحالة",
      statusStandard: "قياسي",
      statusPriority: "أولوية",
      statusHighVulnerability: "هشاشة عالية",
      recentTransactions: "آخر المعاملات",
      myRequests: "طلباتي من CIH Care",
      availableServices: "الخدمات المتاحة",
    },
    // Services
    services: {
      death: "تسهيل الوفيات CNSS",
      deathDesc: "مساعدة في حالة وفاة المؤمن (الزوج، الوالد...)",
      funeral: "تسهيل مصاريف الجنازة",
      funeralDesc: "مساعدة لمصاريف الجنازة",
      medical: "تسهيل تسديد CNSS",
      medicalDesc: "مساعدة على تسديد ملف طبي",
      microcredit: "قرض التضامن الصغير",
      microcreditDesc: "قرض تضامني للاحتياجات العاجلة",
      salary: "سلفة على الراتب",
      salaryDesc: "مساعدة قبل استقبال راتبك",
    },
    // Forms
    form: {
      submit: "إرسال",
      cancel: "إلغاء",
      required: "حقل مطلوب",
      save: "حفظ",
      update: "تحديث",
      delete: "حذف",
      upload: "تحميل ملف",
      selectFile: "اختر ملف",
      noFile: "لم يتم تحديد ملف",
    },
    // Death Benefit
    death: {
      title: "تسهيل الوفيات CNSS",
      defunctFirstName: "اسم المتوفى الأول",
      defunctLastName: "اسم المتوفى الأخير",
      defunctCin: "رقم الهوية الوطنية للمتوفى",
      defunctCnss: "رقم التسجيل CNSS للمتوفى",
      deathDate: "تاريخ الوفاة",
      relationship: "علاقتك بالمتوفى",
      deathCertificate: "شهادة الوفاة",
      cnssAffiliation: "شهادة التسجيل بـ CNSS",
      relationshipOptions: {
        spouse: "الزوج/الزوجة",
        parent: "الوالد",
        child: "الابن",
        other: "آخر",
      },
    },
    // Funeral
    funeral: {
      title: "تسهيل مصاريف الجنازة",
      defunctFirstName: "اسم المتوفى الأول",
      defunctLastName: "اسم المتوفى الأخير",
      cnssNumber: "رقم التسجيل CNSS",
      estimatedCost: "المبلغ المتوقع للمصاريف",
      invoice: "الفاتورة أو التقدير",
    },
    // Medical
    medical: {
      title: "تسهيل تسديد CNSS",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      cin: "رقم الهوية الوطنية",
      cnssNumber: "رقم التسجيل CNSS",
      fileNumber: "رقم الملف CNSS",
      description: "لديك ملف تسديد طبي مودع لدى CNSS. يمكن لـ CIH Care أن توفر لك سلفة قبل التسديد.",
    },
    // Microcredit
    microcredit: {
      title: "قرض التضامن الصغير",
      amount: "المبلغ المطلوب (درهم)",
      reason: "سبب القرض",
      reasonOptions: {
        health: "الصحة",
        living: "متطلبات الحياة",
        education: "التعليم",
        other: "آخر",
      },
      description: "القرض الصغير التضامني مصمم لمساعدتك في حالة الحاجة العاجلة بشروط مواتية.",
    },
    // Salary advance
    salary: {
      title: "سلفة على الراتب",
      amount: "المبلغ المطلوب (درهم)",
      employer: "اسم المؤسسة",
      contractType: "نوع العقد",
      contractOptions: {
        cdi: "عقد دائم",
        cdd: "عقد محدد المدة",
        other: "آخر",
      },
    },
    // Requests
    requests: {
      title: "طلباتي",
      type: "النوع",
      date: "التاريخ",
      amount: "المبلغ",
      status: "الحالة",
      statusPending: "قيد المراجعة",
      statusAccepted: "موافق عليه",
      statusRejected: "مرفوض",
      statusPaid: "تم الصرف",
      details: "التفاصيل",
      timeline: "الجدول الزمني",
      submitted: "تم تقديم الطلب",
      analyzing: "تحليل CIH",
      validating: "التحقق من CNSS",
      paid: "تم صرف السلفة",
      transactionRef: "رقم المعاملة",
    },
    // Transactions
    transactions: {
      title: "سجل المعاملات",
      type: "النوع",
      date: "التاريخ",
      amount: "المبلغ",
      status: "الحالة",
      reference: "الرجوع",
      details: "التفاصيل",
    },
    // Profile
    profile: {
      title: "ملفي الشخصي",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      cin: "الهوية الوطنية",
      situation: "الحالة الحالية",
      situationOptions: {
        illness: "المرض",
        mourning: "الحزن",
        unemployment: "البطالة",
        other: "آخر",
      },
      documents: "وثائقي",
      update: "تحديث",
      logout: "تسجيل الخروج",
    },
    // Chat
    chat: {
      title: "M3ak - المساعدة",
      placeholder: "اسأل سؤالك...",
      send: "إرسال",
      voice: "الوضع الصوتي",
      close: "إغلاق",
    },
  },
}

export const getTranslation = (key: string, lang: Language): string => {
  const keys = key.split(".")
  let value: any = lang === "fr" ? translations.fr : translations.ar
  for (const k of keys) {
    value = value[k]
    if (!value) return key
  }
  return typeof value === "string" ? value : key
}
