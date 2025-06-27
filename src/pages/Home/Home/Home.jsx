import React from 'react';
import Banner from '../Banner/Banner';
import FeatureSection from '../FeatureSection/FeatureSection';
import GallarySection from '../GallarySection/GallarySection';
import NewsletterSection from '../NewsletterSection/NewsletterSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <GallarySection></GallarySection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;