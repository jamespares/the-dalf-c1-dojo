import type { ExamGeneratedContent, AudioKeys } from '../../types';

export interface StaticPaper {
  slug: string;
  title: string;
  theme: string;
  content: ExamGeneratedContent;
  audioKeys: AudioKeys;
}
