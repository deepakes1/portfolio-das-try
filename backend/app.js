const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
const multer = require("multer");
const path = require("path");
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/api/personal-info", upload.single("profilePicture"), async (req, res) => {
  const { user_id, firstName, lastName, mobileNumber, location, professionalTitle, customTitle, summary, socialLinks, emailAddress } = req.body;
  
  console.log("Request body:", req.body); // Log the received request body for debugging

  // Check if required fields are provided
  if (!user_id || !firstName || !lastName || !mobileNumber || !location || !summary || !emailAddress) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  // Parse the socialLinks JSON string into an object (this step is important)
  let socialLinksParsed = {};
  try {
    socialLinksParsed = JSON.parse(socialLinks);
  } catch (error) {
    return res.status(400).json({ message: "Invalid socialLinks format" });
  }

  const { linkedIn, github } = socialLinksParsed;

  // Get the profile picture file path (if it exists)
  let profilePicture = req.file ? req.file.filename : null;  // If a new file is uploaded, use the filename; otherwise, it's null

  // SQL query to update user data
  const updateQuery = `
    UPDATE Users
    SET 
      first_name = $1,
      last_name = $2,
      mobile_number = $3,
      location = $4,
      profile_picture = $5,
      professional_title = $6,
      custom_title = $7,
      summary = $8,
      linkedin = $9,
      github = $10,
      email = $11,
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $12
    RETURNING *;
  `;

  try {
    // Run the query to update the user data in the database
    const result = await pool.query(updateQuery, [
      firstName, 
      lastName, 
      mobileNumber, 
      location, 
      profilePicture, 
      professionalTitle, 
      customTitle, 
      summary, 
      linkedIn, 
      github, 
      emailAddress, 
      user_id
    ]);

    // If no user was found with the given user_id, return 404
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success and updated user data
    res.json({ message: "User data updated successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.get("/", async (req, res) => {
  res.send("Hello World");
});


// API endpoint to get user data
app.get("/api/personal-info", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const query = "SELECT * FROM users WHERE user_id = $1;";
    const { rows } = await pool.query(query, [user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No data found for this user." });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Database error. Please try again later." });
  }
});



app.post('/api/work-experience', async (req, res) => {
  const { userId, experienceId, job_title, company, start_date, end_date, description, technologies, achievements, employment_type, custom_employment_type } = req.body;

  // Ensure required fields are provided
  if (!userId || !job_title || !company || !start_date || !employment_type) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    // Check if experienceId exists and update if necessary
    if (experienceId) {
      const existingExperience = await client.query(
        `SELECT * FROM Experience WHERE user_id = $1 AND experience_id = $2`,
        [userId, experienceId]
      );

      if (existingExperience.rows.length > 0) {
        // Update existing experience
        const result = await client.query(
          `UPDATE Experience SET 
            job_title = $1,
            company = $2,
            start_date = $3, 
            end_date = $4, 
            description = $5,
            technologies = $6, 
            achievements = $7, 
            employment_type = $8,
            custom_employment_type = $9,  -- update the custom_employment_type field
            updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $10 AND experience_id = $11
           RETURNING *`,
          [job_title, company, start_date, end_date, description, technologies, achievements, employment_type, employment_type === "Other" ? custom_employment_type : null, userId, experienceId]
        );

        await client.query('COMMIT'); // Commit transaction
        return res.status(200).json({ success: true, message: 'Work experience updated successfully', experience: result.rows[0] });
      }
    }

    // Insert new experience if it doesn't exist
    const result = await client.query(
      `INSERT INTO Experience (user_id, job_title, company, start_date, end_date,
       description, technologies, achievements, employment_type, custom_employment_type, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
      [userId, job_title, company, start_date, end_date, description, technologies, achievements, employment_type, employment_type === "Other" ? custom_employment_type : null]
    );

    await client.query('COMMIT'); // Commit transaction
    return res.status(201).json({ success: true, message: 'Work experience saved successfully', experience: result.rows[0] });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error handling work experience:', error);
    return res.status(500).json({ success: false, message: 'Error saving work experience' });
  } finally {
    client.release();
  }
});



app.get("/api/work-experience", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const query = "SELECT * FROM experience WHERE user_id = $1 ORDER BY start_date DESC;";
    const { rows } = await pool.query(query, [user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No work experience found for this user." });
    }

const formatDate = (dateString) => {
  if (!dateString) return ""; // Return empty string if date is missing
  const date = new Date(dateString);

  // Check if it's a valid date
  if (isNaN(date.getTime())) return "";

  // Adjust for the timezone offset to avoid unexpected date shifts
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  // Return the date in YYYY-MM-DD format
  return date.toISOString().split('T')[0];
};


    // Format the dates in the rows before sending to the client
    const formattedRows = rows.map(row => ({
      ...row,
      start_date: formatDate(row.start_date),
      end_date: formatDate(row.end_date),
    }));

    res.status(200).json(formattedRows);
  } catch (error) {
    console.error("Error fetching work experience:", error);
    res.status(500).json({ error: "Database error. Please try again later." });
  }
});


app.delete('/api/work-experience', async (req, res) => {
  console.log(req.body); // Log the request body to check the payload

  const { experience_id } = req.body; // Get the experience_id from the request body

  if (!experience_id) {
    return res.status(400).json({ message: 'Experience ID is required' });
  }

  try {
    // SQL query to delete the experience based on the experience_id
    const query = 'DELETE FROM experience WHERE experience_id = $1 RETURNING *';
    const values = [experience_id];

    // Use pool.query instead of client.query
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
});







app.get('/api/skills/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT skill_id, skill_name, proficiency FROM skills WHERE user_id = $1', [userId]);
    res.json(result.rows); // Return user skills
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// API endpoint to save the user's skills
app.post('/api/skills', async (req, res) => {
  const { userId, skills } = req.body;

  // Start a database transaction to handle multiple insertions
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    for (const skill of skills) {
      const { skillName, proficiency } = skill;

      // Check if the skill already exists for the user
      const existingSkill = await client.query(
        'SELECT * FROM skills WHERE user_id = $1 AND skill_name = $2',
        [userId, skillName]
      );

      if (existingSkill.rows.length === 0) {
        // Insert new skill if it doesn't exist
        await client.query(
          'INSERT INTO skills (user_id, skill_name, proficiency, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
          [userId, skillName, proficiency]
        );
      } else {
        // Optionally update the proficiency if the skill already exists
        await client.query(
          'UPDATE skills SET proficiency = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND skill_name = $3',
          [proficiency, userId, skillName]
        );
      }
    }

    await client.query('COMMIT'); // Commit transaction
    res.status(201).json({ message: 'Skills saved successfully!' });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error saving skills:', error);
    res.status(500).json({ error: 'Failed to save skills' });
  } finally {
    client.release();
  }
});


app.delete('/api/skills', async (req, res) => {
  const { userId, skillId } = req.body;

  try {
    // 1. Delete the skill from the database
    await pool.query('DELETE FROM skills WHERE user_id = $1 AND skill_id = $2', [userId, skillId]);

    // 2. Optionally, re-sequence the skills (to ensure the skill_id starts from 1)
    // Re-sequencing can be done by adjusting the skill_id in the database for remaining skills
    const result = await pool.query('SELECT skill_id FROM skills WHERE user_id = $1 ORDER BY skill_id', [userId]);

    // 3. Reassign IDs to the remaining skills to remove gaps
    const updatePromises = result.rows.map((row, index) => {
      return pool.query('UPDATE skills SET skill_id = $1 WHERE user_id = $2 AND skill_id = $3', [
        index + 1,  // New ID starts from 1
        userId,
        row.skill_id,  // Old skill_id
      ]);
    });

    // Wait for all updates to finish
    await Promise.all(updatePromises);

    // 4. Send response back to frontend
    res.status(200).send({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error.message);
    res.status(500).send({ error: 'An error occurred while deleting the skill' });
  }
});




app.post('/submit-education', async (req, res) => {
  const { user_id, education } = req.body;

  // Start a transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (let edu of education) {
      const { education_id, institution, degree, field_of_study, start_date, end_date, grade, description } = edu;

      // Check if education data already exists for this user by user_id and education_id
      let query;
      let values;
      if (education_id) {
        // Update the existing record if education_id is provided
        query = `
          UPDATE Education
          SET institution = $1, degree = $2, field_of_study = $3, start_date = $4, 
              end_date = $5, grade = $6, description = $7
          WHERE user_id = $8 AND education_id = $9
          RETURNING *;
        `;
        values = [
          institution, degree, field_of_study, start_date, end_date, grade, description, user_id, education_id
        ];
      } else {
        // Insert a new record if education_id is not provided (new entry)
        query = `
          INSERT INTO Education (
            user_id, institution, degree, field_of_study, start_date, end_date, grade, description
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;
        values = [
          user_id, institution, degree, field_of_study, start_date, end_date, grade, description
        ];
      }

      // Execute query (either update or insert)
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Failed to store education data');
      }
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Education data stored or updated successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error storing/updating education data:', error);
    res.status(500).json({ error: 'Failed to store or update education data' });
  } finally {
    client.release();
  }
});

app.get('/api/education/:userId', async (req, res) => {
  const { userId } = req.params; // Get userId from URL parameters

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return empty string if date is missing
    const date = new Date(dateString);

    // Check if it's a valid date
    if (isNaN(date.getTime())) return "";

    // Adjust for the timezone offset to avoid unexpected date shifts
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    // Return the date in YYYY-MM-DD format
    return date.toISOString().split('T')[0];
  };

  try {
    // Fetch the education details for the given userId
    const query = 'SELECT education_id, institution, degree, field_of_study, start_date, end_date, grade, description FROM Education WHERE user_id = $1';
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(200).json({ education: [] }); // No education records found for this user
    }

    // Format the dates correctly using the provided formatDate function
    const formattedEducation = rows.map((education) => ({
      ...education,
      start_date: formatDate(education.start_date),
      end_date: formatDate(education.end_date),
    }));

    // Return the formatted education records
    res.status(200).json({ education: formattedEducation });
  } catch (error) {
    console.error('Error fetching education data:', error);
    res.status(500).json({ error: 'Failed to fetch education data' });
  }
});


// DELETE education record for a specific user and education ID
app.delete('/api/education/:userId/:educationId', async (req, res) => {
  const { userId, educationId } = req.params;

  console.log(`Received delete request for userId: ${userId}, educationId: ${educationId}`);

  try {
    if (!userId || !educationId) {
      return res.status(400).json({ error: 'User ID and Education ID are required.' });
    }

    // 1. Delete the education record from the database
    const deleteQuery = 'DELETE FROM Education WHERE user_id = $1 AND education_id = $2';
    const deleteResult = await pool.query(deleteQuery, [userId, educationId]);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: 'Education record not found.' });
    }

    // 2. Re-sequence the remaining education records for the user (to ensure education_id starts from 1)
    const remainingEducationQuery = 'SELECT education_id FROM Education WHERE user_id = $1 ORDER BY education_id';
    const remainingResult = await pool.query(remainingEducationQuery, [userId]);

    // 3. Reassign education_ids to the remaining records to remove any gaps
    const updatePromises = remainingResult.rows.map((row, index) => {
      return pool.query(
        'UPDATE Education SET education_id = $1 WHERE user_id = $2 AND education_id = $3',
        [
          index + 1,  // New ID starts from 1 and increments
          userId,
          row.education_id,  // Old education_id
        ]
      );
    });

    // Wait for all the update queries to finish
    await Promise.all(updatePromises);

    // 4. Send response back to frontend
    res.status(200).json({ message: 'Education record deleted and re-sequenced successfully.' });
  } catch (error) {
    console.error('Error deleting education record:', error);
    res.status(500).json({ error: 'Failed to delete education record' });
  }
});






app.post('/api/projects', async (req, res) => {
  const { user_id, projects } = req.body;

  // Start a transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const project of projects) {
      const {
        project_id, // Optional: used for update if provided
        title,
        description,
        technologies,
        start_date,
        end_date,
        project_link,
        role,
        challenges,
        achievements,
        collaborators,
      } = project;

      // If project_id is provided, update the existing project
      if (project_id) {
        // Check if the project already exists for this user
        const checkQuery = `
          SELECT project_id FROM projects
          WHERE user_id = $1 AND project_id = $2
        `;
        const checkValues = [user_id, project_id];
        const checkResult = await client.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
          // Project exists, update the existing record
          const updateQuery = `
            UPDATE projects
            SET title = $1, description = $2, technologies = $3, start_date = $4, end_date = $5, 
                project_link = $6, role = $7, challenges = $8, achievements = $9, collaborators = $10
            WHERE user_id = $11 AND project_id = $12
          `;
          const updateValues = [
            title, description, technologies, start_date, end_date, 
            project_link, role, challenges, achievements, collaborators,
            user_id, project_id
          ];
          await client.query(updateQuery, updateValues);
        } else {
          // Project doesn't exist, insert a new one
          const insertQuery = `
            INSERT INTO projects (
              user_id, title, description, technologies, start_date, end_date,
              project_link, role, challenges, achievements, collaborators
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          `;
          const insertValues = [
            user_id, title, description, technologies, start_date, end_date,
            project_link, role, challenges, achievements, collaborators
          ];
          await client.query(insertQuery, insertValues);
        }
      } else {
        // If no project_id is provided, insert a new project
        const insertQuery = `
          INSERT INTO projects (
            user_id, title, description, technologies, start_date, end_date,
            project_link, role, challenges, achievements, collaborators
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        const insertValues = [
          user_id, title, description, technologies, start_date, end_date,
          project_link, role, challenges, achievements, collaborators
        ];
        await client.query(insertQuery, insertValues);
      }
    }

    // Commit the transaction
    await client.query('COMMIT');
    res.status(200).json({ message: 'Projects saved or updated successfully!' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving/updating projects:', error);
    res.status(500).json({ error: 'Failed to save or update projects.' });
  } finally {
    client.release();
  }
});




app.get("/api/projects", async (req, res) => {
  const { user_id } = req.query; // We assume user_id is passed as a query parameter

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  // Date formatting function with timezone offset adjustment
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return empty string if date is missing
    const date = new Date(dateString);

    // Check if it's a valid date
    if (isNaN(date.getTime())) return "";

    // Adjust for the timezone offset to avoid unexpected date shifts
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    // Return the date in YYYY-MM-DD format
    return date.toISOString().split('T')[0];
  };

  try {
    // Query the projects table based on user_id
    const query = `
      SELECT * FROM projects
      WHERE user_id = $1
      ORDER BY start_date DESC;
    `;
    const { rows } = await pool.query(query, [user_id]);

    // Check if any projects exist for the user
    if (rows.length === 0) {
      return res.status(404).json({ error: "No projects found for this user." });
    }

    // Format the dates correctly using the provided formatDate function
    const formattedProjects = rows.map((project) => ({
      ...project,
      start_date: formatDate(project.start_date),
      end_date: formatDate(project.end_date),
    }));

    // Return the list of formatted projects
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error("Error fetching project data:", error);
    res.status(500).json({ error: "Database error. Please try again later." });
  }
});


app.delete("/api/projects", async (req, res) => {
  const { project_id } = req.body; // Get project_id from the request body

  if (!project_id) {
    return res.status(400).json({ message: "Project ID is required." });
  }

  try {
    // SQL query to delete the project based on its ID
    const result = await pool.query('DELETE FROM projects WHERE project_id = $1 RETURNING *', [project_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project." });
  }
});








app.post('/submit-certifications', async (req, res) => {
  const { user_id, certifications } = req.body;

  // Start a transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (let cert of certifications) {
      const { certification_id, name, issuer, issue_date, description, credential_id, credential_url } = cert;

      // Check if certification data already exists for this user by user_id and certification_id
      let query;
      let values;
      if (certification_id) {
        // Update the existing record if certification_id is provided
        query = `
          UPDATE Certifications
          SET name = $1, issuer = $2, issue_date = $3, description = $4, 
              credential_id = $5, credential_url = $6
          WHERE user_id = $7 AND certification_id = $8
          RETURNING *;
        `;
        values = [
          name, issuer, issue_date, description, credential_id, credential_url, user_id, certification_id
        ];
      } else {
        // Insert a new record if certification_id is not provided (new entry)
        query = `
          INSERT INTO Certifications (
            user_id, name, issuer, issue_date, description, credential_id, credential_url
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;
        values = [
          user_id, name, issuer, issue_date, description, credential_id, credential_url
        ];
      }

      // Execute query (either update or insert)
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Failed to store certification data');
      }
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Certification data stored or updated successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error storing/updating certification data:', error);
    res.status(500).json({ error: 'Failed to store or update certification data' });
  } finally {
    client.release();
  }
});


app.get('/api/certifications/:userId', async (req, res) => {
  const { userId } = req.params; // Get the userId from the route parameter

  try {
    // Query the database to fetch certifications for the given userId
    const result = await pool.query(
      'SELECT certification_id, name, issuer, TO_CHAR(issue_date, \'YYYY-MM-DD\') AS issue_date, description, credential_id, credential_url FROM certifications WHERE user_id = $1', // Use certification_id instead of id
      [userId] // Use parameterized queries to prevent SQL injection
    );

    // If the user has certifications, return them in JSON format
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the certifications as the response
    } else {
      res.status(404).json({ message: 'No certifications found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Failed to fetch certifications' });
  }
});


app.delete('/api/certifications/:certification_id', async (req, res) => {
  const { certification_id } = req.params;

  if (!certification_id) {
    return res.status(400).json({ message: 'Certification ID is required' });
  }

  try {
    // SQL query to delete the certification based on the certification_id
    const query = 'DELETE FROM certifications WHERE certification_id = $1 RETURNING *';
    const values = [certification_id];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.status(200).json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.error("Error deleting certification:", error);
    res.status(500).json({ message: 'Error deleting certification', error: error.message });
  }
});




app.get("/api/final-work-experience", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const query = "SELECT * FROM experience WHERE user_id = $1 ORDER BY start_date DESC;";
    const { rows } = await pool.query(query, [user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No work experience found for this user." });
    }

    const formatDate = (dateString) => {
      if (!dateString) return ""; // Return empty string if date is missing
      const date = new Date(dateString);

      // Check if it's a valid date
      if (isNaN(date.getTime())) return "";

      // Adjust for the timezone offset to avoid unexpected date shifts
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      // Return the date in YYYY-MM-DD format
      return date.toISOString().split('T')[0];
    };

    // Format the dates in the rows before sending to the client
    const formattedRows = rows.map(row => ({
      ...row,
      start_date: formatDate(row.start_date),
      end_date: formatDate(row.end_date),
    }));

    res.status(200).json(formattedRows);
  } catch (error) {
    console.error("Error fetching work experience:", error);
    res.status(500).json({ error: "Database error. Please try again later." });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
