import type { ExamGeneratedContent, AudioKeys } from '../types';

export interface StaticPaper {
  slug: string;
  title: string;
  theme: string;
  content: ExamGeneratedContent;
  audioKeys: AudioKeys;
}

function audio(slug: string): AudioKeys {
  return {
    listeningLong: `/papers/${slug}/audio/long.mp3`,
    listeningShort: [
      `/papers/${slug}/audio/short-1.mp3`,
      `/papers/${slug}/audio/short-2.mp3`,
    ],
  };
}

/** Transcripts used by scripts/generate-paper-audio.ts */
export function getPaperAudioTranscripts(): {
  slug: string;
  long: string;
  shorts: string[];
}[] {
  return STATIC_PAPERS.map((p) => ({
    slug: p.slug,
    long: p.content.listening.longDocument.transcript,
    shorts: p.content.listening.shortDocuments.map((d) => d.transcript),
  }));
}

export function staticPaperTitle(paper: StaticPaper): string {
  return `[static:${paper.slug}] ${paper.title}`;
}

/** Curated free mock papers (CO / CE / PE / PO). Seeded into D1 on first visit. */
export const STATIC_PAPERS: StaticPaper[] = [
  {
    slug: 'paper-01',
    title: 'DALF C1 — Environment & Sustainable Development',
    theme: 'Environment and sustainable development',
    audioKeys: audio('paper-01'),
    content: {
      listening: {
        longDocument: {
          transcript: `Bonjour et bienvenue dans « Débats d'aujourd'hui ». Ce soir, nous recevons Claire Moreau, urbaniste et auteure d'un rapport sur la renaturation des villes européennes.

Claire Moreau : Depuis dix ans, les métropoles européennes multiplient les projets de végétalisation. Ce n'est plus seulement une question d'esthétique : il s'agit de santé publique, de lutte contre les îlots de chaleur et de résilience face aux canicules. À Paris, Lyon ou Barcelone, on observe une baisse mesurable de la température de surface dans les quartiers où l'on a planté des arbres et créé des corridors verts.

Présentateur : Pourtant, certains habitants dénoncent une « végétalisation de luxe » qui gentrifie les quartiers populaires.

Claire Moreau : C'est un risque réel. Si l'on améliore le cadre de vie sans politiques de logement social, les loyers augmentent et les populations les plus modestes sont poussées vers la périphérie — là où, paradoxalement, l'exposition à la chaleur et à la pollution est souvent plus forte. La renaturation doit donc être accompagnée d'une gouvernance inclusive : concerts de quartier, plafonds de loyer, et obligation de maintenir une part de logements abordables.

Présentateur : Quels résultats concrets avez-vous mesurés ?

Claire Moreau : Dans les villes pilotes, on constate une réduction de 1,5 à 3 degrés en été dans les zones densément végétalisées, une meilleure rétention des eaux de pluie, et une hausse de la fréquentation des espaces publics. Mais le défi majeur reste le financement : planter ne suffit pas, il faut entretenir pendant des décennies. Les collectivités qui réussissent sont celles qui budgétisent l'entretien dès le départ, et non seulement l'inauguration.`,
          questions: [
            { id: 'L1', type: 'mcq', text: 'Selon Claire Moreau, la végétalisation urbaine vise principalement :', points: 2, options: ['A. L\'esthétique des centres-villes', 'B. La santé publique et la résilience climatique', 'C. L\'augmentation du tourisme', 'D. La réduction des transports en commun'] },
            { id: 'L2', type: 'tf', text: 'La baisse de température mesurée est uniquement cosmétique et non mesurable.', points: 1 },
            { id: 'L3', type: 'open', text: 'Quel risque social Claire Moreau associe-t-elle à la végétalisation ?', points: 3 },
            { id: 'L4', type: 'open', text: 'Quelles conditions de gouvernance recommande-t-elle ?', points: 3 },
            { id: 'L5', type: 'mcq', text: 'Selon l\'invitée, le défi majeur des projets de renaturation est :', points: 2, options: ['A. Le manque d\'arbres disponibles', 'B. Le financement et l\'entretien à long terme', 'C. L\'opposition des touristes', 'D. L\'interdiction européenne'] },
            { id: 'L6', type: 'open', text: 'Citez deux résultats concrets mesurés dans les villes pilotes.', points: 3 },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'B', acceptableAnswers: ['B', 'santé publique'], justificationRequired: false, points: 2 },
            { questionId: 'L2', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            { questionId: 'L3', correctAnswer: 'Gentrification / hausse des loyers / déplacement des populations modestes', acceptableAnswers: ['gentrification', 'loyers', 'populations modestes'], justificationRequired: false, points: 3 },
            { questionId: 'L4', correctAnswer: 'Concerts de quartier, plafonds de loyer, logements abordables', acceptableAnswers: ['gouvernance inclusive', 'logement social', 'plafonds de loyer'], justificationRequired: false, points: 3 },
            { questionId: 'L5', correctAnswer: 'B', acceptableAnswers: ['B', 'financement', 'entretien'], justificationRequired: false, points: 2 },
            { questionId: 'L6', correctAnswer: 'Baisse de température 1,5–3°C ; meilleure rétention d\'eau ; hausse fréquentation espaces publics', acceptableAnswers: ['température', 'eaux de pluie', 'espaces publics'], justificationRequired: false, points: 3 },
          ],
        },
        shortDocuments: [
          {
            transcript: `Flash info — Le Parlement européen a adopté une directive visant à réduire de 40 % l'usage des pesticides chimiques d'ici 2030. Les organisations agricoles dénoncent un calendrier irréaliste, tandis que les ONG environnementales jugent l'objectif insuffisant.`,
            questions: [
              { id: 'S1', type: 'mcq', text: 'L\'objectif de la directive concerne :', points: 2, options: ['A. Une hausse des pesticides', 'B. Une réduction de 40 % d\'ici 2030', 'C. L\'interdiction totale immédiate', 'D. Un report à 2050'] },
              { id: 'S2', type: 'open', text: 'Quelles sont les deux réactions mentionnées ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: 'B', acceptableAnswers: ['B', '40 %', '2030'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: 'Agriculteurs : calendrier irréaliste ; ONG : objectif insuffisant', acceptableAnswers: ['agricoles', 'ONG', 'irréaliste', 'insuffisant'], justificationRequired: false, points: 2 },
            ],
          },
          {
            transcript: `Interview courte — Marc Petit, maire d'une commune littorale : « Nous avons dû avancer de quinze jours la fermeture de certaines plages cet été en raison des algues toxiques. Ce n'est plus exceptionnel : c'est devenu saisonnier. »`,
            questions: [
              { id: 'S3', type: 'tf', text: 'La fermeture des plages est présentée comme un phénomène devenu saisonnier.', points: 1 },
              { id: 'S4', type: 'open', text: 'Quelle cause est invoquée pour la fermeture anticipée ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 1 },
              { questionId: 'S4', correctAnswer: 'Algues toxiques', acceptableAnswers: ['algues', 'toxiques'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `La transition énergétique n'est plus un slogan : c'est un chantier industriel, social et démocratique. En France comme ailleurs en Europe, les objectifs de neutralité carbone à l'horizon 2050 obligent les États à transformer en profondeur leurs systèmes de production d'énergie, de mobilité et de logement.

Pourtant, le consensus apparent masque des tensions. D'un côté, les industriels de l'énergie renouvelable appellent à accélérer les procédures d'autorisation des parcs éoliens et solaires. De l'autre, des associations locales dénoncent l'artificialisation des sols, le bruit, et le sentiment d'un développement imposé « d'en haut ». Le conflit n'est pas seulement technique : il est politique. Qui décide de l'implantation d'une infrastructure ? Au nom de quel intérêt général ?

Les économistes soulignent un autre enjeu : le coût de la transition pour les ménages modestes. Sans accompagnement (aides à la rénovation, tarifs sociaux, reconversion professionnelle), la transition risque d'accroître les inégalités. Plusieurs rapports récents recommandent donc une « transition juste » : prioriser les investissements dans les territoires les plus exposés à la précarité énergétique, et associer les citoyens aux choix d'aménagement.

Enfin, la dimension européenne est décisive. Les marchés de l'électricité sont interconnectés ; une politique purement nationale atteint vite ses limites. La coordination des réseaux, le stockage, et la recherche sur l'hydrogène vert nécessitent des investissements communs. Le débat n'est plus de savoir s'il faut transitionner, mais comment le faire sans sacrifier ni la cohésion sociale ni la démocratie locale.`,
        questions: [
          { id: 'R1', type: 'mcq', text: 'Selon le texte, le consensus sur la transition énergétique :', points: 2, options: ['A. Est total et sans conflit', 'B. Masque des tensions sociales et politiques', 'C. N\'existe qu\'en France', 'D. Concerne uniquement le logement'] },
          { id: 'R2', type: 'open', text: 'Quels arguments opposent associations locales et industriels ?', points: 4 },
          { id: 'R3', type: 'open', text: 'Que signifie une « transition juste » dans ce contexte ?', points: 4 },
          { id: 'R4', type: 'tf', text: 'Le texte affirme qu\'une politique purement nationale suffit.', points: 2 },
          { id: 'R5', type: 'open', text: 'Pourquoi la dimension européenne est-elle présentée comme décisive ?', points: 4 },
          { id: 'R6', type: 'mcq', text: 'Le débat central, selon l\'auteur, porte désormais sur :', points: 2, options: ['A. L\'opportunité de transitionner', 'B. La manière de transitionner sans sacrifier cohésion et démocratie', 'C. L\'abandon des renouvelables', 'D. La privatisation totale de l\'énergie'] },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'B', acceptableAnswers: ['B', 'tensions'], justificationRequired: false, points: 2 },
          { questionId: 'R2', correctAnswer: 'Industriels : accélérer autorisations ; associations : artificialisation, bruit, imposition top-down', acceptableAnswers: ['autorisation', 'artificialisation', 'bruit', 'd\'en haut'], justificationRequired: false, points: 4 },
          { questionId: 'R3', correctAnswer: 'Accompagner les ménages modestes ; investir dans territoires précaires ; associer citoyens', acceptableAnswers: ['précarité', 'aides', 'citoyens', 'inégalités'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 2 },
          { questionId: 'R5', correctAnswer: 'Marchés interconnectés ; coordination réseaux/stockage/hydrogène ; investissements communs', acceptableAnswers: ['interconnectés', 'coordination', 'investissements communs'], justificationRequired: false, points: 4 },
          { questionId: 'R6', correctAnswer: 'B', acceptableAnswers: ['B', 'comment', 'cohésion', 'démocratie'], justificationRequired: false, points: 2 },
        ],
      },
      writing: {
        dossier: [
          {
            title: 'Document 1 — Extrait d\'un rapport ministériel',
            text: `La rénovation énergétique des logements représente 20 % des émissions liées au bâtiment. Or, 40 % du parc immobilier français a été construit avant 1975. Sans accélération des aides, l'objectif de 2050 est inatteignable.`,
          },
          {
            title: 'Document 2 — Tribune d\'une association de locataires',
            text: `Les aides actuelles favorisent les propriétaires occupants. Les locataires des passoires thermiques paient des factures élevées sans pouvoir décider des travaux. Une politique juste doit conditionner les aides à la protection des locataires.`,
          },
          {
            title: 'Document 3 — Données d\'un observatoire',
            text: `En 2024, le nombre de logements rénovés a augmenté de 12 %, mais les gains énergétiques moyens restent inférieurs aux prévisions. Le principal frein identifié : la complexité administrative des dossiers.`,
          },
        ],
        problematique: 'Comment concilier accélération de la rénovation énergétique et justice sociale pour les locataires ?',
        synthesisPrompt: 'À partir des documents, rédigez une synthèse objective (environ 200–240 mots) qui présente les enjeux de la rénovation énergétique et les tensions entre efficacité et justice sociale.',
        essayPrompt: 'Vous rédigez un essai argumenté (250 mots minimum) répondant à la problématique. Prenez position et proposez des pistes concrètes.',
      },
      speaking: {
        dossier: [
          {
            title: 'Document A — Végétalisation et inégalités urbaines',
            text: `Les projets de renaturation améliorent le confort thermique mais peuvent entraîner une hausse des loyers. Des villes expérimentent des « clauses anti-gentrification » liées aux investissements verts.`,
          },
          {
            title: 'Document B — Participation citoyenne',
            text: `Les concertations publiques restent souvent formelles. Des chercheurs proposent des budgets participatifs dédiés à la transition écologique locale.`,
          },
        ],
        instructions: `À partir du dossier, préparez un exposé de 8–10 minutes : présentez la problématique, analysez les documents, et proposez une prise de position argumentée sur la renaturation urbaine juste. Puis répondez aux questions de l'examinateur (pratique orale — pas un entretien en direct).`,
        examinerQuestions: [
          'Dans quelle mesure la végétalisation peut-elle aggraver les inégalités urbaines ?',
          'Quels mécanismes proposeriez-vous pour associer réellement les habitants aux projets verts ?',
          'Peut-on parler d\'intérêt général lorsque les bénéfices de la transition sont inégalement répartis ?',
        ],
      },
    },
  },
  {
    slug: 'paper-02',
    title: 'DALF C1 — Digital Society',
    theme: 'Digital society',
    audioKeys: audio('paper-02'),
    content: {
      listening: {
        longDocument: {
          transcript: `Émission « Tech & Société ». Invité : Yann Lefèvre, sociologue du numérique.

Yann Lefèvre : L'intelligence artificielle générative transforme le travail intellectuel plus vite que les institutions ne s'adaptent. Dans l'éducation, on voit deux camps : ceux qui interdisent ChatGPT, et ceux qui l'intègrent comme outil d'apprentissage. Or, interdire sans former crée un angle mort : les élèves l'utilisent quand même, sans esprit critique.

Présentatrice : Et dans le monde du travail ?

Yann Lefèvre : Les métiers de la rédaction, du code, du design sont déjà reconfigurés. Ce n'est pas forcément une destruction nette d'emplois, mais une polarisation : les profils capables de piloter l'IA gagnent en productivité, tandis que les tâches répétitives s'automatisent. Le risque social, c'est l'absence de formation continue pour les salariés de plus de quarante ans.

Présentatrice : Faut-il réguler ?

Yann Lefèvre : Oui, mais une régulation intelligente. Transparence sur l'usage de l'IA dans les médias, droit à la formation, et responsabilité des plateformes sur les contenus synthétiques. L'Europe avance avec l'AI Act ; encore faut-il que les PME puissent s'y conformer sans être écrasées par la charge administrative.`,
          questions: [
            { id: 'L1', type: 'mcq', text: 'Selon Lefèvre, interdire ChatGPT à l\'école :', points: 2, options: ['A. Résout le problème', 'B. Crée un angle mort faute de formation critique', 'C. Est exigé par l\'Europe', 'D. N\'arrive jamais'] },
            { id: 'L2', type: 'open', text: 'Quelle transformation du travail décrit-il ?', points: 3 },
            { id: 'L3', type: 'open', text: 'Quel public est particulièrement exposé selon lui ?', points: 2 },
            { id: 'L4', type: 'tf', text: 'Lefèvre refuse toute régulation de l\'IA.', points: 1 },
            { id: 'L5', type: 'open', text: 'Quelles pistes de régulation mentionne-t-il ?', points: 3 },
            { id: 'L6', type: 'mcq', text: 'Son inquiétude sur l\'AI Act porte surtout sur :', points: 2, options: ['A. Les grandes plateformes seulement', 'B. La charge pour les PME', 'C. L\'interdiction totale de l\'IA', 'D. Les jeux vidéo'] },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'B', acceptableAnswers: ['B', 'angle mort', 'esprit critique'], justificationRequired: false, points: 2 },
            { questionId: 'L2', correctAnswer: 'Polarisation : pilotes IA plus productifs ; tâches répétitives automatisées', acceptableAnswers: ['polarisation', 'automatisation', 'productivité'], justificationRequired: false, points: 3 },
            { questionId: 'L3', correctAnswer: 'Salariés de plus de quarante ans / manque de formation continue', acceptableAnswers: ['quarante', 'formation continue'], justificationRequired: false, points: 2 },
            { questionId: 'L4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            { questionId: 'L5', correctAnswer: 'Transparence médias, droit à la formation, responsabilité plateformes', acceptableAnswers: ['transparence', 'formation', 'plateformes'], justificationRequired: false, points: 3 },
            { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'PME'], justificationRequired: false, points: 2 },
          ],
        },
        shortDocuments: [
          {
            transcript: `Une étude révèle que 62 % des adolescents français utilisent quotidiennement des filtres IA sur les réseaux sociaux. Les psychologues alertent sur l'écart croissant entre image réelle et image numérique.`,
            questions: [
              { id: 'S1', type: 'mcq', text: 'Quel pourcentage d\'adolescents utilise des filtres IA quotidiennement ?', points: 2, options: ['A. 26 %', 'B. 62 %', 'C. 82 %', 'D. 12 %'] },
              { id: 'S2', type: 'open', text: 'Quel risque les psychologues soulignent-ils ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: 'B', acceptableAnswers: ['B', '62'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: 'Écart image réelle / image numérique', acceptableAnswers: ['écart', 'image'], justificationRequired: false, points: 2 },
            ],
          },
          {
            transcript: `Le ministère de l'Éducation annonce un plan de formation des enseignants à l'IA pédagogique, avec 10 000 places la première année.`,
            questions: [
              { id: 'S3', type: 'tf', text: 'Le plan cible les enseignants.', points: 1 },
              { id: 'S4', type: 'open', text: 'Combien de places sont prévues la première année ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 1 },
              { questionId: 'S4', correctAnswer: '10 000', acceptableAnswers: ['10000', '10 000'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `La souveraineté numérique est devenue un thème central des politiques européennes. Derrière ce concept se jouent le contrôle des données, la dépendance aux infrastructures cloud américaines ou asiatiques, et la capacité à faire respecter le droit local sur des plateformes globales.

Les défenseurs d'une souveraineté forte plaident pour des clouds souverains, des semi-conducteurs européens, et des règles strictes sur le transfert de données. Leurs critiques répondent que l'isolation technologique est illusoire : l'innovation naît dans des écosystèmes ouverts, et une Europe trop protectionniste risque de ralentir ses start-up.

Entre ces deux pôles, une voie pragmatique émerge : diversifier les fournisseurs, imposer l'interopérabilité, et investir dans les compétences. La question n'est plus seulement « où sont stockées les données ? », mais « qui peut les auditer, les porter ailleurs, et en rendre compte devant un juge européen ? ».

Pour les citoyens, l'enjeu reste concret : vie privée, manipulation informationnelle, et accès équitable aux services numériques essentiels. Une démocratie numérique digne de ce nom exige à la fois innovation et garde-fous.`,
        questions: [
          { id: 'R1', type: 'open', text: 'Quels enjeux recouvre la souveraineté numérique selon le texte ?', points: 4 },
          { id: 'R2', type: 'mcq', text: 'Les critiques du protectionnisme craignent surtout :', points: 2, options: ['A. Une trop grande ouverture', 'B. Un ralentissement des start-up européennes', 'C. La fin du cloud', 'D. L\'interdiction des smartphones'] },
          { id: 'R3', type: 'open', text: 'Quelle voie pragmatique est proposée ?', points: 4 },
          { id: 'R4', type: 'tf', text: 'Selon le texte, la seule question pertinente est le lieu de stockage des données.', points: 2 },
          { id: 'R5', type: 'open', text: 'Quels enjeux concrets pour les citoyens sont cités ?', points: 4 },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'Contrôle des données, dépendance cloud, application du droit local', acceptableAnswers: ['données', 'cloud', 'droit'], justificationRequired: false, points: 4 },
          { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'start-up', 'ralentir'], justificationRequired: false, points: 2 },
          { questionId: 'R3', correctAnswer: 'Diversifier fournisseurs, interopérabilité, compétences', acceptableAnswers: ['diversifier', 'interopérabilité', 'compétences'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 2 },
          { questionId: 'R5', correctAnswer: 'Vie privée, manipulation informationnelle, accès équitable', acceptableAnswers: ['vie privée', 'manipulation', 'accès'], justificationRequired: false, points: 4 },
        ],
      },
      writing: {
        dossier: [
          { title: 'Document 1', text: `Une enquête montre que 48 % des salariés français ont déjà utilisé une IA générative au travail, souvent sans cadre clair de leur entreprise.` },
          { title: 'Document 2', text: `Des syndicats demandent un droit à la formation IA et une transparence sur les outils utilisés pour évaluer la performance.` },
          { title: 'Document 3', text: `Des dirigeants de PME estiment que la régulation européenne est nécessaire mais trop complexe à appliquer sans accompagnement.` },
        ],
        problematique: 'Faut-il encadrer strictement l\'usage de l\'IA au travail, et si oui, selon quels principes ?',
        synthesisPrompt: 'Synthétisez les documents (200–240 mots) en mettant en évidence les tensions entre adoption de l\'IA, droits des salariés et contraintes des entreprises.',
        essayPrompt: 'Rédigez un essai argumenté répondant à la problématique (250 mots min.).',
      },
      speaking: {
        dossier: [
          { title: 'Document A', text: `L'IA générative transforme l'évaluation scolaire. Certains établissements autorisent son usage déclaré ; d'autres le sanctionnent.` },
          { title: 'Document B', text: `Des chercheurs insistent sur l'esprit critique et la traçabilité des sources comme compétences C1 essentielles à l'ère de l'IA.` },
        ],
        instructions: `Préparez un exposé de 8–10 minutes sur l'IA dans l'éducation et le travail intellectuel. Analysez le dossier, prenez position, puis répondez aux questions à l'écran.`,
        examinerQuestions: [
          'L\'interdiction de l\'IA à l\'école est-elle réaliste ?',
          'Quelles compétences faut-il enseigner face aux contenus générés ?',
          'Comment protéger les salariés tout en permettant l\'innovation ?',
        ],
      },
    },
  },
  {
    slug: 'paper-03',
    title: 'DALF C1 — Culture & Arts',
    theme: 'Culture and arts',
    audioKeys: audio('paper-03'),
    content: {
      listening: {
        longDocument: {
          transcript: `Magazine culturel — Invité : Amélie Durand, directrice d'un festival de cinéma documentaire.

Amélie Durand : Le documentaire vit un paradoxe. Jamais autant de films n'ont été produits, jamais la diffusion en salle n'a été aussi fragile. Les plateformes offrent une vitrine mondiale, mais imposent des formats courts, des accroches immédiates, et une logique d'algorithme qui peut étouffer les œuvres longues et exigeantes.

Présentateur : Comment résistez-vous ?

Amélie Durand : Par le lien avec le public. Nos séances-débats remplissent mieux que les projections « silencieuses ». Le documentaire n'est pas seulement un objet à consommer : c'est un espace de discussion démocratique. Nous travaillons aussi avec les lycées : former le regard, c'est former le citoyen.

Présentateur : Et le financement ?

Amélie Durand : Les aides publiques restent vitales. Sans elles, seuls les sujets « porteurs » survivraient. Or, le rôle de la culture publique est précisément de soutenir ce qui n'est pas immédiatement rentable, mais collectivement nécessaire.`,
          questions: [
            { id: 'L1', type: 'open', text: 'Quel paradoxe Amélie Durand décrit-elle ?', points: 3 },
            { id: 'L2', type: 'mcq', text: 'Selon elle, les plateformes :', points: 2, options: ['A. Remplacent parfaitement la salle', 'B. Peuvent étouffer les œuvres longues via l\'algorithme', 'C. Interdisent le documentaire', 'D. Financent tous les festivals'] },
            { id: 'L3', type: 'open', text: 'Quelle stratégie de résistance évoque-t-elle ?', points: 3 },
            { id: 'L4', type: 'tf', text: 'Elle considère les aides publiques comme superflues.', points: 1 },
            { id: 'L5', type: 'open', text: 'Quel rôle attribue-t-elle à la culture publique ?', points: 3 },
            { id: 'L6', type: 'mcq', text: 'Le travail avec les lycées vise surtout à :', points: 2, options: ['A. Vendre des places', 'B. Former le regard et le citoyen', 'C. Remplacer les professeurs', 'D. Produire des blockbusters'] },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'Beaucoup de films produits mais diffusion en salle fragile', acceptableAnswers: ['paradoxe', 'salle', 'production'], justificationRequired: false, points: 3 },
            { questionId: 'L2', correctAnswer: 'B', acceptableAnswers: ['B', 'algorithme', 'œuvres longues'], justificationRequired: false, points: 2 },
            { questionId: 'L3', correctAnswer: 'Séances-débats / lien avec le public / lycées', acceptableAnswers: ['débats', 'public', 'lycées'], justificationRequired: false, points: 3 },
            { questionId: 'L4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            { questionId: 'L5', correctAnswer: 'Soutenir ce qui n\'est pas immédiatement rentable mais nécessaire', acceptableAnswers: ['aides', 'rentable', 'nécessaire'], justificationRequired: false, points: 3 },
            { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'citoyen', 'regard'], justificationRequired: false, points: 2 },
          ],
        },
        shortDocuments: [
          {
            transcript: `Le Louvre a annoncé une plage horaire réservée aux visiteurs de moins de 26 ans un soir par mois, avec médiation gratuite.`,
            questions: [
              { id: 'S1', type: 'open', text: 'Quelle mesure le Louvre a-t-il annoncée ?', points: 2 },
              { id: 'S2', type: 'tf', text: 'La médiation est payante.', points: 1 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: 'Plage horaire pour moins de 26 ans + médiation gratuite', acceptableAnswers: ['26', 'médiation', 'gratuite'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            ],
          },
          {
            transcript: `Une étude montre que la lecture de fiction améliore l'empathie mesurée chez les adolescents, davantage que la lecture purement informative.`,
            questions: [
              { id: 'S3', type: 'mcq', text: 'Selon l\'étude, la fiction :', points: 2, options: ['A. Diminue l\'empathie', 'B. Améliore davantage l\'empathie que l\'informatif', 'C. N\'a aucun effet', 'D. Remplace l\'école'] },
              { id: 'S4', type: 'open', text: 'Quel public est concerné ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'B', acceptableAnswers: ['B', 'empathie', 'fiction'], justificationRequired: false, points: 2 },
              { questionId: 'S4', correctAnswer: 'Adolescents', acceptableAnswers: ['adolescents'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `Faut-il démocratiser la culture à tout prix, ou préserver l'exigence des formes savantes ? Ce faux dilemme structure encore trop de politiques culturelles. Démocratiser ne signifie pas appauvrir : cela signifie ouvrir des portes — médiation, tarifs, horaires, co-création — sans renoncer à la complexité des œuvres.

Les festivals de rue, les bibliothèques « troisième lieu », et les projets d'artistes en résidence dans les hôpitaux montrent qu'un public élargi peut rencontrer des propositions ambitieuses. Inversement, certains dispositifs « grand public » se contentent d'une logique d'audience qui transforme la culture en divertissement interchangeable.

La question clé est celle du temps. Comprendre une œuvre demande une attention rare à l'ère du flux permanent. Former cette attention — à l'école, dans les médias, dans les institutions — est peut-être le vrai chantier démocratique de la culture contemporaine.`,
        questions: [
          { id: 'R1', type: 'open', text: 'Pourquoi l\'auteur parle-t-il d\'un « faux dilemme » ?', points: 4 },
          { id: 'R2', type: 'mcq', text: 'Démocratiser, selon le texte, signifie surtout :', points: 2, options: ['A. Appauvrir les œuvres', 'B. Ouvrir l\'accès sans renoncer à la complexité', 'C. Remplacer les musées par TikTok', 'D. Supprimer les tarifs partout'] },
          { id: 'R3', type: 'open', text: 'Quels exemples positifs sont cités ?', points: 4 },
          { id: 'R4', type: 'tf', text: 'L\'auteur critique une logique d\'audience qui transforme la culture en divertissement interchangeable.', points: 2 },
          { id: 'R5', type: 'open', text: 'Quel « vrai chantier démocratique » identifie-t-il ?', points: 4 },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'Démocratiser ≠ appauvrir ; on peut ouvrir l\'accès et garder l\'exigence', acceptableAnswers: ['faux dilemme', 'démocratiser', 'exigence'], justificationRequired: false, points: 4 },
          { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'complexité', 'ouvrir'], justificationRequired: false, points: 2 },
          { questionId: 'R3', correctAnswer: 'Festivals de rue, bibliothèques troisième lieu, artistes en résidence à l\'hôpital', acceptableAnswers: ['festivals', 'bibliothèques', 'hôpital'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 2 },
          { questionId: 'R5', correctAnswer: 'Former l\'attention / le temps de compréhension des œuvres', acceptableAnswers: ['attention', 'temps'], justificationRequired: false, points: 4 },
        ],
      },
      writing: {
        dossier: [
          { title: 'Document 1', text: `Les budgets culturels municipaux stagnent tandis que les coûts de production scénique augmentent.` },
          { title: 'Document 2', text: `Des collectifs artistiques proposent des modèles coopératifs et des tarifs solidaires pour élargir le public.` },
          { title: 'Document 3', text: `Une enquête indique que 35 % des 18–25 ans n'ont pas fréquenté de lieu culturel payant au cours de l'année.` },
        ],
        problematique: 'Comment élargir l\'accès à la culture sans sacrifier la qualité artistique ?',
        synthesisPrompt: 'Rédigez une synthèse objective (200–240 mots) des documents.',
        essayPrompt: 'Essai argumenté (250 mots min.) répondant à la problématique.',
      },
      speaking: {
        dossier: [
          { title: 'Document A', text: `Les plateformes de streaming financent de plus en plus de documentaires, mais selon des formats calibrés pour la rétention d'attention.` },
          { title: 'Document B', text: `Les salles indépendantes misent sur la médiation et les débats pour fidéliser un public local.` },
        ],
        instructions: `Exposé 8–10 minutes : l'avenir du documentaire et de la démocratisation culturelle. Puis questions à l'écran.`,
        examinerQuestions: [
          'Les plateformes sauvent-elles ou appauvrissent-elles le documentaire ?',
          'Quel rôle doit jouer l\'école dans l\'éducation artistique ?',
          'La gratuité suffit-elle à démocratiser la culture ?',
        ],
      },
    },
  },
  {
    slug: 'paper-04',
    title: 'DALF C1 — Work & Wellbeing',
    theme: 'Work and wellbeing',
    audioKeys: audio('paper-04'),
    content: {
      listening: {
        longDocument: {
          transcript: `Débat radio — « Le travail a-t-il encore un sens ? »
Sophie Bernard, ergonome : Le télétravail hybride a réduit certains stress (trajets) mais en a créé d'autres : disponibilité permanente, isolement, brouillage vie privée / vie professionnelle.
Karim Haddad, DRH : Les entreprises qui réussissent fixent des règles claires : plages de déconnexion, objectifs par résultats plutôt que par présence, et espaces de collaboration intentionnels.
Sophie Bernard : Attention à ne pas individualiser le problème. Le burnout n'est pas qu'une affaire de « résilience personnelle » : c'est aussi une question d'organisation, de charge, et de reconnaissance.
Karim Haddad : D'accord. Nous mesurons désormais l'engagement et la charge perçue chaque trimestre. Ce n'est pas parfait, mais cela permet d'agir avant la rupture.`,
          questions: [
            { id: 'L1', type: 'open', text: 'Quels effets ambivalents du télétravail Sophie Bernard décrit-elle ?', points: 3 },
            { id: 'L2', type: 'mcq', text: 'Selon Karim Haddad, les entreprises efficaces :', points: 2, options: ['A. Imposent le présentiel total', 'B. Fixent règles de déconnexion et objectifs par résultats', 'C. Suppriment toute collaboration', 'D. Interdisent le télétravail'] },
            { id: 'L3', type: 'tf', text: 'Sophie Bernard réduit le burnout à un manque de résilience personnelle.', points: 1 },
            { id: 'L4', type: 'open', text: 'Quels facteurs organisationnels cite-t-elle ?', points: 3 },
            { id: 'L5', type: 'open', text: 'Quelle pratique de mesure Karim Haddad évoque-t-il ?', points: 3 },
            { id: 'L6', type: 'mcq', text: 'Le thème central de l\'échange est :', points: 2, options: ['A. Les salaires uniquement', 'B. Le sens et les conditions du travail contemporain', 'C. La retraite', 'D. Les congés payés seulement'] },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'Moins de stress trajets mais disponibilité permanente, isolement, brouillage vies', acceptableAnswers: ['trajets', 'disponibilité', 'isolement', 'brouillage'], justificationRequired: false, points: 3 },
            { questionId: 'L2', correctAnswer: 'B', acceptableAnswers: ['B', 'déconnexion', 'résultats'], justificationRequired: false, points: 2 },
            { questionId: 'L3', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            { questionId: 'L4', correctAnswer: 'Organisation, charge, reconnaissance', acceptableAnswers: ['organisation', 'charge', 'reconnaissance'], justificationRequired: false, points: 3 },
            { questionId: 'L5', correctAnswer: 'Mesure trimestrielle de l\'engagement et de la charge perçue', acceptableAnswers: ['trimestre', 'engagement', 'charge'], justificationRequired: false, points: 3 },
            { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'sens', 'conditions'], justificationRequired: false, points: 2 },
          ],
        },
        shortDocuments: [
          {
            transcript: `Une loi expérimentale dans trois régions teste la semaine de quatre jours à salaire égal dans la fonction publique territoriale.`,
            questions: [
              { id: 'S1', type: 'open', text: 'Quelle expérimentation est annoncée ?', points: 2 },
              { id: 'S2', type: 'tf', text: 'Le salaire est réduit proportionnellement.', points: 1 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: 'Semaine de 4 jours à salaire égal (fonction publique territoriale)', acceptableAnswers: ['quatre jours', '4 jours', 'salaire égal'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            ],
          },
          {
            transcript: `Selon l'INSEE, le taux de burnout déclaré a augmenté de 18 % en cinq ans chez les cadres du secteur privé.`,
            questions: [
              { id: 'S3', type: 'mcq', text: 'La hausse du burnout déclaré est de :', points: 2, options: ['A. 8 %', 'B. 18 %', 'C. 28 %', 'D. 81 %'] },
              { id: 'S4', type: 'open', text: 'Quel public est concerné ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'B', acceptableAnswers: ['B', '18'], justificationRequired: false, points: 2 },
              { questionId: 'S4', correctAnswer: 'Cadres du secteur privé', acceptableAnswers: ['cadres', 'privé'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `Le « quiet quitting » et la quête de sens au travail ne sont pas de simples modes médiatiques. Ils signalent une fracture plus profonde : l'écart entre le discours managérial sur l'épanouissement et l'expérience quotidienne de la charge, du contrôle algorithmique, et de l'incertitude économique.

Certaines entreprises répondent par le « care washing » : salles de sport, paniers de fruits, applications de méditation — sans toucher à l'organisation du travail. D'autres engagent des réformes plus structurelles : autonomie réelle, réduction des reporting inutiles, co-construction des objectifs.

Les sciences sociales rappellent qu'un travail soutenable combine trois dimensions : la demande (charge), les ressources (soutien, outils, reconnaissance), et le contrôle (marge de manœuvre). Agir sur une seule dimension ne suffit pas. Politiquement, cela interroge aussi le partage de la valeur : peut-on exiger l'engagement sans redistribution ni sécurité ?`,
        questions: [
          { id: 'R1', type: 'open', text: 'Que signalent quiet quitting et quête de sens selon l\'auteur ?', points: 4 },
          { id: 'R2', type: 'mcq', text: 'Le « care washing » désigne :', points: 2, options: ['A. Une réforme structurelle', 'B. Des gestes superficiels sans changer l\'organisation', 'C. Une hausse des salaires', 'D. Un syndicat'] },
          { id: 'R3', type: 'open', text: 'Quelles réformes structurelles sont citées ?', points: 4 },
          { id: 'R4', type: 'open', text: 'Quelles sont les trois dimensions d\'un travail soutenable ?', points: 4 },
          { id: 'R5', type: 'tf', text: 'L\'auteur lie engagement, redistribution et sécurité.', points: 2 },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'Fracture entre discours d\'épanouissement et réalité de charge/contrôle/incertitude', acceptableAnswers: ['fracture', 'charge', 'discours'], justificationRequired: false, points: 4 },
          { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'superficiel', 'organisation'], justificationRequired: false, points: 2 },
          { questionId: 'R3', correctAnswer: 'Autonomie, moins de reporting inutile, co-construction des objectifs', acceptableAnswers: ['autonomie', 'reporting', 'objectifs'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Demande (charge), ressources, contrôle (marge de manœuvre)', acceptableAnswers: ['demande', 'ressources', 'contrôle'], justificationRequired: false, points: 4 },
          { questionId: 'R5', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 2 },
        ],
      },
      writing: {
        dossier: [
          { title: 'Document 1', text: `Le télétravail hybride est plébiscité par 70 % des salariés interrogés, mais 45 % disent répondre aux messages professionnels hors horaires.` },
          { title: 'Document 2', text: `Des médecins du travail alertent sur la hausse des troubles musculo-squelettiques liés aux postes domestiques mal équipés.` },
          { title: 'Document 3', text: `Des entreprises expérimentent le droit à la déconnexion avec des coupures automatiques des serveurs de messagerie le week-end.` },
        ],
        problematique: 'Le télétravail améliore-t-il réellement le bien-être, et à quelles conditions ?',
        synthesisPrompt: 'Synthèse objective (200–240 mots) des documents.',
        essayPrompt: 'Essai argumenté (250 mots min.) sur la problématique.',
      },
      speaking: {
        dossier: [
          { title: 'Document A', text: `Le burnout est encore trop souvent traité comme un échec individuel plutôt qu'un signal organisationnel.` },
          { title: 'Document B', text: `La semaine de quatre jours suscite l'intérêt, mais les effets sur la charge réelle restent débattus.` },
        ],
        instructions: `Exposé 8–10 minutes sur le sens du travail et le bien-être. Puis répondez aux questions affichées (pratique orale).`,
        examinerQuestions: [
          'Le télétravail est-il un progrès social ou un nouveau piège de disponibilité ?',
          'Comment distinguer vrai care management et care washing ?',
          'La semaine de quatre jours peut-elle fonctionner dans tous les secteurs ?',
        ],
      },
    },
  },
  {
    slug: 'paper-05',
    title: 'DALF C1 — Consumption & Ethics',
    theme: 'Consumption and ethics',
    audioKeys: audio('paper-05'),
    content: {
      listening: {
        longDocument: {
          transcript: `Émission Économie et société. Ce matin, nous recevons Nadia Benali, économiste spécialisée dans la consommation éthique.

Nadia Benali : Depuis la pandémie, une partie des consommateurs dit vouloir consommer moins et mieux. Pourtant, les données de vente montrent que le volume global de biens jetables continue d'augmenter. Il y a donc un écart entre les intentions déclarées et les comportements réels.

Présentateur : Pourquoi cet écart ?

Nadia Benali : D'abord, le prix. Les produits durables restent souvent plus chers. Ensuite, le marketing vert : beaucoup d'étiquettes écologiques sont floues, ce qui crée de la méfiance. Enfin, l'urgence du quotidien pousse vers la facilité.

Présentateur : Que peuvent faire les pouvoirs publics ?

Nadia Benali : Trois leviers : une fiscalité qui rend le durable compétitif, une information fiable et standardisée, et le soutien aux filières de réparation et de réemploi. Sans cela, l'éthique reste un luxe pour une minorité.`,
          questions: [
            { id: 'L1', type: 'open', text: 'Quel écart Nadia Benali met-elle en évidence ?', points: 3 },
            { id: 'L2', type: 'mcq', text: 'Selon elle, le volume de biens jetables :', points: 2, options: ['A. Diminue fortement', 'B. Continue d\'augmenter', 'C. Est stable', 'D. N\'est pas mesuré'] },
            { id: 'L3', type: 'open', text: 'Citez deux causes de l\'écart intentions / comportements.', points: 3 },
            { id: 'L4', type: 'tf', text: 'Nadia Benali estime que le marketing vert renforce toujours la confiance.', points: 1 },
            { id: 'L5', type: 'open', text: 'Quels trois leviers publics propose-t-elle ?', points: 3 },
            { id: 'L6', type: 'mcq', text: 'Sans ces leviers, l\'éthique de consommation risque de rester :', points: 2, options: ['A. Une obligation légale', 'B. Un luxe pour une minorité', 'C. Une pratique majoritaire', 'D. Interdite'] },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'Écart entre intentions déclarées et comportements réels', acceptableAnswers: ['intentions', 'comportements', 'écart'], justificationRequired: false, points: 3 },
            { questionId: 'L2', correctAnswer: 'B', acceptableAnswers: ['B', 'augmenter'], justificationRequired: false, points: 2 },
            { questionId: 'L3', correctAnswer: 'Prix ; marketing vert flou / méfiance ; urgence du quotidien', acceptableAnswers: ['prix', 'marketing', 'méfiance', 'quotidien'], justificationRequired: false, points: 3 },
            { questionId: 'L4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            { questionId: 'L5', correctAnswer: 'Fiscalité, information fiable, soutien réparation/réemploi', acceptableAnswers: ['fiscalité', 'information', 'réparation', 'réemploi'], justificationRequired: false, points: 3 },
            { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'luxe', 'minorité'], justificationRequired: false, points: 2 },
          ],
        },
        shortDocuments: [
          {
            transcript: `Une enquête européenne indique que 54 % des jeunes de 18 à 30 ans déclarent boycotter occasionnellement une marque pour des raisons éthiques.`,
            questions: [
              { id: 'S1', type: 'mcq', text: 'Quel pourcentage de jeunes boycotte occasionnellement une marque ?', points: 2, options: ['A. 45 %', 'B. 54 %', 'C. 64 %', 'D. 34 %'] },
              { id: 'S2', type: 'open', text: 'Quelle tranche d\'âge est concernée ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: 'B', acceptableAnswers: ['B', '54'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: '18–30 ans', acceptableAnswers: ['18', '30'], justificationRequired: false, points: 2 },
            ],
          },
          {
            transcript: `Le gouvernement annonce un bonus réparation étendu aux smartphones et aux lave-linge dès l'automne prochain.`,
            questions: [
              { id: 'S3', type: 'tf', text: 'Le bonus réparation concernera notamment les smartphones.', points: 1 },
              { id: 'S4', type: 'open', text: 'Quand le dispositif doit-il débuter ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 1 },
              { questionId: 'S4', correctAnswer: 'Automne prochain', acceptableAnswers: ['automne'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `La consommation éthique est devenue un argument commercial omniprésent. Labels, chartes, reports RSE : les entreprises multiplient les signes de vertu. Pourtant, derrière cette inflation discursive, la question demeure : qui peut réellement consommer autrement ?

Les chercheurs en sociologie de la consommation soulignent que le « mieux consommer » suppose du temps, de l'information et souvent un surplus monétaire. Les ménages précaires, eux, optimisent le prix avant tout. Faire de l'éthique une responsabilité individuelle sans toucher aux structures de production revient donc à culpabiliser les uns et absoudre les autres.

Une approche plus juste combinerait régulation (interdiction des pratiques les plus destructrices), transparence obligatoire, et démocratisation du durable par le prix. Sinon, le marché continuera de vendre de la bonne conscience à ceux qui peuvent se l'offrir.`,
        questions: [
          { id: 'R1', type: 'open', text: 'Quel paradoxe le texte met-il en lumière concernant la consommation éthique ?', points: 4 },
          { id: 'R2', type: 'mcq', text: 'Selon les sociologues cités, consommer autrement suppose surtout :', points: 2, options: ['A. Uniquement de la volonté', 'B. Du temps, de l\'information et souvent un surplus monétaire', 'C. L\'interdiction de toute publicité', 'D. Un diplôme universitaire'] },
          { id: 'R3', type: 'open', text: 'Pourquoi individualiser l\'éthique de consommation est-il critiqué ?', points: 4 },
          { id: 'R4', type: 'tf', text: 'Le texte propose uniquement de laisser le marché s\'autoréguler.', points: 2 },
          { id: 'R5', type: 'open', text: 'Quels leviers une approche plus juste combinerait-elle ?', points: 4 },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'Inflation de signes de vertu vs accessibilité réelle limitée', acceptableAnswers: ['paradoxe', 'accessib', 'labels', 'prix'], justificationRequired: false, points: 4 },
          { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'temps', 'information', 'prix'], justificationRequired: false, points: 2 },
          { questionId: 'R3', correctAnswer: 'Culpabilise les ménages précaires sans toucher aux structures', acceptableAnswers: ['culpabil', 'structures', 'individuel'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 2 },
          { questionId: 'R5', correctAnswer: 'Régulation, transparence, démocratisation du durable par le prix', acceptableAnswers: ['régulation', 'transparence', 'prix'], justificationRequired: false, points: 4 },
        ],
      },
      writing: {
        dossier: [
          { title: 'Document 1', text: `Une étude montre que 70 % des consommateurs se disent prêts à payer plus pour un produit éthique, mais seuls 18 % le font régulièrement.` },
          { title: 'Document 2', text: `Des associations dénoncent le greenwashing et demandent des labels officiels contrôlés.` },
          { title: 'Document 3', text: `Des PME de l'économie circulaire peinent à concurrencer les prix des grands distributeurs.` },
        ],
        problematique: 'Comment rendre la consommation éthique accessible au plus grand nombre ?',
        synthesisPrompt: 'Synthèse objective (200–240 mots) des documents.',
        essayPrompt: 'Essai argumenté (250 mots min.) répondant à la problématique.',
      },
      speaking: {
        dossier: [
          { title: 'Document A', text: `Le bonus réparation vise à allonger la durée de vie des appareils, mais son montant reste limité.` },
          { title: 'Document B', text: `Les campagnes de boycott sur les réseaux sociaux peuvent faire plier certaines marques en quelques jours.` },
        ],
        instructions: `Exposé 8–10 minutes sur la consommation éthique. Puis répondez aux questions à l'écran (pratique orale).`,
        examinerQuestions: [
          'Le consommateur est-il vraiment libre de ses choix ?',
          'Faut-il interdire le greenwashing, et comment ?',
          'La réparation peut-elle concurrencer le neuf à grande échelle ?',
        ],
      },
    },
  },
  {
    slug: 'paper-06',
    title: 'DALF C1 — Family & Education',
    theme: 'Family and education',
    audioKeys: audio('paper-06'),
    content: {
      listening: {
        longDocument: {
          transcript: `Grand entretien. Invité : Thomas Leroy, sociologue de la famille et de l'éducation.

Thomas Leroy : La parentalité contemporaine est prise en tenaille entre deux injonctions : réussir l'enfant et respecter son autonomie. Les réseaux sociaux amplifient cette pression en exposant des modèles parentaux idéalisés.

Présentatrice : Et l'école dans tout ça ?

Thomas Leroy : L'école concentre les attentes de mobilité sociale. Or, les inégalités scolaires se forment très tôt, souvent avant même l'entrée en primaire. Les familles les mieux informées anticipent, choisissent, accompagent. Les autres subissent un système opaque.

Présentatrice : Faut-il davantage de mixité sociale ?

Thomas Leroy : Oui, mais pas seulement par la carte scolaire. Il faut aussi des moyens pour les établissements, une formation des enseignants aux biais, et une politique du logement qui évite la ségrégation urbaine. Sinon, la mixité reste un slogan.`,
          questions: [
            { id: 'L1', type: 'open', text: 'Quelles deux injonctions pèsent sur la parentalité selon Thomas Leroy ?', points: 3 },
            { id: 'L2', type: 'mcq', text: 'Les réseaux sociaux, selon lui :', points: 2, options: ['A. Réduisent la pression parentale', 'B. Amplifient la pression via des modèles idéalisés', 'C. Remplacent l\'école', 'D. N\'ont aucun effet'] },
            { id: 'L3', type: 'tf', text: 'Les inégalités scolaires ne commencent qu\'au collège.', points: 1 },
            { id: 'L4', type: 'open', text: 'Comment les familles informées se distinguent-elles ?', points: 3 },
            { id: 'L5', type: 'open', text: 'Outre la carte scolaire, que faut-il pour une vraie mixité ?', points: 3 },
            { id: 'L6', type: 'mcq', text: 'Sans ces conditions, la mixité reste selon lui :', points: 2, options: ['A. Une réalité partout', 'B. Un slogan', 'C. Une interdiction', 'D. Un modèle unique'] },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'Réussir l\'enfant et respecter son autonomie', acceptableAnswers: ['réussir', 'autonomie'], justificationRequired: false, points: 3 },
            { questionId: 'L2', correctAnswer: 'B', acceptableAnswers: ['B', 'pression', 'idéalisés'], justificationRequired: false, points: 2 },
            { questionId: 'L3', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            { questionId: 'L4', correctAnswer: 'Anticipent, choisissent, accompagnent', acceptableAnswers: ['anticip', 'choisissent', 'accompagn'], justificationRequired: false, points: 3 },
            { questionId: 'L5', correctAnswer: 'Moyens, formation aux biais, politique du logement', acceptableAnswers: ['moyens', 'biais', 'logement'], justificationRequired: false, points: 3 },
            { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'slogan'], justificationRequired: false, points: 2 },
          ],
        },
        shortDocuments: [
          {
            transcript: `Selon une étude du CNRS, le temps d'écran quotidien des enfants de 8 à 12 ans a augmenté de 40 minutes en moyenne depuis 2020.`,
            questions: [
              { id: 'S1', type: 'open', text: 'Quelle hausse du temps d\'écran est mesurée ?', points: 2 },
              { id: 'S2', type: 'tf', text: 'L\'étude concerne les enfants de 8 à 12 ans.', points: 1 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: '40 minutes en moyenne depuis 2020', acceptableAnswers: ['40', 'minutes'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 1 },
            ],
          },
          {
            transcript: `Une expérimentation dans douze collèges teste l'interdiction du téléphone portable pendant toute la journée scolaire, y compris la pause déjeuner.`,
            questions: [
              { id: 'S3', type: 'mcq', text: 'L\'expérimentation porte sur :', points: 2, options: ['A. Douze lycées', 'B. Douze collèges', 'C. Toute la France', 'D. Les universités'] },
              { id: 'S4', type: 'open', text: 'La pause déjeuner est-elle concernée ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'B', acceptableAnswers: ['B', 'collèges'], justificationRequired: false, points: 2 },
              { questionId: 'S4', correctAnswer: 'Oui, y compris la pause déjeuner', acceptableAnswers: ['oui', 'déjeuner'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `L'égalité des chances scolaires demeure un horizon plus qu'une réalité. Malgré la massification de l'enseignement secondaire, les trajectoires restent fortement corrélées à l'origine sociale. Ce n'est pas seulement une question de « mérite » : c'est une question de ressources culturelles, de capital informationnel, et de capacité à naviguer dans un système complexe.

Les politiques de discrimination positive ont produit des résultats mitigés. Certaines ouvrent des portes ; d'autres stigmatisent. Le débat actuel oppose ceux qui veulent recentrer l'école sur les fondamentaux et ceux qui insistent sur l'accompagnement global de l'élève. Or, ces deux exigences ne sont pas contradictoires : sans maîtrise langagière et numérique, l'autonomie promise reste fictive ; sans soutien social, le talent se perd.

Une école juste doit donc combiner exigence intellectuelle et filet de sécurité — et reconnaître que la famille n'est pas un acteur neutre, mais un facteur décisif de réussite.`,
        questions: [
          { id: 'R1', type: 'open', text: 'Pourquoi l\'égalité des chances est-elle présentée comme un horizon plus qu\'une réalité ?', points: 4 },
          { id: 'R2', type: 'mcq', text: 'Selon le texte, les trajectoires scolaires sont fortement liées :', points: 2, options: ['A. Au hasard', 'B. À l\'origine sociale', 'C. Uniquement au QI', 'D. Au sport'] },
          { id: 'R3', type: 'open', text: 'Quel bilan est fait des politiques de discrimination positive ?', points: 4 },
          { id: 'R4', type: 'tf', text: 'Le texte juge contradictoires fondamentaux et accompagnement global.', points: 2 },
          { id: 'R5', type: 'open', text: 'Quel rôle la famille joue-t-elle selon l\'auteur ?', points: 4 },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'Trajectoires encore corrélées à l\'origine sociale malgré la massification', acceptableAnswers: ['origine sociale', 'corrél', 'massification'], justificationRequired: false, points: 4 },
          { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'origine sociale'], justificationRequired: false, points: 2 },
          { questionId: 'R3', correctAnswer: 'Résultats mitigés : ouvrent des portes / stigmatisent', acceptableAnswers: ['mitigés', 'stigmat'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 2 },
          { questionId: 'R5', correctAnswer: 'Facteur décisif de réussite, non neutre', acceptableAnswers: ['décisif', 'réussite', 'neutre'], justificationRequired: false, points: 4 },
        ],
      },
      writing: {
        dossier: [
          { title: 'Document 1', text: `Les écarts de réussite entre élèves selon le milieu social restent stables depuis vingt ans dans plusieurs indicateurs nationaux.` },
          { title: 'Document 2', text: `Des parents d'élèves demandent plus de transparence sur l'orientation et l'affectation.` },
          { title: 'Document 3', text: `Des enseignants signalent un manque de moyens pour l'accompagnement personnalisé dans les établissements défavorisés.` },
        ],
        problematique: 'Comment réduire concrètement les inégalités scolaires sans baisser le niveau d\'exigence ?',
        synthesisPrompt: 'Synthèse objective (200–240 mots) des documents.',
        essayPrompt: 'Essai argumenté (250 mots min.) sur la problématique.',
      },
      speaking: {
        dossier: [
          { title: 'Document A', text: `L'interdiction du téléphone au collège est présentée comme un levier de concentration, mais son application varie fortement.` },
          { title: 'Document B', text: `Le temps parental passé sur les devoirs est très inégal selon les milieux.` },
        ],
        instructions: `Exposé 8–10 minutes sur famille, école et inégalités. Puis questions à l'écran.`,
        examinerQuestions: [
          'La réussite scolaire est-elle encore un ascenseur social ?',
          'Faut-il interdire les téléphones à l\'école ?',
          'Quel rôle doivent jouer les parents sans aggraver les inégalités ?',
        ],
      },
    },
  },
  {
    slug: 'paper-07',
    title: 'DALF C1 — Urbanism & City Transformation',
    theme: 'Urbanism and city transformation',
    audioKeys: audio('paper-07'),
    content: {
      listening: {
        longDocument: {
          transcript: `Débat. Urbanisme et transformation des villes. Avec Léa Moretti, architecte, et Paul N'Guessan, élu local.

Léa Moretti : Densifier les centres sans les asphyxier, voilà le défi. On construit trop souvent des tours sans services publics, sans espaces verts, sans commerces de proximité. Le résultat : des quartiers dortoirs.

Paul N'Guessan : Je suis d'accord sur le diagnostic, mais les maires sont coincés entre la loi et le budget. On nous demande plus de logements sociaux, plus de mobilité douce, et moins d'impôts. Il faut des financements pluriannuels stables.

Léa Moretti : Et la participation citoyenne ? Trop souvent, les concerts publics arrivent trop tard, quand le projet est déjà figé. Il faudrait co-concevoir dès l'esquisse.

Paul N'Guessan : Nous testons des ateliers de quartier avec maquettes et budgets participatifs. Ce n'est pas magique, mais cela réduit les conflits plus tard.`,
          questions: [
            { id: 'L1', type: 'open', text: 'Quel défi Léa Moretti formule-t-elle au début ?', points: 3 },
            { id: 'L2', type: 'mcq', text: 'Selon elle, construire des tours sans services produit :', points: 2, options: ['A. Des centres touristiques', 'B. Des quartiers dortoirs', 'C. Plus de mixité', 'D. Moins de densification'] },
            { id: 'L3', type: 'open', text: 'Quelle contrainte Paul N\'Guessan met-il en avant pour les maires ?', points: 3 },
            { id: 'L4', type: 'tf', text: 'Léa Moretti juge les concerts publics toujours trop tardives.', points: 1 },
            { id: 'L5', type: 'open', text: 'Quelles pratiques Paul N\'Guessan dit tester ?', points: 3 },
            { id: 'L6', type: 'mcq', text: 'Ces pratiques visent surtout à :', points: 2, options: ['A. Augmenter les impôts', 'B. Réduire les conflits plus tard', 'C. Supprimer les logements sociaux', 'D. Interdire les tours'] },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'Densifier les centres sans les asphyxier', acceptableAnswers: ['densifier', 'asphyx'], justificationRequired: false, points: 3 },
            { questionId: 'L2', correctAnswer: 'B', acceptableAnswers: ['B', 'dortoirs'], justificationRequired: false, points: 2 },
            { questionId: 'L3', correctAnswer: 'Coincés entre loi et budget / exigences contradictoires', acceptableAnswers: ['budget', 'loi', 'financements'], justificationRequired: false, points: 3 },
            { questionId: 'L4', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 1 },
            { questionId: 'L5', correctAnswer: 'Ateliers de quartier, maquettes, budgets participatifs', acceptableAnswers: ['ateliers', 'maquettes', 'participatifs'], justificationRequired: false, points: 3 },
            { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'conflits'], justificationRequired: false, points: 2 },
          ],
        },
        shortDocuments: [
          {
            transcript: `La ville de Lyon annonce la création de quinze kilomètres de pistes cyclables sécurisées d'ici 2027, financés en partie par l'État.`,
            questions: [
              { id: 'S1', type: 'open', text: 'Combien de kilomètres de pistes sont annoncés ?', points: 2 },
              { id: 'S2', type: 'tf', text: 'Le financement est entièrement municipal.', points: 1 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: '15 kilomètres', acceptableAnswers: ['15', 'quinze'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            ],
          },
          {
            transcript: `Un rapport alerte sur la disparition progressive des commerces de proximité dans les centres-villes de moins de vingt mille habitants.`,
            questions: [
              { id: 'S3', type: 'mcq', text: 'Le rapport concerne surtout les villes de :', points: 2, options: ['A. Plus d\'un million d\'habitants', 'B. Moins de 20 000 habitants', 'C. Uniquement Paris', 'D. Zones rurales isolées seulement'] },
              { id: 'S4', type: 'open', text: 'Quel phénomène est dénoncé ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'B', acceptableAnswers: ['B', '20 000', 'vingt mille'], justificationRequired: false, points: 2 },
              { questionId: 'S4', correctAnswer: 'Disparition des commerces de proximité', acceptableAnswers: ['commerces', 'proximité', 'disparition'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `La ville contemporaine est un champ de tensions : densifier pour limiter l'étalement urbain, tout en préservant la qualité de vie ; accueillir de nouveaux habitants, tout en évitant la gentrification ; accélérer la transition écologique, tout en respectant les temporalités démocratiques locales.

Les grands projets d'aménagement échouent souvent non faute d'expertise technique, mais faute de légitimité sociale. Quand les riverains découvrent un chantier déjà décidé, la contestation devient le seul langage disponible. Inversement, des processus participatifs trop flous produisent de la frustration et ralentissent l'action.

Une urbanité durable exige donc des instruments hybrides : règles claires, financements stables, et co-conception réelle — pas seulement de la communication. La ville n'est pas un décor ; c'est un bien commun conflictuel qu'il faut gouverner.`,
        questions: [
          { id: 'R1', type: 'open', text: 'Quelles tensions définissent la ville contemporaine selon le texte ?', points: 4 },
          { id: 'R2', type: 'mcq', text: 'Les grands projets échouent souvent faute de :', points: 2, options: ['A. Logiciels de CAO', 'B. Légitimité sociale', 'C. Ciment', 'D. Touristes'] },
          { id: 'R3', type: 'open', text: 'Que se passe-t-il lorsque les riverains découvrent un chantier déjà décidé ?', points: 4 },
          { id: 'R4', type: 'tf', text: 'Le texte juge suffisante la seule communication autour des projets.', points: 2 },
          { id: 'R5', type: 'open', text: 'Quels instruments hybrides sont recommandés ?', points: 4 },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'Densifier/qualité de vie ; accueillir/gentrification ; écologie/démocratie locale', acceptableAnswers: ['densif', 'gentrif', 'écolog', 'démocr'], justificationRequired: false, points: 4 },
          { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'légitimité'], justificationRequired: false, points: 2 },
          { questionId: 'R3', correctAnswer: 'La contestation devient le seul langage disponible', acceptableAnswers: ['contestation'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 2 },
          { questionId: 'R5', correctAnswer: 'Règles claires, financements stables, co-conception réelle', acceptableAnswers: ['règles', 'financements', 'co-conception'], justificationRequired: false, points: 4 },
        ],
      },
      writing: {
        dossier: [
          { title: 'Document 1', text: `La loi impose aux communes des objectifs de densification, sous peine de sanctions financières.` },
          { title: 'Document 2', text: `Des collectifs d'habitants contestent des tours de logements sans équipements publics prévus.` },
          { title: 'Document 3', text: `Un observatoire montre que les budgets participatifs restent souvent inférieurs à 1 % du budget municipal.` },
        ],
        problematique: 'Comment densifier les villes tout en préservant la démocratie locale et la qualité de vie ?',
        synthesisPrompt: 'Synthèse objective (200–240 mots) des documents.',
        essayPrompt: 'Essai argumenté (250 mots min.) sur la problématique.',
      },
      speaking: {
        dossier: [
          { title: 'Document A', text: `Les pistes cyclables sécurisées réduisent les accidents, mais se heurtent parfois aux commerçants qui craignent la perte de places de stationnement.` },
          { title: 'Document B', text: `La participation citoyenne est plus efficace lorsqu'elle intervient dès la phase d'esquisse.` },
        ],
        instructions: `Exposé 8–10 minutes sur l'urbanisme contemporain. Puis questions à l'écran.`,
        examinerQuestions: [
          'Densifier est-il compatible avec la qualité de vie ?',
          'Comment éviter que la participation citoyenne reste cosmétique ?',
          'Qui doit financer les équipements publics des nouveaux quartiers ?',
        ],
      },
    },
  },
  {
    slug: 'paper-08',
    title: 'DALF C1 — Science & Technology',
    theme: 'Science and technology',
    audioKeys: audio('paper-08'),
    content: {
      listening: {
        longDocument: {
          transcript: `Sciences et société. Invité : Docteur Amina Khelifi, chercheuse en biotechnologies.

Amina Khelifi : Les thérapies géniques progressent rapidement, mais l'accès reste inégal. Les coûts de traitement peuvent dépasser plusieurs centaines de milliers d'euros par patient. Sans régulation, on risque une médecine à deux vitesses.

Présentateur : Et la question éthique ?

Amina Khelifi : Elle est centrale. Modifier le génome soulève des questions de consentement, de transmissibilité aux générations futures, et de définition du normal. Il faut des comités indépendants, une transparence des essais, et un débat public informé, pas seulement des décisions technocratiques.

Présentateur : L'Europe est-elle en retard ?

Amina Khelifi : Sur le financement de la recherche fondamentale, parfois. Sur le cadre éthique, elle est plutôt en avance. Le défi, c'est d'allier innovation et justice d'accès.`,
          questions: [
            { id: 'L1', type: 'open', text: 'Quel paradoxe Amina Khelifi décrit-elle concernant les thérapies géniques ?', points: 3 },
            { id: 'L2', type: 'mcq', text: 'Sans régulation, elle craint :', points: 2, options: ['A. La fin de la recherche', 'B. Une médecine à deux vitesses', 'C. L\'interdiction totale', 'D. La baisse des coûts uniquement'] },
            { id: 'L3', type: 'open', text: 'Quelles questions éthiques cite-t-elle ?', points: 3 },
            { id: 'L4', type: 'tf', text: 'Elle juge suffisantes les seules décisions technocratiques.', points: 1 },
            { id: 'L5', type: 'open', text: 'Comment situe-t-elle l\'Europe sur le financement et l\'éthique ?', points: 3 },
            { id: 'L6', type: 'mcq', text: 'Le défi final qu\'elle formule est d\'allier :', points: 2, options: ['A. Marketing et brevets', 'B. Innovation et justice d\'accès', 'C. Tourisme et santé', 'D. Sport et science'] },
          ],
          answerKey: [
            { questionId: 'L1', correctAnswer: 'Progrès rapide mais accès inégal / coûts très élevés', acceptableAnswers: ['accès', 'coûts', 'inégal'], justificationRequired: false, points: 3 },
            { questionId: 'L2', correctAnswer: 'B', acceptableAnswers: ['B', 'deux vitesses'], justificationRequired: false, points: 2 },
            { questionId: 'L3', correctAnswer: 'Consentement, transmissibilité, définition du normal', acceptableAnswers: ['consentement', 'transmiss', 'normal'], justificationRequired: false, points: 3 },
            { questionId: 'L4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 1 },
            { questionId: 'L5', correctAnswer: 'Financement parfois en retard ; cadre éthique plutôt en avance', acceptableAnswers: ['financement', 'éthique', 'avance'], justificationRequired: false, points: 3 },
            { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'innovation', 'justice'], justificationRequired: false, points: 2 },
          ],
        },
        shortDocuments: [
          {
            transcript: `L'Agence européenne des médicaments a autorisé un nouveau traitement contre une maladie génétique rare touchant environ deux mille patients en Europe.`,
            questions: [
              { id: 'S1', type: 'open', text: 'Combien de patients approximativement sont concernés en Europe ?', points: 2 },
              { id: 'S2', type: 'tf', text: 'Le traitement a été autorisé par l\'Agence européenne des médicaments.', points: 1 },
            ],
            answerKey: [
              { questionId: 'S1', correctAnswer: 'Environ 2000', acceptableAnswers: ['2000', 'deux mille'], justificationRequired: false, points: 2 },
              { questionId: 'S2', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai'], justificationRequired: false, points: 1 },
            ],
          },
          {
            transcript: `Une pétition de scientifiques demande un moratoire sur certaines modifications germinales tant qu'un consensus international n'est pas atteint.`,
            questions: [
              { id: 'S3', type: 'mcq', text: 'La pétition demande :', points: 2, options: ['A. Une accélération des essais', 'B. Un moratoire', 'C. La privatisation de la recherche', 'D. L\'arrêt de toute médecine'] },
              { id: 'S4', type: 'open', text: 'Quelle condition est mentionnée pour lever le moratoire ?', points: 2 },
            ],
            answerKey: [
              { questionId: 'S3', correctAnswer: 'B', acceptableAnswers: ['B', 'moratoire'], justificationRequired: false, points: 2 },
              { questionId: 'S4', correctAnswer: 'Un consensus international', acceptableAnswers: ['consensus', 'international'], justificationRequired: false, points: 2 },
            ],
          },
        ],
      },
      reading: {
        text: `La biotechnologie place les sociétés devant un dilemme classique accéléré : innover vite pour sauver des vies, ou ralentir pour garantir l'équité et la prudence. Historiquement, chaque rupture médicale a redistribué le pouvoir — entre patients, cliniciens, industriels et États.

Aujourd'hui, le coût des thérapies avancées transforme l'accès aux soins en enjeu budgétaire majeur. Les assureurs et les systèmes publics doivent arbitrer entre rareté et universalité. Parallèlement, le débat éthique ne peut être confisqué par les seuls experts : la définition du « normal », du « pathologique » et du « perfectible » engage toute la cité.

Une gouvernance responsable combinerait : évaluation indépendante des bénéfices/risques, plafonds de prix ou modèles de paiement à la performance, et forums citoyens permanents. L'innovation sans justice d'accès n'est qu'une promesse pour quelques-uns.`,
        questions: [
          { id: 'R1', type: 'open', text: 'Quel dilemme le texte attribue-t-il à la biotechnologie ?', points: 4 },
          { id: 'R2', type: 'mcq', text: 'Le coût des thérapies avancées transforme surtout l\'accès aux soins en :', points: 2, options: ['A. Enjeu touristique', 'B. Enjeu budgétaire majeur', 'C. Sujet secondaire', 'D. Problème purement technique'] },
          { id: 'R3', type: 'open', text: 'Pourquoi le débat éthique ne doit-il pas être confisqué par les seuls experts ?', points: 4 },
          { id: 'R4', type: 'tf', text: 'Le texte propose uniquement de laisser les industriels fixer les prix.', points: 2 },
          { id: 'R5', type: 'open', text: 'Quels éléments une gouvernance responsable combinerait-elle ?', points: 4 },
        ],
        answerKey: [
          { questionId: 'R1', correctAnswer: 'Innover vite pour sauver des vies vs ralentir pour équité et prudence', acceptableAnswers: ['innover', 'équité', 'prudence'], justificationRequired: false, points: 4 },
          { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'budgétaire'], justificationRequired: false, points: 2 },
          { questionId: 'R3', correctAnswer: 'Les notions de normal/pathologique/perfectible engagent toute la cité', acceptableAnswers: ['normal', 'cité', 'experts'], justificationRequired: false, points: 4 },
          { questionId: 'R4', correctAnswer: 'Faux', acceptableAnswers: ['Faux'], justificationRequired: false, points: 2 },
          { questionId: 'R5', correctAnswer: 'Évaluation indépendante, plafonds/paiement à la performance, forums citoyens', acceptableAnswers: ['évaluation', 'prix', 'citoyens'], justificationRequired: false, points: 4 },
        ],
      },
      writing: {
        dossier: [
          { title: 'Document 1', text: `Le prix moyen de certaines thérapies géniques dépasse 300 000 euros par patient.` },
          { title: 'Document 2', text: `Des associations de patients demandent un accès équitable et une transparence sur les essais cliniques.` },
          { title: 'Document 3', text: `Des chercheurs plaident pour un financement public accru de la recherche fondamentale européenne.` },
        ],
        problematique: 'Comment concilier innovation biotechnologique et justice d\'accès aux soins ?',
        synthesisPrompt: 'Synthèse objective (200–240 mots) des documents.',
        essayPrompt: 'Essai argumenté (250 mots min.) sur la problématique.',
      },
      speaking: {
        dossier: [
          { title: 'Document A', text: `Les comités d'éthique accélèrent parfois trop lentement face à l'urgence clinique.` },
          { title: 'Document B', text: `Sans débat public, les décisions technocratiques perdent en légitimité.` },
        ],
        instructions: `Exposé 8–10 minutes sur science, éthique et accès aux soins. Puis questions à l'écran.`,
        examinerQuestions: [
          'Faut-il un moratoire sur certaines modifications génétiques ?',
          'Qui doit payer les thérapies extrêmement coûteuses ?',
          'Comment associer les citoyens au débat scientifique ?',
        ],
      },
    },
  },
];
