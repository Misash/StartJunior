import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "../css/Carusel.css"

function Carusel() {
  return (
    <Carousel>
      <Carousel.Item className='slogans'>
          <h3>Society 🤝</h3>
          <p>Projects that promote equality, well-being, and community development</p>
      </Carousel.Item>
      <Carousel.Item className='slogans'>
          <h3>Education 🎓</h3>
          <p>Projects that promote access to quality education and learning for all</p>
      </Carousel.Item>
      <Carousel.Item className='slogans'>
          <h3>Environment 🌱</h3>
          <p>Projects that seek to preserve and protect our natural environment and promote sustainability</p>
      </Carousel.Item>
      <Carousel.Item className='slogans'>
          <h3>Humanitarian 🤲</h3>
          <p>Projects that provide aid and support to communities in crisis or need</p>
      </Carousel.Item>
      <Carousel.Item className='slogans'>
          <h3>Accessibility ♿️</h3>
          <p>Projects that focus on eliminating barriers and promoting accessibility for all individuals</p>
      </Carousel.Item>
      <Carousel.Item className='slogans'>
          <h3>Science 🔬</h3>
          <p>Projects that drive scientific and technological research for societal advancement</p>
      </Carousel.Item>
      <Carousel.Item className='slogans'>
          <h3>Health 💙</h3>
          <p>Projects that aim to improve quality of life and well-being in the field of health</p>
      </Carousel.Item>
      <Carousel.Item className='slogans'>
          <h3>Freedom and Privacy 🔒</h3>
          <p>Projects that protect privacy and promote freedom for individuals online and offline</p>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carusel;