import React from 'react';
import PropTypes from 'prop-types';

export default class Comment extends React.Component {

  static get propTypes() {
      return {
          author: PropTypes.any,
          body: PropTypes.any
      };
  }

  render(){
    return (
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Delete comment
          </a>
        </div>
      </div>
    );
  }
}
