import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Search, 
  Eye, 
  UserCheck, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight 
} from "lucide-react";

interface IntroductionSectionProps {
  onNext: () => void;
}

export function IntroductionSection({ onNext }: IntroductionSectionProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="outline" className="text-lg px-6 py-2">
          Assessment Introduction
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Am I Ready for Digital Forensics Analysis?
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          This assessment helps individuals determine their fit, readiness, and future potential 
          in the field of Digital Forensics Analysis, through a blend of psychological, 
          aptitude, and skill readiness evaluations.
        </p>
      </div>

      {/* What is Digital Forensics */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Search className="w-7 h-7 text-primary" />
            What is Digital Forensics Analysis?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg leading-relaxed">
          <p>
            Digital forensics refers to the process of identifying, preserving, analyzing, 
            and presenting digital evidence from computers, mobile devices, and networks, 
            often used in law enforcement, cybersecurity, and corporate investigations.
          </p>
        </CardContent>
      </Card>

      {/* Careers Grid */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-foreground">
          Careers in Digital Forensics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Digital Forensics Analyst",
              icon: Shield,
              description: "Extract and analyze digital evidence from various devices and systems"
            },
            {
              title: "Cybercrime Investigator", 
              icon: Search,
              description: "Work with law enforcement on digital crime cases and investigations"
            },
            {
              title: "Incident Responder",
              icon: UserCheck,
              description: "First responder to cyber incidents, preserving and analyzing evidence"
            },
            {
              title: "Security Consultant",
              icon: CheckCircle,
              description: "Provide forensic expertise to organizations and legal teams"
            },
            {
              title: "Threat Intelligence Analyst",
              icon: Eye,
              description: "Analyze digital threats and provide intelligence to security teams"
            },
            {
              title: "Malware Analyst",
              icon: TrendingUp,
              description: "Investigate malicious code and understand attack methodologies"
            }
          ].map((career, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <career.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{career.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {career.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Ideal Traits */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <CheckCircle className="w-7 h-7 text-success" />
            Ideal Traits for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { trait: "High attention to detail", description: "Ability to notice small but critical pieces of evidence" },
              { trait: "Logical reasoning", description: "Strong analytical thinking and problem-solving skills" },
              { trait: "Curiosity and investigative thinking", description: "Natural desire to understand how things work" },
              { trait: "Persistence and ethical responsibility", description: "Commitment to thorough work and ethical standards" },
              { trait: "Comfort with structured processes", description: "Ability to follow detailed procedures and documentation" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.trait}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center pt-8">
        <Button 
          variant="hero" 
          size="lg" 
          onClick={onNext}
          className="text-lg px-8 py-4 h-auto"
        >
          Begin Assessment
          <ArrowRight className="w-5 h-5" />
        </Button>
        <p className="text-muted-foreground mt-4">
          The assessment consists of 6 sections and takes approximately 25-30 minutes
        </p>
      </div>
    </div>
  );
}