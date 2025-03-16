const mongoose = require("mongoose")

const password = `IlovemyIndia@1000`;
const url = `mongodb+srv://ishan:IlovemyIndia%401000@wolfamecluster.0ekxv.mongodb.net/?retryWrites=true&w=majority&appName=WolfameCluster`;

mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.error("Error connecting to Database", err);
});