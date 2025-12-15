import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import productSofa from "@/assets/product-sofa.jpg";
import productArmchair from "@/assets/product-armchair.jpg";
import productLamp from "@/assets/product-lamp.jpg";
import productTable from "@/assets/product-dining-table.jpg";

const defaultImages: Record<string, string> = {
  'canape-bubble': productSofa,
  'table-aqua': productTable,
  'fauteuil-cocoon': productArmchair,
  'lampe-arco': productLamp,
};

const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(price);

const FeaturedProducts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { featuredProducts, loading } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const displayProducts = featuredProducts.slice(0, 4);

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted mb-6" />
                <div className="h-4 bg-muted w-1/2 mb-2" />
                <div className="h-5 bg-muted w-3/4 mb-2" />
                <div className="h-4 bg-muted w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <p className="text-accent text-xs tracking-[0.25em] uppercase mb-4">Sélection</p>
            <h2 className="font-serif text-4xl lg:text-6xl font-light">Pièces Iconiques</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 60 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.8, delay: index * 0.15 }} 
              className="group" 
              onMouseEnter={() => setHoveredId(product.id)} 
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-square mb-6 bg-muted overflow-hidden">
                <Link to={`/product/${product.slug}`}>
                  <img 
                    src={defaultImages[product.slug] || productSofa} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </Link>
                {product.is_new && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground text-[10px] tracking-widest uppercase px-3 py-1">Nouveau</span>
                  </div>
                )}
                <motion.button 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: hoveredId === product.id ? 1 : 0 }} 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-accent text-accent' : ''}`} 
                    strokeWidth={1.5} 
                  />
                </motion.button>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: hoveredId === product.id ? 1 : 0, y: hoveredId === product.id ? 0 : 20 }} 
                  transition={{ duration: 0.3 }} 
                  className="absolute bottom-4 left-4 right-4 flex gap-2"
                >
                  <Button 
                    variant="secondary" 
                    className="flex-1 bg-background/95 backdrop-blur-sm hover:bg-background text-foreground text-xs tracking-widest uppercase py-5"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </motion.div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs tracking-wide mb-1">{product.materials}</p>
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-serif text-lg font-normal mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2">
                  <p className="text-foreground font-medium">{formatPrice(Number(product.price))}</p>
                  {product.original_price && (
                    <p className="text-muted-foreground line-through text-sm">{formatPrice(Number(product.original_price))}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.8 }} className="mt-16 text-center">
          <Link to="/products" className="group inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            <span className="link-underline">Découvrir tous les produits</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
