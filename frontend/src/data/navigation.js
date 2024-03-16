import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';

const navigationList = [
    { name: 'Home', to: '/', icon: <HomeIcon fontSize='large' /> },
    { name: 'Events', to: '/events', icon: <SportsHandballIcon fontSize='large' /> },
    { name: 'Leader Board', to: '/leaderboard', icon: <EmojiEventsIcon fontSize='large' /> },
    { name: 'Gallery', to: '/gallery', icon: <ImageIcon fontSize='large' /> },
    { name: 'Residence', to: '/residence', icon: <ApartmentIcon fontSize='large' /> },
    { name: 'Contact Us', to: '/contactUs', icon: <PersonIcon fontSize='large' /> },
]

export default navigationList