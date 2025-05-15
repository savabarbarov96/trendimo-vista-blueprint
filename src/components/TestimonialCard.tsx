
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  position?: string;
  image?: string;
}

const TestimonialCard = ({ quote, author, position, image }: TestimonialProps) => {
  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700/30">
      <Quote className="h-10 w-10 text-primary opacity-20 mb-4" />
      <p className="text-gray-300 mb-4 italic">{quote}</p>
      <div className="flex items-center">
        {image ? (
          <img 
            src={image} 
            alt={author} 
            className="h-12 w-12 rounded-full mr-4 object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/20 mr-4 flex items-center justify-center">
            <span className="text-primary font-bold text-xl">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{author}</p>
          {position && (
            <p className="text-sm text-gray-400">{position}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
