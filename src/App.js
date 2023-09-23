import { useEffect, useState } from 'react';
import './styles.css';

export default function App() {
    const [adviceNumber, setAdviceNumber] = useState(0);
    const [adviceText, setAdviceText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getAdvice = async function(id) {
        try {
            setIsLoading(true);
            setError("");
            const response = await fetch(`https://api.adviceslip.com/advice${id ? `/${id}` : ''}`,  { cache: "no-cache" });
            if (!response.ok) {
                throw new Error("Something went wrong. Please try again later.");
            }

            const data = await response.json();
            if (data.slip === undefined) {
                throw new Error("Advice not found. Please try again.");
            }

            setAdviceNumber(data.slip.id);
            setAdviceText(data.slip.advice);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAdvice(71);
    }, [])

    return (
        <main className="main">
            <div className={`advice-container ${isLoading ? 'advice-container--hidden' : ''}`}>
                {!error ? (
                    <>
                        <h1 className="advice-number">
                            {`ADVICE #${adviceNumber}`}
                        </h1>
                        <p className="advice-text">
                            {!error ? `“${adviceText}”` : error}
                        </p>
                    </>
                ) : (
                    <p className="advice-text">
                        {error}
                    </p>
                )}
                <picture>
                    <source srcSet="/images/pattern-divider-desktop.svg" media="(min-width: 33.75em)" />
                    <img className="divider" src="/images/pattern-divider-mobile.svg"  alt="divider" />
                </picture>
                <button onClick={() => getAdvice(0)} className="button">
                    <img src="/images/icon-dice.svg" alt="dice" />
                </button> 
            </div>
            <div className={`loading-container ${isLoading ? 'loading-container--visible' : ''}`}>
                {/* <p>Loading...</p> */}
                <div className="loading-spinner"></div>
            </div>
         
        </main>
    );
}
