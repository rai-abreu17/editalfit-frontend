/* Shared icon set — ported faithfully from the EditalFit mobile design.
   Each accepts standard SVG props so callers can size/color/className them. */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function IconArrow(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBack(props: P) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M11.5 4L6.5 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEye({ open, ...props }: P & { open?: boolean }) {
  return open ? (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M1.5 9s2.7-5 7.5-5 7.5 5 7.5 5-2.7 5-7.5 5-7.5-5-7.5-5z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ) : (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M2 3l13 12M3.5 7C2.5 8 1.5 9 1.5 9s2.7 5 7.5 5c1.2 0 2.2-.3 3.2-.6M6.5 4.6c.8-.2 1.6-.4 2.5-.4 4.8 0 7.5 5 7.5 5-.5 1-1.2 1.9-2 2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconLock(props: P) {
  return (
    <svg width={13} height={13} viewBox="0 0 14 14" fill="none" {...props}>
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconCheck(props: P) {
  return (
    <svg width={11} height={11} viewBox="0 0 12 12" fill="none" {...props}>
      <circle cx="6" cy="6" r="5.4" fill="currentColor" opacity="0.15" />
      <path d="M3.5 6l1.7 1.7L8.5 4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGoogle(props: P) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} {...props}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A11 11 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

export function IconShare(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M9 2v9M5.5 5.5L9 2l3.5 3.5M3 10v4a1 1 0 001 1h10a1 1 0 001-1v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowUp(props: P) {
  return (
    <svg width={11} height={11} viewBox="0 0 12 12" fill="none" {...props}>
      <path d="M6 10V3M3 6l3-3 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEnvelope(props: P) {
  return (
    <svg width={34} height={34} viewBox="0 0 34 34" fill="none" {...props}>
      <rect x="5" y="9" width="24" height="17" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 11.5L17 19l11.5-7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClock(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 4.5v3.7l2 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconShield(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M8 1.5l5.5 2v4.2c0 3.2-2.2 5.7-5.5 6.8-3.3-1.1-5.5-3.6-5.5-6.8V3.5L8 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5.8 8.2l1.6 1.6L10.3 6.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCal(props: P) {
  return (
    <svg width={13} height={13} viewBox="0 0 14 14" fill="none" {...props}>
      <rect x="2" y="3" width="10" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6h10M5 2v2M9 2v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconDoc(props: P) {
  return (
    <svg width={13} height={13} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M3 1.5h5L11 4.5V12a.5.5 0 01-.5.5h-7A.5.5 0 013 12V2a.5.5 0 010-.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 1.5V5h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBell(props: P) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M9 2.5a4.5 4.5 0 00-4.5 4.5v2.7l-1 2.3h11l-1-2.3V7A4.5 4.5 0 009 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.2 13.5a1.8 1.8 0 003.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlus(props: P) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M9 3.5v11M3.5 9h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSparkles(props: P) {
  return (
    <svg width={13} height={13} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M7 1.5v3M7 9.5v3M1.5 7h3M9.5 7h3M3.2 3.2l2 2M8.8 8.8l2 2M3.2 10.8l2-2M8.8 5.2l2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconStar(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M7 1.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.2l-3.4 1.8.7-3.8L1.5 5.5l3.8-.5L7 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCopy(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <rect x="4" y="4" width="8" height="8" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.5 4V2.7A.7.7 0 008.8 2H2.7a.7.7 0 00-.7.7v6.1c0 .39.31.7.7.7H4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTrash(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M2.5 4h9M5.5 4V2.7c0-.39.31-.7.7-.7h1.6c.39 0 .7.31.7.7V4M3.5 4l.7 7.3c.04.39.36.7.75.7h4.1c.39 0 .71-.31.75-.7L10.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFolderPlus(props: P) {
  return (
    <svg width={56} height={56} viewBox="0 0 56 56" fill="none" {...props}>
      <path d="M6 16a4 4 0 014-4h11l4 5h19a4 4 0 014 4v23a4 4 0 01-4 4H10a4 4 0 01-4-4V16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 28v10M23 33h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSearch(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconHome(props: P) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M3 7.5L9 2.5l6 5V14a1 1 0 01-1 1h-3v-4H7v4H4a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGrid(props: P) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <rect x="3" y="3" width="5" height="5" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="3" width="5" height="5" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="10" width="5" height="5" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="10" width="5" height="5" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconGear(props: P) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 1.8v2.2M9 14v2.2M16.2 9H14M4 9H1.8M14.1 3.9l-1.6 1.6M5.5 12.5l-1.6 1.6M14.1 14.1l-1.6-1.6M5.5 5.5L3.9 3.9" />
      </g>
    </svg>
  );
}

export function IconMenu(props: P) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3.5 6h13M3.5 10h13M3.5 14h13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevRight(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCamera(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M1.5 5A1.3 1.3 0 012.8 3.7h1.1L4.7 2.4h4.6l.8 1.3h1.1A1.3 1.3 0 0112.5 5v5.2a1.3 1.3 0 01-1.3 1.3H2.8a1.3 1.3 0 01-1.3-1.3V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="7" cy="7.6" r="2.1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function IconMapPin(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M7 12.5c2.5-3 4-5 4-7a4 4 0 10-8 0c0 2 1.5 4 4 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconUser(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 13c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconAward(props: P) {
  return (
    <svg width={13} height={13} viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.6 8.3L3.5 12l3.5-1.6L10.5 12 9.4 8.3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFilter(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M2 3.5h10M3.5 7h7M5 10.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevDown(props: P) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
      <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconInbox(props: P) {
  return (
    <svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <path d="M4.5 16l2.5-9a2 2 0 012-1.5h10a2 2 0 012 1.5l2.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4.5 16h6l1.5 3h6l1.5-3h6v6a2 2 0 01-2 2H6.5a2 2 0 01-2-2v-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconQuote(props: P) {
  return (
    <svg width={12} height={12} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M3 8.5C3 6 4.4 4.4 6 4M3 8.5h2.2v2.3H3V8.5zM8 8.5C8 6 9.4 4.4 11 4M8 8.5h2.2v2.3H8V8.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLink(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M7.5 10.5a3 3 0 004.2 0l2-2a3 3 0 10-4.2-4.2l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 7.5a3 3 0 00-4.2 0l-2 2a3 3 0 104.2 4.2l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconErrorBig(props: P) {
  return (
    <svg width={34} height={34} viewBox="0 0 34 34" fill="none" {...props}>
      <path d="M17 4.5L31 28.5H3L17 4.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 14v6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="17" cy="24.2" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconFileX(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3.5 2h5L12 5.5V13a.5.5 0 01-.5.5h-8A.5.5 0 013 13V2.5A.5.5 0 013.5 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.5 2v3.5H12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 8.5l3 3M9 8.5l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconPencil(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M9.5 2.5l2 2L5 11l-2.5.5L3 9l6.5-6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.5 3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconSpinner(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.32)" strokeWidth="2" />
      <path d="M8 2a6 6 0 016 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconDownload(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M2 9.5V11a1 1 0 001 1h8a1 1 0 001-1V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 2.5V9M4.5 6.5L7 9l2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconUpload(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M2 9.5V11a1 1 0 001 1h8a1 1 0 001-1V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 9V2.5M4.5 5L7 2.5 9.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPaperclip(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M9.5 7l-3.4 3.4a2 2 0 01-2.8-2.8L7 4a3 3 0 014.2 4.2l-4.3 4.3a4 4 0 11-5.6-5.6L5.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconReplace(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M2 5a4 4 0 016.5-3M12 9a4 4 0 01-6.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 2v3h3M5 12V9H2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPeople(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 11.5c.5-1.8 1.9-2.8 3.5-2.8s3 1 3.5 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="5.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9c1.5 0 2.6.7 3.2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconSave(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M2.5 2.5h7L12 5v6.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M4 2.5v3h5v-3M4 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconWarn(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M7 2l5.5 9.5h-11L7 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 6v2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="10" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function IconExternal(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M5 3H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 2h4v4M12 2L6.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTarget(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconScale(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M7 2v10M3 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 9l2-4 2 4a2 2 0 11-4 0zm6 0l2-4 2 4a2 2 0 11-4 0z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLayers(props: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M7 1.5l5.5 3-5.5 3-5.5-3 5.5-3zM1.5 7L7 10l5.5-3M1.5 9.5L7 12.5l5.5-3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBook(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M2.5 3a.5.5 0 01.5-.5h4a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 007 11.5H3a.5.5 0 01-.5-.5V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M13.5 3a.5.5 0 00-.5-.5H9a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 019 11.5h4a.5.5 0 00.5-.5V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAlert(props: P) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 2.5L18 16.5H2L10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconYes(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3.5 8.4l3 3 6-6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconNo(props: P) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function StatusIcon({ status, ...props }: P & { status: "ok" | "warn" | "danger" }) {
  if (status === "ok")
    return (
      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
        <path d="M3 7.2l2.6 2.6L11 4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (status === "warn")
    return (
      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
        <path d="M7 3v4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="10.3" r="1.1" fill="currentColor" />
      </svg>
    );
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
