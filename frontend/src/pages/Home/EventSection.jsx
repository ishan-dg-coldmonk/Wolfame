import React from "react";
import { Stack, Typography } from "@mui/material";
import { Carousel, Card } from "../../components/AppleCardsCarousel.jsx"; // Import the carousel and card components
import "../../components/AppleCardsCarousel.css"; // Import the CSS for styling
import eventsList from "../../data/events.js"; // Import the events data

function EventSection() {
  return (
    <Stack p={4} sx={{ alignItems: "center" }} gap={5}>
      {/* Title */}
      <Typography variant="h1" fontFamily={"'Nosifer', sans-serif"}>
        <span className="text-gradient">Events</span>
      </Typography>

      {/* Apple Cards Carousel */}
      <Carousel
        items={eventsList.map((eventObj, index) => (
          <Card
            key={index}
            card={{
              src: eventObj.image, // Event image
              title: eventObj.event, // Event name
              category: "Event", // Static category
              content: (
                <div>
                  <p>{eventObj.description}</p>
                  <h3>Rules:</h3>
                  <ul>
                    {eventObj.rules.map((rule, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: rule }} />
                    ))}
                  </ul>
                  <h3>Coordinators:</h3>
                  <ul>
                    {eventObj.coordinators.map((coordinator, i) => (
                      <li key={i}>
                        {coordinator.name} - {coordinator.contact}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }}
            index={index}
          />
        ))}
      />
    </Stack>
  );
}

export default EventSection;