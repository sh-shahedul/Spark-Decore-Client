// AboutMe.jsx
import React from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBirthdayCake,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaDownload
} from 'react-icons/fa';

const AboutMe = () => {
  // Personal Information
  const personalInfo = [
    { icon: <FaUser />, label: "Name", value: "Md. Rahim Khan" },
    { icon: <FaEnvelope />, label: "Email", value: "rahim.dev@example.com" },
    { icon: <FaPhone />, label: "Phone", value: "+880 1712-345678" },
    { icon: <FaMapMarkerAlt />, label: "Location", value: "Dhaka, Bangladesh" },
    { icon: <FaBirthdayCake />, label: "Date of Birth", value: "15 March 1995" },
    { icon: <FaGraduationCap />, label: "Education", value: "BSc in CSE, DU" },
  ];

  // Skills with proficiency
  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Node.js", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "Express.js", level: 78 },
    { name: "TypeScript", level: 70 },
  ];

  // Experience
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Ltd.",
      duration: "2022 - Present",
      description: "Leading frontend team, implementing new features, and optimizing performance."
    },
    {
      title: "React Developer",
      company: "Digital Innovations",
      duration: "2020 - 2022",
      description: "Developed responsive web applications and collaborated with UI/UX team."
    },
    {
      title: "Junior Web Developer",
      company: "WebCraft BD",
      duration: "2019 - 2020",
      description: "Built client websites and learned modern web development practices."
    }
  ];

  // Social Links
  const socialLinks = [
    { icon: <FaGithub />, name: "GitHub", url: "https://github.com", color: "hover:bg-gray-800" },
    { icon: <FaLinkedin />, name: "LinkedIn", url: "https://linkedin.com", color: "hover:bg-blue-700" },
    { icon: <FaTwitter />, name: "Twitter", url: "https://twitter.com", color: "hover:bg-sky-500" },
    { icon: <FaGlobe />, name: "Portfolio", url: "#", color: "hover:bg-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Me</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Passionate Full Stack Developer with 5+ years of experience building modern web applications. 
            I specialize in React ecosystem and love creating efficient, scalable solutions.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Personal Info & Skills */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <span className="text-white text-5xl font-bold">RK</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800">Md. Rahim Khan</h2>
                <p className="text-blue-600 font-medium mb-4 flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" />
                  Full Stack Developer
                </p>
                
                {/* Personal Info */}
                <div className="w-full space-y-4 mt-6">
                  {personalInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700">
                      <div className="text-blue-500 text-lg">{info.icon}</div>
                      <div>
                        <p className="text-sm text-gray-500">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaHeart className="text-red-500" />
                Skills & Expertise
              </h3>
              
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & About */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 pb-3 border-b">Work Experience</h3>
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-10 pb-8 border-l-2 border-blue-200 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="bg-blue-50 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-800">{exp.title}</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About & Social Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">My Journey</h3>
                <p className="text-gray-600 mb-6">
                  Started my journey as a curious teenager learning HTML/CSS. Over the years, 
                  I've worked on various projects ranging from small business websites to 
                  large-scale enterprise applications.
                </p>
                <p className="text-gray-600">
                  When I'm not coding, I enjoy reading tech blogs, contributing to open-source 
                  projects, and mentoring aspiring developers.
                </p>
              </div>

              {/* Social & CTA Section */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-6">Let's Connect</h3>
                
                {/* Social Links */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg ${social.color} transition-all hover:scale-105`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Download CV Button */}
                <button className="w-full flex items-center justify-center gap-2 bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
                  <FaDownload />
                  Download CV
                </button>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-white/30">
                  <p className="text-center text-white/90">
                    Available for freelance projects & full-time opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Md. Rahim Khan. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ using React, Tailwind CSS & React Icons</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;