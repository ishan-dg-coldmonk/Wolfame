import React, { Fragment, useContext, useState } from 'react'
import { Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import TextField from "@mui/material/TextField";
import PasswordInput from '../../UI/PasswordInput';
import { useFormik } from 'formik'
import { signUpSchema } from '../../schemas/auth';
import axios from '../../services/axiosinstance';
import AuthBox from '../../UI/AuthBox';
import './index.css'
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import resedenceList from '../../data/residence'

const SignUpForm = (props) => {
    const initialValues = {
        name: "",
        phone_number: "",
        residence: "",
        password: "",
        confirm_password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                action.setSubmitting(true)
                try {
                    const user_data = { ...values }
                    delete user_data.confirm_password
                    await props.onSubmit(user_data)
                }
                catch (e) {
                    if (e.response?.status === 406) {
                        action.setErrors(e.response.data)
                    }
                }
                action.setSubmitting(false)
            },
        });

    const footer = (
        <Typography>
            Already have an account? <Link to='/signin' style={{ textDecoration: 'none', color: 'red' }}>Sign In</Link>
        </Typography>
    )

    return (
        <AuthBox title='Sign Up' onSubmit={handleSubmit} footer={footer} isSubmitting={isSubmitting}>
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
            <PasswordInput
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
            />
            {errors.password && touched.password && (
                <Typography color='error'>
                    {errors.password}
                </Typography>
            )}
            <PasswordInput
                required
                fullWidth
                id="confirm_password"
                label="Confirm Password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirm_password && touched.confirm_password}
            />
            {errors.confirm_password && touched.confirm_password && (
                <Typography color='error'>
                    {errors.confirm_password}
                </Typography>
            )}
        </AuthBox>
    )
}

const Signup = (props) => {
    const { signin } = useContext(AuthContext)

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [snackBarMessage, setSnackBarMessage] = useState({})

    const signUpHandler = async (values) => {
        try {
            const { data } = await axios.post('user/signup', values)
            signin(data.user, data.token)
            if (searchParams.has('next')) {
                navigate(decodeURIComponent(searchParams.get('next')))
            }
            else {
                navigate('/')
            }
        }
        catch (e) {
            const msg = e?.response?.data?.msg || 'Signup failed. Please try again.'
            setSnackBarMessage({ color: 'error', msg })
        }
    }

    const handleClose = () => {
        setSnackBarMessage({})
    }

    return (
        <Fragment>
            <SignUpForm onSubmit={signUpHandler} />
            <Snackbar
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={Boolean(snackBarMessage.msg)}
                onClose={handleClose}
                message={snackBarMessage}
            >
                <Alert onClose={handleClose} severity={snackBarMessage.color} sx={{ width: '100%' }}>
                    {snackBarMessage.msg}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default Signup