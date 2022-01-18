import { Badge, Box, Divider, styled, Typography } from '@mui/material';
import React, { useState } from 'react'
import { colors } from '../../utils/constants';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const NotificationBadge = styled(Badge)(props => ({
    margin: "0 5px",
    "& > span": {
        backgroundColor: colors.primaryBlue,
        color: colors.secondaryDarkBlue,
        fontFamily: "inherit"
    },
    cursor: "pointer"
}));

const Container = styled(Box)(props => ({
    top: 40,
    right: 15,
    position: "absolute",
    width: 350,
    height: 500,
    boxShadow: "0 0 8px 1px rgba(0, 0, 0, .3)",
    zIndex: 3,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    boxSizing: "border-box",
    color: colors.secondaryDarkBlue,
    display: "flex",
    flexDirection: "column"
}));

const Heading = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 600
}));

const NotificationList = styled(Box)(props => ({
    flex: 1

}));

const NotificationPanel = ({ show }) => {
    const [showPanel, setShowPanel] = useState(false);
    const notificationList = [];

    return (
        <NotificationBadge
            badgeContent={notificationList && notificationList.length}
            color="primary"
            max={99}
            onClick={() => setShowPanel(!showPanel)}
        >
            <NotificationsNoneOutlinedIcon />

            {showPanel && <Container>
                <Heading>
                    Notifications
                </Heading>
                <Divider />
                <NotificationList>
                    {notificationList.length > 0 ? "" : "There is no notification"}
                </NotificationList>
            </Container>}

        </NotificationBadge>

    )
}

export default NotificationPanel
