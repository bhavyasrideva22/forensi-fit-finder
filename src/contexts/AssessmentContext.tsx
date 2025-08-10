import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface AssessmentState {
  currentSection: number;
  totalSections: number;
  responses: Record<string, any>;
  scores: {
    psychometric: number;
    technical: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
    overall: number;
  };
  isComplete: boolean;
  recommendation: 'YES' | 'MAYBE' | 'NO' | null;
}

type AssessmentAction = 
  | { type: 'SET_RESPONSE'; key: string; value: any }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREV_SECTION' }
  | { type: 'SET_SECTION'; section: number }
  | { type: 'CALCULATE_SCORES' }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  currentSection: 0,
  totalSections: 6,
  responses: {},
  scores: {
    psychometric: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0,
    },
    overall: 0,
  },
  isComplete: false,
  recommendation: null,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_RESPONSE':
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.key]: action.value,
        },
      };
    case 'NEXT_SECTION':
      return {
        ...state,
        currentSection: Math.min(state.currentSection + 1, state.totalSections - 1),
      };
    case 'PREV_SECTION':
      return {
        ...state,
        currentSection: Math.max(state.currentSection - 1, 0),
      };
    case 'SET_SECTION':
      return {
        ...state,
        currentSection: action.section,
      };
    case 'CALCULATE_SCORES':
      // Simplified scoring logic - in a real app, this would be more complex
      const psychometric = calculatePsychometricScore(state.responses);
      const technical = calculateTechnicalScore(state.responses);
      const wiscar = calculateWiscarScores(state.responses);
      const overall = (psychometric * 0.3 + technical * 0.3 + 
        (wiscar.will + wiscar.interest + wiscar.skill + wiscar.cognitive + wiscar.ability + wiscar.realWorld) / 6 * 0.4);
      
      const recommendation = overall >= 75 ? 'YES' : overall >= 50 ? 'MAYBE' : 'NO';
      
      return {
        ...state,
        scores: {
          psychometric,
          technical,
          wiscar,
          overall,
        },
        recommendation,
      };
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        isComplete: true,
      };
    case 'RESET_ASSESSMENT':
      return initialState;
    default:
      return state;
  }
}

// Simplified scoring functions
function calculatePsychometricScore(responses: Record<string, any>): number {
  const psychometricKeys = Object.keys(responses).filter(key => key.startsWith('psychometric_'));
  if (psychometricKeys.length === 0) return 0;
  
  const sum = psychometricKeys.reduce((acc, key) => acc + (responses[key] || 0), 0);
  return Math.min(100, (sum / psychometricKeys.length) * 20); // Assuming 1-5 scale
}

function calculateTechnicalScore(responses: Record<string, any>): number {
  const technicalKeys = Object.keys(responses).filter(key => key.startsWith('technical_'));
  if (technicalKeys.length === 0) return 0;
  
  const sum = technicalKeys.reduce((acc, key) => acc + (responses[key] || 0), 0);
  return Math.min(100, (sum / technicalKeys.length) * 20); // Assuming 1-5 scale
}

function calculateWiscarScores(responses: Record<string, any>): AssessmentState['scores']['wiscar'] {
  const categories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: any = {};
  
  categories.forEach(category => {
    const categoryKeys = Object.keys(responses).filter(key => key.startsWith(`wiscar_${category}_`));
    if (categoryKeys.length === 0) {
      scores[category] = 0;
    } else {
      const sum = categoryKeys.reduce((acc, key) => acc + (responses[key] || 0), 0);
      scores[category] = Math.min(100, (sum / categoryKeys.length) * 20);
    }
  });
  
  return scores;
}

const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
} | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}