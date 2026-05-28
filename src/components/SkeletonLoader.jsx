import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-3/4">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2"></div>
        </div>
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
        <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
      </div>
      <div className="flex space-x-2 pt-3">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-20"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-24"></div>
      </div>
    </div>
  );
}

export function ChatBubbleSkeleton() {
  return (
    <div className="flex items-start space-x-3 max-w-lg animate-pulse mb-6">
      <div className="h-9 w-9 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
      <div className="space-y-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 w-full">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3"></div>
        <div className="space-y-1.5 pt-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-11/12"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-44 bg-slate-200 dark:bg-slate-800"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="space-y-1.5 pt-1">
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
        </div>
        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md pt-2"></div>
      </div>
    </div>
  );
}

export default function SkeletonLoader({ type = 'card', count = 3 }) {
  const elements = Array.from({ length: count });

  return (
    <div className={`grid gap-6 ${
      type === 'chat' 
        ? 'grid-cols-1' 
        : type === 'article' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 md:grid-cols-2'
    }`}>
      {elements.map((_, i) => (
        <React.Fragment key={i}>
          {type === 'card' && <CardSkeleton />}
          {type === 'chat' && <ChatBubbleSkeleton />}
          {type === 'article' && <ArticleSkeleton />}
        </React.Fragment>
      ))}
    </div>
  );
}
