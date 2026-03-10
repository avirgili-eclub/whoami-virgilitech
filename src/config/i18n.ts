export type Lang = 'es' | 'en';

export const COPY = {
  es: {
    name: 'Alejandro Virgili',
    handle: '@avirgili',
    tagline: 'Senior Developer & Builder',
    available: 'Disponible',
    bio: 'Ingeniero de software con +10 años construyendo soluciones backend robustas. Especializado en Java, Spring Boot y arquitecturas de microservicios. Apasionado por integrar IA en productos para automatizar flujos de trabajo y generar impacto real.',
    roles: ['🏗 Product Builder', '💻 Dev Senior', '🤖 AI Integration'],
    nav: { about: 'Acerca', projects: 'Proyectos', blog: 'Blog', contact: 'Contacto' },
    cta: { cv: 'Ver CV →', soon: 'Próximamente', read: 'Leer →', connect: 'Conectar →', view: 'Ver →' },
    sections: {
      explore: 'EXPLORAR',
      liveActivity: 'ACTIVIDAD EN VIVO',
      githubLive: 'GitHub en vivo',
      buildingNow: 'CONSTRUYENDO AHORA',
    },
    links: {
      blog:     { title: 'Blog',     desc: 'Ideas, tech y aprendizajes' },
      linkedin: { title: 'LinkedIn', desc: 'Red profesional' },
      github:   { title: 'GitHub',   desc: 'Código y proyectos abiertos' },
      youtube:  { title: 'YouTube',  desc: 'Canal de video — en preparación' },
    },
    terminal: {
      whoami: '→  Alejandro Virgili — Senior Dev & Product Builder',
      loading: 'Cargando último commit...',
    },
    feed: {
      empty: 'No hay actividad reciente',
      cols: { commit: 'commit', type: 'tipo', message: 'mensaje', repo: 'repo', time: 'hace' },
    },
    footer: 'Construido con ♥ por @avirgili',
  },
  en: {
    name: 'Alejandro Virgili',
    handle: '@avirgili',
    tagline: 'Senior Developer & Builder',
    available: 'Available',
    bio: 'Software engineer with 10+ years building robust backend solutions. Specialized in Java, Spring Boot and microservices architecture. Passionate about integrating AI into products to automate workflows and deliver real impact.',
    roles: ['🏗 Product Builder', '💻 Senior Dev', '🤖 AI Integration'],
    nav: { about: 'About', projects: 'Projects', blog: 'Blog', contact: 'Contact' },
    cta: { cv: 'View CV →', soon: 'Coming soon', read: 'Read →', connect: 'Connect →', view: 'View →' },
    sections: {
      explore: 'EXPLORE',
      liveActivity: 'LIVE ACTIVITY',
      githubLive: 'GitHub live',
      buildingNow: 'BUILDING NOW',
    },
    links: {
      blog:     { title: 'Blog',     desc: 'Ideas, tech & learnings' },
      linkedin: { title: 'LinkedIn', desc: 'Professional network' },
      github:   { title: 'GitHub',   desc: 'Code and open projects' },
      youtube:  { title: 'YouTube',  desc: 'Video channel — coming soon' },
    },
    terminal: {
      whoami: '→  Alejandro Virgili — Senior Dev & Product Builder',
      loading: 'Loading latest commit...',
    },
    feed: {
      empty: 'No recent activity',
      cols: { commit: 'commit', type: 'type', message: 'message', repo: 'repo', time: 'ago' },
    },
    footer: 'Built with ♥ by @avirgili',
  },
} as const;

export type CopyType = typeof COPY.es;
