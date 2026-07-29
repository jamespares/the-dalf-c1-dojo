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
    listeningLong: `/papers/${slug}/audio/long.wav`,
    listeningShort: [
      `/papers/${slug}/audio/short-1.wav`,
      `/papers/${slug}/audio/short-2.wav`,
    ],
  };
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
            { id: 'L2', type: 'tf', text: 'La baissede température mesurée est uniquement cosmétique et non mesurable.', points: 1 },
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
];
