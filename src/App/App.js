import { useState, useEffect } from "react";

import { CurrencyForm } from "../components/CurrencyForm/CurrencyForm";
import { searchRates } from "services/api";

import "./App.css";

function App() {
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
        } finally {
          setLoading(false);
          console.log(rates);
        }
      }
    };

    fetchRates();
  }, []);

  console.log(rates[0]);

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {/* {loading && <Loader/>} */}
      <CurrencyForm
        value={0}
        currency="UAH"
        onChangeCurrency={(cur) => console.log(cur)}
      />
      <CurrencyForm value={0} currency="USD" />
    </div>
  );
}

export default App;
