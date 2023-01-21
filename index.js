import express from "express"
import * as dotenv from "dotenv"
import connect from "./config/db.config.js"
import userRoute from "./routes/user.routes.js"
<<<<<<< HEAD
import taskRoute from "./routes/task.routes.js"
=======
import scheduleRoute from "./routes/schedule.routes.js";
>>>>>>> e672c68f674422c539143f4b69300b94a150cc72

dotenv.config();

const app = express();

app.use(express.json());

connect()
app.use("/user", userRoute)
<<<<<<< HEAD
app.use("/task", taskRoute)
=======
app.use("/schedule", scheduleRoute)
>>>>>>> e672c68f674422c539143f4b69300b94a150cc72

app.listen(process.env.PORT, () => {
    console.log(`Server up and running on port http://localhost:${process.env.PORT} `)
})