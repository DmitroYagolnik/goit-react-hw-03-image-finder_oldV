import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    srcModalImage: PropTypes.string.isRequired,
  };

  overletRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.code !== 'Escape') return;

    this.props.onClose();
  };

  handleBackdropClick = event => {
    const { current } = this.overletRef;

    if (current && event.target !== current) return;

    this.props.onClose();
  };

  render() {
    const { srcModalImage } = this.props;
    return (
      <div
        className={styles.Overlay}
        ref={this.overletRef}
        onClick={this.handleBackdropClick}
        onKeyDown={this.handleKeyPress}
        role="presentation"
      >
        <img src={srcModalImage} className={styles.Modal} alt="" />
      </div>
    );
  }
}

export default Modal;
