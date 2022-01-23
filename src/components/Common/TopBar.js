import { Box, Divider, styled, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import duck from '../../assets/images/duck.png';
import search from '../../assets/images/search-interface-symbol.png';
import { colors } from '../../utils/constants';
import NotificationPanel from './NotificationPanel';
import { useLocation, useParams } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { searchUsersRequest } from '../../redux/actions/helperActions';
import { match } from '../../utils/helpers';

const Container = styled(Box)(props => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    justifyContent: "space-between",
    boxSizing: "border-box",
    boxShadow: "0 1px 5px 1px rgba(0, 0, 0, .05)"
}));

const Side = styled(Box)(props => ({
    display: "flex",
    alignItems: "center",
    position: "relative"
}));

export const WelcomeText = styled(Typography)(props => ({
    textTransform: "uppercase",
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 2,
    marginRight: 20,
    color: colors.primaryBlue,
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
}));

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

const ResultPanel = styled(Box)(props => ({
    position: "absolute",
    boxShadow: "0 0 4px 2px rgba(0, 0, 0, .2)",
    width: 300,
    maxHeight: 500,
    backgroundColor: "white",
    top: 60,
    zIndex: 4,
    borderRadius: 10,
    padding: 10,
    color: colors.secondaryDarkBlue
}));

const TopBar = () => {
    const [keyword, setKeyword] = useState("");
    const [context, setContext] = useState("");
    const [result, setResult] = useState([]);
    const location = useLocation();
    const match800 = useMediaQuery("(min-width: 800px)");

    const { myHouse, currentGuestHouse } = useSelector(state => state.house);

    const dispatch = useDispatch();

    useEffect(() => {
        setContext(location.pathname.split("/")[1]);
    }, [location]);

    const { username } = useSelector(state => state.auth.user);

    const handleInputChange = event => {
        const newKeyword = event.target.value.toLowerCase();
        setKeyword(newKeyword);
        if (context === "dashboard" && myHouse && newKeyword.length >= 1) {
            const list = myHouse.items.filter(item => match(item, newKeyword) && item);
            setResult(list);
        }
        if (context === "users" && currentGuestHouse && newKeyword.length >= 1) {
            const list = currentGuestHouse.items.filter(item => match(item, newKeyword) && item);
            setResult(list);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (context === "search" && keyword.length > 0) {
            dispatch(searchUsersRequest(keyword));
            setKeyword("");
        }
    }

    return (
        <Container>
            <Side component="form" onSubmit={handleSubmit}>
                {match800 && <WelcomeText show={match800}>Welcome to my house</WelcomeText>}
                <SearchContainer>
                    <Icon src={search} />
                    <SearchInput
                        autoComplete="off"
                        name="keyword"
                        value={keyword}
                        onChange={handleInputChange}
                        placeholder='Search...' />
                    {keyword && <Box sx={{ cursor: "pointer" }} width={24} height={24} boxSizing="content-box" onClick={() => setKeyword("")}>
                        <CloseRoundedIcon sx={{ fill: "rgba(0, 0, 0, .3)", cursor: "pointer" }} />
                    </Box>}

                    {(keyword.length > 0 && context !== "search") && <ResultPanel>
                        <Typography style={{ fontFamily: "inherit", fontWeight: 500 }} variant="body1">Showing results for: {keyword}</Typography>
                        <Divider />
                        {result.map(item => (
                            <Box
                                display="flex"
                                width="100%"
                                padding="5px"
                                justifyContent="space-between"
                                boxSizing="border-box"
                                sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,.1)", cursor: "pointer" } }}
                            >
                                <Typography variant="body2" fontFamily="inherit" >{item.name}</Typography>
                                <Typography variant="body2" fontFamily="inherit" fontStyle="italic">{item.location}</Typography>
                            </Box>
                        ))}
                    </ResultPanel>}
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

