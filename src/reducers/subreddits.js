import {
  SELECT_SUBREDDIT,
  REQUEST_SUBREDDITS,
  RECEIVE_SUBREDDITS,
} from '../actions/types';

const INITIAL_STATE = {
  selectedSubreddit: 'reactjs',
  isFetching: false,
  list: [],
};

function subredditReucer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SELECT_SUBREDDIT:
    return {
      ...state,
      selectedSubreddit: action.subreddit,
    };
  case REQUEST_SUBREDDITS:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_SUBREDDITS:
    return {
      ...state,
      isFetching: false,
      list: action.subreddits,
    };
  default:
    return state;
  }
}

export default subredditReucer;
