import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import heroImage from "@/assets/hero-living-room.jpg";
import collectionBedroom from "@/assets/collection-bedroom.jpg";
import collectionDining from "@/assets/collection-dining.jpg";

const slides = [
  {
    id: 1,
    image: heroImage,
    subtitle: "Nouvelle Collection 2024",
    title: "L'Art de Vivre",
    description: "design contemporain",
    cta: "Découvrir",
    accentColor: "text-accent",
  },
  {
    id: 2,
    image: collectionBedroom,
    subtitle: "Édition Limitée",
    title: "Chambre",
    description: "élégance intemporelle",
    cta: "Explorer",
    accentColor: "text-accent",
  },
  {
    id: 3,
    image: collectionDining,
    subtitle: "Collection Signature",
    title: "Salle à Manger",
    description: "design exclusif",
    cta: "Voir plus",
    accentColor: "text-accent",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          {/* Image with Ken Burns effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/10" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="max-w-xl lg:max-w-2xl">
                <motion.p
                  custom={0.2}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className={`${slides[currentSlide].accentColor} font-sans text-xs md:text-sm tracking-[0.25em] uppercase mb-4`}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.h1
                  custom={0.4}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-foreground leading-none mb-4"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  custom={0.6}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-serif text-2xl md:text-3xl italic text-muted-foreground mb-8"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  custom={0.8}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="group border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 px-8 py-6 text-sm tracking-widest uppercase"
                  >
                    {slides[currentSlide].cta}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-6 lg:left-10 z-10">
        <button
          onClick={prevSlide}
          className="p-3 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Slide précédente"
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={1} />
        </button>
      </div>

      <div className="absolute bottom-1/2 translate-y-1/2 right-6 lg:right-10 z-10">
        <button
          onClick={nextSlide}
          className="p-3 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Slide suivante"
        >
          <ChevronRight className="w-8 h-8" strokeWidth={1} />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-10 left-0 right-0 z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Slide indicators */}
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group flex items-center gap-2"
                >
                  <div className="relative h-px w-12 bg-foreground/20 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-foreground origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: currentSlide === index ? 1 : 0,
                      }}
                      transition={{
                        duration: currentSlide === index && isPlaying ? 6 : 0.3,
                        ease: "linear",
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-xs tracking-widest uppercase"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>

            {/* Slide counter */}
            <div className="text-foreground/60 text-sm font-sans">
              <span className="text-foreground">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;