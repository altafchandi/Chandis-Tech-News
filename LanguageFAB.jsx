// components/LanguageFAB.jsx (FAB = Floating Action Button)
import { FaLanguage } from "react-icons/fa";

export default function LanguageFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-xl
                bg-gradient-to-br from-blue-600 to-indigo-700 text-white
                hover:from-blue-700 hover:to-indigo-800
                transform hover:scale-110 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      aria-label="Change language"
    >
      <FaLanguage className="w-6 h-6" />
    </button>
  );
}