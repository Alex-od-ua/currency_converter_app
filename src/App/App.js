import { CurrencyForm } from "../components/CurrencyForm/CurrencyForm";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CurrencyForm value={0} currency="RUB" onChangeCurrency={(cur) => console.log(cur)} />
      <CurrencyForm value={0} currency="USD" />
    </div>
  );
}

export default App;
