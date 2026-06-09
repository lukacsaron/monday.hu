import { TopBar, MobileTop } from '@/components/TopBar';
import { FloatingMenu } from '@/components/FloatingMenu';
import { SvgFilters } from '@/components/SvgFilters';
import { Hero } from '@/components/Hero';
import { WorkSection } from '@/components/Work';
import { WerkSection } from '@/components/Werk';
import { WeAreSection } from '@/components/WeAre';
import { WordSection } from '@/components/Word';
import { Marquee } from '@/components/Marquee';
import { Foot } from '@/components/Foot';

export default function Page() {
  return (
    <div className="page">
      <SvgFilters />
      <TopBar />
      <MobileTop />
      <FloatingMenu />
      <Hero />
      <WorkSection />
      <WerkSection />
      <WeAreSection />
      <WordSection />
      <Marquee reverse />
      <Foot />
    </div>
  );
}
