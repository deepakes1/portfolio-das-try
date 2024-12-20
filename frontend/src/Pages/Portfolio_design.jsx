import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Welcome from "@/component/WelcomeDesign";
import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";
import Projects from "./Projects";
import Certifications from "./Certifications";
import FinalPort from "./FinalPort";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";


function PortfolioDesign() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentStep, setCurrentStep] = useState(0);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState(0);
  const [personalInfoData, setPersonalInfoData] = useState({});
  const { user, isLoaded } = useUser(); // Destructure isLoaded to know when user data is available

  const steps = [
    "Welcome",
    "Personal",
    "Experience",
    "Skills",
    "Education",
    "Projects",
    "Certifications",
    "Portfolio"
  ];

  useEffect(() => {
    if (user?.emailAddress) {
      fetchPersonalInfo(user.emailAddress);
    }

    // After user is loaded, redirect to the portfolio design page
    if (isLoaded && user) {
      navigate("/Design_Portfolio");
    }
  }, [user, isLoaded, navigate]); 

  const fetchPersonalInfo = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/personal-info?email=${email}`
      );
      setPersonalInfoData(response.data || {});
      setMaxAccessibleStep(1); // Unlock access to the Personal Info step
    } catch (error) {
      console.error("Error fetching personal info:", error);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setMaxAccessibleStep((prev) => Math.max(prev, currentStep + 1));
    }
  };

  const handleStepClick = (index) => {
    if (index <= maxAccessibleStep) {
      setCurrentStep(index);
    }
  };
  

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Welcome onStart={handleNextStep} />;
        
      case 1:
        return (
          <PersonalInfo
            userEmail={user?.emailAddress}
            formData={personalInfoData}
            setFormData={setPersonalInfoData}
            onNext={handleNextStep}
          />
        );
      
        case 2:
      return (
        <Experience
          userEmail={user?.emailAddress}
          
          onNext={handleNextStep}
          
        />
      );

      case 3:
        return <Skills userEmail={user?.emailAddress} onNext={handleNextStep} />;
      case 4:
        return <Education userEmail={user?.emailAddress} onNext={handleNextStep} />;
      case 5:
        return <Projects userEmail={user?.emailAddress} onNext={handleNextStep} />;
      case 6:
        return <Certifications userEmail={user?.emailAddress} onNext={handleNextStep}/>;
      case 7:
        return <FinalPort userEmail={user?.emailAddress} onNext={handleNextStep}/>;
      default:
        return <Welcome onStart={handleNextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#F8F8F8] p-4 md:p-5" >
  {/* Signed Out UI */}
  <SignedOut>
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Portfolio Builder
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Create a stunning portfolio in just a few steps! Sign in to get
        started and showcase your experience, skills, and projects like
        never before.
      </p>
      <SignInButton mode="modal" redirectUrl="/Design_Portfolio">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 shadow-lg transition-all">
          Sign In to Start Building 🚀
        </button>
      </SignInButton>
    </div>
  </SignedOut>

  {/* Main Portfolio Builder */}
  <SignedIn>
    <header className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        {/* Render user email only if it's loaded */}
        <span className="text-lg font-semibold text-gray-600">
          Welcome, {isLoaded && user?.firstName ? user.firstName : "User"}!
        </span>
        <UserButton />
      </div>
    </header>

    {/* Stepper UI */}
    <div className="flex flex-wrap justify-center gap-4 mb-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={index} className="text-center">
          {/* Step Circle */}
          <div
            onClick={() => handleStepClick(index)}
            className={`w-14 h-14 md:w-16 md:h-16 mx-auto flex items-center justify-center rounded-full text-white font-bold shadow-md cursor-pointer transition-all duration-300 ${
              index === currentStep
                ? "bg-black  scale-105 animate-glow" 
                : index <= maxAccessibleStep
                ? "bg-black"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {index + 1}
          </div>
          {/* Step Label */}
          <p
            className={`mt-2  text-sm font-medium ${
              index === currentStep
                ? "text-black"
                : index <= maxAccessibleStep
                ? "text-black"
                : "text-gray-500"
            }`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>

    {/* Current Step Content */}
    <div className="w-full md:max-w-4xl mx-auto p-2 md:border-2 md:p-8   " >
      {renderStep()}
    </div>
  </SignedIn>
</div>


  );
}

export default PortfolioDesign;
