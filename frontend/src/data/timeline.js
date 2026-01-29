import inaugurationPhoto from '../assets/events-page/inauguration-bg.webp'
import firstdayPhoto from '../assets/home-page/gallery-section/gallery2.webp'
import seconddayPhoto from '../assets/home-page/gallery-section/gallery3.webp'
import thirddayPhoto from '../assets/home-page/gallery-section/gallery7.webp'
import culturalPhoto from '../assets/events-page/cultural-bg.webp'

const timelineList = [
    {
        title: "DAY 1",
        date: "5 February 2026",
        image: inaugurationPhoto,
        events: ["INITIATION",
            "INAUGURATION CEREMONY",
            "MATCHES BEGINS",],
    },
    {
        title: "DAY 2",
        date: "6 February 2026",
        image: firstdayPhoto,
        events: [
            "HUSTLE BEGINS",
            "ROUND ONE MATCHES",
            "LEAGUE AND KNOCKOUT STAGES",
        ],
    },
    {
        title: "DAY 3",
        date: "7 February 2026",
        image: seconddayPhoto,
        events: [
            "MATCHES PROCEED TO THE NEXT ROUND",
            "MORE INTENSE ACTION",
            "QUARTER'S ,SEMI'S AND FINALS",
        ],
    },
    // {
    //     title: "THIRD DAY",
    //     date: "22 March 2024",
    //     image: thirddayPhoto,
    //     events: [
    //         "FINALE GRIND",
    //         "AWARD CEREMONY",
    //         "DECLARATION OF CHAMPION OF CHAMPIONS",
    //     ],
    // },
    {
        title: "DAY 4",
        date: "8 February 2026",
        image: culturalPhoto,
        events: [
            "CULTURAL NIGHT",
            "LINEUPS TO BE ANNOUNCED SOON",
            "UNLIMITED FUN",
        ],
    },
];

export default timelineList;