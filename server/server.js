
import express from "express"
import {PORT} from "./config.js"
import indexRoutes from "./routes/index.routes.js"
import cors from "cors"
import bodyParser from "body-parser"
//image
import { createServer } from 'http';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';



const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())




// Serve static files from the "uploads" directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('/uploads', express.static(join(__dirname, 'uploads')));



app.use(indexRoutes)

// app.post("/createProject",upload.array("logo"),(req,res)=>{
//     console.log("otro xd")
//     console.log(req.body)
//     res.send(req.body)
// })



app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})

