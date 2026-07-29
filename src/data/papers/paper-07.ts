import type { StaticPaper } from './types';
import { audio } from './audio';

export const PAPER_07: StaticPaper = {
  slug: 'paper-07',
  title: 'DALF C1 — Urbanism & City Transformation',
  theme: 'Urbanism and city transformation',
  audioKeys: audio('paper-07'),
  content: {
    listening: {
      longDocument: {
        transcript: `Débat. Émission « Villes en mutation ». Présentateur : Marc Lefèvre. Invités : Léa Moretti, architecte-urbaniste, et Paul N'Guessan, élu local chargé de l'aménagement.

Marc Lefèvre : Léa Moretti, vous dites que densifier les centres sans les asphyxier est le défi majeur. Expliquez-nous.

Léa Moretti : Densifier est nécessaire pour limiter l'étalement urbain, réduire les déplacements motorisés et préserver les terres agricoles. Mais on construit trop souvent des tours ou des îlots denses sans services publics, sans espaces verts, sans commerces de proximité, sans équipements culturels. Le résultat, ce sont des quartiers dortoirs : on y dort, on en part le matin, on y revient le soir. La densité n'est pas un problème en soi ; c'est la densité sans urbanité qui asphyxie.

Paul N'Guessan : Je partage le diagnostic, mais les maires sont coincés entre la loi et le budget. On nous demande plus de logements sociaux, plus de mobilité douce, plus de végétalisation, et simultanément moins d'impôts et des délais plus courts. Sans financements pluriannuels stables, nous improvisons projet par projet. Or, un quartier digne de ce nom se pense sur quinze ou vingt ans, pas sur le calendrier d'un mandat.

Marc Lefèvre : La participation citoyenne est-elle une réponse ?

Léa Moretti : Elle peut l'être, à condition d'intervenir tôt. Trop souvent, les concerts publiques arrivent trop tard, quand le projet est déjà figé techniquement et financièrement. Les riverains découvrent alors un chantier décidé, et la contestation devient le seul langage disponible. Il faudrait co-concevoir dès l'esquisse : maquettes, ateliers, scénarios alternatifs, arbitrages explicites. La participation cosmétique — une réunion d'information et un panneau — alimente la défiance.

Paul N'Guessan : Nous testons des ateliers de quartier avec maquettes et budgets participatifs. Ce n'est pas magique : cela prend du temps, cela coûte, et cela ne fait pas disparaître les conflits d'intérêts. Mais cela réduit les blocages plus tard, et cela force l'administration à expliquer clairement les contraintes. Le problème, c'est que les budgets participatifs restent souvent symboliques — parfois moins de 1 % du budget municipal. Sans moyens, la co-conception reste une méthode sans levier.

Marc Lefèvre : Quid de la gentrification liée aux projets verts et aux pistes cyclables ?

Léa Moretti : C'est un risque réel. Améliorer le cadre de vie — arbres, pistes, places apaisées — augmente l'attractivité et, souvent, les loyers. Si l'on ne couple pas ces investissements à des politiques de logement abordable et à des commerces de proximité protégés, on embellit pour ceux qui peuvent rester. La transition urbaine doit être anti-ségrégative, sinon elle déplace les vulnérabilités vers la périphérie, là où les services sont plus faibles et la dépendance automobile plus forte.

Paul N'Guessan : Les commerçants craignent aussi la perte de stationnement. Il faut accompagner : aides à la livraison, signalétique, périodes d'adaptation. On ne transforme pas une rue du jour au lendemain sans dialogue. Mais je refuse l'idée que la voiture privée soit l'unique mesure de la vitalité commerciale. Les données de plusieurs villes montrent qu'après une phase d'adaptation, la fréquentation piétonne peut soutenir le chiffre d'affaires — à condition que l'offre de transports et de stationnement de rabattement existe.

Léa Moretti : Exactement. L'urbanisme durable n'est pas une collection de gadgets verts. C'est un système : logement, mobilité, services, participation, financement. Tant que l'on traite ces pièces séparément, on produit des projets fragmentés et contestés.

Marc Lefèvre : Un mot de conclusion à chacun.

Paul N'Guessan : Donnez aux communes des financements stables et des objectifs clairs, et la densification pourra être humaine.

Léa Moretti : Et donnez aux habitants un vrai pouvoir d'infléchir les projets dès l'esquisse. La ville n'est pas un décor : c'est un bien commun conflictuel qu'il faut gouverner.

Marc Lefèvre : Paul N'Guessan, que change la gouvernance intercommunale dans ces dossiers ?

Paul N'Guessan : Beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent une seule commune. Sans coordination réelle, chaque territoire externalise ses contraintes sur le voisin. La densification qualitative exige une programmation synchronisée dès l'amont.

Marc Lefèvre : Léa Moretti, comment mesure-t-on vraiment la qualité urbaine ?

Léa Moretti : Pas seulement par la surface construite. Il faut intégrer l'accès aux services, la qualité de l'air, le confort d'été, la sécurité des déplacements et la présence de commerces utiles. Densifier sans ces indicateurs, c'est construire à l'aveugle.

Marc Lefèvre : Et dans les villes moyennes ?

Léa Moretti : Il faut parfois reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et espaces piétons forment un système. Les conflits de stationnement, eux, demandent des transitions progressives et une évaluation transparente des effets économiques locaux.

Léa Moretti : Je voudrais ajouter que ces enjeux exigent une cohérence de long terme entre régulation, financement public et participation citoyenne, faute de quoi les progrès resteront fragmentaires.`,
        questions: [
          {
            id: 'L1',
            type: 'open',
            text: 'Quel défi Léa Moretti formule-t-elle au début ? Reformulez.',
            points: 3,
          },
          {
            id: 'L2',
            type: 'mcq',
            text: 'Selon elle, construire dense sans services produit surtout :',
            points: 2,
            options: [
              'A. Des centres touristiques',
              'B. Des quartiers dortoirs',
              'C. Plus de mixité automatique',
              'D. Moins de densification',
            ],
          },
          {
            id: 'L3',
            type: 'open',
            text: 'Quelle contrainte Paul N\'Guessan met-il en avant pour les maires ?',
            points: 3,
          },
          {
            id: 'L4',
            type: 'tf',
            text: 'Léa Moretti juge que les concerts publiques interviennent trop souvent trop tard.',
            points: 1,
          },
          {
            id: 'L5',
            type: 'open',
            text: 'Quelles pratiques Paul N\'Guessan dit tester, et quelle limite budgétaire évoque-t-il ?',
            points: 3,
          },
          {
            id: 'L6',
            type: 'mcq',
            text: 'Concernant la gentrification liée aux projets verts, Léa Moretti estime que :',
            points: 2,
            options: [
              'A. Elle n\'existe pas',
              'B. Elle est inévitable et sans remède',
              'C. Elle exige de coupler cadre de vie et logement abordable',
              'D. Elle ne touche que les touristes',
            ],
          },
          {
            id: 'L7',
            type: 'open',
            text: 'Que répond Paul N\'Guessan aux commerçants qui craignent la perte de stationnement ?',
            points: 3,
          },
          {
            id: 'L8',
            type: 'tf',
            text: 'Selon Léa Moretti, l\'urbanisme durable se réduit à une collection de gadgets verts.',
            points: 1,
          },
          {
            id: 'L9',
            type: 'open',
            text: 'Quelles conclusions respectives tirent les deux invités ?',
            points: 3,
          },
          {
            id: 'L10',
            type: 'mcq',
            text: 'Pour Léa Moretti, la ville est avant tout :',
            points: 2,
            options: [
              'A. Un décor à embellir',
              'B. Un bien commun conflictuel à gouverner',
              'C. Une zone réservée aux voitures',
              'D. Un marché immobilier uniquement',
            ],
          },
        ],
        answerKey: [
          {
            questionId: 'L1',
            correctAnswer: 'Densifier les centres sans les asphyxier / densifier avec urbanité',
            acceptableAnswers: ['densifier', 'asphyx', 'urbanité'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L2',
            correctAnswer: 'B',
            acceptableAnswers: ['B', 'dortoirs'],
            justificationRequired: false,
            points: 2,
          },
          {
            questionId: 'L3',
            correctAnswer:
              'Coincés entre exigences légales/budgétaires contradictoires ; manque de financements pluriannuels stables',
            acceptableAnswers: ['budget', 'loi', 'financements', 'pluriannuels'],
            justificationRequired: true,
            points: 3,
          },
          {
            questionId: 'L4',
            correctAnswer: 'Vrai',
            acceptableAnswers: ['Vrai'],
            justificationRequired: false,
            points: 1,
          },
          {
            questionId: 'L5',
            correctAnswer:
              'Ateliers de quartier, maquettes, budgets participatifs ; souvent moins de 1 % du budget municipal',
            acceptableAnswers: ['ateliers', 'maquettes', 'participatifs', '1 %'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L6',
            correctAnswer: 'C',
            acceptableAnswers: ['C', 'logement', 'abordable'],
            justificationRequired: false,
            points: 2,
          },
          {
            questionId: 'L7',
            correctAnswer:
              'Accompagner (livraison, signalétique, adaptation) ; la voiture n\'est pas l\'unique mesure de vitalité commerciale',
            acceptableAnswers: ['accompagner', 'stationnement', 'fréquentation', 'transports'],
            justificationRequired: true,
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
            correctAnswer:
              'Paul : financements stables et objectifs clairs ; Léa : vrai pouvoir citoyen dès l\'esquisse',
            acceptableAnswers: ['financements', 'esquisse', 'citoyens', 'stable'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L10',
            correctAnswer: 'B',
            acceptableAnswers: ['B', 'bien commun', 'conflictuel'],
            justificationRequired: false,
            points: 2,
          },
        ],
      },
      shortDocuments: [
        {
          transcript: `Actualité métropolitaine. La ville de Lyon annonce la création de quinze kilomètres de pistes cyclables sécurisées d'ici 2027, financés en partie par l'État et la métropole. Le projet prévoit des séparateurs physiques, des feux dédiés et un stationnement vélo sécurisé près des gares. Les associations cyclistes saluent l'ambition, tout en demandant un entretien pluriannuel budgété dès maintenant. Des commerçants du centre demandent, eux, des études d'impact sur la livraison et le stationnement temporaire.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.`,
          questions: [
            {
              id: 'S1',
              type: 'open',
              text: 'Combien de kilomètres de pistes sont annoncés, et pour quelle échéance ?',
              points: 2,
            },
            {
              id: 'S2',
              type: 'tf',
              text: 'Le financement est entièrement municipal, sans participation de l\'État.',
              points: 1,
            },
            {
              id: 'S3',
              type: 'mcq',
              text: 'Que demandent notamment les associations cyclistes ?',
              points: 2,
              options: [
                'A. L\'abandon du projet',
                'B. Un entretien pluriannuel budgété',
                'C. La suppression des gares',
                'D. L\'interdiction des vélos électriques',
              ],
            },
          ],
          answerKey: [
            {
              questionId: 'S1',
              correctAnswer: '15 kilomètres d\'ici 2027',
              acceptableAnswers: ['15', 'quinze', '2027'],
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
              acceptableAnswers: ['B', 'entretien', 'pluriannuel'],
              justificationRequired: false,
              points: 2,
            },
          ],
        },
        {
          transcript: `Rapport d'observatoire. Un rapport national alerte sur la disparition progressive des commerces de proximité dans les centres-villes de moins de vingt mille habitants. En dix ans, la vacance commerciale y a augmenté de façon marquée, sous l'effet conjugué de la concurrence périurbaine, du commerce en ligne et de la baisse de la fréquentation piétonne. Les auteurs recommandent des outils de revitalisation : foncière publique, aides ciblées, et densification résidentielle raisonnée pour soutenir la clientèle de proximité.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.`,
          questions: [
            {
              id: 'S4',
              type: 'mcq',
              text: 'Le rapport concerne surtout les villes de :',
              points: 2,
              options: [
                'A. Plus d\'un million d\'habitants',
                'B. Moins de 20 000 habitants',
                'C. Uniquement Paris',
                'D. Zones rurales isolées seulement',
              ],
            },
            {
              id: 'S5',
              type: 'open',
              text: 'Quel phénomène est dénoncé, et quelles causes sont mentionnées ?',
              points: 3,
            },
            {
              id: 'S6',
              type: 'tf',
              text: 'Les auteurs recommandent notamment une densification résidentielle raisonnée.',
              points: 1,
            },
          ],
          answerKey: [
            {
              questionId: 'S4',
              correctAnswer: 'B',
              acceptableAnswers: ['B', '20 000', 'vingt mille'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S5',
              correctAnswer:
                'Disparition des commerces de proximité ; concurrence périurbaine, e-commerce, baisse fréquentation piétonne',
              acceptableAnswers: ['commerces', 'proximité', 'périurbaine', 'ligne'],
              justificationRequired: false,
              points: 3,
            },
            {
              questionId: 'S6',
              correctAnswer: 'Vrai',
              acceptableAnswers: ['Vrai'],
              justificationRequired: false,
              points: 1,
            },
          ],
        },
      ],
    },
    reading: {
      text: `La ville contemporaine est un champ de tensions. Densifier pour limiter l'étalement urbain, tout en préservant la qualité de vie ; accueillir de nouveaux habitants, tout en évitant la gentrification ; accélérer la transition écologique, tout en respectant les temporalités démocratiques locales. Ces exigences ne sont pas incompatibles en théorie. Elles le deviennent dès que les instruments — plans locaux, financements, procédures de concertation, marchés du logement — restent fragmentés ou captés par des intérêts particuliers.

Les grands projets d'aménagement échouent souvent non faute d'expertise technique, mais faute de légitimité sociale. Quand les riverains découvrent un chantier déjà décidé, la contestation devient le seul langage disponible. Inversement, des processus participatifs trop flous, sans arbitrage transparent ni budget réel, produisent de la frustration et ralentissent l'action. La démocratie urbaine ne consiste ni à tout imposer d'en haut, ni à diluer toute décision dans une consultation sans fin. Elle exige des règles claires, des scénarios comparables, et la possibilité d'infléchir réellement un projet avant qu'il ne soit verrouillé.

La densification cristallise ces conflits. Elle est défendue au nom du climat et de la sobriété foncière. Elle est combattue au nom du cadre de vie, de l'ensoleillement, du stationnement, de la peur d'une verticalité anonyme. Or, densifier n'est pas synonyme de construire des tours hors-sol sans services. Une densité réussie articule logements, équipements publics, commerces de proximité, espaces verts et mobilités douces. Sans ces composantes, on produit des « quartiers dortoirs » qui aggravent les déplacements et affaiblissent le lien social. Autrement dit, le débat ne devrait pas opposer densité et qualité de vie, mais distinguer densité avec urbanité et densité sans urbanité.

La transition écologique des villes — pistes cyclables, végétalisation, apaisement de la circulation — soulève un autre enjeu : celui de la justice spatiale. Améliorer un quartier peut en augmenter l'attractivité et les loyers. Si aucune politique de logement abordable n'accompagne ces investissements, les ménages modestes sont repoussés vers des périphéries moins bien desservies, plus exposées à la chaleur et à la dépendance automobile. La ville verte devient alors, paradoxalement, un facteur de ségrégation. Des collectivités expérimentent des clauses anti-gentrification, des plafonds de loyer liés aux projets publics, ou des foncières qui préservent une offre abordable. Ces instruments restent encore marginaux.

Les petites villes et les centres de moins de vingt mille habitants confrontent, eux, un problème inverse : la vacance commerciale, le vieillissement, le sentiment d'abandon. Densifier et végétaliser n'y ont pas le même sens que dans une métropole saturée. Il s'agit souvent de reconcentrer l'habitat, de soutenir les commerces de proximité, de reconnecter la gare et le centre, de faire revenir des services publics. L'urbanisme durable ne peut donc être un modèle unique exporté depuis les grandes métropoles ; il doit être territorialisé.

Le financement demeure le nerf de la guerre. Les maires sont sommés d'atteindre des objectifs de densification, de logement social et de mobilité, sous peine de sanctions, tout en gérant des budgets contraints. Les budgets participatifs, lorsqu'ils existent, représentent souvent une fraction symbolique des investissements. Sans financements pluriannuels stables — État, régions, métropoles — la planification urbaine reste une suite de projets opportunistes, plus réactifs aux appels à projets qu'à une vision de long terme.

Une urbanité durable exige donc des instruments hybrides : règles claires et opposables, financements stables, co-conception réelle dès l'esquisse, et politiques de logement qui empêchent la transition écologique de devenir un luxe spatial. La ville n'est pas un décor à moderniser. C'est un bien commun conflictuel, où se jouent la santé, la mobilité, l'école, le commerce et la dignité du quotidien. La gouverner suppose d'assumer le conflit plutôt que de le camoufler derrière des inaugurations.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.`,
      questions: [
        {
          id: 'R1',
          type: 'open',
          text: 'Quelles tensions définissent la ville contemporaine selon le texte ? Reformulez.',
          points: 4,
        },
        {
          id: 'R2',
          type: 'mcq',
          text: 'Les grands projets échouent souvent faute de :',
          points: 2,
          options: [
            'A. Logiciels de conception',
            'B. Légitimité sociale',
            'C. Ciment disponible',
            'D. Touristes',
          ],
        },
        {
          id: 'R3',
          type: 'open',
          text: 'Que se passe-t-il lorsque les riverains découvrent un chantier déjà décidé ?',
          points: 4,
        },
        {
          id: 'R4',
          type: 'open',
          text: 'Quelle distinction le texte propose-t-il à propos de la densification ? Justifiez.',
          points: 4,
        },
        {
          id: 'R5',
          type: 'tf',
          text: 'Selon le texte, améliorer un quartier par des projets verts peut contribuer à la gentrification.',
          points: 2,
        },
        {
          id: 'R6',
          type: 'mcq',
          text: 'Pour les centres de moins de 20 000 habitants, le texte souligne surtout :',
          points: 2,
          options: [
            'A. Une saturation identique aux métropoles',
            'B. Vacance commerciale, vieillissement, besoin de revitalisation territorialisée',
            'C. L\'interdiction de toute densification',
            'D. L\'abandon total des services publics',
          ],
        },
        {
          id: 'R7',
          type: 'open',
          text: 'Pourquoi le financement est-il présenté comme le nerf de la guerre ?',
          points: 4,
        },
        {
          id: 'R8',
          type: 'tf',
          text: 'Le texte juge suffisante la seule communication autour des projets urbains.',
          points: 2,
        },
        {
          id: 'R9',
          type: 'open',
          text: 'Quels instruments hybrides une urbanité durable exigerait-elle ?',
          points: 4,
        },
      ],
      answerKey: [
        {
          questionId: 'R1',
          correctAnswer:
            'Densifier/qualité de vie ; accueillir/gentrification ; écologie/démocratie locale',
          acceptableAnswers: ['densif', 'gentrif', 'écolog', 'démocr'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R2',
          correctAnswer: 'B',
          acceptableAnswers: ['B', 'légitimité'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R3',
          correctAnswer: 'La contestation devient le seul langage disponible',
          acceptableAnswers: ['contestation', 'langage'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R4',
          correctAnswer:
            'Distinguer densité avec urbanité (services, commerces, verts, mobilité) et densité sans urbanité (quartiers dortoirs)',
          acceptableAnswers: ['urbanité', 'dortoirs', 'services', 'densité'],
          justificationRequired: true,
          points: 4,
        },
        {
          questionId: 'R5',
          correctAnswer: 'Vrai',
          acceptableAnswers: ['Vrai'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R6',
          correctAnswer: 'B',
          acceptableAnswers: ['B', 'vacance', 'revitalisation'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R7',
          correctAnswer:
            'Objectifs imposés sous contrainte budgétaire ; sans financements pluriannuels, planification opportuniste',
          acceptableAnswers: ['financements', 'budget', 'pluriannuels', 'objectifs'],
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
            'Règles claires, financements stables, co-conception dès l\'esquisse, politiques de logement anti-gentrification',
          acceptableAnswers: ['règles', 'financements', 'co-conception', 'logement'],
          justificationRequired: false,
          points: 4,
        },
      ],
    },
    writing: {
      dossier: [
        {
          title: 'Document 1 — Cadre légal et densification',
          text: `La loi impose aux communes des objectifs de densification et de production de logements, y compris sociaux, sous peine de sanctions financières et de reprise partielle de compétences. Les élus locaux reconnaissent la nécessité de lutter contre l'étalement, mais dénoncent un calendrier et des moyens déconnectés des réalités locales. Dans les communes contraintes, densifier rapidement sans équipements publics prévus — écoles, crèches, transports, espaces verts — produit des tensions immédiates avec les habitants. Le document souligne l'écart entre l'injonction nationale et la capacité financière municipale à livrer une urbanité complète.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.`,
        },
        {
          title: 'Document 2 — Contestation de tours sans équipements',
          text: `Des collectifs d'habitants contestent des projets de tours de logements sans équipements publics prévus à court terme. Ils ne refusent pas nécessairement le logement nouveau, mais exigent une programmation synchronisée : classes supplémentaires, espaces verts accessibles, commerces de proximité, desserte en transports. Ils dénoncent des concerts tardives et des études d'impact perçues comme formelles. Selon eux, densifier sans services, c'est importer de la densité sans importer de la ville. Ils demandent un droit de co-conception dès la phase d'esquisse et des engagements budgétaires opposables sur les équipements.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.`,
        },
        {
          title: 'Document 3 — Observatoire des budgets participatifs',
          text: `Un observatoire montre que les budgets participatifs restent souvent inférieurs à 1 % du budget municipal d'investissement. Lorsqu'ils existent, ils portent fréquemment sur du micro-aménagement — mobilier urbain, végétalisation légère — plutôt que sur les arbitrages structurants : hauteur des immeubles, voirie, grands équipements. Les chercheurs estiment que cet écart entretient une participation cosmétique : les habitants décident du détail, tandis que les décisions lourdes restent hors du champ. Ils recommandent d'élargir le périmètre participatif en amont et d'augmenter significativement les enveloppes si l'on veut réduire les conflits ultérieurs.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.`,
        },
      ],
      problematique:
        'Comment densifier les villes tout en préservant la démocratie locale et la qualité de vie ?',
      synthesisPrompt:
        'À partir des documents, rédigez une synthèse objective (environ 200–240 mots) présentant les tensions entre objectifs légaux de densification, attentes des habitants et limites de la participation budgétaire.',
      essayPrompt:
        'Vous rédigez un essai argumenté (250 mots minimum) répondant à la problématique. Prenez position et proposez des instruments concrets.',
    },
    speaking: {
      dossier: [
        {
          title: 'Document A — Pistes cyclables et commerces',
          text: `Les pistes cyclables sécurisées réduisent les accidents et améliorent la qualité de l'air, mais se heurtent parfois aux commerçants qui craignent la perte de places de stationnement. Des études de villes européennes montrent qu'après une période d'adaptation, la fréquentation piétonne et cycliste peut soutenir l'activité, à condition d'accompagner la livraison et le stationnement de rabattement. Le conflit n'est donc pas seulement technique : il est économique et symbolique.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.`,
        },
        {
          title: 'Document B — Participation dès l\'esquisse',
          text: `La participation citoyenne est plus efficace lorsqu'elle intervient dès la phase d'esquisse, avec des scénarios alternatifs et des arbitrages explicites. Intervenir trop tard transforme la concertation en communication défensive. Des chercheurs proposent des ateliers de maquettes, des jurys citoyens et des budgets réellement conséquents pour les choix structurants.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.`,
        },
        {
          title: 'Document C — Qui finance les équipements des nouveaux quartiers ?',
          text: `La densification résidentielle augmente la population sans garantir automatiquement les financements d'écoles, de crèches ou d'espaces publics. Les collectivités locales portent souvent le coût différé, tandis que la valeur foncière créée bénéficie en partie à des acteurs privés. Des propositions circulent : participation des aménageurs, fiscalité de la plus-value, contractualisation pluriannuelle État-collectivités.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.

Les conflits autour du stationnement révèlent souvent des craintes économiques légitimes autant que des habitudes culturelles. Les politiques de mobilité douce gagnent à proposer des transitions progressives, des aides ciblées et une évaluation transparente des effets sur le chiffre d'affaires local.

Dans les villes moyennes, la revitalisation des centres suppose parfois de reconstruire une demande résidentielle avant de multiplier les commerces. Logements abordables, services publics et qualité des espaces piétons forment alors un système indissociable, plutôt qu'une succession de mesures isolées.

La gouvernance intercommunale devient décisive : beaucoup d'enjeux — transports, foncier, déchets, grands équipements — dépassent le périmètre d'une seule commune. Sans coordination réelle, chaque territoire peut être tenté d'exporteriser ses contraintes sur le voisin.

Les métropoles qui réussissent leurs projets de densification qualitative articulent dès l'amont logement, mobilité, équipements scolaires et espaces publics. Cette programmation synchronisée coûte plus cher initialement, mais elle évite des correctifs ultérieurs beaucoup plus onéreux et conflictuels.

La mesure de la qualité urbaine ne saurait se réduire à des indicateurs de surface construite. Il faut y intégrer l'accès réel aux services, la qualité de l'air, le confort thermique d'été, la sécurité des déplacements et la présence de commerces de proximité ouverts à des horaires utiles.`,
        },
      ],
      instructions: `À partir du dossier, préparez un exposé de 8–10 minutes sur l'urbanisme contemporain : densification, participation, financement. Puis répondez aux questions de l'examinateur.`,
      examinerQuestions: [
        'Densifier est-il compatible avec la qualité de vie ? Sous quelles conditions ?',
        'Comment éviter que la participation citoyenne reste cosmétique ?',
        'Qui doit financer les équipements publics des nouveaux quartiers ?',
        'La transition écologique urbaine peut-elle aggraver la ségrégation ? Comment l\'éviter ?',
      ],
    },
  },
};
