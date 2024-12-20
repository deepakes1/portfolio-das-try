import React from 'react'

function ExperienceDash() {
  return (
    <div>
      <div className="space-y-8">
      {/* Show Dashboard Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleToggleDashboard}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:shadow-xl transition ease-in-out duration-300"
        >
          {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
        </button>
      </div>

      {/* If there are experiences, map over them */}
      {experiences.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-500">No work experience found.</p>
      ) : (
        experiences.map((exp, index) => (
          <motion.section
            key={index}
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h3 className="text-2xl font-bold mb-6 flex items-center text-purple-600">
                <Briefcase className="mr-2" /> {exp.job_title}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
              <p className="text-purple-600 mb-2 font-bold text-lg">{exp.company}</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}
              </p>
              <p className="mb-2 font-semibold text-gray-700">Description:</p>
              <p className="text-gray-700 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies &&
                  exp.technologies.split(',').map((tech, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
              </div>
              <p className="mb-2 mt-4 font-semibold text-gray-700">Achievements</p>
              <p className="text-gray-700">{exp.achievements}</p>
            </div>
          </motion.section>
        ))
      )}

      {/* Show Charts if the dashboard is enabled */}
      {showDashboard && (
        <>
          {/* Bar Chart for Years of Experience */}
          {experiences.length > 0 && (
            <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
              <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Years of Experience</h3>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          )}

          {/* Pie Chart for Technologies Used */}
          {Object.keys(techData).length > 0 && (
            <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
              <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Technologies Used</h3>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>
          )}

          {/* Line Chart for Years of Experience Over Time */}
          {experiences.length > 0 && (
            <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
              <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Years of Experience Over Time</h3>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          )}

          {/* Radar Chart for Technologies Used */}
          {Object.keys(techData).length > 0 && (
            <div className="my-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-300">
              <h3 className="text-xl font-bold text-center text-purple-600 mb-4">Technologies Used Across Roles</h3>
              <Radar data={radarChartData} options={radarChartOptions} />
            </div>
          )}
        </>
      )}
    </div>
    </div>
  )
}

export default ExperienceDash
