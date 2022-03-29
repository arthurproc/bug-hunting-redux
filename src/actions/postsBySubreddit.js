import { REQUEST_POSTS, RECEIVE_POSTS, NEED_REFRESH } from './types';

export const requestPosts = (subreddit) => ({
  type: REQUEST_POSTS,
  subreddit,
});

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map((child) => child.data),
  receivedAt: Date.now(),
});

export const needRefhesh = (subreddit) => ({
  type: NEED_REFRESH,
  subreddit,
});

const fetchPosts = (subreddit) => async (dispatch) => {
  dispatch(requestPosts(subreddit));
  const response = await fetch(`https://www.reddit.com/r/${subreddit}/best.json`);
  const json = await response.json();
  dispatch(receivePosts(subreddit, json));
};

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.needRefresh;
};

export const fetchPostsIfNeeded = (subreddit) => (dispatch, getState) => {
  console.log(subreddit);
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit));
  }
};
