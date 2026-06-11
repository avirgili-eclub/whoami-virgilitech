export type ProjectStatus = 'active' | 'beta' | 'wip' | 'hold' | 'paused';

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
    icon: '\u{1F4C5}',
    title: 'AgendateYA',
    titleEN: 'AgendateYA',
    tagline: 'SaaS de turnos con IA y voz (TTS), pagos integrados y backend Spring Boot + STT',
    taglineEN: 'Appointment SaaS with AI + voice (TTS), integrated payments, and Spring Boot + STT backend',
    status: 'active',
    stack: ['AI', 'Spring Boot', 'SaaS', 'Payments', 'TTS', 'STT'],
    href: 'https://agendateya.app/',
  },
  {
    icon: '\u{1F4B0}',
    title: 'UCash AI',
    titleEN: 'UCash AI',
    tagline: 'Finanzas personales con IA y privacidad total',
    taglineEN: 'AI-powered personal finance with full privacy',
    status: 'beta',
    stack: ['Flutter', 'AI', 'E2E Encryption', 'VectorDB', 'SQL', 'Java 21'],
    href: 'https://cashai-landing.pages.dev/',
  },
  {
    icon: '\u{1F9E0}',
    title: 'Startup OS',
    titleEN: 'Startup OS',
    tagline: 'Gestion de celulas de agentes IA para startups',
    taglineEN: 'AI agent cell management system for startups',
    status: 'hold',
    stack: ['Python', 'AI Agents', 'Dashboard'],
  },
  {
    icon: '\u{1F916}',
    title: 'Alva Agentic',
    titleEN: 'Alva Agentic',
    tagline: 'Asistente IA personal para vida y trabajo',
    taglineEN: 'Personal AI companion for life & work',
    status: 'active',
    stack: ['OpenClaw', 'Docker', 'Privacy-first'],
  },
];
