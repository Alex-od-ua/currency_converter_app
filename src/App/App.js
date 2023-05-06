import { useState, useEffect } from "react";

import { CurrencyForm } from "../components/CurrencyForm/CurrencyForm";
import Loader from "components/Loder/Loader";
import { searchRates } from "services/api";

import "./App.css";

const initialState = {
  fromCurrency: "UAH",
  toCurrency: "USD",
  price: 0,
  toPrice: 0,
};

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchRates = async () => {
      if (rates.length === 0) {
        try {
          setLoading(true);
          const result = await searchRates();
          setRates(result);
        } catch (error) {
          setError(error.data.message);
          console.log(error);
          alert("Oooops, something went wrong :(");
        } finally {
          setLoading(false);
          console.log(rates);
        }
      }
    };

    fetchRates();
  }, [rates]);

  const onChangeFromPrice = (value) => {
    // const price = rates.cc[fromCurrency] / value;
    // const result = price * rates.cc[toCurrency];

    console.log(value);
    console.log(rates.cc);
    // console.log(result);

    console.log(rates[0].cc);
    setFromPrice(value);
    // setToPrice(result);
  };

  const onChangeToPrice = (value) => {
    setToPrice(value);
  };

  // console.log(rates[0].txt);

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {loading && <Loader />}

      <CurrencyForm
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <CurrencyForm
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
