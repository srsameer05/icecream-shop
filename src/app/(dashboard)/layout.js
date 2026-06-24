import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        {children}
      </main>
    </div>
  );
}
