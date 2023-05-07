import axios from "axios";

// const API_KEY = "c1jA4Omc0aB9I4607zOS7fR8s3XE8oF6"; // for - https://apilayer.com/marketplace/exchangerates_data-api#endpoints

const API_KEY = "a6fe167cd6f918d1bf0caaf9";

const instance = axios.create({
  baseURL: "https://v6.exchangerate-api.com",
});

export const searchRates = async (baseCode) => {
  const { data } = await instance.get(`/v6/${API_KEY}/latest/${baseCode}`);

  console.log(data);

  return data;
};

// const instance = axios.create({
//   baseURL: "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?",
// });

// export const searchRates = async () => {
//   const { data } = await instance.get("json");

//   console.log(data);

//   return data;

// export const searchRates = async (to = "GBP", from = "JPY", amount = 100) => {
//   const { data } = await instance.get("/convert?", {
//     params: {
//       to: to,
//       from: from,
//       amount: amount,
//     },
//   });
