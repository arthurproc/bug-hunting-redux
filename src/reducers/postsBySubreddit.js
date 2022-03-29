import {
  REQUEST_POSTS, RECEIVE_POSTS, NEED_REFRESH,
} from '../actions';

const INITIAL_STATE = {
  isEmpty: true,
};

function postsBySubredditReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEED_REFRESH:
    return {
      ...state,
      [action.subreddit]: {
        ...state[action.subreddit],
        needRefresh: true,
      },
    };
  case REQUEST_POSTS:
    return {
      ...state,
      isEmpty: false,
      [action.subreddit]: {
        ...state[action.subreddit],
        isFetching: true,
        needRefresh: false,
        posts: [],
      },
    };
  case RECEIVE_POSTS:
    return {
      ...state,
      [action.subreddit]: {
        ...state[action.subreddit],
        isFetching: false,
        posts: action.posts,
        lastUpdated: action.receivedAt,
        needRefresh: false,
      },
    };
  default:
    return state;
  }
}

export default postsBySubredditReducer;
