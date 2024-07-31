const express=require('express');
const app=express();
const cors=require('cors');
const connectToDb=require('./config/DbConnect');
const corsConfig=require('./config/corsConfig');
const dotenv=require('dotenv');
const verifyJWT=require('./middleware/verifyJWT');
const cookieParser=require('cookie-parser');
const allowCredentials = require('./middleware/allowCredentials');

dotenv.config();
connectToDb();

app.use(express.json());
app.use(allowCredentials);
app.use(cors(corsConfig));
app.use(cookieParser());

app.use('/auth',require('./routes/authentication'));

app.use(verifyJWT);
app.use('/transaction',require('./routes/transactions'));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})
