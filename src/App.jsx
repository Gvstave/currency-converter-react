import './App.css';
import React, { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;


const defaultFromCurrency = 'USD';
const defaultToCurrency = 'ZMW';

const setFlag = (currency) => currency.slice(0, 2);

const App = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState(defaultFromCurrency);
    const [toCurrency, setToCurrency] = useState(defaultToCurrency);
    const [rates, setRates] = useState({});
    const [conversionResult, setConversionResult] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
                const data = await response.json();
                setRates(data.rates);
            } catch (err) {
                setError(err.message);
            }
        };

        console.log(fetchRates())

        fetchRates();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!rates[fromCurrency] || !rates[toCurrency]) return;

            const result = (amount * rates[toCurrency]) / rates[fromCurrency];
            setConversionResult(`${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`);
            setTimeStamp(`Conversion Time: ${new Date().toString()}`);
        }, 500);

        return () => clearTimeout(timeout);
    }, [amount, fromCurrency, toCurrency, rates]);

    return (
        <div>
            <header>
                <span>
                    <p id="result-holder" className="top">{error || conversionResult}</p>
                    <p id="time-stamp" className="bottom">{timeStamp}</p>
                </span>
                <span>
                    <a href="https://gvstave.github.io/Currency-converter/report.html" className="material-symbols-outlined">Bug report</a>
                </span>
            </header>

            <main>
                <h2>Currency Converter</h2>
                <div>
                    <span>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                        />
                    </span>

                    <span>
                        <section>
                            <label htmlFor="from-options">From</label>
                            <img id="from-image" src={`https://flagsapi.com/${setFlag(fromCurrency)}/flat/24.png`} alt={fromCurrency} />
                        </section>
                        <input
                            list="from-options-list"
                            id="from-options"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        />
                        <datalist id="from-options-list">
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </datalist>
                    </span>

                    <span>
                        <section>
                            <label htmlFor="to-options">To</label>
                            <img id="to-image" src={`https://flagsapi.com/${setFlag(toCurrency)}/flat/24.png`} alt={toCurrency} />
                        </section>
                        <input
                            list="to-options-list"
                            id="to-options"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        />
                        <datalist id="to-options-list">
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </datalist>
                    </span>
                </div>
            </main>
        </div>
    );
};

// export default CurrencyConverter;


export default App;