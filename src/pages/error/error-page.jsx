import { Link, useRouteError } from "react-router-dom";
import './error.css';

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <main id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <span>{error?.statusText || error?.message || "Unknown error"}</span>
                <span><Link to={'/'}>Main</Link></span>
            </p>
        </main>
    )
}