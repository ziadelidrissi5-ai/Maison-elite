import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-living-room.jpg";
import collectionBedroom from "@/assets/collection-bedroom.jpg";
import collectionDining from "@/assets/collection-dining.jpg";
import productSofa from "@/assets/product-sofa.jpg";

const collections = [
  { id: 1, title: "Salon", subtitle: "L'art de recevoir", image: heroImage, items: "48 pièces" },
  { id: 2, title: "Chambre", subtitle: "Repos & sérénité", image: collectionBedroom, items: "32 pièces" },
  { id: 3, title: "Salle à Manger", subtitle: "Moments partagés", image: collectionDining, items: "56 pièces" },
  { id: 4, title: "Bureau", subtitle: "Créativité & focus", image: productSofa, items: "24 pièces" },
];

const Collections = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <p className="text-accent text-xs tracking-[0.25em] uppercase mb-4">Nos univers</p>
            <h2 className="font-serif text-4xl lg:text-6xl font-light">Collections</h2>
          </div>
          <a href="#all-collections" className="mt-6 lg:mt-0 group inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            <span className="link-underline">Voir toutes les collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {collections.map((collection, index) => (
            <motion.a key={collection.id} href={`#${collection.title.toLowerCase()}`} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.15 }} className="group relative aspect-[3/4] overflow-hidden">
              <div className="absolute inset-0">
                <img src={collection.image} alt={collection.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <p className="text-primary-foreground/70 text-xs tracking-[0.2em] uppercase mb-2">{collection.items}</p>
                <h3 className="font-serif text-2xl lg:text-3xl font-light text-primary-foreground mb-1">{collection.title}</h3>
                <p className="font-serif text-sm italic text-primary-foreground/80">{collection.subtitle}</p>
                <div className="mt-6 flex items-center gap-2 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors">
                  <span className="text-xs tracking-widest uppercase">Explorer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;