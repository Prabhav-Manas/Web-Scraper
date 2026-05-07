require('dotenv').config();
const http=require('http');
const app=require('./app');
const {scrapeHackerNews}=require('./src/utils/scrapper');

const port=process.env.PORT || 8000;

const server=http.createServer(app);

server.listen(port, async()=>{
    console.log(`Server is running on PORT ${port}`);

    try {
        // Auto-run scraper on server start
        await scrapeHackerNews();
        console.log('Initial scraping completed.');
    } catch (error) {
        console.log('Initial scraping failed:=>', error.message);
    }
})