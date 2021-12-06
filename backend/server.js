import express from 'express';
import mongoose  from 'mongoose';
import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();


/*resolve the undedifies email on postman */
app.use(express.json());
app.use(express.urlencoded({extend:true}));
mongoose.connect(process.env.MONGODB_URL ||  'mongodb://localhost/project2021');


app.use("/api/users", userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders', orderRouter);

app.use(express.static(path.join(__dirname, '/thefrontend/build')));
app.get('*', (req,res)=> res.sendFile(path.join(__dirname, 'thefrontend/build/index.html')));
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message})
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});