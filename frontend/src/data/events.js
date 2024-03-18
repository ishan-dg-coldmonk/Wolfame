import futsalPhoto from "../assets/events/futsal.jpg";
import tugOfWarPhoto from "../assets/events/tug-of-war.jpg";
import volleyballPhoto from "../assets/events/volleyball.jpg";
import badmintonPhoto from "../assets/events/badminton.jpg";
import basketballPhoto from "../assets/events/basketball.jpg";
import chessPhoto from "../assets/events/chess.jpg";
import carromPhoto from "../assets/events/carrom.jpg";
import ttPhoto from "../assets/events/table-tennis.jpg";
import bgmiPhoto from "../assets/events/bgmi.jpg";
import cricketPhoto from "../assets/events/cricket.jpg";
import powerliftingPhoto from "../assets/events/powerlifting.jpg";
import valorantPhoto from "../assets/events/valorant.jpg";
import fifaPhoto from "../assets/events/fifa.jpg";
import strongWomenPhoto from "../assets/events/strong-woman.jpg";

const eventsList = [
    {
        label: 'Futsal',
        event: "FUTSAL",
        image: futsalPhoto,
        description: "DRIBBLE PAST YOUR OPPONENTS",
        rules: [
            "At most 2 teams can participate from each hall/hostel.",
            "Each team will be made of 5+2 players.",
            "Rolling substitution is allowed.",
            "Game length:<br />Group stage - Each half 10 minutes<br />Semi-finals - Each half 15 minutes<br />Final - Each half 20 minutes",
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
                name: 'Jishu Sit',
                contact: '7908455761'
            },
            {
                name: 'Shridhar Murmu',
                contact: '7365060664'
            },
        ],
    },
    {
        label: 'Tug of war',
        event: "TUG OF WAR",
        image: tugOfWarPhoto,
        description: "TUSSLE FOR THE TROPHY",
        rules: [
            "At most 2 teams can participate from each hall/hostel.",
            "Each team can have at most 5 members.",
            "One person can only be a part of one team.",
            "Any player found touching or lying on the ground for more than 5 seconds will be given a foul and will lead to a loss of the team.",
            "In case of any dispute, referee's call will be final.",
        ],
        points: [100, 60, 30],
        team: 2,
        players: [5, 5],
        coordinators: [
            {
                name: 'Akash Choudhary',
                contact: '6207689007'
            },
            {
                name: 'Puru Maharishi',
                contact: '7877675654'
            },
        ],
    },
    {
        label: 'Volleyball',
        event: "VOLLEYBALL",
        image: volleyballPhoto,
        description: "SMASH 'EM UP",
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
                name: 'Akash Choudhary',
                contact: '6207689007'
            },
            {
                name: 'Ashwini Ranjan',
                contact: '7352225631'
            },
        ],
    },
    {
        label: 'Badminton',
        event: "BADMINTON",
        image: badmintonPhoto,
        description: "DON'T GET TOO COCKY",
        rules: [
            "At most 2 teams can participate from each hall/hostel.",
            "Each team must have 5 members.",
            "Playing order: doubles, singles, doubles, singles, doubles.",
            "Team that wins at least 3 matches out of 5 will be declared winner.",
            "Each player can play at most 2 matches but cannot play 2 single matches.",
            "Scoring system will be decided by the referee based on the stage of matches.",
            "BWF rules will be followed during all matches.",
        ],
        points: [100, 60, 30],
        team: 2,
        players: [5, 5],
        coordinators: [
            {
                name: 'Sanjay Sharma',
                contact: '6376153144'
            },
            {
                name: 'Abhishek Kumar',
                contact: '8529926657'
            },
        ],
    },
    {
        label: 'Basketball',
        event: "BASKETBALL",
        image: basketballPhoto,
        description: "DUNK AND DIVE",
        rules: [
            "The position shall be decided by a toss",
            "The game will be played on a regular 3x3 playing court with 1 basket.",
            "Each team can have at most 4 players (3 players on the court and 1 substitute).",
            "Remote coaching from outside the court is not allowed.",
            "Every shot from inside the arc (1-point field goal area) shall be awarded 1 point.",
            "Every shot from behind the arc (2-point field goal area) shall be awarded 2 points.",
            "Every successful free throw shall be awarded 1 point.",
            "Each team shall be granted 1 time-out. Time-out lasts for 30 seconds.",
            "A team is in a penalty situation after it has committed 6 fouls.",
            "All games will be played according to FIBA official 3x3 rules.",
        ],
        points: [50, 30, 15],
        team: 2,
        players: [3, 5],
        coordinators: [
            {
                name: 'Alex Horo ',
                contact: '8249199487'
            },
            {
                name: 'Pururav Singh Gautam',
                contact: '8698961728'
            },
        ],
    },
    {
        label: 'Chess',
        event: "CHESS",
        image: chessPhoto,
        description: "FACE THE WOLF'S GAMBIT",
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
                name: 'Siddharata Jana',
                contact: '9800245106'
            },
            {
                name: 'Pritam Jana',
                contact: '7384950614'
            },
        ],
    },
    {
        label: 'Carrom',
        event: "CARROM",
        image: carromPhoto,
        description: "RANI AKELE NAHI MILEGI",
        rules: [
            "Each team will consist of 2 members.",
            "There can be maximum 3 teams from each hall/hostel.",
            "Each match will be knockout.",
            "When placing the striker on the board to shoot, the striker must touch both 'base lines'.",
            "The striker may not touch the diagonal arrow line. For 'back-shots' you may only use your thumb or the scissors technique.",
            "No part of your body, except your hand, may cross the imaginary diagonal line nor may your elbow protrude over the frame in front of you. Even your feet or knees may not leave leave your quadrant.",
            "Sinking the striker causes you one piece and your turn. But, if you sink a piece in the same shot then the two come up and you shoot again.",
            "After sinking the striker, your opponent places the due piece(s) within the center.",
            "If a piece jumps off the board, it is placed on the center spot. If pieces land on end or are overlapping they are left that way.",
            "If you sink your opponent's piece, you lose your turn.",
            "A game consists of 29 points or 6 boards, whichever comes first.",
            "In case of any dispute, organizer's decision will be final.",
        ],
        points: [50, 30, 15],
        team: 3,
        players: [2, 2],
        coordinators: [
            {
                name: 'Hemanta Besra',
                contact: '9883868346'
            },
            {
                name: 'Paramjeet Hansda',
                contact: '6207601312'
            },
        ],
    },
    {
        label: 'Table Tennis',
        event: "TABLE TENNIS",
        image: ttPhoto,
        description: "SERVE WITH A SPIN",
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
                name: 'Abhinav Singh',
                contact: '7541075363'
            },
            {
                name: 'Rajarshi Ghosh',
                contact: '9641319775'
            },
        ],
    },
    {
        label: 'Short Pitch Cricket',
        event: "SHORT PITCH CRICKET",
        image: cricketPhoto,
        description: "SAVE YOUR BAILS",
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
                name: 'Sougat Mahato ',
                contact: '7001392492'
            },
            {
                name: 'Rishikesh Kumar',
                contact: '9142116466'
            },
        ],
    },
    {
        label: 'Powerlifting',
        event: "POWERLIFTING",
        image: powerliftingPhoto,
        description: "LET THE BAR RING YOUR BELLS",
        rules: [
            "The event will consist of 2 activities - Deadlifting and Powerlifting squat.",
            "RULES FOR DEADLIFT:-",
            "There will be 3 rounds in this event.",
            "The participants will be given 1 attempt to make a successful lift in each round.",
            "The participants cannot increase the weight in the next round until a successful lift is made.",
            "There will be 4 judges, who will decide whether the lift was proper or not.",
            "A lift will be considered successful if at least 3 out of the 4 judges vote in its favour.",
            "The participant shall be disqualified if he or she fails in all the rounds.",
            "The right technique for deadlifting is described below -<br />The bar cannot travel downward before reaching the final position.<br />You must stand erect with the shoulders back.<br />You must stand with your knees straight at the completion of the lift.<br />You cannot have the bar rest on the thighs during the lift.<br />You cannot step forward or back or move the feet laterally during the 'up phase'.<br />You must return the bar to the floor while maintaining control with both hands.<br />You must listen to the referee's command- 'DOWN' — that is when you lower the weight.",
            "No straps can be used to aid your grip on deadlifts. Must use either double overhand, mixed grip or hook grip.",
            "RULES FOR SQUATS:-",
            "There will be 3 rounds in this event.",
            "The participants will be given one attempt to make a successful squat in a round.",
            "The participants cannot increase the weight in the next round until a successful squat is done.",
            "There will be 4 judges who will decide whether the squat was proper or not.",
            "A squat will be considered successful if at li ast 3 out of the 4 judges vote in its favour.",
            "The participant shall be disqualified if he or she fail in all the rounds.",
            "The right technique for powerlifting squat is described below -<br />You need to bend your knees and lower the body until the top surface of the leg (upper quad at the hip joint) is lower than the top of the knee.<br />You need to have your knees locked at both the beginning and end of the movement.<br />You can't step forward or backward, or move your feet: laterally while squatting — you can't lose your balance.<br />You must listen to the referee's commands- 'SQUAT and 'RACK' to start and finish the squat respectively.<br />You can't touch your elbows or arms with your legs which deliberately supports the movement.<br />You can't 'double bounce' at the bottom (go up, the down then up again), or have any downward movement of the bar.",
            "Criteria for deciding the winners: The sum of weights successfully lifted in all the 6 rounds (i.e. 3 rounds of deadlifts and 3 rounds of squats) will be added and divided by the body weight of the lifter to calculate a ratio. The participants will be awarded with a position according to this ratio, where the participant with the maximum ratio will be awarded the 1st position and so on.",
            "The entire event will be recorded.",
        ],
        points: [50, 30, 15],
        team: undefined,
        players: [1, 1],
        coordinators: [
            {
                name: 'Indranil Bain',
                contact: '9547894515'
            },
            {
                name: 'Puru Maharishi',
                contact: '7877675654'
            },
        ],
    },
    {
        label: 'BGMI',
        event: "BGMI",
        image: bgmiPhoto,
        description: "BEST GAMER MAKES IT",
        rules: [
            "It is a 4(+1) player team tournament. A 4 man-starter roster and up to 1 substitute.",
            "Emulators are not allowed in any game mode organized. Any game modifying tools except 'GFX tool' is not allowed.",
            "Players can play on android/iOS/phones only.",
            "Any use of unfair means such as aimbot, trigger bot, ESP etc. will result in disqualification.",
            "If a team/player fail to join the room in time, their squad/they will be given 0 points for it.",
            "The exploitation of bugs that hinders fair play will result in disqualification.",
            "For the tiebreaker of the points, position points will be considered for breaking the tie.",
            "For the further tiebreaker, number of chicken dinners will be considered.",
            "Organizers would not be held responsible for connectivity issues on the participant's side.",
            "POINT SYSTEM:<br />Kill - 1 point.<br />1st - 10 points.<br />2nd - 8 points.<br />3rd - 6 points.<br />4th - 5 points.<br />5th - 4 points.<br />6th - 3 points.<br />7th - 2 points.<br />8th - 12th - 1 point.<br />13th - 16th - 0 point.",
            "MAPS: ERANGLE, MIRAMAR, SANHOK.",
            "All participants are required to keep their phones and earphones charged as no charging services will be provided.",
        ],
        points: [50, 30, 15],
        team: 2,
        players: [4, 5],
        coordinators: [
            {
                name: 'Tryambak Bhunya',
                contact: '7980766414'
            },
            {
                name: 'Rajat Rahar',
                contact: '6378251367'
            },
        ],
    },
    {
        label: 'Strong Women',
        event: "STRONG WOMEN",
        image: strongWomenPhoto,
        description: "STAND ALMOST ANYTHING",
        rules: [
            "The event will consist of 3 activities- Forearm Plank, Sprinting and Bodyweight Squats.",
            "The participants are required to do :- plank (duration - 1.5 minutes), 100 metre sprint and 30 Bodyweight squats.",
            "There will be 4 judges.",
            "The participants will have to complete all the 3 tasks in one go, following the correct techniques.",
            "The participant will be disqualified if she fails to do all the 3 tasks.",
            "In the event of any controversy, related to the judges' decision, a slow motion video recording will be consulted.",
            "The right technique for the activities is described below.",
            "Forearm plank:-<br/>Place forearms on the floor with elbows aligned below shoulders and arms parallel to your body at about shoulder width.<br/>Ground toes into the floor, keeping your legs straight.<br/>Your head should be in line with your back.<br/>Keep your torso straight and rigid and your body in a straight line, with no sagging or bending.<br/>Hold this position for 90 seconds.",
            "Squats:-<br/>Stand straight up with your feet shoulder's width apart.<br/>While bending at the knees, push your hips out and bend down.<br/>Keep your torso erect.<br/>Bend till the knee joint makes a 90° angle.<br/>Don't allow your knees to extend beyond your toes, the knees should be in line with the toes rather than angled to the side.<br/>Your feet should remain fully on the ground.",
            "Criteria for deciding the winner-<br/>The total time taken to complete all the tasks successfully will be recorded.<br/>The participants will be awarded the positions according to the time they take.<br/>The participant with the minimum time duration will be awarded the 1st position and so on.",
            "The entire event will be video recorded.",
        ],
        points: [50, 30, 15],
        team: undefined,
        players: [1, 1],
        coordinators: [
            {
                name: 'Rohit Yadav',
                contact: '9079627232'
            },
        ],
    },
    {
        label: 'Valorant',
        event: "VALORANT",
        image: valorantPhoto,
        description: "COORDINATE TO DOMINATE",
        rules: [
            "Each team must have a minimum of five (5) players eligible to play for each match.",
            "Players must bring their own earphones/headphones.",
            "Players must bring their own laptops, mouse, keyboard, etc.",
            "All matches will be knockout matches except the semifinals and Final. The semifinals and Final will be 'Best of 3' Round matches.",
            "For knockout matches maps will be decided by toss.",
            "Home/Away will be designated by toss....the winner team will be designated as the 'home Team.'",
            "Best of 3:<br />Home Team bans a map.<br />Away team bans a map.<br />Home team bans a map.<br />Home Team picks Map 1, Away Team chooses Map 1 side.<br />Away team picks Map 2, Home Team chooses Map 2 side.<br />The team with a better round differential through two maps chooses Map 3 side.",
            "Both teams may agree to restart a map prior to Round 1 beginning if the latency is unreasonable for the server selected.",
            "Any team member who is displaying excessive toxic behaviour during matches may also be disqualified at the discretion of a tournament administrator.",
        ],
        points: [50, 30, 15],
        team: 2,
        players: [5, 20],
        coordinators: [
            {
                name: 'Alex Horo',
                contact: '8249199487'
            },
            {
                name: 'Ankush Dutta',
                contact: '9083247051'
            },
        ],
    },
    {
        label: 'Fifa',
        event: "FIFA",
        image: fifaPhoto,
        description: "TRAIN FINGERS FOR FOOTBALL",
        rules: [
            "Platform: FIFA 23 (updated teams).",
            "Controller players must bring their own controller or keyboard. If not, will be provided from the organizers.",
            "Opponent allotment - Randomly chosen by the organizers, half length - 6 minutes, tournament type 1V1(Knockout), camera - Default, difficulty - World Class.",
            "There will be a moderator always present throughout the course of the match.",
            "During an ongoing match the game cannot be paused by an individual unless the ball goes outside for a throw in/goal kick/free kick.",
            "Before pausing the participant must ask the moderator for permission.",
            "Any technical difficulty found must be informed immediately to the moderators. In that,case the match may be replayed.",
            "A draw (tie-in score) will be resolved by extra time (Classic) followed by a penalty shootout.",
            "Use of abusive words/misconduct will result in immediate disqualification.",
            "In case of any dispute the decision of the moderators will be final.",
        ],
        points: [50, 30, 15],
        team: undefined,
        players: [1, 1],
        coordinators: [
            {
                name: 'Utsav Kumar Vishwakarma',
                contact: '8709825784'
            },
            {
                name: 'Pial Sarkar Turjo',
                contact: '8961807378'
            },
        ],
    },
];

export default eventsList