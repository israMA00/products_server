import express from "express"
import router from "./router"
import db from "./config/db"
import cors, {CorsOptions} from "cors"
import  swaggerUI  from "swagger-ui-express"
import swaggerRefs from "./config/swagger"

const server = express();

server.use(express.json())

//set cors
const options:CorsOptions = {

    origin: function(origin, callback){

        if(origin === process.env.URL_CLIENT){
            callback(null, true)
        }else{
            callback(new Error("CORS ERROR"))
        }
    }
}
server.use(cors(options));


//db connection
export const dbConnection = async () => {

    try {
        await db.authenticate()
        db.sync();
        console.log('Db connected..');

    } catch (error) {
        console.log("ERROR DB NOT CONNECTED")
    }
}

dbConnection()


//SWAGGWER
server.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerRefs) );


server.use('/api/products', router)


export default server;