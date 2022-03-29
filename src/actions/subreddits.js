import { REQUEST_SUBREDDITS, RECEIVE_SUBREDDITS, SELECT_SUBREDDIT } from './types';

export const selectSubreddit = (subreddit) => ({
  type: SELECT_SUBREDDIT,
  subreddit,
});

export const requestSubreddits = () => ({
  type: REQUEST_SUBREDDITS,
});

export const receiveSubreddits = (json) => ({
  type: RECEIVE_SUBREDDITS,
  subreddits: json.data.children.map((child) => child.data),
  receivedAt: Date.now(),
});

export const fetchSubreddits = (query) => async (dispatch) => {
  dispatch(requestSubreddits());
  const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
  const json = await response.json();
  dispatch(receiveSubreddits(json));
};
