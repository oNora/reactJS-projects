
const seed = require('./seed');
const db = require('./db');

seed(db);

function delayedPromise(data) {
  return new Promise((resolve) => { // No errors currently
    setTimeout(() => resolve(data), 1300 * Math.random());
  });
}

exports.loadArticles = function(paging) {
  const articles = db.find('articles', {}, paging);
  const totalCount = db.count('articles', {});

  articles.forEach((article) => {
    article.commentsCount = db.count('comments', { articleId: article.id });
  });

  return delayedPromise({
    data: articles,
    totalCount,
  });
}

exports.loadComments = function({ parentCommentId, articleId }) {
  let filter;

  if (parentCommentId !== undefined) {
    filter = { parentCommentId };
  } else {
    filter = { articleId, parentCommentId: null };
  }

  const comments = db.find('comments', filter);
  
  comments.sort((x, y) => x.createdAt - y.createdAt);

  comments.forEach((comment) => {
    comment.repliesCount = db.count('comments', { parentCommentId: comment.id });
  });

  return delayedPromise({
    data: comments,
  });
}

exports.addComment = function({ text, articleId, parentCommentId = null }) {
  const comment = { text, articleId, parentCommentId, author: '[me]', };
  const lastCommentId = db.insert('comments', comment);
  const insertedComment = Object.assign(comment, {
    id: lastCommentId,
  });

  return delayedPromise({
    data: insertedComment,
  });
}
