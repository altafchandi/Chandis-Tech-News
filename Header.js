import { useState, useEffect } from 'react';

const languageText = {
  en: 'Tech News',
  zh: '科技新闻',
  hi: 'तकनीकी समाचार',
  es: 'Noticias de Tecnología'
};

export default function Header({ country, language }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-blue-600 to-indigo-700 py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div>
            <h1 className="text-2xl font-bold text-white">Chandi Tech</h1>
            <p className="text-blue-100 text-sm">
              {country} • {languageText[language] || languageText.en}
            </p>
          </div>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-white">
            <li className="hover:text-blue-200 cursor-pointer">Home</li>
            <li className="hover:text-blue-200 cursor-pointer">Trending</li>
            <li className="hover:text-blue-200 cursor-pointer">About</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}