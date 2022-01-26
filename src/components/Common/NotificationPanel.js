import { Badge, Box, Divider, styled, Typography } from '@mui/material';
import React, { useState } from 'react'
import { colors } from '../../utils/constants';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Scrollbars from 'react-custom-scrollbars';

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
    width: 360,
    height: 500,
    boxShadow: "0 0 8px 1px rgba(0, 0, 0, .3)",
    zIndex: 3,
    backgroundColor: "white",
    borderRadius: 10,
    boxSizing: "border-box",
    color: colors.secondaryDarkBlue,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 10
}));

const Heading = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 600,
    padding: 10
}));

const NotificationList = styled(Box)(props => ({
    flex: 1,
    padding: "10px 15px 10px 10px"
}));

const NotificationCard = styled(Box)(props => ({
    display: "flex",
    padding: 8,
    borderRadius: 10,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, .05)"
    }
}));

const Content = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500
}));

const Time = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 400,
    fontStyle: "italic"
}));

const NotificationPanel = ({ show }) => {
    const [showPanel, setShowPanel] = useState(false);
    const { notifications } = useSelector(state => state.notification)

    return (
        <NotificationBadge
            badgeContent={notifications && notifications.length}
            color="primary"
            max={99}
            style={{
                "& > span": {
                    color: "white"
                }
            }}
        >
            <Box onClick={() => setShowPanel(!showPanel)}>
                <NotificationsNoneOutlinedIcon />
            </Box>


            {showPanel && <Container>
                <Heading>
                    Notifications
                </Heading>
                <Divider />
                <Scrollbars style={{ height: 456 }}>
                    <NotificationList>
                        {notifications.length > 0 ?
                            notifications.map(item => (
                                <NotificationCard>
                                    <Box display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: (item.content.includes("commented") || item.content.includes("replied"))
                                                ? colors.primaryBlue
                                                : colors.primaryOrange,
                                            "& > svg": {
                                                fill: "white",
                                                fontSize: 20
                                            },
                                            marginRight: 1
                                        }}>
                                        {(item.content.includes("commented") || item.content.includes("replied")) && <ChatBubbleRoundedIcon />}
                                        {item.content.includes("liked") && <FavoriteRoundedIcon />}
                                    </Box>
                                    <Box style={{ flex: 1 }}>
                                        <Content>
                                            {item.content}
                                        </Content>
                                        <Time>{moment(item.createdAt).fromNow()}</Time>
                                    </Box>
                                </NotificationCard>
                            ))

                            : "There is no notification"}
                    </NotificationList>
                </Scrollbars>
            </Container>}

        </NotificationBadge>

    )
}

export default NotificationPanel
