import * as Yup from "yup";

export const winnerSchema = Yup.object({
    event: Yup.string().required("Please select a event"),
    rank: Yup.number().min(1, 'Rank should be atleast 1'),
    category: Yup.string().required('Select a category'),
    team: Yup.string().required('Select a team')
});