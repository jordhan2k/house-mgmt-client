import { Box, styled } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Common/Sidebar';
import Dashboard from './Dashboard';

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
}

const ProtectedRoute = ({ appRoute }) => {

    const { isAuthenticated, user } = useSelector(state => state.auth);

    let body;
    if (appRoute === appRoutes.dashboard) body = <Dashboard />;



    return (isAuthenticated && user) ? (
        <Container>
            <Sidebar />
            <MainPanel className="main-panel">
                {body}
            </MainPanel>
        </Container>
    ) : (<Navigate replace to="/login" />)
}

export default ProtectedRoute;
