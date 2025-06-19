import dotenv from 'dotenv';
dotenv.config();

import{Sequelize} from 'sequelize-typescript'

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,//
    password: process.env.DB_PASSWORD,//by default khali hunxa 
    host: process.env.DB_HOST,//databse ko location
    dialect:"mysql",//kun database use garna lako bhanni kura yeta define garna parxa ra yo case ma mysql ho
    port: Number(process.env.DB_PORT),//yo chai mysql ko default ho
    models : [__dirname + '/models']
    //yo bhsnrko chsai models ko current location  kun ho thaapaauna lai 
})

sequelize.authenticate()
.then(()=>{
    console.log("authenticate bhayo")
})
.catch((err)=>{
    console.log("connect bhaya ni ta ",err)
})

sequelize.sync({alter:false})
.then(()=>{
    console.log("migrated sucessfully")
})
export default sequelize