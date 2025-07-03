import { Link } from "react-router";
import bgImage from '../../assets/mulyadi-ZnLprInKM7s-unsplash.jpg'

const NotFound = () => {
    return (
        <div
            className="flex flex-col mt-8 items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white bg-contain bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
            }}

        >
            <div className="absolute inset-0 bg-black opacity-50 dark:opacity-70"></div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-8">Oops! Page not found.</p>
                <Link to="/" className="btn btn-primary">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
