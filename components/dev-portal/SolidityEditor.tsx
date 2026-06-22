'use client';

import { Editor } from '@monaco-editor/react';
import { useEffect, useRef } from 'react';
import type * as Monaco from 'monaco-editor';

interface SolidityEditorProps {
  code: string;
  onChange: (code: string) => void;
  onEditorRef?: React.MutableRefObject<{ getValue: () => string } | null>;
}

export function SolidityEditor({ code, onChange, onEditorRef }: SolidityEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (onEditorRef && editorRef.current) {
      onEditorRef.current = {
        getValue: () => editorRef.current?.getValue() || code,
      };
    }
  }, [code, onEditorRef]);

  const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    if (onEditorRef) {
      onEditorRef.current = {
        getValue: () => editor.getValue(),
      };
    }
  };

  return (
    <div className="glass rounded-xl overflow-hidden border border-border flex flex-col h-full">
      <div className="bg-black/40 border-b border-border px-4 py-2">
        <span className="text-sm font-mono text-neon-green">Contract.sol</span>
      </div>
      <Editor
        height="100%"
        defaultLanguage="solidity"
        value={code}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Monaco', monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          renderWhitespace: 'selection',
          wordWrap: 'on',
          contextmenu: true,
          folding: true,
          lineNumbersMinChars: 3,
          glyphMargin: true,
          formatOnPaste: true,
          formatOnType: true,
        }}
        className="font-mono"
      />
    </div>
  );
}
