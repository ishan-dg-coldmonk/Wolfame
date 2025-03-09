import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import wolfPng from "../../assets/logo.png";
import heroBg from "../../assets/home-page/hero-section/hero-bg.jpeg";
import "./index.css";


const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Smooth scroll behavior
        block: "start", // Align to the top of the section
      });
    }
  };

function HeroSection() {
    // Animation variants for different elements
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" }
        }
    };

    const logoAnimation = {
        hidden: { opacity: 0, scale: 1 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 1.2, 
                ease: [0.25, 0.1, 0.25, 1.0] // Custom cubic bezier for fluid motion
            }
        }
    };

    const titleAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.9, 
                delay: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <Stack
            sx={{
                height: "110vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Translucent overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.59)",
                }}
            ></motion.div>
            <Stack
                style={{
                    padding: "1.6rem",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    width: "80%",
                    position: "relative",
                }}
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={logoAnimation}
                    style={{ flex: "0 0 39%", maxWidth: "80%", marginBottom: "6rem" }}
                    className="hero-logo"
                >
                    <img 
                        src={wolfPng} 
                        style={{ 
                            width: "100%", 
                            height: "auto"
                        }} 
                        alt="Wolfame Logo" 
                    />
                </motion.div>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    flex={1}
                    gap={2}
                    sx={{ marginTop: "-100px" }}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={titleAnimation}
                    >
                        <h1
                            style={{
                                textAlign: "center",
                                fontFamily: "'Nosifer', sans-serif",
                                fontSize: "3.6rem",
                                cursor: "pointer",
                                background: "linear-gradient(to right, red 0%, rgb(251, 29, 29) 50%, rgb(228, 27, 27) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                textShadow: "0 2px 2px rgba(0, 0, 0, 0)",
                            }}
                        >
                            WOLFAME 2025
                        </h1>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.6 }}
                    >
                        <Typography variant="h3" color="white" sx={{
                            fontWeight: "600", 
                            fontSize: "2.5rem", 
                            fontFamily:"Frijole", 
                            textTransform:"uppercase", 
                            background: "linear-gradient(to right, white, rgb(162, 158, 159))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "-10px"
                        }}>
                            Feel the
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.9 }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                background: "linear-gradient(to right, white, rgb(162, 158, 159))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: "600", 
                                fontSize: "2.5rem", 
                                fontFamily:"Frijole", 
                                textTransform:"uppercase"
                            }}
                        >
                            <Typewriter
                                words={["Adrenaline", "Thrill", "Glory"]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                cursorColor="white"
                                typeSpeed={60}
                                deleteSpeed={30}
                                delaySpeed={1500}
                            />
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 1.2 }}
                    >
                        <a href="#eventsSection" className="btn btn--white btn--animated" onClick={(e) => {
    e.preventDefault(); // Prevent default anchor behavior
    scrollToSection("eventsSection"); // Trigger smooth scroll
  }}>Events</a>
                    </motion.div>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default HeroSection;