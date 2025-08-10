import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Code, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useAssessment } from "@/contexts/AssessmentContext";

interface TechnicalSectionProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
  category: 'aptitude' | 'prerequisite' | 'domain';
}

const questions: Question[] = [
  // General Aptitude
  {
    id: 'technical_aptitude_1',
    text: 'What is the hexadecimal representation of the decimal number 255?',
    options: ['0xFF', '0x100', '0xFE', '0x256'],
    correct: 0,
    category: 'aptitude'
  },
  {
    id: 'technical_aptitude_2', 
    text: 'If you see the pattern "4D 5A" at the beginning of a file, what type of file is it likely to be?',
    options: ['JPEG image', 'PDF document', 'Windows executable', 'ZIP archive'],
    correct: 2,
    category: 'aptitude'
  },
  {
    id: 'technical_aptitude_3',
    text: 'Which of the following represents a logical approach to analyzing digital evidence?',
    options: [
      'Start with the most interesting files first',
      'Create a working copy before any analysis',
      'Delete suspicious files to prevent contamination',
      'Analyze files in alphabetical order'
    ],
    correct: 1,
    category: 'aptitude'
  },
  
  // Prerequisite Knowledge
  {
    id: 'technical_prereq_1',
    text: 'What does NTFS stand for in Windows file systems?',
    options: ['New Technology File System', 'Network Transfer File System', 'Native Text File Structure', 'Networked Terminal File Storage'],
    correct: 0,
    category: 'prerequisite'
  },
  {
    id: 'technical_prereq_2',
    text: 'In Linux, what command would you use to list files with detailed information?',
    options: ['dir', 'ls -l', 'list', 'show files'],
    correct: 1,
    category: 'prerequisite'
  },
  {
    id: 'technical_prereq_3',
    text: 'What is the purpose of a hash function in digital forensics?',
    options: [
      'To encrypt sensitive data',
      'To verify data integrity',
      'To compress large files',
      'To decode binary data'
    ],
    correct: 1,
    category: 'prerequisite'
  },
  
  // Domain-Specific Knowledge
  {
    id: 'technical_domain_1',
    text: 'What is metadata in the context of digital forensics?',
    options: [
      'The main content of a file',
      'Data about data, such as creation dates and file properties',
      'Encrypted portions of files',
      'Deleted file fragments'
    ],
    correct: 1,
    category: 'domain'
  },
  {
    id: 'technical_domain_2',
    text: 'What is the chain of custody in digital forensics?',
    options: [
      'The order in which files are analyzed',
      'A documented record of evidence handling',
      'The sequence of data recovery steps',
      'A list of forensic tools used'
    ],
    correct: 1,
    category: 'domain'
  },
  {
    id: 'technical_domain_3',
    text: 'What is file carving?',
    options: [
      'Deleting unwanted files from evidence',
      'Recovering files from unallocated disk space',
      'Creating backup copies of files',
      'Organizing files by type'
    ],
    correct: 1,
    category: 'domain'
  },
  {
    id: 'technical_domain_4',
    text: 'What information can timestamps provide in forensic analysis?',
    options: [
      'File size and type only',
      'When files were created, modified, and accessed',
      'The contents of deleted files',
      'Network connection details'
    ],
    correct: 1,
    category: 'domain'
  }
];

export function TechnicalSection({ onNext, onPrevious }: TechnicalSectionProps) {
  const { state, dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleResponse = (value: string) => {
    const selectedIndex = parseInt(value);
    dispatch({
      type: 'SET_RESPONSE',
      key: currentQuestion.id,
      value: selectedIndex
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const canProceed = questions.every(q => state.responses[q.id] !== undefined);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'aptitude': return 'bg-primary';
      case 'prerequisite': return 'bg-accent';
      case 'domain': return 'bg-success';
      default: return 'bg-muted';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'aptitude': return 'General Aptitude';
      case 'prerequisite': return 'Prerequisite Knowledge';
      case 'domain': return 'Domain Knowledge';
      default: return 'Question';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-6 py-2">
          Section 3 of 6
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Code className="w-8 h-8 text-primary" />
          Technical & Aptitude Assessment
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Test your current technical knowledge and aptitude for digital forensics analysis
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

      {/* Question Navigation */}
      <div className="flex justify-center gap-2 flex-wrap">
        {questions.map((_, index) => (
          <Button
            key={index}
            variant={index === currentQuestionIndex ? "default" : state.responses[questions[index].id] !== undefined ? "success" : "outline"}
            size="sm"
            onClick={() => setCurrentQuestionIndex(index)}
            className="w-10 h-10 p-0"
          >
            {state.responses[questions[index].id] !== undefined && index !== currentQuestionIndex ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              index + 1
            )}
          </Button>
        ))}
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
        <CardContent className="space-y-6">
          <h2 className="text-xl font-semibold leading-relaxed">
            {currentQuestion.text}
          </h2>
          
          <RadioGroup 
            value={state.responses[currentQuestion.id]?.toString() || ""} 
            onValueChange={handleResponse}
            className="space-y-4"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-smooth">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous Question
        </Button>
        
        <Button 
          variant="default" 
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next Question
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4" />
          Previous Section
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {canProceed ? "All questions answered!" : "Answer all questions to continue"}
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