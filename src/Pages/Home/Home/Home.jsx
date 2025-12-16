import React from 'react';
import Hero from '../Hero/Hero';
import WhyChoose from '../WhyChoose/WhyChoose';
import Service from '../../service/Service';
import SpecialOffer from '../../SpecialOffer/SpecialOffer';
import TopDecorators from '../../TopDecorators/TopDecorators';
import OurGallery from '../../../Component/OurGallery/OurGallery';

const Home = () => {
    return (
        <div>
         <Hero></Hero> 
         <Service></Service>
         <WhyChoose></WhyChoose>
         <TopDecorators></TopDecorators>
         <OurGallery></OurGallery>
         <SpecialOffer></SpecialOffer>
         
         
        </div>
    );
};

export default Home;