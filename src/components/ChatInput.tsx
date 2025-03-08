import { useState } from "react";
import { ArrowUp, Loader2, Mic, Paperclip, Lock, Image } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="relative w-full">
        <div className="glass-morphism flex items-center pr-2">
          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Happy AI..."
            className="w-full resize-none bg-transparent px-4 py-4 pr-24 focus:outline-none"
            style={{ maxHeight: "200px" }}
            disabled={isLoading}
          />
          <div className="flex items-center gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-happy-primary/10 text-happy-dark/70 transition-colors"
            >
              <Paperclip className="h-5 w-5" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-happy-primary/10 text-happy-dark/70 transition-colors"
            >
              <Image className="h-5 w-5" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-400 text-white animate-pulse' : 'hover:bg-happy-primary/10 text-happy-dark/70'}`}
            >
              <Mic className="h-5 w-5" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isLoading || !message.trim()}
              className="ml-1 p-2.5 bg-gradient-to-r from-happy-primary to-happy-secondary rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowUp className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-2 gap-1 text-center">
          <Lock className="h-3 w-3 text-happy-primary" />
          <span className="text-xs text-happy-dark/70">End-to-end encrypted | </span>
          <span className="text-xs text-happy-primary cursor-pointer hover:underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
