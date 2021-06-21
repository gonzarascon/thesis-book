import Link from 'next/link';
import React, { FC } from 'react';

type IncomingProps = {
  activeRoute: string;
};

const Breadcrumb: FC<IncomingProps> = ({ activeRoute = 'Active Route' }) => {
  return (
    <nav className="flex space-x-2 flex-nowrap">
      <Link href="/">
        <a className="transition-colors duration-75 hover:underline hover:text-purple-300">
          Inicio
        </a>
      </Link>
      <span>/</span>
      <span className="text-purple-500">{activeRoute}</span>
    </nav>
  );
};

export default Breadcrumb;
