import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, largeImage }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      src={src}
      alt=""
      className={styles.ImageGalleryItemImage}
      data-large_image={largeImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
