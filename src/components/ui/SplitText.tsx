import React from 'react';
import { cn } from '../../lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  charClass?: string;
  wordClass?: string;
}

export function SplitText({ text, className, charClass = '', wordClass = '' }: SplitTextProps) {
  const words = text.split(' ');
  return (
    <span className={cn('inline-block', className)}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={`word-${wordIndex}`}>
          <span className={cn('inline-block whitespace-nowrap', wordClass)}>
            {word.split('').map((char, charIndex) => (
              <span
                key={`char-${wordIndex}-${charIndex}`}
                className={cn('split-char', charClass)}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 && (
            <span className="inline-block whitespace-pre"> </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
