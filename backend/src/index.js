import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, "../../frontend/dist")));

	app.get(/(.*)/, (req, res) => {
		res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
	})
}

app.listen(port, () => {
	console.log(`server is running on port:${port}`);
	connectDB();
	console.log(__dirname)
})
