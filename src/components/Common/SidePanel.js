import { Box, Divider, styled, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import { colors } from '../../utils/constants';

const Container = styled(Box)(props => ({
    flex: 3,
    height: "100%",
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
}))

const SidePanel = () => {
    const expireList = [];
    const { lastLogin } = useSelector(state => state.notification);
    const [date, onChange] = useState(new Date());

    let lastLoginString;
    if (lastLogin) {
        lastLoginString = `${moment(lastLogin.loginAt).fromNow()} on ${lastLogin.device}`;
    } else {
        lastLoginString = "Cannot find last login info";
    }

    return (
        <Container>
            <Calendar value={date} onChange={onChange} />

            <SecondaryHeading>
                Expire soon
            </SecondaryHeading>

            <ExpirePanel>
                {expireList.length > 0 ? "" : "No items expires soon :)"}

            </ExpirePanel>

            <SecondaryHeading>
                Last Login
            </SecondaryHeading>
            <Typography variant='body1' style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 500, fontStyle: "italic" }}>
                {lastLoginString}
            </Typography>
        </Container>
    )
}

export default SidePanel
