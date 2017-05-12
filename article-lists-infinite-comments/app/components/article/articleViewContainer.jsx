import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    loadComments, loadReplies, toggleReplies,
    addComment, toggleReplyForm, addReply
} from '../../actions/comments.js';
import CommentsList from './commentsList';
import AddCommentField from './addCommentField';

class ArticleViewContainer extends Component {

    constructor(props) {
        super(props);

        this.loadReply = this.loadReply.bind(this);
        this.toggleReplies = this.toggleReplies.bind(this);
        this.toggleReplyForm = this.toggleReplyForm.bind(this);
        this.submitNewComment = this.submitNewComment.bind(this);
        this.submitReply = this.submitReply.bind(this);
    }

    componentDidMount() {
        this.props.loadComments(this.props.paramId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.paramId !== this.props.paramId){
            this.props.loadComments(nextProps.paramId);
        }
    }

    loadReply(currentCommentId, repliesCount){
        if (repliesCount){
            this.props.loadReplies(currentCommentId);
        }
        return false;
    }

    toggleReplies(currentCommentId){
        this.props.toggleReplies(currentCommentId);
    }

    toggleReplyForm(currentCommentId){
        this.props.toggleReplyForm(currentCommentId);
    }

    submitNewComment(textareaValue){
        if (textareaValue) {
            this.props.addComment({ articleId: this.props.paramId, text: textareaValue });
        }
    }

    submitReply(textValue, parentCommentId){
        if (textValue !== undefined && parentCommentId !== undefined) {
            this.props.addReply({ parentCommentId: parentCommentId, text: textValue });
        }
    }

    render() {
        if (!!this.props.currentArticle){
            return (
                <div className='article-view'>
                    <h1 className='title'>{this.props.currentArticle.title}</h1>
                    <div className='header-img'>
                        <img src={this.props.currentArticle.imageUrl} />
                    </div>
                    <p>{this.props.currentArticle.text}</p>
                    <div className='comments-section'>

                        <p>Comments</p>
                        <AddCommentField submit={this.submitNewComment}/>

                        <CommentsList children={this.props.comments} loadReply={this.loadReply}
                                      toggleReplies={this.toggleReplies} toggleReplyForm={this.toggleReplyForm}
                                      submitReply={this.submitReply}/>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

ArticleViewContainer.propTypes = {
    paramId        : PropTypes.string.isRequired,
    currentArticle : PropTypes.object,
    comments       : PropTypes.array,
    loadComments   : PropTypes.func.isRequired,
    loadReplies    : PropTypes.func.isRequired,
    toggleReplies  : PropTypes.func.isRequired,
    toggleReplyForm: PropTypes.func.isRequired,
    addComment     : PropTypes.func.isRequired,
    addReply       : PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => (
    {
        paramId       : ownProps.params.articleId,
        currentArticle: state.allArticles.articles[ownProps.params.articleId],
        comments      : state.singleArticleComments.comments
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        loadComments    : (id) => dispatch(loadComments(id)),
        loadReplies     : (id) => dispatch(loadReplies(id)),
        toggleReplies   : (id) => dispatch(toggleReplies(id)),
        toggleReplyForm : (id) => dispatch(toggleReplyForm(id)),
        addComment      : ({ articleId, text }) => dispatch(addComment({ articleId, text })),
        addReply        : ({ parentCommentId, text }) => dispatch(addReply({ parentCommentId, text }))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleViewContainer);