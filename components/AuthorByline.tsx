interface AuthorBylineProps {
  variant: 'full' | 'reviewed-by';
  lastUpdated?: string;
  showDisclosure?: boolean;
}

const AUTHOR = {
  name: 'Laura Martisiute',
  role: 'Content Strategist',
  bio: '10+ years in cybersecurity marketing. Founder of Content Visit.',
  linkedIn: 'https://ie.linkedin.com/in/laura-martisiute-b152a5129',
};

export default function AuthorByline({ variant, lastUpdated, showDisclosure }: AuthorBylineProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    url: AUTHOR.linkedIn,
    sameAs: [AUTHOR.linkedIn],
    worksFor: {
      '@type': 'Organization',
      name: 'Content Visit',
      url: 'https://www.contentvisit.com',
    },
  };

  if (variant === 'reviewed-by') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <p className="text-gray-400 text-sm font-mono">
          Reviewed by{' '}
          <a
            href={AUTHOR.linkedIn}
            target="_blank"
            rel="noopener"
            className="text-white hover:text-gray-300 underline"
          >
            {AUTHOR.name}
          </a>
          {lastUpdated && <span> · Updated {lastUpdated}</span>}
        </p>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="border-2 border-white/20 p-4 mt-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-800 border-2 border-white flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            LM
          </div>
          <div>
            <div className="text-white font-bold text-sm">
              <a
                href={AUTHOR.linkedIn}
                target="_blank"
                rel="noopener"
                className="hover:text-gray-300 underline"
              >
                {AUTHOR.name}
              </a>
            </div>
            <div className="text-gray-400 text-xs">{AUTHOR.role} · {AUTHOR.bio}</div>
            {lastUpdated && (
              <div className="text-gray-500 text-xs mt-1">Last updated: {lastUpdated}</div>
            )}
          </div>
        </div>

        {showDisclosure && (
          <div className="mt-3 p-3 bg-gray-800/50 border border-white/10 text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-300">Disclosure:</strong> Laura Martisiute is the founder of Content Visit, which is featured in this directory. Ratings are based on our published methodology.
          </div>
        )}
      </div>
    </>
  );
}
