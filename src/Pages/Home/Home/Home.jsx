import React from 'react';
import Hero from '../Hero/Hero';
import WhyChoose from '../WhyChoose/WhyChoose';
import Service from '../../service/Service';
import SpecialOffer from '../../SpecialOffer/SpecialOffer';
import TopDecorators from '../../TopDecorators/TopDecorators';
import OurGallery from '../../../Component/OurGallery/OurGallery';
import Coverage from '../../Covergae/Coverage';
import HowItWorks from '../../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <title>spark decore | Home </title>
         <Hero></Hero> 
         <Service></Service>
         <TopDecorators></TopDecorators>
         <WhyChoose></WhyChoose>
         <HowItWorks></HowItWorks>
         <OurGallery></OurGallery>
         <SpecialOffer></SpecialOffer>
         <Coverage></Coverage>
         
         
        </div>
    );
};

export default Home;