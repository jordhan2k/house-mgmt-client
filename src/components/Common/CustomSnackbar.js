import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../../redux/actions/helperActions';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CustomSnackbar = () => {
    const { show, message, severity } = useSelector(state => state.helper.snackbar);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackbar());
    };
    return (
        <Snackbar
            open={show}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{
                    width: '100%',
                    ".MuiSvgIcon-root, .MuiAlert-message": {
                        fill: "white",
                        color: "white"
                    }
                }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar
