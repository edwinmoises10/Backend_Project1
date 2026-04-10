import { connect } from "mongoose"
import 'dotenv/config'

export const connectMongoDB = async () => {

    const URL = process.env.MONGO_URL
    // const URL = process.env.MONGO_ATLAS

    if (!URL) {
        console.log("Error: MONGO_URL WITH ERRORS")
        process.exit(1)
    }

    try {

        console.log("Proceso de obtencion de Datos de MongoDB");
        await connect(URL)

    } catch (e) {
        throw e
    }

}