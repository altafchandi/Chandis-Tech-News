// components/NewsCard.js
export default function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {article.image && (
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="text-sm text-gray-500">{article.category}</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            AI Summary
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-900">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(article.date).toLocaleDateString()}
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Read more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}