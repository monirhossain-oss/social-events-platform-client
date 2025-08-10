import { FaRegLightbulb, FaUsers, FaSearch, FaGoogle } from "react-icons/fa";

const features = [
    {
        icon: <FaRegLightbulb size={40} color="#4ade80" />,
        title: "Easy Event Creation",
        description: "Create and manage your own events effortlessly.",
    },
    {
        icon: <FaUsers size={40} color="#60a5fa" />,
        title: "Join Events",
        description: "Participate in various community events.",
    },
    {
        icon: <FaSearch size={40} color="#facc15" />,
        title: "Filter & Search",
        description: "Filter events by name and type easily.",
    },
    {
        icon: <FaGoogle size={40} color="#ef4444" />,
        title: "Social Login",
        description: "Quickly login using Google or GitHub.",
    },
];

const FeatureSection = () => {
    return (
        <section className="m-4 rounded-2xl">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-500">
                    Key Features of Our App
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {features.map(({ icon, title, description }, index) => (
                        <div
                            key={index}
                            className="text-center p-6 border rounded-lg shadow hover:shadow-lg transition"
                        >
                            <div className="mb-4 flex justify-center">{icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-500">
                                {title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;

