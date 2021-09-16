import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (imageName, page) => {
  const apiKey = '22568340-3d930d703d1ad37110880a9ab';
  const params = 'image_type=photo&orientation=horizontal';

  const response = await axios.get(
    `?q=${imageName}&page=${page}&key=${apiKey}&${params}&per_page=12`,
  );

  return response.data.hits;
};

export default fetchImages;

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '22568340-3d930d703d1ad37110880a9ab';

// function fetchImage(searchRequest, page) {
//     return fetch(`${BASE_URL}?q=${searchRequest}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
//         if (response.ok) {
//             return response.json();
//         };

//         return Promise.reject(new Error(`Нет фото с именем ${searchRequest}`));
//     });
// };

// const api = {
//   fetchImage,
// };

// export default api;
