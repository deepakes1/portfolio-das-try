// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useUser } from "@clerk/clerk-react";
// import { motion } from 'framer-motion';

// const skillsData = [
//   { skill: 'HTML5' },
//   { skill: 'CSS3' },
//   { skill: 'JavaScript' },
//   { skill: 'TypeScript' },
//   { skill: 'React.js' },
//   { skill: 'Angular' },
//   { skill: 'Vue.js' },
//   { skill: 'Node.js' },
//   { skill: 'Express.js' },
//   { skill: 'jQuery' },
//   { skill: 'Bootstrap' },
//   { skill: 'Tailwind CSS' },
//   { skill: 'Sass' },
//   { skill: 'GraphQL' },
//   { skill: 'Webpack' },
//   { skill: 'Babel' },
//   { skill: 'HTML5 APIs' },
//   { skill: 'Responsive Web Design' },
//   { skill: 'React Native' },
//   { skill: 'Next.js' },
//   { skill: 'Redux' },
//   { skill: 'Vuex' },
//   { skill: 'Ember.js' },
//   { skill: 'Svelte' },
//   { skill: 'Ionic' },
//   { skill: 'Ruby on Rails' },
//   { skill: 'Django' },
//   { skill: 'Flask' },
//   { skill: 'Spring Boot' },
//   { skill: 'Laravel' },
//   { skill: 'ASP.NET Core' },
//   { skill: 'Go (Golang)' },
//   { skill: 'Kotlin' },
//   { skill: 'FastAPI' },
//   { skill: 'MySQL' },
//   { skill: 'PostgreSQL' },
//   { skill: 'MongoDB' },
//   { skill: 'SQLite' },
//   { skill: 'Firebase' },
//   { skill: 'Redis' },
//   { skill: 'Oracle DB' },
//   { skill: 'MS SQL Server' },
//   { skill: 'Cassandra' },
//   { skill: 'MariaDB' },
//   { skill: 'Git' },
//   { skill: 'GitHub' },
//   { skill: 'GitLab' },
//   { skill: 'Bitbucket' },
//   { skill: 'SVN (Subversion)' },
//   { skill: 'Docker' },
//   { skill: 'Kubernetes' },
//   { skill: 'Jenkins' },
//   { skill: 'CircleCI' },
//   { skill: 'Travis CI' },
//   { skill: 'Ansible' },
//   { skill: 'Chef' },
//   { skill: 'Puppet' },
//   { skill: 'Terraform' },
//   { skill: 'Bamboo' },
//   { skill: 'AWS (Amazon Web Services)' },
//   { skill: 'Microsoft Azure' },
//   { skill: 'Google Cloud Platform (GCP)' },
//   { skill: 'IBM Cloud' },
//   { skill: 'DigitalOcean' },
//   { skill: 'Firebase Hosting' },
//   { skill: 'Python' },
//   { skill: 'R' },
//   { skill: 'TensorFlow' },
//   { skill: 'PyTorch' },
//   { skill: 'Keras' },
//   { skill: 'Scikit-learn' },
//   { skill: 'Pandas' },
//   { skill: 'Numpy' },
//   { skill: 'Matplotlib' },
//   { skill: 'Seaborn' },
//   { skill: 'Java' },
//   { skill: 'C#' },
//   { skill: 'C++' },
//   { skill: 'Swift' },
//   { skill: 'Objective-C' },
//   { skill: 'Rust' },
//   { skill: 'Flutter' },
//   { skill: 'Xamarin' },
//   { skill: 'Android Development' },
//   { skill: 'iOS Development' },
//   { skill: 'Selenium' },
//   { skill: 'Jest' },
//   { skill: 'Mocha' },
//   { skill: 'Cypress' },
//   { skill: 'TestNG' },
//   { skill: 'JUnit' },
//   { skill: 'Penetration Testing' },
//   { skill: 'Ethical Hacking' },
//   { skill: 'OWASP Top 10' },
//   { skill: 'Cryptography' },
//   { skill: 'Blockchain' },
//   { skill: 'Vulnerability Assessment' },
//   { skill: 'TCP/IP' },
//   { skill: 'DNS' },
//   { skill: 'DHCP' },
//   { skill: 'HTTP/HTTPS' },
//   { skill: 'VPN' },
//   { skill: 'Adobe XD' },
//   { skill: 'Figma' },
//   { skill: 'Sketch' },
//   { skill: 'Wireframing' },
//   { skill: 'Prototyping' },
//   { skill: 'JIRA' },
//   { skill: 'Trello' },
//   { skill: 'Asana' },
//   { skill: 'Slack' },
//   { skill: 'Confluence' },
//   { skill: 'Microsoft Teams' },
//   { skill: 'Basecamp' },
//   { skill: 'Agile Methodology' },
//   { skill: 'Scrum' },
//   { skill: 'Kanban' },
//   { skill: 'Power BI' },
//   { skill: 'Tableau' },
//   { skill: 'Google Data Studio' },
//   { skill: 'D3.js' }
// ];


// const Skills = ({ onNext }) => {
//   const { user, isLoaded } = useUser();
//   const [skills, setSkills] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [addedSkills, setAddedSkills] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const skillsPerPage = 6;

//   // Fetch user's skills
//   useEffect(() => {
//     if (!isLoaded || !user) return;

//     const user_id = user.primaryEmailAddress?.emailAddress;
//     if (user_id) {
//       const fetchSkills = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.get(`http://localhost:3000/api/skills/${user_id}`);
//           if (Array.isArray(response.data)) {
//             setAddedSkills(response.data.map(skill => ({
//               id: skill.skill_id,
//               skill_name: skill.skill_name,
//               proficiency: skill.proficiency,
//             })));
//           }
//         } catch (error) {
//           setError('Error fetching user skills.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       setSkills(skillsData.map((skill, index) => ({
//         id: index + 1,
//         skill_name: skill.skill,
//       })));

//       fetchSkills();
//     }
//   }, [user, isLoaded]);

//   // Memoize the skill selection handler
//   const handleSkillSelect = useCallback((skill) => {
//     setSelectedSkills(prev => prev.includes(skill)
//       ? prev.filter(s => s !== skill)
//       : [...prev, skill]);
//   }, []);

//   // Add selected skills to the added list
//   const addSelectedSkills = useCallback(() => {
//     const newSkills = selectedSkills.map(skill => ({
//       ...skill,
//       id: `${skill.id}-${Math.random()}`,
//       proficiency: 50,
//     }));
    
//     setAddedSkills(prev => [...prev, ...newSkills]);
//     setSelectedSkills([]);
//   }, [selectedSkills]);

//   // Handle proficiency slider changes
//   const handleSliderChange = (id, value) => {
//     setAddedSkills(prev => prev.map(skill =>
//       skill.id === id ? { ...skill, proficiency: value } : skill));
//   };

//   // Remove skill from the added skills
//   const handleRemoveSkill = async (id) => {
//     try {
//       const updatedSkills = addedSkills.filter(skill => skill.id !== id);
//       const reSequencedSkills = updatedSkills.map((skill, index) => ({
//         ...skill,
//         id: index + 1,
//       }));
      
//       setAddedSkills(reSequencedSkills);

//       const user_id = user.primaryEmailAddress?.emailAddress;
//       await axios.delete('http://localhost:3000/api/skills', {
//         data: { userId: user_id, skillId: id },
//       });
//     } catch (error) {
//       setError('Error removing skill.');
//     }
//   };

//   // Save skills to the backend
//   const handleSaveSkills = async () => {
//     try {
//       const user_id = user.primaryEmailAddress?.emailAddress;
//       const payload = {
//         userId: user_id,
//         skills: addedSkills.map(({ skill_name, proficiency }) => ({
//           skillName: skill_name,
//           proficiency,
//         })),
//       };
//       await axios.post('http://localhost:3000/api/skills', payload);
//       onNext(addedSkills);
//     } catch (error) {
//       setError('Error saving skills.');
//     }
//   };

//   // Filter and paginate skills
//   const filteredSkills = skills.filter(skill =>
//     skill.skill_name.toLowerCase().includes(searchQuery.toLowerCase()));
//   const displayedSkills = filteredSkills.slice(
//     currentPage * skillsPerPage,
//     (currentPage + 1) * skillsPerPage
//   );

//   return (
//     <motion.div
//       className="max-w-3xl mx-auto mt-6 p-6 sm:p-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="text-3xl font-semibold mb-6 text-center text-black">Skills</h2>

//       {loading && <div className="text-center text-blue-500">Loading...</div>}
//       {error && <div className="text-center text-red-500">{error}</div>}

//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search skills..."
//         className="w-full p-3 border-2 border-gray-300 bg-transparent focus:outline-none mb-6 "
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//         {displayedSkills.map((skill) => (
//           <motion.div
//             key={skill.id}
//             className="flex items-center justify-between  p-4  shadow-md cursor-pointer"
//             whileHover={{ scale: 1.05 }}
//             onClick={() => handleSkillSelect(skill)}
//           >
//             <input
//               type="checkbox"
//               checked={selectedSkills.includes(skill)}
//               onChange={() => handleSkillSelect(skill)}
//               className="mr-3"
//             />
//             <span className="flex-1 text-lg text-black">{skill.skill_name}</span>
//           </motion.div>
//         ))}
//       </div>

//       <motion.button
//         onClick={addSelectedSkills}
//         className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition"
//         disabled={selectedSkills.length === 0}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         Add Selected Skills
//       </motion.button>

//       {addedSkills.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-2xl font-semibold text-black mb-4">Added Skills</h3>
//           <div className="space-y-4">
//             {addedSkills.map((skill) => (
//               <motion.div
//                 key={skill.id}
//                 className="relative flex items-center justify-between p-4 rounded-lg shadow-xl text-black transition duration-200"
//               >
//                 <button
//                   onClick={() => handleRemoveSkill(skill.id)}
//                   className="absolute -top-3 -right-[5px] text-lg font-bold text-red-800"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   X
//                 </button>

//                 <span className="text-lg text-gray-700">{skill.skill_name}</span>

//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={skill.proficiency}
//                   onChange={(e) => handleSliderChange(skill.id, e.target.value)}
//                   className="w-32 ml-2"
//                 />
//                 <span className="ml-2">{skill.proficiency}%</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between mt-8">
//         <motion.button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//           className="p-3 rounded-lg bg-black text-white"
//           whileHover={{ scale: 1.1 }}
//         >
//           Previous
//         </motion.button>
//         <motion.button
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="p-3 rounded-lg transition bg-black text-white"
//           whileHover={{ scale: 1.1 }}
//         >
//           Next
//         </motion.button>
//       </div>

//       <motion.div
//         className="mt-8"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <button
//           onClick={handleSaveSkills}
//           className="w-full p-4 bg-indigo-700 text-white rounded-lg disabled:bg-gray-400"
//           disabled={addedSkills.length === 0}
//         >
//           Save Skills and Continue
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };


// export default Skills;







'use client'

import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useUser } from "@clerk/clerk-react"
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Search, Plus, Minus, Save } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import GradualSpacing from "../components/ui/gradual-spacing";

const skillsData = [
  { skill: 'HTML5' },
  { skill: 'CSS3' },
  { skill: 'JavaScript' },
  { skill: 'TypeScript' },
  { skill: 'React.js' },
  { skill: 'Angular' },
  { skill: 'Vue.js' },
  { skill: 'Node.js' },
  { skill: 'Express.js' },
  { skill: 'jQuery' },
  { skill: 'Bootstrap' },
  { skill: 'Tailwind CSS' },
  { skill: 'Sass' },
  { skill: 'GraphQL' },
  { skill: 'Webpack' },
  { skill: 'Babel' },
  { skill: 'HTML5 APIs' },
  { skill: 'Responsive Web Design' },
  { skill: 'React Native' },
  { skill: 'Next.js' },
  { skill: 'Redux' },
  { skill: 'Vuex' },
  { skill: 'Ember.js' },
  { skill: 'Svelte' },
  { skill: 'Ionic' },
  { skill: 'Ruby on Rails' },
  { skill: 'Django' },
  { skill: 'Flask' },
  { skill: 'Spring Boot' },
  { skill: 'Laravel' },
  { skill: 'ASP.NET Core' },
  { skill: 'Go (Golang)' },
  { skill: 'Kotlin' },
  { skill: 'FastAPI' },
  { skill: 'MySQL' },
  { skill: 'PostgreSQL' },
  { skill: 'MongoDB' },
  { skill: 'SQLite' },
  { skill: 'Firebase' },
  { skill: 'Redis' },
  { skill: 'Oracle DB' },
  { skill: 'MS SQL Server' },
  { skill: 'Cassandra' },
  { skill: 'MariaDB' },
  { skill: 'Git' },
  { skill: 'GitHub' },
  { skill: 'GitLab' },
  { skill: 'Bitbucket' },
  { skill: 'SVN (Subversion)' },
  { skill: 'Docker' },
  { skill: 'Kubernetes' },
  { skill: 'Jenkins' },
  { skill: 'CircleCI' },
  { skill: 'Travis CI' },
  { skill: 'Ansible' },
  { skill: 'Chef' },
  { skill: 'Puppet' },
  { skill: 'Terraform' },
  { skill: 'Bamboo' },
  { skill: 'AWS (Amazon Web Services)' },
  { skill: 'Microsoft Azure' },
  { skill: 'Google Cloud Platform (GCP)' },
  { skill: 'IBM Cloud' },
  { skill: 'DigitalOcean' },
  { skill: 'Firebase Hosting' },
  { skill: 'Python' },
  { skill: 'R' },
  { skill: 'TensorFlow' },
  { skill: 'PyTorch' },
  { skill: 'Keras' },
  { skill: 'Scikit-learn' },
  { skill: 'Pandas' },
  { skill: 'Numpy' },
  { skill: 'Matplotlib' },
  { skill: 'Seaborn' },
  { skill: 'Java' },
  { skill: 'C#' },
  { skill: 'C++' },
  { skill: 'Swift' },
  { skill: 'Objective-C' },
  { skill: 'Rust' },
  { skill: 'Flutter' },
  { skill: 'Xamarin' },
  { skill: 'Android Development' },
  { skill: 'iOS Development' },
  { skill: 'Selenium' },
  { skill: 'Jest' },
  { skill: 'Mocha' },
  { skill: 'Cypress' },
  { skill: 'TestNG' },
  { skill: 'JUnit' },
  { skill: 'Penetration Testing' },
  { skill: 'Ethical Hacking' },
  { skill: 'OWASP Top 10' },
  { skill: 'Cryptography' },
  { skill: 'Blockchain' },
  { skill: 'Vulnerability Assessment' },
  { skill: 'TCP/IP' },
  { skill: 'DNS' },
  { skill: 'DHCP' },
  { skill: 'HTTP/HTTPS' },
  { skill: 'VPN' },
  { skill: 'Adobe XD' },
  { skill: 'Figma' },
  { skill: 'Sketch' },
  { skill: 'Wireframing' },
  { skill: 'Prototyping' },
  { skill: 'JIRA' },
  { skill: 'Trello' },
  { skill: 'Asana' },
  { skill: 'Slack' },
  { skill: 'Confluence' },
  { skill: 'Microsoft Teams' },
  { skill: 'Basecamp' },
  { skill: 'Agile Methodology' },
  { skill: 'Scrum' },
  { skill: 'Kanban' },
  { skill: 'Power BI' },
  { skill: 'Tableau' },
  { skill: 'Google Data Studio' },
  { skill: 'D3.js' }
]

const Skills = ({ onNext }) => {
  const { user, isLoaded } = useUser()
  const [skills, setSkills] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [addedSkills, setAddedSkills] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const skillsPerPage = 12

  useEffect(() => {
    if (!isLoaded || !user) return

    const user_id = user.primaryEmailAddress?.emailAddress
    if (user_id) {
      const fetchSkills = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`http://localhost:3000/api/skills/${user_id}`)
          if (Array.isArray(response.data)) {
            setAddedSkills(response.data.map(skill => ({
              id: skill.skill_id,
              skill_name: skill.skill_name,
              proficiency: skill.proficiency,
            })))
          }
        } catch (error) {
          setError('Error fetching user skills.')
        } finally {
          setLoading(false)
        }
      }

      setSkills(skillsData.map((skill, index) => ({
        id: index + 1,
        skill_name: skill.skill,
      })))

      fetchSkills()
    }
  }, [user, isLoaded])

  const handleSkillSelect = useCallback((skill) => {
    setSelectedSkills(prev => prev.includes(skill)
      ? prev.filter(s => s !== skill)
      : [...prev, skill])
  }, [])

  const addSelectedSkills = useCallback(() => {
    const newSkills = selectedSkills.map(skill => ({
      ...skill,
      id: `${skill.id}-${Math.random()}`,
      proficiency: 50,
    }))
    
    setAddedSkills(prev => [...prev, ...newSkills])
    setSelectedSkills([])
  }, [selectedSkills])

  const handleSliderChange = (id, value) => {
    setAddedSkills(prev => prev.map(skill =>
      skill.id === id ? { ...skill, proficiency: value } : skill))
  }

  const handleRemoveSkill = async (id) => {
    try {
      const updatedSkills = addedSkills.filter(skill => skill.id !== id)
      const reSequencedSkills = updatedSkills.map((skill, index) => ({
        ...skill,
        id: index + 1,
      }))
      
      setAddedSkills(reSequencedSkills)

      const user_id = user.primaryEmailAddress?.emailAddress
      await axios.delete('http://localhost:3000/api/skills', {
        data: { userId: user_id, skillId: id },
      })
    } catch (error) {
      setError('Error removing skill.')
    }
  }

  const handleSaveSkills = async () => {
     setSubmitting(true) // Start the loader
    try {
      const user_id = user.primaryEmailAddress?.emailAddress
      const payload = {
        userId: user_id,
        skills: addedSkills.map(({ skill_name, proficiency }) => ({
          skillName: skill_name,
          proficiency,
        })),
      }
      await axios.post('http://localhost:3000/api/skills', payload)
      onNext(addedSkills)
    } catch (error) {
      setError('Error saving skills.')
    }finally {
      setSubmitting(false) // Stop the loader
    }
  }

  const filteredSkills = skills.filter(skill =>
    skill.skill_name.toLowerCase().includes(searchQuery.toLowerCase()))
  const displayedSkills = filteredSkills.slice(
    currentPage * skillsPerPage,
    (currentPage + 1) * skillsPerPage
  )

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
      <GradualSpacing
        className=" text-3xl font-bold -tracking-widest text-left text-black dark:text-white"
        text="Skills"
      />
        
        <CardDescription>Add and manage your professional skills</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <div className="text-center text-blue-500">Loading...</div>}
        {error && 
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        }

        


        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="pl-8"
            />
          </div>

          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedSkills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill.id}`}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => handleSkillSelect(skill)}
                  />
                  <label
                    htmlFor={`skill-${skill.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {skill.skill_name}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={(currentPage + 1) * skillsPerPage >= filteredSkills.length}
            >
              Next
            </Button>
          </div>

          <Button
            onClick={addSelectedSkills}
            disabled={selectedSkills.length === 0}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Selected Skills
          </Button>
        </div>

        {addedSkills.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Added Skills</h3>
            <AnimatePresence>
              {addedSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2 bg-secondary p-2 rounded-md"
                >
                  <Badge variant="outline" className="w-1/3 justify-start">
                    {skill.skill_name}
                  </Badge>
                  <Slider
                    value={[skill.proficiency]}
                    onValueChange={(value) => handleSliderChange(skill.id, value[0])}
                    max={100}
                    step={1}
                    className="w-1/2  bg-slate-300"
                    
                    
                    
                  />

                  <span className="w-12 text-right">{skill.proficiency}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSkill(skill.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSaveSkills}
          disabled={addedSkills.length === 0 || submitting}
          className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-300 
            ${addedSkills.length === 0 || submitting ? 'bg-transparent cursor-wait' : 'bg-black text-white'}`}
        >
          {submitting ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="spinner-border animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
               <span className="ml-2 text-blue-500">saving...</span>
            </div>
          ) : (
            <>
              <Save className="mr-2 h-5 w-5 text-white" />
              Save Skills and Continue
            </>
          )}
        </Button>
      </CardFooter>

    </Card>
  )
}

export default Skills


