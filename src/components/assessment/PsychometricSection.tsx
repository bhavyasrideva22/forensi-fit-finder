import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowLeft, ArrowRight } from "lucide-react";
import { useAssessment } from "@/contexts/AssessmentContext";

interface PsychometricSectionProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface Question {
  id: string;
  text: string;
  category: 'interest' | 'personality' | 'motivation' | 'cognitive';
}

const questions: Question[] = [
  // Interest Scale
  { id: 'psychometric_interest_1', text: 'I enjoy solving puzzles or complex problems', category: 'interest' },
  { id: 'psychometric_interest_2', text: 'I find myself naturally curious about how technology works', category: 'interest' },
  { id: 'psychometric_interest_3', text: 'I like investigating mysteries or unexplained situations', category: 'interest' },
  { id: 'psychometric_interest_4', text: 'I enjoy detailed, methodical work that requires precision', category: 'interest' },
  
  // Personality Compatibility
  { id: 'psychometric_personality_1', text: 'I prefer working independently rather than in large groups', category: 'personality' },
  { id: 'psychometric_personality_2', text: 'I am very organized and detail-oriented in my work', category: 'personality' },
  { id: 'psychometric_personality_3', text: 'I can stay focused on tasks for extended periods', category: 'personality' },
  { id: 'psychometric_personality_4', text: 'I handle pressure and deadlines well', category: 'personality' },
  { id: 'psychometric_personality_5', text: 'I am comfortable with structured environments and procedures', category: 'personality' },
  
  // Motivation Drivers
  { id: 'psychometric_motivation_1', text: 'I am motivated by the opportunity to help solve crimes', category: 'motivation' },
  { id: 'psychometric_motivation_2', text: 'I find intellectual challenges more rewarding than social recognition', category: 'motivation' },
  { id: 'psychometric_motivation_3', text: 'I am driven by the pursuit of truth and justice', category: 'motivation' },
  { id: 'psychometric_motivation_4', text: 'I enjoy work that has a clear impact on society', category: 'motivation' },
  
  // Cognitive Preferences
  { id: 'psychometric_cognitive_1', text: 'I prefer analytical thinking over creative expression', category: 'cognitive' },
  { id: 'psychometric_cognitive_2', text: 'I work better with facts and data than with abstract concepts', category: 'cognitive' },
  { id: 'psychometric_cognitive_3', text: 'I like to approach problems systematically and methodically', category: 'cognitive' },
];

export function PsychometricSection({ onNext, onPrevious }: PsychometricSectionProps) {
  const { state, dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleResponse = (value: number) => {
    dispatch({
      type: 'SET_RESPONSE',
      key: currentQuestion.id,
      value: value
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const canProceed = currentQuestionIndex === questions.length - 1 && 
    questions.every(q => state.responses[q.id] !== undefined);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'interest': return 'bg-primary';
      case 'personality': return 'bg-accent';
      case 'motivation': return 'bg-success';
      case 'cognitive': return 'bg-warning';
      default: return 'bg-muted';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'interest': return 'Interest Scale';
      case 'personality': return 'Personality Compatibility';
      case 'motivation': return 'Motivation Drivers';
      case 'cognitive': return 'Cognitive Preferences';
      default: return 'Question';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-6 py-2">
          Section 2 of 6
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          Mind for Forensics
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Evaluate your interest, motivation, personality traits, and cognitive style for forensic work
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="shadow-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className={`${getCategoryColor(currentQuestion.category)} text-white`}
            >
              {getCategoryLabel(currentQuestion.category)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <h2 className="text-xl font-semibold leading-relaxed">
            {currentQuestion.text}
          </h2>
          
          {/* Likert Scale */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  variant={state.responses[currentQuestion.id] === value ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleResponse(value)}
                  className="flex-1 h-16 text-lg"
                >
                  {value}
                </Button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4" />
          Previous Section
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Answer all questions to continue
          </p>
        </div>
        
        <Button 
          variant="default" 
          onClick={onNext}
          disabled={!canProceed}
        >
          Next Section
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}