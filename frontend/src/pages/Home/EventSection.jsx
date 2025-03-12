import React from "react";
import { Stack, Typography } from "@mui/material";
import { Carousel, Card } from "../../components/AppleCardsCarousel.jsx"; // Import the carousel and card components
import "../../components/AppleCardsCarousel.css"; // Import the CSS for styling
import eventsList from "../../data/events.js"; // Import the events data
import eventBg from "../../assets/home-page/event-bg.jpg"; // Import the background image
import { motion } from "framer-motion"; // Import framer-motion

function EventSection() {
  // Animation variants for the carousel
  const carouselVariants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and slightly below
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Animate to visible
  };

  return (
    <Stack
      id="eventsSection"
      p={4}
      sx={{ 
        alignItems: "center", 
        position: "relative", // Ensure the Stack is positioned relatively
        overflow: "hidden", // Hide overflow
        minHeight: "100vh", // Ensure the section covers the full viewport height
        backgroundImage: `url(${eventBg})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire section
        backgroundPosition: "center", // Center the background image
      }}
      gap={5}
    >
      {/* Translucent Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better contrast
          zIndex: 0, // Place the overlay above the background image but below the content
        }}
      ></div>

      {/* Title */}
      <Typography 
        variant="h1" 
        fontFamily={"'Nosifer', sans-serif"}
        sx={{ 
          mt: 8, // Margin top of 8 units (64px)
          mb: 6, // Margin bottom of 6 units (48px)
          position: "relative", // Ensure the title is above the overlay
          zIndex: 1, // Place the title above the overlay
          fontSize: { xs: '2.8rem', md: '3.6rem' }, // Responsive font size
          fontWeight: 500, // Font weight
          background: "linear-gradient(to bottom, red 0%, rgb(237, 23, 23) 50%, rgb(133, 48, 48) 100%)", // Gradient background
          WebkitBackgroundClip: "text", // Clip background to text
          WebkitTextFillColor: "transparent", // Make text transparent
        }}
      >
        <span>Events</span>
      </Typography>

      {/* Apple Cards Carousel with Animation */}
      <motion.div
        initial="hidden" // Initial animation state
        whileInView="visible" // Trigger animation when in view
        viewport={{ once: true, amount: 0.2 }} // Only trigger once and when 20% of the element is visible
        variants={carouselVariants} // Animation variants
        style={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <Carousel
          items={eventsList.map((eventObj, index) => (
            <Card
              key={index}
              card={{
                src: eventObj.image, // Event image
                title: eventObj.description, // Event name
                category: eventObj.event, // Static category
                content: (
                  <div>
                    <h1 className="a-center bloody-text">{eventObj.event}</h1>
                    <h3 >Rules:</h3>
                    <ul>
                      {eventObj.rules.map((rule, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: rule }} />
                      ))}
                    </ul>
                    <div className="a-center">
                      <div className="tooltip">
                        <a 
                          href="#" 
                          className="btn btn--white btn--animated" 
                          style={{ fontSize: '0.9rem' }} // Reduce font size
                        >
                          Register
                        </a>
                        <span className="tooltiptext">Registrations will begin shortly</span>
                      </div>
                    </div>
                  </div>
                ),
              }}
              index={index}
            />
          ))}
        />
      </motion.div>
    </Stack>
  );
}

export default EventSection;

 {/* <h3>Coordinators:</h3>
                    <ul>
                      {eventObj.coordinators.map((coordinator, i) => (
                        <li key={i}>
                          {coordinator.name} - {coordinator.contact}
                        </li>
                      ))}
                    </ul> */}