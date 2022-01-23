import { Grid, Paper, styled, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { colors } from '../../utils/constants';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useDispatch } from 'react-redux';
import { deleteItemRequest } from '../../redux/actions/houseItemActions';
import { openEditPanel } from '../../redux/actions/helperActions';
import DetailPanel from './DetailPanel';
import { useLocation, useParams } from 'react-router-dom';
import { isAuthorized } from '../../utils/helpers';

const ItemContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    width: 170,
    color: theme.palette.text.secondary,
    padding: 0,
    overflow: "hidden"
}));

const ItemImageContainer = styled(Box)(props => ({
    width: 170,
    height: 170,
    position: "relative"
}));

const ItemImage = styled('img')(props => ({
    width: 170,
    height: 170,
    objectFit: "cover"
}));

const ActionContainer = styled('Box')(props => ({
    width: 170,
    height: 170,
    backgroundColor: "rgba(255, 255, 255, .2)",
    position: "absolute",
    top: 0,
    left: 0,
    backdropFilter: "blur(2px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
}));

const BriefInfoBox = styled(Box)(props => ({
    width: "100%",
    padding: 5,
    boxSizing: "border-box"
}));

const ItemName = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontSize: 14,
    color: colors.secondaryDarkBlue,
    fontWeight: 600,
    textOverflow: "ellipsis"
}));

const Function = styled(Box)(props => ({
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 500,
    padding: "2px 4px",
    border: ".5px solid rgba(0,0,0,.2)",
    display: "inline-block",
    borderRadius: 10,
    margin: "5px 0"
}));

const Location = styled(Typography)(props => ({
    fontStyle: "italic",
    fontSize: 12,
    fontWeight: 500,
}));

const IconContainer = styled(Box)(props => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, .2)",
    cursor: "pointer",
    "& > svg": {
        fill: colors.secondaryDarkBlue
    },
    "&:hover": {
        boxShadow: "0 0 3px 1px rgba(0, 0, 0, .5)"
    }
}))

const ItemCard = ({ item, xs }) => {
    const match600 = useMediaQuery('(min-width:600px)');
    const match1100 = useMediaQuery('(min-width: 1100px)');
    const match900 = useMediaQuery('(min-width: 900px)');

    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const imagePrefix = useSelector(state => state.house.imagePrefix);
    const [showActions, setShowActions] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this item?")) dispatch(deleteItemRequest(item));
    }

    return (
        <Grid item xs={match900 ? (!match1100 && match600 ? 4 : 3) : 6} display="flex" justifyContent="center">
            <ItemContainer
                elevation={2}>
                <ItemImageContainer
                    onMouseOver={() => setShowActions(true)}
                    onMouseLeave={() => setShowActions(false)}>

                    <ItemImage src={`${imagePrefix}${item.image}`} />

                    {showActions && <ActionContainer>
                        <IconContainer title="See details" onClick={() => setShowDetails(true)}>
                            <RemoveRedEyeRoundedIcon />
                        </IconContainer>

                        {isAuthorized(location, params, user)
                            && <>
                                <IconContainer title="Update item" onClick={() => dispatch(openEditPanel(item))}>
                                    <EditRoundedIcon />
                                </IconContainer>
                                <IconContainer title="Delete item" onClick={handleDelete}>
                                    <DeleteOutlineRoundedIcon />
                                </IconContainer>
                            </>}
                    </ActionContainer>}
                </ItemImageContainer>

                <BriefInfoBox>
                    <ItemName>{item.name}</ItemName>
                    <Function>{item.itemFunction}</Function>
                    <Location>Located at {item.location}</Location>
                </BriefInfoBox>
            </ItemContainer>
            <DetailPanel show={showDetails} onClose={() => setShowDetails(false)} item={item} imageSrc={imagePrefix + item.image} />
        </Grid>
    );
};

export default ItemCard;
