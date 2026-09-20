// English — global site chrome (nav, hero, footer, homepage sections, modals, chat). Practice-area
// content lives in practice-areas.ts; page-specific content lives in pages/*.ts.

export const home = {
  meta: {
    title: 'Counsel Hound | Serious Results for Serious Injuries',
    description: 'Counsel Hound connects you with trusted, vetted attorneys for personal injury, abuse litigation, consumer fraud, defective products, and more — free of charge.',
    ogDescription: 'Free attorney matching. No fees until we win. Call +1-855-804-6863.',
    keywords: 'personal injury attorney, find a lawyer, free legal consultation, attorney matching service, injury lawyer, accident attorney, defective products lawyer, abuse litigation, medical malpractice attorney, toxic torts, whistleblower attorney, consumer fraud lawyer, no win no fee, contingency fee attorney',
  },

  nav: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact Us',
    practiceAreas: 'Practice Areas',
    blog: 'Blog',
    videos: 'Videos',
    faq: 'FAQ',
    freeConsultation: 'Free Consultation',
    noFees: 'No Fees Until We Win',
    menu: 'Menu',
    textUs: 'Text Us',
    legalAdvocates: 'Legal Advocates',
    investmentFraud: {
      label: 'Investment Fraud',
      subs: ['Securities Arbitration', 'Broker Misconduct', 'Annuity Fraud'],
    },
  },

  hero: {
    badge: 'No Fees Until We Win',
    h1Top: 'Serious Results',
    h1Bot: 'For Serious\nInjuries.',
    sub: "Connecting injured victims with the nation's top-tier legal professionals. Free consultation. No fees unless we win.",
    cta: 'Request a Free Consultation',
  },

  ticker: {
    // Fallback case-result labels shown when the D1 table has no published results yet.
    fallback: [
      { category: 'Georgia Opioid Settlement', description: 'Opioid Settlement', amount: 'Over $1B over the next 18 years' },
      { category: 'Opioid Abuse Litigation', description: 'Opioid Abuse Litigation', amount: '$728M for Alabama' },
      { category: 'Mississippi Opioid Settlement', description: 'Mississippi Opioid Settlement', amount: '$370 Million' },
      { category: 'Blue Cross Blue Shield Provider Settlement', description: 'BCBS Provider Settlement', amount: '$2.67B Settlement Fund' },
      { category: 'Consumer Fraud', description: 'Consumer Fraud Recovery', amount: '$5 Million' },
      { category: 'Defective Products', description: 'Defective Products Recovery', amount: '$3 Million' },
      { category: 'Medical Injury', description: 'Medical Injury Recovery', amount: '$1 Million' },
      { category: 'Personal Injury', description: 'Personal Injury Recovery', amount: '$3 Million' },
      { category: 'Abuse Litigation', description: 'Abuse Litigation Recovery', amount: '$1 Million' },
      { category: 'Personal Injury', description: 'Personal Injury Recovery', amount: '$4 Million' },
    ],
  },

  founder: {
    h2: 'A Message From our Founder, Richard Frankowski',
    p1: 'Richard has practiced law around the United States for over thirty-five years. He has worked with amazing lawyers throughout his career who consistently perform at the highest level. Through his extensive network of highly-qualified counsel, Richard became passionate about connecting people to lawyers in the practice area of their need.',
    p2: "We don't all have a best friend that is a lawyer to make a recommendation for us but now, you do. Richard created Counsel Hound to help you find your lawyer.",
    cta: 'About Us',
    videoSoon: 'Video coming soon',
    close: 'Close',
    viewAllVideos: 'View All Videos →',
  },

  practiceGrid: {
    h2: 'Where we Fight For You',
    ctaCard: 'Get Free Help',
  },

  process: {
    label: 'How It Works',
    h2: 'Our 3 Step Process',
    steps: [
      { title: 'Fill Out Our Form', desc: 'Quickly share the details of your legal issue. It only takes a minute to get started.' },
      { title: 'Get A Free Consultation', desc: 'Talk to a lawyer at no cost. No pressure, just answers.' },
      { title: 'Speak With Our Legal Team', desc: 'Work with an experienced attorney who has a proven track record in your practice area.' },
    ],
    cta: 'Start Your Free Evaluation',
  },

  whyUs: {
    label: 'Why Choose Us',
    h2: 'Why Counsel Hound?',
    body: "Finding the right lawyer shouldn't be stressful. With over 35 years of legal experience, we've connected hundreds of clients with top-tier legal professionals — resulting in billions recovered. We take the guesswork out of your search by matching you with trusted, proven attorneys best suited to your case.",
    stats: [
      { value: '35+', label: 'Years Experience', desc: 'Unmatched insight, strategy, and resilience built over three decades of practice.' },
      { value: '100s', label: 'of Happy Clients', desc: 'Hundreds of people have trusted us with their most important legal matters.' },
      { value: '$3B+', label: 'Recovered', desc: 'Billions secured in settlements and verdicts across our attorney network.' },
      { value: '50', label: 'States Covered', desc: 'We connect you with proven attorneys in all 50 states, no matter where you are.' },
    ],
  },

  achievements: {
    label: 'Recognition',
    h2: 'Our Achievements',
    badges: [
      { src: '/achievement-1.svg', title: 'Expertise.com', desc: 'Best Litigation Attorneys in Birmingham — 2022' },
      { src: '/achievement-2.svg', title: 'Avvo Rating 10.0 Superb', desc: 'Top Attorney — Investment Fraud' },
      { src: '/achievement-3.svg', title: 'AV Preeminent®', desc: 'Martindale-Hubbell — Peer Rated for Highest Level of Professional Excellence' },
      { src: '/achievement-4.svg', title: 'The National Trial Lawyers', desc: 'Top 100 Trial Lawyers' },
      { src: '/achievement-5.svg', title: 'Super Lawyers®', desc: 'Richard Frankowski — SuperLawyers.com' },
    ],
  },

  testimonials: {
    label: 'Testimonials',
    h2: 'What Our Clients Say',
    empty: 'Client reviews coming soon.',
  },

  faqTeaser: {
    h2Top: 'Frequently Asked',
    h2Gold: 'Questions',
    viewAll: 'View All FAQs →',
    items: [
      { q: 'Is there any cost to use Counsel Hound?', a: 'No. Our matching service is completely free. You only pay if you hire an attorney and they win your case — most work on contingency.' },
      { q: 'How quickly will I hear from a lawyer?', a: 'Most clients are contacted within 24 hours of submitting their information. In urgent cases, we prioritize same-day outreach.' },
      { q: 'What types of cases do you handle?', a: 'We cover a wide range of practice areas including personal injury, consumer fraud, defective products, toxic torts, abuse litigation, medical injury, and more.' },
      { q: 'Are the attorneys in your network vetted?', a: 'Yes. Every attorney in our network has been reviewed for experience, track record, and client satisfaction before being recommended.' },
      { q: "What if I already have a lawyer?", a: "We can still help. If you feel your current representation isn't the right fit, we can connect you with attorneys who may be better suited to your case." },
    ],
  },

  ai: {
    label: 'AI-Assisted Legal Guidance',
    h2: 'Chat With Our AI Legal Assistant',
    p1: 'Not sure if you have a case? Our AI assistant is available 24/7 to help you understand your legal options — no forms, no waiting, no judgment.',
    p2: "Describe your situation in plain English and get immediate, confidential guidance. When you're ready, we'll connect you with the right attorney.",
    botName: 'Counsel Hound AI',
    botStatus: 'Available 24/7',
    botOnline: 'Online',
    botGreeting: '"Hi — have you or a loved one been injured or wronged? Tell me what happened and I\'ll help you understand your options."',
    cta: 'Start the Conversation',
    disclaimer: 'Free — Confidential — No obligation',
  },

  locations: {
    eyebrow: 'Where To Find Us',
    h2Plain: 'Our',
    h2Gold: 'Locations',
    openInMaps: 'Open in Maps →',
  },

  videoPreview: {
    eyebrow: 'Watch & Learn',
    h2: 'From Our Team',
    viewAll: 'View All Videos →',
  },

  featuredVideo: {
    eyebrow: 'From Our Founder',
    h2: 'Why I Started Counsel Hound',
    viewAll: 'View All Videos →',
    play: 'Play video — Why I Started Counsel Hound',
  },

  blogPreview: {
    eyebrow: 'Legal Insights',
    h2: 'News & Blogs',
    viewAll: 'View All →',
    viewAllPosts: 'View All Posts',
    readMore: 'Read More →',
  },

  contact: {
    label: 'Get In Touch',
    h2: 'Got Questions?',
    body: "Whether you're seeking advice or ready to be connected with a qualified attorney, our team is ready to help. All inquiries are kept strictly confidential.",
    phoneLabel: 'Phone',
    textLabel: 'Text',
    emailLabel: 'Email',
    locationsLabel: 'Our Locations',
    getDirections: 'Get Directions →',
    mapOurLocation: 'Our Location',
    mapOpen: 'Open in Maps',
    mapOsm: 'Map data © OpenStreetMap contributors',
    caseTypes: [
      'Abuse Litigation', 'Personal Injury', 'Consumer Fraud', 'Defective Products',
      'Medical Injury', 'Toxic Torts', 'Whistleblower', 'Investment Fraud', 'Other',
    ],
    form: {
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      caseType: 'Case Type',
      casePlaceholder: 'Select…',
      message: 'Message',
      messagePlaceholder: 'Briefly describe your situation…',
      submit: 'Send Message',
      submitting: 'Sending…',
      confidential: 'Your information is always kept confidential.',
      successH: 'Message Sent',
      successP: "We'll respond within one business day. Check your inbox for a confirmation.",
      errorDefault: 'Something went wrong.',
    },
  },

  footer: {
    tagline: 'Connecting people with trusted legal professionals — free of charge. No fees until we win.',
    follow: 'Follow Us',
    quickLinks: 'Quick Links',
    practiceAreas: 'Practice Areas',
    locations: 'Locations',
    copyright: 'All Rights Reserved.',
    disclaimer: 'No attorney-client relationship is formed by use of this website.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    disclaimerLink: 'Disclaimer',
  },

  chat: {
    ariaLabel: 'Chat with us',
    headerSub: 'Legal Assistant',
    online: 'Online',
    greeting: "Hi, I'm the Counsel Hound assistant. Have you or a loved one been injured or wronged? Tell me what happened and I'll help you understand your options.",
    placeholder: 'Type your question…',
    send: 'Send',
    callCta: 'Or call +1-855-804-6863 — Free Consultation',
    error: 'Sorry, something went wrong. Please call us at +1-855-804-6863.',
  },

  consultationModal: {
    title: 'Free Case Evaluation',
    body: 'Our professionals will evaluate your case and recommend trusted lawyers in all 50 states. Free — no fees until we win.',
    close: 'Close',
  },

  postModal: {
    back: '← Back',
    freeConsultation: 'Free Consultation',
    close: 'Close',
  },

  scrollTop: {
    ariaLabel: 'Scroll to top',
  },

  blog: {
    metaTitle: 'Legal News & Blogs',
    metaDescription: 'Stay informed with the latest legal news, case updates, and insights from the Counsel Hound team.',
    eyebrow: 'Insights & Updates',
    h1: 'Legal News & Blogs',
    searchPlaceholder: 'Search posts…',
    search: 'Search',
    clear: 'Clear',
    all: 'All',
    noPosts: 'No posts yet.',
    resultsFor: 'results for',
    resultFor: 'result for',
    readMore: 'Read More →',
    pageOf: 'Page {p} of {total}',
    backToBlog: '← Back to Blog',
    freeConsultation: 'Free Consultation',
  },
};
