import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

const MarkDownConverter = ({ children }) => {
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
