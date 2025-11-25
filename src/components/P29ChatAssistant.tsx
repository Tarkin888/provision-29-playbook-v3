import { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2, X, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const P29ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your P29 Implementation Assistant. I can help you with questions about UK Corporate Governance Code Provision 29, implementation timelines, GRC platform selection, and best practices. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('p29-chat', {
        body: { messages: [...messages, userMessage] }
      });

      if (error) {
        if (error.message.includes('429')) {
          toast.error('Rate limit exceeded. Please try again in a moment.');
        } else if (error.message.includes('402')) {
          toast.error('Service unavailable. Please contact support.');
        } else {
          toast.error('Failed to get response. Please try again.');
        }
        throw error;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-all z-50"
        aria-label="Open P29 Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div 
      className={`fixed ${isMinimized ? 'bottom-4 right-4 w-80 md:bottom-6 md:right-6' : 'bottom-4 right-4 left-4 md:left-auto md:w-96 md:bottom-6 md:right-6'} bg-card rounded-lg shadow-2xl z-50 flex flex-col transition-all border border-border`}
      style={{ height: isMinimized ? '60px' : '600px' }}
    >
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-semibold">P29 Assistant</h3>
          <p className="text-xs opacity-90">Provision 29 Implementation Help</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-primary/90 p-1 rounded"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-primary/90 p-1 rounded"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about P29 implementation..."
                className="flex-1 border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Powered by AI • Press Enter to send
            </p>
          </div>
        </>
      )}
    </div>
  );
};
