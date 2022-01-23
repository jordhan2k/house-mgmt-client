import { Box, Divider, styled, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import { colors } from '../../utils/constants';
import { useLocation, useParams } from 'react-router-dom'
import { expiresSoon, isAuthorized } from '../../utils/helpers';
import duck from '../../assets/images/duck2.jpg';

const Container = styled(Box)(props => ({
    flex: 3,
    height: "calc(100vh-60px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    boxSizing: "border-box",
    paddingBottom: 20,
    color: colors.secondaryDarkBlue
}));

const SecondaryHeading = styled(Typography)(props => ({
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "inherit",
    color: colors.secondaryDarkBlue,
    margin: "10px 0"
}));

const ExpirePanel = styled(Box)(props => ({
    width: "100%",
    flex: 1,
    textAlign: "center"
}));

const AvatarContainer = styled(Box)(props => ({
    padding: 20
}));

const Avatar = styled('img')(props => ({
    width: 100,
    height: 100,
    objectFit: "contain",
    borderRadius: 50,
    boxShadow: `0 0 0 2px ${colors.primaryBlue}`

}));

const SidePanel = () => {
    const [expireList, setExpireList] = useState([]);
    const { lastLogin } = useSelector(state => state.notification);
    const [date, onChange] = useState(new Date());
    const user = useSelector(state => state.auth.user);
    const { myHouse, currentGuestHouse, currentGuest } = useSelector(state => state.house);

    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        if (myHouse && location.pathname.split("/")[1] === "dashboard") {
            const newList = myHouse.items.filter(item => expiresSoon(item) && item);
            setExpireList(newList);
        }
    }, [myHouse?.items]);

    let body;
    if (isAuthorized(location, params, user) || location.pathname === "/search/users") {
        body = (<>
            <Calendar value={date} onChange={onChange} />
            <SecondaryHeading>
                Expire soon {expireList.length > 0 && `(${expireList.length} items)`}
            </SecondaryHeading>
            <ExpirePanel>
                {expireList.length > 0 ?
                    expireList.map(item => (
                        <Box display="flex" padding="5px 0">
                            <Typography style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 500, flex: 1, textAlign: "left" }}>
                                {item.name}
                            </Typography>
                            <Typography style={{ fontFamily: "inherit", fontSize: 14 }}>
                                {moment(item.expireDate).format("YYYY-MM-DD")}
                            </Typography>
                        </Box>
                    ))
                    : "No items expires soon :)"}

            </ExpirePanel>

            <SecondaryHeading>
                Last Login
            </SecondaryHeading>
            <Typography variant='body1' style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 500, fontStyle: "italic" }}>
                {lastLogin ? `${moment(lastLogin.loginAt).fromNow()} on ${lastLogin.device}` : "Fetching your history..."}
            </Typography>
        </>)
    } else {
        body = currentGuest && <>
            <AvatarContainer>
                <Avatar src={duck} />
            </AvatarContainer>

            <Box textAlign="center">
                <Typography fontWeight={600} fontFamily="inherit" flex={1}>{currentGuest.username}</Typography>
                <Typography fontSize={14} fontFamily="inherit" flex={1} fontStyle="italic">Joined {moment(currentGuest.createdAt).fromNow()}</Typography>
            </Box>

        </>
    }




    return (
        <Container>
            {body}
        </Container>
    )
}

export default SidePanel
