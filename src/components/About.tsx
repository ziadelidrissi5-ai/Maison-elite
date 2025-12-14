import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import productArmchair from "@/assets/product-armchair.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1 }} className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img initial={{ scale: 1.1 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 1.5 }} src={productArmchair} alt="Savoir-faire artisanal" className="w-full h-full object-cover" />
            </div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="absolute -bottom-8 -right-8 lg:-right-16 bg-accent text-accent-foreground p-8 lg:p-12">
              <p className="font-serif text-5xl lg:text-6xl font-light">60</p>
              <p className="text-xs tracking-widest uppercase mt-2">Ans d'excellence</p>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.2 }}>
            <p className="text-accent text-xs tracking-[0.25em] uppercase mb-6">Notre histoire</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light leading-tight mb-8">L'Art de Vivre<br /><span className="italic">à la Française</span></h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>Depuis 1960, Maison Élite incarne l'excellence du mobilier français. Chaque pièce est le fruit d'une collaboration unique entre designers de renommée internationale et artisans d'exception.</p>
              <p>Notre engagement : créer des meubles qui transcendent les modes, alliant innovation technique et beauté intemporelle.</p>
            </div>
            <div className="grid grid-cols-3 gap-8 my-12 py-8 border-y border-border">
              <div><p className="font-serif text-3xl lg:text-4xl font-light text-foreground">200+</p><p className="text-xs tracking-wide text-muted-foreground mt-1">Designers</p></div>
              <div><p className="font-serif text-3xl lg:text-4xl font-light text-foreground">50</p><p className="text-xs tracking-wide text-muted-foreground mt-1">Pays</p></div>
              <div><p className="font-serif text-3xl lg:text-4xl font-light text-foreground">80</p><p className="text-xs tracking-wide text-muted-foreground mt-1">Showrooms</p></div>
            </div>
            <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-xs tracking-widest uppercase px-8 py-6">
              Notre histoire<ArrowRight className="w-4 h-4 ml-3" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;