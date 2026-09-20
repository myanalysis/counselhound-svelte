export const consumerSafety = {
  meta: {
    title: 'Productos Peligrosos y Defectuosos | Counsel Hound',
    description:
      'Counsel Hound rastrea diariamente productos de consumo peligrosos y retirados del mercado. Datos en vivo de la CPSC, estadísticas de lesiones y ayuda legal gratuita para víctimas de productos defectuosos.',
    ogDescription:
      'Counsel Hound rastrea diariamente productos de consumo peligrosos y retirados del mercado. Ayuda legal gratuita para víctimas de lesiones.',
    twitterDescription:
      'Datos en vivo de retiros de la CPSC, base de datos de productos peligrosos y ayuda legal gratuita para víctimas de lesiones.',
    keywords:
      'productos defectuosos, retiro de productos, retiro CPSC, seguridad del consumidor, abogado de responsabilidad por productos, productos peligrosos, abogado de retiros, lesión por producto, demanda por producto defectuoso',
  },
  ticker: {
    label: 'ALERTAS DE RETIRO EN VIVO',
    loading: 'Cargando los datos de retiro más recientes de la CPSC...',
  },
  hero: {
    eyebrow: 'Abogados de Lesiones por Productos Defectuosos',
    h1Line1: 'Productos Peligrosos y',
    h1Line2: 'Defectuosos Que Han Dañado a Familias',
    body: 'Todos los días, millones de productos inseguros permanecen en hogares de todo Estados Unidos. Si usted o un ser querido ha sido lesionado por un producto retirado del mercado, defectuoso o peligroso, podría tener derecho a una compensación significativa. Counsel Hound lo conecta con abogados litigantes de comprobada trayectoria — sin costo alguno hasta que ganemos su caso.',
    ctaPrimary: 'Obtenga una Evaluación Gratuita de su Caso',
  },
  noFeeStrip: [
    'Sin Honorarios a Menos que Ganemos',
    'Evaluación Gratuita del Caso',
    'Respuesta en 1 Día Hábil',
    'Abogados en los 50 Estados',
  ],
  stats: {
    cpscRecalls: 'Retiros de la CPSC — 2024',
    cpscRecallsNote: 'En vivo desde la CPSC',
    injuriesLinked: 'Lesiones Relacionadas — 2024',
    injuriesLinkedNote: 'Máximo en 8 años (PIRG)',
    deaths: 'Muertes — 2024',
    deathsNote: '15 por productos retirados',
    unitsRecalled: 'Unidades Retiradas',
    unitsRecalledNote: 'Total de 2024',
    soldOnline: 'Vendidos Solo en Línea',
    soldOnlineNote: '2× la tasa de infracciones',
    liveFeedRecords: 'Registros del Feed en Vivo',
    liveFeedRecordsNote: 'Del RSS de la CPSC',
  },
  feedStatus: {
    label: 'Estado del Feed',
    live: 'En Vivo — Actualizado Diariamente',
    lastRefreshed: 'Última Actualización',
    nextRefresh: 'Próxima Actualización Automática',
    recordsLoaded: 'Registros Cargados',
  },
  injuryCta: {
    eyebrow: '¿Usted o un Ser Querido Fue Lesionado?',
    h2: 'No Tiene que Enfrentar a las Grandes Empresas Solo.',
    body: 'Las demandas por responsabilidad de productos contra grandes fabricantes son complejas. El abogado correcto marca toda la diferencia. Counsel Hound lleva más de 25 años conectando a víctimas lesionadas con abogados litigantes de primer nivel que, en conjunto, han recuperado millones de dólares para sus clientes.',
    ctaPrimary: 'Obtenga la Revisión Gratuita de su Caso',
  },
  productsDb: {
    heading: 'Base de Datos de Productos Retirados y Peligrosos',
    sourceNote: '{count} productos · CPSC + PIRG + CFA 2024–2026',
    getLegalHelp: 'Obtener Ayuda Legal →',
  },
  categories: [
    { id: 'all', label: 'Todos los Productos' },
    { id: 'children', label: 'Infantiles' },
    { id: 'fire', label: 'Incendio y Eléctricos' },
    { id: 'adult', label: 'Hogar y Adultos' },
    { id: 'vehicle', label: 'Vehículos' },
  ],
  searchPlaceholder: 'Busque productos, marcas o tipo de peligro...',
  liveFeedTable: {
    heading: 'Feed en Vivo de Retiros de la CPSC',
    sourceNote: 'FUENTE: RSS DE LA CPSC — ACTUALIZADO AUTOMÁTICAMENTE A DIARIO A LAS 6:00 A.M.',
    loading: 'Obteniendo los retiros más recientes de la CPSC...',
    headers: {
      date: 'Fecha',
      product: 'Producto',
      severity: 'Gravedad',
      details: 'Detalles',
      view: 'Ver →',
    },
  },
  reportSection: {
    heading: 'Reporte un Producto Peligroso',
    sourceNote: 'Canales Oficiales del Gobierno',
  },
  reportCards: [
    {
      agency: 'CPSC — SaferProducts.gov',
      desc: 'Reporte lesiones o productos de consumo peligrosos directamente a la Comisión de Seguridad de Productos de Consumo de EE. UU. (CPSC). Su reporte ayuda a activar investigaciones y retiros que protegen a otras familias.',
      phone: 'Línea directa: 1-800-638-2772',
      cta: 'Presentar un Reporte →',
    },
    {
      agency: 'NHTSA — Vehicle Safety',
      desc: 'Reporte defectos de vehículos, fallas de neumáticos, problemas con sillas de auto para niños o fallas de seguridad en el equipo. Use la herramienta de búsqueda por VIN para verificar si su vehículo tiene un retiro activo en este momento.',
      phone: 'Línea directa: 1-888-327-4236',
      cta: 'Presentar una Queja →',
    },
    {
      agency: 'FTC — ReportFraud.ftc.gov',
      desc: 'Reporte a empresas que vendieron productos defectuosos de forma engañosa, usaron certificaciones de seguridad falsas o hicieron afirmaciones engañosas sobre la seguridad del producto. Cada reporte cuenta.',
      phone: 'ReportFraud.ftc.gov',
      cta: 'Reportar a la FTC →',
    },
    {
      agency: 'Recalls.gov — All Agencies',
      desc: 'Portal federal centralizado para buscar todos los retiros activos entre la CPSC, la NHTSA, la FDA y el USDA. Verifique cualquier producto antes de comprarlo — o después de haber sido lesionado.',
      phone: 'Recalls.gov',
      cta: 'Buscar Todos los Retiros →',
    },
    {
      agency: 'Subscribe to CPSC Alerts',
      desc: 'Nunca se pierda un retiro que podría afectar a su familia. Suscríbase a las alertas semanales de retiros de la CPSC por correo electrónico — gratis, instantáneo y entregado en el momento en que se identifica un nuevo peligro.',
      phone: 'cpsc.gov/Newsroom/Subscribe',
      cta: 'Suscribirse Ahora →',
    },
  ],
  counselHoundCard: {
    title: 'Counsel Hound — Ayuda Legal Gratuita',
    desc: '¿Fue lesionado por un producto retirado del mercado o defectuoso? La red de abogados de Counsel Hound maneja casos de productos defectuosos bajo honorarios de contingencia — sin costo a menos que usted gane.',
    cta: 'Obtenga la Revisión Gratuita de su Caso →',
  },
  disclaimer: {
    label: 'Aviso Legal:',
    text: 'La información en esta página es solo para fines informativos generales y no constituye asesoría legal. Los datos se recopilan de fuentes gubernamentales públicas, incluyendo la CPSC, la NHTSA, la FTC y PIRG. Ver esta página no crea una relación abogado-cliente. Si ha sido lesionado por un producto, consulte con un abogado calificado. Counsel Hound es un servicio de referencia legal. Los resultados mostrados son representativos y no constituyen una garantía de resultado.',
  },
  faq: [
    {
      q: '¿Puedo demandar si fui lesionado por un producto retirado del mercado?',
      a: 'Sí. Un retiro del mercado puede en realidad fortalecer su caso al demostrar que el fabricante conocía el defecto. Podría tener derecho a compensación por gastos médicos, salarios perdidos, dolor y sufrimiento, y otros daños — incluso si nunca devolvió el producto.',
    },
    {
      q: '¿Cómo sé si un producto ha sido retirado del mercado?',
      a: 'La CPSC mantiene una base de datos pública de retiros en recalls.gov. Puede buscar por nombre de producto, marca o categoría. Counsel Hound rastrea diariamente los retiros activos de la CPSC y destaca los productos más peligrosos en esta página.',
    },
    {
      q: '¿Qué tipos de demandas por responsabilidad de productos existen?',
      a: 'Existen tres tipos: defecto de fabricación (el producto específico que usted recibió tenía una falla), defecto de diseño (toda la línea del producto es inherentemente peligrosa) y falta de advertencia (el fabricante no divulgó adecuadamente los riesgos conocidos). Los tres pueden fundamentar una demanda.',
    },
    {
      q: '¿Necesito conservar el producto defectuoso como evidencia?',
      a: 'Sí — consérvelo si es posible. No lo devuelva, no lo repare ni lo deseche. Tome fotografías de cualquier defecto visible y de sus lesiones. Si ya no tiene el producto, aún puede presentar un reclamo con registros médicos sólidos y comprobantes de compra.',
    },
  ],
};
