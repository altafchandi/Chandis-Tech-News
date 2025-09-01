# CLINE_SPEC
# Frontend Blueprint for ChandisTech (Next.js + TypeScript + Tailwind + next-intl)

> This document is the primary spec for the Cline VS Code agent.  
> Goal: Generate a production-ready, multilingual (EN/UR) tech-news frontend with great UX, SEO, accessibility, and PWA.

---

## 0) Project Summary (Urdu + English)
- Urdu/English ملٹی لنگوئل ٹیک نیوز/AI پورٹل: نیوز پوسٹس، ویڈیوز/ریلز، AI خلاصہ، TTS، Custom Ads، Social Share، PWA۔
- Use **Next.js (App Router) + TypeScript + Tailwind + next-intl (v4.5+)**.
- Clean, fast, mobile-first UI; RTL support for Urdu; dark mode; accessible components; SEO best practices.

---

## 1) Tech & Packages
- Next.js 14/15 (App Router), TypeScript
- TailwindCSS, PostCSS, Autoprefixer
- next-intl v4.5+ (i18n EN/UR)
- shadcn/ui + lucide-react (UI)
- Framer Motion (micro-animations)
- Zod + react-hook-form + @hookform/resolvers
- SWR (or TanStack Query)
- next-seo
- next-pwa
- (Optional) Plaiceholder or blurDataURL for images

---

## 2) Commands (Node 18+)
```bash
# create app
npx create-next-app@latest chandistech --typescript --eslint --app --src-dir --tailwind
cd chandistech

# install deps
npm i next-intl framer-motion class-variance-authority lucide-react @radix-ui/react-slot zod react-hook-form @hookform/resolvers swr next-seo next-pwa
npm i -D @types/node @types/react @types/react-dom

# (optional) shadcn/ui
npx shadcn@latest init
3) Environment (create .env.local)
ini
Copy code
NEXT_PUBLIC_API_BASE=https://api.chandistech.com
NEXT_PUBLIC_SITE_URL=https://www.chandistech.com
NEXT_PUBLIC_ADS_ENABLED=true
NEXT_PUBLIC_TTS_ENABLED=true
NEXT_PUBLIC_AI_SUMMARY_ENABLED=true
4) Directory Structure
bash
Copy code
/src
  /app
    /(public)
      /[locale]
        layout.tsx
        page.tsx
        /news
          page.tsx
          [slug]/page.tsx
        /videos/page.tsx
        /deals/page.tsx
        /tags/page.tsx
        /about/page.tsx
        /contact/page.tsx
        /login/page.tsx
        /admin/page.tsx
  /components
    ui/ (shadcn)
    layout/ (Header, Footer, MainNav, LanguageSwitcher, ThemeToggle, SearchBar)
    cards/ (PostCard, VideoCard, DealCard)
    blocks/ (Hero, TrendingRail, Ticker, NewsletterCta)
    post/ (PostHeader, PostBody, ShareBar, SummaryBox, TTSPlayer, TagList, RelatedPosts, Comments)
    ads/ (AdSlot, VideoAdPlayer)
    forms/ (ContactForm, LoginForm, NewsletterForm)
  /i18n
    messages/en.json
    messages/ur.json
    config.ts
    requestConfig.ts
  /lib (fetcher, providers, seo, analytics, pwa, utils)
  /styles (globals.css, prose.css, fonts.css)
  /types (content.ts, ads.ts, user.ts)
  /hooks (useTheme, useLocale, useShare, useAds, usePlayer)
/public (icons, images, fonts, mock)
5) i18n Setup (next-intl)
/src/i18n/config.ts

ts
Copy code
export const locales = ['en', 'ur'] as const;
export const defaultLocale = 'en';
export const localeDirections: Record<string,'ltr'|'rtl'> = { en: 'ltr', ur: 'rtl' };
/src/i18n/requestConfig.ts

ts
Copy code
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) locale = defaultLocale;
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
/src/app/[locale]/layout.tsx

tsx
Copy code
import { NextIntlClientProvider } from 'next-intl';
import requestConfig from '@/i18n/requestConfig';
import { localeDirections } from '@/i18n/config';
import '../globals.css';

export default async function RootLayout({ children, params:{locale} }: any) {
  const { messages } = await requestConfig({ locale } as any);
  const dir = localeDirections[locale] ?? 'ltr';
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
/src/i18n/messages/en.json

json
Copy code
{
  "nav.news": "News",
  "nav.videos": "Videos",
  "nav.deals": "Deals",
  "nav.tags": "Tags",
  "cta.newsletter": "Get weekly tech updates",
  "form.email": "Email address",
  "form.subscribe": "Subscribe",
  "post.summary": "AI Summary",
  "post.listen": "Listen"
}
/src/i18n/messages/ur.json

json
Copy code
{
  "nav.news": "خبریں",
  "nav.videos": "ویڈیوز",
  "nav.deals": "ڈیلز",
  "nav.tags": "ٹیگز",
  "cta.newsletter": "ہفتہ وار ٹیک اپڈیٹس حاصل کریں",
  "form.email": "ای میل ایڈریس",
  "form.subscribe": "سبسکرائب",
  "post.summary": "AI خلاصہ",
  "post.listen": "سنیں"
}
6) Styling & Fonts
Tailwind with light/dark themes (CSS vars).

English: Inter/Roboto. Urdu: Jameel Noori Nastaleeq self-hosted in /public/fonts, class .font-urdu.

Apply .font-urdu when locale is ur; ensure proper RTL layout.

/src/styles/globals.css – include base Tailwind layers and prose tweaks.

7) Types (contracts)
/src/types/content.ts

ts
Copy code
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  bodyHtml?: string;
  summary?: string;
  ttsUrl?: string;
  tags: string[];
  lang: 'en' | 'ur';
  publishedAt: string;
  author?: { name: string; avatar?: string };
};
/src/types/ads.ts

ts
Copy code
export type Ad = {
  id: string;
  slot: 'header'|'sidebar'|'inline'|'video-pre'|'video-mid';
  kind: 'adsense'|'custom-banner'|'custom-html'|'sponsored-video';
  html?: string;
  imageUrl?: string;
  clickUrl?: string;
  startAt?: string;
  endAt?: string;
  views?: number;
  clicks?: number;
  active: boolean;
};
8) Core Components (brief specs)
Header/MainNav: logo, nav (News/Videos/Deals/Tags), Search, LanguageSwitcher, ThemeToggle.

Hero/TrendingRail: featured + horizontal scroller.

PostCard: title, image, excerpt, tags, date.

Post Detail: PostHeader, PostBody (prose), SummaryBox (AI summary), TTSPlayer, ShareBar, RelatedPosts, Comments (placeholder).

AdSlot: renders custom/Adsense/sponsored video; counts views/clicks via hook.

VideoAdPlayer: pre/mid-roll modes, controls.

Forms: Contact, Newsletter (zod + RHF), Login (UI only).

/src/components/post/TTSPlayer.tsx

tsx
Copy code
'use client';
import { useRef, useState } from 'react';
export default function TTSPlayer({ audioUrl, title }: { audioUrl?: string; title: string }) {
  const ref = useRef<HTMLAudioElement|null>(null);
  const [playing, setPlaying] = useState(false);
  if (!audioUrl) return null;
  return (
    <div className="rounded-2xl border p-4">
      <div className="font-semibold mb-2">{title}</div>
      <audio ref={ref} src={audioUrl} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} controls />
      <div className="text-sm opacity-70 mt-2">{playing ? 'Playing…' : 'Paused'}</div>
    </div>
  );
}
/src/components/ads/AdSlot.tsx

tsx
Copy code
type Props = { slot: 'header'|'sidebar'|'inline'|'video-pre'|'video-mid'; ad?: any };
export default function AdSlot({ slot, ad }: Props) {
  if (!ad || ad.active === false) return null;
  if (ad.kind === 'custom-html' && ad.html) {
    return <div className="my-4" dangerouslySetInnerHTML={{ __html: ad.html }} />;
  }
  if (ad.imageUrl && ad.clickUrl) {
    return (
      <a href={ad.clickUrl} target="_blank" rel="nofollow" className="block my-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.imageUrl} alt="Sponsored" className="w-full rounded-xl" />
      </a>
    );
  }
  return null;
}
9) Data Fetching & APIs (frontend expectations)
GET /posts?lang={en|ur}&tag={t}&page={n}

GET /posts/{slug}

GET /trending

GET /videos?page={n}

GET /ads?slots=header,sidebar,inline

POST /newsletter { email }

POST /contact { name, email, message }

/src/lib/fetcher.ts

ts
Copy code
export const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 60 } }).then(r => r.json());
10) Pages & Features
/[locale] Home: Hero, TrendingRail, Latest (SWR infinite), inline AdSlot, NewsletterCta.

/news list + /news/[slug] detail with SummaryBox + TTSPlayer + ShareBar.

/videos, /deals, /tags, /about, /contact, /login, /admin.

Dark mode toggle; Web Share API; tag-based browsing; PWA manifest & offline; SEO defaults with next-seo.

11) SEO & PWA
Title template %s | ChandisTech, OG/Twitter tags, per-post OG image.

robots.txt, sitemap.xml (basic).

next-pwa with dest: 'public'; public/manifest.json + icons (192/512); offline fallback.

12) Accessibility & Performance
Semantic landmarks; focus styles; labels; color contrast AA; proper RTL for Urdu.

Performance budget: LCP < 2.5s (mobile), CLS < 0.1; use next/image with responsive sizes; font optimization; route-level code splitting.

13) Acceptance Criteria (DoD)
Typecheck & ESLint clean

i18n (EN/UR) works; RTL verified

Dark/light themes OK

Lighthouse: Perf ≥ 90, SEO ≥ 95, A11y ≥ 95

No console errors; mobile (360px) and desktop tested

Mock data works, switchable to NEXT_PUBLIC_API_BASE later

14) Agent Plan (Cline—execute in order)
Scaffold project + install packages; commit.

Add Tailwind config & global styles; commit.

Implement i18n setup (config, requestConfig, [locale]/layout.tsx); commit.

Add design system: shadcn/ui primitives; Header/MainNav/Footer/LanguageSwitcher/ThemeToggle/SearchBar; commit.

Build Home (page.tsx), Hero/TrendingRail/PostCard, mock JSON under /public/mock; commit.

Build /news list + [slug] detail with SummaryBox, TTSPlayer, ShareBar; commit.

Build /videos, /deals, /tags, /about, /contact, /login, /admin; commit.

Add AdSlot + VideoAdPlayer; placeholder tracking hooks; commit.

Add next-seo defaults; robots & sitemap; PWA manifest & offline; commit.

QA: RTL polish, accessibility pass, perf pass; finalize.

15) Notes
Keep components server-first; mark interactive ones 'use client' minimally.

Use EN as default; UR has dir="rtl" and .font-urdu.

Replace mocks with real APIs once backend is ready.

vbnet
Copy code

