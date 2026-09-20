export interface PracticeSub { name: string; desc: string }
export interface PracticeFaq { q: string; a: string }
export interface PracticeArea {
  slug: string;
  label: string;
  ogImage: string;
  intro: string;
  cta: string;
  subs: PracticeSub[];
  faqs: PracticeFaq[];
}

export const practiceUi = {
  eyebrow: 'Áreas de Práctica',
  casesWeHandle: 'Casos que Manejamos',
  noFeesLine: 'No paga nada a menos que ganemos. Hable con un abogado calificado sin costo alguno.',
  freeConsultation: 'Consulta Gratis',
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'abuse-litigation',
    label: 'Litigios de Abuso',
    ogImage: '/pa-abuse.webp',
    intro: 'Las víctimas de abuso merecen justicia. Nuestra red de abogados lucha por los sobrevivientes de abuso institucional, sexual y de personas mayores en todo Estados Unidos.',
    cta: 'Usted Merece Justicia — Podemos Ayudarle',
    subs: [
      { name: 'Boy Scouts',              desc: 'Representamos a sobrevivientes de abuso dentro de la organización Boy Scouts of America.' },
      { name: 'Abuso por Clero',         desc: 'Responsabilizamos a instituciones religiosas por el abuso cometido por miembros del clero.' },
      { name: 'Trata de Personas',       desc: 'Defensa legal para sobrevivientes de trata sexual y laboral.' },
      { name: 'Abuso de Ancianos',       desc: 'Protegemos a personas mayores del abuso físico, financiero y emocional.' },
      { name: 'Abuso en Lyft/Uber',      desc: 'Demandas contra empresas de viajes compartidos por agresiones cometidas por conductores.' },
      { name: 'Asilos de Ancianos',      desc: 'Presentamos demandas por negligencia y abuso contra centros de cuidado a largo plazo.' },
    ],
    faqs: [
      { q: '¿Puedo presentar una demanda si el abuso ocurrió hace años?', a: 'Sí. Muchos estados han extendido o eliminado los plazos de prescripción para casos de abuso. Nuestros abogados pueden evaluar si su caso sigue siendo válido sin importar cuándo ocurrió el abuso.' },
      { q: '¿Se puede demandar a instituciones como iglesias y escuelas por abuso?', a: 'Las instituciones pueden ser responsables por el abuso cometido por empleados o voluntarios si sabían o debieron haber sabido de la conducta indebida. Esto incluye iglesias, escuelas, los Boy Scouts y asilos de ancianos.' },
      { q: '¿Qué compensación pueden recibir las víctimas de abuso?', a: 'Las víctimas de abuso pueden recuperar daños compensatorios por dolor y sufrimiento, gastos médicos y de terapia, e ingresos perdidos. Los tribunales también pueden otorgar daños punitivos en casos de negligencia institucional extrema.' },
    ],
  },
  {
    slug: 'personal-injury',
    label: 'Lesiones Personales',
    ogImage: '/pa-personal-injury.webp',
    intro: 'Si usted resultó lesionado debido a la negligencia de otra persona, podría tener derecho a una compensación significativa. Lo conectamos con abogados litigantes de comprobada trayectoria.',
    cta: '¿Se Lesionó? Deje que Luchemos por Usted',
    subs: [
      { name: 'Accidentes de Auto',        desc: 'Recuperamos indemnizaciones para víctimas de choques automovilísticos.' },
      { name: 'Motocicleta',               desc: 'Representación especializada para víctimas de accidentes de motocicleta.' },
      { name: 'Conductor Ebrio',           desc: 'Hacemos responsables por completo a conductores en estado de ebriedad y a quienes lo permiten.' },
      { name: 'Uber y Lyft',               desc: 'Demandas relacionadas con accidentes y lesiones en vehículos de viajes compartidos.' },
      { name: 'Aviación',                  desc: 'Litigios complejos por accidentes de aeronaves comerciales y privadas.' },
      { name: 'Bicicleta / Bicicleta Eléctrica', desc: 'Protegemos a ciclistas lesionados por conductores negligentes o el mal estado de las vías.' },
      { name: 'Accidentes Marítimos',      desc: 'Demandas por lesiones marítimas para víctimas de accidentes en embarcaciones.' },
      { name: 'Peatones',                  desc: 'Representamos a peatones y corredores atropellados por vehículos motorizados.' },
      { name: 'Accidentes de Camión',      desc: 'Enfrentamos a compañías de transporte y aseguradoras tras colisiones graves.' },
    ],
    faqs: [
      { q: '¿Cuánto tiempo tengo para presentar una demanda por lesiones personales?', a: 'Los plazos de prescripción varían según el estado — generalmente de 2 a 3 años desde la fecha de la lesión. Esperar demasiado puede hacerle perder su derecho a demandar de forma permanente. Contáctenos de inmediato para proteger sus derechos.' },
      { q: '¿Qué daños puedo recuperar en un caso de lesiones personales?', a: 'Puede recuperar gastos médicos, salarios perdidos, dolor y sufrimiento, daños a la propiedad y costos de cuidado futuro. En casos de negligencia grave, también pueden aplicar daños punitivos.' },
      { q: '¿Necesito un abogado si la aseguradora me ofrece un acuerdo?', a: 'Sí. Las aseguradoras suelen ofrecer acuerdos muy por debajo del valor real de su reclamo. Un abogado negociará en su nombre y se asegurará de que reciba una compensación completa y justa.' },
    ],
  },
  {
    slug: 'consumer-fraud',
    label: 'Fraude al Consumidor',
    ogImage: '/pa-consumer-fraud.webp',
    intro: 'Cuando las corporaciones engañan a los consumidores, deben rendir cuentas. Nuestros abogados presentan demandas colectivas e individuales para recuperar lo que se le debe.',
    cta: 'Le Hicieron Daño — Obtenga lo que Se Le Debe',
    subs: [
      { name: 'Filtración de Datos',    desc: 'Responsabilizamos a las empresas que no protegen sus datos personales.' },
      { name: 'Robo de Identidad',      desc: 'Recursos legales para víctimas de robo de identidad y fraude financiero.' },
      { name: 'TCPA',                   desc: 'Demandas contra empresas que envían llamadas automáticas y mensajes de texto no deseados de forma ilegal.' },
    ],
    faqs: [
      { q: '¿Puedo demandar a una empresa que expuso mis datos personales en una filtración?', a: 'Sí. Si una empresa no implementó medidas de seguridad razonables y sus datos fueron comprometidos, podría tener derecho a una indemnización que incluya robo de identidad, daño crediticio y angustia emocional.' },
      { q: '¿Qué es una violación de la TCPA y cuánto se me debe?', a: 'La Ley de Protección al Consumidor Telefónico (TCPA) prohíbe las llamadas automáticas y los mensajes de texto no solicitados. Cada violación le da derecho a una indemnización legal de entre $500 y $1,500 dólares — sin necesidad de demostrar un daño real.' },
      { q: '¿Cómo funcionan las demandas colectivas por fraude al consumidor?', a: 'Cuando una empresa perjudica a muchos consumidores de la misma manera, los abogados pueden consolidar esos reclamos en una demanda colectiva. Usted podría recibir automáticamente una parte del acuerdo si formó parte del grupo afectado.' },
    ],
  },
  {
    slug: 'defective-products',
    label: 'Productos Defectuosos',
    ogImage: '/pa-defective-products.webp',
    intro: 'Los productos peligrosos causan daños graves todos los días. Nuestros abogados de litigios masivos han recuperado miles de millones de dólares para víctimas de dispositivos médicos, medicamentos y productos de consumo defectuosos.',
    cta: 'Un Producto Defectuoso Le Hizo Daño — Podemos Ayudarle',
    subs: [
      { name: 'Opioides',                    desc: 'Demandas contra fabricantes y distribuidores de medicamentos opioides adictivos.' },
      { name: 'Tapones para Oídos 3M',       desc: 'Litigio por pérdida auditiva de veteranos a quienes se les entregaron tapones de combate defectuosos.' },
      { name: 'Dicamba',                     desc: 'Litigio por herbicidas agrícolas relacionado con daños a cultivos y reclamos de salud.' },
      { name: 'CPAP',                        desc: 'Demandas relacionadas con los dispositivos CPAP y BiPAP de Philips retirados del mercado.' },
      { name: 'Prevacid',                    desc: 'Litigio por lesiones renales y otras afecciones vinculadas al uso de Prevacid.' },
      { name: 'Zantac',                      desc: 'Demandas por cáncer relacionadas con la contaminación de NDMA en productos de ranitidina.' },
      { name: 'Nexium',                      desc: 'Demandas por lesión renal vinculadas al uso prolongado de inhibidores de la bomba de protones.' },
      { name: 'Reemplazo de Cadera',         desc: 'Litigio por implantes de cadera metal-metal y otros implantes defectuosos.' },
      { name: 'Ollas de Presión',            desc: 'Demandas por quemaduras y lesiones causadas por ollas de presión defectuosas que explotan.' },
      { name: 'Engrapadoras Quirúrgicas',    desc: 'Demandas por lesiones causadas por engrapadoras quirúrgicas defectuosas.' },
      { name: 'Malla Transvaginal',          desc: 'Demandas por complicaciones de mallas pélvicas contra los fabricantes de los dispositivos.' },
    ],
    faqs: [
      { q: '¿Necesito conservar el producto defectuoso para presentar una demanda?', a: 'Es muy recomendable conservar el producto como evidencia, pero aun así puede presentar una demanda sin él. Documente todo con fotografías, conserve recibos e historiales médicos, y contacte a un abogado lo antes posible.' },
      { q: '¿Quién puede ser responsable por un producto defectuoso?', a: 'Los fabricantes, diseñadores, distribuidores y minoristas pueden ser responsables. La ley de responsabilidad por productos defectuosos no requiere que usted demuestre negligencia — solo que el producto era defectuoso y causó su lesión.' },
      { q: '¿Qué es un litigio masivo (mass tort) y en qué se diferencia de una demanda colectiva?', a: 'En un litigio masivo, cada demandante mantiene su caso individual y puede recuperar una indemnización según sus lesiones específicas. Una demanda colectiva trata a todos los demandantes de la misma manera. Los litigios masivos se usan generalmente para medicamentos y dispositivos médicos defectuosos.' },
    ],
  },
  {
    slug: 'medical-injury',
    label: 'Lesiones Médicas',
    ogImage: '/pa-medical.webp',
    intro: 'La negligencia médica puede cambiar una vida para siempre. Nuestros abogados se especializan en casos complejos de mala praxis médica y litigios por lesiones de nacimiento a nivel nacional.',
    cta: 'La Negligencia Médica Cambió Su Vida — Lucharemos por Usted',
    subs: [
      { name: 'Parálisis Cerebral', desc: 'Demandas por lesiones de nacimiento para familias afectadas por diagnósticos prevenibles de parálisis cerebral.' },
      { name: 'Vacuna COVID',       desc: 'Reclamos de compensación a través del CICP por eventos adversos graves relacionados con la vacuna del COVID.' },
      { name: 'Parálisis de Erb',   desc: 'Demandas por lesiones del plexo braquial durante el parto causadas por negligencia médica.' },
    ],
    faqs: [
      { q: '¿Cómo sé si tengo un caso de mala praxis médica?', a: 'Si un proveedor de salud se desvió del estándar de atención aceptado y usted sufrió daño como resultado, podría tener un caso. Ejemplos comunes incluyen errores quirúrgicos, diagnósticos equivocados, errores de medicación y lesiones de nacimiento.' },
      { q: '¿Cuánto tiempo tengo para presentar una demanda por mala praxis médica?', a: 'La mayoría de los estados permiten de 2 a 3 años desde la fecha en que descubrió o debió haber descubierto la lesión. En lesiones de nacimiento, el plazo puede comenzar a contar desde que el menor cumple 18 años. Actúe con rapidez — los plazos son estrictos.' },
      { q: '¿Qué compensación existe en un caso de lesión médica?', a: 'Puede recuperar gastos médicos pasados y futuros, ingresos perdidos, dolor y sufrimiento, y pérdida del disfrute de la vida. En casos que involucran a menores, los tribunales pueden otorgar costos de cuidado de por vida.' },
    ],
  },
  {
    slug: 'toxic-torts',
    label: 'Exposición a Sustancias Tóxicas',
    ogImage: '/pa-toxic.webp',
    intro: 'La exposición a químicos y sustancias tóxicas puede causar enfermedades devastadoras. Nuestros abogados responsabilizan a fabricantes y empleadores.',
    cta: 'La Exposición Tóxica Le Hizo Daño — Responsabilícelos',
    subs: [
      { name: 'Asbestosis',           desc: 'Demandas por enfermedad pulmonar para trabajadores expuestos al asbesto en el trabajo.' },
      { name: 'Mesotelioma',          desc: 'Litigio agresivo contra el cáncer para víctimas de exposición al asbesto.' },
      { name: 'Paraquat',             desc: 'Demandas por enfermedad de Parkinson relacionadas con el herbicida paraquat.' },
      { name: 'Roundup',              desc: 'Demandas por linfoma no Hodgkin contra los fabricantes del herbicida Roundup a base de glifosato.' },
      { name: 'Talco',                desc: 'Demandas por cáncer de ovario y mesotelioma relacionadas con productos a base de talco.' },
    ],
    faqs: [
      { q: '¿Cómo demuestro que mi enfermedad fue causada por exposición a sustancias tóxicas?', a: 'Los casos de exposición tóxica se basan en evidencia médica, toxicólogos expertos e historial de exposición. Nuestros abogados trabajan con especialistas para establecer el vínculo causal entre su exposición y su diagnóstico.' },
      { q: '¿Puedo presentar una demanda si me expuse a las sustancias tóxicas hace décadas?', a: 'Sí. Muchas enfermedades tóxicas, como el mesotelioma, tienen largos periodos de latencia. Los plazos de prescripción generalmente comienzan a contar desde el diagnóstico o descubrimiento de la enfermedad, no desde la fecha de exposición.' },
      { q: '¿Quién es responsable en un caso de exposición a sustancias tóxicas?', a: 'Pueden ser responsables los fabricantes que sabían o debieron haber sabido de los peligros, los empleadores que no protegieron a sus trabajadores, y los propietarios que permitieron condiciones tóxicas. Con frecuencia se demanda a múltiples partes en estos litigios.' },
    ],
  },
  {
    slug: 'whistleblower-protection',
    label: 'Denunciantes',
    ogImage: '/pa-whistleblower.webp',
    intro: 'Los denunciantes que exponen fraudes contra el gobierno están protegidos por la ley — y podrían tener derecho a una recompensa financiera significativa.',
    cta: 'Alce la Voz. La Ley Lo Protege — Y Lo Recompensa',
    subs: [
      { name: 'Demanda Qui Tam',          desc: 'Casos bajo la Ley de Reclamos Falsos (False Claims Act) en los que los denunciantes reciben una parte de la recuperación del gobierno.' },
      { name: 'Denunciante ante la SEC',  desc: 'Reportar fraude de valores a la SEC con posibilidad de recibir una recompensa monetaria.' },
    ],
    faqs: [
      { q: '¿Qué es una demanda qui tam bajo la Ley de Reclamos Falsos?', a: 'Una demanda qui tam permite que una persona con conocimiento de fraude contra el gobierno presente una demanda en nombre de los Estados Unidos. Si tiene éxito, el denunciante recibe entre el 15% y el 30% de la recuperación del gobierno.' },
      { q: '¿Estoy protegido contra represalias por reportar un fraude?', a: 'Sí. La Ley de Reclamos Falsos, el Programa de Denunciantes de la SEC y muchas otras leyes federales prohíben las represalias contra los denunciantes. Si su empleador toma represalias, usted podría tener derecho a reinstalación, pago retroactivo e indemnización.' },
      { q: '¿Qué se necesita para calificar en el Programa de Denunciantes de la SEC?', a: 'Debe proporcionar información original sobre una posible violación de las leyes de valores a la SEC. Si la SEC recupera más de $1 millón de dólares gracias a su información, usted es elegible para recibir entre el 10% y el 30% del monto recuperado.' },
    ],
  },
];
