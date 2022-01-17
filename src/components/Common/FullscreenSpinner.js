import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import loadingLottie from '../../assets/lottie/loading';
import { authStates } from '../../redux/reducers/authReducer';

const Container = styled(Box)({
    position: "fixed",
    top: 0,
    left: 0,
    // backdropFilter: "blur(3px)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "100vw",
    height: "100vh",
    zIndex: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"

});

const SpinnerBox = styled(Box)(props => ({
    width: 450,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    boxSizing: "border-box",
    transform: "translateY(-30px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}))

const FullscreenSpinner = () => {

    const { authState } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.helper.spinner);

    return authState === authStates.LOADING && (
        <Container >
            <SpinnerBox>
                <Lottie
                    options={{ animationData: loadingLottie }}
                    height={300}
                />
                <Typography
                    variant="body1"
                    style={{
                        fontFamily: "inherit",
                        fontWeight: 600
                    }} >
                    {message}
                </Typography>
            </SpinnerBox>
        </Container>
    )
}

export default FullscreenSpinner
