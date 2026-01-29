import React, { useContext } from 'react'
import { Typography } from '@mui/material'
import TextField from "@mui/material/TextField";
import PasswordInput from '../../UI/PasswordInput';
import { useFormik } from 'formik'
import { signInSchema } from '../../schemas/auth';
import axios from '../../services/axiosinstance';
import AuthBox from '../../UI/AuthBox';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Signin = (props) => {
    const navigate = useNavigate();
    const { signin } = useContext(AuthContext)

    const signInHandler = async (values) => {
        try {
            const signinData = await axios.post('user/signin', values)
            signin(signinData.data.user, signinData.data.token)
            navigate(`/users/${signinData.data.user._id}`)
        }
        catch (e) {
            throw e;
        }
    }

    const initialValues = {
        phone_number: "",
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
                }
                catch (e) {
                    action.setStatus(e?.response?.data?.msg || 'Unknown error occured')
                }
            },
        });


    const footer = (
        <Typography>
            Don't have an account? <Link to='/signup' style={{ textDecoration: 'none', color: 'red' }}>Sign Up</Link>
        </Typography>
    )

    return (
        <AuthBox title='Sign In' onSubmit={handleSubmit} footer={footer}>
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