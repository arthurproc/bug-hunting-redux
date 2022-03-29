import React from 'react';
import PropTypes from 'prop-types';

class Posts extends React.Component {
  render() {
    const { posts } = this.props;
    return posts.length <= 0
      ? <h2>Empty</h2>
      : <ul>{posts.map((post, i) => <li key={ i }>{post.title}</li>)}</ul>;
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape(
      {
        author: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        downs: PropTypes.number.isRequired,
        ups: PropTypes.number.isRequired,
        subreddit: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      },
    ).isRequired,
  ).isRequired,
};

export default Posts;
