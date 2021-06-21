import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className="flex flex-col min-h-screen">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="sticky top-0 left-0 z-20 flex items-center justify-center w-full py-12 mx-auto bg-white bg-opacity-30 backdrop-filter backdrop-blur-md">
      <nav className="container mx-auto text-center">
        <Link href="/">
          <a>
            <h1 className="text-lg font-heading">
              Learnground: La gamificación aplicada a plataformas de E-learning.
            </h1>
          </a>
        </Link>
      </nav>
    </header>
    <main className="container flex-grow py-4 mx-auto">{children}</main>
    <footer className="flex items-center w-full py-12">
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

export default Layout;
