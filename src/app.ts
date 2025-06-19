import express, { response } from 'express'//uta chai pahilay require("")
const app = express()
import authRoute from "./route/globals/auth/authRoute"
import instituteRoute from "./route/institute/instituteRoute"
app.use(express.json())//this is called parsing 

app.use("/api",authRoute)
app.use("/api/institute",instituteRoute)
export default app