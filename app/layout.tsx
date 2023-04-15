import { QueryClientProvider } from '@tanstack/react-query';
import getCurrentUser from './actions/getCurrentUser';
import LoginModel from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import Toasters from './components/provider/Toasters';
import './globals.css'
import QueryWrapper from './components/QueryWrapper';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="ko">
      <body className='w-full h-screen '>
        <QueryWrapper>
          <LoginModel />
          <RegisterModal />
          <Toasters />
          <Navbar currentUser={currentUser}/>
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
