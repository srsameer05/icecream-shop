import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
  title: 'Scoop Bill - Ice Cream Billing System',
  description: 'Manage sales, inventory, and analytics for Scoop Bill Ice Cream Shop.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ToastProvider>
          <div className="app">
            <Sidebar />
            <main className="main">
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
