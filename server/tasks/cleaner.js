require('dotenv').config();
const postService = require('../services/post.service');

postService.deleteOldPosts();