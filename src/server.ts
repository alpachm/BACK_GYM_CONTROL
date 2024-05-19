import "dotenv/config";
import app from "./app";
import db from "./database/config/index";
import initModels from "./database/models/initModels";

const port: number = process.env.PORT ? +process.env.PORT : 8000;

db.authenticate()
    .then(() => console.log("DB was authenticated"))
    .catch((error) => console.log("Error " + error))

db.sync()
    .then(() => console.log("DB was synced"))
    .catch((error) => console.log("Error " + error))

initModels();

app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
})