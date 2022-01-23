import { Box, Dialog, Divider, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ActionButton } from '../../pages/Dashboard';
import { colors, panelModes } from '../../utils/constants';
import defaultImg from '../../assets/images/default.jpg';
import PanelInput from './PanelInput';
import { WelcomeText } from '../Common/TopBar';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useDispatch, useSelector } from 'react-redux';
import { createItemRequest, updateItemRequest } from '../../redux/actions/houseItemActions';
import { closeAddEditPanel } from '../../redux/actions/helperActions';
import moment from 'moment';

const ImageContainer = styled(Box)(props => ({
    width: 230,
    height: 230,
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, .1)",
    padding: 0,
    marginBottom: 10
}));

const Image = styled('img')(props => ({
    width: 230,
    height: 230,
    objectFit: "cover"
}));

const IconContainer = styled(Box)(props => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    boxShadow: "0 0 2px 1px rgba(0, 0, 0, .2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"

}));

const AddEditItemPanel = () => {
    const { show, mode, currentItem } = useSelector(state => state.helper.addEditPanel);
    const { imagePrefix } = useSelector(state => state.house);
    const dispatch = useDispatch();

    const initialItem = {
        name: "",
        expireDate: "",
        purchaseDate: "",
        location: "",
        itemFunction: "",
        price: "",
        itemCode: "",
    };


    const currentHouseId = useSelector(state => state.auth.user.houses[0]);
    const [item, setItem] = useState(initialItem);
    const [image, setImage] = useState(currentItem ? `${imagePrefix}${currentItem.image}` : "");
    const [file, setFile] = useState();
    const { name, expireDate, purchaseDate, location, itemFunction, price, itemCode } = item;


    useEffect(() => {
        if (mode === panelModes.edit) {
            setItem({
                ...currentItem,
                expireDate: moment(currentItem.expireDate).format("yyyy-MM-DD"),
                purchaseDate: moment(currentItem.purchaseDate).format("yyyy-MM-DD")
            })
        }
    }, [mode, currentItem])

    const handleNonFileInputChange = event => {
        setItem(prevStates => ({
            ...prevStates,
            [event.target.name]: event.target.value
        }));
    };

    const handleFileChange = event => {
        setFile(event.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = e => {
            setImage(e.target.result);
            console.log(e.target.result)
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = new FormData();

        if (mode === panelModes.add && !file) {
            alert("Please add an image!");
        }

        if (file) {
            form.append("file", file);
        }

        form.append("name", name);
        form.append("expireDate", expireDate);
        form.append("purchaseDate", purchaseDate);
        form.append("location", location);
        form.append("itemFunction", itemFunction);
        form.append("itemCode", itemCode);
        form.append("price", price);
        form.append("house", currentHouseId);

        if (mode === panelModes.add) {
            dispatch(createItemRequest(form));
        }
        if (mode === panelModes.edit) {
            console.log(currentItem._id);
            form.append("_id", currentItem._id)
            dispatch(updateItemRequest(currentItem._id, form));
        }
        handleClose();
    }

    const handleClose = () => {
        setItem(initialItem);
        dispatch(closeAddEditPanel());
    }

    const triggerChooseFile = () => {
        const fileInput = document.getElementsByName("imageFile");
        fileInput[0].click();
    }

    return (
        <Dialog open={true} onClose={handleClose} >
            <Box
                display="flex"
                flexDirection="column"
                style={{ padding: 20, borderRadius: 10, boxSizing: "content-box" }}
                component="form"
                onSubmit={handleSubmit}
                encType="multipart/form-data">
                <WelcomeText>{mode === panelModes.add ? "Add new" : "Update"} item</WelcomeText>
                <Divider />
                <Box display="flex" padding="10px 0">
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexWrap="wrap"
                        justifyContent="space-between"
                        paddingRight={2} >
                        <PanelInput required label="Name *" name="name" value={name} onChange={handleNonFileInputChange} />
                        <PanelInput required label="Expire date *" name="expireDate" type="date" value={expireDate} onChange={handleNonFileInputChange} />
                        <PanelInput label="Purchase date" name="purchaseDate" type="date" value={purchaseDate} onChange={handleNonFileInputChange} />
                        <PanelInput required label="Location *" name="location" value={location} onChange={handleNonFileInputChange} />
                        <PanelInput label="item code" name="itemCode" value={itemCode} onChange={handleNonFileInputChange} />
                        <PanelInput required label="function *" name="itemFunction" value={itemFunction} onChange={handleNonFileInputChange} />
                        <PanelInput label="price (VND)" name="price" type="number" min={0} value={price} onChange={handleNonFileInputChange} />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <ImageContainer>
                            <Image src={image ? image : defaultImg} />
                        </ImageContainer>
                        <IconContainer onClick={triggerChooseFile}>
                            <FileUploadRoundedIcon style={{ fill: colors.secondaryDarkBlue }} />
                        </IconContainer>
                        <input
                            name="imageFile"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Box>
                </Box>
                <Divider style={{ margin: "10px 0" }} />
                <Box
                    display="flex"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between">
                    <ActionButton bg="white" color={colors.secondaryDarkBlue} onClick={handleClose}>Cancel</ActionButton>
                    <ActionButton type="submit" bg={colors.primaryBlue}>{mode === panelModes.add ? "Create new item" : "Update"}</ActionButton>
                </Box>
            </Box>
        </Dialog>
    )
}

export default AddEditItemPanel
