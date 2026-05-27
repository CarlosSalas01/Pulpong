interface RedCupIconProps {
  className?: string;
}

export default function RedCupIcon({ className = "h-8 w-8" }: RedCupIconProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 20h92l-14 88c-1.5 9.5-9.8 16-19.4 16H51.4c-9.6 0-17.9-6.5-19.4-16L18 20z"
        fill="#D63A56"
      />
      <rect x="14" y="16" width="100" height="10" rx="5" fill="#67C1FF" />
      <rect
        x="24"
        y="36"
        width="80"
        height="7"
        rx="3.5"
        fill="#E95C78"
        opacity="0.85"
      />
      <rect
        x="30"
        y="50"
        width="68"
        height="6"
        rx="3"
        fill="#C62B48"
        opacity="0.9"
      />
      <rect
        x="34"
        y="62"
        width="60"
        height="5"
        rx="2.5"
        fill="#E95C78"
        opacity="0.75"
      />
      <rect
        x="38"
        y="73"
        width="52"
        height="5"
        rx="2.5"
        fill="#B72641"
        opacity="0.85"
      />
      <path
        d="M28 24h72l-11 80c-1 7.5-7.4 13-15 13H54c-7.6 0-14-5.5-15-13L28 24z"
        fill="#F0627D"
        opacity="0.35"
      />
    </svg>
  );
}
