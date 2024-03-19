import { createBrowserRouter, Outlet } from "react-router-dom";

import App from '../App'
import Home from '../pages/Home'
import Events from '../pages/Events'
import Gallery from '../pages/Gallery'
import LeaderBoard from '../pages/Leader Board'
import ContactUs from '../pages/ContactUs'
import TableSection from '../pages/Leader Board/TableSection'
import RootSection from '../pages/Leader Board/RootSection'
import Residence from '../pages/Residence'
import ResidenceItem from '../pages/Residence/ResidenceItem'
import Users from '../pages/Users'
import ProfileSection from '../pages/Users/ProfileSection'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import EditSection from "../pages/Users/ProfileSection/EditSection";
import Teams from '../pages/Teams'
import CreateTeamSection from '../pages/Teams/CreateTeamSection'
import TeamPageSection from '../pages/Teams/TeamPageSection'
import Matches from '../pages/Matches'
import CreateMatchSection from '../pages/Matches/CreateMatchSection'
import Error from '../pages/Error'
import MatchPageSection from "../pages/Matches/MatchPageSection";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <App><Error /></App>,
        children: [
            {
                index: true,
                element: <Home />,
                errorElement: <Error />,
            },
            {
                path: '/gallery',
                element: <Gallery />
            },
            {
                path: '/events',
                element: <Events />
            },
            {
                path: '/leaderboard',
                element: <LeaderBoard />,
                children: [
                    {
                        index: true,
                        element: <RootSection />
                    },
                    {
                        path: '/leaderboard/:event',
                        element: <TableSection />
                    }
                ]
            },
            {
                path: '/contactUs',
                element: <ContactUs />
            },
            {
                path: '/residence',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Residence />
                    },
                    {
                        path: ':residence',
                        element: <ResidenceItem />
                    }
                ]
            },
            {
                path: '/users',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Users />
                    },
                    {
                        path: ':user',
                        element: <Outlet />,
                        children: [
                            {
                                index: true,
                                element: <ProfileSection />
                            },
                            {
                                path: 'edit',
                                element: <EditSection />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/teams',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Teams />
                    },
                    {
                        path: 'create',
                        element: <CreateTeamSection />
                    },
                    {
                        path: ':team',
                        element: <TeamPageSection />
                    }
                ]
            },
            {
                path: '/matches',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Matches />
                    },
                    {
                        path: 'create',
                        element: <CreateMatchSection />
                    },
                    {
                        path: ':matchId',
                        element: <MatchPageSection />
                    }
                ]
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/signin',
                element: <Signin />
            },
        ],
    },
]);

export default router;