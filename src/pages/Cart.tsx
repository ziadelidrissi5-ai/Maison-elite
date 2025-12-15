import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import productSofa from '@/assets/product-sofa.jpg';
import productArmchair from '@/assets/product-armchair.jpg';
import productDiningTable from '@/assets/product-dining-table.jpg';
import productLamp from '@/assets/product-lamp.jpg';

const defaultImages: Record<string, string> = {
  'canape-bubble': productSofa,
  'table-aqua': productDiningTable,
  'fauteuil-cocoon': productArmchair,
  'lampe-arco': productLamp,
};

const Cart = () => {
  const { items, loading, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-serif text-3xl font-light mb-4">
              Connectez-vous pour voir votre panier
            </h1>
            <p className="text-muted-foreground mb-8">
              Vous devez être connecté pour accéder à votre panier.
            </p>
            <Button variant="luxury" size="xl" onClick={() => navigate('/auth')}>
              Se connecter
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-serif text-3xl font-light mb-4">
              Votre panier est vide
            </h1>
            <p className="text-muted-foreground mb-8">
              Découvrez notre collection de meubles d'exception.
            </p>
            <Button variant="luxury" size="xl" onClick={() => navigate('/')}>
              Découvrir nos produits
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-light mb-12 text-center">
            Votre Panier
          </h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 p-6 border border-border"
                >
                  <Link 
                    to={`/product/${item.product.slug}`}
                    className="w-32 h-32 flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={defaultImages[item.product.slug] || productSofa}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <Link 
                          to={`/product/${item.product.slug}`}
                          className="font-serif text-lg hover:text-accent transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-muted-foreground">
                          {Number(item.product.price).toLocaleString('fr-FR')} €
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-medium">
                        {(Number(item.product.price) * item.quantity).toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border p-8 sticky top-24">
                <h2 className="font-serif text-xl font-light mb-6">Récapitulatif</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total</span>
                    <span>{total.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span>Gratuite</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-8">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{total.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>

                <Button 
                  variant="luxury" 
                  size="xl" 
                  className="w-full"
                  onClick={() => navigate('/checkout')}
                >
                  Passer commande
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Link 
                  to="/"
                  className="block text-center text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
