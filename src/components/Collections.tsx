import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import collectionBedroom from "@/assets/collection-bedroom.jpg";
import collectionDining from "@/assets/collection-dining.jpg";
import heroImage from "@/assets/hero-living-room.jpg";

const collections = [
  {
    title: "Salon",
    subtitle: "Living Collection",
    description: "Canapés, fauteuils et tables basses d'exception",
    image: heroImage,
    itemCount: 48,
  },
  {
    title: "Salle à manger",
    subtitle: "Dining Collection",
    description: "Tables, chaises et buffets raffinés",
    image: collectionDining,
    itemCount: 36,
  },
  {
    title: "Chambre",
    subtitle: "Bedroom Collection",
    description: "Lits, commodes et chevets élégants",
    image: collectionBedroom,
    itemCount: 42,
  },
];

const Collections = () => {
  return (
    <section id="collections" className="py-24 md:py-32 bg-gradient-cream">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Nos Collections
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light">
            Explorez nos <span className="italic">univers</span>
          </h2>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={collection.image}
                alt={collection.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-all duration-500 group-hover:from-charcoal/90" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-gold-light font-sans text-xs tracking-[0.2em] uppercase mb-2">
                  {collection.subtitle}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-cream mb-3">
                  {collection.title}
                </h3>
                <p className="text-cream/70 text-sm mb-6 max-w-xs">
                  {collection.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-cream/60 text-sm">
                    {collection.itemCount} pièces
                  </span>
                  <motion.div
                    className="flex items-center gap-2 text-cream group-hover:text-gold transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-sm font-sans tracking-wide">Explorer</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
