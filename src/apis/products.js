const API_PATH = 'https://whitechdevs.github.io/reactjs-test/products.json';

export const retrieve = () => {
  return fetch(API_PATH).then(response => response.json());
};
