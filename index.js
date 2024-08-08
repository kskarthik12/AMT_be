import express from 'express'
import dotenv from 'dotenv'
const path = require('path');
import cors from 'cors'
import AppRoutes from './src/routes/index.js'
dotenv.config()

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use(AppRoutes);

app.listen(process.env.PORT,()=>console.log("Server Listening in Port" + process.env.PORT))
