import { useState } from "react";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import { HeroSection } from "@/components/assessment/HeroSection";
import { IntroductionSection } from "@/components/assessment/IntroductionSection";
import { PsychometricSection } from "@/components/assessment/PsychometricSection";
import { TechnicalSection } from "@/components/assessment/TechnicalSection";
import { WiscarSection } from "@/components/assessment/WiscarSection";
import { CareerGuidanceSection } from "@/components/assessment/CareerGuidanceSection";
import { ResultsSection } from "@/components/assessment/ResultsSection";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "hero",
    "introduction", 
    "psychometric",
    "technical",
    "wiscar",
    "career",
    "results"
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
  };

  const startAssessment = () => {
    setCurrentStep(1);
  };

  const renderCurrentStep = () => {
    switch (steps[currentStep]) {
      case "hero":
        return <HeroSection onStartAssessment={startAssessment} />;
      case "introduction":
        return <IntroductionSection onNext={nextStep} />;
      case "psychometric":
        return <PsychometricSection onNext={nextStep} onPrevious={prevStep} />;
      case "technical":
        return <TechnicalSection onNext={nextStep} onPrevious={prevStep} />;
      case "wiscar":
        return <WiscarSection onNext={nextStep} onPrevious={prevStep} />;
      case "career":
        return <CareerGuidanceSection onNext={nextStep} onPrevious={prevStep} />;
      case "results":
        return <ResultsSection onPrevious={prevStep} onRestart={resetAssessment} />;
      default:
        return <HeroSection onStartAssessment={startAssessment} />;
    }
  };

  return (
    <AssessmentProvider>
      <div className="min-h-screen bg-background">
        {renderCurrentStep()}
      </div>
    </AssessmentProvider>
  );
};

export default Index;
