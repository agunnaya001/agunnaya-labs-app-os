'use client';

import { useState, useRef, useCallback } from 'react';
import { SolidityEditor } from './SolidityEditor';
import { AgentChat } from './AgentChat';
import { DeployPanel } from './DeployPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Share2, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTRACT_TEMPLATES } from '@/lib/dev-portal/templates';

interface IDELayoutProps {
  address: string;
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

export function IDELayout({ address, selectedTemplate, onTemplateSelect }: IDELayoutProps) {
  const [code, setCode] = useState(CONTRACT_TEMPLATES[selectedTemplate as keyof typeof CONTRACT_TEMPLATES] || '');
  const [saving, setSaving] = useState(false);
  const editorRef = useRef<{ getValue: () => string } | null>(null);

  const getCode = useCallback(() => {
    return editorRef.current?.getValue?.() || code;
  }, [code]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const currentCode = getCode();
      localStorage.setItem(`contract_${Date.now()}`, currentCode);
      localStorage.setItem('last_contract', currentCode);
      // Toast would go here
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-green">Agunnaya Dev Portal</h1>
          <p className="text-sm text-muted-foreground">Smart Contract IDE on Base Mainnet</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            disabled={saving}
            className="border-neon-purple text-neon-purple hover:bg-neon-purple/10"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
          <Button size="sm" variant="outline" className="border-neon-green text-neon-green hover:bg-neon-green/10">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main IDE */}
      <div className="flex-1 overflow-hidden flex gap-4 p-4">
        {/* Editor */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <SolidityEditor code={code} onChange={setCode} onEditorRef={editorRef} />
        </div>

        {/* Sidebar - Tabs */}
        <div className="w-96 flex flex-col gap-4">
          <Tabs defaultValue="agent" className="glass p-4 rounded-xl flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="agent" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Agent
              </TabsTrigger>
              <TabsTrigger value="deploy">Deploy</TabsTrigger>
            </TabsList>

            <TabsContent value="agent" className="flex-1 overflow-hidden">
              <AgentChat getCode={getCode} />
            </TabsContent>

            <TabsContent value="deploy" className="flex-1 overflow-hidden">
              <DeployPanel code={getCode} address={address} contractName="MyContract" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
