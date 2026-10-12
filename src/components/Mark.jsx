// Small logo mark: a stylised mokorotlo, the conical Basotho hat.
export default function Mark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="10" fill="#16243F" />
      <path d="M8 50 L32 12 L56 50 Z" fill="#E2AA33" />
      <circle cx="32" cy="10" r="4" fill="#B8322A" />
      <path d="M20 50 L32 31 L44 50 Z" fill="#16243F" />
    </svg>
  );
}
