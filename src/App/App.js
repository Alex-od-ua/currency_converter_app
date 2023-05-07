import { useState, useEffect, useRef } from "react";

import { CurrencyForm } from "../components/CurrencyForm/CurrencyForm";
import Loader from "components/Loder/Loader";
import { searchRates } from "services/api";

import "./App.css";

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1); // (1) -> make start uah -> usd currency

  // const [rates, setRates] = useState([]);
  const ratesRef = useRef([]);

  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const isFirstRenderFromPrice = useRef(true);
  const isFirstRenderToPrice = useRef(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const result = await searchRates(fromCurrency);

        // setRates(result);
        ratesRef.current = result;
        onChangeToPrice(1); // make start uah -> usd currency
      } catch (error) {
        setError(error);
        console.log(error);
        alert("Oooops, something went wrong :(");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (isFirstRenderFromPrice.current) {
      isFirstRenderFromPrice.current = false;
      return;
    }

    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    if (isFirstRenderToPrice.current) {
      isFirstRenderToPrice.current = false;
      return;
    }

    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    const result =
      (ratesRef.current.conversion_rates[toCurrency] /
        ratesRef.current.conversion_rates[fromCurrency]) *
      value;

    setToPrice(0);
    setFromPrice(0);

    setToPrice(Math.floor(result * 100) / 100); // or toFixed(2)
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current.conversion_rates[fromCurrency] /
        ratesRef.current.conversion_rates[toCurrency]) *
      value;

    setFromPrice(0);
    setToPrice(0);

    setFromPrice(Math.floor(result * 100) / 100); // or toFixed(2)
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
