import axios from "axios";

const instance = axios.create({
  baseURL: "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?",
});

export const searchRates = async () => {
  const { data } = await instance.get("json");

  console.log(data);

  return data;
};
