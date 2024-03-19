import * as Yup from "yup";

const passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const signUpSchema = Yup.object({
    name: Yup.string().required("Please enter your name").min(3, 'Name is too short').max(35, 'Name is too big'),
    phone_number: Yup.string().required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid'),
    residence: Yup.string().required("Please select your residence"),
    email: Yup.string().email(),
    linkedin: Yup.string(),
    image: Yup.string(),
    password: Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirm_password: Yup.string()
        .required("Please enter your password again")
        .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const updateSchema = Yup.object({
    name: Yup.string().required("Please enter your name").min(3, 'Name is too short').max(35, 'Name is too big'),
    phone_number: Yup.string().required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid'),
    residence: Yup.string().required("Please select your residence"),
    email: Yup.string().email("Not a valid email"),
    linkedin: Yup.string(),
    image: Yup.string(),
});

export const signInSchema = Yup.object({
    phone_number: Yup.string().required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
});