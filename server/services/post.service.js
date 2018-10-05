const db = require('../db');

exports.create = async body => {
	const { name, content, categoryid, authorid, previewimage } = body;
	const { rows } = await db.query(
		'INSERT INTO Post(Name, Content, CategoryId, AuthorId, PreviewImage, DatePublished, Public) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING Id',
		[
			name,
			content,
			categoryid,
			authorid,
			previewimage,
			new Date(),
			body.public
		]
	);
	return rows[0];
};

exports.getAllPublicPosts = async () => {
	const {
		rows
	} = await db.query(`SELECT *, (SELECT COUNT(DISTINCT commenterId) FROM Comment WHERE postId = p.id) AS commentCount,
            (SELECT COUNT(DISTINCT userId) FROM Favorite WHERE postId = p.id) AS favoriteCount,
            (SELECT Name FROM Category WHERE id = p.categoryId) AS categoryName,
            (SELECT Email FROM AppUser WHERE id = p.authorId) AS authorName
            FROM Post p WHERE public = TRUE ORDER BY p.datePublished DESC`);
	await Promise.all(
		rows.map(async row => (row.tags = await exports.getTags(row.id)))
	);
	return rows;
};

exports.getSomePublicPosts = async (limit = 10, offset = 0) => {
	const { rows } = await db.query(
		`SELECT *, (SELECT COUNT(DISTINCT commenterId) FROM Comment WHERE postId = p.id) AS commentCount,
            (SELECT COUNT(DISTINCT userId) FROM Favorite WHERE postId = p.id) AS favoriteCount,
            (SELECT Name FROM Category WHERE id = p.categoryId) AS categoryName,
            (SELECT Email FROM AppUser WHERE id = p.authorId) AS authorName
            FROM Post p WHERE public = TRUE LIMIT $1 OFFSET $2`,
		[limit, offset]
	);
	await Promise.all(
		rows.map(async row => (row.tags = await exports.getTags(row.id)))
	);
	return rows;
};

exports.getPublicPostsByAuthor = async authorId => {
	let query = `SELECT *, (SELECT COUNT(DISTINCT commenterId) FROM Comment WHERE postId = p.id) AS commentCount,
        (SELECT COUNT(DISTINCT userId) FROM Favorite WHERE postId = p.id) AS favoriteCount,
        (SELECT Name FROM Category WHERE id = p.categoryId) AS categoryName
     FROM Post p WHERE AuthorId = $1 AND Public = TRUE`;
	const { rows } = await db.query(query, [authorId]);
	await Promise.all(
		rows.map(async row => (row.tags = await exports.getTags(row.id)))
	);
	return rows;
};

exports.getAllPostsByAuthor = async authorId => {
	let query = `SELECT *, (SELECT COUNT(DISTINCT commenterId) FROM Comment WHERE postId = p.id) AS commentCount,
        (SELECT COUNT(DISTINCT userId) FROM Favorite WHERE postId = p.id) AS favoriteCount 
     FROM Post p WHERE AuthorId = $1 `;
	const { rows } = await db.query(query, [authorId]);
	await Promise.all(
		rows.map(async row => (row.tags = await exports.getTags(row.id)))
	);
	return rows;
};

exports.getPrivatePostsByAuthor = async authorId => {
	let query = `SELECT *, (SELECT COUNT(DISTINCT commenterId) FROM Comment WHERE postId = p.id) AS commentCount,
        (SELECT COUNT(DISTINCT userId) FROM Favorite WHERE postId = p.id) AS favoriteCount 
     FROM Post p WHERE AuthorId = $1 AND Public = FALSE`;
	const { rows } = await db.query(query, [authorId]);
	await Promise.all(
		rows.map(async row => (row.tags = await exports.getTags(row.id)))
	);
	return rows;
};

exports.getPostsByAuthor = async (
	authorId,
	includesPrivate = false,
	includesPublic = true
) => {
	let query = `SELECT *, (SELECT COUNT(DISTINCT commenterId) FROM Comment WHERE postId = p.id) AS commentCount,
        (SELECT COUNT(DISTINCT userId) FROM Favorite WHERE postId = p.id) AS favoriteCount 
     FROM Post p WHERE AuthorId = $1 `;
	if (!includesPrivate) {
		query += ' AND Public = TRUE ';
	}
	if (!includesPublic) {
		query += ' AND Public = FALSE ';
	}
	const { rows } = await db.query(query, [authorId]);
	await Promise.all(
		rows.map(async row => (row.tags = await exports.getTags(row.id)))
	);
	return rows;
};

exports.getTags = async postId => {
	const { rows } = await db.query(
		'SELECT * FROM Tag t WHERE t.id IN (SELECT tagId FROM PostTag WHERE postId = $1)',
		[postId]
	);
	return rows;
};

exports.addTag = async (postId, tagId) => {
	const { rows } = await db.query('INSERT INTO PostTag VALUES($1, $2)', [
		postId,
		tagId
	]);
	return rows[0];
};

exports.removeTag = async (postId, tagId) => {
	const { rows } = await db.query(
		'DELETE FROM PostTag WHERE PostId = $1 AND TagId = $2',
		[postId, tagId]
	);
	return rows[0];
};

exports.toggle = async (postId, isPublic) => {
	const { rows } = await db.query(
		'UPDATE Post SET Public = $1 WHERE id = $2',
		[isPublic, postId]
	);
	return rows[0];
};

exports.update = async body => {
	const { id, name, content, categoryid, previewimage } = { ...body };
	const { rows } = await db.query(
		'UPDATE Post SET Name = $1, Content = $2, CategoryId = $3, Public = $4, PreviewImage = $5 WHERE id = $6',
		[name, content, categoryid, body.public, previewimage, id]
	);
	return rows[0];
};

exports.getById = async id => {
	const { rows } = await db.query(
		`SELECT p.*, u.id AS authorid, u.email AS authorName, 
                        (SELECT Name FROM Category WHERE id = p.categoryId) AS categoryName
            FROM Post p JOIN AppUser u ON p.authorId = u.id WHERE p.id = $1`,
		[id]
	);
	const post = rows[0];
	if (post) {
		post.tags = await exports.getTags(id);
		post.comments = await exports.getComments(id);
		post.favorites = await exports.getFavorites(id);
	}
	return post;
};

exports.delete = async id => {
	const { rows } = await db.query('DELETE FROM Post WHERE Id = $1', [id]);
	return rows[0];
};

exports.favorite = async (postId, userId) => {
	const { rows } = await db.query('INSERT INTO Favorite VALUES($1, $2)', [
		postId,
		userId
	]);
	return rows[0];
};

exports.unfavorite = async (postId, userId) => {
	const { rows } = await db.query(
		'DELETE FROM Favorite WHERE PostId = $1 AND UserId = $2',
		[postId, userId]
	);
	return rows[0];
};

// exports.uploadPreviewImage = async (postId, fileName) => {
//     const { rows } = await db.query(
// 		'UPDATE Post SET PreviewImage = $1 WHERE id = $2',
// 		[fileName, postId]
// 	);
// 	return rows[0];
// };

exports.getFavoriteCount = async postId => {
	const { rows } = await db.query(
		'SELECT COUNT(DISTINCT userId) FROM Favorite WHERE postId = $1',
		[postId]
	);
	return rows[0];
};

exports.getCommentCount = async postId => {
	const { rows } = await db.query(
		'SELECT COUNT(DISTINCT userId) FROM Comment WHERE postId = $1',
		[postId]
	);
	return rows[0];
};

const listToTree = list => {
    const roots = [];
    const map = new Map();

    list.forEach(item => {
        map.set(item.id, item);
        item.children = [];
    });
    console.log(map);
    list.forEach(item => {
        if (item.parentid === -1) {
            roots.push(item);
        } else {
            map.get(item.parentid).children.push(item);
        }
    });
    return roots;
};

exports.getComments = async postId => {
	const { rows } = await db.query(
		'SELECT c.*, u.email as commenterName FROM Comment c JOIN AppUser u ON u.id = c.commenterId WHERE postId = $1',
		[postId]
    );
    return listToTree(rows);
};

exports.getFavorites = async postId => {
	const { rows } = await db.query(
		'SELECT UserId FROM Favorite WHERE postId = $1',
		[postId]
	);
	return rows;
};

exports.createComment = async (postId, content, commenterId, parentId) => {
	const { rows } = await db.query(
		'INSERT INTO Comment(Content, PostId, CommenterId, DateCommented, ParentId) VALUES($1, $2, $3, $4, $5) RETURNING Id',
		[content, postId, commenterId, new Date(), parentId]
    );
	return rows[0];
};

exports.deleteComment = async commentId => {
	const { rows } = await db.query('DELETE FROM Comment WHERE Id = $1', [
		commentId
	]);
	return rows[0];
};

exports.updateComment = async (commentId, content) => {
	const { rows } = await db.query(
		'UPDATE Comment SET Content = $1 WHERE Id = $2',
		[content, commentId]
	);
	return rows[0];
};
