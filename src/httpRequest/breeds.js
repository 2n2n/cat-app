import request from "./request";

const list = () => {
    return request()
        .get('/v1/breeds')
        .then((res) => res.data );
}

const breedsRequest = {
    list,
}
export default breedsRequest;