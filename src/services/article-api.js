import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const USER_KEY = '13080993-ef0fc8e255e06bc4fd233c1c4';

const articleAPI = (searchQuery, searchPage) =>
  axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${searchPage}&key=${USER_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );

export default articleAPI;
