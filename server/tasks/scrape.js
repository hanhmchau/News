const request = require('request'); // for fetching the feed
const req = request('https://vnexpress.net/rss/tin-moi-nhat.rss');
const parseString = require('xml2js').parseString;
const cheerio = require('cheerio');
const fs = require('fs');

const scrape = (title, link) => {
    const req = request(link);
    req.on('response', res => {
        let data = '';
        res.on('data', chunk => data+= chunk);
        res.on('end', () => {
            const $ = cheerio.load(data);
            const article = $('article').html();
            console.log(title);
            fs.writeFile(`posts/${title}.html`, article, err => {
                if (err) console.log(err);
            });
        });
    });
};

req.on('error', function (error) {
    // handle any request errors
});

req.on('response', function (res) {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        parseString(data, (err, result) => {
            const xml = result.rss;
            const items = xml.channel[0].item;
            items.forEach(item => {
                const title = item.title[0];
                const description = item.description[0];
                const datePublished = item.pubDate[0];
                const link = item.link[0];
                scrape(title, description, link);
            });
        });
    });
});