// LoadingPage.tsx
import React from 'react';

export const LoadingPage: React.FC = () => (
  <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-white">
    <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-primary"></div>
  </div>
);
