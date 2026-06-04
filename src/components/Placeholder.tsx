import type { CSSProperties } from 'react';

type Props = { src: string; className?: string; style?: CSSProperties };

export function Placeholder({ src, className = 'ph', style }: Props) {
  return <div className={className} style={{ backgroundImage: `url("${src}")`, ...style }} />;
}
