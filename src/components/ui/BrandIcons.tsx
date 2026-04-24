/**
 * Brand-mark SVGs for social icons. lucide-react dropped them in 0.469+
 * (brand icons are the domain of simple-icons now). We inline the minimum
 * paths we need so bundle size stays tiny.
 */

type Props = React.SVGProps<SVGSVGElement>;

export function FacebookIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.6V14h2.8v8h3.1z" />
    </svg>
  );
}

export function InstagramIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 7.1s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C16.7 3.5 12 3.5 12 3.5h0s-4.7 0-7.9.3c-.4.1-1.4.1-2.2 1-.7.7-.9 2.3-.9 2.3S.8 9 .8 10.9v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 2 .9 2.4 1 1.8.2 7.7.3 7.7.3s4.7 0 7.9-.3c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.8C23.2 9 23 7.1 23 7.1zM9.7 14.6V8.3l6.1 3.2-6.1 3.1z" />
    </svg>
  );
}

export function TiktokIcon(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.6 6.9c-1.5-.4-2.7-1.6-2.9-3.1-.1-.4-.1-.8-.1-1.2h-3v13.8c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6 0 .8.1v-3.1c-.3 0-.6-.1-.9-.1-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8V9.8c1.2.8 2.7 1.3 4.2 1.3V8c-.5 0-.9-.1-1.2-.2z" />
    </svg>
  );
}
