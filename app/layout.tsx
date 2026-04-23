import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Sui Game License Store',
  description: 'Dự án Hackathon ITC - Quản lý bản quyền Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ backgroundColor: '#0b0e14', color: '#fff' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}