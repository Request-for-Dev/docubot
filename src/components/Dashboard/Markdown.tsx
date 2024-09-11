/* eslint-disable import/prefer-default-export */
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './prism-synthwave84.css';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type MarkdownRendererProps = {
  children: string;
};

export function MarkdownRenderer({ children: markdown }: MarkdownRendererProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Customizing heading elements
        h1: ({ children }) => <h1 className='my-4 text-3xl font-bold'>{children}</h1>,
        h2: ({ children }) => <h2 className='my-3 text-2xl font-semibold'>{children}</h2>,
        h3: ({ children }) => <h3 className='my-2 text-xl font-medium'>{children}</h3>,

        // Customizing paragraph and list elements
        p: ({ children }) => <p className='my-2 leading-relaxed'>{children}</p>,
        ul: ({ children }) => <ul className='my-2 list-inside list-disc'>{children}</ul>,
        ol: ({ children }) => <ol className='my-2 list-inside list-decimal'>{children}</ol>,

        // Customizing link element
        a: ({ href, children }) => (
          <a
            href={href}
            className='text-accent2 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            {children}
          </a>
        ),

        // Customizing blockquote element
        blockquote: ({ children }) => (
          <blockquote className='my-4 border-l-4 border-gray-300 pl-4 italic'>
            {children}
          </blockquote>
        ),

        // Customizing code blocks and inline code
        code({ inline, className, children, ...props }: CodeBlockProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              PreTag='div'
              language={match[1]}
              className='my-4 rounded-md'
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className='rounded bg-gray-100 px-1 py-0.5 font-mono text-sm' {...props}>
              {children}
            </code>
          );
        },

        // Customizing table elements
        table: ({ children }) => (
          <div className='my-4 overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className='bg-gray-50'>{children}</thead>,
        th: ({ children }) => (
          <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
            {children}
          </th>
        ),
        td: ({ children }) => <td className='whitespace-nowrap px-6 py-4'>{children}</td>,
      }}
    >
      {markdown}
    </Markdown>
  );
}
