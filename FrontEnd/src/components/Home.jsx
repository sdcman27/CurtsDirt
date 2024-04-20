import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import CurtsDirtLogo from '../assets/CurtsDirtLogo.jpg';
import CurtsDirt2 from '../assets/CurtsDirt2.jpg';
import CurtsDirt3 from '../assets/CurtsDirt3.jpg';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to CurtsDirt</h1>
      </header>

      <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
      <div>
    <img src={CurtsDirtLogo} alt="CurtsDirtLogo" />
    <p className="legend">Image 1</p>
  </div>
  <div>
    <img src={CurtsDirt2} alt="CurtsDirt2" />
    <p className="legend">Image 2</p>
  </div>
  <div>
    <img src={CurtsDirt3} alt="CurtsDirt3" />
    <p className="legend">Image 3</p>
  </div>
      </Carousel>

      <div className="home-about">
        <h1>About Us</h1>
        <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to the family at CurtsDirt, where every grain of soil is steeped in a legacy of care and quality.<br></br><br></br>

        &nbsp;&nbsp;&nbsp;&nbsp;Founded in 2020, CurtsDirt is more than just a business—it's a passion that has blossomed into a promise of excellence. Operating individually, yet fueled by the spirit of family, we are your neighbors, dedicating every day to fulfilling your needs and nurturing growth, both in your gardens, land and in our relationships.<br></br><br></br>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our journey began with a simple mission: to offer a product that stands the test of time and to provide a service that makes every customer feel like part of the CurtsDirt family. It is with a shovel in hand and a heart full of dedication that we venture into each day, committed to the hard work that has become the foundation of our reputation.<br></br><br></br>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We know that trust is cultivated, not given. That's why we're tirelessly committed to ensuring that every order of topsoil you receive from us is rich in quality, just like the service we aim to provide. Our joy comes from seeing the fruits of your labor, knowing that we had a hand in bringing that harvest to life.<br></br><br></br>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;At CurtsDirt, we're not just selling topsoil; we're offering a promise—a promise to be there for our customers, to listen and to adapt, ensuring that you remain satisfied with our products and our service. Because for us, it's not just about making a sale; it's about building a lasting relationship and becoming the trusted partner you deserve.<br></br><br></br>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So, let's plant the seeds for a beautiful tomorrow together. At CurtsDirt, your growth is our success, and your satisfaction is our legacy.<br></br><br></br>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to quality. Welcome to efficiency. Welcome to CurtsDirt.
        </p>
      </div>

      <div className="home-hours">
        <h1>Hours of Operation</h1>
        <p>Come visit us or give us a call ANYTIME, our hours of operation:</p>
          <ul className="hours-list">
            <li>Monday - Friday: 4 PM - 8 PM</li>
            <li>Saturday & Sunday: 8 AM - 4 PM</li>
        </ul>
    </div>

    </div>
  );
}

export default Home;
