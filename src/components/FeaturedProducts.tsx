import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import productSofa from "@/assets/product-sofa.jpg";
import productArmchair from "@/assets/product-armchair.jpg";
import productLamp from "@/assets/product-lamp.jpg";
import productTable from "@/assets/product-dining-table.jpg";

const products = [
  { id: 1, name: "Canapé Bubble", designer: "Design Sacha Lakic", price: 8900, image: productSofa, isNew: true },
  { id: 2, name: "Fauteuil Organic", designer: "Design Marcel Wanders", price: 4200, image: productArmchair, isNew: true },
  { id: 3, name: "Lampe Vertigo", designer: "Design Constance Guisset", price: 1850, image: productLamp, isNew: false },
  { id: 4, name: "Table Aqua", designer: "Design Fabrice Berrux", price: 12500, image: productTable, isNew: true },
];

const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(price);

const FeaturedProducts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
          {products.map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.15 }} className="group" onMouseEnter={() => setHoveredId(product.id)} onMouseLeave={() => setHoveredId(null)}>
              <div className="relative aspect-square mb-6 bg-muted overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {product.isNew && <div className="absolute top-4 left-4"><span className="bg-accent text-accent-foreground text-[10px] tracking-widest uppercase px-3 py-1">Nouveau</span></div>}
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: hoveredId === product.id ? 1 : 0 }} className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm hover:bg-background transition-colors">
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                </motion.button>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: hoveredId === product.id ? 1 : 0, y: hoveredId === product.id ? 0 : 20 }} transition={{ duration: 0.3 }} className="absolute bottom-4 left-4 right-4">
                  <Button variant="secondary" className="w-full bg-background/95 backdrop-blur-sm hover:bg-background text-foreground text-xs tracking-widest uppercase py-5">Aperçu rapide</Button>
                </motion.div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs tracking-wide mb-1">{product.designer}</p>
                <h3 className="font-serif text-lg font-normal mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-foreground font-medium">{formatPrice(product.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.8 }} className="mt-16 text-center">
          <a href="#products" className="group inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            <span className="link-underline">Découvrir tous les produits</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;