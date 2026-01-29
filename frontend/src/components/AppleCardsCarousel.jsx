import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";

// Context for managing card state
const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

// Main Carousel Component
export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 230 : 384; // Adjust for mobile
      const gap = window.innerWidth < 768 ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="carousel-container">
        <div
          className="carousel"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="carousel-inner">
            {items.map((item, index) => (
              <motion.div
                key={`card-${index}`}
                className="carousel-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index, ease: "easeOut" }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="carousel-controls">
          <button onClick={scrollLeft} disabled={!canScrollLeft}>
            <IconArrowNarrowLeft />
          </button>
          <button onClick={scrollRight} disabled={!canScrollRight}>
            <IconArrowNarrowRight />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

// Card Component
export const Card = ({ card, index }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useOutsideClick(containerRef, () => setOpen(false));

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <motion.button className="card" onClick={handleOpen}>
        <div className="card-content">
          <p className="card-category">{card.category}</p>
          <p className="card-title">{card.title}</p>
        </div>
        <img src={card.src} alt={card.title} className="card-image" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="card-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop"
            />
            <motion.div
              ref={containerRef}
              className="modal-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button onClick={handleClose} className="modal-close">
                <IconX />
              </button>
              <div className="modal-body">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};