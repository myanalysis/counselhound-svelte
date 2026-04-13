import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Lang = 'en' | 'es';

function createLangStore() {
  const initial: Lang =
    browser
      ? ((localStorage.getItem('ch_lang') as Lang) || 'en')
      : 'en';
  const { subscribe, set } = writable<Lang>(initial);
  return {
    subscribe,
    set(lang: Lang) {
      if (browser) localStorage.setItem('ch_lang', lang);
      set(lang);
    },
  };
}

export const lang = createLangStore();

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_contact: 'Contact Us',
    nav_practice: 'Practice Areas',
    nav_blog: 'Legal News & Blogs',
    nav_free_consultation: 'Free Consultation',
    nav_no_fees: 'No Fees Until We Win',
    nav_menu: 'Menu',

    // Hero
    hero_badge: 'No Fees Until We Win',
    hero_h1_top: 'Serious Results',
    hero_h1_bot: 'For Serious\nInjuries.',
    hero_sub: "Connecting injured victims with the nation's top-tier legal professionals. Free consultation. No fees unless we win.",
    hero_cta: 'Request a Free Consultation',

    // ResultsTicker — amounts are numbers, labels are translated
    ticker_label_prefix: '',

    // Founder
    founder_h2: 'A Message From our Founder, Richard Frankowski',
    founder_p1: 'Richard has practiced law around the United States for over thirty-five years. He has worked with amazing lawyers throughout his career who consistently perform at the highest level. Through his extensive network of highly-qualified counsel, Richard became passionate about connecting people to lawyers in the practice area of their need.',
    founder_p2: "We don't all have a best friend that is a lawyer to make a recommendation for us but now, you do. Richard created Counsel Hound to help you find your lawyer.",
    founder_cta: 'About Us',
    founder_video_soon: 'Video coming soon',
    founder_close: 'Close',

    // PracticeAreas
    pa_h2: 'Where we Fight For You',
    pa_cta_card: 'Get Free Help',

    // Process
    process_label: 'How It Works',
    process_h2: 'Our 3 Step Process',
    process_steps: [
      { title: 'Fill Out Our Form',         desc: 'Quickly share the details of your legal issue. It only takes a minute to get started.' },
      { title: 'Get A Free Consultation',   desc: 'Talk to a lawyer at no cost. No pressure, just answers.' },
      { title: 'Speak With Our Legal Team', desc: 'Work with an experienced attorney who has a proven track record in your practice area.' },
    ],
    process_cta: 'Start Your Free Evaluation',

    // WhyUs
    whyus_label: 'Why Choose Us',
    whyus_h2: 'Why Counsel Hound?',
    whyus_body: "Finding the right lawyer shouldn't be stressful. With over 35 years of legal experience, we've connected hundreds of clients with top-tier legal professionals — resulting in billions recovered. We take the guesswork out of your search by matching you with trusted, proven attorneys best suited to your case.",
    whyus_stats: [
      { value: '35+',   label: 'Years Experience', desc: 'Unmatched insight, strategy, and resilience built over three decades of practice.' },
      { value: '100s',  label: 'of Happy Clients',  desc: 'Hundreds of people have trusted us with their most important legal matters.' },
      { value: '$3B+',  label: 'Recovered',          desc: 'Billions secured in settlements and verdicts across our attorney network.' },
      { value: '50',    label: 'States Covered',     desc: 'We connect you with proven attorneys in all 50 states, no matter where you are.' },
    ],

    // Achievements
    ach_label: 'Recognition',
    ach_h2: 'Our Achievements',

    // Testimonials
    test_label: 'Testimonials',
    test_h2: 'What Our Clients Say',

    // FAQ
    faq_h2_top: 'Frequently Asked',
    faq_h2_gold: 'Questions',

    // AI Section
    ai_label: 'AI-Assisted Legal Guidance',
    ai_h2: 'Chat With Our AI Legal Assistant',
    ai_p1: 'Not sure if you have a case? Our AI assistant is available 24/7 to help you understand your legal options — no forms, no waiting, no judgment.',
    ai_p2: "Describe your situation in plain English and get immediate, confidential guidance. When you're ready, we'll connect you with the right attorney.",
    ai_bot_name: 'Counsel Hound AI',
    ai_bot_status: 'Available 24/7',
    ai_bot_online: 'Online',
    ai_bot_greeting: '"Hi — have you or a loved one been injured or wronged? Tell me what happened and I\'ll help you understand your options."',
    ai_cta: 'Start the Conversation',
    ai_disclaimer: 'Free — Confidential — No obligation',

    // Contact Section
    contact_label: 'Get In Touch',
    contact_h2: 'Got Questions?',
    contact_body: 'Whether you\'re seeking advice or ready to be connected with a qualified attorney, our team is ready to help. All inquiries are kept strictly confidential.',
    contact_phone_label: 'Phone',
    contact_text_label: 'Text',
    contact_email_label: 'Email',
    contact_locations_label: 'Our Locations',
    contact_map_our_location: 'Our Location',
    contact_map_open: 'Open in Maps',
    contact_map_osm: 'Map data © OpenStreetMap contributors',
    form_name: 'Full Name',
    form_email: 'Email',
    form_phone: 'Phone',
    form_case_type: 'Case Type',
    form_case_placeholder: 'Select…',
    form_message: 'Message',
    form_message_placeholder: 'Briefly describe your situation…',
    form_submit: 'Send Message',
    form_submitting: 'Sending…',
    form_confidential: 'Your information is always kept confidential.',
    form_success_h: 'Message Sent',
    form_success_p: "We'll respond within one business day. Check your inbox for a confirmation.",
    form_error_default: 'Something went wrong.',

    // Footer
    footer_tagline: 'Connecting people with trusted legal professionals — free of charge. No fees until we win.',
    footer_follow: 'Follow Us',
    footer_quick_links: 'Quick Links',
    footer_practice_areas: 'Practice Areas',
    footer_locations: 'Locations',
    footer_copyright: 'All Rights Reserved.',
    footer_disclaimer: 'No attorney-client relationship is formed by use of this website.',

    // Chat bubble
    chat_aria_label: 'Chat with us',
    chat_header_sub: 'Legal Assistant',
    chat_online: 'Online',
    chat_greeting: "Hi, I'm the Counsel Hound assistant. Have you or a loved one been injured or wronged? Tell me what happened and I'll help you understand your options.",
    chat_placeholder: 'Type your question…',
    chat_send: 'Send',
    chat_call_cta: 'Or call +1-855-804-6863 — Free Consultation',
    chat_error: 'Sorry, something went wrong. Please call us at +1-855-804-6863.',
  },

  es: {
    // Nav
    nav_home: 'Inicio',
    nav_about: 'Quiénes Somos',
    nav_contact: 'Contáctenos',
    nav_practice: 'Áreas de Práctica',
    nav_blog: 'Noticias y Blog Legal',
    nav_free_consultation: 'Consulta Gratuita',
    nav_no_fees: 'Sin Honorarios Hasta Ganar',
    nav_menu: 'Menú',

    // Hero
    hero_badge: 'Sin Honorarios Hasta Ganar',
    hero_h1_top: 'Resultados Serios',
    hero_h1_bot: 'Para Lesiones\nSerias.',
    hero_sub: 'Conectamos a víctimas lesionadas con los mejores profesionales legales del país. Consulta gratuita. Sin honorarios a menos que ganemos.',
    hero_cta: 'Solicitar una Consulta Gratuita',

    // ResultsTicker
    ticker_label_prefix: '',

    // Founder
    founder_h2: 'Un Mensaje de Nuestro Fundador, Richard Frankowski',
    founder_p1: 'Richard ha ejercido la abogacía en todo Estados Unidos por más de treinta y cinco años. A lo largo de su carrera ha trabajado con abogados extraordinarios que se desempeñan consistentemente al más alto nivel. A través de su amplia red de asesores altamente calificados, Richard se apasionó por conectar a las personas con los abogados adecuados para sus necesidades.',
    founder_p2: 'No todos tenemos un amigo abogado que nos haga una recomendación, pero ahora tú sí. Richard creó Counsel Hound para ayudarte a encontrar a tu abogado.',
    founder_cta: 'Quiénes Somos',
    founder_video_soon: 'Video próximamente',
    founder_close: 'Cerrar',

    // PracticeAreas
    pa_h2: 'Dónde Luchamos por Ti',
    pa_cta_card: 'Obtén Ayuda Gratis',

    // Process
    process_label: 'Cómo Funciona',
    process_h2: 'Nuestro Proceso en 3 Pasos',
    process_steps: [
      { title: 'Completa Nuestro Formulario',   desc: 'Comparte rápidamente los detalles de tu caso legal. Solo toma un minuto comenzar.' },
      { title: 'Recibe una Consulta Gratuita',  desc: 'Habla con un abogado sin costo. Sin presión, solo respuestas.' },
      { title: 'Habla con Nuestro Equipo Legal', desc: 'Trabaja con un abogado experimentado con historial probado en tu área de práctica.' },
    ],
    process_cta: 'Comenzar tu Evaluación Gratuita',

    // WhyUs
    whyus_label: 'Por Qué Elegirnos',
    whyus_h2: '¿Por Qué Counsel Hound?',
    whyus_body: 'Encontrar al abogado correcto no debería ser estresante. Con más de 35 años de experiencia legal, hemos conectado a cientos de clientes con profesionales legales de primer nivel — logrando la recuperación de miles de millones. Eliminamos las conjeturas de tu búsqueda conectándote con abogados de confianza y probados, los más adecuados para tu caso.',
    whyus_stats: [
      { value: '35+',  label: 'Años de Experiencia', desc: 'Perspicacia, estrategia y resiliencia incomparables forjadas en más de tres décadas de práctica.' },
      { value: '100s', label: 'Clientes Satisfechos', desc: 'Cientos de personas nos han confiado sus asuntos legales más importantes.' },
      { value: '$3B+', label: 'Recuperados',           desc: 'Miles de millones asegurados en acuerdos y veredictos a través de nuestra red de abogados.' },
      { value: '50',   label: 'Estados Cubiertos',     desc: 'Te conectamos con abogados probados en los 50 estados, sin importar dónde estés.' },
    ],

    // Achievements
    ach_label: 'Reconocimientos',
    ach_h2: 'Nuestros Logros',

    // Testimonials
    test_label: 'Testimonios',
    test_h2: 'Lo Que Dicen Nuestros Clientes',

    // FAQ
    faq_h2_top: 'Preguntas',
    faq_h2_gold: 'Frecuentes',

    // AI Section
    ai_label: 'Orientación Legal con IA',
    ai_h2: 'Chatea con Nuestro Asistente Legal con IA',
    ai_p1: '¿No sabes si tienes un caso? Nuestro asistente de IA está disponible las 24 horas para ayudarte a entender tus opciones legales — sin formularios, sin esperas, sin juicios.',
    ai_p2: 'Describe tu situación en español y recibe orientación inmediata y confidencial. Cuando estés listo, te conectaremos con el abogado adecuado.',
    ai_bot_name: 'Counsel Hound IA',
    ai_bot_status: 'Disponible 24/7',
    ai_bot_online: 'En línea',
    ai_bot_greeting: '"Hola — ¿usted o un ser querido ha sufrido una lesión o una injusticia? Cuénteme lo que pasó y le ayudaré a entender sus opciones."',
    ai_cta: 'Comenzar la Conversación',
    ai_disclaimer: 'Gratis — Confidencial — Sin obligación',

    // Contact Section
    contact_label: 'Contáctenos',
    contact_h2: '¿Tiene Preguntas?',
    contact_body: 'Ya sea que busque asesoría o esté listo para conectarse con un abogado calificado, nuestro equipo está listo para ayudarle. Todas las consultas se mantienen en estricta confidencialidad.',
    contact_phone_label: 'Teléfono',
    contact_text_label: 'Texto',
    contact_email_label: 'Correo',
    contact_locations_label: 'Nuestras Oficinas',
    contact_map_our_location: 'Nuestra Ubicación',
    contact_map_open: 'Abrir en Mapas',
    contact_map_osm: 'Datos del mapa © Contribuidores de OpenStreetMap',
    form_name: 'Nombre Completo',
    form_email: 'Correo Electrónico',
    form_phone: 'Teléfono',
    form_case_type: 'Tipo de Caso',
    form_case_placeholder: 'Seleccionar…',
    form_message: 'Mensaje',
    form_message_placeholder: 'Describa brevemente su situación…',
    form_submit: 'Enviar Mensaje',
    form_submitting: 'Enviando…',
    form_confidential: 'Su información siempre se mantiene confidencial.',
    form_success_h: 'Mensaje Enviado',
    form_success_p: 'Responderemos dentro de un día hábil. Revise su correo para una confirmación.',
    form_error_default: 'Algo salió mal.',

    // Footer
    footer_tagline: 'Conectamos a personas con profesionales legales de confianza — sin costo. Sin honorarios hasta que ganemos.',
    footer_follow: 'Síguenos',
    footer_quick_links: 'Enlaces Rápidos',
    footer_practice_areas: 'Áreas de Práctica',
    footer_locations: 'Ubicaciones',
    footer_copyright: 'Todos los Derechos Reservados.',
    footer_disclaimer: 'El uso de este sitio web no crea una relación abogado-cliente.',

    // Chat bubble
    chat_aria_label: 'Chatear con nosotros',
    chat_header_sub: 'Asistente Legal',
    chat_online: 'En línea',
    chat_greeting: 'Hola, soy el asistente de Counsel Hound. ¿Usted o un ser querido ha sufrido una lesión o una injusticia? Cuénteme lo que pasó y le ayudaré a entender sus opciones.',
    chat_placeholder: 'Escriba su pregunta…',
    chat_send: 'Enviar',
    chat_call_cta: 'O llame al +1-855-804-6863 — Consulta Gratuita',
    chat_error: 'Lo sentimos, algo salió mal. Por favor llámenos al +1-855-804-6863.',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type Translations = typeof translations.en;

export const t = derived(lang, ($lang) => translations[$lang] as Translations);
