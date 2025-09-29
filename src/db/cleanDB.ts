import {exit} from "node:process";
import db from "../config/db";

const cleanDB = async () => {

    try {

        await db.sync({force: true})
        console.log("DB cleaned")
        exit();
        
    } catch (error) {

        console.log(error)
        exit(1);
        
    }


}

if(process.argv[2] === "--cleanDB"){
    cleanDB();
}