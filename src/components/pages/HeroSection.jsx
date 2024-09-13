import React from 'react';
import hero from '../../assets/img/hero.mp4'; 


const HeroSection = () => {
  return (
    <section className="hero-area" id="home">
      <div className="">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={hero} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="text-overlay">
          <h1 className="text-4xl font-bold">Elevate Your Movie Night Game!</h1>
          <h3 className="text-xl">Catch the Flicks, Skip the Lines</h3>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
