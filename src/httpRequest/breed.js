import request from "./request";

const list = () => {
    return request().get('/v1/breeds')
        .then((res) => res.data );
}
const search = (breedId) => {
    return request().get(`/v1/images/search?breed_id=${breedId}`)
        .then((res) => res.data);
} 

const breed = {
    list,
    search
}
export default breed;