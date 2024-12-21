// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Briefcase, GraduationCap, Code, Award, User, ChevronDown } from 'lucide-react';
// import { useUser } from "@clerk/clerk-react";
// import axios from 'axios';
// import { Bar, Pie , Line , Radar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale,  PointElement, LineElement,  BarElement, Title, Tooltip, Legend , ArcElement} from 'chart.js';

// ChartJS.register(
//   CategoryScale, 
//   LinearScale, 
//   BarElement, 
//   Title, 
//   Tooltip, 
//   Legend,
//   RadialLinearScale,
//   PointElement, 
//   LineElement, 
//   ArcElement 
// );

// export default function FinalPort() {
//   const { user } = useUser();
//   const [activeSection, setActiveSection] = useState('experience');
//   const [experiences, setExperiences] = useState([]);  // Work experience
//   const [personalInfo, setPersonalInfo] = useState(null); // User's personal information
//   const [loading, setLoading] = useState(true); // State to track loading
//   const [skills, setSkills] = useState([]); // User skills
//   const [loadingSkills, setLoadingSkills] = useState(true); // Loading state for skills
//   const [education, setEducation] = useState([]); // Education details
//   const [projectSections, setProjectSections] = useState([]); // Project sections
//   const [certifications, setCertifications] = useState([]); // Certifications
   

// const [showDashboard, setShowDashboard] = useState(false);
//  const handleToggleDashboard = () => {
//     setShowDashboard(!showDashboard);
//   };
//   // States for chart data
//   const [yearsData, setYearsData] = useState([]);
//   const [techData, setTechData] = useState([]);
  
 

// // for eductional charts 
//  const [eduData, setEduData] = useState([]);  // State for education data
//  const [showEduDashboard, setShowEduDashboard] = useState(false); 
 
 

//   // Function to fetch work experience from the backend
//  const fetchWorkExperience = async () => {
//     try {
//       const user_id = user.primaryEmailAddress?.emailAddress;
//       if (!user_id) {
//         throw new Error('User ID is missing.');
//       }

//       const response = await fetch(`http://localhost:3000/api/final-work-experience?user_id=${user_id}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch work experience');
//       }

//       const data = await response.json();
//       setExperiences(data); // Set experiences

//       // Calculate years of experience
//       const years = data.map((exp) => {
//         const startYear = new Date(exp.start_date).getFullYear();
//         const endYear = exp.end_date ? new Date(exp.end_date).getFullYear() : new Date().getFullYear();
//         return endYear - startYear;
//       });

//       // Calculate technologies usage
//       const techCounts = data.reduce((acc, exp) => {
//         const technologies = exp.technologies ? exp.technologies.split(',') : [];
//         technologies.forEach((tech) => {
//           acc[tech] = (acc[tech] || 0) + 1;
//         });
//         return acc;
//       }, {});

//       setYearsData(years);
//       setTechData(techCounts);
//     } catch (error) {
//       console.error('Error fetching work experience:', error);
//     }
//   };

// const barChartData = {
//   labels: experiences.map((exp) => exp.job_title),
//   datasets: [
//     {
//       label: 'Years of Experience',
//       data: yearsData,
//       backgroundColor: 'rgb(147, 51, 234)',
//       borderColor: 'rgba(54, 162, 235, 1)',
//       borderWidth: 1,
//     },
//   ],
// };


//   const barChartOptions = {
//   responsive: true,
//   scales: {
//     x: {
//       title: {
//         display: true,
//         text: 'Job Title', // Label for the x-axis
//       },
//     },
//     y: {
//       title: {
//         display: true,
//         text: 'Years of Experience', // Label for the y-axis
//       },
//       beginAtZero: true, // Ensure that the y-axis starts at 0
//     },
//   },
// };



//   // Prepare data for pie chart (technology distribution)
//   const pieChartData = {
//     labels: Object.keys(techData),
//     datasets: [
//       {
//         data: Object.values(techData),
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
//       },
//     ],
//   };

//   const lineChartData = {
//   labels: experiences.map((exp) => exp.job_title),
//   datasets: [
//     {
//       label: 'Years of Experience Over Time',
//       data: yearsData,
//       fill: false,
//       borderColor: '#36A2EB',
//       tension: 0.1,
//     },
//   ],
// };

// const lineChartOptions = {
//   responsive: true,
//   scales: {
//     x: {
//       title: {
//         display: true,
//         text: 'Job Title',
//       },
//     },
//     y: {
//       title: {
//         display: true,
//         text: 'Years of Experience',
//       },
//       beginAtZero: true,
//     },
//   },
// };

// const radarChartData = {
//   labels: Object.keys(techData), // Technology names
//   datasets: [
//     {
//       label: 'Technologies Used Across Roles',
//       data: Object.values(techData), // Frequency of usage for each tech
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     },
//   ],
// };

// const radarChartOptions = {
//   responsive: true,
//   scales: {
//     r: {
//       angleLines: {
//         display: false,
//       },
//       suggestedMin: 0,
//       suggestedMax: Math.max(...Object.values(techData)) + 1, // Dynamic range for technology usage
//     },
//   },
// };
  

//   const fetchPersonalInfo = async () => {
//     try {
//       const user_id = user.primaryEmailAddress?.emailAddress;

//       if (!user_id) {
//         throw new Error('User ID is missing.');
//       }

//       // Fetch personal info
//       const response = await fetch(`http://localhost:3000/api/personal-info?user_id=${user_id}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch personal info');
//       }

//       const data = await response.json();
//       console.log('Fetched personal data:', data); // Log the fetched data
      
//       setPersonalInfo(data);  // Update state with the fetched personal data
//       setLoading(false);  // Set loading to false once data is fetched
//     } catch (error) {
//       console.error('Error fetching personal info:', error);
//       setLoading(false);  // Set loading to false even if an error occurs
//     }
//   };

//   const fetchUserSkills = async () => {
//     try {
//       const user_id = user.primaryEmailAddress?.emailAddress;

//       if (!user_id) {
//         throw new Error('User ID is missing.');
//       }

//       // Fetch user skills data
//       const response = await fetch(`http://localhost:3000/api/skills/${user_id}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch skills');
//       }

//       const data = await response.json();
//       console.log('Fetched skills:', data);

//       setSkills(data);  // Update state with fetched skills
//       setLoadingSkills(false);  // Set loadingSkills to false once skills are fetched
//     } catch (error) {
//       console.error('Error fetching user skills:', error);
//       setError(error.message);  // Set error message
//       setLoadingSkills(false);  // Set loadingSkills to false if an error occurs
//     }
//   };

//   const fetchEducationData = async () => {
//   const userId = user.primaryEmailAddress?.emailAddress;
//   if (!userId) {
//     alert("User not signed in.");
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:3000/api/education/${userId}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('Fetched education data:', data);
//     setEducation(data.education || []);
//     setEduData(data.education || []);
//   } catch (error) {
//     console.error('Error fetching education data:', error);
//     alert(`Error fetching education data: ${error.message}`);
//   }
// };

 

//   const fetchProjects = async () => {
//   try {
//     const user_id = user.primaryEmailAddress?.emailAddress;

//     if (!user_id) {
//       throw new Error('User ID is missing.');
//     }

//     const response = await axios.get("http://localhost:3000/api/projects", {
//       params: { user_id: user_id }, 
//     });

//     if (response.data.length > 0) {
//       console.log("Fetched Projects:", response.data); 
//       setProjectSections(response.data.map((project, index) => ({
//         ...project,
//         id: index + 1,
//       })));
//     } else {
//       console.log("No projects found.");
//     }
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     alert("Failed to load projects.");
//   }
// };

// const fetchCertifications = async () => {
//   const user_id = user.primaryEmailAddress?.emailAddress;
  
//   if (!user_id) {
//     alert('User ID is missing.');
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:3000/api/certifications/${user_id}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch certifications');
//     }
    
//     const data = await response.json();
//     console.log(data);
//     setCertifications(data);
//   } catch (error) {
//     console.error('Error fetching certifications:', error);
//   }
// };

//   // Fetch work experience when the component mounts
//   useEffect(() => {
//     fetchWorkExperience();
//     fetchPersonalInfo();
//     fetchUserSkills();
//     fetchEducationData();
//     fetchProjects();
//     fetchCertifications();
//   },[user]); 

//    const handleToggleEduDashboard = () => {
//     setShowEduDashboard(!showEduDashboard);
//   };


//   const eduBarChartData = {
//     labels: eduData.map(edu => edu.degree),
//     datasets: [{
//       label: 'CGPA Distribution',
//       data: eduData.map(edu => parseFloat(edu.grade)),
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     }]
//   };

//   const eduBarChartOptions = {
//   responsive: true,
//   scales: {
//     y: {
//       min: 0,  // Optional: sets minimum value to 0 for the y-axis
//       max: 10, // Ensures the max value on the y-axis is 10
//       ticks: {
//         stepSize: 1,  // Optional: defines the step size for each tick (optional for readability)
//       }
//     }
//   }
// };

//   const eduLineChartData = {
//     labels: eduData.map(edu => new Date(edu.start_date).getFullYear()),
//     datasets: [{
//       label: 'Education Timeline',
//       data: eduData.map(edu => new Date(edu.end_date || Date.now()).getFullYear() - new Date(edu.start_date).getFullYear()),
//       fill: false,
//       borderColor: 'rgba(75, 192, 192, 1)',
//       tension: 0.1
//     }]
//   };

//   const eduPieChartData = {
//     labels: eduData.map(edu => edu.field_of_study),
//     datasets: [{
//       data: eduData.map(() => 1),  // Here, each field of study gets 1 count
//       backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
//       hoverOffset: 4
//     }]
//   };


  



  
//   return (
//     <div className="min-h-screen w-full bg-black text-white">
//       {loading ? (
        
//         //  loading true
//         <div>loading...</div>
      
//     ) : (
//       <>
      
      
//       <header className="bg-gradient-to-r bg-black text-white py-20">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-8 md:mb-0 text-center md:text-right">
//               <div className="flex gap-3 text-center">
//                 <h1 className="text-4xl font-bold mb-2">{personalInfo?.first_name}</h1>
//                 <h1 className="text-4xl font-bold mb-2">{personalInfo?.last_name}</h1>
//               </div>
//               <p className="text-xl opacity-90">{personalInfo?.professional_title}</p>
             
//               {/* <div className="">
//                 <a href={`mailto:${personalInfo?.email}`} className="text-white hover:text-gray-200 transition">{personalInfo?.email}</a>
//               </div>
//               <div className="">
//                 <a href={`tel: +91 ${personalInfo.mobile_number}`} className="text-white hover:text-gray-200 transition">{personalInfo.mobile_number}</a>
//               </div> */}
              

//             </div>
            
//             <motion.div
//               className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             >
//               {personalInfo?.profile_picture ? (
//                   <img
//                     src={`http://localhost:3000/uploads/${personalInfo.profile_picture}`}
//                     alt="Profile"
//                     className="object-cover w-full h-full"
//                   />
//                 ) : (
//                   <div>Loading image...</div> 
//                 )}
//             </motion.div>
//           </div>
//           <div className="mt-3 lg:mt-5">
//               <p>{personalInfo.summary}</p>
//           </div>
//         </div>
//       </header>

//       <nav className="bg-[#e5e5e5]  shadow-md py-4 sticky top-0 z-10">
//         <div className="container mx-auto px-4">
//           <ul className="flex justify-center flex-wrap space-x-6">
//             {['experience', 'skills', 'education', 'projects', 'certifications'].map((section) => (
//               <li key={section}>
//                 <button
//                   onClick={() => setActiveSection(section)}
//                   className={`text-lg font-medium capitalize ${activeSection === section ? 'text-white  border-none rounded-3xl px-5 py-1 bg-purple-600' : 'text-black '} transition`}
//                 >
//                   {section}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>

//       <main className="container mx-auto px-4 py-12">
//         {/* Experience Section */}
//           <motion.section
//   className={`mb-16 ${activeSection !== 'experience' && 'hidden'}`}
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
// >
//   <div className="flex items-center justify-between mb-6">
//     <div className="flex gap-3 items-center">
//       <Briefcase className="mr-2" />
//     <h2 className="text-3xl font-bold text-white">
//        Experience
//     </h2>
//     </div>
//     <button
//       onClick={handleToggleDashboard}
//       className="px-6 py-2 bg-[#e5e5e5] text-black rounded-lg shadow-md hover:shadow-xl transition ease-in-out duration-300"
//     >
//       {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
//     </button>
//   </div>

//   <div className="space-y-8">
//     {/* Show Experience Data initially */}
//     {!showDashboard && (
//       <>
//         {experiences.length === 0 ? (
//           <p className="text-center text-lg font-semibold text-gray-500">No work experience found.</p>
//         ) : (
//           experiences.map((exp, index) => (
//             <motion.section
//               key={index}
//               className="mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex flex-col sm:flex-row justify-between items-center">
//                 <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
//                   <Briefcase className="mr-2" /> {exp.job_title}
//                 </h3>
//               </div>
//               <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//                 <p className="mb-2 font-bold text-lg text-white">{exp.company}</p>
//                 <p className="text-sm text-white mb-4">
//                   {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}
//                 </p>
//                 <p className="mb-2 font-semibold text-white">Description:</p>
//                 <p className="text-white mb-4">{exp.description}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {exp.technologies &&
//                     exp.technologies.split(',').map((tech, idx) => (
//                       <span key={idx} className="bg-purple-100 text-purple-600 text-sm px-3 py-1 rounded-full">
//                         {tech}
//                       </span>
//                     ))}
//                 </div>
//                 <p className="mb-2 mt-4 font-semibold text-white">Achievements</p>
//                 <p className="text-white">{exp.achievements}</p>
//               </div>
//             </motion.section>
//           ))
//         )}
//       </>
//     )}

//     {/* Show Dashboard if enabled */}
//     {showDashboard && (
//       <>
//         {/* Bar Chart for Years of Experience */}
//         {experiences.length > 0 && (
//           <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//             <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Years of Experience</h3>
//             <Bar data={barChartData} options={barChartOptions} />
//           </div>
//         )}

//         {/* Pie Chart for Technologies Used */}
//         {Object.keys(techData).length > 0 && (
//           <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//             <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Technologies Used</h3>
//             <Pie data={pieChartData} options={{ responsive: true }} className='w-full' />
//           </div>
//         )}

//         {/* Line Chart for Years of Experience Over Time */}
//         {experiences.length > 0 && (
//           <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//             <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Years of Experience Over Time</h3>
//             <Line data={lineChartData} options={lineChartOptions} />
//           </div>
//         )}

//         {/* Radar Chart for Technologies Used */}
//         {Object.keys(techData).length > 0 && (
//           <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//             <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Technologies Used Across Roles</h3>
//             <Radar data={radarChartData} options={radarChartOptions} />
//           </div>
//         )}
//       </>
//     )}
//   </div>
// </motion.section>


      

//         {/* Skills Section */}
//         <motion.section
//           className={`mb-16 ${activeSection !== 'skills' && 'hidden'}`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
//             <Code className="mr-2" /> Skills
//           </h2>

//           {/* data here to be added */}
          
          
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {skills.map((skill, index) => (
//             <motion.div
//               key={index}
//               className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-white">{skill.skill_name}</h3>
//                 <span className="bg-white text-purple-600 text-xs px-2 py-1 rounded-full">
//                   {skill.proficiency}%
//                 </span>
//               </div>

//               <div className="relative pt-1">
//                 <div className="flex mb-2 items-center justify-between">
//                   <span className="text-xs font-semibold text-purple-200">Proficiency</span>
//                 </div>
//                 <div className="flex mb-4 items-center">
//                   <div className="w-full bg-purple-200 rounded-full h-2.5">
//                     <div
//                       className="bg-purple-600 h-2.5 rounded-full"
//                       style={{ width: `${skill.proficiency}%` }}
//                     ></div>
//                   </div>
//                   <span className="ml-2 text-sm text-purple-200">{skill.proficiency}%</span>
//                 </div>
//               </div>

//               <div className="flex justify-start items-center gap-3 mt-4">
//                 <span className="bg-white text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
//                   <Code className="inline-block mr-1" size={16} />
//                   <span>{skill.skill_name}</span>
//                 </span>
//               </div>
//             </motion.div>
//           ))}

//           </div>
//         </motion.section>

          
        

//         {/* Education Section */}
//         <motion.section
//           className={`mb-16 ${activeSection !== 'education' && 'hidden'}`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex justify-between">
//             <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
//             <GraduationCap className="mr-2" /> Education
//           </h2>

//            <div className="text-center mb-6">
//               <button
//                 onClick={handleToggleEduDashboard}
//                 className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:shadow-xl transition ease-in-out duration-300"
//               >
//                 {showEduDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
//               </button>
//             </div>
//           </div>
          
//          <div className="space-y-8">
//   {/* Show Dashboard Button */}
 

//   {/* Show Education Data initially */}
//   {!showEduDashboard && (
//     <>
//       {eduData.length === 0 ? (
//         <p className="text-gray-500 text-center text-lg">No education data found.</p>
//       ) : (
//         eduData.map((edu, index) => (
//           <div
//             key={index}
//             className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-95"
//           >
//             <div className="flex flex-col sm:flex-row justify-between items-center">
//               <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
//                 <GraduationCap className="mr-2 text-white" /> {edu.degree}
//               </h3>
//               <p className="text-xl font-semibold text-white">{edu.field_of_study}</p>
//             </div>

//             <p className="font-medium text-lg text-white mb-4">{edu.institution}</p>

//             <div className="mb-4 mt-2 text-sm text-gray-300 font-light">
//               {new Date(edu.start_date).getFullYear()} -{" "}
//               {edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}
//             </div>

//             <p className="text-gray-200 mb-5">{edu.description}</p>

//             <div className="flex justify-between items-center mt-5">
//               <p className="text-yellow-300 font-semibold text-lg">CGPA: {edu.grade}</p>
//               <div className="text-gray-300 text-sm italic">
//                 Graduation Year: {new Date(edu.end_date || Date.now()).getFullYear()}
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </>
//   )}

//   {/* Show Dashboard if enabled */}
//   {showEduDashboard && (
//     <>
//       {/* Bar Chart for CGPA Distribution */}
//       <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//         <h3 className="text-xl font-bold text-center text-purple-600 mb-4">CGPA Distribution</h3>
//         <Bar data={eduBarChartData} options={eduBarChartOptions} />
//       </div>

//       {/* Line Chart for Education Timeline */}
//       <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//         <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Education Timeline</h3>
//         <Line data={eduLineChartData} options={{ responsive: true }} />
//       </div>

//       {/* Pie Chart for Field of Study */}
//       <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
//         <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Field of Study Distribution</h3>
//         <Pie data={eduPieChartData} options={{ responsive: true }} />
//       </div>
//     </>
//   )}
// </div>


//         </motion.section>

//         {/* Projects Section */}
//         <motion.section
//           className={`mb-16 ${activeSection !== 'projects' && 'hidden'}`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
//             <Code className="mr-2" /> Projects
//           </h2>
//           <div className="space-y-8">
//           {projectSections.length === 0 ? (
//             <p className="text-xl font-semibold text-gray-600">No projects found.</p>
//           ) : (
//             projectSections.map((project, index) => (
//               <div key={index} className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-800 p-6 rounded-2xl shadow-xl transform hover:scale-95 hover:shadow-2xl transition-all duration-300 ease-in-out">
//                 <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">{project.name}</h3>
//                 <p className="text-lg text-gray-200 mb-4">{project.description}</p>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-trophy text-yellow-400 text-xl"></i>
//                     <p className="text-xl font-semibold text-gray-300">Achievements:</p>
//                   </div>
//                   <p className="text-sm text-gray-200">{project.achievements}</p>
//                   <hr className="border-gray-500 mb-4" />
                  
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-exclamation-circle text-red-400 text-xl"></i>
//                     <p className="text-xl font-semibold text-gray-300">Challenges:</p>
//                   </div>
//                   <p className="text-sm text-gray-200">{project.challenges}</p>
//                   <hr className="border-gray-500 mb-4" />
                  
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-users text-teal-400 text-xl"></i>
//                     <p className="text-xl font-semibold text-gray-300">Collaborators:</p>
//                   </div>
//                   <p className="text-sm text-gray-200">{project.collaborators}</p>
//                   <hr className="border-gray-500 mb-4" />
                  
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-user-tie text-blue-400 text-xl"></i>
//                     <p className="text-xl font-semibold text-gray-300">Role:</p>
//                   </div>
//                   <p className="text-sm text-gray-200">{project.role}</p>
//                   <hr className="border-gray-500 mb-4" />
                  
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-cogs text-green-400 text-xl"></i>
//                     <p className="text-xl font-semibold text-gray-300">Technologies:</p>
//                   </div>
//                   <p className="text-sm text-gray-200">{project.technologies}</p>
//                   <hr className="border-gray-500 mb-4" />
                  
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-heading text-orange-400 text-xl"></i>
//                     <p className="text-xl font-semibold text-gray-300">Title:</p>
//                   </div>
//                   <p className="text-sm text-gray-200">{project.title}</p>
//                 </div>
                
//                 <div className="mt-4">
//                   <span className="text-yellow-400 font-semibold text-lg">
//                     Duration: {new Date(project.start_date).getFullYear()} - {project.end_date ? new Date(project.end_date).getFullYear() : "Present"}
//                   </span>
//                 </div>
                
//                 <div className="mt-6 flex justify-center">
//                   <button className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 ease-in-out">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>



          
//         </motion.section>

//         {/* Certifications Section */}
//         <motion.section
//   className={`mb-16 ${activeSection !== 'certifications' && 'hidden'}`}
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
// >
//   <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
//     <Award className="mr-2" /> Certifications
//   </h2>

//   <div className="space-y-8">
//     {certifications.length === 0 ? (
//       <p className="text-gray-500 text-center text-lg">No certifications found.</p>
//     ) : (
//       certifications.map((cert, index) => (
//         <div key={index} className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-bold text-white">{cert.name}</h3>
//           <p className="text-lg text-white">{cert.issuer}</p>
//           <p className="text-sm text-gray-300">Issued on: {cert.issue_date}</p>
//           <p className="text-lg text-white">{cert.credential_id}</p>
//           <p className="text-white mb-4">{cert.description}</p>
//           <a href={cert.credential_url} className="text-yellow-400 hover:underline">View Credential</a>
//         </div>
//       ))
//     )}
//   </div>
//         </motion.section>


//       </main>
//       </>
//     )}
     
//       {/* Header / Personal Data */}
      

      
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code, Award, User, ChevronDown, ExternalLink } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';
import { Bar, Pie, Line, Radar, Doughnut  } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  RadialLinearScale,
  PointElement, 
  LineElement, 
  ArcElement 
);

export default function ProfessionalPortfolio() {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('experience');
  const [experiences, setExperiences] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [education, setEducation] = useState([]);
  const [projectSections, setProjectSections] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showEduDashboard, setShowEduDashboard] = useState(false);
  const [yearsData, setYearsData] = useState([]);
  const [techData, setTechData] = useState([]);
  const [eduData, setEduData] = useState([]);
   const [userSkills, setUserSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [skillsError, setSkillsError] = useState(null);
  const [isSkillsDashboardVisible, setIsSkillsDashboardVisible] = useState(false);
 const [isprojectDashboardVisible, setisprojectDashboardVisible] = useState(false);
  const [roleChartData, setRoleChartData] = useState(null);




  

  const fetchWorkExperience = async () => {
  try {
    const user_id = user.primaryEmailAddress?.emailAddress;
    if (!user_id) {
      throw new Error('User ID is missing.');
    }

    const response = await fetch(`https://portfolio-das-try-backend.vercel.app/api/final-work-experience?user_id=${user_id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch work experience');
    }

    const data = await response.json();
    console.log(data)
    setExperiences(data); // Set experiences

    // Sort experiences from most recent to oldest based on start_date or end_date
    const sortedData = data.sort((a, b) => {
      const startA = new Date(a.start_date).getFullYear();
      const startB = new Date(b.start_date).getFullYear();
      return startB - startA; // Sorting by start date (descending order)
    });

    // Calculate years of experience
    const years = sortedData.map((exp) => {
      const startYear = new Date(exp.start_date).getFullYear();
      const endYear = exp.end_date ? new Date(exp.end_date).getFullYear() : new Date().getFullYear();
      return endYear - startYear;
    });

    // Calculate technologies usage
    const techCounts = sortedData.reduce((acc, exp) => {
      const technologies = exp.technologies ? exp.technologies.split(',') : [];
      technologies.forEach((tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
      });
      return acc;
    }, {});

    setYearsData(years);
    setTechData(techCounts);
  } catch (error) {
    console.error('Error fetching work experience:', error);
  }
};


const barChartData = {
  labels: experiences.map((exp) => exp.job_title),
  datasets: [
    {
      label: 'Years of Experience',
      data: yearsData,
      backgroundColor: 'rgb(147, 51, 234)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};


  const barChartOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Job Title', // Label for the x-axis
      },
    },
    y: {
      title: {
        display: true,
        text: 'Years of Experience', // Label for the y-axis
      },
      beginAtZero: true, // Ensure that the y-axis starts at 0
    },
  },
};



  // Prepare data for pie chart (technology distribution)
  const pieChartData = {
    labels: Object.keys(techData),
    datasets: [
      {
        data: Object.values(techData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const lineChartData = {
  labels: experiences.map((exp) => exp.job_title),
  datasets: [
    {
      label: 'Years of Experience Over Time',
      data: yearsData,
      fill: false,
      borderColor: '#36A2EB',
      tension: 0.1,
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Job Title',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Years of Experience',
      },
      beginAtZero: true,
    },
  },
};

const radarChartData = {
  labels: Object.keys(techData), // Technology names
  datasets: [
    {
      label: 'Technologies Used Across Roles',
      data: Object.values(techData), // Frequency of usage for each tech
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const radarChartOptions = {
  responsive: true,
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: Math.max(...Object.values(techData)) + 1, // Dynamic range for technology usage
    },
  },
};
  

  const fetchPersonalInfo = async () => {
    try {
      const user_id = user.primaryEmailAddress?.emailAddress;

      if (!user_id) {
        throw new Error('User ID is missing.');
      }

      // Fetch personal info
      const response = await fetch(`https://portfolio-das-try-backend.vercel.app/api/personal-info?user_id=${user_id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch personal info');
      }

      const data = await response.json();
      console.log('Fetched personal data:', data); // Log the fetched data
      
      setPersonalInfo(data);  // Update state with the fetched personal data
      setLoading(false);  // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching personal info:', error);
      setLoading(false);  // Set loading to false even if an error occurs
    }
  };

  const fetchUserSkills = async () => {
    try {
      const user_id = user.primaryEmailAddress?.emailAddress;

      if (!user_id) {
        throw new Error('User ID is missing.');
      }

      // Fetch user skills data
      const response = await fetch(`https://portfolio-das-try-backend.vercel.app/api/skills/${user_id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }

      const data = await response.json();
      console.log('Fetched user skills:', data);

      setUserSkills(data);  // Update state with fetched skills
      setIsLoadingSkills(false);  // Set loadingSkills to false once skills are fetched
    } catch (error) {
      console.error('Error fetching user skills:', error);
      setSkillsError(error.message);  // Set error message
      setIsLoadingSkills(false);  // Set isLoadingSkills to false if an error occurs
    }
  };
const skillsChartData = {
    labels: userSkills.map(skill => skill.skill_name),
    datasets: [
      {
        label: 'Skill Proficiency',
        data: userSkills.map(skill => skill.proficiency),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', // Color for each skill
          'rgba(255, 99, 132, 0.2)', // Different colors for variety
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Format tooltip
          },
        },
      },
    },
  };

  

  const fetchEducationData = async () => {
  const userId = user.primaryEmailAddress?.emailAddress;
  if (!userId) {
    alert("User not signed in.");
    return;
  }

  try {
    const response = await fetch(`https://portfolio-das-try-backend.vercel.app/api/education/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched education data:', data);
    setEducation(data.education || []);
    setEduData(data.education || []);
  } catch (error) {
    console.error('Error fetching education data:', error);
    alert(`Error fetching education data: ${error.message}`);
  }
};

 

const fetchProjects = async () => {
  try {
    const user_id = user.primaryEmailAddress?.emailAddress;

    if (!user_id) {
      throw new Error('User ID is missing.');
    }

    const response = await axios.get("https://portfolio-das-try-backend.vercel.app/api/projects", {
      params: { user_id: user_id },
    });

    if (response.data.length > 0) {
      console.log("Fetched Projects:", response.data);

      // Example: Process data for role distribution chart (pie chart)
      const roleDistribution = response.data.reduce((acc, project) => {
        const roles = project.role.split(',');  // Assuming roles are comma-separated
        roles.forEach(role => {
          if (acc[role.trim()]) {
            acc[role.trim()] += 1;
          } else {
            acc[role.trim()] = 1;
          }
        });
        return acc;
      }, {});

      // Example: Create chart data
      const roleLabels = Object.keys(roleDistribution);
      const roleValues = Object.values(roleDistribution);

      // Store processed data in state
      setProjectSections(response.data);
      setRoleChartData({
        labels: roleLabels,
        datasets: [
          {
            label: 'Project Role Distribution',
            data: roleValues,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
            borderWidth: 1,
          }
        ]
      });
    } else {
      console.log("No projects found.");
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    alert("Failed to load projects.");
  }
};


const fetchCertifications = async () => {
  const user_id = user.primaryEmailAddress?.emailAddress;
  
  if (!user_id) {
    alert('User ID is missing.');
    return;
  }

  try {
    const response = await fetch(`https://portfolio-das-try-backend.vercel.app/api/certifications/${user_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch certifications');
    }
    
    const data = await response.json();
    console.log(data);
    setCertifications(data);
  } catch (error) {
    console.error('Error fetching certifications:', error);
  }
};

  useEffect(() => {
    fetchWorkExperience();
    fetchPersonalInfo();
    fetchUserSkills();
    fetchEducationData();
    fetchProjects();
    fetchCertifications();
  }, [user]);

  // Chart data and options remain the same

  const eduBarChartData = {
    labels: eduData.map(edu => edu.degree),
    datasets: [{
      label: 'CGPA Distribution',
      data: eduData.map(edu => parseFloat(edu.grade)),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }]
  };

  const eduBarChartOptions = {
  responsive: true,
  scales: {
    y: {
      min: 0,  // Optional: sets minimum value to 0 for the y-axis
      max: 10, // Ensures the max value on the y-axis is 10
      ticks: {
        stepSize: 1,  // Optional: defines the step size for each tick (optional for readability)
      }
    }
  }
};

  const eduLineChartData = {
  labels: eduData.map(edu => new Date(edu.start_date).getFullYear()),
  datasets: [{
    label: 'Education Timeline',
    data: eduData.map(edu => new Date(edu.end_date || Date.now()).getFullYear() - new Date(edu.start_date).getFullYear()),
    fill: false,
    borderColor: 'rgba(75, 192, 192, 1)',
    tension: 0.1
  }]
};


// Assuming you're using Chart.js to render the chart, you'll need to pass the `eduLineChartData` and `chartOptions` to the chart instance


  const eduPieChartData = {
    labels: eduData.map(edu => edu.field_of_study),
    datasets: [{
      data: eduData.map(() => 1),  // Here, each field of study gets 1 count
      backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
      hoverOffset: 4
    }]
  };



  const toggleSkillsDashboard = () => {
    setIsSkillsDashboardVisible(!isSkillsDashboardVisible);
  };


   const [isProjectDashboardVisible, setIsProjectDashboardVisible] = useState(false);

  // Function to toggle the visibility of the project dashboard and chart
  const toggleProjectDashboard = () => {
    setIsProjectDashboardVisible(!isProjectDashboardVisible);
  };



  

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <header className="bg-white shadow-md py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 text-center md:text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">{personalInfo?.first_name} {personalInfo?.last_name}</h1>
                  <p className="text-lg md:text-xl text-gray-600">{personalInfo?.professional_title}</p>
                  
                </div>
                <motion.div
                  className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {personalInfo?.profile_picture ? (
                    <img
                      src={`http://localhost:3000/uploads/${personalInfo.profile_picture}`}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User size={64} className="text-gray-400" />
                    </div>
                  )}
                  
                </motion.div>
              </div>
              <p className="text-base md:text-lg text-gray-600 mt-4">{personalInfo?.summary}</p>
            </div>
          </header>

          <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
            <div className="container mx-auto px-4">
              <ul className="text-sm md:text-lg flex justify-center flex-wrap space-x-4 md:space-x-6">
                {['experience', 'skills', 'education', 'projects', 'certifications'].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => setActiveSection(section)}
                      className={`text-lg font-medium capitalize ${activeSection === section ? ' text-base md:text-lg text-blue-600 border-b-2 border-blue-600'  : 'text-gray-600 hover:text-gray-800 text-base md:text-lg'} transition`}
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className="container mx-auto px-4 py-12">
            {/* Experience Section */}
            <motion.section
              className={`mb-16 ${activeSection !== 'experience' && 'hidden'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <Briefcase className="mr-2" /> Experience
                </h2>
                <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
              >
                {showDashboard ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                )}
              </button>

              </div>

              {!showDashboard ? (
                experiences.length === 0 ? (
                  <p className="text-center text-lg font-semibold text-gray-500">No work experience found.</p>
                ) : (
                  experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">{exp.job_title}</h3>
                      <p className="text-base md:text-xl font-semibold text-gray-600 mb-2">{exp.company}</p>
                      <p className="text-sm md:text-base text-gray-500 mb-4">
                        {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}
                      </p>
                      <p className="text-base md:text-lg text-gray-700 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.technologies &&
                          exp.technologies.split(',').map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-sm md:text-base px-3 py-1 rounded-full">
                              {tech.trim()}
                            </span>
                          ))}
                      </div>
                      <p className="text-gray-700 text-base md:text-lg"><strong>Achievements:</strong> {exp.achievements}</p>
                    </motion.div>
                  ))
                )
              ) : (
                <div className="space-y-8">
                  {experiences.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Years of Experience</h3>
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                  )}
                  {Object.keys(techData).length > 0 && (
                    <div className="bg-white p-6 rounded-lg  shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Technologies Used</h3>
                      <Pie data={pieChartData} options={{ responsive: true }} />
                    </div>
                  )}
                  {experiences.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Years of Experience Over Time</h3>
                      <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                  )}
                  {Object.keys(techData).length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Technologies Used Across Roles</h3>
                      <Radar data={radarChartData} options={radarChartOptions} />
                    </div>
                  )}
                </div>
              )}
            </motion.section>

            {/* Skills Section */}
            <motion.section
              className={`mb-16 ${activeSection !== 'skills' && 'hidden'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-gray-800">
                <Code className="mr-2" /> Skills
              </h2>

              {/* Toggle Button */}
              <div className="">
                <button
                  onClick={toggleSkillsDashboard}
                  className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                >
                  {isSkillsDashboardVisible ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>}
                </button>
                </div>
              </div>

              {/* Skill Cards */}
              {!isSkillsDashboardVisible && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-3 md:mt-5">
                  {userSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{skill.skill_name}</h3>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs md:text-base font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                              {skill.proficiency}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs md:text-base flex rounded bg-blue-200">
                          <div
                            style={{ width: `${skill.proficiency}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Doughnut Chart - only shown when 'Show Dashboard' is clicked */}
              {isSkillsDashboardVisible && (
                <div className="w-full h-[400px] md:mt-5 flex justify-center items-center">
                  {/* Doughnut Chart */}
                  <Doughnut data={skillsChartData} options={chartOptions} />
                </div>
              )}
            </motion.section>



            {/* Education Section */}
           <motion.section
              className={`mb-16 ${activeSection !== 'education' && 'hidden'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center text-gray-800">
                  <GraduationCap className="mr-2" /> Education
                </h2>
                <button
                  onClick={() => setShowEduDashboard(!showEduDashboard)}
                  className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                >
                  {showEduDashboard ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  )}
                </button>
              </div>

              {!showEduDashboard ? (
                // Sort the education data from present to past based on end_date
                eduData.length === 0 ? (
                  <p className="text-gray-500 text-center text-lg">No education data found.</p>
                ) : (
                  eduData
                    .sort((a, b) => {
                      const endDateA = a.end_date ? new Date(a.end_date) : new Date(); // Treat missing end_date as "present"
                      const endDateB = b.end_date ? new Date(b.end_date) : new Date(); // Treat missing end_date as "present"
                      return endDateB - endDateA; // Sorting in descending order
                    })
                    .map((edu, index) => (
                      <motion.div
                        key={index}
                        className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{edu.degree}</h3>
                        <p className="text-lg md:text-xl text-gray-600 mb-2">{edu.field_of_study}</p>
                        <p className="text-base md:text-lg font-semibold text-gray-700 mb-2">{edu.institution}</p>
                        <p className="text-sm md:text-base text-gray-500 mb-4">
                          {new Date(edu.start_date).getFullYear()} - {edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}
                        </p>
                        <p className="text-gray-700 text-base md:text-lg mb-4">{edu.description}</p>
                        <p className="text-blue-600 font-semibold text-base md:text-xl">CGPA: {edu.grade}</p>
                      </motion.div>
                    ))
                )
              ) : (
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">CGPA Distribution</h3>
                    <Bar data={eduBarChartData} options={eduBarChartOptions} />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Education Timeline</h3>
                    <Line
                      data={eduLineChartData}
                      options={{
                        responsive: true,
                        scales: {
                          y: {
                            min: 0.5, // Y-axis starts at 0.5
                            title: {
                              display: true,
                              text: 'Years of Education', // Y-axis label
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Year', // X-axis label
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl  font-bold text-gray-800 mb-4">Field of Study Distribution</h3>
                    <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">
                      <Pie data={eduPieChartData} options={{ responsive: true }} />
                    </div>
                  </div>
                </div>
              )}
          </motion.section>


            {/* Projects Section */}
              <motion.section
      className={`mb-16 ${activeSection !== 'projects' && 'hidden'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Projects</h2>

        {/* Toggle Button */}
        <button
          onClick={toggleProjectDashboard}
          className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
        >
          {isProjectDashboardVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Conditional Rendering for Chart and Content */}
      <div className="mb-8">
        {/* Render chart only if the dashboard is visible */}
        {isProjectDashboardVisible && roleChartData && roleChartData.labels.length > 0 ? (
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Role Distribution</h3>
            <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">
              <Pie data={roleChartData} />
            </div>
          </div>
        ) : isProjectDashboardVisible ? (
          <p className="text-lg text-gray-600">Loading chart...</p>
        ) : null}

        {/* Render project sections only if dashboard is NOT visible */}
        {!isProjectDashboardVisible && (
          <div className="space-y-8">
            {projectSections.length === 0 ? (
              <p className="text-xl font-semibold text-gray-600">No projects found.</p>
            ) : (
              projectSections.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-base md:text-xl text-gray-600 mb-4">{project.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-700">Achievements:</h4>
                      <p className="text-base md:text-lg text-gray-600">{project.achievements}</p>
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-700">Challenges:</h4>
                      <p className="text-base md:text-lg text-gray-600">{project.challenges}</p>
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-700">Collaborators:</h4>
                      <p className="text-base md:text-lg text-gray-600">{project.collaborators}</p>
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-700">Role:</h4>
                      <p className="text-base md:text-lg text-gray-600">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-700">Technologies:</h4>
                      <p className="text-base md:text-lg text-gray-600">{project.technologies}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm md:text-base text-gray-500">
                    Duration: {new Date(project.start_date).getFullYear()} - {project.end_date ? new Date(project.end_date).getFullYear() : "Present"}
                  </div>

                  <div className="mt-6">
                    <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition flex items-center">
                      <button className="px-4 py-2 flex items-center space-x-2">
                        <span>View Project</span>
                      </button>
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.section>


            {/* Certifications Section */}
            <motion.section
              className={`mb-16 ${activeSection !== 'certifications' && 'hidden'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-gray-800">
                <Award className="mr-2" /> Certifications
              </h2>
              <div className="space-y-8">
                {certifications.length === 0 ? (
                  <p className="text-gray-500 text-center text-lg">No certifications found.</p>
                ) : (
                  certifications.map((cert, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{cert.name}</h3>
                      <p className="text-base md:text-lg text-gray-600 mb-2">{cert.issuer}</p>
                      <p className="text-sm md:text-base text-gray-500 mb-2">Issued on: {cert.issue_date}</p>
                      <p className="text-gray-700 text-base md:text-lg mb-4">{cert.description}</p>
                      <p className="text-gray-600 text-base md:text-lg mb-4">Credential ID: {cert.credential_id}</p>
                      <a 
                        href={cert.credential_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 hover:text-blue-600 transition flex items-center"
                      >
                        View Credential <ExternalLink size={16} className="ml-1" />
                      </a>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.section>
          </main>
        </>
      )}
    </div>
  );
}






