import React from 'react';
import { render } from 'react-dom';
import Comment from './components/Comment';
import CommentForm from './components/CommentForm'
import jQuery from 'jQuery';
import PropTypes from 'prop-types';

export default class Hello extends React.Component {

  static get propTypes() {
      return {
          newComment: PropTypes.any
      };
  }
  constructor(){
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentWillMount(){
    this._fetchComments();
  }

  render (){
    const comments = this._getComments();
    let buttonText = 'Show comments';
    let commentNodes;
    if (this.state.showComments){
      buttonText = 'Hide comments';
    }
    if (this.state.showComments){
      commentNodes = <div className="comment-list">{comments}</div>
    }

    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)}/>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
          {commentNodes}
      </div>
    )
  }

  componentDidMount(){
    this._timer = setInterval(() => this._fetchComments(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _fetchComments(){
    jQuery.ajax({
      method: 'GET',
      url: '/api/comments',
      success: (comments) => {
        this.setState({comments})
      }
    });
  }
  _getComments(){

    return this.state.comments.map((comment) => {
      return (
        <Comment
          author={comment.author}
          body={comment.body}
          key={comment.id}
          onDelete={this._deleteComment.bind(this)} />
      );
    });
  }
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }
  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    });
  }
  _addComment(author, body) {
    const comment = { author, body };
    jQuery.post('/api/comments', { comment })
      .success(newComment => {
        this.setState({comments: this.state.comments.concat([comment])});
      });
  }

  _deleteComment(comment) {
    jQuery.ajax({
      method: 'DELETE',
      url: './api/comments/${comment.id}'
    });

    let i;
    const comments = [...this.state.comments];
    const commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, i);

    this.setState({ comments });
  }
}

render(<Hello />, document.getElementById('app'));
