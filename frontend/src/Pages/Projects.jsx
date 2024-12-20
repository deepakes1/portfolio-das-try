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
import { AlertCircle, FolderGit2, Plus, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import GradualSpacing from "../components/ui/gradual-spacing";

const Projects = ({ onNext }) => {
  const { user, isLoaded } = useUser()
  const [projects, setProjects] = useState([{
    id: 1,
    title: "",
    description: "",
    technologies: "",
    start_date: "",
    end_date: "",
    project_link: "",
    role: "",
    challenges: "",
    achievements: "",
    collaborators: "",
  }])
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('basic')
  const [loading,setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      const fetchProjects = async () => {
        setIsFetching(true)  // Set fetching state to true before the fetch starts
        try {
          const response = await axios.get("http://localhost:3000/api/projects", {
            params: { user_id: user.primaryEmailAddress?.emailAddress },
          })

          if (response.data.length > 0) {
            const sortedProjects = response.data
              .map((project, index) => ({
                ...project,
                id: index + 1,
              }))
              .sort((a, b) => a.id - b.id)

            setProjects(sortedProjects)
          }
        } catch (error) {
          console.error("Error fetching projects:", error)
        } finally {
          setIsFetching(false)  // Set fetching state to false after the fetch is complete
        }
      }

      fetchProjects()
    }
  }, [isLoaded, user])

  const handleChange = (index, name, value) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index][name] = value
      return updatedProjects
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      if (value) delete newErrors[`${name}_${index}`]
      return newErrors
    })
  }

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        id: projects.length + 1,
        title: "",
        description: "",
        technologies: "",
        start_date: "",
        end_date: "",
        project_link: "",
        role: "",
        challenges: "",
        achievements: "",
        collaborators: "",
      },
    ])
  }

  const handleRemoveProject = async (index) => {
    const projectToRemove = projects[index]
    if (projectToRemove.id) {
      try {
        const response = await axios.delete("http://localhost:3000/api/projects", {
          data: { project_id: projectToRemove.id },
        })

        if (response.status === 200) {
          setProjects((prevProjects) => {
            const updatedProjects = prevProjects.filter((_, i) => i !== index)
            return updatedProjects.map((project, i) => ({ ...project, id: i + 1 }))
          })
        } else {
          console.error("Failed to remove project section.")
        }
      } catch (error) {
        console.error("Error removing project section:", error)
      }
    } else {
      setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index))
    }
  }

  const validateFields = () => {
    const newErrors = {}
    projects.forEach((project, index) => {
      if (!project.title) newErrors[`title_${index}`] = "Title is required"
      if (!project.description) newErrors[`description_${index}`] = "Description is required"
      if (!project.technologies) newErrors[`technologies_${index}`] = "Technologies are required"
      if (project.start_date && project.end_date && new Date(project.end_date) < new Date(project.start_date)) {
        newErrors[`end_date_${index}`] = "End Date cannot be earlier than Start Date"
      }
      if (project.project_link && !/^https?:\/\/\S+$/.test(project.project_link)) {
        newErrors[`project_link_${index}`] = "Please enter a valid URL for the project link"
      }
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
      const payload = {
        user_id: userId,
        projects: projects.map((project) => ({
          project_id: project.id,
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          start_date: project.start_date,
          end_date: project.end_date,
          project_link: project.project_link,
          role: project.role,
          challenges: project.challenges,
          achievements: project.achievements,
          collaborators: project.collaborators,
        })),
      }

      const response = await axios.post("http://localhost:3000/api/projects", payload)

      if (response.status === 200) {
        console.log("Projects saved successfully!")
        if (onNext) onNext(projects)
      }
    } catch (error) {
      console.error("Error saving projects:", error)
    }finally {
      setLoading(false)  
    }
  }

  if (!isLoaded) {
    return <div>Loading user data...</div>
  }

  return (
    <div className="container md:mx-auto md:px-4 md:py-8">

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
              className=" text-xl md:text-3xl font-bold -tracking-widest text-left text-black dark:text-white"
              text="Project Details"
            />
              
              <CardDescription>Add your projects to showcase your skills and achievements.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="md:space-y-6 md:max-h-[60vh] md:overflow-y-auto md:pr-4">
                  {projects.map((project, index) => (
                    <Card key={index} className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold flex items-center">
                          <FolderGit2 className="mr-2" />
                          Project {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="hidden md:grid w-full grid-cols-3">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="additional">Additional Info</TabsTrigger>
                          </TabsList>
                          <TabsList className="md:hidden grid w-full grid-cols-3">
                            <TabsTrigger value="basic">1</TabsTrigger>
                            <TabsTrigger value="details">2</TabsTrigger>
                            <TabsTrigger value="additional">3</TabsTrigger>
                          </TabsList>
                          <TabsContent value="basic">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor={`title_${index}`}>Title</Label>
                                <Input
                                  id={`title_${index}`}
                                  value={project.title}
                                  onChange={(e) => handleChange(index, "title", e.target.value)}
                                  placeholder="e.g. E-commerce Website"
                                  className="text-sm"
                                />
                                {errors[`title_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`title_${index}`]}</p>}
                              </div>
                              <div>
                                <Label htmlFor={`description_${index}`}>Description</Label>
                                <Textarea
                                  id={`description_${index}`}
                                  value={project.description}
                                  onChange={(e) => handleChange(index, "description", e.target.value)}
                                  placeholder="Describe your project"
                                  rows={4}
                                  className="text-sm"
                                />
                                {errors[`description_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`description_${index}`]}</p>}
                              </div>
                              <div>
                                <Label htmlFor={`technologies_${index}`}>Technologies</Label>
                                <Input
                                  id={`technologies_${index}`}
                                  value={project.technologies}
                                  onChange={(e) => handleChange(index, "technologies", e.target.value)}
                                  placeholder="e.g. React, Node.js, MongoDB"
                                  className="text-sm"
                                />
                                {errors[`technologies_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`technologies_${index}`]}</p>}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="details">
                            <div className="space-y-4">
                              <div className="md:flex md:flex-row md:gap-4 md:justify-between">
                                <div>
                                  <Label htmlFor={`start_date_${index}`}>Start Date</Label>
                                  <Input
                                    id={`start_date_${index}`}
                                    type="date"
                                    value={project.start_date}
                                    onChange={(e) => handleChange(index, "start_date", e.target.value)}
                                    className="text-sm"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`end_date_${index}`}>End Date</Label>
                                  <Input
                                    id={`end_date_${index}`}
                                    type="date"
                                    value={project.end_date}
                                    onChange={(e) => handleChange(index, "end_date", e.target.value)}
                                    className="text-sm"
                                  />
                                  {errors[`end_date_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`end_date_${index}`]}</p>}
                                </div>
                              </div>
                              <div>
                                <Label htmlFor={`project_link_${index}`}>Project Link</Label>
                                <Input
                                  id={`project_link_${index}`}
                                  value={project.project_link}
                                  onChange={(e) => handleChange(index, "project_link", e.target.value)}
                                  placeholder="https://example.com"
                                  className="text-sm"
                                />
                                {errors[`project_link_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`project_link_${index}`]}</p>}
                              </div>
                              <div>
                                <Label htmlFor={`role_${index}`}>Your Role</Label>
                                <Input
                                  id={`role_${index}`}
                                  value={project.role}
                                  onChange={(e) => handleChange(index, "role", e.target.value)}
                                  placeholder="e.g. Lead Developer" 
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="additional">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor={`challenges_${index}`}>Challenges</Label>
                                <Textarea
                                  id={`challenges_${index}`}
                                  value={project.challenges}
                                  onChange={(e) => handleChange(index, "challenges", e.target.value)}
                                  placeholder="Describe the challenges you faced"
                                  rows={3}
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`achievements_${index}`}>Achievements</Label>
                                <Textarea
                                  id={`achievements_${index}`}
                                  value={project.achievements}
                                  onChange={(e) => handleChange(index, "achievements", e.target.value)}
                                  placeholder="List your key achievements in this project"
                                  rows={3}
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`collaborators_${index}`}>Collaborators</Label>
                                <Input
                                  id={`collaborators_${index}`}
                                  value={project.collaborators}
                                  onChange={(e) => handleChange(index, "collaborators", e.target.value)}
                                  placeholder="e.g. John Doe, Jane Smith"
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                      <CardFooter>
                        {projects.length > 1 && (
                          <Button variant="destructive" onClick={() => handleRemoveProject(index)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove Project
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                {activeTab === 'additional' && (
                  <>
                    <Button type="button" onClick={handleAddProject} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Add Another Project
                    </Button>
                    <CardFooter>
                    <div className="mt-4 w-full">
                      <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                        {loading ? (
                          <div className="flex items-center justify-center">
                            {/* Spinner */}
                            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-5 w-5 mr-2"></div>
                            <span>Loading...</span>
                          </div>
                        ) : (
                          "Save Projects and Continue"
                        )}
                      </Button>
                    </div>
                    </CardFooter>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
          )}
           {Object.keys(errors).length > 0 && (
             <Alert variant="destructive" className="mt-4">
             <AlertCircle className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>
               Please correct the errors in the form before submitting.
            </AlertDescription>
           </Alert>
          )}
          
    </div>
  )
}

export default Projects

