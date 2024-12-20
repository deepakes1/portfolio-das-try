// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";

// const Education = ({ onNext }) => {
//   const { user, isLoaded } = useUser();
//   const [education, setEducation] = useState([
//     {
//       education_id: "",
//       institution: "",
//       degree: "",
//       field_of_study: "",
//       start_date: "",
//       end_date: "",
//       grade: "",
//       description: "",
//     },
//   ]);
//   const [validationErrors, setValidationErrors] = useState({});

//   const degreeOptions = [
//   { value: "Other", label: "Other" },
//   { value: "B.Sc", label: "B.Sc" },
//   { value: "B.Tech", label: "B.Tech" },
//   { value: "M.Sc", label: "M.Sc" },
//   { value: "M.Tech", label: "M.Tech" },
//   { value: "Ph.D", label: "Ph.D" },
//   { value: "MBA", label: "MBA" },
//   { value: "BA", label: "BA" },
//   { value: "MA", label: "MA" },
//   { value: "BCA", label: "BCA" },
//   { value: "MCA", label: "MCA" },
//   { value: "MS", label: "MS" },
//   { value: "BBA", label: "BBA" },
//   { value: "LLB", label: "LLB" },
//   { value: "LLM", label: "LLM" },
//   { value: "BDS", label: "BDS" },
//   { value: "MBBS", label: "MBBS" },
//   { value: "DPharm", label: "DPharm" },
//   { value: "BPT", label: "BPT" },
//   { value: "MPT", label: "MPT" },
//   { value: "BAMS", label: "BAMS" },
//   { value: "MD", label: "MD" },
//   { value: "MDS", label: "MDS" },
//   { value: "BFA", label: "BFA" },
//   { value: "MFA", label: "MFA" },
//   { value: "B.E", label: "B.E" },
//   { value: "MEng", label: "MEng" },
//   { value: "BDes", label: "BDes" },
//   { value: "MDes", label: "MDes" },
//   { value: "DSc", label: "DSc" },
//   { value: "B.Ed", label: "B.Ed" },
//   { value: "M.Ed", label: "M.Ed" },
//   { value: "BPharm", label: "BPharm" },
//   { value: "MPharm", label: "MPharm" },
//   { value: "BArch", label: "BArch" },
//   { value: "MArch", label: "MArch" },
//   { value: "BIM", label: "BIM" },
//   { value: "MIM", label: "MIM" },
//   { value: "BScN", label: "BScN" }, // Bachelor of Science in Nursing
//   { value: "MScN", label: "MScN" }, // Master of Science in Nursing
//   { value: "DPT", label: "DPT" }, // Doctor of Physical Therapy
//   { value: "BPA", label: "BPA" }, // Bachelor of Public Administration
//   { value: "MPA", label: "MPA" }, // Master of Public Administration
//   { value: "BBA(Law)", label: "BBA(Law)" }, // Bachelor of Business Administration in Law
//   { value: "MPhil", label: "MPhil" }, // Master of Philosophy
//   { value: "BCom", label: "BCom" }, // Bachelor of Commerce
//   { value: "MCom", label: "MCom" }, // Master of Commerce
//   { value: "BHM", label: "BHM" }, // Bachelor of Hotel Management
//   { value: "MHM", label: "MHM" }, // Master of Hotel Management
//   { value: "BTech (Honours)", label: "BTech (Honours)" },
//   { value: "MTech (Honours)", label: "MTech (Honours)" },
//   { value: "BSc (Honours)", label: "BSc (Honours)" },
//   { value: "MSc (Honours)", label: "MSc (Honours)" },
//   { value: "BCA (Honours)", label: "BCA (Honours)" },
//   { value: "MCA (Honours)", label: "MCA (Honours)" },

//   // Diploma Degrees
//   { value: "Diploma in Engineering", label: "Diploma in Engineering" },
//   { value: "Diploma in Computer Science", label: "Diploma in Computer Science" },
//   { value: "Diploma in Nursing", label: "Diploma in Nursing" },
//   { value: "Diploma in Pharmacy", label: "Diploma in Pharmacy" },
//   { value: "Diploma in Mechanical Engineering", label: "Diploma in Mechanical Engineering" },
//   { value: "Diploma in Civil Engineering", label: "Diploma in Civil Engineering" },
//   { value: "Diploma in Electrical Engineering", label: "Diploma in Electrical Engineering" },
//   { value: "Diploma in Hospitality Management", label: "Diploma in Hospitality Management" },
//   { value: "Diploma in Business Administration", label: "Diploma in Business Administration" },
//   { value: "Diploma in Web Design", label: "Diploma in Web Design" },
//   { value: "Diploma in Graphic Design", label: "Diploma in Graphic Design" },
//   { value: "Diploma in Fashion Design", label: "Diploma in Fashion Design" },
//   { value: "Diploma in Digital Marketing", label: "Diploma in Digital Marketing" },
//   { value: "Diploma in Automobile Engineering", label: "Diploma in Automobile Engineering" },
//   { value: "Diploma in Data Science", label: "Diploma in Data Science" },
//   { value: "Diploma in Accounting", label: "Diploma in Accounting" },
//   { value: "Diploma in Interior Design", label: "Diploma in Interior Design" },
//   { value: "Diploma in Multimedia", label: "Diploma in Multimedia" },
//   { value: "Diploma in Electronics and Communication", label: "Diploma in Electronics and Communication" },
//   { value: "Diploma in Marketing", label: "Diploma in Marketing" },
//   { value: "Diploma in Mechanical Drafting", label: "Diploma in Mechanical Drafting" },
//   { value: "Diploma in Automation Engineering", label: "Diploma in Automation Engineering" },
//   { value: "Diploma in Paramedics", label: "Diploma in Paramedics" },
//   { value: "Diploma in Event Management", label: "Diploma in Event Management" }
// ];


//   const fieldOfStudyOptions = [
//   { value: "Computer Science", label: "Computer Science" },
//   { value: "Information Technology", label: "Information Technology" },
//   { value: "Software Engineering", label: "Software Engineering" },
//   { value: "Data Science", label: "Data Science" },
//   { value: "Artificial Intelligence", label: "Artificial Intelligence" },
//   { value: "Cybersecurity", label: "Cybersecurity" },
//   { value: "Network Engineering", label: "Network Engineering" },
//   { value: "Cloud Computing", label: "Cloud Computing" },
//   { value: "Web Development", label: "Web Development" },
//   { value: "Mobile App Development", label: "Mobile App Development" },
//   { value: "Game Development", label: "Game Development" },
//   { value: "Database Administration", label: "Database Administration" },
  
//   // Additional fields of study
//   { value: "Computer Engineering", label: "Computer Engineering" },
//   { value: "Information Systems", label: "Information Systems" },
//   { value: "Business Analytics", label: "Business Analytics" },
//   { value: "Machine Learning", label: "Machine Learning" },
//   { value: "Blockchain Technology", label: "Blockchain Technology" },
//   { value: "Robotics", label: "Robotics" },
//   { value: "Cloud Architecture", label: "Cloud Architecture" },
//   { value: "DevOps", label: "DevOps" },
//   { value: "UI/UX Design", label: "UI/UX Design" },
//   { value: "Virtual Reality", label: "Virtual Reality" },
//   { value: "Augmented Reality", label: "Augmented Reality" },
//   { value: "Digital Marketing", label: "Digital Marketing" },
//   { value: "Data Engineering", label: "Data Engineering" },
//   { value: "Computer Graphics", label: "Computer Graphics" },
//   { value: "Embedded Systems", label: "Embedded Systems" },
//   { value: "Artificial Neural Networks", label: "Artificial Neural Networks" },
//   { value: "Ethical Hacking", label: "Ethical Hacking" },
//   { value: "Game Design", label: "Game Design" },
//   { value: "Natural Language Processing", label: "Natural Language Processing" },
//   { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
//   { value: "Mobile Computing", label: "Mobile Computing" },
//   { value: "Human-Computer Interaction", label: "Human-Computer Interaction" },
//   { value: "E-commerce", label: "E-commerce" },
//   { value: "Cloud Security", label: "Cloud Security" },
//   { value: "Quantum Computing", label: "Quantum Computing" },
//   { value: "IT Management", label: "IT Management" },
//   { value: "Software Testing", label: "Software Testing" },
//   { value: "Big Data", label: "Big Data" },
//   { value: "Network Security", label: "Network Security" },
//   { value: "Bioinformatics", label: "Bioinformatics" },
//   { value: "Digital Transformation", label: "Digital Transformation" },
//   { value: "Telecommunications", label: "Telecommunications" },
//   { value: "Artificial Intelligence Ethics", label: "Artificial Intelligence Ethics" },
//   { value: "Data Visualization", label: "Data Visualization" },
//   { value: "System Architecture", label: "System Architecture" },
//   { value: "E-Government", label: "E-Government" },
//   { value: "Computer Forensics", label: "Computer Forensics" }
// ];


//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "";
//     return date.toISOString().split("T")[0];
//   };

//   useEffect(() => {
//     if (isLoaded && user) {
//       const fetchEducationData = async () => {
//         const userId = user.primaryEmailAddress?.emailAddress;
//         if (!userId) {
//           alert("User not signed in.");
//           return;
//         }

//         try {
//           const response = await axios.get(`http://localhost:3000/api/education/${userId}`);
//           if (response.data.education && response.data.education.length > 0) {
//             const formattedEducation = response.data.education.map((edu) => ({
//               ...edu,
//               start_date: formatDate(edu.start_date),
//               end_date: formatDate(edu.end_date),
//             }));
//             setEducation(formattedEducation);
//           }
//         } catch (error) {
//           console.error("Error fetching education data:", error);
//           alert("Error fetching education data.");
//         }
//       };

//       fetchEducationData();
//     }
//   }, [isLoaded, user]);

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     setEducation((prevEducation) => {
//       const updatedEducation = [...prevEducation];
//       updatedEducation[index][name] = value;
//       return updatedEducation;
//     });
//   };

//   const handleFieldOfStudyChange = (index, selectedOption) => {
//     const selectedValue = selectedOption ? selectedOption.value : "";
//     setEducation((prevEducation) => {
//       const updatedEducation = [...prevEducation];
//       updatedEducation[index].field_of_study = selectedValue;
//       return updatedEducation;
//     });
//   };

//   const handleAddEducation = () => {
//     setEducation((prevEducation) => [
//       ...prevEducation,
//       {
//         education_id: "",
//         institution: "",
//         degree: "",
//         field_of_study: "",
//         start_date: "",
//         end_date: "",
//         grade: "",
//         description: "",
//       },
//     ]);
//   };

//   const handleRemoveEducation = async (index) => {
//   const educationToRemove = education[index];
//   if (educationToRemove.education_id) {
//     try {
//       const userId = user.primaryEmailAddress?.emailAddress;
//       if (!userId) return alert("User not signed in.");

//       // Ensure you're using the correct education_id for deletion
//       await axios.delete(`http://localhost:3000/api/education/${userId}/${educationToRemove.education_id}`);

//       // Remove the education item from the frontend
//       setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index));

//       // Refetch the updated education list to reflect the re-sequenced education records
//       const response = await axios.get(`http://localhost:3000/api/education/${userId}`);
//       if (response.data.education && response.data.education.length > 0) {
//         const formattedEducation = response.data.education.map((edu) => ({
//           ...edu,
//           start_date: formatDate(edu.start_date),
//           end_date: formatDate(edu.end_date),
//         }));
//         setEducation(formattedEducation);
//       }
//     } catch (error) {
//       console.error("Error deleting education record:", error);
//       alert("Error deleting education record.");
//     }
//   } else {
//     // If the education item does not have an ID (it hasn't been saved yet)
//     setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index));
//   }
// };


//   const validateFields = () => {
//   const errors = {};
//   education.forEach((edu, index) => {
//     if (!edu.institution) errors[`institution_${index}`] = "Institution is required";
//     if (!edu.degree && edu.degree !== "Other") errors[`degree_${index}`] = "Degree is required";  // Don't validate if "Other" is selected
//     if (!edu.field_of_study) errors[`field_of_study_${index}`] = "Field of study is required";
//     if (!edu.start_date) errors[`start_date_${index}`] = "Start date is required";
//     if (!edu.end_date) errors[`end_date_${index}`] = "End date is required";
//     if (!edu.grade) {
//       errors[`grade_${index}`] = "Grade is required";
//     } else if (edu.grade < 0 || edu.grade > 10) {
//       errors[`grade_${index}`] = "Grade must be between 0 and 10";
//     }
//     if (!edu.description) errors[`description_${index}`] = "Description is required";
//   });

//   setValidationErrors(errors);

//   return Object.keys(errors).length === 0;
// };


// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!validateFields()) {
//     return;
//   }

//   if (!user) {
//     return alert('User is not signed in');
//   }

//   const user_id = user.primaryEmailAddress?.emailAddress;
//   const educationData = {
//     user_id,
//     education: education.map((edu) => ({
//       education_id: edu.education_id || null,  // Send education_id if available, otherwise null
//       institution: edu.institution,
//       degree: edu.degree, // Send the degree, whether it is a predefined option or a custom value
//       field_of_study: edu.field_of_study,
//       start_date: edu.start_date,
//       end_date: edu.end_date,
//       grade: edu.grade,
//       description: edu.description,
//     })),
//   };

//   fetch('http://localhost:3000/submit-education', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(educationData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Success:', data);
//       if (onNext) onNext();
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// };



//   if (!isLoaded || !user) {
//     return <div>Loading user data...</div>;
//   }

// const handleDegreeChange = (index, selectedOption) => {
//   const selectedValue = selectedOption ? selectedOption.value : "";
  
//   setEducation((prevEducation) => {
//     const updatedEducation = [...prevEducation];
    
//     // If "Other" is selected, reset degree field to an empty string to allow custom input
//     if (selectedValue === "Other") {
//       updatedEducation[index].degree = "";  // Allow the user to type their own degree
//     } else {
//       updatedEducation[index].degree = selectedValue;
//     }

//     return updatedEducation;
//   });
// };




//   return (
//     <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-6 p-4 sm:p-6 ">
//   <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Educational Details</h2>

//   <div className="space-y-6">
//     {education.map((edu, index) => (
//       <div key={index} className="space-y-4">
//         <h3 className="text-lg font-medium text-gray-700">Education {index + 1}</h3>

//         <div className="space-y-4">
//           {/* Institution */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
//             <input
//               type="text"
//               name="institution"
//               value={edu.institution}
//               onChange={(e) => handleChange(index, e)}
//               placeholder="Enter Institution Name"
//               className={`w-full border-black  border-b-2 p-3 bg-transparent focus:outline-none ${validationErrors[`institution_${index}`] ? 'border-red-500' : ''}`}
//             />
//             {validationErrors[`institution_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`institution_${index}`]}</p>}
//           </div>

//           {/* Degree */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
//             <select
//               name="degree"
//               value={edu.degree}
//               onChange={(e) => handleDegreeChange(index, e)}
//               className={` w-full p-3 bg-transparent ${validationErrors[`degree_${index}`] ? 'border-red-500' : ''} ${validationErrors[`degree_${index}`] ? 'focus:ring-red-500' : ''} custom-select`}
//             >
//               {degreeOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             {validationErrors[`degree_${index}`] && <p className="text-sm text-red-500">{validationErrors[`degree_${index}`]}</p>}

//             {/* If the selected degree is "Other", show an input field */}
//             {edu.degree === "Other" && (
//               <input
//                 type="text"
//                 name="degree"
//                 value={edu.degree}
//                 onChange={(e) => handleChange(index, e)}
//                 placeholder="Enter your degree"
//                 className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors[`degree_${index}`] ? 'border-red-500' : ''}`}
//               />
//             )}
//           </div>

//           {/* Field of Study with Searchable Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
//             <select
//               name="field_of_study"
//               value={edu.field_of_study}
//               onChange={(e) => handleFieldOfStudyChange(index, e)}
//               className={`w-full border-b-2 border-black p-3  ${validationErrors[`field_of_study_${index}`] ? 'border-red-500' : ''}`}
//             >
//               {fieldOfStudyOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             {validationErrors[`field_of_study_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`field_of_study_${index}`]}</p>}
//           </div>

//           {/* Start and End Dates */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={edu.start_date || ""}
//                 onChange={(e) => handleChange(index, e)}
//                 className={`w-full  bg-transparent border-b-2 border-black p-3 ${validationErrors[`start_date_${index}`] ? 'border-red-500' : ''}`}
//               />
//               {validationErrors[`start_date_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`start_date_${index}`]}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={edu.end_date || ""}
//                 onChange={(e) => handleChange(index, e)}
//                 className={`w-full bg-transparent border-b-2 border-black p-3 ${validationErrors[`end_date_${index}`] ? 'border-red-500' : ''}`}
//               />
//               {validationErrors[`end_date_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`end_date_${index}`]}</p>}
//             </div>
//           </div>

//           {/* Grade */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
//             <input
//               type="text"
//               name="grade"
//               value={edu.grade}
//               onChange={(e) => handleChange(index, e)}
//               placeholder="Enter Grade (e.g.,  8/10)"
//               className={`w-full border-b-2 border-black  p-3 bg-transparent focus:outline-none ${validationErrors[`grade_${index}`] ? 'border-red-500' : ''}`}
//             />
//             {validationErrors[`grade_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`grade_${index}`]}</p>}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               name="description"
//               value={edu.description}
//               onChange={(e) => handleChange(index, e)}
//               placeholder="Enter Description"
//               className={`w-full border-black  border-b-2 p-3 bg-transparent focus:outline-none ${validationErrors[`description_${index}`] ? 'border-red-500' : ''}`}
//             />
//             {validationErrors[`description_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`description_${index}`]}</p>}
//           </div>

//           {/* Remove Education Button */}
//           <div className="flex justify-between mt-4 hover:cursor-pointer"  onClick={() => handleRemoveEducation(index)} >
//             {education.length > 1 && (
//               <div className="flex gap-1 items-center">
//                 <button
//                 type="button"
               
//                 className=" text-red-500 py-2 px-4 rounded-md"
//               >
//                 Remove Education
//               </button>
              
//               <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="bi bi-trash3"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     ))}

//     {/* Add More Education Button */}
//     <div className="flex md:w-[30vw] lg:w-[20vw] gap-3 bg-blue-900 text-white rounded-br-3xl rounded-tl-3xl justify-center items-center" onClick={handleAddEducation}>
//       <div className="">
//         <button
//           type="button"
          
//           className="p-3"
//         >
//           Add More Education
//         </button>
//       </div>

      
//       <div className="hover:cursor-pointer">
//         <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
//           <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
//         </svg>
        
//       </div>
//     </div>

//     {/* Submit Button */}
//     <div className="mt-8 flex justify-center">
//       <button
//         type="submit"
//         className="bg-black text-white py-2 px-8 rounded-md"
//       >
//         Submit Education
//       </button>
//     </div>
//   </div>
// </form>

//   );
// };

// export default Education;


'use client'

import React, { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, GraduationCap, Plus, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import GradualSpacing from "../components/ui/gradual-spacing";

 const degreeOptions = [
  { value: "Other", label: "Other" },
  { value: "B.Sc", label: "B.Sc" },
  { value: "B.Tech", label: "B.Tech" },
  { value: "M.Sc", label: "M.Sc" },
  { value: "M.Tech", label: "M.Tech" },
  { value: "Ph.D", label: "Ph.D" },
  { value: "MBA", label: "MBA" },
  { value: "BA", label: "BA" },
  { value: "MA", label: "MA" },
  { value: "BCA", label: "BCA" },
  { value: "MCA", label: "MCA" },
  { value: "MS", label: "MS" },
  { value: "BBA", label: "BBA" },
  { value: "LLB", label: "LLB" },
  { value: "LLM", label: "LLM" },
  { value: "BDS", label: "BDS" },
  { value: "MBBS", label: "MBBS" },
  { value: "DPharm", label: "DPharm" },
  { value: "BPT", label: "BPT" },
  { value: "MPT", label: "MPT" },
  { value: "BAMS", label: "BAMS" },
  { value: "MD", label: "MD" },
  { value: "MDS", label: "MDS" },
  { value: "BFA", label: "BFA" },
  { value: "MFA", label: "MFA" },
  { value: "B.E", label: "B.E" },
  { value: "MEng", label: "MEng" },
  { value: "BDes", label: "BDes" },
  { value: "MDes", label: "MDes" },
  { value: "DSc", label: "DSc" },
  { value: "B.Ed", label: "B.Ed" },
  { value: "M.Ed", label: "M.Ed" },
  { value: "BPharm", label: "BPharm" },
  { value: "MPharm", label: "MPharm" },
  { value: "BArch", label: "BArch" },
  { value: "MArch", label: "MArch" },
  { value: "BIM", label: "BIM" },
  { value: "MIM", label: "MIM" },
  { value: "BScN", label: "BScN" }, // Bachelor of Science in Nursing
  { value: "MScN", label: "MScN" }, // Master of Science in Nursing
  { value: "DPT", label: "DPT" }, // Doctor of Physical Therapy
  { value: "BPA", label: "BPA" }, // Bachelor of Public Administration
  { value: "MPA", label: "MPA" }, // Master of Public Administration
  { value: "BBA(Law)", label: "BBA(Law)" }, // Bachelor of Business Administration in Law
  { value: "MPhil", label: "MPhil" }, // Master of Philosophy
  { value: "BCom", label: "BCom" }, // Bachelor of Commerce
  { value: "MCom", label: "MCom" }, // Master of Commerce
  { value: "BHM", label: "BHM" }, // Bachelor of Hotel Management
  { value: "MHM", label: "MHM" }, // Master of Hotel Management
  { value: "BTech (Honours)", label: "BTech (Honours)" },
  { value: "MTech (Honours)", label: "MTech (Honours)" },
  { value: "BSc (Honours)", label: "BSc (Honours)" },
  { value: "MSc (Honours)", label: "MSc (Honours)" },
  { value: "BCA (Honours)", label: "BCA (Honours)" },
  { value: "MCA (Honours)", label: "MCA (Honours)" },

  // Diploma Degrees
  { value: "Diploma in Engineering", label: "Diploma in Engineering" },
  { value: "Diploma in Computer Science", label: "Diploma in Computer Science" },
  { value: "Diploma in Nursing", label: "Diploma in Nursing" },
  { value: "Diploma in Pharmacy", label: "Diploma in Pharmacy" },
  { value: "Diploma in Mechanical Engineering", label: "Diploma in Mechanical Engineering" },
  { value: "Diploma in Civil Engineering", label: "Diploma in Civil Engineering" },
  { value: "Diploma in Electrical Engineering", label: "Diploma in Electrical Engineering" },
  { value: "Diploma in Hospitality Management", label: "Diploma in Hospitality Management" },
  { value: "Diploma in Business Administration", label: "Diploma in Business Administration" },
  { value: "Diploma in Web Design", label: "Diploma in Web Design" },
  { value: "Diploma in Graphic Design", label: "Diploma in Graphic Design" },
  { value: "Diploma in Fashion Design", label: "Diploma in Fashion Design" },
  { value: "Diploma in Digital Marketing", label: "Diploma in Digital Marketing" },
  { value: "Diploma in Automobile Engineering", label: "Diploma in Automobile Engineering" },
  { value: "Diploma in Data Science", label: "Diploma in Data Science" },
  { value: "Diploma in Accounting", label: "Diploma in Accounting" },
  { value: "Diploma in Interior Design", label: "Diploma in Interior Design" },
  { value: "Diploma in Multimedia", label: "Diploma in Multimedia" },
  { value: "Diploma in Electronics and Communication", label: "Diploma in Electronics and Communication" },
  { value: "Diploma in Marketing", label: "Diploma in Marketing" },
  { value: "Diploma in Mechanical Drafting", label: "Diploma in Mechanical Drafting" },
  { value: "Diploma in Automation Engineering", label: "Diploma in Automation Engineering" },
  { value: "Diploma in Paramedics", label: "Diploma in Paramedics" },
  { value: "Diploma in Event Management", label: "Diploma in Event Management" },
  { value: "BBA(Finance)", label: "BBA(Finance)" }, // Bachelor of Business Administration in Finance
{ value: "BBA(HR)", label: "BBA(HR)" }, // Bachelor of Business Administration in Human Resources
{ value: "MBA(Finance)", label: "MBA(Finance)" }, // MBA in Finance
{ value: "MBA(Marketing)", label: "MBA(Marketing)" }, // MBA in Marketing
{ value: "MBA(HR)", label: "MBA(HR)" }, // MBA in Human Resources
{ value: "B.Sc IT", label: "B.Sc IT" }, // Bachelor of Science in Information Technology
{ value: "M.Sc IT", label: "M.Sc IT" }, // Master of Science in Information Technology
{ value: "BBA(International Business)", label: "BBA(International Business)" }, 
{ value: "M.Tech AI", label: "M.Tech AI" }, // Master of Technology in Artificial Intelligence
{ value: "M.Tech Robotics", label: "M.Tech Robotics" }, // Robotics specialization
{ value: "BEng Software Engineering", label: "BEng Software Engineering" },
{ value: "BEng Electronics", label: "BEng Electronics" }, 
{ value: "PGDM", label: "PGDM" }, // Post Graduate Diploma in Management
{ value: "PGDBA", label: "PGDBA" }, // Post Graduate Diploma in Business Analytics
{ value: "PGDHRM", label: "PGDHRM" }, // Post Graduate Diploma in Human Resource Management
{ value: "MCA(Cloud Computing)", label: "MCA(Cloud Computing)" }, // MCA specialization
{ value: "MS Data Science", label: "MS Data Science" }, 
{ value: "MS Cybersecurity", label: "MS Cybersecurity" }, 
{ value: "MD Radiology", label: "MD Radiology" }, 
{ value: "MD Pediatrics", label: "MD Pediatrics" }, 
{ value: "MDS Orthodontics", label: "MDS Orthodontics" },
{ value: "LLB Corporate Law", label: "LLB Corporate Law" }, // Law specialization
{ value: "LLM International Law", label: "LLM International Law" }, // Master of Law specialization
{ value: "Diploma in Cloud Computing", label: "Diploma in Cloud Computing" }, 
{ value: "Diploma in Blockchain", label: "Diploma in Blockchain" }, 
{ value: "Diploma in Artificial Intelligence", label: "Diploma in Artificial Intelligence" }, 
{ value: "Diploma in Cyber Security", label: "Diploma in Cyber Security" },
{ value: "BSc Mathematics", label: "BSc Mathematics" }, 
{ value: "MSc Statistics", label: "MSc Statistics" },
{ value: "MFA Visual Arts", label: "MFA Visual Arts" },
{ value: "BFA Applied Arts", label: "BFA Applied Arts" },
{ value: "BTech Biomedical Engineering", label: "BTech Biomedical Engineering" },
{ value: "Diploma in AI and ML", label: "Diploma in AI and ML" }, // Machine Learning and AI


];


  const fieldOfStudyOptions = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Data Science", label: "Data Science" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Network Engineering", label: "Network Engineering" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Web Development", label: "Web Development" },
  { value: "Mobile App Development", label: "Mobile App Development" },
  { value: "Game Development", label: "Game Development" },
  { value: "Database Administration", label: "Database Administration" },
  
  // Additional fields of study
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Information Systems", label: "Information Systems" },
  { value: "Business Analytics", label: "Business Analytics" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Blockchain Technology", label: "Blockchain Technology" },
  { value: "Robotics", label: "Robotics" },
  { value: "Cloud Architecture", label: "Cloud Architecture" },
  { value: "DevOps", label: "DevOps" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Virtual Reality", label: "Virtual Reality" },
  { value: "Augmented Reality", label: "Augmented Reality" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Data Engineering", label: "Data Engineering" },
  { value: "Computer Graphics", label: "Computer Graphics" },
  { value: "Embedded Systems", label: "Embedded Systems" },
  { value: "Artificial Neural Networks", label: "Artificial Neural Networks" },
  { value: "Ethical Hacking", label: "Ethical Hacking" },
  { value: "Game Design", label: "Game Design" },
  { value: "Natural Language Processing", label: "Natural Language Processing" },
  { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
  { value: "Mobile Computing", label: "Mobile Computing" },
  { value: "Human-Computer Interaction", label: "Human-Computer Interaction" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Cloud Security", label: "Cloud Security" },
  { value: "Quantum Computing", label: "Quantum Computing" },
  { value: "IT Management", label: "IT Management" },
  { value: "Software Testing", label: "Software Testing" },
  { value: "Big Data", label: "Big Data" },
  { value: "Network Security", label: "Network Security" },
  { value: "Bioinformatics", label: "Bioinformatics" },
  { value: "Digital Transformation", label: "Digital Transformation" },
  { value: "Telecommunications", label: "Telecommunications" },
  { value: "Artificial Intelligence Ethics", label: "Artificial Intelligence Ethics" },
  { value: "Data Visualization", label: "Data Visualization" },
  { value: "System Architecture", label: "System Architecture" },
  { value: "E-Government", label: "E-Government" },
  { value: "Computer Forensics", label: "Computer Forensics" }
];

const Education = ({ onNext }) => {
  const { user, isLoaded } = useUser()
  const [education, setEducation] = useState([
    {
      education_id: "",
      institution: "",
      degree: "",
      field_of_study: "",
      start_date: "",
      end_date: "",
      grade: "",
      description: "",
    },
  ])
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('basic')
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "" : date.toISOString().split('T')[0]
  }

  useEffect(() => {
    if (isLoaded && user) {
      const fetchEducationData = async () => {
        setIsFetching(true)  // Set fetching state to true before the fetch starts
        const userId = user.primaryEmailAddress?.emailAddress
        if (!userId) {
          console.error("User not signed in.")
          return
        }

        try {
          const response = await axios.get(`http://localhost:3000/api/education/${userId}`)
          if (response.data.education && response.data.education.length > 0) {
            const formattedEducation = response.data.education.map((edu) => ({
              ...edu,
              start_date: formatDate(edu.start_date),
              end_date: formatDate(edu.end_date),
            }))
            setEducation(formattedEducation)
          }
        } catch (error) {
          console.error("Error fetching education data:", error)
        } finally {
          setIsFetching(false)  // Set fetching state to false after the fetch is complete
        }
      }

      fetchEducationData()
    }
  }, [isLoaded, user])

  const handleChange = (index, name, value) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation]
      updatedEducation[index][name] = value
      return updatedEducation
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      if (value) delete newErrors[`${name}_${index}`]
      return newErrors
    })
  }

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        education_id: "",
        institution: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        grade: "",
        description: "",
      },
    ])
  }

  const handleRemoveEducation = async (index) => {
    const educationToRemove = education[index]
    if (educationToRemove.education_id) {
      try {
        const userId = user.primaryEmailAddress?.emailAddress
        if (!userId) {
          console.error("User not signed in.")
          return
        }

        await axios.delete(`http://localhost:3000/api/education/${userId}/${educationToRemove.education_id}`)

        setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index))

        const response = await axios.get(`http://localhost:3000/api/education/${userId}`)
        if (response.data.education && response.data.education.length > 0) {
          const formattedEducation = response.data.education.map((edu) => ({
            ...edu,
            start_date: formatDate(edu.start_date),
            end_date: formatDate(edu.end_date),
          }))
          setEducation(formattedEducation)
        }
      } catch (error) {
        console.error("Error deleting education record:", error)
      }
    } else {
      setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index))
    }
  }

  const validateFields = () => {
    const newErrors = {}
    education.forEach((edu, index) => {
      if (!edu.institution) newErrors[`institution_${index}`] = "Institution is required"
      if (!edu.degree && edu.degree !== "Other") newErrors[`degree_${index}`] = "Degree is required"
      if (!edu.field_of_study) newErrors[`field_of_study_${index}`] = "Field of study is required"
      if (!edu.start_date) newErrors[`start_date_${index}`] = "Start date is required"
      if (!edu.end_date) newErrors[`end_date_${index}`] = "End date is required"
      if (!edu.grade) {
        newErrors[`grade_${index}`] = "Grade is required"
      } else if (edu.grade < 0 || edu.grade > 10) {
        newErrors[`grade_${index}`] = "Grade must be between 0 and 10"
      }
      if (!edu.description) newErrors[`description_${index}`] = "Description is required"
    })
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateFields()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!isLoaded || !user) {
      console.error("User data is not loaded yet. Please wait.")
      return
    }

    const userId = user.primaryEmailAddress?.emailAddress
    if (!userId) {
      console.error("User email is not available. Please sign in.")
      return
    }

    setLoading(true)  // Start the loader

    try {
      const educationData = {
        user_id: userId,
        education: education.map((edu) => ({
          education_id: edu.education_id || null,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.field_of_study,
          start_date: edu.start_date,
          end_date: edu.end_date,
          grade: edu.grade,
          description: edu.description,
        })),
      }

      await axios.post('http://localhost:3000/submit-education', educationData)
      console.log("Education data saved successfully.")
      if (onNext) onNext()
    } catch (error) {
      console.error("Error sending data to server:", error)
    } finally {
      setLoading(false)  // Stop the loader
    }
  }

  if (!isLoaded) {
    return <div>Loading user data...</div>
  }

  return (

    <div className="container md:mx-auto md:px-4 md:py-8">
        <div className="flex-grow">
      {isFetching ? (
        <div className="flex items-center justify-center">
          {/* Spinner */}
          <div className="spinner-border animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
          <span className="ml-2">fetching...</span>
        </div>
      ) : (
        <Card className="w-full md:max-w-4xl md:mx-auto">
        <CardHeader>
        <GradualSpacing
          className="text-xl md:text-3xl font-bold -tracking-widest text-left text-black dark:text-white"
          text="Education"
        />
          
          <CardDescription>Add your educational qualifications and achievements.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="md:space-y-6 md:max-h-[60vh] md:overflow-y-auto md:pr-4">
              {education.map((edu, index) => (
                <Card key={index} className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <GraduationCap className="mr-2" />
                      Education {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="hidden md:grid w-full grid-cols-3">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="description">Description</TabsTrigger>
                      </TabsList>

                      <TabsList className="md:hidden grid w-full grid-cols-3">
                        <TabsTrigger value="basic">1</TabsTrigger>
                        <TabsTrigger value="details">2</TabsTrigger>
                        <TabsTrigger value="description">3</TabsTrigger>
                      </TabsList>
                      <TabsContent value="basic">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`institution_${index}`}>Institution</Label>
                            <Input
                              id={`institution_${index}`}
                              value={edu.institution}
                              onChange={(e) => handleChange(index, "institution", e.target.value)}
                              placeholder="e.g. Harvard University"
                              className="text-sm"
                            />
                            {errors[`institution_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`institution_${index}`]}</p>}
                          </div>
                          <div>
                            <Label htmlFor={`degree_${index}`}>Degree</Label>
                            <Select onValueChange={(value) => handleChange(index, "degree", value)} value={edu.degree}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select degree" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-200 text-sm">
                                {degreeOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors[`degree_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`degree_${index}`]}</p>}
                          </div>
                          <div>
                            <Label htmlFor={`field_of_study_${index}`}>Field of Study</Label>
                            <Select onValueChange={(value) => handleChange(index, "field_of_study", value)} value={edu.field_of_study}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select field of study" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-200 text-sm">
                                {fieldOfStudyOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors[`field_of_study_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`field_of_study_${index}`]}</p>}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="details">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`start_date_${index}`}>Start Date</Label>
                            <Input
                              id={`start_date_${index}`}
                              type="date"
                              value={edu.start_date}
                              onChange={(e) => handleChange(index, "start_date", e.target.value)}
                              className="text-sm"
                            />
                            {errors[`start_date_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`start_date_${index}`]}</p>}
                          </div>
                          <div>
                            <Label htmlFor={`end_date_${index}`}>End Date</Label>
                            <Input
                              id={`end_date_${index}`}
                              type="date"
                              value={edu.end_date}
                              onChange={(e) => handleChange(index, "end_date", e.target.value)}
                              className="text-sm"
                            />
                            {errors[`end_date_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`end_date_${index}`]}</p>}
                          </div>
                          <div>
                            <Label htmlFor={`grade_${index}`}>Grade</Label>
                            <Input
                              id={`grade_${index}`}
                              type="number"
                              min="0"
                              max="10"
                              value={edu.grade}
                              onChange={(e) => handleChange(index, "grade", e.target.value)}
                              className="text-sm"
                            />
                            {errors[`grade_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`grade_${index}`]}</p>}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="description">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`description_${index}`}>Description</Label>
                            <Textarea
                              id={`description_${index}`}
                              value={edu.description}
                              onChange={(e) => handleChange(index, "description", e.target.value)}
                              placeholder="Write about your experience"
                              className="text-sm"
                            />
                            {errors[`description_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`description_${index}`]}</p>}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="danger" onClick={() => handleRemoveEducation(index)}>
                      <Trash2 className="mr-2" /> Remove Education
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Button type="button" variant="outline" onClick={handleAddEducation}>
              <Plus className="mr-2" /> Add Education
            </Button>
            <div className="mt-4 w-full">
  <Button 
    onClick={handleSubmit} 
    className="w-full" 
    disabled={loading}  // Disable button while loading
  >
    {loading ? (
      <div className="flex items-center justify-center">
        <div className="spinner-border animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        <span className="ml-2">Submitting...</span>
      </div>
    ) : (
      "Save Projects and Continue"
    )}
  </Button>
</div>

          </form>
        </CardContent>
      </Card>
      )}
    </div>
      
    </div>
  )
}

export default Education



