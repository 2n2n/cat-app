import request from "./request";


const get = (breedId) => {
  return request()
    .get(`/v1/images/${breedId}`)
    .then((res) => res.data);
}

const search = (breedId, limit = 10, page = 0) => {
  return request()
    .get(
      `/v1/images/search?order=asc&limit=${limit}&page=${page}&breed_id=${breedId}`
    )
    .then((res) => res.data);
};


const imageRequest = {
  get,
  search
};

export default imageRequest;