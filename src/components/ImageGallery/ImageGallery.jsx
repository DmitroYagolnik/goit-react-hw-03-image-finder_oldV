import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }),
    ).isRequired,
    openModal: PropTypes.func.isRequired,
  };

  imageGalleryRef = createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { articles } = this.props;

    if (prevProps.articles !== articles) {
      const {
        scrollHeight,
        scrollTop,
        offsetHeight,
      } = this.imageGalleryRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + offsetHeight);
      return { shouldScroll: distanceFromBottom < 10 };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot && snapshot.shouldScroll) {
      const imageGalleryRef = this.imageGalleryRef.current;
      imageGalleryRef.scrollTop = imageGalleryRef.scrollHeight;
    }
  }

  render() {
    const { openModal, articles } = this.props;
    return (
      <ul
        ref={this.imageGalleryRef}
        className={styles.ImageGallery}
        onClick={openModal}
        role="presentation"
      >
        {articles.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              src={webformatURL}
              key={id}
              largeImage={largeImageURL}
              openModal={openModal}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
