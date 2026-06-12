import { TopBar, MobileTop } from '@/components/TopBar';
import { FloatingMenu } from '@/components/FloatingMenu';
import { Hero, type HeroFx } from '@/components/Hero';
import { WorkSection } from '@/components/Work';
import { WerkSection } from '@/components/Werk';
import { WinsSection } from '@/components/Wins';
import { WeAreSection } from '@/components/WeAre';
import { WordSection } from '@/components/Word';
import { Marquee } from '@/components/Marquee';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ fx?: string }>;
}) {
  const { fx } = await searchParams;
  const heroFx = (['blur', 'invert', 'contrast'] as const).find((v) => v === fx) as HeroFx | undefined;
  return (
    <div className="page">
      <TopBar />
      <MobileTop />
      <FloatingMenu />
      <Hero fx={heroFx} />
      <WorkSection />
      <WerkSection />
      <WinsSection />
      <WeAreSection />
      <WordSection />
      <Marquee reverse />
    </div>
  );
}
