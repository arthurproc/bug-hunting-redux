import React from 'react';
import PropTypes from 'prop-types';

class Picker extends React.Component {
  render() {
    const { value, onChange, options, subredditQuery, submitQuery } = this.props;
    return (
      <span>
        <label htmlFor="subredditQuery">
          Buscar subreddits
          <input
            type="text"
            value={ subredditQuery }
            onChange={ onChange }
            id="subredditQuery"
            name="subredditQuery"
          />
        </label>
        <button
          onClick={ submitQuery }
          type="button"
        >
          Buscar Subreddits
        </button>
        <h1>{value}</h1>
        <label htmlFor="selectSubreddit">
          Selecione um subreddit
          <select
            onChange={ onChange }
            value={ value }
            id="selectSubreddit"
            name="selectSubreddit"
          >
            {
              options.map((option) => (
                <option value={ option } key={ option }>
                  {option}
                </option>
              ))
            }
          </select>
        </label>
      </span>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  subredditQuery: PropTypes.string.isRequired,
  submitQuery: PropTypes.func.isRequired,
};

export default Picker;
