import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, ArrowLeft, ArrowRight, Zap, Heart, Cog, Brain, TrendingUp, Users } from "lucide-react";
import { useAssessment } from "@/contexts/AssessmentContext";

interface WiscarSectionProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface WiscarDimension {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  questions: Array<{
    id: string;
    text: string;
  }>;
}

const wiscarDimensions: WiscarDimension[] = [
  {
    id: 'will',
    name: 'Will',
    icon: Zap,
    color: 'bg-yellow-500',
    description: 'Motivation to persist through challenges and maintain long-term commitment',
    questions: [
      { id: 'wiscar_will_1', text: 'I stick with difficult tasks even when I face setbacks' },
      { id: 'wiscar_will_2', text: 'I maintain consistent effort toward my goals over months or years' },
      { id: 'wiscar_will_3', text: 'I find motivation in overcoming complex challenges' },
      { id: 'wiscar_will_4', text: 'I rarely give up on projects that are important to me' },
    ]
  },
  {
    id: 'interest',
    name: 'Interest',
    icon: Heart,
    color: 'bg-red-500',
    description: 'Genuine curiosity and engagement with forensic work and cybersecurity',
    questions: [
      { id: 'wiscar_interest_1', text: 'I actively seek out information about cybersecurity topics' },
      { id: 'wiscar_interest_2', text: 'I find forensic investigation shows and documentaries fascinating' },
      { id: 'wiscar_interest_3', text: 'I enjoy learning about new digital forensics tools and techniques' },
      { id: 'wiscar_interest_4', text: 'I would choose to attend cybersecurity conferences in my free time' },
    ]
  },
  {
    id: 'skill',
    name: 'Skill',
    icon: Cog,
    color: 'bg-blue-500',
    description: 'Current technical abilities and foundational knowledge',
    questions: [
      { id: 'wiscar_skill_1', text: 'I am comfortable using command-line interfaces' },
      { id: 'wiscar_skill_2', text: 'I understand basic networking concepts (IP addresses, protocols)' },
      { id: 'wiscar_skill_3', text: 'I can troubleshoot computer problems systematically' },
      { id: 'wiscar_skill_4', text: 'I have experience with at least one programming or scripting language' },
    ]
  },
  {
    id: 'cognitive',
    name: 'Cognitive Readiness',
    icon: Brain,
    color: 'bg-purple-500',
    description: 'Mental capacity for analytical thinking and learning complex concepts',
    questions: [
      { id: 'wiscar_cognitive_1', text: 'I can quickly identify patterns in complex data' },
      { id: 'wiscar_cognitive_2', text: 'I excel at breaking down complex problems into smaller parts' },
      { id: 'wiscar_cognitive_3', text: 'I can maintain focus during detailed, repetitive tasks' },
      { id: 'wiscar_cognitive_4', text: 'I learn new technical concepts relatively quickly' },
    ]
  },
  {
    id: 'ability',
    name: 'Ability to Learn',
    icon: TrendingUp,
    color: 'bg-green-500',
    description: 'Capacity for self-directed learning and adaptation to new technologies',
    questions: [
      { id: 'wiscar_ability_1', text: 'I actively seek feedback and use it to improve my performance' },
      { id: 'wiscar_ability_2', text: 'I believe my abilities can be developed through effort and learning' },
      { id: 'wiscar_ability_3', text: 'I enjoy learning new tools and technologies' },
      { id: 'wiscar_ability_4', text: 'I can learn effectively from online resources and documentation' },
    ]
  },
  {
    id: 'realWorld',
    name: 'Real-World Alignment',
    icon: Users,
    color: 'bg-indigo-500',
    description: 'Fit with day-to-day forensic work environment and responsibilities',
    questions: [
      { id: 'wiscar_realWorld_1', text: 'I work well under pressure and tight deadlines' },
      { id: 'wiscar_realWorld_2', text: 'I am comfortable with detailed documentation and reporting' },
      { id: 'wiscar_realWorld_3', text: 'I can maintain objectivity when dealing with sensitive content' },
      { id: 'wiscar_realWorld_4', text: 'I prefer work that has clear procedures and guidelines' },
    ]
  }
];

export function WiscarSection({ onNext, onPrevious }: WiscarSectionProps) {
  const { state, dispatch } = useAssessment();
  const [activeTab, setActiveTab] = useState(wiscarDimensions[0].id);
  
  const totalQuestions = wiscarDimensions.reduce((sum, dim) => sum + dim.questions.length, 0);
  const answeredQuestions = wiscarDimensions.reduce((sum, dim) => 
    sum + dim.questions.filter(q => state.responses[q.id] !== undefined).length, 0
  );
  const progress = (answeredQuestions / totalQuestions) * 100;
  
  const handleResponse = (questionId: string, value: number) => {
    dispatch({
      type: 'SET_RESPONSE',
      key: questionId,
      value: value
    });
  };
  
  const canProceed = answeredQuestions === totalQuestions;
  
  const getDimensionProgress = (dimension: WiscarDimension) => {
    const answered = dimension.questions.filter(q => state.responses[q.id] !== undefined).length;
    return (answered / dimension.questions.length) * 100;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-6 py-2">
          Section 4 of 6
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Target className="w-8 h-8 text-primary" />
          WISCAR Framework Analysis
        </h1>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Evaluate your whole-person readiness using the WISCAR framework: 
          Will, Interest, Skill, Cognitive, Ability, and Real-World Fit
        </p>
      </div>

      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{answeredQuestions} of {totalQuestions} questions answered</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* WISCAR Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
          {wiscarDimensions.map((dimension) => {
            const dimensionProgress = getDimensionProgress(dimension);
            const Icon = dimension.icon;
            return (
              <TabsTrigger 
                key={dimension.id} 
                value={dimension.id}
                className="flex flex-col gap-2 p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{dimension.name}</span>
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all ${dimensionProgress === 100 ? 'bg-success' : 'bg-current'}`}
                    style={{ width: `${dimensionProgress}%` }}
                  />
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {wiscarDimensions.map((dimension) => {
          const Icon = dimension.icon;
          return (
            <TabsContent key={dimension.id} value={dimension.id} className="space-y-6">
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${dimension.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {dimension.name}
                  </CardTitle>
                  <p className="text-muted-foreground">{dimension.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {dimension.questions.map((question, index) => (
                    <div key={question.id} className="space-y-4 p-4 rounded-lg border">
                      <h3 className="font-medium">
                        {index + 1}. {question.text}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Strongly Disagree</span>
                          <span>Strongly Agree</span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <Button
                              key={value}
                              variant={state.responses[question.id] === value ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleResponse(question.id, value)}
                              className="flex-1"
                            >
                              {value}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        {wiscarDimensions.map((dimension, index) => (
          <Button
            key={dimension.id}
            variant={activeTab === dimension.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(dimension.id)}
            className="flex items-center gap-2"
          >
            <dimension.icon className="w-4 h-4" />
            {dimension.name}
            {getDimensionProgress(dimension) === 100 && (
              <div className="w-2 h-2 rounded-full bg-success" />
            )}
          </Button>
        ))}
      </div>

      {/* Section Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4" />
          Previous Section
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {canProceed ? "All dimensions completed!" : `${answeredQuestions}/${totalQuestions} questions answered`}
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