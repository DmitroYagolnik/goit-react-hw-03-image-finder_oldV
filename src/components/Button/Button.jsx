import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClickButton }) => (
  <button type="button" className={styles.Button} onClick={onClickButton}>
    Load more
  </button>
);

Button.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default Button;
