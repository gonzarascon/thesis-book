import { FC } from 'react';
import { ParsedPage } from 'types/ParsedPage';
import Link from 'next/link';

type IncomingProps = {
  prev?: ParsedPage | null;
  next?: ParsedPage | null;
};

const Paginator: FC<IncomingProps> = ({ prev, next }) => {
  return (
    <section className="flex w-full pt-10 text-purple-400 transition-colors border-t border-gray-200 flex-nowrap">
      {prev && (
        <Link href={`/${prev.slug}`}>
          <a className="flex flex-col items-end mr-auto group">
            <span className="ml-auto text-sm text-gray-400 group-hover:text-gray-600">
              Anterior
            </span>
            <span className="flex items-center group-hover:text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <p className="ml-2">{prev.title}</p>
            </span>
          </a>
        </Link>
      )}
      {next && (
        <Link href={`/${next.slug}`}>
          <a className="flex flex-col items-start ml-auto group">
            <span className="text-sm text-gray-400 group-hover:text-gray-600">
              Siguiente
            </span>
            <span className="flex items-center group-hover:text-purple-600">
              <p className="mr-2">{next.title}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
        </Link>
      )}
    </section>
  );
};

export default Paginator;
