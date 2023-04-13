import LoginModel from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import Toasters from './components/provider/Toasters';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <LoginModel />
        <RegisterModal />
        <Toasters />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
