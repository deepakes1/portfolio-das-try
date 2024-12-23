'use client'

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Award, Plus, Trash2, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import GradualSpacing from "../components/ui/gradual-spacing"

// Initial state for a new certification
const INITIAL_CERTIFICATION = {
  certification_id: "",
  name: "",
  issuer: "",
  issue_date: "",
  description: "",
  credential_id: "",
  credential_url: "",
}

const API_BASE_URL = 'https://portfolio-das-try-backend.vercel.app/'

const Certifications = ({ onNext }) => {
  const { user, isLoaded } = useUser()
  const [certifications, setCertifications] = useState([INITIAL_CERTIFICATION])
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('basic')
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const formatDate = useCallback((dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "" : date.toISOString().split('T')[0]
  }, [])

  const validateUrl = useCallback((url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }, [])

  const fetchCertifications = useCallback(async (userId) => {
    setIsFetching(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/certifications/${userId}`)
      if (response.data?.length > 0) {
        setCertifications(response.data.map(cert => ({
          ...cert,
          issue_date: formatDate(cert.issue_date),
        })))
      }
    } catch (error) {
      console.error("Error fetching certifications:", error)
    } finally {
      setIsFetching(false)
    }
  }, [formatDate])

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      fetchCertifications(user.primaryEmailAddress.emailAddress)
    }
  }, [isLoaded, user, fetchCertifications])

  const handleChange = useCallback((index, name, value) => {
    setCertifications(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [name]: value }
      return updated
    })
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[`${name}_${index}`]
      return newErrors
    })
  }, [])

  const handleAddCertification = useCallback(() => {
    setCertifications(prev => [...prev, { ...INITIAL_CERTIFICATION }])
  }, [])

  const handleRemoveCertification = useCallback(async (index) => {
    const certToRemove = certifications[index]
    if (certToRemove.certification_id) {
      try {
        await axios.delete(`${API_BASE_URL}/api/certifications/${certToRemove.certification_id}`)
        setCertifications(prev => prev.filter((_, i) => i !== index))
      } catch (error) {
        console.error("Error removing certification:", error)
      }
    } else {
      setCertifications(prev => prev.filter((_, i) => i !== index))
    }
  }, [certifications])

  const validateFields = useCallback(() => {
    const newErrors = {}
    certifications.forEach((cert, index) => {
      if (!cert.name?.trim()) newErrors[`name_${index}`] = "Certification name is required"
      if (!cert.issuer?.trim()) newErrors[`issuer_${index}`] = "Issuer is required"
      if (!cert.issue_date) newErrors[`issue_date_${index}`] = "Issue date is required"
      if (!cert.credential_id?.trim()) newErrors[`credential_id_${index}`] = "Credential ID is required"
      if (!cert.credential_url?.trim()) {
        newErrors[`credential_url_${index}`] = "Credential URL is required"
      } else if (!validateUrl(cert.credential_url)) {
        newErrors[`credential_url_${index}`] = "Please enter a valid URL"
      }
    })
    return newErrors
  }, [certifications, validateUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateFields()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const userId = user?.primaryEmailAddress?.emailAddress
    if (!userId) {
      console.error("User not authenticated")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/submit-certifications`, {
        user_id: userId,
        certifications: certifications.map(({ certification_id, ...cert }) => ({
          certification_id: certification_id || null,
          ...cert
        }))
      })

      if (response.status === 200) {
        onNext?.()
      }
    } catch (error) {
      console.error("Error saving certifications:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const renderCertificationCard = (cert, index) => (
    <Card key={index} className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-semibold flex items-center">
          <Award className="mr-2" />
          Certification {index + 1}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <div className="space-y-4">
              {['name', 'issuer', 'issue_date'].map((field) => (
                <div key={field}>
                  <Label htmlFor={`${field}_${index}`}>
                    {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Label>
                  <Input
                    id={`${field}_${index}`}
                    type={field === 'issue_date' ? 'date' : 'text'}
                    value={cert[field]}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                    placeholder={`Enter ${field.replace('_', ' ')}`}
                    className="text-sm"
                  />
                  {errors[`${field}_${index}`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`${field}_${index}`]}</p>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-4">
              <div>
                <Label htmlFor={`description_${index}`}>Description</Label>
                <Textarea
                  id={`description_${index}`}
                  value={cert.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  placeholder="Describe your certification and its significance"
                  rows={3}
                  className="text-sm"
                />
              </div>
              {['credential_id', 'credential_url'].map((field) => (
                <div key={field}>
                  <Label htmlFor={`${field}_${index}`}>
                    {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Label>
                  <Input
                    id={`${field}_${index}`}
                    value={cert[field]}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                    placeholder={`Enter ${field.replace('_', ' ')}`}
                    className="text-sm"
                  />
                  {errors[`${field}_${index}`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`${field}_${index}`]}</p>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {certifications.length > 1 && (
          <Button 
            variant="destructive" 
            onClick={() => handleRemoveCertification(index)}
            className="flex items-center"
          >
            <Trash2 className="mr-2 h-4 w-4" /> 
            Remove Certification
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <div className="container md:mx-auto md:px-4 md:py-8">
      {isFetching ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Fetching certifications...</span>
        </div>
      ) : (
        <Card className="w-full md:max-w-4xl md:mx-auto">
          <CardHeader>
            <GradualSpacing
              className="text-xl md:text-3xl font-bold -tracking-widest text-left text-black dark:text-white"
              text="Certification Details"
            />
            <CardDescription>
              Add your certifications to showcase your skills and achievements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="md:space-y-6 md:max-h-[60vh] md:overflow-y-auto md:pr-4">
                <AnimatePresence mode="popLayout">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderCertificationCard(cert, index)}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {activeTab === 'details' && (
                <>
                  <Button
                    type="button"
                    onClick={handleAddCertification}
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" /> 
                    Add Another Certification
                  </Button>
                  <CardFooter>
                    <Button 
                      onClick={handleSubmit} 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          <span>Saving...</span>
                        </div>
                      ) : (
                        "Save Certifications and Continue"
                      )}
                    </Button>
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

export default Certifications