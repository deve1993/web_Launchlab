
import Hero from '@/components/sections/Hero';
import PainCards from '@/components/sections/PainCards';
import Metodo from '@/components/sections/Metodo';
import Processo from '@/components/sections/Processo';
import Pricing from '@/components/sections/Pricing';
import SocialProof from '@/components/sections/SocialProof';
import CtaFinale from '@/components/sections/CtaFinale';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PainCards />
      <Metodo />
      <Processo />
      <Pricing />
      <SocialProof />
      <CtaFinale />
    </main>
  );
}
