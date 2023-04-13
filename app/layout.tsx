import LoginModel from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LoginModel />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
