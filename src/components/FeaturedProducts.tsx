import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import productArmchair from "@/assets/product-armchair.jpg";
import productDiningTable from "@/assets/product-dining-table.jpg";
import productLamp from "@/assets/product-lamp.jpg";
import productSofa from "@/assets/product-sofa.jpg";

const products = [
  {
    id: 1,
    name: "Fauteuil Élégance",
    category: "Assises",
    price: 2890,
    image: productArmchair,
    isNew: true,
  },
  {
    id: 2,
    name: "Table Sculptée Noyer",
    category: "Tables",
    price: 4590,
    image: productDiningTable,
    isNew: false,
  },
  {
    id: 3,
    name: "Lampadaire Artisan",
    category: "Luminaires",
    price: 1290,
    image: productLamp,
    isNew: true,
  },
  {
    id: 4,
    name: "Canapé Velours Émeraude",
    category: "Assises",
    price: 5890,
    image: productSofa,
    isNew: false,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);
};

const FeaturedProducts = () => {
  return (
    <section id="products" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
              Sélection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light">
              Pièces <span className="italic">d'exception</span>
            </h2>
          </div>
          <Button variant="luxury-outline" size="lg">
            Voir tout le catalogue
          </Button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* New Badge */}
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-gold text-accent-foreground text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1">
                    Nouveau
                  </span>
                )}

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-gold hover:text-accent-foreground transition-colors duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button variant="luxury" className="w-full">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">
                  {product.category}
                </p>
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-foreground font-sans font-medium">
                  {formatPrice(product.price)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
