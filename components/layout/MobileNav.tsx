'use client';

import React from 'react';
import { Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  onMenuClick: () => void;
}

export default function MobileNav({ onMenuClick }: MobileNavProps) {
  return (
    <div className="md:hidden bg-sidebar/80 backdrop-blur-lg border-b border-sidebar-border px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-neon-green to-neon-purple rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-black font-bold" />
        </div>
        <span className="text-xs font-bold text-neon-green">AGUNNAYA</span>
      </div>

      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-black/40 rounded-lg transition-colors text-neon-green"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
}
