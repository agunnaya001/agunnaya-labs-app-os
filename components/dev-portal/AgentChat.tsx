'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const AGENT_PROMPTS = {
  architect: [
    'Suggest architecture for my contract',
    'Should I use a proxy pattern?',
    'How should I structure state variables?',
  ],
  security: [
    'Audit my code for vulnerabilities',
    'Check access control',
    'Review for reentrancy issues',
  ],
  gas: [
    'Find gas optimizations',
    'Pack storage variables',
    'Optimize loops and operations',
  ],
  testing: [
    'Write Foundry tests',
    'Add fuzz tests for invariants',
    'Generate test cases',
  ],
};

interface AgentChatProps {
  getCode: () => string;
}

export function AgentChat({ getCode }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Agunnaya Labs Dev Agent. I can help you audit, optimize, and test your smart contracts. What would you like help with?',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState<keyof typeof AGENT_PROMPTS>('architect');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response - In production, call actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const responses: Record<keyof typeof AGENT_PROMPTS, string> = {
        architect:
          'Based on your code, I recommend using an upgradeable proxy pattern with a separate implementation contract. This allows for upgrades without losing state. Consider using OpenZeppelin\'s UUPS proxy pattern for reduced gas costs.',
        security:
          'I found a potential issue: Check that your access control is properly implemented. Ensure you\'re using role-based access control (RBAC) or ownership patterns. No obvious reentrancy issues detected in this version.',
        gas: 'Optimization opportunities found: 1) Pack uint8 variables together to save storage slots. 2) Use immutable for variables set once in constructor. 3) Optimize loop conditions. These changes could reduce gas by ~15%.',
        testing:
          'Here\'s a test structure: Test constructor parameters, test access control for restricted functions, add invariant tests for state consistency, and fuzz test complex functions with random inputs.',
      };

      const assistantMessage: Message = {
        role: 'assistant',
        content: responses[agent],
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: number) => {
    const message = messages.find((m) => m.timestamp === id);
    if (message) {
      navigator.clipboard.writeText(message.content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Agent selector */}
      <div className="flex gap-1 mb-3 pb-3 border-b border-border/50 flex-wrap">
        {Object.keys(AGENT_PROMPTS).map((ag) => (
          <button
            key={ag}
            onClick={() => setAgent(ag as keyof typeof AGENT_PROMPTS)}
            className={cn(
              'px-3 py-1 rounded text-xs font-medium transition-all',
              agent === ag
                ? 'bg-neon-green text-black'
                : 'bg-black/40 text-muted-foreground hover:text-foreground',
            )}
          >
            {ag.charAt(0).toUpperCase() + ag.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.timestamp} className="flex gap-2 group">
            <div
              className={cn(
                'flex-1 rounded-lg px-3 py-2 text-sm',
                msg.role === 'user'
                  ? 'bg-neon-green/20 text-foreground ml-6'
                  : 'bg-black/40 text-muted-foreground mr-6',
              )}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
            </div>
            {msg.role === 'assistant' && (
              <button
                onClick={() => handleCopy(msg.timestamp)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
              >
                {copiedId === msg.timestamp ? (
                  <Check className="w-4 h-4 text-neon-green" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                )}
              </button>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <Sparkles className="w-4 h-4 text-neon-purple animate-spin" />
            <span className="text-xs text-muted-foreground">Agent is thinking...</span>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div className="mb-3 space-y-1">
        {AGENT_PROMPTS[agent].slice(0, 2).map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="w-full text-left px-2 py-1 text-xs rounded border border-border/50 hover:border-neon-green/50 text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey && !loading) {
              handleSendMessage(input);
            }
          }}
          placeholder="Ask the agent..."
          className="flex-1 rounded border border-border/50 bg-black/40 text-foreground text-sm p-2 placeholder:text-muted-foreground focus:border-neon-green/50 focus:outline-none resize-none h-20"
        />
        <Button
          onClick={() => handleSendMessage(input)}
          disabled={!input.trim() || loading}
          size="sm"
          className="bg-neon-green text-black hover:shadow-[0_0_20px_rgba(0,255,157,0.5)]"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
