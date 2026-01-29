import * as Yup from "yup";

export const teamSchema = Yup.object({
    name: Yup.string().required("Please enter your team name").min(3, 'Name is too short').max(35, 'Name is too big'),
    residence: Yup.string().required("Please select your residence"),
    event: Yup.string().required("Please select a event"),
    players: Yup.array().of(Yup.string())
});