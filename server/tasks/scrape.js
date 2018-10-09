require('dotenv').config();
const axios = require('axios'); // for fetching the feed
const parseString = require('xml2js').parseString;
const cheerio = require('cheerio');
const postService = require('../services/post.service');
const categoryService = require('../services/category.service');
const fs = require('fs');

const extractPreviewImage = description => {
	const $ = cheerio.load(description);
    const src = $('img').attr('src');
    return src;
};

const scrape = (title, description, link, category) => {
    return axios.get(link, {
        responseType: 'text'
    })
    .then(response => {
        const $ = cheerio.load(response.data);
        const content = $('article').html();

        // name, content, categoryid, authorid, previewimage, tags, public
        
        postService.create({
            name: title,
            previewimage: extractPreviewImage(description),
            content,
            public: true,
            categoryid: category.id,
            tags: []
        });
    })
    .catch(console.log);
};

const process = async (data, category) => {
	parseString(data, async (err, result) => {
		if (err) {
            return;
        };
        const xml = result.rss;
        const items = xml.channel[0].item;
        for (const item of items) {
            const title = item.title[0];
            if (!await postService.containsByTitle(title)) {
                try {
                    const description = item.description[0];
                    const link = item.link[0];
                    await scrape(title, description, link, category);
                } catch (e) {
                }
            }
        }
	});
};

const load = async () => {
	const categories = await categoryService.getAllCategories();
	categories.filter(cat => cat.rss).forEach(cat => {
		axios.get(cat.rss, {
            responseType: 'text'
        }).then(response => {
            process(response.data, cat);
        }).catch(console.log);
	});
};

load();