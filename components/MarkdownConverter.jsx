import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const MarkDownConverter = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render markdown during SSR to prevent hydration mismatch
  if (!isClient) {
    return <div style={{ width: '100%' }}>{children}</div>;
  }

  return (
    <Markdown
      options={{
        overrides: {
          a: {
            component: ({ href, children, ...props }) => {
              const isInternal = href?.startsWith('/') && !href.startsWith('./') && !href.startsWith('../');

              if (isInternal) {
                return (
                  <Link href={href} {...props}>
                    {children}
                  </Link>
                );
              }

              return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            },
          },
        },
      }}
      style={{ width: '100%' }}
    >
      {children}
    </Markdown>
  );
};

export default MarkDownConverter;
