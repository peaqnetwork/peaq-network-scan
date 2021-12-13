import Head from 'next/head'
import React from 'react'
import logo from '../../public/images/logo.svg'
import Footer from '../footer/footer'
import NavHeader from '../nav-header/nav-header'

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
            rel="preload"
            href="/fonts/Ageo/Ageo.ttf"
            as="font"
            crossOrigin=""
          />
        <meta
          name="description"
          content="Peaq Blockchain Explorer"
        />
        <meta
          property="og:image"
          content={logo}
        />
        <meta name="og:title" content="Peaq blockchain explorer" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <NavHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}