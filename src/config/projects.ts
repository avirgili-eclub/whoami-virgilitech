export type ProjectStatus = 'active' | 'beta' | 'wip' | 'paused';

export interface Project {
  icon: string;
  title: string;
  titleEN: string;
  tagline: string;
  taglineEN: string;
  status: ProjectStatus;
  stack: string[];
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    icon: '💰',
    title: 'UCash AI',
    titleEN: 'UCash AI',
    tagline: 'Finanzas personales con IA y privacidad total',
    taglineEN: 'AI-powered personal finance with full privacy',
    status: 'beta',
    stack: ['Flutter', 'AI', 'E2E Encryption'],
    href: 'https://ucashai.app/',
  },
  {
    icon: '🧠',
    title: 'Startup OS',
    titleEN: 'Startup OS',
    tagline: 'Gestión de células de agentes IA para startups',
    taglineEN: 'AI agent cell management system for startups',
    status: 'wip',
    stack: ['Python', 'AI Agents', 'Dashboard'],
  },
  {
    icon: '🤖',
    title: 'Alva Agentic',
    titleEN: 'Alva Agentic',
    tagline: 'Asistente IA personal para vida y trabajo',
    taglineEN: 'Personal AI companion for life & work',
    status: 'active',
    stack: ['OpenClaw', 'Docker', 'Privacy-first'],
  },
];
