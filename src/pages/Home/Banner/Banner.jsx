import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner1.jpg';
import bannerImg2 from '../../../assets/banner2.jpg';
import bannerImg3 from '../../../assets/banner3.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
    const overlayContent = (title, buttonText) => (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                {buttonText}
            </button>
        </div>
    );

    return (
        <Carousel
            className="mt-8 m-4 rounded-lg overflow-hidden"
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
        >
            <div className="relative">
                <img src={bannerImg1} alt="Banner 1" className="w-full object-cover h-[400px] md:h-[500px]" />
                {overlayContent('Welcome to Our Garden Community', 'Join Now')}
            </div>
            <div className="relative">
                <img src={bannerImg2} alt="Banner 2" className="w-full object-cover h-[400px] md:h-[500px]" />
                {overlayContent('Learn Gardening Easily', 'Explore')}
            </div>
            <div className="relative">
                <img src={bannerImg3} alt="Banner 3" className="w-full object-cover h-[400px] md:h-[500px]" />
                {overlayContent('Connect with Experts', 'Get Started')}
            </div>
        </Carousel>
    );
};

export default Banner;
