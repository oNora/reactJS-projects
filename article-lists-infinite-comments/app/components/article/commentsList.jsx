import React, { Component, PropTypes } from 'react';
import AddCommentField from './addCommentField';

class CommentsList extends Component {

    timeSince(date) {

        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    render() {
        const { children, loadReply, toggleReplies, toggleReplyForm } = this.props;

        return (
            <div className={`comment-wrap`}>

                {children.map(comment =>

                    <div key={comment.id} className={`comment toggle-${ comment.toggle ? 'show': 'hide'}`} >
                        <p className='comment-details'>
                            <span> <strong> {comment.author} </strong> {this.timeSince(comment.createdAt)} ago</span>

                            {  /*load replies only once*/
                                comment.replies === undefined &&
                                <button className='total-replies link-style' onClick={loadReply.bind(null, comment.id, comment.repliesCount)}>
                                    {comment.repliesCount} replies
                                </button>
                            }

                            { /*toggle replies if they are already loaded*/
                                comment.replies !== undefined &&
                                <button className='total-replies link-style' onClick={toggleReplies.bind(null, comment.id)}>
                                    {comment.toggle ? 'hide' : `show ${comment.repliesCount !== undefined ? comment.repliesCount: ''}`} replies
                                </button>
                            }

                            <button className='reply link-style' onClick={toggleReplyForm.bind(null, comment.id)}>
                                {comment.toggleReplyForm ? 'discard reply' : 'reply'}
                            </button>
                        </p>
                        <p className='comment-text'>{comment.text} </p>

                        { comment.toggleReplyForm && <AddCommentField submit={this.props.submitReply} parentCommentId={comment.id}/>}

                        {
                            comment.replies &&
                            <CommentsList children={comment.replies} loadReply={loadReply}
                                          toggleReplies={toggleReplies} toggleReplyForm={toggleReplyForm}
                                          submitReply={this.props.submitReply}/>
                        }
                    </div>
                )}
            </div>
        )

    }
}

CommentsList.propTypes = {
    children       : PropTypes.array.isRequired,
    loadReply      : PropTypes.func.isRequired,
    toggleReplies  : PropTypes.func.isRequired,
    toggleReplyForm: PropTypes.func.isRequired,
    submitReply    : PropTypes.func.isRequired
};

export default CommentsList;