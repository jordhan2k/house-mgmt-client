import { Box, styled, useMediaQuery } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Common/Sidebar';
import SidePanel from '../components/Common/SidePanel';
import TopBar from '../components/Common/TopBar';
import Dashboard, { ContentWrapper } from './Dashboard';
import Users from './Users';

const Container = styled(Box)(props => ({
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box"

}));

const MainPanel = styled('div')(props => ({
    marginLeft: 70,
    width: "calc(100vw - 70px)",
    height: "100%",
}));

export const appRoutes = {
    dashboard: "dashboard",
    search: "search",
    settings: "settings",
    users: "users"

}

const ProtectedRoute = ({ appRoute }) => {
    const match800 = useMediaQuery('(min-width: 800px)');

    const { isAuthenticated, user } = useSelector(state => state.auth);

    let body;
    if (appRoute === appRoutes.dashboard) body = <Dashboard />;
    if (appRoute === appRoutes.users) body = <Users />



    return (isAuthenticated && user) ? (
        <Container>
            <Sidebar />

            <MainPanel className="main-panel">
                <TopBar />
                <ContentWrapper>
                    {body}

                    {match800 && <SidePanel />}
                </ContentWrapper>

            </MainPanel>
        </Container>
    ) : (<Navigate replace to="/login" />)
}

export default ProtectedRoute;
