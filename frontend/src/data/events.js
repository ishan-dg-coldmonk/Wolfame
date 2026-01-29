import futsalPhoto from "../assets/events/futsal.webp";
import tugOfWarPhoto from "../assets/events/tug-of-war.webp";
import volleyballPhoto from "../assets/events/volleyball.webp";
import badmintonPhoto from "../assets/events/badminton.webp";
import basketballPhoto from "../assets/events/basketball.webp";
import chessPhoto from "../assets/events/chess.webp";
import carromPhoto from "../assets/events/carrom.webp";
import ttPhoto from "../assets/events/table-tennis.webp";
import bgmiPhoto from "../assets/events/bgmi.webp";
import cricketPhoto from "../assets/events/cricket.webp";
import powerliftingPhoto from "../assets/events/powerlifting.webp";
import valorantPhoto from "../assets/events/valorant.webp";
import fifaPhoto from "../assets/events/fifa.webp";
import strongWomenPhoto from "../assets/events/strong-woman.webp";
import pesPhoto from "../assets/events/pes.webp";
import pushup from "../assets/events/pull-up.webp";

const eventsList = [
    {
        label: 'Futsal',
        event: "FUTSAL",
        image: futsalPhoto,
        description: "Dribble past your opponents",
        rules: [
            "At most 2 teams can participate from each hall/hostel.",
            "Each team will be made of 5+2 players.",
            "Rolling substitution is allowed.",
            // "Game length:<br />Group stage - Each half 10 minutes<br />Semi-finals - Each half 15 minutes<br />Final - Each half 20 minutes",
            "No one is allowed to play for more than one team.",
            "Teams will be warned at most 2 times for shooting above a certain height.",
            "The opponent's goal post, and the same will lead to a penalty at the third time (not considering deflections). In this situation, the assistant referee's call will be final.",
            "Direct goal from a goal kick is not allowed.",
            "A single yellow card will lead to suspension for 2:30 minutes, and a red card will lead to a complete suspension from the match.",
            "Spikes are not allowed. Players must either play wearing joggers or barefoot.",
            "In case of any dispute, referee's call will be final.",
        ],
        points: [100, 60, 30],
        team: 2,
        players: [6, 8],
        coordinators: [
            {
                name: 'Suman',
                contact: '+91 6297295070'
            },
            {
                name: 'Shridhar',
                contact: '+91 7365060664'
            },
        ],
    },
    {
        label: 'Tug of war',
        event: "TUG OF WAR",
        image: tugOfWarPhoto,
        description: "Tussle For the trophy",
        rules: [
            "At most 2 teams can participate from each hall/hostel.",
            "Each team can have at most 5 players with 2 substitute players.",
            "One person can only be a part of one team.",
            "Any player found touching or lying on the ground for more than 5 seconds will be given a foul and will lead to a loss of the team.",
            "In case of any dispute, referee's call will be final.",
        ],
        points: [100, 60, 30],
        team: 2,
        players: [5, 5],
        coordinators: [
            {
                name: 'Pantho',
                contact: '+91 7003471232'
            },
            {
                name: 'Wriddhiraj',
                contact: '+91 9863057356'
            },
        ],
    },
    {
        label: 'Volleyball',
        event: "VOLLEYBALL",
        image: volleyballPhoto,
        description: "Smash 'em up",
        rules: [
            "Each team can comprise of 6+1 players. There will be knockout matches of 25 points each (single set) except semifinals (3 sets of 15 points each) and final (3 sets of 25 points each).",
            "It is legal to contact the ball with any part of a player's body.",
            "A player cannot block or attack a serve from on or inside the 10-foot line.",
            "Ball hitting the boundary line is in. Ball is out if it hits the antenna, the floor completely outside the court, any of the net or cables outside the antennae, the referee stand or pole.",
            "It is illegal to catch, hold or throw the ball.",
            "Double touching, carrying, throwing, etc will be counted as a foul. Crossing the court centerline with any part of your body is a violation.",
            "Exception: if it is the'hand or foot, the entire hand or entire foot must cross for it to be a violation.",
            "In case of any dispute, referee's call will be final.",
        ],
        points: [50, 30, 15],
        tema: 2,
        players: [7, 7],
        coordinators: [
            {
                name: 'Subir',
                contact: '+91 9002205594'
            },
            {
                name: 'Dipak',
                contact: '+91 9073527607'
            },
            {
                name: 'Sarthi',
                contact: '+91 9125804980'
            },
        ],
    },
    {
        label: 'Badminton',
        event: "BADMINTON",
        image: badmintonPhoto,
        description: "Don't get too cocky",
        rules: [
            "At most 2 teams can participate from each hall/hostel.",
            "Each team must have 5 members.",
            "Playing order: doubles, singles, doubles, singles, doubles.",
            "Team that wins at least 3 matches out of 5 will be declared winner.",
            "Each player can play at most 2 matches but cannot play 2 single matches.",
            "Scoring system will be decided by the referee based on the stage of matches.",
            "BWF rules will be followed during all matches.",
            "Linesman, match referee and coordinator decision will be final.",
            "All general rules should be followed.",
        ],
        points: [100, 60, 30],
        team: 2,
        players: [5, 5],
        coordinators: [
            {
                name: 'Arka',
                contact: '+91 8918124750'
            },
            {
                name: 'Sayandip',
                contact: '+91 8167500901'
            },
        ],
    },
    {
        label: 'Basketball',
        event: "BASKETBALL",
        image: basketballPhoto,
        description: "Dunk and Dive",
        rules: [
            "The position shall be decided by a toss",
            "The game will be played on a regular 3x3 playing court with 1 basket.",
            "Each team can have at most 4 players (3 players on the court and 1 substitute).",
            "Every shot from inside the arc (2-point field goal area) shall be awarded 1 point.",
            "Every shot from behind the arc (3-point field goal area) shall be awarded 2 points.",
            "Every successful free throw shall be awarded 1 point.",
            "Each team shall be granted 2 time-out per half. Time-out lasts for 30 seconds.",
            "A team is in a penalty situation after it has committed 5 fouls.",
            "All games will be played according to FIBA official 3x3 rules.",
            "Game duration for league matches is 8 minutes or first to 15 points (whichever comes first)",
            "Game duration for semi-finals and final is 10 minutes or first to 21 points (whichever comes first)",
        ],
        points: [50, 30, 15],
        team: 2,
        players: [3, 5],
        coordinators: [
            {
                name: 'Alex',
                contact: '+91 8249199487'
            },
            {
                name: 'Sumeet',
                contact: '+91 7325908070'
            },
        ],
    },
    {
        label: 'Chess',
        event: "CHESS",
        image: chessPhoto,
        description: "Face the world's gambit",
        rules: [
            "Time format is of 3+2 for first stage with increment from the first move.",
            "Team will consist of 3 players.",
            "Player list to be provided before every rounds.",
            "Event procedure will be based on the number of teams.",
            "4 rounds will be played in swiss fashion after that top 8 (number can vary according to the no of participants )teams will qualify fo the knockout stage where the time format will be 10+5 .",
            "Touch and move rule will be applicable",
            "With 2 illegals you will lose the match.After one illegal you have to stop the clock and call the arbiter.",
            "All fide rules are applicable.",
            "Arbiter decision is the final decision.",
        ],
        points: [50, 30, 15],
        team: 2,
        players: [3, 3],
        coordinators: [
            {
                name: 'Arnab',
                contact: '+91 9474617725'
            },
            {
                name: 'Barnik',
                contact: '+91 9641443116'
            },

        ],
    },
    {
        label: 'Carrom',
        event: "CARROM",
        image: carromPhoto,
        description: "Rani akele nahi milegi",
        rules: [
            "Each team will consist of 2 members.",
            "Red coin does not have any value. So the red coin will be picked up from the board after the first strike.",
            "Maximum time allotted to a particular round will be 10 minutes. If a team finishes the board before that time, that team will win the match, otherwise, the team with the lowest number of coins present on the board will win the match.",
            // "There can be maximum 3 teams from each hall/hostel.",
            "Each match will be knockout.",
            "When placing the striker on the board to shoot, the striker must touch both 'base lines'.",
            "The striker may not touch the diagonal arrow line. For 'back-shots' you may only use your thumb or the scissors technique.",
            "No part of your body, except your hand, may cross the imaginary diagonal line nor may your elbow protrude over the frame in front of you. Even your feet or knees may not leave leave your quadrant.",
            "Sinking the striker causes you one piece and your turn. But, if you sink a piece in the same shot then the two come up and you shoot again.",
            "After sinking the striker, your opponent places the due piece(s) within the center.",
            "If a piece jumps off the board, it is placed on the center spot. If pieces land on end or are overlapping they are left that way.",
            "If you sink your opponent's piece, you lose your turn.",
            "In case of any dispute, organizer's decision will be final.",
        ],
        points: [50, 30, 15],
        team: 3,
        players: [2, 2],
        coordinators: [
            {
                name: 'Prayas',
                contact: '+91 9679061739'
            },
            {
                name: 'Rajdeep',
                contact: '+91 8509267506'
            },
        ],
    },
    {
        label: 'Table Tennis',
        event: "TABLE TENNIS",
        image: ttPhoto,
        description: "Serve with a spin",
        rules: [
            "At most 2 teams can participate from each hall/hostel.",
            "Each team must have 5 members.",
            "Playing order: singles, doubles, singles, doubles, singles.",
            "Team that wins at least 3 matches out of 5 will be declared winner.",
            "Each player can play at most 2 matches but cannot play 2 single matches.",
            "Scoring system will be decided by the referee based on the stage of matches.",
            "Latest ITTF rules will be followed during the match.",
        ],
        points: [100, 60, 30],
        team: 2,
        players: [5, 5],
        coordinators: [
            {
                name: 'Hitesh',
                contact: '+91 7703914079'
            },
            {
                name: 'Kiran',
                contact: '+91 95645 09253'
            },
            {
                name: 'Astitva',
                contact: '+91 9167571733'
            },
        ],
    },
    {
        label: 'Short Pitch Cricket',
        event: "SHORT PITCH CRICKET",
        image: cricketPhoto,
        description: "Save your bails",
        rules: [
            "Team will consist of 8 players (7+1).",
            "All the matches will be of 5 overs.",
            "Every team should give their squad list to their respective JMCR.",
            "No player can play for two different teams.",
            "A maximum of 3 players can be changed in a team throughout	the tournament.",
            "Batting and bowling rules will be informed before the match.",
            "In case of any dispute the umpire's decision shall be final.",
        ],
        points: [100, 60, 30],
        team: 2,
        players: [8, 8],
        coordinators: [
            {
                name: 'Dishan',
                contact: '+91 8918892152'
            },
            {
                name: 'Soukarsha',
                contact: '+91 8509577139'
            },
        ],
    },
    {
        label: 'Powerlifting',
        event: "POWERLIFTING",
        image: powerliftingPhoto,
        description: "Let the bar ring your bells",
        rules: [
            "The event will consist of Deadlifting for both men and women and Powerlifting Squats for men only.",
            "RULES FOR DEADLIFT:-",
            "There will be 3 rounds in this event - 1 attempt per round",
            // "The participants will be given 1 attempt to make a successful lift in each round.",
            "The participants cannot increase the weight in the next round until a successful lift is made.",
            "There will be 4 judges, who will decide whether the lift was proper or not. Atleast 3 votes will be required for a successful lift.",
            // "A lift will be considered successful if at least 3 out of the 4 judges vote in its favour.",
            "The participant shall be disqualified if he or she fails in all the rounds.",
            "The right technique for deadlifting is described below -<br />The bar cannot travel downward before reaching the final position.<br />You must stand erect with the shoulders back.<br />You must stand with your knees straight at the completion of the lift.<br />You cannot have the bar rest on the thighs during the lift.<br />You cannot step forward or back or move the feet laterally during the 'up phase'.<br />You must return the bar to the floor while maintaining control with both hands.<br />You must listen to the referee's command- 'DOWN' — that is when you lower the weight.",
            "No straps can be used to aid your grip on deadlifts. Must use either double overhand, mixed grip or hook grip.",
            "RULES FOR SQUATS:-",
            "There will be 3 rounds in this event - 1 attempt per round",
            // "The participants will be given one attempt to make a successful squat in a round.",
            "The participants cannot increase the weight in the next round until a successful squat is done.",
            "There will be 4 judges who will decide whether the squat was proper or not. Atleast 3 votes will be required for a successful squat.",
            // "A squat will be considered successful if at li ast 3 out of the 4 judges vote in its favour.",
            "The participant shall be disqualified if he or she fail in all the rounds.",
            "The right technique for powerlifting squat is described below -<br />You need to bend your knees and lower the body until the top surface of the leg (upper quad at the hip joint) is lower than the top of the knee.<br />You need to have your knees locked at both the beginning and end of the movement.<br />You can't step forward or backward, or move your feet: laterally while squatting — you can't lose your balance.<br />You must listen to the referee's commands- 'SQUAT and 'RACK' to start and finish the squat respectively.<br />You can't touch your elbows or arms with your legs which deliberately supports the movement.<br />You can't 'double bounce' at the bottom (go up, the down then up again), or have any downward movement of the bar.",
            "The participant with highest DOTS score will be declared the winner. (Average for men, Best for women)",
            "The participants are suggested to lookup the DOTS scoring methodology on the Internet."
        ],
        points: [50, 30, 15],
        team: undefined,
        players: [1, 1],
        coordinators: [
            {
                name: 'Sourik',
                contact: '+91 8944913915'
            },
            {
                name: 'Dildahar',
                contact: '+91 7082844272'
            },
        ],
    },
    {
        label: 'BGMI',
        event: "BGMI",
        image: bgmiPhoto,
        description: "Best gamer makes it",
        rules: [
            "It is a 4(+1) player team tournament. A 4 man-starter roster and up to 1 substitute.",
            "Emulators are not allowed in any game mode organized. Any game modifying tools except 'GFX tool' is not allowed.",
            "Players can play on android/iOS/phones only.",
            "Any use of unfair means such as aimbot, trigger bot, ESP etc. will result in disqualification.",
            "If a team/player fail to join the room in time, their squad/they will be given 0 points for it.",
            "The exploitation of bugs that hinders fair play will result in disqualification.",
            "For the tiebreaker of the points, position points will be considered for breaking the tie.",
            "For the further tiebreaker, number of chicken dinners will be considered. TDM matchers will be conducted if it goes further.",
            "Organizers would not be held responsible for connectivity issues on the participant's side.",
            "POINT SYSTEM:<br />Kill - 1 point.<br />1st - 10 points.<br />2nd - 8 points.<br />3rd - 6 points.<br />4th - 5 points.<br />5th - 4 points.<br />6th - 3 points.<br />7th - 2 points.<br />8th - 12th - 1 point.<br />13th - 16th - 0 point.",
            "MAPS: ERANGLE, MIRAMAR, SANHOK.",
            "All participants are required to keep their phones and earphones charged as no charging services will be provided.",
            "In qualifying team Deathmatch matches, only AKM ,throwables and spawn guns are allowed ",
            "In cases of unforeseen circumstances or situations not covered by the existing rules, the decision of the Tournament Officials will be final and binding",
        ],
        points: [50, 30, 15],
        team: 2,
        players: [4, 5],
        coordinators: [
            {
                name: 'Sandeep Raj',
                contact: '+91 8946058529'
            },
            {
                name: 'Devendra Prasad',
                contact: '+91 9079627232'
            },
        ],
    },
    {
        label: 'PES',
        event: "PES",
        image: pesPhoto,
        description: "Jaldi Score Karo",
        rules: [
            "The format will be : Tournament Knockout Type(1v1).",
            "Maximum 6 players can take part from a hall/hostel",
            "Team strength must not be more than 3000",
            "All the matches will be of 8 minutes and if result is not decided direct penalty",
            "Quarter final matches will be of 10 minutes and extra time and penalty must be on ",
            "Semi final matches will be of 12 minutes and extra time and penalty must be on",
            "Final match will be of 15 minutes.",
            "Extra time and Penalties must be On",
            "Back Passing not allowed (You can backpass to build the play but time wasting is strictly not allowed)",
            "If any connection problems occur and the match is not completed, then the players need to play the remaining time with the same scoreline that they had.",
        ],
        points: [50, 30, 15],
        team: undefined,
        players: [1, 1],
        coordinators: [
            {
                name: 'Biswajit',
                contact: '+91 8961120732'
            },
            {
                name: 'Ashim',
                contact: '+91 9800631107'
            },
        ],
    },
    {
        label: 'Pushup-Pullup',
        event: "PUSHUP - PULLUP",
        image: pushup,
        description: "Push Hard, Pull Strong",
        rules: [
            "Each participant will be alloted a time of 1 minute each for pushup and pullup respectively",
            "Total no of pushup and pull-ups will be counted as total score of one participant",
            "Pushups and pull-ups with proper form shall be counted and decided by the coordinator ",
            "The pushups and pull-ups may or may not be continuous for the entire time. You can stop ,take rest and then continue again with in the time limit of one minute",
            // "The participant will be disqualified if she fails to do all the 3 tasks.",
            // "In the event of any controversy, related to the judges' decision, a slow motion video recording will be consulted.",
            // "The right technique for the activities is described below.",
            // "Forearm plank:-<br/>Place forearms on the floor with elbows aligned below shoulders and arms parallel to your body at about shoulder width.<br/>Ground toes into the floor, keeping your legs straight.<br/>Your head should be in line with your back.<br/>Keep your torso straight and rigid and your body in a straight line, with no sagging or bending.<br/>Hold this position for 90 seconds.",
            // "Squats:-<br/>Stand straight up with your feet shoulder's width apart.<br/>While bending at the knees, push your hips out and bend down.<br/>Keep your torso erect.<br/>Bend till the knee joint makes a 90° angle.<br/>Don't allow your knees to extend beyond your toes, the knees should be in line with the toes rather than angled to the side.<br/>Your feet should remain fully on the ground.",
            // "Criteria for deciding the winner-<br/>The total time taken to complete all the tasks successfully will be recorded.<br/>The participants will be awarded the positions according to the time they take.<br/>The participant with the minimum time duration will be awarded the 1st position and so on.",
            // "The entire event will be video recorded.",
        ],
        points: [50, 30, 15],
        team: undefined,
        players: [1, 1],
        coordinators: [
            {
                name: 'Sourik',
                contact: '+91 8944913915'
            },
            {
                name: 'Dildahar',
                contact: '+91 7082844272'
            },
        ],
    },
    {
        label: 'Valorant',
        event: "VALORANT",
        image: valorantPhoto,
        description: "Coordinate to dominate",
        rules: [
            "Each team must have a minimum of five (5) players eligible to play for each match.",
            "Players must bring their own earphones/headphones, laptops, mouse, keyboard, etc.",
            "All matches will be knockout matches except the semifinals and Final. The semifinals and Final will be 'Best of 3' Round matches.",
            "For knockout matches maps will be decided by toss.",
            "Home/Away will be designated by toss....the winner team will be designated as the 'home Team.'",
            "Before pausing the participant must ask the moderator for permission",
            "Both teams may agree to restart a map prior to Round 1 beginning if the latency is unreasonable for the server selected.",
            "Any team member who is displaying excessive toxic behaviour during matches may also be disqualified at the discretion of a tournament administrator.",
            "In case of any dispute the decision of the moderators will be final"
        ],
        points: [50, 30, 15],
        team: 2,
        players: [5, 20],
        coordinators: [
            {
                name: 'Anish',
                contact: '+91 9031038277'
            },
            {
                name: 'Pritam',
                contact: '+91 9905358075'
            },
        ],
    },
];

export default eventsList