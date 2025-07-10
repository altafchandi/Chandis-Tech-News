// components/NewsCard.jsx
import { useState } from 'react';

export default function NewsCard({ article }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300
        ${isHovered ? 'transform -translate-y-1 shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with gradient overlay on hover */}
      <div className="relative">
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        
        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : ''}`} />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {article.category}
          </span>
          
          {/* AI Summary Badge */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
            </svg>
            AI Summary
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2 min-h-[56px]">
          {article.title}
        </h3>
        
        {/* AI Summary - shown on hover on desktop, always on mobile */}
        <div className="relative">
          <div className={`text-gray-600 mb-4 line-clamp-3 transition-all duration-300
            ${isHovered ? 'opacity-0 max-h-0' : 'opacity-100 max-h-20'}`}>
            {article.summary}
          </div>
          
          <div className={`absolute top-0 left-0 w-full transition-all duration-300
            ${isHovered ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <p className="text-gray-700 mb-4">
              {article.ai_summary}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-generated summary
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{article.source}</span>
            <button 
              className={`flex items-center font-medium transition-colors ${
                isHovered ? 'text-blue-600' : 'text-gray-500'
              }`}
              aria-label="Read more"
            >
              Read
              <svg className={`w-4 h-4 ml-1 transition-transform ${
                isHovered ? 'transform translate-x-1' : ''
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}