const mapper = articles =>
  articles.map(({ id, webformatURL, largeImageURL }) => {
    return { id, webformatURL, largeImageURL };
  });

export default mapper;
