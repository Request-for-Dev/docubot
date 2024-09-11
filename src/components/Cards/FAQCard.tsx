'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className='border-b border-accent2/20 last:border-b-0'>
      <button
        className='flex w-full items-center justify-between py-4 text-left'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-lg font-semibold text-dark-800 dark:text-light-300'>{question}</span>
        {isOpen ? (
          <ChevronUp className='h-5 w-5 text-accent' />
        ) : (
          <ChevronDown className='h-5 w-5 text-accent' />
        )}
      </button>
      <div
        style={{ height: `${height}px` }}
        className='overflow-hidden transition-all duration-300 ease-in-out'
      >
        <div ref={answerRef} className='pb-4 text-dark-600 dark:text-light-400'>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
