import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import des images par défaut
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

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProduct(slug || '');
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif mb-4">Produit non trouvé</h1>
        <Link to="/" className="text-primary hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const imageUrl = product.image_url && product.image_url !== '/placeholder.svg' 
    ? product.image_url 
    : defaultImages[product.slug] || productSofa;

  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux produits
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square relative overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.is_new && (
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-xs tracking-widest uppercase">
                  Nouveau
                </span>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <h1 className="font-serif text-4xl font-light mb-4">{product.name}</h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-2xl font-light">
                  {Number(product.price).toLocaleString('fr-FR')} €
                </span>
                {product.original_price && (
                  <span className="text-lg text-muted-foreground line-through">
                    {Number(product.original_price).toLocaleString('fr-FR')} €
                  </span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="border-t border-b border-border py-6 mb-8 space-y-4">
                {product.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>{product.dimensions}</span>
                  </div>
                )}
                {product.materials && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Matériaux</span>
                    <span>{product.materials}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock</span>
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? `${product.stock} disponibles` : 'Rupture de stock'}
                  </span>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">Quantité</span>
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="luxury"
                    size="xl"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    variant="luxury-outline"
                    size="xl"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart 
                      className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-accent text-accent' : ''}`} 
                    />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24">
              <h2 className="font-serif text-2xl font-light mb-8 text-center">
                Vous aimerez aussi
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <Link 
                    key={p.id} 
                    to={`/product/${p.slug}`}
                    className="group"
                  >
                    <div className="aspect-square overflow-hidden mb-4">
                      <img
                        src={defaultImages[p.slug] || productSofa}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium text-sm">{p.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {Number(p.price).toLocaleString('fr-FR')} €
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
