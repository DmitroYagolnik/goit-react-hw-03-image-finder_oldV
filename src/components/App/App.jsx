import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import articleAPI from '../../services/article-api';
import mapper from '../../services/mapper';
import styles from './App.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchValue: '',
    searchPage: 1,
    articles: [],
    isLoading: false,
    error: null,
    isModalOpen: false,
    modalImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, searchPage, error } = this.state;
    if (
      prevState.searchValue !== searchValue ||
      prevState.searchPage !== searchPage
    ) {
      this.fatchArticles(searchValue, searchPage);
    }

    if (prevState.error !== error) {
      toast.error(`Whoops, something went wrong: ${error.message}`);
    }
  }

  addSearchValue = value => {
    this.setState({
      searchValue: value.toLowerCase(),
      searchPage: 1,
      articles: [],
    });
  };

  handleAddMore = () => {
    this.setState(prevState => ({ searchPage: prevState.searchPage + 1 }));
  };

  fatchArticles = (searchValue, searchPage) => {
    this.setState({ isLoading: true });

    articleAPI(searchValue, searchPage)
      .then(({ data }) =>
        this.setState(prevState => ({
          articles: [...prevState.articles, ...mapper(data.hits)],
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  openModal = event => {
    const { target } = event;
    if (target.nodeName !== 'IMG') return;
    this.setState({
      isModalOpen: true,
      modalImage: target.dataset.large_image,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalImage: null });
  };

  render() {
    const { articles, isLoading, isModalOpen, modalImage, error } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.addSearchValue} />
        {articles.length > 0 && (
          <ImageGallery articles={articles} openModal={this.openModal} />
        )}
        {isLoading ? (
          <Loader
            type="ThreeDots"
            color="Red"
            height={20}
            className={styles.Loader}
          />
        ) : (
          articles.length > 0 && <Button onClickButton={this.handleAddMore} />
        )}
        <ToastContainer />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isModalOpen && (
          <Modal srcModalImage={modalImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
