


import React, { useState, useEffect, useRef, useCallback } from "react";
import about1 from "../assets/about1.png";
import design from "../assets/design.png";
import Aesthetics from "../assets/Aesthetics.png";
import features from "../assets/features.png";
import customization from "../assets/customization.png";
import 'animate.css';

const About = () => {
  // State to track visibility for each section
  const [visibleSections, setVisibleSections] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
  });

  // Refs for each section
  const sectionRefs = useRef({
    section1: null,
    section2: null,
    section3: null,
    section4: null,
  });

  // Intersection Observer logic
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      const sectionName = entry.target.id;
      setVisibleSections((prevState) => ({
        ...prevState,
        [sectionName]: entry.isIntersecting,
      }));
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when 50% of the section is visible
    });

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Cleanup observer when component unmounts
    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [handleIntersection]);

  const renderSection = (id, image, title, text, bgClass = "") => (
    <div
      id={id}
      ref={(el) => (sectionRefs.current[id] = el)}
      className={`md:flex p-3 mx-auto ${visibleSections[id] ? "animate__animated animate__zoomIn" : ""} ${bgClass}`}
    >
      <div className="md:w-1/2 md:flex justify-center">
        <img
          src={image}
          className="w-full h-auto md:h-[60vh] object-contain"
          alt={title}
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center items-center text-center">
        <h3 className="text-xl font-semibold text-white md:mb-3">{title}</h3>
        <p className="text-white mt-2 lg:mt-0 lg:w-full lg:max-w-2xl lg:px-5">{text}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="mx-auto bg-white shadow-xl overflow-hidden">
        <div className="md:flex bg-gray-900 min-h-screen">
          <div className="animate__animated animate__zoomIn md:w-1/2 flex justify-center items-center">
            <img
              src={about1}
              className="w-full object-cover rounded-lg shadow-lg"
              alt="About Image"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center p-6">
            <p className="text-white text-lg leading-relaxed mb-10">
              Welcome to <span className="text-indigo-600 font-bold">PortfolioBuilder</span>, the ultimate platform
              designed for professionals to craft a dynamic online presence. Whether you're a designer, developer, or
              entrepreneur, our platform empowers you to build a portfolio that showcases your skills, experience, and
              achievements with elegance and ease.
            </p>
          </div>
        </div>

        <div className="p-10">
          <div className="flex flex-wrap gap-8">
            {renderSection(
              "section1",
              design,
              "Tailored Design",
              "Create a personalized portfolio that reflects your unique style and showcases your work. You'll receive one tailored template and theme to ensure your portfolio stands out and perfectly represents your personal brand.",
              "bg-[#3B82F6] flex-row-reverse"
            )}
            {renderSection(
              "section2",
              Aesthetics,
              "Cutting-edge Aesthetics",
              "Elevate your brand with distinguished, professional layouts that reflect your unique identity. Leverage cutting-edge design solutions to create a lasting impact and stand out in your industry.",
              "bg-gray-900"
            )}
            {renderSection(
              "section3",
              features,
              "Interactive Features",
              "Integrate interactive elements such as dynamic charts, animations to captivate visitors. Utilize smooth transitions and interactive features to create an immersive user experience.",
              "bg-[#3B82F6] flex-row-reverse"
            )}
            {renderSection(
              "section4",
              customization,
              "Easy Customization",
              "Easily edit your portfolio with our intuitive interface, allowing seamless navigation between sections and real-time changes. Effortlessly make edits with a simple and smooth workflow.",
              " bg-gray-900"
            )}
          </div>

          <div className="text-center mt-10">
            <a
              href="/features"
              className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg shadow-xl hover:bg-indigo-800 transition duration-300"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;




