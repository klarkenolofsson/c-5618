
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield, Lock, Sparkles } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { motion } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        role: 'assistant',
        content: "I'm Happy AI, your secure and private AI assistant. How can I help you today? Your conversation is end-to-end encrypted and private. I can analyze data, write code, create images, and much more while keeping your information secure."
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Security Alert",
        description: "Connection error. No data was compromised.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-happy-light to-white">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onApiKeyChange={() => {}} // Empty function since we don't need API key anymore
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} />
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl px-4 space-y-6"
            >
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-full bg-gradient-to-r from-happy-primary to-happy-secondary p-[3px] shadow-lg"
                  >
                    <div className="bg-white rounded-full p-4">
                      <Sparkles className="h-10 w-10 text-happy-primary" />
                    </div>
                  </motion.div>
                </div>
                <motion.h1 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-2 text-4xl font-bold bg-gradient-to-r from-happy-primary to-happy-secondary bg-clip-text text-transparent"
                >
                  Welcome to Happy AI
                </motion.h1>
                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-happy-dark/70 max-w-2xl mx-auto mb-4"
                >
                  Den mest användarvänliga AI modellen med ett extremt lätt användligt gränssnitt
                </motion.p>
                <div className="flex justify-center gap-3 mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm"
                  >
                    <Shield className="h-4 w-4 text-happy-primary mr-1" />
                    <span className="text-xs font-medium">Secure & Trusted</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm"
                  >
                    <Lock className="h-4 w-4 text-happy-primary mr-1" />
                    <span className="text-xs font-medium">End-to-end encrypted</span>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
                </motion.div>
              </div>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h2 className="text-center text-xl font-semibold mb-4 text-happy-dark">What would you like to do today?</h2>
                <ActionButtons />
              </motion.div>
            </motion.div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <div className="flex justify-center items-center gap-2 py-2">
                <Shield className="h-3 w-3 text-happy-primary" />
                <span className="text-xs text-happy-dark/70">All conversations are end-to-end encrypted</span>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
