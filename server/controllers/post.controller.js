const postService = require('../services/post.service');
const { getFullUrl, getExtension } = require('../utils');

exports.create = async (req, res) => {
    const post = req.body;
    post.authorId = req.user;
	const newPost = await postService.create(post);
	res.json({
        id: newPost.id
	});
};

exports.getAllPublicPosts = async (req, res) => {
    const { page, pageSize, categoryid, phrase, tag } = { ...req.query };
	const posts = await postService.getAllPublicPosts({
        page,
        pageSize,
        phrase,
        tag,
        categoryid
    });
    const count = await postService.countAllPublicPosts({
        categoryid,
        tag,
        phrase
    });
	res.json({
        posts,
        count
    });
};

exports.getPostsByAuthor = async (req, res) => {
	const authorId = req.params.id;
	const posts = await postService.getPostsByAuthor(authorId, true, true);
	res.json(posts);
};

exports.addTag = async (req, res) => {
    const {postId, tagId} = {...req.body};
    await postService.addTag(postId, tagId);
    res.sendStatus(204);
};

exports.deleteTag = async (req, res) => {
    const { postId, tagId } = { ...req.body };
    await postService.removeTag(postId, tagId);
    res.sendStatus(204);
};

exports.toggle = async (req, res) => {
	const { postId, isPublic } = { ...req.body };
	await postService.toggle(postId, isPublic);
	res.sendStatus(204);
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const post = req.body;
    post.id = id;
    await postService.update(post);
    res.sendStatus(204);
};

exports.getPostById = async (req, res) => {
    const user = req.user;
    const post = await postService.getById(req.params.id);
    if (post) {
        if (post.public || (user && user === post.authorid)) {
            res.json(post);
            return;
		}
    }
    res.sendStatus(404);
};

exports.getPrivateOrPublicPostById = async (req, res) => {
    const post = await postService.getById(req.params.id);
	if (post) {
        res.json(post);
	} else {
		res.sendStatus(404);
	}
};

exports.delete = async (req, res) => {
    await postService.delete(req.params.id);
    res.sendStatus(204);
};

exports.favorite = async (req, res) => {
    const { id, userId } = { ...req.params };
    try {
        const post = await postService.favorite(id, userId);
        res.json({
            post
        });    
    } catch (e) {
        res.sendStatus(400);
    }
};

exports.unfavorite = async (req, res) => {
    const { id, userId } = { ...req.params };
    const post = await postService.unfavorite(id, userId);
    res.json({
        post
    });
};

exports.uploadImage = async (req, res) => {
    return res.json({ link: getFullUrl(req, req.fullFileName) });
};

// exports.uploadPreviewImage = async (req, res) => {
//     const postId = req.body.postId;
//     await postService.uploadPreviewImage(postId, req.fullFileName);
//     return res.json({ fileName: getFullUrl(req, req.fullFileName) });
// };

exports.createComment = async (req, res) => {
    const { postId, content, parentId } = { ...req.body };
    const commenterId = req.user;
    const comment = await postService.createComment(postId, content, commenterId, parentId);
    return res.json({
        id: comment.id,
        commenterid: commenterId,
        postid: postId,
        content,
        parentid: parentId
    });
};

exports.updateComment = async (req, res) => {
	const { commentId, content } = { ...req.body };
	await postService.createComment(
        commentId,
		content
	);
	return res.sendStatus(204);
};

exports.deleteComment = async (req, res) => {
    const { commentId } = { ...req.body };
    await postService.deleteComment(commentId);
    return res.sendStatus(204);
};

exports.getTagSuggestions = async (req, res) => {
    const phrase = req.query.phrase;
    const tags = await postService.getTagSuggestions(phrase);
    return res.json(tags);
};

exports.createTag = async (req, res) => {
    const name = req.body.name;
    console.log(name);
    const tag = await postService.createTag(name);
    return res.json({
        id: tag.id
    });
};