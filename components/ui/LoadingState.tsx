'use client';

import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface LoadingStateProps {
  isLoading: boolean;
  isSuccess?: boolean;
  error?: string | null;
  message?: string;
}

export function LoadingState({ isLoading, isSuccess, error, message }: LoadingStateProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-neon-green">
        <Loader className="w-4 h-4 animate-spin" />
        <span className="text-sm">{message || 'Processing...'}</span>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center gap-2 text-neon-green">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm">Success!</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return null;
}

interface TransactionStatusProps {
  hash?: string;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | null;
}

export function TransactionStatus({ hash, isLoading, isSuccess, error }: TransactionStatusProps) {
  return (
    <div className="glass p-4 rounded-lg">
      <LoadingState
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
        message="Confirming transaction..."
      />
      {hash && (
        <div className="mt-3 text-xs text-muted-foreground">
          <a
            href={`https://basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-green hover:underline"
          >
            View on BaseScan →
          </a>
        </div>
      )}
    </div>
  );
}
