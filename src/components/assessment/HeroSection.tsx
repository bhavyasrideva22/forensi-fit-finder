import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Search, Target, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-forensics.jpg";

interface HeroSectionProps {
  onStartAssessment: () => void;
}

export function HeroSection({ onStartAssessment }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/90" />
      </div>
      
      {/* Animated Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
          <Search className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
          <Brain className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Header Badge */}
          <Badge variant="secondary" className="mx-auto bg-white/20 text-white border-white/30 px-6 py-2 text-lg">
            Skills Readiness Assessment
          </Badge>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Am I Ready for
              <br />
              <span className="gradient-text bg-gradient-to-r from-accent-glow to-white bg-clip-text text-transparent">
                Digital Forensics?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover your fit, readiness, and potential in digital forensics through our comprehensive 
              assessment that blends psychology, aptitude, and skill evaluation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onStartAssessment}
              className="text-lg px-8 py-4 h-auto animate-pulse-glow"
            >
              <Target className="w-5 h-5" />
              Start Assessment
            </Button>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-4 h-4" />
              <span>25-30 minutes</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 transition-spring hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Psychometric Analysis</h3>
                <p className="text-white/80">Evaluate personality traits, interests, and cognitive style for forensics work</p>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 transition-spring hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Technical Aptitude</h3>
                <p className="text-white/80">Test your current knowledge and learning readiness for forensic tools</p>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 transition-spring hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-warning/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Career Guidance</h3>
                <p className="text-white/80">Get personalized recommendations and learning pathways</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}