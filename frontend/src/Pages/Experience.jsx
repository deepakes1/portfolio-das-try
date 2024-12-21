// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react"; // Import Clerk's hook
// import bgimg from "../assets/snow-bg.gif";

// const Experience = ({ onNext }) => {
//   const { user, isLoaded } = useUser();
//   const [experiences, setExperiences] = useState([
//     { job_title: "", company: "", startDate: "", endDate: "", description: "", technologies: "", achievements: "", employmentType: "" }
//   ]);
//   const [errors, setErrors] = useState({}); // State for tracking errors

//   useEffect(() => {
//     const fetchExperienceData = async () => {
//       if (!isLoaded || !user) {
//         return; // Wait until the user data is loaded
//       }

//       const userId = user.primaryEmailAddress?.emailAddress;
//       if (!userId) {
//         alert("User not signed in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://localhost:3000/api/work-experience", {
//           params: { user_id: userId },
//         });

//         // Sort the fetched data by experience_id (ascending order)
//         const sortedExperiences = response.data.sort((a, b) => a.experience_id - b.experience_id);

//         if (sortedExperiences.length > 0) {
//           const userExperiences = sortedExperiences.map((exp, index) => ({
//             job_title: exp.job_title,
//             company: exp.company,
//             startDate: formatDate(exp.start_date),
//             endDate: formatDate(exp.end_date),
//             description: exp.description,
//             technologies: exp.technologies || "",
//             achievements: exp.achievements || "",
//             employmentType: exp.employment_type,
//             experience_id: exp.experience_id || index + 1,
//           }));
//           setExperiences(userExperiences);
//         }
//       } catch (error) {
//         console.error("Error fetching experience data:", error);
//         alert("Error fetching work experience data.");
//       }
//     };

//     fetchExperienceData();
//   }, [isLoaded, user]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "";
//     return date.toISOString().split('T')[0];  // Return date in YYYY-MM-DD format
//   };

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedExperiences = [...experiences];
//     updatedExperiences[index][name] = value;
//     setExperiences(updatedExperiences);
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       if (value) delete newErrors[`${name}_${index}`];
//       return newErrors;
//     });
//   };

//   const handleAddExperience = () => {
//     setExperiences([
//       ...experiences,
//       { job_title: "", company: "", startDate: "", endDate: "", description: "", technologies: "", achievements: "", employmentType: "" }
//     ]);
//   };

//   const handleRemoveExperience = async (index) => {
//     const experienceToRemove = experiences[index];
//     if (!experienceToRemove.experience_id) {
//       alert("Experience ID is missing.");
//       return;
//     }

//     try {
//       const response = await axios.delete("http://localhost:3000/api/work-experience", {
//         data: { experience_id: experienceToRemove.experience_id },
//       });

//       if (response.status === 200) {
//         setExperiences(experiences.filter((_, i) => i !== index));
//         alert("Experience removed successfully.");
//       } else {
//         alert("Error deleting experience on server.");
//       }
//     } catch (error) {
//       console.error("Error deleting experience:", error);
//       alert("There was an error removing the experience.");
//     }
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     experiences.forEach((exp, index) => {
//       if (!exp.job_title) newErrors[`job_title_${index}`] = "Job Title is required.";
//       if (!exp.company) newErrors[`company_${index}`] = "Company is required.";
//       if (!exp.startDate) newErrors[`startDate_${index}`] = "Start Date is required.";
//       if (!exp.employmentType) newErrors[`employmentType_${index}`] = "Employment Type is required.";
//       if (!exp.description) newErrors[`description_${index}`] = "Description is required.";
//       if (!exp.technologies) newErrors[`technologies_${index}`] = "Technologies are required.";
//       if (!exp.achievements) newErrors[`achievements_${index}`] = "Achievements are required.";
//     });
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateFields();

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!isLoaded || !user) {
//       alert("User data is not loaded yet. Please wait.");
//       return;
//     }

//     const userId = user.primaryEmailAddress?.emailAddress;
//     if (!userId) {
//       alert("User email is not available. Please sign in.");
//       return;
//     }

//     try {
//       for (const exp of experiences) {
//         await axios.post("http://localhost:3000/api/work-experience", {
//           userId,
//           experienceId: exp.experience_id,
//           job_title: exp.job_title,
//           company: exp.company,
//           start_date: exp.startDate,
//           end_date: exp.endDate,
//           description: exp.description,
//           technologies: exp.technologies,
//           achievements: exp.achievements,
//           employment_type: exp.employmentType,
//         });
//       }

//       alert("Work experiences saved successfully.");
//       if (onNext) onNext();
//     } catch (error) {
//       console.error("Error sending data to server:", error);
//       alert("There was an error saving your work experiences.");
//     }
//   };

//   const Field = ({ label, name, value, onChange, error, type = "text", placeholder }) => (
//     <div className="mb-3">
//       <label className="block">{label}</label>
//       {type === "textarea" ? (
//         <textarea
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`border-b-2 border-black  w-full p-4 mb-3 bg-transparent focus:outline-none ${error ? 'border-red-500' : ''}`}
//         />
//       ) : type === "select" ? (
//         <select
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           className={`border-b-2 border-black  w-full p-4 mb-3 bg-transparent focus:outline-none ${error ? 'border-red-500' : ''}`}
//         >
//           <option value="">Select Employment Type</option>
//           {["Full-Time", "Part-Time", "Contract", "Temporary", "Internship", "Freelance", "Remote", "Hybrid", "Consultant", "Seasonal", "Job-Share", "On-Call", "Volunteer", "Commission-Based", "Project-Based"].map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           type={type}
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`border-b-2 border-black w-full p-4 mb-3 bg-transparent focus:outline-none ${error ? 'border-red-500' : ''}`}
//         />
//       )}
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );

//   return (
//     <div
//       className="max-w-lg mx-auto mt-2 p-4 bg-transparent"
      
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Work Experience</h2>
//       <form onSubmit={handleSubmit}>
//         {experiences.map((experience, index) => (
//           <div key={index} className="mb-6 p-10  border-2 rounded-br-[100px] rounded-tl-[100px]">
//             <h3 className="text-lg font-semibold mb-3 text-black">Experience {index + 1}</h3>
//             <Field
//               label="Job Title"
//               name="job_title"
//               value={experience.job_title}
//               onChange={(e) => handleChange(index, e)}
//               error={errors[`job_title_${index}`]}
//             />
//             <Field
//               label="Company"
//               name="company"
//               value={experience.company}
//               onChange={(e) => handleChange(index, e)}
//               error={errors[`company_${index}`]}
//             />
//             <div className="flex flex-col sm:flex-row sm:gap-6 mb-4">
//               <Field
//                 label="Start Date"
//                 name="startDate"
//                 type="date"
//                 value={experience.startDate}
//                 onChange={(e) => handleChange(index, e)}
//                 error={errors[`startDate_${index}`]}
//               />
//               <Field
//                 label="End Date"
//                 name="endDate"
//                 type="date"
//                 value={experience.endDate}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </div>
//             <Field
//               label="Description"
//               name="description"
//               type="textarea"
//               value={experience.description}
//               onChange={(e) => handleChange(index, e)}
//               error={errors[`description_${index}`]}
//             />
//             <Field
//               label="Technologies"
//               name="technologies"
//               type="textarea"
//               value={experience.technologies}
//               onChange={(e) => handleChange(index, e)}
//               error={errors[`technologies_${index}`]}
//             />
//             <Field
//               label="Achievements"
//               name="achievements"
//               type="textarea"
//               value={experience.achievements}
//               onChange={(e) => handleChange(index, e)}
//               error={errors[`achievements_${index}`]}
//             />
//             <Field
//               label="Employment Type"
//               name="employmentType"
//               type="select"
//               value={experience.employmentType}
//               onChange={(e) => handleChange(index, e)}
//               error={errors[`employmentType_${index}`]}
//             />
//             {experiences.length > 1 && (
//               <div className="flex gap-3 items-center cursor-pointer" onClick={() => handleRemoveExperience(index)}>
//                 <p className="text-red-500">Remove Experience</p>
//                 <svg
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
//         ))}
//         <div className="flex gap-3 bg-blue-900  rounded-br-3xl rounded-tl-3xl text-white justify-center items-center" onClick={handleAddExperience}>
//           <div className="mt-4 ">
//             <button type="button"  className=" mb-5">
//               Add Another Experience
//             </button>
//           </div>

//           <div className="hover:cursor-pointer">
//             <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
//               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
//             </svg>
//           </div>
//         </div>
//         <div className="text-center">
//           <button type="submit" className="bg-black text-white rounded-lg py-2 px-6 mt-4">
//             Save Work Experience
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Experience;



import React, { useEffect, useState } from "react"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Briefcase, Plus, Trash2 } from 'lucide-react'

import GradualSpacing from "../components/ui/gradual-spacing";

const Experience = ({ onNext }) => {
  const { user, isLoaded } = useUser()
  const [experiences, setExperiences] = useState([{
    job_title: "", company: "", startDate: "", endDate: "", description: "", technologies: "", achievements: "", employmentType: "", customEmploymentType: ""
  }])
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('achievements')
  const [loading,setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchExperienceData = async () => {
      if (!isLoaded || !user) return

      const userId = user.primaryEmailAddress?.emailAddress
      if (!userId) {
        console.error("User not signed in.")
        return
      }

      try {
        setIsFetching(true)  // Set fetching state to true before the fetch starts
        const response = await axios.get("https://portfolio-das-try-backend.vercel.app/api/work-experience", {
          params: { user_id: userId },
        })

        const sortedExperiences = response.data.sort((a, b) => a.experience_id - b.experience_id)

        if (sortedExperiences.length > 0) {
          const userExperiences = sortedExperiences.map((exp, index) => ({
            job_title: exp.job_title,
            company: exp.company,
            startDate: formatDate(exp.start_date),
            endDate: formatDate(exp.end_date),
            description: exp.description,
            technologies: exp.technologies || "",
            achievements: exp.achievements || "",
            employmentType: exp.employment_type,
            customEmploymentType: exp.employment_type === "Other" ? exp.custom_employment_type : "",
            experience_id: exp.experience_id || index + 1,
          }))
          setExperiences(userExperiences)
        }
      } catch (error) {
        console.error("Error fetching experience data:", error)
      } finally {
        setIsFetching(false)  // Set fetching state to false after the fetch is complete
      }
    }

    fetchExperienceData()
  }, [isLoaded, user])

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "" : date.toISOString().split('T')[0]
  }

  const handleChange = (index, name, value) => {
  const updatedExperiences = [...experiences];
  updatedExperiences[index][name] = value;

  // If "employmentType" is updated to something other than "Other", reset customEmploymentType
  if (name === "employmentType" && value !== "Other") {
    updatedExperiences[index].customEmploymentType = "";
  }

  setExperiences(updatedExperiences);
  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };
    if (value) delete newErrors[`${name}_${index}`];
    return newErrors;
  });
};


  const handleAddExperience = () => {
    setExperiences([ ...experiences, { job_title: "", company: "", startDate: "", endDate: "", description: "", technologies: "", achievements: "", employmentType: "", customEmploymentType: "" } ])
  }

  const handleRemoveExperience = async (index) => {
    const experienceToRemove = experiences[index]
    if (!experienceToRemove.experience_id) {
      console.error("Experience ID is missing.")
      return
    }

    try {
      const response = await axios.delete("https://portfolio-das-try-backend.vercel.app/api/work-experience", {
        data: { experience_id: experienceToRemove.experience_id },
      })

      if (response.status === 200) {
        const updatedExperiences = experiences.filter((_, i) => i !== index)
        setExperiences(updatedExperiences)
        console.log("Experience removed successfully.")
      } else {
        console.error("Error deleting experience on server.")
      }
    } catch (error) {
      console.error("Error deleting experience:", error)
    }
  }

  const validateFields = () => {
    const newErrors = {}
    experiences.forEach((exp, index) => {
      if (!exp.job_title) newErrors[`job_title_${index}`] = "Job Title is required."
      if (!exp.company) newErrors[`company_${index}`] = "Company is required."
      if (!exp.startDate) newErrors[`startDate_${index}`] = "Start Date is required."
      if (!exp.employmentType) newErrors[`employmentType_${index}`] = "Employment Type is required."
      if (!exp.description) newErrors[`description_${index}`] = "Description is required."
      if (!exp.technologies) newErrors[`technologies_${index}`] = "Technologies are required."
      if (!exp.achievements) newErrors[`achievements_${index}`] = "Achievements are required."
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

    setLoading(true)

    try {
      for (const exp of experiences) {
        await axios.post("https://portfolio-das-try-backend.vercel.app/api/work-experience", {
          userId,
          experienceId: exp.experience_id,
          job_title: exp.job_title,
          company: exp.company,
          start_date: exp.startDate,
          end_date: exp.endDate,
          description: exp.description,
          technologies: exp.technologies,
          achievements: exp.achievements,
          employment_type: exp.employmentType,
          custom_employment_type: exp.customEmploymentType || null
        })
      }

      console.log("Work experiences saved successfully.")
      if (onNext) onNext()
    } catch (error) {
      console.error("Error sending data to server:", error)
    } finally {
      setLoading(false)
    }
  }

  const employmentTypes = [
    "Full-Time", "Part-Time", "Contract", "Temporary", "Internship", "Freelance", 
    "Remote", "Hybrid", "Consultant", "Seasonal", "Job-Share", "On-Call", 
    "Volunteer", "Commission-Based", "Project-Based", "Other"
  ]

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="loader"></div>
  </div>
);

  return (
    <div className="container md:min-h-screen md:mx-auto md:px-4 md:py-8">
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
            className="text-lg md:text-3xl font-bold -tracking-widest text-left text-black dark:text-white"
            text="Work Experience"
          />
            
            <CardDescription>Add your professional experiences to showcase your career journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="md:space-y-6 max-h-[65vh] md:overflow-y-auto p-0 md:pr-4">
                {experiences.map((experience, index) => (
                  <Card key={index} className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center">
                        <Briefcase className="mr-2" />
                        Experience {index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="hidden md:grid w-full grid-cols-3">
                          <TabsTrigger value="basic">Basic</TabsTrigger>
                          <TabsTrigger value="details">Detail</TabsTrigger>
                          <TabsTrigger value="achievements">Achievement</TabsTrigger>
                        </TabsList>
                        <TabsList className="md:hidden grid w-full grid-cols-3">
                          <TabsTrigger value="basic">1</TabsTrigger>
                          <TabsTrigger value="details">2</TabsTrigger>
                          <TabsTrigger value="achievements">3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basic">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`job_title_${index}`}>Job Title</Label>
                              <Input
                                id={`job_title_${index}`}
                                value={experience.job_title}
                                onChange={(e) => handleChange(index, "job_title", e.target.value)}
                                placeholder="e.g. Software Engineer"
                                className  = "text-sm"
                              />
                              {errors[`job_title_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`job_title_${index}`]}</p>}
                            </div>
                            <div>
                              <Label htmlFor={`company_${index}`}>Company</Label>
                              <Input
                                id={`company_${index}`}
                                value={experience.company}
                                onChange={(e) => handleChange(index, "company", e.target.value)}
                                placeholder="e.g. Tech Solutions Inc."
                                className  = "text-sm"
                              />
                              {errors[`company_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`company_${index}`]}</p>}
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                              <div>
                                <Label htmlFor={`startDate_${index}`}>Start Date</Label>
                                <Input
                                  id={`startDate_${index}`}
                                  type="date"
                                  value={experience.startDate}
                                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                  className  = "text-sm"
                                />
                                {errors[`startDate_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`startDate_${index}`]}</p>}
                              </div>
                              <div>
                                <Label htmlFor={`endDate_${index}`}>End Date</Label>
                                <Input
                                  id={`endDate_${index}`}
                                  type="date"
                                  value={experience.endDate}
                                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                  className  = "text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor={`employmentType_${index}`}>Employment Type</Label>
                              <Select onValueChange={(value) => handleChange(index, "employmentType", value)} value={experience.employmentType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select employment type" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-100">
                                  {employmentTypes.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {experience.employmentType === "Other" && (
                                <div className="mt-2">
                                  <Label htmlFor={`customEmploymentType_${index}`}>Custom Employment Type</Label>
                                  <Input
                                    id={`customEmploymentType_${index}`}
                                    value={experience.customEmploymentType}
                                    onChange={(e) => handleChange(index, "customEmploymentType", e.target.value)}
                                    placeholder="Enter custom employment type"
                                    className  = "text-sm"
                                  />
                                </div>
                              )}
                              {errors[`employmentType_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`employmentType_${index}`]}</p>}
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="details">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`description_${index}`}>Job Description</Label>
                              <Textarea
                                id={`description_${index}`}
                                value={experience.description}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                                placeholder="Describe your role and responsibilities"
                                rows={4}
                                className  = "text-sm"
                              />
                              {errors[`description_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`description_${index}`]}</p>}
                            </div>
                            <div>
                              <Label htmlFor={`technologies_${index}`}>Technologies Used</Label>
                              <Textarea
                                id={`technologies_${index}`}
                                value={experience.technologies}
                                onChange={(e) => handleChange(index, "technologies", e.target.value)}
                                placeholder="List the technologies and tools you used"
                                rows={3}
                                className  = "text-sm"
                              />
                              {errors[`technologies_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`technologies_${index}`]}</p>}
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="achievements">
                          <div>
                            <Label htmlFor={`achievements_${index}`}>Achievements</Label>
                            <Textarea
                              id={`achievements_${index}`}
                              value={experience.achievements}
                              onChange={(e) => handleChange(index, "achievements", e.target.value)}
                              placeholder="List your notable achievements"
                              rows={4}
                              className  = "text-sm"
                            />
                            {errors[`achievements_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`achievements_${index}`]}</p>}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        variant="destructive"
                        size="icon"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="md:flex justify-between items-center mt-6 ">
    {/* Add Experience Button */}
    <div>
      <Button type="button" onClick={handleAddExperience} className="flex items-center">
        <Plus className="mr-2" size={16} /> Add Experience
      </Button>
    </div>
    
    {/* Save and Continue Button or Loading Spinner */}
    <div className="flex-grow text-right">
    {loading ? (
      <div className="flex items-center justify-center">
        {/* Spinner */}
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-5 w-5 mr-2"></div>
        <span>loading...</span>
      </div>
    ) : (
      <div className="mt-5 md:mt-0 flex justify-center md:justify-end">
        <Button type="submit" variant="primary" disabled={loading}>
        Save and Continue
      </Button>
      </div>
    )}
  </div>

  </div>

            </form>
          </CardContent>
        </Card>
        )}
    </div>
  )
}

export default Experience


