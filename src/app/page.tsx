import { TopBar, MobileTop } from '@/components/TopBar';
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
      <TopBar />
      <MobileTop />
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
