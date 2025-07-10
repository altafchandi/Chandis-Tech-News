// components/Footer.jsx
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer({ language = 'en' }) {
  const currentYear = new Date().getFullYear();
  
  const translations = {
    copyright: {
      en: 'All rights reserved',
      zh: '保留所有权利',
      hi: 'सर्वाधिकार सुरक्षित',
      es: 'Todos los derechos reservados',
      fr: 'Tous droits réservés'
    },
    aiNotice: {
      en: 'AI-powered content',
      zh: 'AI驱动的内容',
      hi: 'एआई-संचालित सामग्री',
      es: 'Contenido con tecnología de IA',
      fr: 'Contenu alimenté par IA'
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright and brand info */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
              <span className="text-lg font-semibold">Chandi Tech</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              © {currentYear} Chandi Tech. {translations.copyright[language] || translations.copyright.en}
            </p>
          </div>

          {/* AI notice and social links */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                AI
              </span>
              {translations.aiNotice[language] || translations.aiNotice.en}
            </div>

            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/yourcompany" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}