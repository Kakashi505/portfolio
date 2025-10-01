"use client";

import React, { useState } from 'react';
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

const skills = [
  {
    name: "Python",
    percentage: 95,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "JavaScript",
    percentage: 92,
    color: "from-yellow-400 to-yellow-500"
  },
  {
    name: "React",
    percentage: 90,
    color: "from-cyan-400 to-cyan-500"
  },
  {
    name: "Vue.js",
    percentage: 88,
    color: "from-green-500 to-green-600"
  },
  {
    name: "Ruby",
    percentage: 85,
    color: "from-red-500 to-red-600"
  },
  {
    name: "Node.js",
    percentage: 94,
    color: "from-green-600 to-green-700"
  },
  {
    name: "TypeScript",
    percentage: 92,
    color: "from-blue-600 to-blue-700"
  },
  {
    name: "Next.js",
    percentage: 90,
    color: "from-gray-700 to-gray-800"
  },
  {
    name: "Angular",
    percentage: 92,
    color: "from-red-600 to-red-700"
  },
  {
    name: "Express.js",
    percentage: 97,
    color: "from-gray-600 to-gray-700"
  },
  {
    name: "Django",
    percentage: 90,
    color: "from-green-700 to-green-800"
  },
  {
    name: "Rails",
    percentage: 93,
    color: "from-red-700 to-red-800"
  },
  {
    name: "MongoDB",
    percentage: 87,
    color: "from-green-500 to-green-600"
  },
  {
    name: "PostgreSQL",
    percentage: 85,
    color: "from-blue-700 to-blue-800"
  },
  {
    name: "MySQL",
    percentage: 82,
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Redis",
    percentage: 80,
    color: "from-red-500 to-red-600"
  },
  {
    name: "GraphQL",
    percentage: 85,
    color: "from-pink-500 to-pink-600"
  },
  {
    name: "REST API",
    percentage: 90,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Docker",
    percentage: 82,
    color: "from-blue-400 to-blue-500"
  },
  {
    name: "AWS",
    percentage: 90,
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Solana",
    percentage: 92,
    color: "from-purple-600 to-purple-700"
  },
  {
    name: "Rust",
    percentage: 90,
    color: "from-orange-600 to-orange-700"
  },
  {
    name: "Machine Learning",
    percentage: 88,
    color: "from-pink-600 to-pink-700"
  },
  {
    name: "TensorFlow",
    percentage: 85,
    color: "from-orange-700 to-orange-800"
  },
  {
    name: "PyTorch",
    percentage: 83,
    color: "from-red-400 to-red-500"
  }
];

const fullStackProjects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with React, Node.js, MongoDB, and Stripe integration",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    year: "2024",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://ecommerceparadise.com",
    github: "https://github.com/Micklitodev/Paradise-Ecom",
    role: "Full-Stack Developer",
    skills: ["Frontend Development", "Backend API", "Payment Integration", "Database Design"]
  },
  {
    title: "Real-Time Chat Application",
    description: "WebSocket-powered chat app with user authentication and message encryption",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Redis"],
    year: "2024",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://socket.io/demos/chat",
    github: "https://github.com/socketio/socket.io",
    role: "Full-Stack Developer",
    skills: ["Real-time Communication", "WebSocket Implementation", "User Authentication", "Message Encryption"]
  },
  {
    title: "Project Management Dashboard",
    description: "Collaborative project management tool with real-time updates and team collaboration",
    tech: ["React", "GraphQL", "Node.js", "MongoDB"],
    year: "2023",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://app.asana.com",
    github: "https://github.com/Asana/asana",
    role: "Full-Stack Developer",
    skills: ["Project Management", "Team Collaboration", "Real-time Updates", "GraphQL API"]
  },
  {
    title: "Social Media Analytics Platform",
    description: "Advanced analytics dashboard for social media performance tracking",
    tech: ["Vue.js", "Express", "PostgreSQL", "D3.js"],
    year: "2023",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://analytics.google.com",
    github: "https://github.com/googleanalytics",
    role: "Frontend Developer",
    skills: ["Data Visualization", "Analytics Dashboard", "Chart Implementation", "API Integration"]
  },
  {
    title: "Video Streaming Platform",
    description: "Netflix-like streaming platform with user subscriptions and content management",
    tech: ["React", "Node.js", "AWS", "MongoDB"],
    year: "2023",
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.netflix.com",
    github: "https://github.com/Netflix",
    role: "Full-Stack Developer",
    skills: ["Video Streaming", "Subscription Management", "Content Management", "AWS Integration"]
  },
  {
    title: "Food Delivery App",
    description: "Mobile-responsive food delivery platform with real-time order tracking",
    tech: ["React Native", "Express", "PostgreSQL", "Socket.io"],
    year: "2022",
    image: "https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.ubereats.com",
    github: "https://github.com/uber",
    role: "Mobile Developer",
    skills: ["Mobile Development", "Real-time Tracking", "Payment Processing", "Location Services"]
  },
  {
    title: "Learning Management System",
    description: "Comprehensive LMS with course creation, progress tracking, and assessments",
    tech: ["Angular", "NestJS", "PostgreSQL", "TypeScript"],
    year: "2022",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://moodle.org",
    github: "https://github.com/moodle/moodle",
    role: "Full-Stack Developer",
    skills: ["Educational Technology", "Course Management", "Progress Tracking", "Assessment System"]
  },
  {
    title: "Inventory Management System",
    description: "Enterprise inventory management with barcode scanning and reporting",
    tech: ["React", "Express", "MySQL", "Docker"],
    year: "2022",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.zoho.com/inventory",
    github: "https://github.com/zoho",
    role: "Full-Stack Developer",
    skills: ["Inventory Management", "Barcode Scanning", "Reporting System", "Docker Deployment"]
  },
  {
    title: "Healthcare Portal",
    description: "Patient management system with appointment scheduling and medical records",
    tech: ["Next.js", "Node.js", "PostgreSQL", "HIPAA"],
    year: "2021",
    image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.epic.com",
    github: "https://github.com/epic",
    role: "Full-Stack Developer",
    skills: ["Healthcare Technology", "Patient Management", "Appointment Scheduling", "HIPAA Compliance"]
  },
  {
    title: "Financial Dashboard",
    description: "Personal finance tracking with investment portfolio management and analytics",
    tech: ["React", "Express", "MongoDB", "Chart.js"],
    year: "2021",
    image: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.mint.com",
    github: "https://github.com/mint",
    role: "Full-Stack Developer",
    skills: ["Financial Technology", "Portfolio Management", "Data Visualization", "Investment Tracking"]
  }
];

const blockchainProjects = [
  {
    title: "Solana NFT Marketplace",
    description: "Decentralized NFT marketplace with minting, trading, and royalty distribution on Solana",
    tech: ["Solana", "Rust", "Anchor", "React", "Web3.js"],
    year: "2024",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://opensea.io",
    github: "https://github.com/ProjectOpenSea",
    role: "Blockchain Developer",
    skills: ["Smart Contract Development", "NFT Minting", "Trading System", "Royalty Distribution"]
  },
  {
    title: "Cardano DeFi Protocol",
    description: "Decentralized lending and borrowing protocol built on Cardano blockchain",
    tech: ["Cardano", "Plutus", "Haskell", "React", "Cardano-CLI"],
    year: "2024",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://sundaeswap.finance",
    github: "https://github.com/SundaeSwap-finance",
    role: "Blockchain Developer",
    skills: ["DeFi Development", "Smart Contract Security", "Lending Protocol", "Borrowing System"]
  },
  {
    title: "Sui Gaming Platform",
    description: "Blockchain gaming platform with NFT characters and in-game asset trading on Sui",
    tech: ["Sui", "Move", "TypeScript", "React", "Sui SDK"],
    year: "2024",
    image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://sui.io",
    github: "https://github.com/MystenLabs",
    role: "Blockchain Developer",
    skills: ["Game Development", "NFT Integration", "Asset Trading", "Move Programming"]
  },
  {
    title: "Multi-Chain DEX",
    description: "Cross-chain decentralized exchange supporting multiple blockchain networks",
    tech: ["Ethereum", "Solana", "Web3", "React", "Bridge Protocol"],
    year: "2023",
    image: "https://images.pexels.com/photos/5980582/pexels-photo-5980582.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://app.1inch.io",
    github: "https://github.com/1inch",
    role: "Blockchain Developer",
    skills: ["Cross-chain Development", "DEX Implementation", "Bridge Protocol", "Multi-chain Integration"]
  },
  {
    title: "DAO Governance Platform",
    description: "Decentralized governance platform with voting mechanisms and proposal management",
    tech: ["Ethereum", "Solidity", "React", "IPFS", "Aragon"],
    year: "2023",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://snapshot.org",
    github: "https://github.com/snapshot-labs",
    role: "Blockchain Developer",
    skills: ["DAO Development", "Governance System", "Voting Mechanism", "Proposal Management"]
  },
  {
    title: "Yield Farming Protocol",
    description: "DeFi yield farming platform with liquidity mining and staking rewards",
    tech: ["Ethereum", "Solidity", "Web3", "React", "Uniswap"],
    year: "2023",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://app.uniswap.org",
    github: "https://github.com/Uniswap",
    role: "DeFi Developer",
    skills: ["Yield Farming", "Liquidity Mining", "Staking Rewards", "DeFi Protocol"]
  },
  {
    title: "Supply Chain Tracker",
    description: "Blockchain-based supply chain transparency and authenticity verification system",
    tech: ["Hyperledger", "Node.js", "React", "IPFS"],
    year: "2022",
    image: "https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.ibm.com/supply-chain",
    github: "https://github.com/IBM",
    role: "Blockchain Developer",
    skills: ["Supply Chain Management", "Transparency System", "Authenticity Verification", "Hyperledger"]
  },
  {
    title: "Real Estate Tokenization",
    description: "Platform for tokenizing real estate assets and fractional ownership trading",
    tech: ["Ethereum", "Solidity", "React", "IPFS", "OpenZeppelin"],
    year: "2022",
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.realt.com",
    github: "https://github.com/RealTPlatform",
    role: "Blockchain Developer",
    skills: ["Asset Tokenization", "Fractional Ownership", "Real Estate Technology", "Smart Contract Security"]
  },
  {
    title: "Carbon Credit Exchange",
    description: "Blockchain marketplace for trading verified carbon credits and offsets",
    tech: ["Cardano", "Plutus", "React", "IPFS"],
    year: "2022",
    image: "https://images.pexels.com/photos/9800036/pexels-photo-9800036.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.toucan.earth",
    github: "https://github.com/ToucanProtocol",
    role: "Blockchain Developer",
    skills: ["Carbon Credit Trading", "Environmental Technology", "Marketplace Development", "Sustainability"]
  },
  {
    title: "Identity Verification DApp",
    description: "Self-sovereign identity solution with privacy-preserving verification",
    tech: ["Ethereum", "Solidity", "React", "Zero-Knowledge", "IPFS"],
    year: "2021",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.civic.com",
    github: "https://github.com/civicteam",
    role: "Blockchain Developer",
    skills: ["Identity Management", "Privacy Preservation", "Zero-Knowledge Proofs", "Self-Sovereign Identity"]
  }
];

const aiProjects = [
  {
    title: "AI-Powered Translation Website",
    description: "Multilingual web platform with real-time AI translation supporting 50+ languages",
    tech: ["Next.js", "OpenAI API", "React", "TypeScript", "Tailwind CSS"],
    year: "2024",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://translate.google.com",
    github: "https://github.com/google",
    role: "AI Developer",
    skills: ["Natural Language Processing", "Translation API", "Multilingual Support", "Real-time Processing"]
  },
  {
    title: "AI Content Generator Website",
    description: "Web-based AI content creation platform for blogs, social media, and marketing",
    tech: ["React", "Node.js", "OpenAI API", "MongoDB", "Express"],
    year: "2024",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.copy.ai",
    github: "https://github.com/copy-ai",
    role: "AI Developer",
    skills: ["Content Generation", "AI Writing", "Marketing Automation", "Blog Management"]
  },
  {
    title: "AI Chatbot Website",
    description: "Interactive web chatbot with natural language processing and customer support features",
    tech: ["Vue.js", "Python", "FastAPI", "WebSocket", "Redis"],
    year: "2024",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://chat.openai.com",
    github: "https://github.com/openai",
    role: "AI Developer",
    skills: ["Conversational AI", "Customer Support", "Natural Language Understanding", "Real-time Chat"]
  },
  {
    title: "AI Analytics Dashboard",
    description: "Web-based analytics platform with AI-powered insights and data visualization",
    tech: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
    year: "2023",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.tableau.com",
    github: "https://github.com/tableau",
    role: "AI Developer",
    skills: ["Data Analytics", "AI Insights", "Data Visualization", "Business Intelligence"]
  },
  {
    title: "AI Image Recognition Web App",
    description: "Web application for AI-powered image classification and object detection",
    tech: ["Next.js", "TensorFlow.js", "TypeScript", "Vercel", "Cloudinary"],
    year: "2023",
    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.clarifai.com",
    github: "https://github.com/Clarifai",
    role: "AI Developer",
    skills: ["Computer Vision", "Image Classification", "Object Detection", "Machine Learning"]
  },
  {
    title: "AI Recommendation Website",
    description: "E-commerce website with AI-powered product recommendations and personalization",
    tech: ["React", "Node.js", "Python", "Scikit-learn", "MongoDB"],
    year: "2023",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.amazon.com",
    github: "https://github.com/amazon",
    role: "AI Developer",
    skills: ["Recommendation System", "Personalization", "Machine Learning", "E-commerce Integration"]
  },
  {
    title: "AI Voice Assistant Web App",
    description: "Web-based voice assistant with speech recognition and text-to-speech capabilities",
    tech: ["React", "Web Speech API", "Node.js", "WebRTC", "Socket.io"],
    year: "2022",
    image: "https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://assistant.google.com",
    github: "https://github.com/google",
    role: "AI Developer",
    skills: ["Speech Recognition", "Text-to-Speech", "Voice Interface", "WebRTC"]
  },
  {
    title: "AI Fraud Detection Portal",
    description: "Web portal for AI-powered financial fraud detection and risk assessment",
    tech: ["Angular", "Python", "Django", "PostgreSQL", "Docker"],
    year: "2022",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.sift.com",
    github: "https://github.com/sift",
    role: "AI Developer",
    skills: ["Fraud Detection", "Risk Assessment", "Financial Security", "Machine Learning"]
  },
  {
    title: "AI Writing Assistant Website",
    description: "Web platform for AI-powered content writing, editing, and optimization",
    tech: ["Vue.js", "OpenAI API", "Node.js", "MongoDB", "Stripe"],
    year: "2022",
    image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.grammarly.com",
    github: "https://github.com/grammarly",
    role: "AI Developer",
    skills: ["Content Writing", "Text Optimization", "AI Editing", "Writing Tools"]
  },
  {
    title: "AI Business Intelligence Web App",
    description: "Web-based BI platform with AI-powered forecasting and data analysis",
    tech: ["React", "Python", "FastAPI", "Apache Airflow", "AWS"],
    year: "2021",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
    website: "https://www.powerbi.microsoft.com",
    github: "https://github.com/microsoft",
    role: "AI Developer",
    skills: ["Business Intelligence", "Data Forecasting", "Analytics Platform", "Data Pipeline"]
  }
];

const certifications = [
  {
    title: "Angular (Basic)",
    issuer: "HackerRank",
    date: "September 30, 2025",
    image: "/Angular.png",
    description: "Certified in Angular fundamentals including components, services, and routing"
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank", 
    date: "September 30, 2025",
    image: "/Python.png",
    description: "Certified in Python programming fundamentals and data structures"
  },
  {
    title: "React (Basic)",
    issuer: "HackerRank",
    date: "September 30, 2025", 
    image: "/React.png",
    description: "Certified in React fundamentals including components, hooks, and state management"
  },
  {
    title: "Software Engineer",
    issuer: "HackerRank",
    date: "September 30, 2025",
    image: "/Software.png", 
    description: "Certified Software Engineer with comprehensive development skills"
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
        {project.role && (
          <div className="mb-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              {project.role}
            </Badge>
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.map((tech: string, techIndex: number) => (
            <Badge key={techIndex} variant="outline" className="text-xs px-2 py-1">
              {tech}
            </Badge>
          ))}
        </div>
        {project.skills && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
            <div className="flex flex-wrap gap-1">
              {project.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                <Badge key={skillIndex} variant="outline" className="text-xs px-2 py-1 bg-green-50 text-green-700 border-green-200">
                  {skill}
                </Badge>
              ))}
              {project.skills.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-600">
                  +{project.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
        <div className="flex gap-2">
          {project.website && (
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-center hover:bg-blue-50 hover:text-blue-600"
              onClick={() => window.open(project.website, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Site
            </Button>
          )}
          {project.github && (
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-center hover:bg-gray-50 hover:text-gray-600"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{title: string, image: string, issuer: string} | null>(null);

  const navigationItems = ['About', 'Skills', 'Certifications', 'Full-Stack', 'Blockchain', 'AI', 'Blog', 'Contact'];
  
  const getSectionId = (item: string) => {
    const mapping: { [key: string]: string } = {
      'About': 'about',
      'Skills': 'skills', 
      'Certifications': 'certifications',
      'Full-Stack': 'full-stack',
      'Blockchain': 'blockchain',
      'AI': 'ai',
      'Blog': 'blog',
      'Contact': 'contact'
    };
    return mapping[item] || item.toLowerCase();
  };

  const scrollToSection = (item: string) => {
    if (item === 'Blog') {
      // Navigate to blog page
      setIsMobileMenuOpen(false);
      window.location.href = '/blog';
      return;
    }
    
    const sectionId = getSectionId(item);
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu first for better UX
      setIsMobileMenuOpen(false);
      
      // Small delay to ensure menu closes before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const openCertificateModal = (cert: {title: string, image: string, issuer: string}) => {
    setSelectedCertificate(cert);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              鹿島 秀行
            </motion.div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
                >
                  {item}
                </button>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-50" 
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : -2
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-0.5 bg-gray-700 rounded-full"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-0.5 bg-gray-700 rounded-full my-1"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 2
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-0.5 bg-gray-700 rounded-full"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 z-40 md:hidden overflow-hidden shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ duration: 0.3, delay: isMobileMenuOpen ? index * 0.05 : 0 }}
                onClick={() => scrollToSection(item)}
                className="text-left text-gray-700 hover:text-blue-600 active:bg-blue-50 active:text-blue-700 transition-colors font-medium py-3 px-3 rounded-lg hover:bg-gray-50 text-lg"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Kashima Hideyuki
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Full-Stack, Blockchain & AI Engineer with 9+ years of experience building 
              innovative solutions that bridge traditional software and emerging technologies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-4 mb-8 sm:mb-12 px-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto">
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Github className="h-5 w-5 mr-2" />
                View Projects
              </Button>
            </div>
          </motion.div>

          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
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
      <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {skills.map((skill, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-800 font-medium text-lg">{skill.name}</span>
                    <span className="text-gray-800 font-bold text-lg">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.05, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Certifications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional certifications validating my expertise in key technologies and software engineering
            </p>
          </motion.div>
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {certifications.map((cert, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        <Calendar className="h-3 w-3 mr-1" />
                        {cert.date.split(' ')[1]}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                      {cert.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {cert.issuer}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {cert.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => openCertificateModal(cert)}
                    >
                      View Certificate
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full-Stack Projects Section */}
      <section id="full-stack" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Full-Stack Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive web applications using modern frameworks and technologies
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {fullStackProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Projects Section */}
      <section id="blockchain" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Blockchain Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Decentralized applications and smart contracts on various blockchain networks
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {blockchainProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Projects Section */}
      <section id="ai" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              AI-Powered Websites
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Intelligent web applications and websites powered by artificial intelligence and machine learning
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {aiProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">Let&apos;s Build Something Amazing Together</h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-blue-100 px-4">
              Ready to bring your next project to life? Let&apos;s discuss how we can create innovative solutions together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="h-5 w-5 mr-2" />
                businessman999777555@gmail.com
              </Button>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Button>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <MessageSquare className="h-5 w-5 mr-2" />
                Discord
              </Button>
            </div>
            <div className="text-blue-100">
              <p>© 2025 鹿島 秀行 (Kashima Hideyuki). All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeCertificateModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedCertificate.title}</h3>
                <p className="text-gray-600 mt-1">Issued by {selectedCertificate.issuer}</p>
              </div>
              <button
                onClick={closeCertificateModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="relative">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <Button
                onClick={closeCertificateModal}
                variant="outline"
                className="px-6"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}