import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Script from 'next/script';

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Foosball App',
    description: 'Keep track of all your foosball metrics!',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
                <meta name="application-name" content="Foosball" />

                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="Foosball" />
                <meta name="description" content="Foosball" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />

                <link
                    rel="apple-touch-icon"
                    href="/icons/touch-icon-iphone.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/icons/touch-icon-ipad.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/touch-icon-iphone-retina.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="167x167"
                    href="/icons/touch-icon-ipad-retina.png"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="mask-icon"
                    href="/icons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                />

                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:url"
                    content="https://foosball.srepollock.dev"
                />
                <meta name="twitter:title" content="Foosball" />
                <meta name="twitter:description" content="Foosball" />
                <meta
                    name="twitter:image"
                    content="https://foosball.srepollock.dev/icons/android-chrome-192x192.png"
                />
                <meta name="twitter:creator" content="@DavidWShadow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Foosball" />
                <meta property="og:description" content="Foosball" />
                <meta property="og:site_name" content="Foosball" />
                <meta
                    property="og:url"
                    content="https://foosball.srepollock.dev"
                />
                <meta
                    property="og:image"
                    content="https://foosball.srepollock.dev/icons/apple-touch-icon.png"
                />
            </head>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    {children}
                </main>
                {/* <Script src="/service-worker.js" /> */}
            </body>
        </html>
    );
}
