
import React from "react";
import { Link } from "react-router-dom";
import home_img from "../assets/home_img.avif";
import home_responsive from "../assets/home_responsive.png";
import home_easy from "../assets/home_easy.png";
import home_charts from "../assets/home_charts.png";
import 'animate.css';

const FeatureCard = ({ imgSrc, title, description, altText }) => (
  <div className="flex hover:shadow-lg cursor-pointer transition-all hover:scale-105 flex-col items-center text-center p-6 shadow-md rounded-lg">
    <img src={imgSrc} alt={altText} className="mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const CallToAction = ({ buttonText, linkTo, bgColor, textColor, buttonClass }) => (
  <section className={`${bgColor} ${textColor} py-16`}>
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">{buttonText}</h2>
      <p className="text-lg mb-6">
        Start today and impress recruiters, clients, and collaborators with your professional portfolio.
      </p>
      <div className="mt-4">
        <Link to={linkTo}>
          <button className={buttonClass}>
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gray-900 md:flex flex-col justify-center text-white min-h-screen">
        <div className="animate__animated animate__zoomIn max-w-7xl mx-auto px-6 py-20 gap-3 flex flex-col md:flex-row items-center justify-center h-full">
          {/* Left Content */}
          <div className="space-y-6 md:w-[45vw]">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Build Your <span className="text-blue-500">Dream Portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Showcase your skills, experience, and projects with ease. Our portfolio creator helps you stand out to recruiters, clients, and collaborators.
            </p>
            <div className="mt-4">
              <Link to="/Design_Portfolio">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition duration-300">
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
          {/* Right Image */}
          <div className="mt-8 md:mt-0 md:w-[45vw]">
            <img src={home_img} alt="Portfolio Showcase" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Portfolio Creator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            imgSrc={home_charts}
            altText="Integrated Graphs"
            title="Integrated Graphs"
            description="Visualize your data effortlessly with integrated graphs, designed to enhance your insights and present information in a clear, impactful way."
          />
          <FeatureCard
            imgSrc={home_responsive}
            altText="Responsive Design"
            title="Fully Responsive"
            description="Your portfolio looks amazing on all devices, from desktops to smartphones."
           
          />
          <FeatureCard
            imgSrc={home_easy}
            altText="Easy Setup"
            title="Easy to Use"
            description="No coding skills? No problem. Create and publish your portfolio in minutes."
          />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <CallToAction
        buttonText="Create My Portfolio"
        linkTo="/Design_Portfolio"
        bgColor="bg-blue-500"
        textColor="text-white"
        buttonClass="bg-white text-blue-500 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300"
      />

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Portfolio Creator. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
