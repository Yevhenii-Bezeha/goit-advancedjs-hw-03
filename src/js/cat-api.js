const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT_ALL_BREEDS = '/breeds';
const END_POINT_BREED = '/images/search';
const options = {
  headers: {
    'x-api-key':
      'live_VOvT6IAsVg3apVKiZYzTEFlSsXzX8nEsF1JTdvq7UHoVVXUDRSRohjOihM0jsZDU',
  },
};

export function fetchBreeds() {
  const url = `${BASE_URL}${END_POINT_ALL_BREEDS}`;

  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

export function fetchCatByBreed(catId) {
  const url = `${BASE_URL}${END_POINT_BREED}?breed_ids=${catId}`;

  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
