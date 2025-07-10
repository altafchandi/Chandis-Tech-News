export default function handler(req, res) {
  const { lang = 'en' } = req.query;
  
  // Sample localized news data
  const newsData = {
    en: [
      {
        id: 1,
        title: "Quantum Computing Breakthrough",
        summary: "Researchers achieve quantum supremacy with new 128-qubit processor that solves problems in minutes instead of years.",
        category: "Science",
        date: "2023-11-15",
        image: "/tech1.jpg"
      },
      // Add more English articles
    ],
    zh: [
      {
        id: 1,
        title: "量子计算突破",
        summary: "研究人员使用新型128量子位处理器实现量子霸权，在几分钟内解决原本需要数年时间的问题。",
        category: "科学",
        date: "2023-11-15",
        image: "/tech1.jpg"
      },
      // Add more Chinese articles
    ],
    // Add other languages...
  };

  // Fallback to English if language not available
  res.status(200).json({
    articles: newsData[lang] || newsData.en
  });
}