import axios from "axios";
import { API_URL } from "../constants";

async function getToDos() {
  const data = await axios.get(API_URL);

  return data.data;
}

export default getToDos;
