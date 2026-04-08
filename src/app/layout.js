import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata = {
  title: 'ScoopBill - Ice Cream Shop Billing System',
  description: 'Full-stack ice cream shop billing, inventory, and analytics system',
  icons: {
    icon: 'https://cdn-icons-png.flaticon.com/512/921/921221.png',
  },
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
