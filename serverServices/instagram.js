import axios from 'axios';

const instagramLastest = () => {
  axios.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
