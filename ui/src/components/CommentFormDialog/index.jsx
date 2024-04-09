import PropTypes from 'prop-types';
import { useEffect } from 'react';

// mui imports
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

// third party
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object({
    body: Yup.string().required('A comment is required')
});

const CommentFormDialog = ({ featureId, open, handleClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { enqueueSnackbar } = useSnackbar();

    const resetForm = () => {
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            body: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await axios.post(`http://localhost:3000/api/features/${featureId}/comments`, { comment: values });
                enqueueSnackbar('Comment submitted successfully', { variant: 'success' });
                resetForm();
            } catch (error) {
                enqueueSnackbar('Failed to submit comment', { variant: 'error' });
            } finally {
                setSubmitting(false);
                handleClose();
            }
        }
    });

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Submit a Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        name="body"
                        label="Comment"
                        margin="dense"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.body && Boolean(formik.errors.body)}
                        helperText={formik.touched.body && formik.errors.body}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="contained" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

CommentFormDialog.propTypes = {
    featureId: PropTypes.string,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default CommentFormDialog;
