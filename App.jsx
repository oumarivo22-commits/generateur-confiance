import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, Shield, Clock, Users, Copy, Download, CreditCard, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { generateContent, generateContentFallback } from './api.js'
import { processPayment, downloadBadges } from './payment.js'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing') // landing, form, preview, success
  const [formData, setFormData] = useState({
    boutiqueName: '',
    products: '',
    mission: '',
    email: ''
  })
  const [generatedContent, setGeneratedContent] = useState({
    aboutText: '',
    cgv: '',
    privacy: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)
    setError('')
    
    try {
      // Tentative d'utilisation de l'API OpenAI réelle
      const content = await generateContent(formData)
      setGeneratedContent(content)
      setCurrentScreen('preview')
    } catch (apiError) {
      console.warn('API OpenAI non disponible, utilisation du contenu de fallback:', apiError)
      // Fallback vers le contenu simulé si l'API échoue
      const fallbackContent = generateContentFallback(formData)
      setGeneratedContent(fallbackContent)
      setCurrentScreen('preview')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePayment = async () => {
    setIsProcessingPayment(true)
    setError('')
    
    try {
      // Traitement du paiement (simulation pour le prototype)
      const paymentResult = await processPayment(2900) // 29€
      
      if (paymentResult.success) {
        setCurrentScreen('success')
      } else {
        setError('Le paiement a échoué. Veuillez réessayer.')
      }
    } catch (paymentError) {
      setError(paymentError.message || 'Erreur lors du paiement. Veuillez réessayer.')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Écran 1 : Landing Page
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Votre boutique n'inspire pas confiance ?
              <span className="block text-indigo-600 mt-2">
                Générez vos textes professionnels en 2 minutes.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Arrêtez de perdre des ventes à cause d'une page "À Propos" vide ou de CGV amateurs. 
              Notre IA crée pour vous des textes qui rassurent vos clients.
            </p>

            <Button 
              onClick={() => setCurrentScreen('form')}
              size="lg"
              className="text-lg px-8 py-4 mb-12 bg-indigo-600 hover:bg-indigo-700"
            >
              Créer mes textes maintenant →
            </Button>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Généré par IA</h3>
                <p className="text-gray-600 text-center">Textes professionnels créés par intelligence artificielle</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Prêt en 2 minutes</h3>
                <p className="text-gray-600 text-center">Obtenez tous vos textes instantanément</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Approuvé par les e-commerçants</h3>
                <p className="text-gray-600 text-center">Utilisé par des centaines de boutiques</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ce que vous obtenez :</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Page "À Propos" professionnelle</h3>
                    <p className="text-gray-600">Un texte engageant qui raconte votre histoire</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Conditions Générales de Vente</h3>
                    <p className="text-gray-600">CGV complètes et conformes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Politique de Confidentialité</h3>
                    <p className="text-gray-600">Conforme RGPD et rassurante</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Pack de badges de confiance</h3>
                    <p className="text-gray-600">5 badges professionnels en haute définition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Écran 2 : Formulaire
  if (currentScreen === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Étape 1/2 : Décrivez-nous votre boutique
              </h1>
              <p className="text-gray-600">
                Quelques informations simples suffisent pour créer vos textes professionnels
              </p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de votre boutique
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex: L'Atelier de Chloé"
                      value={formData.boutiqueName}
                      onChange={(e) => setFormData({...formData, boutiqueName: e.target.value})}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Que vendez-vous ? (soyez simple et direct)
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex: des bougies artisanales parfumées"
                      value={formData.products}
                      onChange={(e) => setFormData({...formData, products: e.target.value})}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quelle est votre mission ? (une seule phrase)
                    </label>
                    <Textarea
                      placeholder="Ex: je veux créer des ambiances relaxantes chez les gens"
                      value={formData.mission}
                      onChange={(e) => setFormData({...formData, mission: e.target.value})}
                      required
                      className="text-lg"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre adresse email professionnelle
                    </label>
                    <Input
                      type="email"
                      placeholder="Ex: contact@atelierdechloe.fr"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="text-lg"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg py-4 bg-indigo-600 hover:bg-indigo-700"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Génération en cours...' : 'Générer mes textes et voir l\'aperçu →'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentScreen('landing')}
                className="text-gray-600"
              >
                ← Retour
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Écran 3 : Aperçu et Offre
  if (currentScreen === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Félicitations ! Votre Pack Confiance est prêt.
              </h1>
              <p className="text-gray-600">
                Voici un aperçu de vos textes professionnels générés par IA
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Section Aperçus */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>Votre page "À Propos"</span>
                      <Badge variant="secondary">Aperçu</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <p className="text-gray-700 leading-relaxed">
                        {generatedContent.aboutText.substring(0, 150)}...
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
                    </div>
                    <Button variant="outline" className="mt-4" disabled>
                      Voir plus (débloqué après paiement)
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>Vos Conditions Générales de Vente</span>
                      <Badge variant="secondary">Aperçu</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <p className="text-gray-700 leading-relaxed">
                        {generatedContent.cgv.substring(0, 120)}...
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
                    </div>
                    <Button variant="outline" className="mt-4" disabled>
                      Voir plus (débloqué après paiement)
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Section Offre */}
              <div>
                <Card className="border-2 border-indigo-200 shadow-xl">
                  <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-2xl text-center text-indigo-900">
                      Débloquez votre Pack Confiance Complet
                    </CardTitle>
                    <CardDescription className="text-center text-lg">
                      <span className="text-3xl font-bold text-indigo-600">29€</span>
                      <span className="text-gray-600 ml-2">(paiement unique)</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Le texte complet de votre page "À Propos"</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Vos CGV professionnelles et complètes</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Votre Politique de Confidentialité (conforme RGPD)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-semibold">EN BONUS : Pack de 5 badges de confiance HD</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handlePayment}
                      size="lg" 
                      className="w-full text-lg py-4 bg-green-600 hover:bg-green-700"
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Traitement en cours...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Je débloque tout pour 29€
                        </>
                      )}
                    </Button>

                    {error && (
                      <div className="flex items-center space-x-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-700 text-sm">{error}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Lock className="h-4 w-4" />
                        <span>Paiement sécurisé</span>
                      </div>
                      <span>•</span>
                      <span>Visa, Mastercard, PayPal</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center mt-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentScreen('form')}
                    className="text-gray-600"
                  >
                    ← Modifier mes informations
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Écran 4 : Succès et Livraison
  if (currentScreen === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Merci pour votre confiance ! Voici votre pack.
              </h1>
              <p className="text-gray-600">
                Tous vos textes sont maintenant disponibles. Copiez-les et intégrez-les à votre boutique.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Votre page "À Propos"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {generatedContent.aboutText}
                    </p>
                  </div>
                  <Button onClick={() => copyToClipboard(generatedContent.aboutText)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copier le texte
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vos Conditions Générales de Vente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {generatedContent.cgv}
                    </p>
                  </div>
                  <Button onClick={() => copyToClipboard(generatedContent.cgv)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copier le texte
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Votre Politique de Confidentialité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {generatedContent.privacy}
                    </p>
                  </div>
                  <Button onClick={() => copyToClipboard(generatedContent.privacy)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copier le texte
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle>Votre Bonus : Pack de badges de confiance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {['Paiement Sécurisé', 'Livraison Rapide', 'Satisfait ou Remboursé', 'Support 24/7', 'Garantie Qualité'].map((badge, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <Shield className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
                        <p className="text-xs font-medium">{badge}</p>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => downloadBadges()}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le pack de badges (.zip)
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => {
                  setCurrentScreen('landing')
                  setFormData({boutiqueName: '', products: '', mission: '', email: ''})
                  setGeneratedContent({aboutText: '', cgv: '', privacy: ''})
                  setError('')
                  setIsProcessingPayment(false)
                }}
                variant="outline"
                size="lg"
              >
                Créer un nouveau pack
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default App

