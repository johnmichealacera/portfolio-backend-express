# **Personal Portfolio Express Backend**
This is my personal portfolio backend built with Express.js and TypeScript.

## Installation
1. Clone the repository: `git clone https://github.com/johnmichealacera/portfolio-backend-express.git`
2. Navigate to the project directory: `cd portfolio-backend-express`
3. Install dependencies: `npm install`

## Environment variables
The application requires the following environment variables to be set:

- `PORTFOLIO_FRONTEND_URL`: The url for the portfolio frontend built in vue.
- `REDIS_STRING_URL`: The redis cache string url.
- `MYSQL_HOST`: The MySQL host
- `MYSQL_USERNAME`: The MySQL username
- `MYSQL_PASSWORD`: The MySQL password
- `MYSQL_DATABASE`: The MySQL database

Create a `.env` file in the root directory of the project with the following values as per your requirements.

**Note**: Make sure to never commit your `.env` file to version control. You can add it to your `.gitignore` file to ensure it is not accidentally committed.

## Usage
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5000/` in your favorite API development tool.

## Built With
- [Express](https://expressjs.com/en/5x/api.html) - The backend framework used
- [MySQL](https://dev.mysql.com/doc/) - the database used to store and read information
- [Redis](https://redis.io/docs/) - the cache used
## Contributing
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
## License
This project is licensed under the MIT License - see the [LICENSE.md](https://opensource.org/license/mit/) file for details.

## Acknowledgments
- [Express](https://expressjs.com/en/5x/api.html) documentation
- [MySQL](https://dev.mysql.com/doc/) documentation
- [Redis](https://redis.io/docs/) documentation