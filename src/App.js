import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, fetchSubreddits } from './actions';
import Picker from './components/Picker';
import Posts from './components/Posts';
import { needRefhesh } from './actions/postsBySubreddit';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subredditQuery: 'javascript',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleSearchSubredditClick = this.handleSearchSubredditClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    const { selectedSubreddit, dispatch } = this.props;
    if (prevProps.selectedSubreddit !== selectedSubreddit) {
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    if (name === 'selectSubreddit') {
      const { dispatch } = this.props;
      dispatch(selectSubreddit(value));
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  handleSearchSubredditClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { subredditQuery } = this.state;
    dispatch(fetchSubreddits(subredditQuery));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(needRefhesh(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated, subreddits } = this.props;
    const { subredditQuery } = this.state;
    return (
      <div>
        <Picker
          value={ selectedSubreddit }
          onChange={ this.handleChange }
          options={ ['reactjs', ...subreddits.map((sub) => sub.display_name)] }
          subredditQuery={ subredditQuery }
          submitQuery={ this.handleSearchSubredditClick }
        />
        <p>
          {
            lastUpdated && (
              <span>
                Atualizado em
                {' '}
                {new Date(lastUpdated).toLocaleTimeString()}
                .
                {' '}
              </span>
            )
          }
          {
            !isFetching && (
              <button onClick={ this.handleRefreshClick } type="button">
                Atualizar
              </button>
            )
          }
        </p>
        {
          isFetching
            ? <h2>Loading...</h2>
            : <Posts posts={ posts } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { subreddit, postsBySubreddit } = state;
  const { selectedSubreddit, list } = subreddit;

  if (postsBySubreddit[selectedSubreddit]) {
    return {
      selectedSubreddit,
      posts: postsBySubreddit[selectedSubreddit].posts,
      isFetching: postsBySubreddit[selectedSubreddit].isFetching,
      lastUpdated: postsBySubreddit[selectedSubreddit].lastUpdated,
      subreddits: list,
    };
  }
  return {
    selectedSubreddit,
    posts: [],
    isFetching: true,
    lastUpdated: null,
    subreddits: list,
  };
};

App.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
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
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  subreddits: PropTypes.arrayOf(
    PropTypes.shape(
      {
        display_name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        header_img: PropTypes.string.isRequired,
      },
    ).isRequired,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(App);
