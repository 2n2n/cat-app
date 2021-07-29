import request from "./request";


const get = (breedId) => {
  return request()
    .get(`/v1/images/${breedId}`)
    .then((res) => res.data);
}

const search = (breedId, limit = 10, page = 1) => {
  return request()
    .get(`/v1/images/search?breed_id=${breedId}&limit=${limit}&page=${page}`)
    .then((res) => res.data);
};


const imageRequest = {
  get,
  search
};

export default imageRequest;