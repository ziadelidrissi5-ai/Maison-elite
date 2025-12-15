import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
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

const Wishlist = () => {
  const { items, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-serif text-3xl font-light mb-4">
              Connectez-vous pour voir vos favoris
            </h1>
            <p className="text-muted-foreground mb-8">
              Vous devez être connecté pour accéder à votre liste de favoris.
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
            <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-serif text-3xl font-light mb-4">
              Votre liste de favoris est vide
            </h1>
            <p className="text-muted-foreground mb-8">
              Explorez notre collection et ajoutez vos pièces préférées.
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
            Mes Favoris
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Link to={`/product/${item.product.slug}`}>
                    <img
                      src={defaultImages[item.product.slug] || productSofa}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.product_id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <Link to={`/product/${item.product.slug}`}>
                  <h3 className="font-serif text-lg mb-2 hover:text-accent transition-colors">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-4">
                  {Number(item.product.price).toLocaleString('fr-FR')} €
                </p>

                <Button
                  variant="luxury-outline"
                  className="w-full"
                  onClick={() => addToCart(item.product_id)}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
