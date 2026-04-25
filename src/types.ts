export interface ListeningContent {
  longDocument: {
    transcript: string;
    questions: Question[];
    answerKey: AnswerKey[];
  };
  shortDocuments: {
    transcript: string;
    questions: Question[];
    answerKey: AnswerKey[];
  }[];
}

export interface ReadingContent {
  text: string;
  questions: Question[];
  answerKey: AnswerKey[];
}

export interface WritingContent {
  dossier: { title: string; text: string }[];
  problematique: string;
  synthesisPrompt: string;
  essayPrompt: string;
}

export interface SpeakingContent {
  dossier: { title: string; text: string }[];
  instructions: string;
  examinerQuestions: string[];
}

export interface Question {
  id: string;
  type: 'mcq' | 'tf' | 'open' | 'table';
  text: string;
  points: number;
  options?: string[]; // for mcq
  hint?: string;
}

export interface AnswerKey {
  questionId: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  justificationRequired: boolean;
  points: number;
}

export interface ExamGeneratedContent {
  listening: ListeningContent;
  reading: ReadingContent;
  writing: WritingContent;
  speaking: SpeakingContent;
}

export interface AudioKeys {
  listeningLong?: string;
  listeningShort?: string[];
}

export interface MarkingResult {
  score: number;
  maxScore: number;
  feedback: string;
  errorTags?: ErrorTag[];
}

export interface ErrorTag {
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'register' | 'structure';
  original: string;
  correction: string;
  explanation: string;
}

export interface WritingScores {
  synthese: {
    length: number;
    objectivity: number;
    taskCompletion: number;
    coherence: number;
    lexique: number;
    morphosyntaxe: number;
    total: number;
  };
  essai: {
    taskCompletion: number;
    coherence: number;
    sociolinguistic: number;
    lexique: number;
    morphosyntaxe: number;
    total: number;
  };
}

export interface SpeakingScores {
  expose: number;
  entretien: number;
  lexique: number;
  morphosyntaxe: number;
  phonologie: number;
  total: number;
}
