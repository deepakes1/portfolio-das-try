
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
import GradualSpacing from "../components/ui/gradual-spacing"


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
  const { user, isLoaded } = useUser();
  const [education, setEducation] = useState([
    {
      education_id: "",
      institution: "",
      degree: "",
      customDegree: "",
      field_of_study: "",
      customFieldOfStudy: "",
      start_date: "",
      end_date: "",
      grade: "",
      description: "",
    },
  ]);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "" : date.toISOString().split('T')[0]
  }

  useEffect(() => {
    if (isLoaded && user) {
      const fetchEducationData = async () => {
        setIsFetching(true)
        const userId = user.primaryEmailAddress?.emailAddress
        if (!userId) {
          console.error("User not signed in.")
          return
        }

        try {
          const response = await axios.get(`https://portfolio-das-try-backend.vercel.app/api/education/${userId}`)
          if (response.data.education && response.data.education.length > 0) {
            const formattedEducation = response.data.education.map((edu) => ({
              ...edu,
              customDegree: edu.degree === "Other" ? edu.degree : "",
              customFieldOfStudy: edu.field_of_study === "Other" ? edu.field_of_study : "",
              start_date: formatDate(edu.start_date),
              end_date: formatDate(edu.end_date),
            }))
            setEducation(formattedEducation)
          }
        } catch (error) {
          console.error("Error fetching education data:", error)
        } finally {
          setIsFetching(false)
        }
      }

      fetchEducationData()
    }
  }, [isLoaded, user])

  const handleChange = (index, name, value) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation]
      updatedEducation[index][name] = value
      
      // Reset custom fields when main selection changes
      if (name === "degree" && value !== "Other") {
        updatedEducation[index].customDegree = ""
      }
      if (name === "field_of_study" && value !== "Other") {
        updatedEducation[index].customFieldOfStudy = ""
      }
      
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
        customDegree: "",
        field_of_study: "",
        customFieldOfStudy: "",
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

        await axios.delete(`https://portfolio-das-try-backend.vercel.app/api/education/${userId}/${educationToRemove.education_id}`)
        setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index))

        const response = await axios.get(`https://portfolio-das-try-backend.vercel.app/api/education/${userId}`)
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
      if (!edu.degree) newErrors[`degree_${index}`] = "Degree is required"
      if (edu.degree === "Other" && !edu.customDegree) newErrors[`customDegree_${index}`] = "Custom degree is required"
      if (!edu.field_of_study) newErrors[`field_of_study_${index}`] = "Field of study is required"
      if (edu.field_of_study === "Other" && !edu.customFieldOfStudy) newErrors[`customFieldOfStudy_${index}`] = "Custom field of study is required"
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

    setLoading(true)

    try {
      // In handleSubmit:
const educationData = {
  user_id: userId,
  education: education.map((edu) => ({
    education_id: edu.education_id || null,
    institution: edu.institution,
    degree: edu.degree === "Other" ? edu.customDegree : edu.degree,
    field_of_study: edu.field_of_study === "Other" ? edu.customFieldOfStudy : edu.field_of_study,
    start_date: edu.start_date,
    end_date: edu.end_date,
    grade: edu.grade,
    description: edu.description,
  })),
}
      await axios.post('https://portfolio-das-try-backend.vercel.app/submit-education', educationData)
      console.log("Education data saved successfully.")
      if (onNext) onNext()
    } catch (error) {
      console.error("Error sending data to server:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return <div>Loading user data...</div>
  }

  return (
    <div className="container md:min-h-screen md:mx-auto md:px-4 md:py-8">
      <div className="flex-grow">
        {isFetching ? (
          <div className="flex items-center justify-center">
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
            <CardContent className="overflow-hidden">
              <form onSubmit={handleSubmit}>
                <div className="md:space-y-6">
                  {education.map((edu, index) => (
                    <Card key={index} className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold flex items-center">
                          <GraduationCap className="mr-2" />
                          Education {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="overflow-auto">
                        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="hidden md:grid w-full grid-cols-3">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="description">Description</TabsTrigger>
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
                                {errors[`institution_${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`institution_${index}`]}</p>
                                )}
                              </div>
                              <div>
                                <Label htmlFor={`degree_${index}`}>Degree</Label>
                                <Select onValueChange={(value) => handleChange(index, "degree", value)} value={edu.degree}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select degree" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-200 text-sm">
                                    {degreeOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {errors[`degree_${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`degree_${index}`]}</p>
                                )}
                                {edu.degree === "Other" && (
                                  <div className="mt-2">
                                    <Input
                                      id={`customDegree_${index}`}
                                      value={edu.customDegree}
                                      onChange={(e) => handleChange(index, "customDegree", e.target.value)}
                                      placeholder="Enter your degree"
                                      className="text-sm"
                                    />
                                    {errors[`customDegree_${index}`] && (
                                      <p className="text-red-500 text-sm mt-1">{errors[`customDegree_${index}`]}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div>
                                <Label htmlFor={`field_of_study_${index}`}>Field of Study</Label>
                                <Select onValueChange={(value) => handleChange(index, "field_of_study", value)} value={edu.field_of_study}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select field of study" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-200 text-sm">
                                    {fieldOfStudyOptions.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {errors[`field_of_study_${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`field_of_study_${index}`]}</p>
                                )}
                                {edu.field_of_study === "Other" && (
                                  <div className="mt-2">
                                    <Input
                                      id={`customFieldOfStudy_${index}`}
                                      value={edu.customFieldOfStudy}
                                      onChange={(e) => handleChange(index, "customFieldOfStudy", e.target.value)}
                                      placeholder="Enter your field of study"
                                      className="text-sm"
                                    />
                                    {errors[`customFieldOfStudy_${index}`] && (
                                      <p className="text-red-500 text-sm mt-1">{errors[`customFieldOfStudy_${index}`]}</p>
                                    )}
                                  </div>
                                )}
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
                                {errors[`start_date_${index}`] && (<p className="text-red-500 text-sm mt-1">{errors[`start_date_${index}`]}</p>
                                )}
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
                                {errors[`end_date_${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`end_date_${index}`]}</p>
                                )}
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
                                {errors[`grade_${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`grade_${index}`]}</p>
                                )}
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
                                {errors[`description_${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`description_${index}`]}</p>
                                )}
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
                  <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner-border animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
                        <span className="ml-2">Submitting...</span>
                      </div>
                    ) : (
                      "Save and Continue"
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

export default Education;




