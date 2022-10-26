import express from "express";
import dotenv from "dotenv";
import path from "path";

import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.use(cors({ credentials:true, origin:'*' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
// });
let defended = ['transformed.js', 'main.css', 'favicon.ico']

app.get("*", (req, res) => {

    let path = req.params['0'].substring(1)

    if (defended.includes(path)) {
        // Return the actual file
        res.sendFile(`${__dirname}../frontend/build/${path}`);
    } else {
        // Otherwise, redirect to /build/index.html
        res.sendFile(`${__dirname}../frontend/build/index.html`);
    }
});
app.listen(process.env.PORT || 5000, ()=> console.log(`Server running at port ${process.env.PORT}`));
