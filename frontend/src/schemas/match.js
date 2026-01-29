import * as Yup from "yup";

export const matchSchema = Yup.object({
    event: Yup.string().required("Please select a event"),
    date: Yup.object({ $d: Yup.date() }).required("Please select date & time"),
    teams: Yup.array().of(Yup.string().required('Please select teams')).test({
        message: 'Please select two teams',
        test: arr => arr.length === 2,
    })
});