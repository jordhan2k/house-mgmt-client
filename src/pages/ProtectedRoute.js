import { Box, styled } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Common/Sidebar';

const Container = styled(Box)(props => ({

}))

const ProtectedRoute = ({ appRoute }) => {

    const { isAuthenticated, user } = useSelector(state => state.auth);

 

    return (isAuthenticated && user) ? (
        <Container>
            <Sidebar />

        </Container>
    ) : (<Navigate replace to="/login" />)
}

export default ProtectedRoute;
