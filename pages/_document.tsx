import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html className='scroll-smooth'>
      <Head>
        <Script src='https://www.googletagmanager.com/gtag/js?id=G-3HNV4JX0KR' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3HNV4JX0KR');
            `,
          }}
        />
        <meta
          name='description'
          content='The portfolio website of Jonathan Kelly.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
