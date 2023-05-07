import { useState, useEffect, useRef } from "react";

import { CurrencyForm } from "../components/CurrencyForm/CurrencyForm";
import Loader from "components/Loder/Loader";
import { searchRates } from "services/api";

import "./App.css";

// const initialState = {
//   fromCurrency: "UAH",
//   toCurrency: "USD",
//   fromPrice: 0,
//   toPrice: 0,
// };

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState([]);
  // const [rates2, setRates2] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const isFirstRender = useRef(true);

  console.log(fromCurrency);
  console.log(toCurrency);

  useEffect(() => {
    const fetchRates = async () => {
      // if (rates.length === 0) {
      try {
        setLoading(true);
        const result = await searchRates(fromCurrency);
        // const result2 = await searchRates(toCurrency);
        setRates(result);
        // setRates2(result2);
      } catch (error) {
        setError(error.data.message);
        console.log(error);
        alert("Oooops, something went wrong :(");
      } finally {
        setLoading(false);
        // console.log(rates);
        // console.log(rates2);
      }
    };
    // };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChangeFromPrice(fromPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    // const price = rates.conversion_rates[toCurrency] / value;
    const result = value * rates.conversion_rates[toCurrency];

    // console.log(value);
    console.log(rates.conversion_rates);
    // console.log(price);
    console.log(result);

    setToPrice(result);
    setFromPrice(value);
  };

  // const onChangeFromCurrency = (cur) => {
  //   setFromCurrency(cur);
  //   onChangeFromPrice(fromPrice);
  // };

  const onChangeToPrice = (value) => {
    const result =
      (rates.conversion_rates[fromCurrency] /
        rates.conversion_rates[toCurrency]) *
      value;

    console.log(result);

    setFromPrice(result);
    setToPrice(value);
  };

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
