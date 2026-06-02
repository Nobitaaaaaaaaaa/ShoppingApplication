import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';

//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors());


//API endpoints
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
