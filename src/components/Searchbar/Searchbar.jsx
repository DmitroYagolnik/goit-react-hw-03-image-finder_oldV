import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    valueSearchBarr: '',
  };

  handleInput = event => {
    const { value } = event.target;
    this.setState({ valueSearchBarr: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.valueSearchBarr);
    this.resetSearchBarr();
  };

  resetSearchBarr = () => {
    this.setState({ valueSearchBarr: '' });
  };

  render() {
    const { valueSearchBarr } = this.state;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            value={valueSearchBarr}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
