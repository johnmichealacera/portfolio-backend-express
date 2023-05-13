import express from 'express';
import * as dotenv from "dotenv";
import portfolioRoutes from './routes/portfolio.route';

const app = express();
const cors = require('cors');
dotenv.config();
app.use(cors({
    origin: process.env.PORTFOLIO_FRONTEND_URL,
}));

const startServer = () => {
  try {
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });   
  } catch (error) {
    process.exit(1);
  }
};

app.use(express.json());
app.use(portfolioRoutes);

startServer();
