const articles = require('./data.json');

function insertComments(db, articleId, comments, parentCommentId) {
  for (const { text, author, replies } of comments) {
    const lastCommentId = db.insert('comments', {
      text,
      author,
      parentCommentId,
      articleId,
    });

    if (replies) {
      insertComments(db, articleId, replies, lastCommentId);
    }
  }
}

module.exports = (db) => {
  for (const article of articles) {
    const { title, text, imageUrl, comments } = article;
    const lastArticleId = db.insert('articles', { title, text, imageUrl });

    if (article.comments) {
      insertComments(db, lastArticleId, comments, null);
    }
  }
};
