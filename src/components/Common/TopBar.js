import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import duck from '../../assets/images/duck.png';
import search from '../../assets/images/search-interface-symbol.png';
import { colors } from '../../utils/constants';
import NotificationPanel from './NotificationPanel';

const Container = styled(Box)(props => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    justifyContent: "space-between",
    boxSizing: "border-box",

}));

const Side = styled(Box)(props => ({
    display: "flex",
    alignItems: "center",
    position: "relative"
}));

const WelcomeText = styled(Typography)(props => ({
    textTransform: "uppercase",
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 2,
    marginRight: 20,
    color: colors.primaryBlue
}));

const SearchContainer = styled(Box)(props => ({
    display: "flex",
    alignItems: "center",
    padding: 7,
    border: "1px solid rgba(0,0,0,.1)",
    width: 350,
    borderRadius: 20
}));

const Icon = styled('img')(props => ({
    width: 20,
    height: 20,
    objectFit: 'contain',
    margin: "0 10px 0 5px",
}));

const SearchInput = styled('input')(props => ({
    outline: "none",
    border: "none",
    flex: 1,
    "::placehoder": {
        fontStyle: "italic"
    },
    backgroundColor: "transparent"
}))

const AvatarContainer = styled(Box)(props => ({
    height: 40,
    width: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryBlue
}));

const Avatar = styled('img')(props => ({
    height: 36,
    width: 36,
    objectFit: "contain",
}));

const Username = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontStyle: "italic",
    margin: "0 10px",
    fontSize: 14,
}));

const TopBar = () => {

    const { username } = useSelector(state => state.auth.user);

    return (
        <Container>
            <Side>
                <WelcomeText>Welcome to my house</WelcomeText>
                <SearchContainer>
                    <Icon src={search} />
                    <SearchInput placeholder='Search...' />
                </SearchContainer>
            </Side>
            <Side>
                <AvatarContainer>
                    <Avatar src={duck} />
                </AvatarContainer>
                <Username>{username}</Username>
                <NotificationPanel />
            </Side>
        </Container>
    )
}

export default TopBar

