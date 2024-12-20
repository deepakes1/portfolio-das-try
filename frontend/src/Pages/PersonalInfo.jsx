
import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Briefcase, Github, Linkedin, MapPin, Phone, User } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import GradualSpacing from "../components/ui/gradual-spacing";


const titlesList = [
  "Front-End Developer", "Full-Stack Engineer", "React.js Developer",
  "UI/UX Designer", "Software Engineer", "Graphic Designer",
  "Backend Developer", "DevOps Engineer", "Data Scientist",
  "Product Manager", "Mobile Developer", "Cloud Architect",
  "Security Engineer", "Database Administrator", "AI Specialist",
  "Machine Learning Engineer", "Blockchain Developer",
  "Network Engineer", "Business Intelligence Analyst",
  "Systems Architect", "Game Developer", "Web Developer",
  "Application Developer", "Software Tester", "Cloud Engineer",
  "Digital Marketing Specialist", "Business Analyst", "DevOps Specialist",
  "Site Reliability Engineer", "Technical Support Engineer", "Product Designer",
  "Data Engineer", "Embedded Systems Engineer", "Research Scientist",
  "Automation Engineer", "IT Support Specialist", "Data Analyst",
  "Solutions Architect", "Blockchain Engineer", "UI Developer",
  "Cloud Solutions Architect", "Quantum Computing Specialist", "Enterprise Architect",
  "Voice UI Developer", "Data Visualization Specialist", "Security Analyst",
  "Agile Coach", "Scrum Master", "Interaction Designer",
  "Performance Engineer", "Compliance Analyst", "Network Security Engineer",
  "IT Project Manager", "Mobile App Designer", "Hardware Engineer",
  "Application Security Engineer", "Cloud Security Engineer", "Embedded Software Engineer",
  "Virtual Reality Developer", "Augmented Reality Developer", "IT Consultant",
  "Product Owner", "Systems Engineer", "Full-Stack Developer",
  "Cloud Operations Engineer", "Artificial Intelligence Engineer"
];



const PersonalInfo = ({ onNext }) => {
  const { user, isLoaded } = useUser()
  const [formData, setFormData] = useState({
    user_id: "",
    firstName: "",
    lastName: "",
    location: "",
    profilePicture: "",
    professionalTitle: "",
    customTitle: "",
    summary: "",
    socialLinks: { linkedIn: "", github: "" },
    mobileNumber: "",
    emailAddress: "",
  })

  const [filteredTitles, setFilteredTitles] = useState(titlesList)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
   const [activeTab, setActiveTab] = useState("basic"); 
   const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {

    if (!isLoaded) return

    if (user) {
      const user_id = user.primaryEmailAddress?.emailAddress
      if (user_id) {
        setFormData((prevData) => ({ ...prevData, user_id, emailAddress: user_id }))

        const fetchPersonalInfo = async () => {
          setIsFetching(true)  // Set fetching state to true before the fetch starts
          try {
            const response = await axios.get(`https://portfolio-das-try-backend.vercel.app/api/personal-info?user_id=${user_id}`)
            if (response.data) {
              setFormData((prevData) => ({
                ...prevData,
                firstName: response.data.first_name || "",
                lastName: response.data.last_name || "",
                location: response.data.location || "",
                profilePicture: response.data.profile_picture || "",
                professionalTitle: response.data.professional_title || "",
                customTitle: response.data.custom_title || "",
                summary: response.data.summary || "",
                socialLinks: {
                  linkedIn: response.data.linkedin || "",
                  github: response.data.github || "",
                },
                mobileNumber: response.data.mobile_number || "",
                emailAddress: response.data.email || ""
              }))
            }
          } catch (error) {
            console.error("Error fetching personal info:", error)
          } finally {
            setIsFetching(false)  // Set fetching state to false after the fetch is complete
          }
        }
        fetchPersonalInfo()
      }
    }

    if (searchQuery === "") {
      setFilteredTitles(titlesList)
    } else {
      const lowercasedQuery = searchQuery.toLowerCase()
      setFilteredTitles(
        titlesList.filter((title) => title.toLowerCase().startsWith(lowercasedQuery))
      )
    }
  }, [user, isLoaded, searchQuery])

  

  const handleChange = useCallback((name, value) => {
    if (name === "profilePicture" && value instanceof FileList) {
      setFormData((prevData) => ({ ...prevData, [name]: value[0] }))
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    if (name === "professionalTitle") {
      const searchQuery = value.toLowerCase()
      setFilteredTitles(titlesList.filter((title) => title.toLowerCase().includes(searchQuery)))
    }
  }, [])

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const newErrors = {};

  // Custom Validation: Check for empty required fields
  if (!formData.firstName) newErrors.firstName = "First name is required.";
  if (!formData.lastName) newErrors.lastName = "Last name is required.";
  if (!formData.location) newErrors.location = "Location is required.";
  if (!formData.summary) newErrors.summary = "Summary is required.";
  if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
  if (!formData.emailAddress) newErrors.emailAddress = "Email is required.";  // Email validation

  // If any required field is missing, stop submission
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsSubmitting(false);
    return;
  }

  const finalTitle = formData.professionalTitle === "Other" ? formData.customTitle : formData.professionalTitle;

  const dataToSend = new FormData();
  dataToSend.append("user_id", formData.user_id);
  dataToSend.append("firstName", formData.firstName);
  dataToSend.append("lastName", formData.lastName);
  dataToSend.append("mobileNumber", formData.mobileNumber);
  dataToSend.append("location", formData.location);

  // Append the profile picture only if it's a new file (i.e., it's a file object, not a string)
  if (formData.profilePicture && formData.profilePicture instanceof File) {
    dataToSend.append("profilePicture", formData.profilePicture);
  } else {
    // If the profilePicture is a string (the existing file path), send it as-is
    dataToSend.append("profilePicture", formData.profilePicture || null);
  }

  dataToSend.append("professionalTitle", finalTitle);
  dataToSend.append("customTitle", formData.professionalTitle === "Other" ? formData.customTitle : "");
  dataToSend.append("summary", formData.summary);
  dataToSend.append("socialLinks", JSON.stringify(formData.socialLinks));
  dataToSend.append("emailAddress", formData.emailAddress);

  try {
    await axios.post("https://portfolio-das-try-backend.vercel.app/api/personal-info", dataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    console.log(dataToSend);
    
    onNext();
  } catch (error) {
    console.error("Error submitting form:", error);
    alert(`Error: ${error.response?.data?.message || "Something went wrong."}`);
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="container mx-auto px-4 py-8">
  {isFetching ? (
    <div className="flex items-center justify-center">
      {/* Spinner */}
      <div className="spinner-border animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      <span className="ml-2">fetching...</span>
    </div>
  ) : (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <GradualSpacing
          className="text-lg md:text-3xl font-bold -tracking-widest text-left text-black dark:text-white"
          text="Personal Information"
        />
        <CardDescription>Let's get to know you better. Fill in your details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs
            defaultValue="basic"
            className="w-full"
            onValueChange={(value) => setActiveTab(value)} // Update activeTab on tab change
          >
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4">
              <TabsTrigger value="basic" className="transition-all ease-in duration-200 hover:scale-105 hover:bg-slate-200">Basic</TabsTrigger>
              <TabsTrigger value="professional" className="transition-all ease-in duration-200 hover:scale-105 hover:bg-slate-200">Professional</TabsTrigger>
              <TabsTrigger value="contact" className="transition-all ease-in duration-200 hover:scale-105 hover:bg-slate-200">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <div className="space-y-4">
                {/* Profile Picture, Name, and Location */}
                <div className="flex flex-col md:flex-row items-center space-x-4 space-y-4 md:space-y-0">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={
                        formData.profilePicture instanceof File
                          ? URL.createObjectURL(formData.profilePicture)
                          : formData.profilePicture // Use the path if it's a string
                      }
                    />
                    <AvatarFallback>
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input
                      id="profilePicture"
                      type="file"
                      onChange={(e) => handleChange("profilePicture", e.target.files)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* First Name, Last Name, Location */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="text-sm "
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className="text-sm "
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="e.g., New York, USA"
                      className="pl-8 text-sm "
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="professional">
              <div className="space-y-4">
                {/* Professional Title and Summary */}
                <div>
                  <Label htmlFor="professionalTitle">Professional Title</Label>
                  <Select
                    onValueChange={(value) => handleChange("professionalTitle", value)}
                    value={formData.professionalTitle}
                  >
                    <SelectTrigger className="relative bg-blue-50 text-blue-900 border border-blue-300 rounded-lg py-2 px-4">
                      <SelectValue placeholder="Select a title" />
                    </SelectTrigger>
                    <SelectContent className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                      {/* Add a search input inside the dropdown */}
                      <div className="px-4 py-2">
                        <Input
                          type="text"
                          placeholder="Search for a title"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full py-1 px-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      {/* Loop through the filtered titles and display them */}
                      {filteredTitles.slice(0, 4).map((title) => (
                        <SelectItem
                          key={title}
                          value={title}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
                        >
                          {title}
                        </SelectItem>
                      ))}

                      {/* Always show the 'Other' option as the last item */}
                      <SelectItem
                        value="Other"
                        className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.professionalTitle === "Other" && (
                  <div>
                    <Label htmlFor="customTitle">Custom Professional Title</Label>
                    <Input
                      id="customTitle"
                      value={formData.customTitle}
                      onChange={(e) => handleChange("customTitle", e.target.value)}
                      placeholder="Enter your custom title"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => handleChange("summary", e.target.value)}
                    placeholder="Tell us about yourself and your professional experience"
                    rows={4}
                    className="text-sm "
                  />
                  {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <div className="space-y-4">
                {/* Contact Info */}
                <div>
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => handleChange("mobileNumber", e.target.value)}
                      placeholder="Enter your mobile number"
                      className="pl-8 text-sm "
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleChange("emailAddress", e.target.value)}
                    placeholder="Enter your email"
                    className="text-sm "
                  />
                  {errors.emailAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>
                  )}
                </div>
                {/* LinkedIn and GitHub Inputs */}
                <div>
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="linkedIn"
                      value={formData.socialLinks.linkedIn}
                      onChange={(e) =>
                        handleChange("socialLinks", {
                          ...formData.socialLinks,
                          linkedIn: e.target.value,
                        })
                      }
                      placeholder="Your LinkedIn profile URL"
                      className="pl-8 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="github">GitHub Profile</Label>
                  <div className="relative">
                    <Github className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="github"
                      value={formData.socialLinks.github}
                      onChange={(e) =>
                        handleChange("socialLinks", {
                          ...formData.socialLinks,
                          github: e.target.value,
                        })
                      }
                      placeholder="Your GitHub profile URL"
                      className="pl-8 text-sm "
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>

      {/* Show the button only when the 'contact' tab is active */}
      {activeTab === "contact" && (
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Saving..." : "Save and Continue"}
          </Button>
        </CardFooter>
      )}
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

export default PersonalInfo




