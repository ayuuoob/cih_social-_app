// Mock AI responses for M3ak chatbot
export const chatbotResponses = {
  fr: [
    {
      trigger: ["avance", "décès", "death"],
      response:
        "Pour demander une avance décès CNSS, vous devez fournir: le nom et prénom du défunt, son CIN, son numéro d'immatriculation CNSS, la date du décès, l'attestation de décès, et une attestation confirmant l'affiliation CNSS.",
    },
    {
      trigger: ["avance", "remboursement", "médical", "médecin"],
      response:
        "Pour une avance sur remboursement CNSS, vous devez indiquer: votre nom, prénom, CIN, votre numéro d'immatriculation CNSS et le numéro de votre dossier CNSS.",
    },
    {
      trigger: ["obsèques", "funéraire", "funeral"],
      response:
        "Pour demander une avance pour frais d'obsèques, veuillez fournir: le nom du défunt, votre lien familial, le numéro CNSS du défunt, le montant estimé des frais, et une facture ou devis.",
    },
    {
      trigger: ["micro", "crédit", "crédit solidaire"],
      response:
        "Le micro-crédit solidaire est disponible pour vos besoins urgents (santé, charges de vie, scolarité). Indiquez le montant demandé et le motif de votre demande.",
    },
    {
      trigger: ["salaire", "avance salaire"],
      response:
        "Pour une avance sur salaire, vous devez indiquer: le montant demandé, le nom de votre employeur, et le type de contrat (CDI, CDD, autre).",
    },
    {
      trigger: ["balance", "solde", "argent", "money"],
      response: "Votre solde actuel s'affiche sur votre tableau de bord. Vous pouvez aussi consulter vos transactions.",
    },
    {
      trigger: ["aide", "help", "besoin"],
      response:
        "Je suis M3ak, votre assistant SocialFlow. Je peux vous aider avec: les demandes d'avance, les informations sur les services, et les questions générales.",
    },
  ],
  ar: [
    {
      trigger: ["تسهيل", "وفيات", "death"],
      response:
        "لتقديم طلب تسهيل الوفيات CNSS، يجب أن توفر: اسم المتوفى وكنيته، رقم الهوية الوطنية، رقم التسجيل CNSS، تاريخ الوفاة، شهادة الوفاة، وشهادة تؤكد الانتساب CNSS.",
    },
    {
      trigger: ["تسهيل", "طبي", "صحة"],
      response:
        "لطلب تسهيل تسديد CNSS، يجب أن توفر: اسمك الأول واسمك الأخير، رقم الهوية الوطنية، رقم التسجيل CNSS، ورقم ملفك CNSS.",
    },
    {
      trigger: ["جنازة", "مصاريف", "funeral"],
      response:
        "لطلب تسهيل مصاريف الجنازة، يجب أن توفر: اسم المتوفى، علاقتك به، رقم CNSS للمتوفى، المبلغ المتوقع، وفاتورة أو تقدير.",
    },
    {
      trigger: ["قرض", "صغير", "micro"],
      response:
        "القرض الصغير التضامني متاح لاحتياجاتك العاجلة (صحة، متطلبات الحياة، تعليم). حدد المبلغ المطلوب وسبب طلبك.",
    },
    {
      trigger: ["راتب", "سلفة", "salary"],
      response: "لطلب سلفة على الراتب، يجب أن تحدد: المبلغ المطلوب، اسم مؤسستك، ونوع العقد (دائم، محدد المدة، آخر).",
    },
    {
      trigger: ["رصيد", "balance", "مال"],
      response: "رصيدك الحالي يظهر على لوحة القيادة. يمكنك أيضا مراجعة معاملاتك.",
    },
    {
      trigger: ["مساعدة", "help", "احتاج"],
      response: "أنا M3ak، مساعدك في SocialFlow. يمكنني أن أساعدك في: طلبات السلف، معلومات عن الخدمات، والأسئلة العامة.",
    },
  ],
}

export const getDefaultResponse = (lang: "fr" | "ar") => {
  return lang === "fr"
    ? "Bonjour! Je suis M3ak, votre assistant SocialFlow. Comment puis-je vous aider aujourd'hui?"
    : "السلام عليكم! أنا M3ak، مساعدك في SocialFlow. كيف يمكنني مساعدتك اليوم؟"
}

export const getChatbotResponse = (message: string, lang: "fr" | "ar") => {
  const responses = chatbotResponses[lang]
  const lowerMessage = message.toLowerCase()

  for (const item of responses) {
    for (const trigger of item.trigger) {
      if (lowerMessage.includes(trigger.toLowerCase())) {
        return item.response
      }
    }
  }

  return lang === "fr"
    ? "Je n'ai pas bien compris votre question. Pouvez-vous reformuler?"
    : "لم أفهم سؤالك جيداً. هل يمكنك إعادة صياغة السؤال؟"
}
