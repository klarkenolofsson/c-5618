
import { ImagePlus, FileText, BarChart2, Code, HelpCircle, Video, Shield, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";

const ActionButtons = () => {
  const actions = [
    { 
      icon: <ImagePlus className="h-5 w-5 text-happy-primary" />, 
      label: "Create image",
      description: "Generate images from text",
      gradient: "from-purple-400 to-pink-400" 
    },
    { 
      icon: <FileText className="h-5 w-5 text-happy-primary" />, 
      label: "Summarize text",
      description: "Get the key points quickly",
      gradient: "from-blue-400 to-cyan-400" 
    },
    { 
      icon: <BarChart2 className="h-5 w-5 text-happy-primary" />, 
      label: "Analyze data",
      description: "Uncover patterns and insights",
      gradient: "from-green-400 to-teal-400" 
    },
    { 
      icon: <Code className="h-5 w-5 text-happy-primary" />, 
      label: "Code",
      description: "Get programming assistance",
      gradient: "from-yellow-400 to-orange-400" 
    },
    { 
      icon: <Shield className="h-5 w-5 text-happy-primary" />, 
      label: "Privacy check",
      description: "Verify your data is secure",
      gradient: "from-red-400 to-pink-400" 
    },
    { 
      icon: <Video className="h-5 w-5 text-happy-primary" />, 
      label: "Live support",
      description: "Get real-time expert help",
      gradient: "from-indigo-400 to-purple-400" 
    },
    { 
      icon: <Sparkles className="h-5 w-5 text-happy-primary" />, 
      label: "AI Guide",
      description: "Learn how to use AI tools",
      gradient: "from-amber-400 to-yellow-400" 
    },
    { 
      icon: <Lock className="h-5 w-5 text-happy-primary" />, 
      label: "Secure chat",
      description: "End-to-end encrypted messaging",
      gradient: "from-cyan-400 to-blue-400" 
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-4xl mx-auto"
    >
      {actions.map((action) => (
        <motion.div 
          key={action.label}
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="happy-card p-4 cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className={`rounded-full bg-gradient-to-br ${action.gradient} p-2.5 text-white`}>
              {action.icon}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-happy-dark">{action.label}</span>
              <span className="text-xs text-happy-dark/70">{action.description}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ActionButtons;
