import request from "./request";

const list = () => {
  return request()
    .get("/v1/breeds")
    .then((res) => res.data)
    .catch(() =>
      alert(
        "Apologies but we could not load new cats for you at this time! Miau!"
      )
    );
};

const breedsRequest = {
  list,
};
export default breedsRequest;
