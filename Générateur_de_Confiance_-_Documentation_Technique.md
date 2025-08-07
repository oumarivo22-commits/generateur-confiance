# Générateur de Confiance - Documentation Technique

## Installation et Lancement

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Clé API OpenAI (optionnelle pour les tests)

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd generateur-confiance

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

### Variables d'Environnement
Créer un fichier `.env` à la racine :
```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_BASE=https://api.openai.com/v1
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

## Structure du Projet

```
generateur-confiance/
├── src/
│   ├── App.jsx              # Composant principal
│   ├── api.js               # Intégration OpenAI
│   ├── payment.js           # Système de paiement
│   ├── assets/              # Images et badges
│   └── components/ui/       # Composants UI
├── public/
├── package.json
└── README.md
```

## Fonctionnalités

### 1. Génération de Contenu
- **API OpenAI** : Génération de textes professionnels
- **Fallback** : Contenu pré-défini si API indisponible
- **Prompts optimisés** : Pour page À Propos, CGV, et politique de confidentialité

### 2. Système de Paiement
- **Simulation Stripe** : Pour les tests et démonstrations
- **Gestion d'erreurs** : Messages d'erreur clairs
- **États de chargement** : Feedback visuel pendant le traitement

### 3. Assets Visuels
- **5 badges de confiance** : Générés avec IA
- **Téléchargement ZIP** : Pack complet pour les clients
- **Design professionnel** : Couleurs et icônes cohérentes

## Déploiement en Production

### 1. Configuration Stripe Réelle
Remplacer dans `src/payment.js` :
```javascript
// Décommenter et configurer la vraie intégration Stripe
import { loadStripe } from '@stripe/stripe-js';
// ... voir commentaires dans le fichier
```

### 2. Déploiement Netlify
```bash
# Build du projet
npm run build

# Déployer sur Netlify
# Connecter le repository GitHub à Netlify
# Configurer les variables d'environnement
```

### 3. Configuration DNS
- Acheter un domaine professionnel
- Configurer les DNS vers Netlify
- Activer HTTPS (automatique avec Netlify)

## Optimisations Recommandées

### Performance
- **Lazy loading** des composants
- **Compression** des images
- **CDN** pour les assets statiques

### SEO
- **Meta tags** optimisés
- **Schema markup** pour les avis
- **Sitemap** XML

### Analytics
- **Google Analytics** pour le tracking
- **Hotjar** pour l'analyse comportementale
- **Stripe Dashboard** pour les métriques de paiement

## Coûts d'Exploitation

### Par Transaction (29€)
- **OpenAI API** : ~1-2€ (selon la longueur des textes)
- **Stripe** : 0,87€ (3% + 0,25€)
- **Hébergement** : ~0,10€ (Netlify)
- **Total coûts** : ~2€
- **Profit net** : ~27€ (93% de marge)

### Coûts Fixes Mensuels
- **Domaine** : 1€/mois
- **Netlify Pro** : 19$/mois (optionnel)
- **OpenAI** : Selon usage
- **Total** : 20-50€/mois

## Monitoring et Maintenance

### Métriques Clés
- **Taux de conversion** (formulaire → paiement)
- **Temps de génération** des textes
- **Erreurs API** OpenAI
- **Échecs de paiement** Stripe

### Logs à Surveiller
- **Erreurs JavaScript** (console navigateur)
- **Échecs API** OpenAI
- **Transactions** Stripe
- **Performance** (Core Web Vitals)

## Support et Évolutions

### Fonctionnalités Futures
1. **Multi-langues** (anglais, espagnol)
2. **Templates sectoriels** (mode, tech, beauté)
3. **Intégrations** (Shopify, WooCommerce)
4. **API publique** pour développeurs

### Maintenance
- **Mise à jour** des dépendances (mensuelle)
- **Optimisation** des prompts OpenAI
- **Tests** de régression (avant chaque déploiement)
- **Sauvegarde** des données clients

## Contact et Support

Pour toute question technique :
- **Documentation** : Ce fichier README
- **Issues** : GitHub Issues
- **Support** : contact@votre-domaine.com

---

*Version 1.0 - Prototype fonctionnel prêt pour la production*

