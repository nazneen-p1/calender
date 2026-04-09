import React, { useState, useEffect } from 'react';
import { MONTHS } from '../utils/dateUtils';
import ThemeToggle from './ThemeToggle';
import '../styles/HeroPanel.css';

export default function HeroPanel({ year, month }) {

  const images = [
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1549558549-415fe4c37b60?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxuYXR1cmV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzUxfHxuYXR1cmV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1542157565-4607d82cf417?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJpdmVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1516475429286-465d815a0df7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyYWx8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1600417144323-4b616efd9bdf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGJlYXV0aWZ1bCUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
  ];

  const [index, setIndex] = useState(0);

  // ✅ Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // manual control
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="hero">

      {/* spiral*/}
      <div className="hero__spiral">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="hero__coil" />
        ))}
      </div>

      {/*img slide*/}
      <div className="hero__image">
        <img
          src={`${images[index]}?w=900&auto=format&fit=crop`}
          alt="banner"
        />

        {/*arrows*/}
        <button className="left" onClick={prevSlide}>‹</button>
        <button className="right" onClick={nextSlide}>›</button>
      </div>

      {/*tittle*/}
      <div className="hero__title">
        <span className="hero__year">{year}</span>
        <span className="hero__month">
          {MONTHS[month].toUpperCase()}
        </span>
      </div>

      {/*toggle dark to light*/}
      <ThemeToggle />
    </div>
  );
}