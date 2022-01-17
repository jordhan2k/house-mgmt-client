import { Box, styled, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import { colors } from '../utils/constants'
import artwork from '../assets/images/isometric-office.gif'
import hi from '../assets/images/hi.png'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled(Box)(props => ({
    display: "flex",
    flexWrap: "wrap",
    width: "100vw",
    height: "100vh",
    padding: !props.matches && "20px",
    boxSizing: "border-box",
    justifyContent: !props.matches && "center",
    position: !props.matches && "relative"
}));

const ArtworkPanel = styled(Box)(props => ({
    flex: 7,
    minWidth: props.matches && 360,
    display: props.matches && "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: !props.matches && "absolute",
    zIndex: -1
}));

const WelcomeSlogan = styled(Typography)(props => ({
    fontFamily: "inherit",
    textTransform: "uppercase",
    fontWeight: 700,
    display: !props.matches && "none"
}));

const Artwork = styled('img')(props => ({
    height: props.matches ? "75vh" : "90vh",
    objectFit: "cover",


}));

const FormPanel = styled(Box)(props => ({
    flex: 6,
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.primaryBlue,
    minWidth: 420,
    boxShadow: !props.matches && "0 0 5px 2px rgba(0, 0, 0, .2)",
    borderRadius: !props.matches && 10,
    maxWidth: !props.matches && 400,
    minHeight: !props.matches && 600,

}));

const FormWrapper = styled(Box)(props => ({
    width: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "100%",
    padding: "0 20px",
}))


const FormHeader = styled(Box)(props => ({
    flex: 3,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column"

}));

const FormHeaderTypo = styled(Typography)(props => ({
    fontSize: 50,
    fontWeight: 700,
    color: "white",
    fontFamily: "inherit",
    verticalAlign: "middle",
    letterSpacing: 3,
    textTransform: "uppercase",
}));

export const FormContainer = styled(Box)(props => ({
    flex: 6,
    width: "100%",
    display: "flex",
    flexDirection: "column"
}));

export const FormBody = styled(Box)(props => ({
    flex: 4,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box"
}));

export const ErrorMessage = styled(Typography)(props => ({
    fontWeight: 400,
    fontSize: 14,
    fontFamily: "inherit",
    color: "red",
    boxSizing: "border-box"
}))

export const FormFooter = styled(Box)(props => ({
    flex: 2,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%"
}));

export const AuthButton = styled('button')(props => ({
    padding: "5px 10px",
    width: 150,
    fontWeight: 700,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: !props.active ? "white" : colors.primaryYellow,
    borderRadius: 20,
    textTransform: "uppercase",
    fontSize: 20,
    backgroundColor: props.active ? colors.primaryYellow : "transparent",
    cursor: "pointer",
    color: "white"
}));

const Auth = ({ authRoute }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const matches = useMediaQuery('(min-width:750px)');

    let authForm = (
        <>
            {authRoute === "login" && <LoginForm />}
            {authRoute === "register" && <RegisterForm />}
        </>
    )

    return (!isAuthenticated || !user) ? (
        <Container matches={matches}>

            <ArtworkPanel matches={matches} >
                <WelcomeSlogan
                    matches={matches}
                    style={{ fontSize: 35, letterSpacing: 3, color: colors.primaryBlue }}>Welcome to</WelcomeSlogan>
                <WelcomeSlogan
                    matches={matches}
                    style={{ fontSize: 23, color: colors.primaryOrange }}>new product team</WelcomeSlogan>
                <Artwork src={artwork} matches={matches} />
            </ArtworkPanel>

            <FormPanel matches={matches}>
                <FormWrapper id="form-wrapper">
                    <FormHeader>
                        <Box display="flex" flexDirection="column">
                            <Box display="flex" alignItems="center">
                                <FormHeaderTypo sx={{ mr: 3 }}>
                                    {authRoute === "login" && "Login"}
                                    {authRoute === "register" && "Sign-up"}
                                </FormHeaderTypo>
                                <img src={hi} style={{ width: 80 }} alt="Hi" />
                            </Box>
                            <FormHeaderTypo sx={{ textAlign: "end" }}>Here!</FormHeaderTypo>
                        </Box>
                    </FormHeader>

                    {authForm}

                </FormWrapper>
            </FormPanel>
        </Container>
    ) : (<Navigate replace to="/dashboard" />)
}

export default Auth
