import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cx from 'clsx';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { pathname } = useRouter();

  const headerClasses = cx(
    'flex items-center justify-center w-full px-4 py-6 mx-auto bg-white sm:py-12 ',
    {
      'sticky top-0 left-0 z-20 bg-opacity-30 backdrop-filter backdrop-blur-md':
        pathname !== '/',
    }
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={headerClasses}>
        <nav className="container mx-auto text-center">
          {pathname !== '/' && (
            <Link href="/">
              <a>
                <h1 className="text-base sm:text-lg font-heading">
                  Learnground: La gamificación aplicada a plataformas de
                  E-learning.
                </h1>
              </a>
            </Link>
          )}
        </nav>
      </header>
      <main className="container flex-grow px-6 py-4 mx-auto">{children}</main>
      <footer className="flex items-center w-full px-4 py-12">
        <section className="container mx-auto text-center">
          <span className="text-gray-400">
            Hecho con 💖 y 👨‍🏭 por{' '}
            <a
              href="https://gonzarascon.com"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Gonzalo Rascón
            </a>
          </span>
        </section>
      </footer>
    </div>
  );
};

export default Layout;
