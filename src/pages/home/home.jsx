import { Link } from 'react-router-dom';
import './Home.css';
import React, { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://openexchangerates.org/api/latest.json?Home_id=${apiKey}`;


const defaultFromCurrency = 'USD';
const defaultToCurrency = 'ZMW';

const setFlag = (currency) => currency.slice(0, 2);

const Home = () => {
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
                    <Link to={`help`} className='material-symbols-outlined'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug-icon lucide-bug"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>
                    </Link>
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

export default Home;