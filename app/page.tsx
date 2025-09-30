"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code as Code2, Database, Brain, Star, Calendar, User, ChevronDown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const skillCategories = [
  {
    title: "Full-Stack Development",
    icon: <Code2 className="h-6 w-6" />,
    skills: ["React", "Next.js", "Vue", "Node.js", "Express", "Nuxt", "Angular.js", "Django", "MongoDB", "PostgreSQL", "TypeScript", "GraphQL"]
  },
  {
    title: "Blockchain Development", 
    icon: <Database className="h-6 w-6" />,
    skills: ["Solana", "Cardano", "Sui", "Smart Contracts", "Web3", "DeFi", "NFTs", "Rust"]
  },
  {
    title: "AI & Machine Learning",
    icon: <Brain className="h-6 w-6" />,
    skills: ["TensorFlow", "PyTorch", "NLP", "Deep Learning", "Computer Vision", "LLMs", "Python", "Transformers"]
  }
];

const fullStackProjects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with React, Node.js, MongoDB, and Stripe integration",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    year: "2024",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Real-Time Chat Application",
    description: "WebSocket-powered chat app with user authentication and message encryption",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Redis"],
    year: "2024",
    image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Project Management Dashboard",
    description: "Collaborative project management tool with real-time updates and team collaboration",
    tech: ["React", "GraphQL", "Node.js", "MongoDB"],
    year: "2023",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Social Media Analytics Platform",
    description: "Advanced analytics dashboard for social media performance tracking",
    tech: ["Vue.js", "Express", "PostgreSQL", "D3.js"],
    year: "2023",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Video Streaming Platform",
    description: "Netflix-like streaming platform with user subscriptions and content management",
    tech: ["React", "Node.js", "AWS", "MongoDB"],
    year: "2023",
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Food Delivery App",
    description: "Mobile-responsive food delivery platform with real-time order tracking",
    tech: ["React Native", "Express", "PostgreSQL", "Socket.io"],
    year: "2022",
    image: "https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Learning Management System",
    description: "Comprehensive LMS with course creation, progress tracking, and assessments",
    tech: ["Angular", "NestJS", "PostgreSQL", "TypeScript"],
    year: "2022",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Inventory Management System",
    description: "Enterprise inventory management with barcode scanning and reporting",
    tech: ["React", "Express", "MySQL", "Docker"],
    year: "2022",
    image: "https://images.pexels.com/photos/586103/pexels-photo-586103.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Healthcare Portal",
    description: "Patient management system with appointment scheduling and medical records",
    tech: ["Next.js", "Node.js", "PostgreSQL", "HIPAA"],
    year: "2021",
    image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Financial Dashboard",
    description: "Personal finance tracking with investment portfolio management and analytics",
    tech: ["React", "Express", "MongoDB", "Chart.js"],
    year: "2021",
    image: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const blockchainProjects = [
  {
    title: "Solana NFT Marketplace",
    description: "Decentralized NFT marketplace with minting, trading, and royalty distribution on Solana",
    tech: ["Solana", "Rust", "Anchor", "React", "Web3.js"],
    year: "2024",
    image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Cardano DeFi Protocol",
    description: "Decentralized lending and borrowing protocol built on Cardano blockchain",
    tech: ["Cardano", "Plutus", "Haskell", "React", "Cardano-CLI"],
    year: "2024",
    image: "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Sui Gaming Platform",
    description: "Blockchain gaming platform with NFT characters and in-game asset trading on Sui",
    tech: ["Sui", "Move", "TypeScript", "React", "Sui SDK"],
    year: "2024",
    image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Multi-Chain DEX",
    description: "Cross-chain decentralized exchange supporting multiple blockchain networks",
    tech: ["Ethereum", "Solana", "Web3", "React", "Bridge Protocol"],
    year: "2023",
    image: "https://images.pexels.com/photos/5980582/pexels-photo-5980582.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "DAO Governance Platform",
    description: "Decentralized governance platform with voting mechanisms and proposal management",
    tech: ["Ethereum", "Solidity", "React", "IPFS", "Aragon"],
    year: "2023",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Yield Farming Protocol",
    description: "DeFi yield farming platform with liquidity mining and staking rewards",
    tech: ["Ethereum", "Solidity", "Web3", "React", "Uniswap"],
    year: "2023",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Supply Chain Tracker",
    description: "Blockchain-based supply chain transparency and authenticity verification system",
    tech: ["Hyperledger", "Node.js", "React", "IPFS"],
    year: "2022",
    image: "https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Real Estate Tokenization",
    description: "Platform for tokenizing real estate assets and fractional ownership trading",
    tech: ["Ethereum", "Solidity", "React", "IPFS", "OpenZeppelin"],
    year: "2022",
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Carbon Credit Exchange",
    description: "Blockchain marketplace for trading verified carbon credits and offsets",
    tech: ["Cardano", "Plutus", "React", "IPFS"],
    year: "2022",
    image: "https://images.pexels.com/photos/9800036/pexels-photo-9800036.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Identity Verification DApp",
    description: "Self-sovereign identity solution with privacy-preserving verification",
    tech: ["Ethereum", "Solidity", "React", "Zero-Knowledge", "IPFS"],
    year: "2021",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const aiProjects = [
  {
    title: "AI-Powered Translation Website",
    description: "Multilingual web platform with real-time AI translation supporting 50+ languages",
    tech: ["Next.js", "OpenAI API", "React", "TypeScript", "Tailwind CSS"],
    year: "2024",
    image: "https://images.pexels.com/photos/8090730/pexels-photo-8090730.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Content Generator Website",
    description: "Web-based AI content creation platform for blogs, social media, and marketing",
    tech: ["React", "Node.js", "OpenAI API", "MongoDB", "Express"],
    year: "2024",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Chatbot Website",
    description: "Interactive web chatbot with natural language processing and customer support features",
    tech: ["Vue.js", "Python", "FastAPI", "WebSocket", "Redis"],
    year: "2024",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Analytics Dashboard",
    description: "Web-based analytics platform with AI-powered insights and data visualization",
    tech: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
    year: "2023",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Image Recognition Web App",
    description: "Web application for AI-powered image classification and object detection",
    tech: ["Next.js", "TensorFlow.js", "TypeScript", "Vercel", "Cloudinary"],
    year: "2023",
    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Recommendation Website",
    description: "E-commerce website with AI-powered product recommendations and personalization",
    tech: ["React", "Node.js", "Python", "Scikit-learn", "MongoDB"],
    year: "2023",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Voice Assistant Web App",
    description: "Web-based voice assistant with speech recognition and text-to-speech capabilities",
    tech: ["React", "Web Speech API", "Node.js", "WebRTC", "Socket.io"],
    year: "2022",
    image: "https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Fraud Detection Portal",
    description: "Web portal for AI-powered financial fraud detection and risk assessment",
    tech: ["Angular", "Python", "Django", "PostgreSQL", "Docker"],
    year: "2022",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Writing Assistant Website",
    description: "Web platform for AI-powered content writing, editing, and optimization",
    tech: ["Vue.js", "OpenAI API", "Node.js", "MongoDB", "Stripe"],
    year: "2022",
    image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "AI Business Intelligence Web App",
    description: "Web-based BI platform with AI-powered forecasting and data analysis",
    tech: ["React", "Python", "FastAPI", "Apache Airflow", "AWS"],
    year: "2021",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            <Calendar className="h-3 w-3 mr-1" />
            {project.year}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.map((tech: string, techIndex: number) => (
            <Badge key={techIndex} variant="outline" className="text-xs px-2 py-1">
              {tech}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center hover:bg-blue-50 hover:text-blue-600"
        >
          View Project
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default function Portfolio() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              鹿島 秀行
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Full-Stack', 'Blockchain', 'AI', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Kashima Hideyuki
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Full-Stack, Blockchain & AI Engineer with 9+ years of experience building 
              innovative solutions that bridge traditional software and emerging technologies.
            </p>
            <div className="flex justify-center space-x-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg">
                <Github className="h-5 w-5 mr-2" />
                View Projects
              </Button>
            </div>
          </motion.div>

          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              With over 9 years of experience in software engineering, I specialize in creating 
              cutting-edge solutions across full-stack development, blockchain technologies, and 
              artificial intelligence. My passion lies in bridging the gap between traditional 
              software development and emerging technologies, delivering robust and scalable 
              applications that drive innovation.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">9+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600">Technologies Mastered</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            Technical Expertise
          </motion.h2>
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white w-fit">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full-Stack Projects Section */}
      <section id="full-stack" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Full-Stack Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive web applications using modern frameworks and technologies
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullStackProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Projects Section */}
      <section id="blockchain" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Blockchain Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Decentralized applications and smart contracts on various blockchain networks
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blockchainProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Projects Section */}
      <section id="ai" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              AI-Powered Websites
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Intelligent web applications and websites powered by artificial intelligence and machine learning
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8">Let's Build Something Amazing Together</h2>
            <p className="text-xl mb-12 text-blue-100">
              Ready to bring your next project to life? Let's discuss how we can create innovative solutions together.
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="h-5 w-5 mr-2" />
                businessman999777555@gmail.com
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <MessageSquare className="h-5 w-5 mr-2" />
                Discord
              </Button>
            </div>
            <div className="text-blue-100">
              <p>© 2024 鹿島 秀行 (Kashima Hideyuki). All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}