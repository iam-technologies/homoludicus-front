import axios from 'axios';

const instagramLastest = () => {
  axios.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN')
    .then((response) => {
    })
    .catch((error) => {
    });
};
