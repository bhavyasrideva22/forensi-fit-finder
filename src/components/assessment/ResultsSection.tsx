import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  Brain, 
  Code, 
  Target,
  ArrowLeft,
  Download,
  RotateCcw
} from "lucide-react";
import { useAssessment } from "@/contexts/AssessmentContext";

interface ResultsSectionProps {
  onPrevious: () => void;
  onRestart: () => void;
}

export function ResultsSection({ onPrevious, onRestart }: ResultsSectionProps) {
  const { state, dispatch } = useAssessment();

  useEffect(() => {
    // Calculate scores when component mounts
    dispatch({ type: 'CALCULATE_SCORES' });
    dispatch({ type: 'COMPLETE_ASSESSMENT' });
  }, [dispatch]);

  const getRecommendationIcon = () => {
    switch (state.recommendation) {
      case 'YES': return <CheckCircle className="w-8 h-8 text-success" />;
      case 'MAYBE': return <AlertTriangle className="w-8 h-8 text-warning" />;
      case 'NO': return <XCircle className="w-8 h-8 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationColor = () => {
    switch (state.recommendation) {
      case 'YES': return 'border-success bg-success/5';
      case 'MAYBE': return 'border-warning bg-warning/5';
      case 'NO': return 'border-destructive bg-destructive/5';
      default: return 'border-muted';
    }
  };

  const getRecommendationText = () => {
    switch (state.recommendation) {
      case 'YES': 
        return {
          title: "Yes, You Should Learn Digital Forensics!",
          description: "Your assessment results show strong alignment with the requirements and characteristics needed for success in digital forensics. You demonstrate the right combination of analytical thinking, technical aptitude, and personal motivation."
        };
      case 'MAYBE':
        return {
          title: "Maybe - Consider Exploring Further",
          description: "Your results show potential for digital forensics, but some areas may need development. Consider taking an introductory course or shadowing a professional to confirm your interest and identify areas for improvement."
        };
      case 'NO':
        return {
          title: "Consider Alternative Paths",
          description: "Based on your assessment results, digital forensics may not be the best fit at this time. However, there are many related fields in cybersecurity that might align better with your strengths and interests."
        };
      default:
        return { title: "Assessment Results", description: "Calculating your recommendation..." };
    }
  };

  const wiscarAverage = Object.values(state.scores.wiscar).reduce((sum, score) => sum + score, 0) / 6;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-6 py-2">
          Assessment Complete
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Your Digital Forensics Readiness Report
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Based on your responses, here's your comprehensive assessment of readiness for digital forensics
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className={`shadow-elevated border-2 ${getRecommendationColor()}`}>
        <CardHeader className="text-center space-y-4">
          {getRecommendationIcon()}
          <div>
            <CardTitle className="text-2xl mb-2">
              {getRecommendationText().title}
            </CardTitle>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {getRecommendationText().description}
            </p>
          </div>
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-2xl px-6 py-3">
              Overall Score: {Math.round(state.scores.overall)}/100
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Psychometric Score */}
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle>Psychometric Fit</CardTitle>
            <p className="text-3xl font-bold text-primary">
              {Math.round(state.scores.psychometric)}/100
            </p>
          </CardHeader>
          <CardContent>
            <Progress value={state.scores.psychometric} className="mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              Your personality traits and interests alignment with forensic work
            </p>
          </CardContent>
        </Card>

        {/* Technical Score */}
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <Code className="w-8 h-8 text-accent mx-auto mb-2" />
            <CardTitle>Technical Readiness</CardTitle>
            <p className="text-3xl font-bold text-accent">
              {Math.round(state.scores.technical)}/100
            </p>
          </CardHeader>
          <CardContent>
            <Progress value={state.scores.technical} className="mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              Your current technical knowledge and aptitude for forensic tools
            </p>
          </CardContent>
        </Card>

        {/* WISCAR Average */}
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <Target className="w-8 h-8 text-success mx-auto mb-2" />
            <CardTitle>WISCAR Framework</CardTitle>
            <p className="text-3xl font-bold text-success">
              {Math.round(wiscarAverage)}/100
            </p>
          </CardHeader>
          <CardContent>
            <Progress value={wiscarAverage} className="mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              Your whole-person readiness across six key dimensions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            WISCAR Framework Breakdown
          </CardTitle>
          <p className="text-muted-foreground">
            Your scores across the six dimensions of whole-person readiness
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(state.scores.wiscar).map(([dimension, score]) => {
            const dimensionNames = {
              will: 'Will (Persistence)',
              interest: 'Interest (Curiosity)', 
              skill: 'Skill (Current Abilities)',
              cognitive: 'Cognitive (Mental Capacity)',
              ability: 'Ability (Learning Capacity)',
              realWorld: 'Real-World Fit'
            };
            
            return (
              <div key={dimension} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {dimensionNames[dimension as keyof typeof dimensionNames]}
                  </span>
                  <span className="text-sm font-bold">
                    {Math.round(score)}/100
                  </span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.recommendation === 'YES' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-success">Path to Success:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Begin with foundational courses in digital forensics and cybersecurity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Learn forensic tools like Autopsy, FTK, or Wireshark through hands-on labs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Practice with Capture The Flag (CTF) competitions and TryHackMe scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Consider pursuing certifications like CompTIA Security+ or GCFA</span>
                </li>
              </ul>
            </div>
          )}
          
          {state.recommendation === 'MAYBE' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-warning">Exploration Steps:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Take an introductory digital forensics course to gauge your interest</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Shadow a digital forensics professional for a day</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Strengthen your technical foundation with OS and networking courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Try basic forensic challenges on platforms like CyberDefenders</span>
                </li>
              </ul>
            </div>
          )}
          
          {state.recommendation === 'NO' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-destructive">Alternative Paths:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Consider cybersecurity analysis or network security roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Explore data analysis or business intelligence careers</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Look into IT audit or compliance roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Consider risk management or security policy development</span>
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4" />
          Previous Section
        </Button>
        
        <Button variant="default" onClick={() => window.print()}>
          <Download className="w-4 h-4" />
          Save Results
        </Button>
        
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}