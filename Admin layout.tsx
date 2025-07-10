import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Posts', path: '/admin/posts', icon: '📝' },
    { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
    { name: 'Translations', path: '/admin/translations', icon: '🌐' },
    { name: 'Traffic', path: '/admin/traffic', icon: '🧭' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <a className={`flex items-center p-3 rounded-lg ${router.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <span className="mr-3">🔒</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}