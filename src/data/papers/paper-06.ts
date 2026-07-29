import type { StaticPaper } from './types';
import { audio } from './audio';

export const PAPER_06: StaticPaper = {
  slug: 'paper-06',
  title: 'DALF C1 — Family & Education',
  theme: 'Family and education',
  audioKeys: audio('paper-06'),
  content: {
    listening: {
      longDocument: {
        transcript: `Grand entretien. Présentatrice : Camille Rousseau. Invité : Thomas Leroy, sociologue de la famille et de l'éducation, chercheur au CNRS.

Camille Rousseau : Thomas Leroy, vous parlez d'une parentalité contemporaine « prise en tenaille ». Que voulez-vous dire ?

Thomas Leroy : Les parents d'aujourd'hui sont confrontés à deux injonctions simultanées et parfois contradictoires : réussir l'enfant — au sens scolaire, social, émotionnel — et respecter son autonomie, sa parole, son rythme. Ces deux exigences ne sont pas absurdes, mais leur combinaison produit une pression considérable. Les réseaux sociaux amplifient cette pression en exposant des modèles parentaux idéalisés : maisons ordonnées, enfants épanouis, activités enrichissantes. Or, ces images masquent les conditions matérielles et le capital culturel qui les rendent possibles.

Camille Rousseau : Et l'école dans tout cela ?

Thomas Leroy : L'école concentre les attentes de mobilité sociale. Pour beaucoup de familles, elle reste le principal vecteur d'ascension — ou du moins l'espoir d'éviter le déclassement. Mais les inégalités scolaires se forment très tôt, souvent avant même l'entrée en primaire. Le langage, le rapport au livre, la familiarité avec les attentes implicites de l'institution : tout cela se joue dans la famille et dans l'environnement social. Les familles les mieux informées anticipent, choisissent les établissements, accompagnent les devoirs, négocient l'orientation. Les autres subissent un système opaque, où les règles non écrites comptent autant que les notes.

Camille Rousseau : On parle beaucoup de mixité sociale. Est-ce la solution ?

Thomas Leroy : La mixité est nécessaire, mais elle ne se décrète pas par la seule carte scolaire. Si l'on se contente de redistribuer administrativement les élèves sans donner de moyens aux établissements, sans former les enseignants aux biais et aux pratiques inclusives, et sans agir sur le logement qui produit la ségrégation urbaine, alors la mixité reste un slogan. On place des enfants de milieux différents dans les mêmes murs, mais on ne crée pas forcément des conditions d'apprentissage équitables. Pire : dans certains cas, les stratégies d'évitement des familles favorisées se renforcent — options, établissements privés, déménagements.

Camille Rousseau : Les écrans sont-ils devenus le nouveau front éducatif ?

Thomas Leroy : Ils sont un symptôme autant qu'un enjeu. Le temps d'écran a augmenté, notamment depuis 2020, et les parents se sentent démunis. Mais interdire sans accompagner, c'est encore une fois reporter sur la famille une responsabilité collective. L'école peut jouer un rôle — régulation du téléphone, éducation aux médias — à condition que la règle soit claire, appliquée équitablement, et articulée à un projet pédagogique. Sinon, on ajoute une injonction de plus sans réduire les inégalités numériques, qui sont aussi des inégalités de médiation parentale.

Camille Rousseau : Faut-il davantage d'accompagnement personnalisé ?

Thomas Leroy : Oui, mais pas comme un gadget. L'accompagnement personnalisé exige du temps enseignant, des personnels spécialisés, des espaces, une coordination avec les familles. Or, dans les établissements les plus défavorisés, ces ressources manquent précisément là où le besoin est le plus fort. On obtient alors un paradoxe cruel : les élèves qui auraient le plus besoin d'un suivi individualisé sont ceux qui en bénéficient le moins. C'est l'inverse d'une politique d'égalité réelle.

Camille Rousseau : Que répondez-vous à ceux qui veulent recentrer l'école uniquement sur les fondamentaux ?

Thomas Leroy : Les fondamentaux — lecture, écriture, calcul, maîtrise langagière — sont indispensables. Sans eux, l'autonomie promise reste fictive. Mais les opposer à l'accompagnement social est une fausse alternative. Un élève qui maîtrise mal la langue et qui vit dans l'insécurité matérielle a besoin des deux. L'exigence intellectuelle et le filet de sécurité ne s'excluent pas : ils se conditionnent mutuellement. Une école juste combine les deux, et reconnaît que la famille n'est pas un acteur neutre, mais un facteur décisif de réussite — d'où la nécessité de politiques qui soutiennent les parents sans les culpabiliser.

Camille Rousseau : Un dernier mot pour conclure ?

Thomas Leroy : Tant que l'on traitera les inégalités scolaires comme un problème de mérite individuel, on manquera l'essentiel. Ce sont des inégalités de ressources, d'information et de pouvoir dans un système complexe. Les réduire exige de la mixité réelle, des moyens ciblés, et une alliance lucide entre école et familles.

Camille Rousseau : Vous insistez sur l'intervention précoce. Que sait-on précisément ?

Thomas Leroy : Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure une priorité absolue.

Camille Rousseau : Quid de la stabilité des équipes enseignantes ?

Thomas Leroy : C'est décisif. Or les établissements les plus exposés connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme. Stabiliser les équipes fait partie de l'égalité réelle.

Camille Rousseau : Comment améliorer concrètement l'information sur l'orientation ?

Thomas Leroy : Par une information claire, précoce et multilingue, et en formant les enseignants à repérer les biais d'attente. Les partenariats hors les murs — étude, sport, culture — réduisent aussi l'isolement éducatif des élèves les moins équipés en ressources familiales.`,
        questions: [
          {
            id: 'L1',
            type: 'open',
            text: 'Quelles deux injonctions pèsent sur la parentalité selon Thomas Leroy ? Reformulez.',
            points: 3,
          },
          {
            id: 'L2',
            type: 'mcq',
            text: 'Les réseaux sociaux, selon lui :',
            points: 2,
            options: [
              'A. Réduisent la pression parentale',
              'B. Amplifient la pression via des modèles parentaux idéalisés',
              'C. Remplacent entièrement l\'école',
              'D. N\'ont aucun effet mesurable',
            ],
          },
          {
            id: 'L3',
            type: 'tf',
            text: 'Selon Thomas Leroy, les inégalités scolaires ne commencent qu\'au collège.',
            points: 1,
          },
          {
            id: 'L4',
            type: 'open',
            text: 'Comment les familles les mieux informées se distinguent-elles dans le système scolaire ?',
            points: 3,
          },
          {
            id: 'L5',
            type: 'open',
            text: 'Outre la carte scolaire, que faut-il selon lui pour une vraie mixité ? Justifiez.',
            points: 3,
            hint: 'Reformulez les trois conditions mentionnées.',
          },
          {
            id: 'L6',
            type: 'mcq',
            text: 'Concernant les écrans, il estime surtout que :',
            points: 2,
            options: [
              'A. Il suffit d\'interdire sans accompagnement',
              'B. L\'enjeu relève uniquement des parents',
              'C. L\'interdiction sans accompagnement reporte une responsabilité collective sur la famille',
              'D. Les écrans n\'ont aucun lien avec les inégalités',
            ],
          },
          {
            id: 'L7',
            type: 'open',
            text: 'Quel paradoxe décrit-il à propos de l\'accompagnement personnalisé ?',
            points: 3,
          },
          {
            id: 'L8',
            type: 'tf',
            text: 'Il juge contradictoires fondamentaux scolaires et accompagnement social.',
            points: 1,
          },
          {
            id: 'L9',
            type: 'open',
            text: 'Quel rôle attribue-t-il à la famille dans la réussite scolaire ?',
            points: 3,
          },
          {
            id: 'L10',
            type: 'mcq',
            text: 'Sa conclusion invite à traiter les inégalités scolaires comme :',
            points: 2,
            options: [
              'A. Un problème de mérite individuel uniquement',
              'B. Des inégalités de ressources, d\'information et de pouvoir',
              'C. Une fatalité biologique',
              'D. Un sujet purement budgétaire sans lien avec les familles',
            ],
          },
        ],
        answerKey: [
          {
            questionId: 'L1',
            correctAnswer: 'Réussir l\'enfant et respecter son autonomie',
            acceptableAnswers: ['réussir', 'autonomie'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L2',
            correctAnswer: 'B',
            acceptableAnswers: ['B', 'pression', 'idéalisés'],
            justificationRequired: false,
            points: 2,
          },
          {
            questionId: 'L3',
            correctAnswer: 'Faux',
            acceptableAnswers: ['Faux'],
            justificationRequired: true,
            points: 1,
          },
          {
            questionId: 'L4',
            correctAnswer: 'Anticipent, choisissent les établissements, accompagnent, négocient l\'orientation',
            acceptableAnswers: ['anticip', 'choisissent', 'accompagn', 'orientation'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L5',
            correctAnswer: 'Moyens pour les établissements, formation aux biais, politique du logement anti-ségrégation',
            acceptableAnswers: ['moyens', 'biais', 'logement', 'ségrégation'],
            justificationRequired: true,
            points: 3,
          },
          {
            questionId: 'L6',
            correctAnswer: 'C',
            acceptableAnswers: ['C', 'responsabilité', 'famille'],
            justificationRequired: false,
            points: 2,
          },
          {
            questionId: 'L7',
            correctAnswer:
              'Les élèves qui en auraient le plus besoin en bénéficient le moins faute de moyens dans les établissements défavorisés',
            acceptableAnswers: ['paradoxe', 'besoin', 'moins', 'défavorisés'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L8',
            correctAnswer: 'Faux',
            acceptableAnswers: ['Faux'],
            justificationRequired: false,
            points: 1,
          },
          {
            questionId: 'L9',
            correctAnswer: 'Facteur décisif de réussite, non neutre ; à soutenir sans culpabiliser',
            acceptableAnswers: ['décisif', 'réussite', 'neutre', 'culpabil'],
            justificationRequired: true,
            points: 3,
          },
          {
            questionId: 'L10',
            correctAnswer: 'B',
            acceptableAnswers: ['B', 'ressources', 'information', 'pouvoir'],
            justificationRequired: false,
            points: 2,
          },
        ],
      },
      shortDocuments: [
        {
          transcript: `Brève scientifique. Selon une étude du CNRS publiée ce mois-ci, le temps d'écran quotidien des enfants de 8 à 12 ans a augmenté de 40 minutes en moyenne depuis 2020. L'augmentation est plus marquée dans les foyers où les deux parents travaillent à temps plein et dans les zones où l'offre d'activités périscolaires est limitée. Les auteurs insistent : l'écran n'est pas seulement un choix parental, c'est aussi le reflet d'inégalités d'accès à des alternatives structurées.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.`,
          questions: [
            {
              id: 'S1',
              type: 'open',
              text: 'Quelle hausse du temps d\'écran est mesurée, et pour quelle tranche d\'âge ?',
              points: 2,
            },
            {
              id: 'S2',
              type: 'tf',
              text: 'L\'étude affirme que l\'augmentation est identique dans tous les milieux.',
              points: 1,
            },
            {
              id: 'S3',
              type: 'mcq',
              text: 'Selon les auteurs, le temps d\'écran reflète aussi :',
              points: 2,
              options: [
                'A. Uniquement le QI des enfants',
                'B. Des inégalités d\'accès à des alternatives structurées',
                'C. L\'interdiction totale des écrans',
                'D. La disparition de l\'école',
              ],
            },
          ],
          answerKey: [
            {
              questionId: 'S1',
              correctAnswer: '40 minutes en moyenne depuis 2020 ; enfants de 8 à 12 ans',
              acceptableAnswers: ['40', 'minutes', '8', '12'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S2',
              correctAnswer: 'Faux',
              acceptableAnswers: ['Faux'],
              justificationRequired: false,
              points: 1,
            },
            {
              questionId: 'S3',
              correctAnswer: 'B',
              acceptableAnswers: ['B', 'inégalités', 'alternatives'],
              justificationRequired: false,
              points: 2,
            },
          ],
        },
        {
          transcript: `Éducation nationale. Une expérimentation dans douze collèges teste l'interdiction du téléphone portable pendant toute la journée scolaire, y compris la pause déjeuner et les études. Les premiers retours font état d'une baisse des conflits liés aux réseaux sociaux, mais aussi de difficultés d'application lorsque les familles ne soutiennent pas la règle hors de l'établissement. Un comité de suivi doit comparer les résultats scolaires et le climat de classe avec un groupe témoin avant toute généralisation.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.`,
          questions: [
            {
              id: 'S4',
              type: 'mcq',
              text: 'L\'expérimentation porte sur :',
              points: 2,
              options: ['A. Douze lycées', 'B. Douze collèges', 'C. Toute la France', 'D. Les universités'],
            },
            {
              id: 'S5',
              type: 'open',
              text: 'La pause déjeuner est-elle concernée ? Précisez le périmètre de l\'interdiction.',
              points: 2,
            },
            {
              id: 'S6',
              type: 'tf',
              text: 'Le dispositif a déjà été généralisé à l\'échelle nationale.',
              points: 1,
            },
          ],
          answerKey: [
            {
              questionId: 'S4',
              correctAnswer: 'B',
              acceptableAnswers: ['B', 'collèges'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S5',
              correctAnswer: 'Oui : journée scolaire entière, y compris pause déjeuner et études',
              acceptableAnswers: ['oui', 'déjeuner', 'journée'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S6',
              correctAnswer: 'Faux',
              acceptableAnswers: ['Faux'],
              justificationRequired: false,
              points: 1,
            },
          ],
        },
      ],
    },
    reading: {
      text: `L'égalité des chances scolaires demeure, dans les démocraties contemporaines, un horizon plus qu'une réalité. Malgré la massification de l'enseignement secondaire et l'allongement des scolarités, les trajectoires restent fortement corrélées à l'origine sociale. Ce n'est pas seulement une question de « mérite » individuel : c'est une question de ressources culturelles, de capital informationnel, de stabilité matérielle, et de capacité à naviguer dans un système complexe dont les règles implicites échappent à une partie des familles.

Les travaux de sociologie de l'éducation ont montré, depuis plusieurs décennies, que l'école ne se contente pas de transmettre des savoirs : elle valorise aussi des manières de parler, de se tenir, de justifier une réponse, de projeter un avenir. Ces dispositions, souvent acquises dans la famille, ne sont pas également distribuées. Les enfants des classes moyennes et supérieures arrivent davantage « équipés » pour décoder les attentes enseignantes. Les autres doivent apprendre simultanément les contenus et les codes. Cette double tâche n'est pas impossible, mais elle est coûteuse, et elle pèse sur la confiance en soi autant que sur les résultats.

Les politiques de discrimination positive ont produit des résultats mitigés. Certaines ouvrent des portes — places réservées, bourses, tutorat, cordées de la réussite — et permettent à des élèves talentueux d'accéder à des filières sélectives. D'autres stigmatisent, en étiquetant des établissements ou des publics comme « à problèmes ». Le débat public oppose souvent ceux qui veulent recentrer l'école sur les fondamentaux et ceux qui insistent sur l'accompagnement global de l'élève. Or, ces deux exigences ne sont pas contradictoires. Sans maîtrise langagière, numérique et méthodologique, l'autonomie promise reste fictive. Sans soutien social — santé, logement, alimentation, suivi psychologique — le talent se perd dans les turbulences du quotidien.

La famille occupe dans ce paysage une place décisive, et c'est précisément ce qui rend la justice scolaire difficile. On ne peut ni nier le rôle parental, ni transformer chaque parent en enseignant de soutien. Les inégalités de temps passé sur les devoirs, d'accès à des cours particuliers, de maîtrise des plateformes numériques scolaires, de compréhension des procédures d'orientation créent des écarts cumulatifs. Demander aux seuls parents de « s'impliquer davantage » sans leur donner des outils, des horaires compatibles et une information claire revient à renforcer le privilège des mieux informés.

Les écrans et le téléphone portable sont devenus un révélateur de ces tensions. Leur régulation à l'école peut améliorer la concentration et le climat de classe, comme le suggèrent certaines expérimentations. Mais elle ne résout pas, à elle seule, les inégalités d'apprentissage. Pire : si la règle scolaire n'est pas relayée par des alternatives éducatives — sport, culture, accompagnement aux devoirs — elle laisse intacts les écarts hors les murs. L'école ne peut tout faire ; elle ne peut pas non plus faire comme si le hors-école n'existait pas.

Une école juste devrait donc combiner exigence intellectuelle et filet de sécurité. Cela implique des moyens ciblés pour les établissements les plus exposés, une formation des enseignants aux biais et à la différenciation pédagogique, une transparence réelle sur l'orientation, et des politiques urbaines qui réduisent la ségrégation résidentielle. La mixité sociale ne se décrète pas : elle se construit par le logement, les transports, l'offre culturelle et la qualité des établissements de proximité.

Enfin, il faut résister à deux illusions symétriques. La première consiste à croire que le mérite suffit, comme si les conditions de départ étaient égales. La seconde consiste à croire que l'école peut tout corriger sans alliance avec les familles et sans redistribution des ressources. Entre ces deux pôles, une politique lucide assume la complexité : elle exige davantage de l'institution, soutient les parents sans les culpabiliser, et refuse de transformer les inégalités sociales en destin scolaire.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.`,
      questions: [
        {
          id: 'R1',
          type: 'open',
          text: 'Pourquoi l\'égalité des chances est-elle présentée comme un horizon plus qu\'une réalité ? Reformulez.',
          points: 4,
        },
        {
          id: 'R2',
          type: 'mcq',
          text: 'Selon le texte, les trajectoires scolaires sont fortement liées :',
          points: 2,
          options: [
            'A. Au hasard',
            'B. À l\'origine sociale',
            'C. Uniquement au QI',
            'D. Au sport scolaire',
          ],
        },
        {
          id: 'R3',
          type: 'open',
          text: 'En quoi l\'école valorise-t-elle autre chose que des savoirs ? Justifiez.',
          points: 4,
        },
        {
          id: 'R4',
          type: 'open',
          text: 'Quel bilan est fait des politiques de discrimination positive ?',
          points: 4,
        },
        {
          id: 'R5',
          type: 'tf',
          text: 'Le texte juge contradictoires fondamentaux scolaires et accompagnement global.',
          points: 2,
        },
        {
          id: 'R6',
          type: 'mcq',
          text: 'Demander aux seuls parents de « s\'impliquer davantage » sans outils risque de :',
          points: 2,
          options: [
            'A. Supprimer toutes les inégalités',
            'B. Renforcer le privilège des mieux informés',
            'C. Remplacer l\'école',
            'D. Interdire les devoirs',
          ],
        },
        {
          id: 'R7',
          type: 'open',
          text: 'Pourquoi la seule interdiction du téléphone à l\'école est-elle jugée insuffisante ?',
          points: 4,
        },
        {
          id: 'R8',
          type: 'tf',
          text: 'Selon l\'auteur, la mixité sociale se décrète aisément par circulaire.',
          points: 2,
        },
        {
          id: 'R9',
          type: 'open',
          text: 'Quelles sont les deux illusions symétriques que le texte invite à refuser ?',
          points: 4,
        },
      ],
      answerKey: [
        {
          questionId: 'R1',
          correctAnswer:
            'Malgré la massification, les trajectoires restent corrélées à l\'origine sociale / aux ressources inégales',
          acceptableAnswers: ['origine sociale', 'corrél', 'massification', 'ressources'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R2',
          correctAnswer: 'B',
          acceptableAnswers: ['B', 'origine sociale'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R3',
          correctAnswer:
            'Elle valorise aussi des manières de parler, de se tenir, de justifier, de se projeter — codes inégalement acquis en famille',
          acceptableAnswers: ['codes', 'manières', 'famille', 'dispositions'],
          justificationRequired: true,
          points: 4,
        },
        {
          questionId: 'R4',
          correctAnswer: 'Résultats mitigés : ouvrent des portes / peuvent stigmatiser',
          acceptableAnswers: ['mitigés', 'stigmat', 'portes'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R5',
          correctAnswer: 'Faux',
          acceptableAnswers: ['Faux'],
          justificationRequired: true,
          points: 2,
        },
        {
          questionId: 'R6',
          correctAnswer: 'B',
          acceptableAnswers: ['B', 'privilège', 'informés'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R7',
          correctAnswer:
            'Elle n\'égalise pas les apprentissages hors l\'école sans alternatives éducatives (sport, culture, devoirs)',
          acceptableAnswers: ['insuffisante', 'hors', 'alternatives', 'inégalités'],
          justificationRequired: true,
          points: 4,
        },
        {
          questionId: 'R8',
          correctAnswer: 'Faux',
          acceptableAnswers: ['Faux'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R9',
          correctAnswer:
            '1) Le mérite suffit malgré des départs inégaux ; 2) L\'école peut tout corriger seule sans familles ni redistribution',
          acceptableAnswers: ['mérite', 'école', 'familles', 'illusions'],
          justificationRequired: false,
          points: 4,
        },
      ],
    },
    writing: {
      dossier: [
        {
          title: 'Document 1 — Indicateurs nationaux sur les écarts de réussite',
          text: `Les écarts de réussite entre élèves selon le milieu social restent stables depuis vingt ans dans plusieurs indicateurs nationaux : maîtrise de la lecture en fin d'école primaire, accès aux filières sélectives, redoublement, et orientation vers l'enseignement professionnel. La massification a augmenté le niveau moyen de diplomation, mais elle n'a pas effacé le gradient social. Les analystes soulignent que les écarts se creusent surtout aux moments de transition — entrée au collège, choix d'options, orientation post-troisième et post-bac — là où l'information familiale et l'accompagnement pèsent le plus. Sans intervention ciblée sur ces moments, les politiques générales peinent à réduire les inégalités cumulatives.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.`,
        },
        {
          title: 'Document 2 — Demande de parents d\'élèves sur l\'orientation',
          text: `Des collectifs de parents d'élèves demandent plus de transparence sur l'orientation et l'affectation. Ils dénoncent des procédures perçues comme opaques, des conseils de classe dont les attendus ne sont pas explicités, et des plateformes numériques difficiles d'accès pour les familles peu à l'aise avec l'écrit administratif. Ils réclament des réunions d'information en plusieurs langues, des guides clairs sur les attendus scolaires, et un droit de recours effectif. Selon eux, l'inégalité commence souvent non par le niveau de l'élève, mais par la capacité des parents à décoder le système et à défendre un projet.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.`,
        },
        {
          title: 'Document 3 — Alerte d\'enseignants en établissements défavorisés',
          text: `Des enseignants signalent un manque chronique de moyens pour l'accompagnement personnalisé dans les établissements défavorisés : trop peu d'heures de soutien, des postes de psychologues et d'assistants sociaux vacants, des classes surchargées, un turn-over élevé. Ils affirment que l'injonction à « individualiser » sans ressources produit de la culpabilité professionnelle plus que des progrès. Ils demandent des moyens pérennes, une formation continue, et une reconnaissance du temps de coordination avec les familles. Sans cela, disent-ils, l'égalité des chances restera un discours sans traduction budgétaire.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.`,
        },
      ],
      problematique:
        'Comment réduire concrètement les inégalités scolaires sans baisser le niveau d\'exigence intellectuelle ?',
      synthesisPrompt:
        'À partir des documents, rédigez une synthèse objective (environ 200–240 mots) présentant la persistance des écarts sociaux, les problèmes d\'orientation et le manque de moyens d\'accompagnement.',
      essayPrompt:
        'Vous rédigez un essai argumenté (250 mots minimum) répondant à la problématique. Prenez position et proposez des mesures concrètes alliant exigence et justice.',
    },
    speaking: {
      dossier: [
        {
          title: 'Document A — Téléphone au collège',
          text: `L'interdiction du téléphone au collège est présentée comme un levier de concentration et d'apaisement du climat scolaire. Les expérimentations font état d'une baisse des conflits liés aux réseaux, mais aussi d'une application très variable selon les établissements et le soutien des familles. Certains enseignants craignent un effet de façade si aucune alternative (activités, médiation, éducation aux médias) n'est proposée. La mesure technique ne remplace pas un projet éducatif.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.`,
        },
        {
          title: 'Document B — Temps parental et devoirs',
          text: `Le temps parental passé sur les devoirs est très inégal selon les milieux. Dans certains foyers, l'accompagnement quotidien est intensif ; dans d'autres, les contraintes horaires, la fatigue et la distance avec les codes scolaires limitent l'aide possible. Des chercheurs montrent que ce différentiel contribue aux écarts de réussite autant que le temps de classe. Ils recommandent des dispositifs d'aide aux devoirs à l'école, plutôt que de faire reposer toute la charge sur la famille.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.`,
        },
        {
          title: 'Document C — Mixité et logement',
          text: `La mixité scolaire bute souvent sur la ségrégation urbaine. Tant que les logements sociaux et les loyers accessibles sont concentrés dans certains quartiers, la carte scolaire reproduit la séparation sociale. Des urbanistes et des sociologues plaident pour des politiques croisées : logement, transports, qualité des établissements de proximité. Sans cela, la mixité reste un objectif affiché plus qu'une réalité vécue.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.

Les chefs d'établissement témoignent que la stabilité des équipes enseignantes est un facteur décisif de réussite collective. Or, les établissements les plus exposés aux difficultés sociales connaissent souvent le turn-over le plus élevé, ce qui fragilise tout projet pédagogique de long terme.

L'orientation scolaire et professionnelle souffre encore d'un déficit d'explicitation : beaucoup de familles découvrent trop tard les attendus des filières sélectives. Une information claire, précoce et multilingue réduirait une partie des inégalités liées au capital informationnel.

Les partenariats entre écoles, associations et collectivités peuvent offrir des espaces d'étude, de sport et de culture après la classe. Ces offres hors les murs ne remplacent pas l'enseignement, mais elles réduisent l'isolement éducatif des élèves dont les familles disposent de peu de ressources.

Il faut aussi former les enseignants à repérer et à contrer les biais d'attente : plusieurs travaux montrent que les évaluations et les conseils d'orientation peuvent, involontairement, reproduire des stéréotypes sociaux ou de genre. La réflexivité professionnelle fait partie de l'exigence démocratique de l'école.

Les recherches longitudinales confirment que les écarts de vocabulaire et de familiarité avec l'écrit apparaissent dès la petite enfance et se consolident ensuite à chaque palier d'orientation. Intervenir tôt, avec des dispositifs de qualité et non stigmatisants, demeure donc une priorité.`,
        },
      ],
      instructions: `À partir du dossier, préparez un exposé de 8–10 minutes sur famille, école et inégalités. Analysez les documents et proposez une prise de position argumentée. Puis répondez aux questions de l'examinateur.`,
      examinerQuestions: [
        'La réussite scolaire est-elle encore un ascenseur social ?',
        'Faut-il interdire les téléphones à l\'école, et sous quelles conditions ?',
        'Quel rôle doivent jouer les parents sans aggraver les inégalités ?',
        'Comment concilier exigence intellectuelle et accompagnement social ?',
      ],
    },
  },
};
