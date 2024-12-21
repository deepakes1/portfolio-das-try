// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";

// const Certifications = ({ onNext }) => {
//   const { user, isLoaded } = useUser();
//   const [certifications, setCertifications] = useState([
//     {
//       certification_id: "",
//       name: "",
//       issuer: "",
//       issue_date: "",
//       description: "",
//       credential_id: "",
//       credential_url: "",
//     },
//   ]);
//   const [validationErrors, setValidationErrors] = useState({});

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "";
//     return date.toISOString().split("T")[0];
//   };

//   useEffect(() => {
//     if (isLoaded && user) {
//       const fetchCertificationsData = async () => {
//         const userId = user.primaryEmailAddress?.emailAddress;
//         if (!userId) {
//           alert("User not signed in.");
//           return;
//         }

//         try {
//           const response = await axios.get(`http://localhost:3000/api/certifications/${userId}`);
//           if (response.data && response.data.length > 0) {
//             const formattedCertifications = response.data.map((cert) => ({
//               ...cert,
//               issue_date: formatDate(cert.issue_date),
//             }));
//             setCertifications(formattedCertifications);
//           }
//         } catch (error) {
//           console.error("Error fetching certifications data:", error);
//           alert("Error fetching certifications data.");
//         }
//       };

//       fetchCertificationsData();
//     }
//   }, [isLoaded, user]);

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     setCertifications((prevCertifications) => {
//       const updatedCertifications = [...prevCertifications];
//       updatedCertifications[index][name] = value;
//       return updatedCertifications;
//     });
//   };

//   const handleAddCertification = () => {
//     setCertifications((prevCertifications) => [
//       ...prevCertifications,
//       {
//         certification_id: "",
//         name: "",
//         issuer: "",
//         issue_date: "",
//         description: "",
//         credential_id: "",
//         credential_url: "",
//       },
//     ]);
//   };

//  const handleRemoveCertification = async (index) => {
//   const certToRemove = certifications[index];

//   // Proceed only if the certification has a certification_id
//   if (certToRemove.certification_id) {
//     try {
//       const userId = user.primaryEmailAddress?.emailAddress;
//       if (!userId) return alert("User not signed in.");

//       // Perform deletion on the backend by passing the certification_id
//       const response = await axios.delete(`http://localhost:3000/api/certifications/${certToRemove.certification_id}`);

//       if (response.status === 200) {
//         // After successful deletion, update the certifications state
//         setCertifications((prevCertifications) =>
//           prevCertifications.filter((_, i) => i !== index)
//         );
//       } else {
//         alert('Error deleting certification record.');
//       }
//     } catch (error) {
//       console.error("Error deleting certification record:", error);
//       alert("Error deleting certification record.");
//     }
//   } else {
//     // If no certification_id, directly remove from state
//     setCertifications((prevCertifications) =>
//       prevCertifications.filter((_, i) => i !== index)
//     );
//   }
// };



//   const validateFields = () => {
//     const errors = {};
//     certifications.forEach((cert, index) => {
//       if (!cert.name) errors[`name_${index}`] = "Certification name is required";
//       if (!cert.issuer) errors[`issuer_${index}`] = "Issuer is required";
//       if (!cert.issue_date) errors[`issue_date_${index}`] = "Issue date is required";
//       if (!cert.credential_id) errors[`credential_id_${index}`] = "Credential ID is required";
//       if (!cert.credential_url) errors[`credential_url_${index}`] = "Credential URL is required";
//     });

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateFields()) {
//       return;
//     }

//     if (!user) {
//       return alert('User is not signed in');
//     }

//     const user_id = user.primaryEmailAddress?.emailAddress;
//     const certificationsData = {
//       user_id,
//       certifications: certifications.map((cert) => ({
//         certification_id: cert.certification_id || null,
//         name: cert.name,
//         issuer: cert.issuer,
//         issue_date: cert.issue_date,
//         description: cert.description,
//         credential_id: cert.credential_id,
//         credential_url: cert.credential_url,
//       })),
//     };

//     fetch('http://localhost:3000/submit-certifications', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(certificationsData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Success:', data);
//         if (onNext) onNext();
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   if (!isLoaded || !user) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6 p-6  rounded ">
//       <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Certification Details</h2>

//       <div className="space-y-6">
//         {certifications.map((cert, index) => (
//           <div key={index} className="space-y-4">
//             <h3 className="text-lg font-medium ">Certification {index + 1}</h3>

//             <div className="space-y-4">
//               {/* Certification Name */}
//               <div>
//                 <label className="block text-sm font-medium  mb-1">Certification Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={cert.name}
//                   onChange={(e) => handleChange(index, e)}
//                   placeholder="Enter Certification Name"
//                   className={`w-full bg-transparent border-b-2 border-black p-3 focus:outline-none  ${validationErrors[`name_${index}`] ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors[`name_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`name_${index}`]}</p>}
//               </div>

//               {/* Issuer */}
//               <div>
//                 <label className="block text-sm font-medium  mb-1">Issuer</label>
//                 <input
//                   type="text"
//                   name="issuer"
//                   value={cert.issuer}
//                   onChange={(e) => handleChange(index, e)}
//                   placeholder="Enter Certification Issuer"
//                   className={`w-full bg-transparent border-b-2 border-black p-3  focus:outline-none ${validationErrors[`issuer_${index}`] ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors[`issuer_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`issuer_${index}`]}</p>}
//               </div>

//               {/* Issue Date */}
//               <div>
//                 <label className="block text-sm font-medium  mb-1">Issue Date</label>
//                 <input
//                   type="date"
//                   name="issue_date"
//                   value={cert.issue_date || ""}
//                   onChange={(e) => handleChange(index, e)}
//                   className={`w-full bg-transparent border-b-2 border-black p-3 focus:outline-none  ${validationErrors[`issue_date_${index}`] ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors[`issue_date_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`issue_date_${index}`]}</p>}
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium  mb-1">Description</label>
//                 <textarea
//                   name="description"
//                   value={cert.description}
//                   onChange={(e) => handleChange(index, e)}
//                   placeholder="Enter Description"
//                   className="w-full bg-transparent border-b-2 border-black p-3  focus:outline-none"
//                 />
//               </div>

//               {/* Credential ID */}
//               <div>
//                 <label className="block text-sm font-medium  mb-1">Credential ID</label>
//                 <input
//                   type="text"
//                   name="credential_id"
//                   value={cert.credential_id}
//                   onChange={(e) => handleChange(index, e)}
//                   placeholder="Enter Credential ID"
//                   className={`w-full bg-transparent border-b-2 border-black p-3  focus:outline-none ${validationErrors[`credential_id_${index}`] ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors[`credential_id_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`credential_id_${index}`]}</p>}
//               </div>

//               {/* Credential URL */}
//               <div>
//                 <label className="block text-sm font-medium  mb-1">Credential URL</label>
//                 <input
//                   type="url"
//                   name="credential_url"
//                   value={cert.credential_url}
//                   onChange={(e) => handleChange(index, e)}
//                   placeholder="Enter Credential URL"
//                   className={`w-full bg-transparent border-b-2 border-black p-3  focus:outline-none ${validationErrors[`credential_url_${index}`] ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors[`credential_url_${index}`] && <p className="text-red-500 text-sm">{validationErrors[`credential_url_${index}`]}</p>}
//               </div>

//               {/* Remove Certification Button */}
//               <div className="flex justify-between mt-4">
//                 {certifications.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveCertification(index)}
//                     className="bg-red-500 text-white py-2 px-4 rounded-md"
//                   >
//                     Remove Certification
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Add More Certification Button */}
//         <button
//           type="button"
//           onClick={handleAddCertification}
//           className="bg-green-500 text-white py-2 px-4 rounded-md mt-6"
//         >
//           Add More Certification
//         </button>

//         {/* Submit Button */}
//         <div className="mt-8 flex justify-center">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-8 rounded-md"
//           >
//             Submit Certifications
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Certifications;




'use client'

import React, { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Award, Plus, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import GradualSpacing from "../components/ui/gradual-spacing";

const Certifications = ({ onNext }) => {
  const { user, isLoaded } = useUser()
  const [certifications, setCertifications] = useState([{
    certification_id: "",
    name: "",
    issuer: "",
    issue_date: "",
    description: "",
    credential_id: "",
    credential_url: "",
  }])
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
      const fetchCertificationsData = async () => {
        setIsFetching(true)  // Set fetching state to true before the fetch starts
        const userId = user.primaryEmailAddress?.emailAddress
        if (!userId) {
          console.error("User not signed in.")
          return
        }

        try {
          const response = await axios.get(`https://portfolio-das-try-backend.vercel.app/api/certifications/${userId}`)
          if (response.data && response.data.length > 0) {
            const formattedCertifications = response.data.map((cert) => ({
              ...cert,
              issue_date: formatDate(cert.issue_date),
            }))
            setCertifications(formattedCertifications)
          }
        } catch (error) {
          console.error("Error fetching certifications data:", error)
        } finally {
          setIsFetching(false)  // Set fetching state to false after the fetch is complete
        }
      }

      fetchCertificationsData()
    }
  }, [isLoaded, user])

  const handleChange = (index, name, value) => {
    setCertifications((prevCertifications) => {
      const updatedCertifications = [...prevCertifications]
      updatedCertifications[index][name] = value
      return updatedCertifications
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      if (value) delete newErrors[`${name}_${index}`]
      return newErrors
    })
  }

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      {
        certification_id: "",
        name: "",
        issuer: "",
        issue_date: "",
        description: "",
        credential_id: "",
        credential_url: "",
      },
    ])
  }

  const handleRemoveCertification = async (index) => {
    const certToRemove = certifications[index]
    if (certToRemove.certification_id) {
      try {
        const response = await axios.delete(`https://portfolio-das-try-backend.vercel.app/api/certifications/${certToRemove.certification_id}`)
        if (response.status === 200) {
          setCertifications((prevCertifications) => prevCertifications.filter((_, i) => i !== index))
        } else {
          console.error("Failed to remove certification.")
        }
      } catch (error) {
        console.error("Error removing certification:", error)
      }
    } else {
      setCertifications((prevCertifications) => prevCertifications.filter((_, i) => i !== index))
    }
  }

  const validateFields = () => {
    const newErrors = {}
    certifications.forEach((cert, index) => {
      if (!cert.name) newErrors[`name_${index}`] = "Certification name is required"
      if (!cert.issuer) newErrors[`issuer_${index}`] = "Issuer is required"
      if (!cert.issue_date) newErrors[`issue_date_${index}`] = "Issue date is required"
      if (!cert.credential_id) newErrors[`credential_id_${index}`] = "Credential ID is required"
      if (!cert.credential_url) newErrors[`credential_url_${index}`] = "Credential URL is required"
      if (cert.credential_url && !/^https?:\/\/\S+$/.test(cert.credential_url)) {
        newErrors[`credential_url_${index}`] = "Please enter a valid URL"
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
      const certificationsData = {
        user_id: userId,
        certifications: certifications.map((cert) => ({
          certification_id: cert.certification_id || null,
          name: cert.name,
          issuer: cert.issuer,
          issue_date: cert.issue_date,
          description: cert.description,
          credential_id: cert.credential_id,
          credential_url: cert.credential_url,
        })),
      }

      const response = await axios.post('https://portfolio-das-try-backend.vercel.app/submit-certifications', certificationsData)

      if (response.status === 200) {
        console.log("Certifications saved successfully!")
        if (onNext) onNext()
      }
    } catch (error) {
      console.error("Error saving certifications:", error)
    }finally {
      setLoading(false);
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
          text="Certification Details"
        />
          
          <CardDescription>Add your certifications to showcase your skills and achievements.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="md:space-y-6 md:max-h-[60vh] md:overflow-y-auto md:pr-4">
              {certifications.map((cert, index) => (
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
                          <div>
                            <Label htmlFor={`name_${index}`}>Certification Name</Label>
                            <Input
                              id={`name_${index}`}
                              value={cert.name}
                              onChange={(e) => handleChange(index, "name", e.target.value)}
                              placeholder="e.g. AWS Certified Solutions Architect"
                              className="text-sm"
                            />
                            {errors[`name_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`name_${index}`]}</p>}
                          </div>
                          <div>
                            <Label htmlFor={`issuer_${index}`}>Issuer</Label>
                            <Input
                              id={`issuer_${index}`}
                              value={cert.issuer}
                              onChange={(e) => handleChange(index, "issuer", e.target.value)}
                              placeholder="e.g. Amazon Web Services"
                              className="text-sm"
                            />
                            {errors[`issuer_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`issuer_${index}`]}</p>}
                          </div>
                          <div>
                            <Label htmlFor={`issue_date_${index}`}>Issue Date</Label>
                            <Input
                              id={`issue_date_${index}`}
                              type="date"
                              value={cert.issue_date}
                              onChange={(e) => handleChange(index, "issue_date", e.target.value)}
                              className="text-sm"
                            />
                            {errors[`issue_date_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`issue_date_${index}`]}</p>}
                          </div>
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
                          <div>
                            <Label htmlFor={`credential_id_${index}`}>Credential ID</Label>
                            <Input
                              id={`credential_id_${index}`}
                              value={cert.credential_id}
                              onChange={(e) => handleChange(index, "credential_id", e.target.value)}
                              placeholder="e.g. ABC123XYZ"
                              className="text-sm"
                            />
                            {errors[`credential_id_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`credential_id_${index}`]}</p>}
                          </div>
                          <div>
                            <Label htmlFor={`credential_url_${index}`}>Credential URL</Label>
                            <Input
                              id={`credential_url_${index}`}
                              value={cert.credential_url}
                              onChange={(e) => handleChange(index, "credential_url", e.target.value)}
                              placeholder="https://example.com/verify/ABC123XYZ"
                              className="text-sm"
                            />
                            {errors[`credential_url_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`credential_url_${index}`]}</p>}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    {certifications.length > 1 && (
                      <Button variant="destructive" onClick={() => handleRemoveCertification(index)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Certification
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            {activeTab === 'details' && (
              <>
                <Button type="button" onClick={handleAddCertification} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" /> Add Another Certification
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
          "Save Certifications and Continue"
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

export default Certifications

