import { HeroSection } from './sections/HeroSection'
import { BioSection } from './sections/BioSection'
import { WhatYoullGetSection } from './sections/WhatYoullGetSection'
import { FormSection } from './sections/FormSection'
import { RevealSection } from './RevealSection'

export function WaitlistPage() {
  return (
    <div className="relative">
      <div className="charm-mesh" />
      <div className="charm-grain" />

      <HeroSection />
      <RevealSection>
        <BioSection />
      </RevealSection>
      <RevealSection>
        <WhatYoullGetSection />
      </RevealSection>
      <RevealSection>
        <FormSection />
      </RevealSection>
    </div>
  )
}
