
import { Shield, Check } from "lucide-react";
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import { motion } from "framer-motion";

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

const Message = ({ role, content }: MessageProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar isAssistant={role === 'assistant'} />
        <div className={`flex-1 space-y-2 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`
            ${role === 'user' 
              ? 'bg-gradient-to-r from-happy-primary/20 to-happy-secondary/20 rounded-[20px] px-5 py-3 inline-block' 
              : 'bg-white/50 backdrop-blur-sm rounded-[20px] border border-happy-primary/10 px-5 py-3 shadow-sm'}
          `}>
            <div className="mb-1 flex items-center gap-1 justify-between">
              <span className="text-xs font-medium text-happy-dark/70">
                {role === 'user' ? 'You' : 'Happy AI'}
              </span>
              {role === 'assistant' && (
                <div className="trust-badge flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-happy-primary" />
                  <span className="text-xs">Verified</span>
                </div>
              )}
              {role === 'user' && (
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-happy-primary" />
                  <span className="text-xs text-happy-dark/70">Secure</span>
                </div>
              )}
            </div>
            <div className="text-happy-dark">
              {content}
            </div>
          </div>
          {role === 'assistant' && <MessageActions />}
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
