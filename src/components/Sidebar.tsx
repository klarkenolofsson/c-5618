
import { Menu, Globe, ChevronDown, Key, Shield, Lock, Bell, Settings, HelpCircle, Fingerprint, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onApiKeyChange: (apiKey: string) => void;
}

const Sidebar = ({ isOpen, onToggle, onApiKeyChange }: SidebarProps) => {
  const [apiKey, setApiKey] = useState("");
  const [activeCategory, setActiveCategory] = useState("recent");
  
  const categories = [
    { id: "recent", label: "Recent Chats" },
    { id: "security", label: "Security Center" },
    { id: "privacy", label: "Privacy Controls" }
  ];
  
  const timeframes = [
    { title: "Today", items: ["Using Tailwind CSS Guide", "Privacy Policy Analysis"] },
    { 
      title: "Previous 7 Days", 
      items: [
        "Likeable and Inception Levels",
        "Viral Figma Board Ideas",
        "RAG Status in Software Dev",
        "Image Input ChatGPT API"
      ] 
    },
    {
      title: "Previous 30 Days",
      items: [
        "Focus on Lovable Viral",
        "Create Twitter Clone",
        "Reddit Posting Guidelines",
        "Revamping Social Features",
        "US AI Voting Logo"
      ]
    }
  ];
  
  const securityItems = [
    { icon: <Shield className="h-4 w-4" />, label: "Security Status", status: "Excellent" },
    { icon: <Lock className="h-4 w-4" />, label: "End-to-End Encryption", status: "Active" },
    { icon: <Fingerprint className="h-4 w-4" />, label: "Access Control", status: "Configure" },
    { icon: <Bell className="h-4 w-4" />, label: "Security Alerts", status: "Setup" },
  ];
  
  const privacyItems = [
    { icon: <HelpCircle className="h-4 w-4" />, label: "Data Usage", detail: "View Details" },
    { icon: <Settings className="h-4 w-4" />, label: "Privacy Settings", detail: "Configure" },
    { icon: <Key className="h-4 w-4" />, label: "Permissions", detail: "Manage" },
  ];

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    onApiKeyChange(newApiKey);
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-white/70 backdrop-blur-lg border-r border-happy-primary/10 transition-all duration-300",
      isOpen ? "w-64" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <div className="flex justify-between flex h-[60px] items-center">
          <button onClick={onToggle} className="h-10 rounded-lg p-2 text-happy-dark hover:bg-happy-primary/10 transition-colors">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 mr-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="rounded-full bg-gradient-to-r from-happy-primary to-happy-secondary p-[2px]"
            >
              <div className="rounded-full bg-white h-8 w-8 flex items-center justify-center">
                <Shield className="h-4 w-4 text-happy-primary" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          {isOpen && (
            <div className="p-2 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-4 w-4 text-happy-primary" />
                <span className="text-sm font-medium">API Key</span>
              </div>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  className="bg-white/50 border-happy-primary/20 rounded-xl focus:border-happy-primary/50 pr-10"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-happy-primary" />
              </div>
              <div className="flex items-center mt-2 gap-1">
                <Shield className="h-3 w-3 text-happy-primary" />
                <span className="text-xs text-happy-dark/70">Securely stored and encrypted</span>
              </div>
            </div>
          )}

          {isOpen && (
            <div className="flex border-b border-happy-primary/10 mb-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium relative",
                    activeCategory === category.id 
                      ? "text-happy-primary" 
                      : "text-happy-dark/60 hover:text-happy-dark/80"
                  )}
                >
                  {category.label}
                  {activeCategory === category.id && (
                    <motion.div 
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-happy-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isOpen && activeCategory === "recent" && (
              <motion.div
                key="recent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-transparent"
              >
                <div className="flex flex-col gap-2 px-2 py-2">
                  <div className="group flex h-10 items-center gap-2.5 rounded-xl px-3 bg-gradient-to-r from-happy-primary/10 to-happy-secondary/10 cursor-pointer">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <Globe className="h-4 w-4 text-happy-primary" />
                    </div>
                    <span className="text-sm font-medium">Happy AI</span>
                  </div>
                  <div className="group flex h-10 items-center gap-2.5 rounded-xl px-3 hover:bg-happy-primary/5 cursor-pointer">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-happy-primary" />
                    </div>
                    <span className="text-sm">Explore AI Tools</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                  {timeframes.map((timeframe) => (
                    <div key={timeframe.title}>
                      <div className="px-3 py-2 text-xs font-medium text-happy-dark/70">{timeframe.title}</div>
                      {timeframe.items.map((item) => (
                        <div key={item} className="group flex h-10 items-center gap-2.5 rounded-xl px-3 hover:bg-happy-primary/5 cursor-pointer">
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {isOpen && activeCategory === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2"
              >
                <div className="happy-card p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Security Status</h3>
                    <span className="trust-badge">
                      <Shield className="h-3 w-3 mr-1" />
                      Protected
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-happy-primary to-happy-secondary w-[85%]"></div>
                  </div>
                  <p className="text-xs text-happy-dark/70 mt-2">Your account is well-protected</p>
                </div>
                
                {securityItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 hover:bg-happy-primary/5 rounded-xl cursor-pointer mb-1">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-happy-primary/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-xs bg-happy-light px-2 py-1 rounded-full">{item.status}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {isOpen && activeCategory === "privacy" && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2"
              >
                <div className="happy-card p-4 mb-4">
                  <h3 className="font-medium mb-2">Privacy Overview</h3>
                  <p className="text-xs text-happy-dark/70 mb-3">Happy AI respects your privacy and gives you full control over your data.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Data Collection:</span>
                    <span className="text-xs font-medium text-happy-primary">Minimal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Data Retention:</span>
                    <span className="text-xs font-medium text-happy-primary">30 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Third-party Sharing:</span>
                    <span className="text-xs font-medium text-happy-primary">None</span>
                  </div>
                </div>
                
                {privacyItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 hover:bg-happy-primary/5 rounded-xl cursor-pointer mb-1">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-happy-primary/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-xs text-happy-primary">{item.detail}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isOpen && (
          <div className="flex flex-col py-2 border-t border-happy-primary/10">
            <button className="group flex gap-2 p-2.5 text-sm items-start hover:bg-happy-primary/5 rounded-xl px-3 text-left w-full min-w-[200px]">
              <span className="flex w-full flex-row flex-wrap-reverse justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-happy-primary/20 bg-happy-primary/5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-happy-primary">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12.5001 3.44338C12.1907 3.26474 11.8095 3.26474 11.5001 3.44338L4.83984 7.28868C4.53044 7.46731 4.33984 7.79744 4.33984 8.1547V15.8453C4.33984 16.2026 4.53044 16.5327 4.83984 16.7113L11.5001 20.5566C11.8095 20.7353 12.1907 20.7353 12.5001 20.5566L19.1604 16.7113C19.4698 16.5327 19.6604 16.2026 19.6604 15.8453V8.1547C19.6604 7.79744 19.4698 7.46731 19.1604 7.28868L12.5001 3.44338Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium">Upgrade to Pro</span>
                    <span className="line-clamp-1 text-xs text-happy-dark/60">Enhanced security features</span>
                  </div>
                </div>
              </span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
