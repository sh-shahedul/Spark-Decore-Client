import React from 'react';
import Hero from '../Hero/Hero';
import WhyChoose from '../WhyChoose/WhyChoose';
import Service from '../../service/Service';
import SpecialOffer from '../../SpecialOffer/SpecialOffer';

const Home = () => {
    return (
        <div>
         <Hero></Hero> 
         <Service></Service>
         <WhyChoose></WhyChoose>
         <SpecialOffer></SpecialOffer>
         
        </div>
    );
};

export default Home;