import { combineReducers } from 'redux';
import postsBySubredditReducer from './postsBySubreddit';
import subredditReucer from './subreddits';

const rootReducer = combineReducers({
  postsBySubreddit: postsBySubredditReducer,
  subreddit: subredditReucer,
});

export default rootReducer;
