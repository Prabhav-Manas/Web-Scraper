require('dotenv').config();
const http = require('http');
const { app, connectDB } = require('./app');
const { scrapeHackerNews } = require('./src/utils/scrapper');

const port = process.env.PORT || 8000;
const server = http.createServer(app);

const startServer = async () => {
    // Connect DB first
    await connectDB();

    // Start server
    server.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    });

    // Run scraper after DB ready
    try {
        await scrapeHackerNews();
        console.log('Initial scraping completed.');
    } catch (error) {
        console.log('Initial scraping failed:=>', error.message);
    }
};

startServer();