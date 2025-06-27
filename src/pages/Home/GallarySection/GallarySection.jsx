import React from "react";
import img1 from "../../../assets/kasturi-laxmi-mohit-uv6lUONd19w-unsplash.jpg";
import img2 from "../../../assets/maximus-beaumont-Mo6ufD1EJWA-unsplash.jpg";
import img3 from "../../../assets/noah-buscher-x8ZStukS2PM-unsplash.jpg";
import img4 from "../../../assets/sam-rowe-hhjGoxq1yUw-unsplash.jpg";
import img5 from "../../../assets/tushar-gidwani-QNInQH0jhv8-unsplash.jpg";
import img6 from "../../../assets/victoria-prymak-jSfkJ4CsvxQ-unsplash.jpg";


const galleryImages = [img1, img2, img3, img4, img5, img6];

const GallerySection = () => {
    return (
        <section className="py-12 bg-gray-50 mt-8 rounded-2xl dark:bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-green-500">
                    Event Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {galleryImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={img}
                                alt={`Social Development Event ${idx + 1}`}
                                className="w-full   object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
