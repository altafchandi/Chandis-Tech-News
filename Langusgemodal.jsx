// components/LanguageModal.jsx
import { useState, useEffect } from 'react';

const languageMap = {
  en: { name: "English", flag: "🇺🇸" },
  zh: { name: "中文", flag: "🇨🇳" },
  hi: { name: "हिन्दी", flag: "🇮🇳" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  ja: { name: "日本語", flag: "🇯🇵" },
  ar: { name: "العربية", flag: "🇸🇦" },
  pt: { name: "Português", flag: "🇵🇹" },
  ru: { name: "Русский", flag: "🇷🇺" },
};

export default function LanguageModal({ isOpen, onClose, onLanguageChange }) {
  const [suggestedLanguages, setSuggestedLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch geolocation data and suggested languages
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchGeoData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/geo');
        const data = await response.json();
        
        if (response.ok) {
          // Get suggested languages based on country
          const suggested = getSuggestedLanguages(data.country);
          setSuggestedLanguages(suggested);
          
          // Pre-select the first suggested language
          setSelectedLanguage(suggested[0]?.code || 'en');
        } else {
          setError(data.error || 'Failed to fetch location data');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoData();
    
    // Check if we have a saved language preference
    const savedLanguage = localStorage.getItem('chandi-lang');
    if (savedLanguage && languageMap[savedLanguage]) {
      setSelectedLanguage(savedLanguage);
    }
  }, [isOpen]);

  // Get suggested languages based on country
  const getSuggestedLanguages = (country) => {
    const countryLanguageMap = {
      US: ['en', 'es'],
      CN: ['zh', 'en'],
      IN: ['hi', 'en'],
      ES: ['es', 'en'],
      FR: ['fr', 'en'],
      DE: ['de', 'en'],
      JP: ['ja', 'en'],
      SA: ['ar', 'en'],
      BR: ['pt', 'es', 'en'],
      RU: ['ru', 'en'],
      // Add more country mappings as needed
    };

    const defaultLanguages = ['en', 'zh', 'es', 'hi', 'fr'];
    const countryCodes = countryLanguageMap[country] || defaultLanguages;
    
    return countryCodes
      .filter(code => languageMap[code])
      .map(code => ({ code, ...languageMap[code] }));
  };

  const handleConfirm = () => {
    if (selectedLanguage) {
      // Save to localStorage
      localStorage.setItem('chandi-lang', selectedLanguage);
      
      // Update app context
      onLanguageChange(selectedLanguage);
      
      // Close modal
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Select Your Language</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              <p>{error}</p>
              <p className="mt-2 text-sm">Showing default languages</p>
            </div>
          ) : null}
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              We've detected your location and suggest these languages:
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {suggestedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 border rounded-lg flex flex-col items-center transition-all ${
                    selectedLanguage === lang.code
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{lang.flag}</span>
                  <span className="font-medium text-gray-700">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedLanguage}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedLanguage
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}