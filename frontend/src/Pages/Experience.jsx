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
        setIsFetching(false)  
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
     <div className="md:container md:mx-auto md:px-4 md:py-8">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
          <span className="ml-2">fetching...</span>
        </div>
      ) : (
        <Card className="w-full md:max-w-4xl md:mx-auto">
          <CardHeader>
            <CardTitle className="text-lg md:text-3xl font-bold tracking-tight text-left text-primary">
              Work Experience
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Add your professional experiences to showcase your career journey.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 max-h-[65vh] overflow-y-auto p-0 md:pr-4">
                {experiences.map((experience, index) => (
                  <Card key={index} className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center">
                        <Plus className="mr-2" size={20} />
                        Experience {index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-4">
                          <TabsTrigger value="basic" className="text-xs sm:text-sm">Basic</TabsTrigger>
                          <TabsTrigger value="details" className="text-xs sm:text-sm">Detail</TabsTrigger>
                          <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievement</TabsTrigger>
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
                                className="text-sm"
                              />
                              {errors[`job_title_${index}`] && (
                                <p className="text-red-500 text-sm mt-1">{errors[`job_title_${index}`]}</p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor={`company_${index}`}>Company</Label>
                              <Input
                                id={`company_${index}`}
                                value={experience.company}
                                onChange={(e) => handleChange(index, "company", e.target.value)}
                                placeholder="e.g. Tech Solutions Inc."
                                className="text-sm"
                              />
                              {errors[`company_${index}`] && (
                                <p className="text-red-500 text-sm mt-1">{errors[`company_${index}`]}</p>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`startDate_${index}`}>Start Date</Label>
                                <Input
                                  id={`startDate_${index}`}
                                  type="date"
                                  value={experience.startDate}
                                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                  className="text-sm"
                                />
                                {errors[`startDate_${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`startDate_${index}`]}</p>
                                )}
                              </div>
                              <div>
                                <Label htmlFor={`endDate_${index}`}>End Date</Label>
                                <Input
                                  id={`endDate_${index}`}
                                  type="date"
                                  value={experience.endDate}
                                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                  className="text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor={`employmentType_${index}`}>Employment Type</Label>
                              <Select
                                onValueChange={(value) => handleChange(index, "employmentType", value)}
                                value={experience.employmentType}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select employment type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {employmentTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
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
                                    className="text-sm"
                                  />
                                </div>
                              )}
                              {errors[`employmentType_${index}`] && (
                                <p className="text-red-500 text-sm mt-1">{errors[`employmentType_${index}`]}</p>
                              )}
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
                                className="text-sm"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`technologies_${index}`}>Technologies Used</Label>
                              <Textarea
                                id={`technologies_${index}`}
                                value={experience.technologies}
                                onChange={(e) => handleChange(index, "technologies", e.target.value)}
                                placeholder="List the technologies and tools you used"
                                rows={3}
                                className="text-sm"
                              />
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
                              className="text-sm"
                            />
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
              <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
                <Button type="button" onClick={handleAddExperience} className="w-full sm:w-auto flex items-center justify-center">
                  <Plus className="mr-2" size={16} /> Add Experience
                </Button>
                <div className="w-full sm:w-auto">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-5 w-5 mr-2"></div>
                      <span>loading...</span>
                    </div>
                  ) : (
                    <Button type="submit" variant="default" disabled={loading} className="w-full sm:w-auto">
                      Save and Continue
                    </Button>
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


