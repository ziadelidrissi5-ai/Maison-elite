import { motion } from "framer-motion";
import { Truck, Shield, Headphones, Leaf } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Livraison Premium",
    description: "Livraison gantée à domicile dans toute l'Europe sous 2 à 4 semaines.",
  },
  {
    icon: Shield,
    title: "Garantie 5 ans",
    description: "Tous nos meubles sont garantis 5 ans pièces et main d'œuvre.",
  },
  {
    icon: Headphones,
    title: "Service Client Dédié",
    description: "Un conseiller personnel pour vous accompagner dans vos choix.",
  },
  {
    icon: Leaf,
    title: "Éco-responsable",
    description: "Matériaux durables et fabrication éthique certifiée.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
              Notre Maison
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-light leading-tight mb-8">
              L'excellence du mobilier
              <br />
              <span className="italic">depuis 2015</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Maison Élite sélectionne pour vous les plus belles pièces de mobilier 
              contemporain. Chaque meuble est choisi avec soin auprès des meilleurs 
              artisans et designers européens.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Notre engagement : vous offrir des meubles d'exception alliant esthétique 
              intemporelle, matériaux nobles et fabrication durable. Une qualité qui 
              traverse le temps.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "500+", label: "Pièces uniques" },
                { value: "15k", label: "Clients satisfaits" },
                { value: "28", label: "Pays livrés" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl text-gold mb-1">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-background p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <feature.icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
