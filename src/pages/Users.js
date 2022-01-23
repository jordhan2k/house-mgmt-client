import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import SidePanel from '../components/Common/SidePanel';
import { ContentPanel, ContentWrapper } from './Dashboard';
import avatar from '../assets/images/duck.png';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { colors } from '../utils/constants';

const UserCard = styled(Box)(props => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 10,
  borderRadius: 10,
  boxShadow: "0 0 8px 1px rgba(0, 0, 0, .1)",
  marginBottom: 10,
  cursor: "pointer"
}));

const AvatarContainer = styled(Box)(props => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  overflow: "hidden",
  border: "1px solid rgba(0, 0, 0, .1)",
  marginRight: 20
}));

export const Username = styled(Typography)(props => ({
  fontFamily: "inherit",
  fontWeight: 600,
  fontSize: 15

}));

const Image = styled('img')(props => ({
  width: 40,
  height: 40,
  objectFit: "contain"
}));

const FoundText = styled(Typography)(props => ({
  fontFamily: "inherit",
  fontWeight: 600,
  marginBottom: 10
}));


const Users = () => {

  const { found, results, keyword } = useSelector(state => state.helper.search);

  return (
    <ContentPanel style={{ padding: 15, overflowY: "scroll" }}>

      {found !== "" && (
        found > 0 ?
          (<>
            <FoundText>Found {results.length > 0 ? results.length : "0"} results for keyword "{keyword}"</FoundText>
            {results.map(user => (
              <Link to={`/users/${user._id}/house/${user.houses[0]}`} style={{ textDecoration: "none", color: colors.secondaryDarkBlue }}>
                <UserCard sx={{
                  "&:hover > div": {
                    opacity: 1
                  }
                }}>
                  <Box display="flex">
                    <AvatarContainer>
                      <Image src={avatar} />
                    </AvatarContainer>
                    <Box display="flex" flexDirection="column">
                      <Username>{user.username}</Username>
                      <Typography variant="body2" fontFamily="inherit" fontSize={12} fontStyle="italic" justifyContent="space-between">
                        Joined {moment(user.createdAt).fromNow()}
                      </Typography>
                    </Box>

                  </Box>
                  <ChevronRightRoundedIcon sx={{ fill: "rgba(0, 0, 0, .2)" }} />
                </UserCard>
              </Link>

            ))}
          </>) :
          <FoundText>Found no results for keyword "{keyword}"</FoundText>
      )}
    </ContentPanel>)
};

export default Users;
