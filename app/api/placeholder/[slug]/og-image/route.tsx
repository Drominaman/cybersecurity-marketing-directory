import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import React from 'react';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Blog Post';

  // Generate deterministic gradient from slug
  const hash = hashString(slug);
  const gradients = [
    ['#06b6d4', '#ec4899'], // cyan to magenta
    ['#10b981', '#3b82f6'], // green to blue
    ['#8b5cf6', '#ec4899'], // purple to magenta
    ['#06b6d4', '#6366f1'], // cyan to indigo
  ];
  const [color1, color2] = gradients[hash % gradients.length];

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: '8px solid #06b6d4',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: 'white',
              textAlign: 'center',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              color: '#06b6d4',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            CYBERSECURITY MARKETING
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
