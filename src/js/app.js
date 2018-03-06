import React from 'react';
import { render } from 'react-dom';
import Comment from './components/Comment';
import CommentForm from './components/CommentForm'

export default class Hello extends React.Component {
  constructor(){
    super();

    this.state = {
      showComments: false,
      comments: [
        {id:1, author:'Morgan McCircuit', body:'Great picture!'},
        {id:2, author:'Bending Bender', body:'Excellent Stuff'},
        {id:3, author:'John Whistle', body:'Amazing Wok'}
      ]
    };
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
  _getComments(){

    return this.state.comments.map((comment) => {
      return (
        <Comment
          author={comment.author} body={comment.body} key={comment.id}/>
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
    const comment = {
      id: this.state.comments.lenght + 1,
      author,
      body
    };
    this.setState({comments: this.state.comments.concat([comment])});
  }
}

render(<Hello />, document.getElementById('app'));
