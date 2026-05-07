const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
    try {
        console.log('Scraper running...');

        const { data } = await axios.get('https://news.ycombinator.com', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        console.log('Scrapper data:=>', data)

        const $ = cheerio.load(data);
        const stories = [];

        // Each story row has class 'athing'
        $('.athing').slice(0, 10).each((i, el) => {
            const id = $(el).attr('id');
            const titleEl = $(el).find('.titleline > a').first();
            const title = titleEl.text().trim();
            const url = titleEl.attr('href') || null;

            // Subtext row is the next sibling
            const subtext = $(el).next('.spacer').prev();
            const subtextRow = $(`#${id}`).next();

            const pointsText = subtextRow.find('.score').text().trim();
            const points = pointsText ? parseInt(pointsText.replace(' points', '').replace(' point', '')) : 0;

            const author = subtextRow.find('.hnuser').text().trim() || 'unknown';
            const postedAt = subtextRow.find('.age').attr('title') || subtextRow.find('.age').text().trim() || null;

            if (title) {
                stories.push({ title, url, points, author, postedAt });
            }
        });

        // Clear old stories and insert new ones
        await Story.deleteMany({});
        await Story.insertMany(stories);

        console.log(`Scraper done. ${stories.length} stories saved.`);
        return stories;
    } catch (error) {
        console.log('Scraper Error:=>', error.message);
        throw error;
    }
};

module.exports = {scrapeHackerNews};