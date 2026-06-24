import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata = {
  title: 'Minimelts Egypt - The Coolest Ice Cream in the World',
  description: 'Welcome to the world of Minimelts, where you have the power to create and unleash your wildest sweet dream.',
  icons: {
    icon: 'https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/658b5de061cdc3543488369e_Favicons.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
