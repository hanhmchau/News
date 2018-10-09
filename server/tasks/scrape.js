require('dotenv').config();
const request = require('request'); // for fetching the feed
const axios = require('axios'); // for fetching the feed
const parseString = require('xml2js').parseString;
const cheerio = require('cheerio');
const postService = require('../services/post.service');
const categoryService = require('../services/category.service');

const extractPreviewImage = description => {
	const $ = cheerio.load(description);
	const src = $('img').attr('src');
	console.log(src);
};

const scrape = (title, description, link, category) => {
    axios.get(link)
    .then(data => {
        const $ = cheerio.load(data);
        const content = description + $('article').html();
        // name, content, categoryid, authorid, previewimage, tags, public
        try {
            postService.create({
                name: title,
                previewimage: extractPreviewImage(description),
                content,
                public: true,
                categoryid: category.id
            });
        } catch (e) {
            console.log(e);
        }
    })
    .catch(console.log);
};

const process = (data, category) => {
	parseString(data, (err, result) => {
		if (err) {
            console.log(err);
            return;
        };
        const xml = result.rss;
		const items = xml.channel[0].item;
		items.forEach(item => {
			const title = item.title[0];
			const description = item.description[0];
			const link = item.link[0];
			scrape(title, description, link, category);
		});
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

// const req = request('https://vnexpress.net/rss/tin-moi-nhat.rss');

// req.on('error', function (error) {
//     // handle any request errors
// });

// req.on('response', function (res) {
//     let data = '';
//     res.on('data', chunk => data += chunk);
//     res.on('end', () => {
//         parseString(data, (err, result) => {
//             if (err) return;
//             const xml = result.rss;
//             const items = xml.channel[0].item;
//             items.forEach((item, index) => {
//                 const title = item.title[0];
//                 const description = item.description[0];
//                 const link = item.link[0];
//                 scrape(title, description, link, index);
//             });
//         });
//     });
// });
