import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import { useNavigate } from 'react-router'
import ProfileImage from '../../../UI/ProfileImage'

import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { useImageInput } from '../../../hooks/useImageInput'
import { uploadMedia } from '../../../services/uploadMedia'

import { Stack, Button, Typography, MenuItem, Select, InputLabel, FormControl, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material'

import { useFormik } from 'formik'
import { updateSchema } from '../../../schemas/auth';
import axios from '../../../services/axiosinstance';
import resedenceList from '../../../data/residence'
import useUserProfile from '../../../hooks/useUserProfile';

export default function EditSection() {

    const navigate = useNavigate()
    const { userProfile, isMe } = useUserProfile()

    const { signin } = useContext(AuthContext)

    const options = {
        multiple: false,
        accept: 'image/*'
    }

    const { file, onClick, inputProps } = useImageInput(options)

    const updateUserData = async (userData) => {
        try {
            console.log(userData)
            const { data } = await axios.patch('/user', userData)
            signin(data.user, data.token)
            navigate('../')
        }
        catch (e) {
            console.log(e)
        }

    }

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmitPassword = async () => {
        setPasswordError('');
        setPasswordSuccess('');
        try {
            const { data } = await axios.patch('/user/change-password', passwordData);
            setPasswordSuccess(data.message);
            setTimeout(() => {
                setOpenPasswordDialog(false);
                setPasswordData({ currentPassword: '', newPassword: '' });
                setPasswordSuccess('');
            }, 1000);
        } catch (e) {
            setPasswordError(e.response?.data?.error || 'Failed to update password');
        }
    };

    const initialValues = {
        name: "",
        image: "",
        email: "",
        residence: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setValues, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: updateSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                try {
                    const user_data = { ...values }
                    delete user_data.isMe
                    // await props.onSubmit(user_data)
                    await updateUserData(user_data)
                    // action.resetForm();
                }
                catch (e) {
                    if (e.response?.status === 406) {
                        action.setErrors(e.response.data)
                    }
                }
            },
        });

    useEffect(() => {
        if (userProfile) {
            setValues(userProfile)
        }
    }, [userProfile, setValues])

    useEffect(() => {
        if (!file) return;
        uploadMedia(file).then((path) => {
            // setImageLink(path)
            setFieldValue('image', path)
        })
    }, [file, setFieldValue])

    if (!isMe) {
        return <Typography>
            Don't have access to edit someone else's profile.
        </Typography>
    }

    return (
        <Stack gap={4} m={4} mt={12} mb={6}>
            <Typography variant='h3' fontFamily={"'Nosifer', sans-serif"} fontSize={{ xs: '2rem', sm: '3rem' }} sx={{ textAlign: 'center' }} >
                <span className="text-gradient">Edit Profile</span>
            </Typography>
            <Stack gap={2} direction={{ xs: 'column', md: 'row' }} >
                <Stack gap={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ProfileImage image={values?.image} />
                    <input style={{ display: 'none' }} {...inputProps} />
                    <Button type='file' variant='contained' size='large' fullWidth onClick={onClick} startIcon={<CameraAltIcon />}>Edit Avatar</Button>
                    <Button variant='outlined' size='large' fullWidth onClick={() => setOpenPasswordDialog(true)}>Change Password</Button>
                </Stack>
                <Stack component="form" onSubmit={handleSubmit} px={{ xs: 0, md: 10 }} gap={1} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name && touched.name}
                        autoFocus
                    />
                    {errors.name && touched.name && (
                        <Typography color='error'>
                            {errors.name}
                        </Typography>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phone_number"
                        label="Phone Number"
                        name="phone_number"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phone_number && touched.phone_number}
                    />
                    {errors.phone_number && touched.phone_number && (
                        <Typography color='error'>
                            {errors.phone_number}
                        </Typography>
                    )}

                    <FormControl fullWidth>
                        <InputLabel id="residence-label">Residence</InputLabel>
                        <Select
                            labelId='residence-label'
                            id="residence"
                            fullWidth
                            defaultValue={'Select Residence'}
                            value={values.residence}
                            label="Residence"
                            name='residence'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.residence && touched.residence}
                        >
                            {resedenceList.map(({ name }) => {
                                return <MenuItem key={name} value={name}>{name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    {errors.residence && touched.residence && (
                        <Typography color='error'>
                            {errors.residence}
                        </Typography>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email}
                    />
                    {errors.email && touched.email && (
                        <Typography color='error'>
                            {errors.email}
                        </Typography>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="linkedin"
                        label="Linkedin"
                        name="linkedin"
                        value={values.linkedin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.linkedin && touched.linkedin}
                    />

                    <Stack gap={1} direction='row' sx={{ justifyContent: 'flex-end' }}>
                        <Button variant='contained' size='large' type='submit'>
                            Update
                        </Button>
                        <Button size='large' onClick={() => navigate('../')}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

            <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <Stack gap={2} sx={{ mt: 1, minWidth: '300px' }}>
                        {passwordError && <Alert severity="error">{passwordError}</Alert>}
                        {passwordSuccess && <Alert severity="success">{passwordSuccess}</Alert>}
                        <TextField
                            label="Current Password"
                            type="password"
                            name="currentPassword"
                            fullWidth
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            name="newPassword"
                            fullWidth
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubmitPassword} variant="contained">Update Password</Button>
                </DialogActions>
            </Dialog>
        </Stack >
    )
}

