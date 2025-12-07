import React from 'react';
import Hero from '../Hero/Hero';
import WhyChoose from '../WhyChoose/WhyChoose';
import Service from '../../service/Service';

const Home = () => {
    return (
        <div>
         <Hero></Hero> 
         <Service></Service>
         <WhyChoose></WhyChoose>
         
        </div>
    );
};

export default Home;