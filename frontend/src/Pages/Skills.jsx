
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
  const { user, isLoaded } = useUser();
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [addedSkills, setAddedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [customSkill, setCustomSkill] = useState('');  // New state for custom skill
  const skillsPerPage = 12;

  useEffect(() => {
    if (!isLoaded || !user) return;

    const user_id = user.primaryEmailAddress?.emailAddress;
    if (user_id) {
      const fetchSkills = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://portfolio-das-try-backend.vercel.app/api/skills/${user_id}`);
          if (Array.isArray(response.data)) {
            setAddedSkills(response.data.map(skill => ({
              id: skill.skill_id,
              skill_name: skill.skill_name,
              proficiency: skill.proficiency,
            })));
          }
        } catch (error) {
          setError('Error fetching user skills.');
        } finally {
          setLoading(false);
        }
      };

      setSkills(skillsData.map((skill, index) => ({
        id: index + 1,
        skill_name: skill.skill,
      })));

      fetchSkills();
    }
  }, [user, isLoaded]);

  const handleSkillSelect = useCallback((skill) => {
    setSelectedSkills(prev => prev.includes(skill)
      ? prev.filter(s => s !== skill)
      : [...prev, skill]);
  }, []);

  const addSelectedSkills = useCallback(() => {
    const newSkills = selectedSkills.map(skill => ({
      ...skill,
      id: `${skill.id}-${Math.random()}`,
      proficiency: 50,
    }));

    if (customSkill.trim()) {
      newSkills.push({
        id: `${Math.random()}`,
        skill_name: customSkill,
        proficiency: 50,
      });
      setCustomSkill('');  // Clear the custom skill input field after adding
    }

    setAddedSkills(prev => [...prev, ...newSkills]);
    setSelectedSkills([]);
  }, [selectedSkills, customSkill]);

  const handleSliderChange = (id, value) => {
    setAddedSkills(prev => prev.map(skill =>
      skill.id === id ? { ...skill, proficiency: value } : skill));
  };

  const handleRemoveSkill = async (id) => {
    try {
      const updatedSkills = addedSkills.filter(skill => skill.id !== id);
      const reSequencedSkills = updatedSkills.map((skill, index) => ({
        ...skill,
        id: index + 1,
      }));

      setAddedSkills(reSequencedSkills);

      const user_id = user.primaryEmailAddress?.emailAddress;
      await axios.delete('https://portfolio-das-try-backend.vercel.app/api/skills', {
        data: { userId: user_id, skillId: id },
      });
    } catch (error) {
      setError('Error removing skill.');
    }
  };

  const handleSaveSkills = async () => {
    setSubmitting(true); // Start the loader
    try {
      const user_id = user.primaryEmailAddress?.emailAddress;
      const payload = {
        userId: user_id,
        skills: addedSkills.map(({ skill_name, proficiency }) => ({
          skillName: skill_name,
          proficiency,
        })),
      };
      await axios.post('https://portfolio-das-try-backend.vercel.app/api/skills', payload);
      onNext(addedSkills);
    } catch (error) {
      setError('Error saving skills.');
    } finally {
      setSubmitting(false); // Stop the loader
    }
  };

  const filteredSkills = skills.filter(skill =>
    skill.skill_name.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayedSkills = filteredSkills.slice(
    currentPage * skillsPerPage,
    (currentPage + 1) * skillsPerPage
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <GradualSpacing
          className="text-3xl font-bold -tracking-widest text-left text-black dark:text-white"
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
            disabled={selectedSkills.length === 0 && !customSkill.trim()}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Selected Skills
          </Button>

          {/* Add custom skill input field */}
          <div className="mt-4">
            <Input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Add a custom skill"
              className="w-full"
            />
          </div>
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
  );
};


export default Skills


