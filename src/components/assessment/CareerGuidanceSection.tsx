import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Shield, 
  Search, 
  Eye,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Award,
  ExternalLink
} from "lucide-react";
import { useAssessment } from "@/contexts/AssessmentContext";

interface CareerGuidanceSectionProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function CareerGuidanceSection({ onNext, onPrevious }: CareerGuidanceSectionProps) {
  const { state } = useAssessment();

  const careerRoles = [
    {
      title: "Digital Forensics Analyst",
      icon: Shield,
      description: "Extract and analyze digital evidence from computers, mobile devices, and networks",
      requirements: ["Bachelor's degree in Computer Science or related field", "Knowledge of forensic tools (Autopsy, FTK)", "Understanding of file systems and operating systems"],
      salary: "$65,000 - $120,000",
      growth: "High demand, 32% projected growth"
    },
    {
      title: "Cybercrime Investigator", 
      icon: Search,
      description: "Work with law enforcement on digital crime cases and investigations",
      requirements: ["Criminal justice or cybersecurity background", "Law enforcement experience preferred", "Digital forensics certification"],
      salary: "$70,000 - $130,000",
      growth: "Steady growth with increasing cybercrime"
    },
    {
      title: "Incident Response Specialist",
      icon: UserCheck,
      description: "First responder to cyber incidents, preserving and analyzing evidence",
      requirements: ["Cybersecurity experience", "Knowledge of incident response procedures", "Strong communication skills"],
      salary: "$75,000 - $140,000",
      growth: "Very high demand, critical role"
    },
    {
      title: "Malware Analyst",
      icon: Eye,
      description: "Investigate malicious code and understand attack methodologies",
      requirements: ["Reverse engineering skills", "Programming knowledge", "Malware analysis tools expertise"],
      salary: "$80,000 - $150,000",
      growth: "Specialized, high-value role"
    }
  ];

  const skillAreas = [
    {
      area: "Operating Systems",
      required: "Intermediate",
      yourLevel: state.scores.technical > 70 ? "Good" : state.scores.technical > 40 ? "Basic" : "Needs Work",
      gap: state.scores.technical > 70 ? "Low" : state.scores.technical > 40 ? "Medium" : "High",
      action: state.scores.technical > 70 ? "Advanced OS internals" : "Take OS fundamentals course"
    },
    {
      area: "Networking", 
      required: "Basic",
      yourLevel: state.scores.technical > 60 ? "Good" : state.scores.technical > 30 ? "Basic" : "Needs Work",
      gap: state.scores.technical > 60 ? "Low" : state.scores.technical > 30 ? "Medium" : "High",
      action: state.scores.technical > 60 ? "Network security specialization" : "Start with Network+ certification"
    },
    {
      area: "Forensics Tools",
      required: "Beginner",
      yourLevel: "None",
      gap: "High",
      action: "Try TryHackMe forensics rooms"
    },
    {
      area: "Legal/Chain of Custody",
      required: "Intermediate", 
      yourLevel: state.scores.psychometric > 60 ? "Basic" : "Low",
      gap: state.scores.psychometric > 60 ? "Medium" : "High",
      action: "Watch case study videos and take legal courses"
    }
  ];

  const learningPath = [
    {
      level: "Beginner",
      duration: "3-6 months",
      focus: "Foundations",
      courses: [
        "Computer Systems Fundamentals",
        "Introduction to Cybersecurity", 
        "Basic Networking Concepts",
        "Command Line Basics"
      ]
    },
    {
      level: "Intermediate", 
      duration: "6-12 months",
      focus: "Core Skills",
      courses: [
        "Digital Forensics Fundamentals",
        "Operating Systems Internals",
        "Forensic Tools Training (Autopsy, FTK)",
        "Network Forensics"
      ]
    },
    {
      level: "Advanced",
      duration: "12+ months", 
      focus: "Specialization",
      courses: [
        "Malware Analysis",
        "Mobile Device Forensics",
        "Cloud Forensics",
        "Expert Witness Training"
      ]
    }
  ];

  const certifications = [
    { name: "CompTIA Security+", level: "Entry", timeframe: "3-6 months", cost: "$350" },
    { name: "GCFA (GIAC Certified Forensic Analyst)", level: "Professional", timeframe: "6-12 months", cost: "$7,000+" },
    { name: "EnCE (EnCase Certified Examiner)", level: "Professional", timeframe: "6-9 months", cost: "$4,000+" },
    { name: "CCE (Certified Computer Examiner)", level: "Professional", timeframe: "12+ months", cost: "$600+" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-6 py-2">
          Section 6 of 6
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" />
          Career & Learning Guidance
        </h1>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          From curious to certified - your personalized pathway to digital forensics success
        </p>
      </div>

      <Tabs defaultValue="careers" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="careers" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Career Roles
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Skill Mapping
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Learning Path
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Certifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="careers" className="space-y-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                Top Career Roles Unlocked
              </CardTitle>
              <p className="text-muted-foreground">
                Discover the career opportunities available in digital forensics
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {careerRoles.map((role, index) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <role.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{role.title}</h3>
                            <p className="text-sm text-success font-medium">{role.salary}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {role.growth}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Requirements:</h4>
                        <ul className="space-y-1">
                          {role.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                Skill Mapping Analysis
              </CardTitle>
              <p className="text-muted-foreground">
                See where you stand and what you need to develop
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillAreas.map((skill, index) => (
                  <div key={index} className="p-4 rounded-lg border space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{skill.area}</h3>
                        <p className="text-sm text-muted-foreground">
                          Required Level: {skill.required}
                        </p>
                      </div>
                      <Badge 
                        variant={skill.gap === 'Low' ? 'default' : skill.gap === 'Medium' ? 'secondary' : 'outline'}
                        className={
                          skill.gap === 'Low' ? 'bg-success text-success-foreground' :
                          skill.gap === 'Medium' ? 'bg-warning text-warning-foreground' :
                          'bg-destructive text-destructive-foreground'
                        }
                      >
                        {skill.gap} Gap
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Your Level: {skill.yourLevel}</span>
                        <span>Target: {skill.required}</span>
                      </div>
                      <Progress 
                        value={
                          skill.yourLevel === 'Good' ? 80 :
                          skill.yourLevel === 'Basic' ? 40 : 
                          skill.yourLevel === 'Low' ? 20 : 0
                        } 
                        className="h-2" 
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="font-medium">Action:</span>
                      <span className="text-muted-foreground">{skill.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Ideal Learning Path
              </CardTitle>
              <p className="text-muted-foreground">
                Your structured journey from beginner to job-ready professional
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {learningPath.map((phase, index) => (
                  <div key={index} className="relative">
                    {index < learningPath.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-full bg-border" />
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <Card className="flex-grow shadow-card">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{phase.level}</CardTitle>
                              <p className="text-muted-foreground">{phase.focus}</p>
                            </div>
                            <Badge variant="outline">{phase.duration}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-2">
                            {phase.courses.map((course, courseIndex) => (
                              <div key={courseIndex} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-success" />
                                {course}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                Recommended Certifications
              </CardTitle>
              <p className="text-muted-foreground">
                Industry-recognized credentials to validate your expertise
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <Badge 
                            variant={cert.level === 'Entry' ? 'secondary' : 'default'}
                            className="mt-1"
                          >
                            {cert.level}
                          </Badge>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium text-success">{cert.cost}</p>
                          <p className="text-muted-foreground">{cert.timeframe}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4" />
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alternative Paths */}
      {state.recommendation === 'NO' && (
        <Card className="shadow-elevated border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-warning">
              <Users className="w-6 h-6" />
              Alternative Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Based on your assessment, these related fields might be a better fit:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Cybersecurity Analyst",
                "Risk Management Specialist", 
                "IT Audit Professional",
                "Data Analysis Specialist",
                "Security Compliance Officer",
                "Network Security Engineer"
              ].map((path, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-background">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">{path}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4" />
          Previous Section
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Ready to see your complete assessment results
          </p>
        </div>
        
        <Button variant="hero" onClick={onNext}>
          View Final Results
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}