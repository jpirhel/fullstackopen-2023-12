import axios from 'axios'

const url = (path) => {
  // const baseUrl = "http://localhost:3003";
  const baseUrl = "";
  return `${baseUrl}${path}`;
}

const getAll = () => {
  const getUrl = url("/api/blogs");

  console.log("blogService.getAll getUrl:", getUrl);

  const request = axios.get(getUrl)

  return request.then(response => response.data)
}

export default { getAll }