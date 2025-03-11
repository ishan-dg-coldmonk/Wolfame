import inaugurationPhoto from '../assets/events-page/inauguration-bg.jpg'
import firstdayPhoto from '../assets/home-page/gallery-section/gallery2.jpg'
import seconddayPhoto from '../assets/home-page/gallery-section/gallery3.jpg'
import thirddayPhoto from '../assets/home-page/gallery-section/gallery7.jpg'
import culturalPhoto from '../assets/events-page/cultural-bg.jpg'

const timelineList = [
    {
        title: "DAY 1",
        date: "17 March 2025",
        image: inaugurationPhoto,
        events: ["INITIATION",
            "INAUGURATION CEREMONY",
            "MATCHES BEGINS",],
    },
    {
        title: "DAY 2",
        date: "18 March 2025",
        image: firstdayPhoto,
        events: [
            "HUSTLE BEGINS",
            "ROUND ONE MATCHES",
            "LEAGUE AND KNOCKOUT STAGES",
        ],
    },
    {
        title: "DAY 3",
        date: "19 March 2025",
        image: seconddayPhoto,
        events: [
            "MATCHES PROCEED TO THE NEXT ROUND",
            "MORE INTENSE ACTION",
            "QUARTER AND SEMI FINALS",
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
        date: "20 March 2025",
        image: culturalPhoto,
        events: [
            "CULTURAL NIGHT",
            "LINEUPS TO BE ANNOUNCED SOON",
            "UNLIMITED FUN",
        ],
    },
];

export default timelineList;