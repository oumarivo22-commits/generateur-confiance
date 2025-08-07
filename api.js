// Module API pour la génération de contenu avec OpenAI

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-api-key-here';
const OPENAI_API_BASE = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';

// Prompts optimisés pour la génération de contenu
const PROMPTS = {
  aboutPage: (boutiqueName, products, mission) => `
ROLE : Tu es un expert en copywriting et en storytelling pour les marques e-commerce. Ta mission est de créer des textes "À Propos" qui transforment une simple idée en une histoire de marque crédible et humaine.

CONTEXTE : Un nouvel entrepreneur vient de lancer sa boutique e-commerce nommée "${boutiqueName}". Il vend des "${products}". Sa mission personnelle est : "${mission}". Il a besoin d'un texte "À Propos" pour son site qui soit chaleureux, professionnel et qui donne immédiatement confiance aux visiteurs.

TACHE : Rédige un texte d'environ 150-200 mots pour la page "À Propos" de la boutique.

INSTRUCTIONS :
1. Commence par une phrase d'accroche qui interpelle le visiteur (par exemple, en parlant de la passion pour les produits).
2. Intègre naturellement le nom de la boutique "${boutiqueName}".
3. Développe l'idée de la "${mission}" pour en faire le cœur de l'histoire de la marque. Montre la passion et l'engagement derrière le projet.
4. Mets en avant la qualité ou l'unicité des "${products}".
5. Termine par une phrase qui invite le client à découvrir les produits et qui le rassure sur son achat.
6. Adopte un ton à la fois professionnel, passionné et accessible. N'utilise pas de jargon complexe.

FORMAT DE SORTIE : Texte brut, sans titre.
`,

  cgv: (boutiqueName, email) => `
ROLE : Tu es un assistant juridique spécialisé dans la création de documents pour les petites entreprises e-commerce.

CONTEXTE : Une nouvelle boutique en ligne, "${boutiqueName}", a besoin de Conditions Générales de Vente (CGV) simplifiées pour son site. Le but n'est pas de remplacer un avocat, mais de fournir un document de base crédible qui couvre les points essentiels et rassure les clients. L'email de contact de l'entreprise est ${email}.

TACHE : Génère un texte de CGV structuré avec des articles clairs et simples.

INSTRUCTIONS :
1. Utilise un langage simple et direct, évite le jargon juridique complexe.
2. Personnalise le document en insérant "${boutiqueName}" et "${email}" aux endroits appropriés.
3. Structure le document avec les articles suivants :
   - Article 1 : Objet (expliquer que les CGV régissent les ventes sur le site).
   - Article 2 : Produits (décrire que les produits sont présentés avec le plus de détails possible).
   - Article 3 : Prix (indiquer que les prix sont en Euros TTC et que la boutique se réserve le droit de les modifier).
   - Article 4 : Commande et Paiement (mentionner que le paiement est sécurisé et exigible immédiatement).
   - Article 5 : Livraison (donner des indications générales sur les délais et les zones de livraison).
   - Article 6 : Droit de Rétractation (mentionner le délai légal de 14 jours pour retourner un produit).
   - Article 7 : Service Client (fournir l'${email} comme point de contact).

FORMAT DE SORTIE : Texte brut, avec les titres des articles numérotés.
`,

  privacy: (boutiqueName, email) => `
ROLE : Tu es un expert en protection des données et en conformité RGPD pour les petites entreprises.

CONTEXTE : La boutique "${boutiqueName}" a besoin d'une politique de confidentialité simple mais conforme au RGPD pour rassurer ses clients sur la protection de leurs données personnelles. L'email de contact est ${email}.

TACHE : Rédige une politique de confidentialité claire et rassurante d'environ 100-150 mots.

INSTRUCTIONS :
1. Utilise un langage simple et accessible, évite le jargon juridique.
2. Mentionne que seules les informations nécessaires au traitement des commandes sont collectées.
3. Assure que les données ne sont jamais partagées avec des tiers sans consentement.
4. Indique l'email de contact ${email} pour toute question.
5. Adopte un ton rassurant et transparent.

FORMAT DE SORTIE : Texte brut, sans titre.
`
};

// Fonction pour appeler l'API OpenAI
async function callOpenAI(prompt) {
  try {
    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erreur lors de l\'appel à OpenAI:', error);
    throw error;
  }
}

// Fonction principale pour générer tout le contenu
export async function generateContent(formData) {
  const { boutiqueName, products, mission, email } = formData;

  try {
    // Génération en parallèle pour optimiser les performances
    const [aboutText, cgv, privacy] = await Promise.all([
      callOpenAI(PROMPTS.aboutPage(boutiqueName, products, mission)),
      callOpenAI(PROMPTS.cgv(boutiqueName, email)),
      callOpenAI(PROMPTS.privacy(boutiqueName, email))
    ]);

    return {
      aboutText,
      cgv,
      privacy
    };
  } catch (error) {
    console.error('Erreur lors de la génération du contenu:', error);
    throw new Error('Impossible de générer le contenu. Veuillez réessayer.');
  }
}

// Fonction de fallback avec contenu simulé (pour les tests sans API)
export function generateContentFallback(formData) {
  const { boutiqueName, products, mission, email } = formData;
  
  return {
    aboutText: `Bienvenue chez ${boutiqueName}, un lieu né d'une idée simple : ${mission}. Nous sommes passionnés par ${products} et nous nous engageons à vous offrir des produits de qualité exceptionnelle. Chaque article est sélectionné avec soin pour répondre à vos attentes et transformer votre expérience d'achat en un moment de plaisir. Chez ${boutiqueName}, nous ne vendons pas seulement des produits ; nous partageons notre passion et notre expertise. Explorez notre collection et découvrez ce qui rend notre boutique unique.`,
    
    cgv: `Article 1 : Objet\nLes présentes conditions générales régissent les ventes réalisées par ${boutiqueName} sur son site internet.\n\nArticle 2 : Produits\nLes produits proposés sont ${products}, présentés avec le maximum de détails et de précision possible.\n\nArticle 3 : Prix\nLes prix sont indiqués en euros TTC. ${boutiqueName} se réserve le droit de modifier ses prix à tout moment.\n\nArticle 4 : Commande et Paiement\nLe paiement est sécurisé et exigible immédiatement lors de la commande.\n\nArticle 5 : Livraison\nLes délais de livraison sont communiqués lors de la commande et peuvent varier selon la destination.\n\nArticle 6 : Droit de Rétractation\nConformément à la loi, vous disposez d'un délai de 14 jours pour retourner votre commande.\n\nArticle 7 : Service Client\nPour toute question, contactez-nous à ${email}.`,
    
    privacy: `Politique de Confidentialité de ${boutiqueName}\n\nNous collectons uniquement les informations nécessaires au traitement de votre commande. Vos données personnelles sont protégées et ne sont jamais partagées avec des tiers sans votre consentement. Nous nous engageons à respecter votre vie privée et à sécuriser vos informations selon les standards les plus élevés. Pour toute question concernant vos données, contactez-nous à ${email}.`
  };
}

