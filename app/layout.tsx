import getCurrentUser from './actions/getCurrentUser';
import LoginModel from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import Toasters from './components/provider/Toasters';
import './globals.css'
import QueryWrapper from './components/QueryWrapper';
import Head from 'next/head';

export const metadata = {
  openGraph: {
    title: '자바스크립트 코테 블로그',
    url: 'https://jscotemaster.vercel.app/',

  },
  robots: {
    index: true,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="ko">
      <Head>
        <metadata />
      </Head>
      <body className='w-full h-screen dark:bg-zinc-800'>
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
