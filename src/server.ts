import express from 'express';
import * as dotenv from "dotenv";
import portfolioRoutes from './routes/portfolio.route';

const app = express();
const cors = require('cors');
dotenv.config();
app.use(cors({
    origin: process.env.PORTFOLIO_FRONTEND_URL,
}));
const start = async () => {
  try {
    app.listen(5000, () => console.log("Server started on port 5000")); 
    
  } catch (error) {
    process.exit(1);
  }
};
app.use(express.json());
app.use(portfolioRoutes);

start();