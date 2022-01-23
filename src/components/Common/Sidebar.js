import { Box, styled } from '@mui/material';
import React from 'react'
import { colors } from '../../utils/constants';
import home from '../../assets/images/home.png';
import settings from '../../assets/images/settings.png';
import calendar from '../../assets/images/calendar.png';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { LogoutRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../redux/actions/authActions';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Link } from 'react-router-dom';


const Container = styled(Box)(props => ({
    position: "fixed",
    height: "100vh",
    backgroundColor: colors.primaryBlue,
    width: 70,
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}));


const IconContainer = styled(Box)(props => ({
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
}));

const Icon = styled('img')(props => ({
    height: 35,
    width: 35
}));

const Sidebar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log()
        if (window.confirm("Do you want to logout?")) {
            dispatch(logoutRequest());
        }
    }

    return (
        <Container>

            <IconContainer>
                <MenuRoundedIcon sx={{ fill: "white", fontSize: 40 }} />
            </IconContainer>


            <Link to="/dashboard" >
                <IconContainer>
                    <Icon src={home} />
                </IconContainer>
            </Link>

            <IconContainer>
                <Icon src={settings} />
            </IconContainer>

            <IconContainer>
                <Icon src={calendar} />
            </IconContainer>

            <Link to="/search/users" >
                <IconContainer>
                    <PeopleAltOutlinedIcon sx={{ fill: "white", fontSize: 40 }} />
                </IconContainer>
            </Link>

            <IconContainer style={{
                position: "absolute",
                bottom: 10,
            }}
                onClick={handleLogout}
            >
                <LogoutRounded sx={{ fill: "white", fontSize: 40 }} />
            </IconContainer>






        </Container>
    )
}

export default Sidebar
