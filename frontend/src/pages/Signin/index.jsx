import React, { Fragment, useContext, useState } from 'react'
import { Stack, Box, Typography, Paper, Avatar, Snackbar, Alert } from '@mui/material'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PasswordInput from '../../UI/PasswordInput';
import { useFormik } from 'formik'
import { signInSchema, validateUsername, validateEmail } from '../../schemas/auth';
import axios from '../../services/axiosinstance';
import AuthBox from '../../UI/AuthBox';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Signin = (props) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { signin } = useContext(AuthContext)

    const signInHandler = async (values) => {
        try {
            const { data } = await axios.post('user/signin', values)
            signin(data.user, data.token)
            if (searchParams.has('next')) {
                navigate(decodeURIComponent(searchParams.get('next')))
            }
            else {
                navigate('/')
            }
            // setAuthValues(values)
        }
        catch (e) {
            throw e;
        }
    }

    const initialValues = {
        name: "",
        password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, status } =
        useFormik({
            initialValues,
            validationSchema: signInSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                try {
                    await signInHandler(values)
                    action.resetForm();
                }
                catch (e) {
                    action.setStatus(e.response.data.msg || 'Unknown error occured')
                }

            },
        });

    // console.log(values, errors)

    const footer = (
        <Typography>
            Don't have an account? <Link to='/signup' style={{ textDecoration: 'none', color: 'red' }}>Sign Up</Link>
        </Typography>
    )

    return (
        <AuthBox title='Sign In' onSubmit={handleSubmit} footer={footer}>
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
            {status && (
                <Typography color='error'>
                    {status}
                </Typography>
            )}
        </AuthBox>
    )
}

export default Signin