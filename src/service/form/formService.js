import axios from "../../axios";
import endPoints from "../endPoints";

const formSubmit = async (data) => {
  console.log("data", data);
  return axios.post(endPoints.API.SUBMIT, data);
};

export default formSubmit;
