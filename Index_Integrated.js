
// pages/index.js
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import NewsSection from '../components/NewsSection';
import LanguageModal from '../components/LanguageModal';
import LanguageButton from '../components/LanguageButton'; // ✅ from your original code

export default function Home({ geoData }) {
  const [language, setLanguage] = useState(geoData.language || 'en');
  const [country, setCountry] = useState(geoData.country || 'United States');
  const [showModal, setShowModal] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const [news, setNews] = useState([]);

  // ✅ Check for first visit and saved language
  useEffect(() => {
    const savedLang = localStorage.getItem('chandi-lang');
    const visited = localStorage.getItem('chandi-visited');

    if (savedLang) {
      setLanguage(savedLang);
    }

    if (!visited) {
      setFirstVisit(true);
      setShowModal(true);
      localStorage.setItem('chandi-visited', 'true');
    }
  }, []);

  // ✅ Fetch news based on language
  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`/api/news?lang=${language}`);
      const data = await res.json();
      setNews(data.articles);
    };
    fetchNews();
  }, [language]);

  // ✅ Language change handler
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('chandi-lang', newLang);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header country={country} language={language} />
      <NewsSection news={news} language={language} />

      {/* 🌐 Language Modal */}
      <LanguageModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSelect={handleLanguageChange}
      />

      {/* 🌐 Floating Language Button */}
      {!firstVisit && (
        <LanguageButton onClick={() => setShowModal(true)} />
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    const geoRes = await fetch(`http://your-fastapi-service/geolocation?ip=${ip}`);
    const geoData = await geoRes.json();

    return {
      props: {
        geoData: {
          language: geoData.language || 'en',
          country: geoData.country || 'United States',
        },
      },
    };
  } catch (error) {
    return {
      props: {
        geoData: {
          language: 'en',
          country: 'United States',
        },
      },
    };
  }
}
