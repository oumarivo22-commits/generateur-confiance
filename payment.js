// Module de paiement pour le Générateur de Confiance
// Dans un environnement de production, ceci serait remplacé par une vraie intégration Stripe

// Configuration Stripe (à remplacer par de vraies clés en production)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_stripe_key_here';
const STRIPE_SECRET_KEY = 'sk_test_your_stripe_secret_key_here';

// Simulation d'un paiement Stripe
export async function processPayment(amount = 2900) { // 29€ en centimes
  return new Promise((resolve, reject) => {
    // Simulation d'un délai de traitement
    setTimeout(() => {
      // Simulation d'un succès de paiement (95% de réussite)
      const success = Math.random() > 0.05;
      
      if (success) {
        resolve({
          success: true,
          paymentId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: amount,
          currency: 'eur',
          status: 'succeeded'
        });
      } else {
        reject(new Error('Paiement refusé. Veuillez vérifier vos informations de carte.'));
      }
    }, 2000); // Simulation de 2 secondes de traitement
  });
}

// Fonction pour télécharger le fichier ZIP des badges
export function downloadBadges() {
  // Créer un lien de téléchargement pour le fichier ZIP
  const link = document.createElement('a');
  link.href = '/src/assets/badges-confiance.zip';
  link.download = 'badges-confiance.zip';
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Configuration pour une vraie intégration Stripe (commentée pour le prototype)
/*
// Vraie intégration Stripe pour la production
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export async function processRealPayment(amount = 2900) {
  const stripe = await stripePromise;
  
  // Créer une session de paiement côté serveur
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount,
      currency: 'eur',
    }),
  });
  
  const { clientSecret } = await response.json();
  
  // Confirmer le paiement
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: {
        // Les détails de la carte seraient collectés via Stripe Elements
      }
    }
  });
  
  if (result.error) {
    throw new Error(result.error.message);
  } else {
    return result.paymentIntent;
  }
}
*/

// Fonction utilitaire pour formater les prix
export function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount / 100);
}

// Validation des données de paiement (pour une vraie intégration)
export function validatePaymentData(cardData) {
  const errors = [];
  
  if (!cardData.number || cardData.number.length < 13) {
    errors.push('Numéro de carte invalide');
  }
  
  if (!cardData.expiry || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
    errors.push('Date d\'expiration invalide (MM/YY)');
  }
  
  if (!cardData.cvc || cardData.cvc.length < 3) {
    errors.push('Code CVC invalide');
  }
  
  return errors;
}

