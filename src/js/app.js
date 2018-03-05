import React from 'react';
import { render } from 'react-dom';
import Comment from './components/Comment';

export default class Hello extends React.Component {
  constructor(){
    super();

    this.state = {
      showComments: false
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
    const commentList = [
      {id:1, author:'Morgan McCircuit', body:'Great picture!'},
      {id:2, author:'Bending Bender', body:'Excellent Stuff'},
      {id:3, author:'John Whistle', body:'Amazing Wok'}
    ];
    return commentList.map((comment) =>{
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
}

render(<Hello />, document.getElementById('app'));
