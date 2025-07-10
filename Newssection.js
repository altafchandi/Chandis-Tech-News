import NewsCard from './NewsCard';

export default function NewsSection({ news, language }) {
  if (!news || news.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            {language === 'zh' 
              ? '加载新闻...' 
              : language === 'hi'
                ? 'समाचार लोड हो रहा है...' 
                : 'Loading news...'}
          </h2>
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}