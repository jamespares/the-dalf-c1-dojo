import type { StaticPaper } from './types';
import { audio } from './audio';

export const PAPER_08: StaticPaper = {
  slug: 'paper-08',
  title: 'DALF C1 — Science & Technology',
  theme: 'Science and technology',
  audioKeys: audio('paper-08'),
  content: {
    listening: {
      longDocument: {
        transcript: `Sciences et société. Présentateur : Julien Caron. Invitée : Docteure Amina Khelifi, chercheuse en biotechnologies et membre d'un comité d'éthique hospitalo-universitaire.

Julien Caron : Amina Khelifi, les thérapies géniques progressent rapidement. Faut-il s'en réjouir sans réserve ?

Amina Khelifi : Il faut s'en réjouir pour les patients qui en bénéficient, mais sans naïveté. L'accès reste profondément inégal. Les coûts de traitement peuvent dépasser plusieurs centaines de milliers d'euros par patient, parfois plus d'un million pour certaines indications. Sans régulation des prix et sans mécanismes de solidarité, on risque une médecine à deux vitesses : une médecine de pointe pour ceux qui peuvent payer ou être couverts, et une médecine ordinaire pour les autres.

Julien Caron : La question éthique est-elle aussi centrale que la question économique ?

Amina Khelifi : Elle est indissociable. Modifier le génome soulève des questions de consentement éclairé, de transmissibilité éventuelle aux générations futures lorsqu'on touche à la lignée germinale, et de définition du « normal ». Qui décide qu'un trait est pathologique, perfectible, ou simplement différent ? Ces questions ne peuvent être confisquées par les seuls experts. Il faut des comités indépendants, une transparence des essais cliniques, et un débat public informé — pas seulement des décisions technocratiques prises dans l'urgence industrielle.

Julien Caron : Une pétition de scientifiques demande un moratoire sur certaines modifications germinales. Y êtes-vous favorable ?

Amina Khelifi : Sur la lignée germinale, oui, tant qu'un consensus international robuste n'existe pas. Ce n'est pas de l'immobilisme : c'est de la prudence démocratique. L'histoire des ruptures biomédicales montre que la course à la première mondiale peut précéder la maturité éthique. Un moratoire ciblé permet de construire des garde-fous sans interdire toute recherche thérapeutique somatique, qui sauve déjà des vies.

Julien Caron : L'Europe est-elle en retard sur ces sujets ?

Amina Khelifi : Sur le financement de la recherche fondamentale, parfois, oui : les appels à projets sont compétitifs, mais les budgets restent fragmentés et souvent inférieurs à ceux d'autres ensembles économiques. Sur le cadre éthique et réglementaire, l'Europe est plutôt en avance : évaluation, pharmacovigilance, exigences de consentement. Le défi, c'est d'allier innovation et justice d'accès. Avoir les meilleurs standards éthiques ne suffit pas si les thérapies restent inaccessibles.

Julien Caron : Comment financer des traitements aussi coûteux sans faire exploser les systèmes de santé ?

Amina Khelifi : Plusieurs pistes existent : plafonds de prix négociés, modèles de paiement à la performance — on paie si le bénéfice clinique est au rendez-vous —, licences conditionnelles, et un rôle accru du financement public en amont pour que la collectivité récupère une part de la valeur créée. Il faut aussi distinguer le coût de production réel et le prix de marché lié aux brevets et aux stratégies industrielles. Sans transparence sur ces écarts, le débat public reste manipulable.

Julien Caron : Les comités d'éthique sont parfois accusés d'être trop lents face à l'urgence clinique. Que répondez-vous ?

Amina Khelifi : La lenteur n'est pas une vertu en soi, mais la précipitation non plus. On peut accélérer les procédures sans les vider : calendriers clairs, expertises parallèles, inclusion de représentants de patients. Ce qu'il ne faut pas faire, c'est court-circuiter le débat au nom de la seule vitesse industrielle. Une thérapie autorisée trop vite et mal accompagnée peut détruire la confiance pour toute une génération de technologies.

Julien Caron : Un dernier message ?

Amina Khelifi : L'innovation sans justice d'accès n'est qu'une promesse pour quelques-uns. La biotechnologie peut sauver des vies ; elle peut aussi redistribuer le pouvoir entre patients, cliniciens, industriels et États. À nous de décider si cette redistribution sera démocratique.

Julien Caron : Comment rendre plus démocratiques les arbitrages de remboursement ?

Amina Khelifi : Les systèmes de santé doivent négocier avec davantage de transparence sur la structure des coûts, pour distinguer complexité scientifique et stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Julien Caron : Les maladies rares illustrent-elles particulièrement ce dilemme ?

Amina Khelifi : Oui : populations peu nombreuses, traitements coûteux, urgence réelle. Une solidarité assumée suppose des critères publics d'arbitrage, pas des décisions opaques au cas par cas. Il faut aussi former cliniciens et citoyens à la culture de la preuve.

Julien Caron : Et au niveau international ?

Amina Khelifi : Sans convergence sur les modifications germinales, on risque un dumping éthique. Des accords multilatéraux sont nécessaires. Parallèlement, les données génétiques exigent une gouvernance stricte du consentement, sous peine de transformer le patient en gisement informationnel.

Amina Khelifi : Je voudrais ajouter que ces enjeux exigent une cohérence de long terme entre régulation, financement public et participation citoyenne, faute de quoi les progrès resteront fragmentaires.

Amina Khelifi : Je voudrais ajouter que ces enjeux exigent une cohérence de long terme entre régulation, financement public et participation citoyenne, faute de quoi les progrès resteront fragmentaires.`,
        questions: [
          {
            id: 'L1',
            type: 'open',
            text: 'Quel paradoxe Amina Khelifi décrit-elle concernant les thérapies géniques ? Reformulez.',
            points: 3,
          },
          {
            id: 'L2',
            type: 'mcq',
            text: 'Sans régulation, elle craint surtout :',
            points: 2,
            options: [
              'A. La fin de toute recherche',
              'B. Une médecine à deux vitesses',
              'C. L\'interdiction totale des traitements',
              'D. La baisse automatique des coûts',
            ],
          },
          {
            id: 'L3',
            type: 'open',
            text: 'Quelles questions éthiques cite-t-elle à propos de la modification du génome ?',
            points: 3,
          },
          {
            id: 'L4',
            type: 'tf',
            text: 'Elle juge suffisantes les seules décisions technocratiques en matière de biotechnologie.',
            points: 1,
          },
          {
            id: 'L5',
            type: 'open',
            text: 'Quelle position défend-elle sur le moratoire des modifications germinales ? Justifiez.',
            points: 3,
          },
          {
            id: 'L6',
            type: 'mcq',
            text: 'Comment situe-t-elle l\'Europe sur le financement et l\'éthique ?',
            points: 2,
            options: [
              'A. En avance partout',
              'B. En retard partout',
              'C. Parfois en retard sur le financement fondamental ; plutôt en avance sur le cadre éthique',
              'D. Sans aucun cadre réglementaire',
            ],
          },
          {
            id: 'L7',
            type: 'open',
            text: 'Quelles pistes de financement des thérapies coûteuses évoque-t-elle ?',
            points: 3,
          },
          {
            id: 'L8',
            type: 'tf',
            text: 'Selon elle, on peut accélérer les procédures d\'éthique sans les vider de leur sens.',
            points: 1,
          },
          {
            id: 'L9',
            type: 'open',
            text: 'Quel message final formule-t-elle sur innovation et justice ?',
            points: 3,
          },
          {
            id: 'L10',
            type: 'mcq',
            text: 'Le défi qu\'elle formule pour l\'Europe est d\'allier :',
            points: 2,
            options: [
              'A. Marketing et brevets uniquement',
              'B. Innovation et justice d\'accès',
              'C. Tourisme médical et sport',
              'D. Privatisation totale et secret industriel',
            ],
          },
        ],
        answerKey: [
          {
            questionId: 'L1',
            correctAnswer: 'Progrès rapide mais accès inégal / coûts très élevés',
            acceptableAnswers: ['accès', 'coûts', 'inégal', 'progrès'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L2',
            correctAnswer: 'B',
            acceptableAnswers: ['B', 'deux vitesses'],
            justificationRequired: false,
            points: 2,
          },
          {
            questionId: 'L3',
            correctAnswer: 'Consentement, transmissibilité aux générations futures, définition du normal',
            acceptableAnswers: ['consentement', 'transmiss', 'normal'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L4',
            correctAnswer: 'Faux',
            acceptableAnswers: ['Faux'],
            justificationRequired: true,
            points: 1,
          },
          {
            questionId: 'L5',
            correctAnswer:
              'Favorable sur la lignée germinale tant qu\'il n\'y a pas de consensus international ; sans bloquer la thérapie somatique',
            acceptableAnswers: ['moratoire', 'germinale', 'consensus', 'somatique'],
            justificationRequired: true,
            points: 3,
          },
          {
            questionId: 'L6',
            correctAnswer: 'C',
            acceptableAnswers: ['C', 'financement', 'éthique', 'avance'],
            justificationRequired: false,
            points: 2,
          },
          {
            questionId: 'L7',
            correctAnswer:
              'Plafonds de prix, paiement à la performance, licences conditionnelles, financement public en amont / transparence coûts',
            acceptableAnswers: ['plafonds', 'performance', 'public', 'transparence'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L8',
            correctAnswer: 'Vrai',
            acceptableAnswers: ['Vrai'],
            justificationRequired: false,
            points: 1,
          },
          {
            questionId: 'L9',
            correctAnswer:
              'L\'innovation sans justice d\'accès n\'est qu\'une promesse pour quelques-uns ; redistribution démocratique du pouvoir',
            acceptableAnswers: ['justice', 'accès', 'innovation', 'démocratique'],
            justificationRequired: true,
            points: 3,
          },
          {
            questionId: 'L10',
            correctAnswer: 'B',
            acceptableAnswers: ['B', 'innovation', 'justice'],
            justificationRequired: false,
            points: 2,
          },
        ],
      },
      shortDocuments: [
        {
          transcript: `Agence européenne des médicaments. L'EMA a autorisé un nouveau traitement contre une maladie génétique rare touchant environ deux mille patients en Europe. Le dossier clinique montre une amélioration significative des marqueurs biologiques chez une majorité des patients traités, mais le prix annoncé dépasse 300 000 euros par patient. Plusieurs États membres ouvrent des négociations pour un accord de paiement échelonné lié aux résultats cliniques à douze et vingt-quatre mois.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.`,
          questions: [
            {
              id: 'S1',
              type: 'open',
              text: 'Combien de patients approximativement sont concernés en Europe, et quel ordre de prix est annoncé ?',
              points: 2,
            },
            {
              id: 'S2',
              type: 'tf',
              text: 'Le traitement a été autorisé par l\'Agence européenne des médicaments.',
              points: 1,
            },
            {
              id: 'S3',
              type: 'mcq',
              text: 'Les États membres négocient surtout :',
              points: 2,
              options: [
                'A. L\'interdiction immédiate',
                'B. Un paiement échelonné lié aux résultats cliniques',
                'C. La privatisation des hôpitaux',
                'D. L\'arrêt de toute pharmacovigilance',
              ],
            },
          ],
          answerKey: [
            {
              questionId: 'S1',
              correctAnswer: 'Environ 2000 patients ; prix > 300 000 euros',
              acceptableAnswers: ['2000', 'deux mille', '300 000'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S2',
              correctAnswer: 'Vrai',
              acceptableAnswers: ['Vrai'],
              justificationRequired: false,
              points: 1,
            },
            {
              questionId: 'S3',
              correctAnswer: 'B',
              acceptableAnswers: ['B', 'échelonné', 'résultats'],
              justificationRequired: false,
              points: 2,
            },
          ],
        },
        {
          transcript: `Communauté scientifique. Une pétition signée par des centaines de chercheurs demande un moratoire sur certaines modifications germinales tant qu'un consensus international n'est pas atteint sur les finalités, les risques et les procédures de contrôle. Les signataires distinguent explicitement ces interventions des thérapies somatiques, qu'ils ne souhaitent pas freiner. Ils appellent aussi à des forums citoyens permanents pour éviter que le débat reste confiné aux cercles experts et industriels.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.`,
          questions: [
            {
              id: 'S4',
              type: 'mcq',
              text: 'La pétition demande :',
              points: 2,
              options: [
                'A. Une accélération immédiate de toutes les modifications germinales',
                'B. Un moratoire sur certaines modifications germinales',
                'C. La privatisation de la recherche',
                'D. L\'arrêt de toute médecine',
              ],
            },
            {
              id: 'S5',
              type: 'open',
              text: 'Quelle condition est mentionnée pour lever le moratoire, et que disent les signataires des thérapies somatiques ?',
              points: 3,
            },
            {
              id: 'S6',
              type: 'tf',
              text: 'Les signataires refusent tout débat citoyen sur le sujet.',
              points: 1,
            },
          ],
          answerKey: [
            {
              questionId: 'S4',
              correctAnswer: 'B',
              acceptableAnswers: ['B', 'moratoire'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S5',
              correctAnswer:
                'Consensus international ; ils ne souhaitent pas freiner les thérapies somatiques',
              acceptableAnswers: ['consensus', 'international', 'somatiques'],
              justificationRequired: false,
              points: 3,
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
      text: `La biotechnologie place les sociétés contemporaines devant un dilemme classique accéléré : innover vite pour sauver des vies, ou ralentir pour garantir l'équité, la prudence et le consentement démocratique. Historiquement, chaque rupture médicale a redistribué le pouvoir — entre patients, cliniciens, industriels et États. Ce qui change aujourd'hui, c'est la vitesse de cette redistribution et l'ampleur des coûts associés à certaines thérapies avancées.

Le coût des thérapies géniques et cellulaires transforme l'accès aux soins en enjeu budgétaire majeur. Les assureurs et les systèmes publics doivent arbitrer entre rareté et universalité : rembourser un traitement à plusieurs centaines de milliers d'euros pour quelques patients, c'est aussi renoncer, dans un budget fini, à d'autres interventions. Cet arbitrage n'est pas seulement comptable ; il est moral et politique. Il oblige à rendre visibles des choix que l'on préfère souvent laisser dans l'ombre des commissions techniques.

Parallèlement, le débat éthique ne peut être confisqué par les seuls experts. La définition du « normal », du « pathologique » et du « perfectible » engage toute la cité. Modifier un génome pour corriger une maladie grave n'a pas la même charge normative que modifier des traits pour des finalités d'amélioration. Or, la frontière entre soin et amélioration n'est pas toujours limpide, et elle évolue avec les capacités techniques. Sans forums publics, sans transparence des essais, sans comités réellement indépendants, la société découvre après coup des faits accomplis scientifiques.

Les modèles de gouvernance proposés convergent autour de plusieurs piliers. Premier pilier : une évaluation indépendante et continue des bénéfices et des risques, y compris après autorisation. Deuxième pilier : des instruments économiques qui limitent les rentes excessives — plafonds de prix, paiements à la performance, partage de la valeur lorsque la recherche publique a contribué en amont. Troisième pilier : des forums citoyens permanents, capables d'éclairer les priorités sans prétendre remplacer l'expertise. Quatrième pilier : une distinction claire entre thérapies somatiques et interventions germinales, ces dernières appelant un degré de prudence international plus élevé.

L'Europe occupe dans ce paysage une position ambivalente. Elle dispose souvent d'un cadre réglementaire et éthique plus exigeant que d'autres espaces économiques. Mais elle peine parfois à financer durablement la recherche fondamentale et à convertir ses atouts scientifiques en capacités industrielles et en accès équitable pour les patients. Avoir les meilleurs standards ne suffit pas si les thérapies restent hors de portée, ni si les talents et les brevets migrent ailleurs faute d'écosystème.

Les associations de patients jouent un rôle ambivalent mais indispensable. Elles accélèrent la prise en compte de maladies rares, financent parfois la recherche, et rappellent l'urgence clinique. Elles peuvent aussi, sous pression, favoriser une rhétorique de la vitesse qui court-circuite les garde-fous. Une gouvernance mature doit les inclure sans les instrumentaliser, et sans laisser le récit de l'urgence effacer celui de la justice.

Enfin, le numérique et l'intelligence artificielle s'entrelacent désormais à la biotechnologie : diagnostic assisté, sélection de molécules, analyse de cohortes. Ces outils promettent des gains d'efficacité, mais posent des questions de biais algorithmiques, de propriété des données génétiques et de consentement. Une innovation responsable ne peut traiter le génome comme une simple ressource extractible.

En définitive, l'innovation sans justice d'accès n'est qu'une promesse pour quelques-uns. Une biotechnologie digne des démocraties modernes conjuguerait vitesse raisonnée, transparence, régulation des prix et délibération publique. Le progrès médical n'est pas seulement une performance technique : c'est un contrat social renouvelé entre science et société.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.`,
      questions: [
        {
          id: 'R1',
          type: 'open',
          text: 'Quel dilemme le texte attribue-t-il à la biotechnologie ? Reformulez.',
          points: 4,
        },
        {
          id: 'R2',
          type: 'mcq',
          text: 'Le coût des thérapies avancées transforme surtout l\'accès aux soins en :',
          points: 2,
          options: [
            'A. Enjeu touristique',
            'B. Enjeu budgétaire majeur',
            'C. Sujet secondaire',
            'D. Problème purement technique sans dimension morale',
          ],
        },
        {
          id: 'R3',
          type: 'open',
          text: 'Pourquoi le débat éthique ne doit-il pas être confisqué par les seuls experts ? Justifiez.',
          points: 4,
        },
        {
          id: 'R4',
          type: 'tf',
          text: 'Le texte propose uniquement de laisser les industriels fixer librement les prix.',
          points: 2,
        },
        {
          id: 'R5',
          type: 'open',
          text: 'Quels piliers une gouvernance responsable combinerait-elle ?',
          points: 4,
        },
        {
          id: 'R6',
          type: 'mcq',
          text: 'La position de l\'Europe est décrite comme :',
          points: 2,
          options: [
            'A. Uniformément en avance',
            'B. Uniformément en retard',
            'C. Ambivalente : cadre éthique souvent exigeant, financement et accès parfois insuffisants',
            'D. Inexistante',
          ],
        },
        {
          id: 'R7',
          type: 'open',
          text: 'Quel rôle ambivalent le texte attribue-t-il aux associations de patients ?',
          points: 4,
        },
        {
          id: 'R8',
          type: 'tf',
          text: 'Selon le texte, l\'intelligence artificielle appliquée au vivant ne soulève aucune question de biais ou de consentement.',
          points: 2,
        },
        {
          id: 'R9',
          type: 'open',
          text: 'Quelle conclusion l\'auteur tire-t-il sur le rapport entre innovation et contrat social ?',
          points: 4,
        },
      ],
      answerKey: [
        {
          questionId: 'R1',
          correctAnswer: 'Innover vite pour sauver des vies vs ralentir pour équité, prudence et démocratie',
          acceptableAnswers: ['innover', 'équité', 'prudence', 'ralentir'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R2',
          correctAnswer: 'B',
          acceptableAnswers: ['B', 'budgétaire'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R3',
          correctAnswer:
            'Les notions de normal/pathologique/perfectible engagent toute la cité ; frontière soin/amélioration évolutive',
          acceptableAnswers: ['normal', 'cité', 'experts', 'perfectible'],
          justificationRequired: true,
          points: 4,
        },
        {
          questionId: 'R4',
          correctAnswer: 'Faux',
          acceptableAnswers: ['Faux'],
          justificationRequired: true,
          points: 2,
        },
        {
          questionId: 'R5',
          correctAnswer:
            'Évaluation indépendante ; instruments de prix/performance ; forums citoyens ; distinction somatique/germinale',
          acceptableAnswers: ['évaluation', 'prix', 'citoyens', 'germinale'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R6',
          correctAnswer: 'C',
          acceptableAnswers: ['C', 'ambivalente', 'éthique', 'financement'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R7',
          correctAnswer:
            'Accélèrent la prise en compte des maladies rares mais peuvent aussi pousser à court-circuiter les garde-fous',
          acceptableAnswers: ['patients', 'urgence', 'ambivalent', 'garde-fous'],
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
            'Le progrès médical est un contrat social entre science et société ; innovation sans justice d\'accès insuffisante',
          acceptableAnswers: ['contrat social', 'justice', 'accès', 'innovation'],
          justificationRequired: false,
          points: 4,
        },
      ],
    },
    writing: {
      dossier: [
        {
          title: 'Document 1 — Coût des thérapies géniques',
          text: `Le prix moyen de certaines thérapies géniques dépasse 300 000 euros par patient, et des traitements ultra-rares franchissent le seuil du million. Les agences du médicament autorisent sur la base du bénéfice clinique, mais la soutenabilité budgétaire relève ensuite des États et des assureurs. Des modèles de paiement à la performance émergent : le financement est lié aux résultats observés à moyen terme. Les critiques soulignent toutefois le manque de transparence sur les coûts de production réels et sur la part de recherche publique incorporée dans ces innovations.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.`,
        },
        {
          title: 'Document 2 — Associations de patients et transparence',
          text: `Des associations de patients demandent un accès équitable et une transparence accrue sur les essais cliniques : critères d'inclusion, effets secondaires, durée de suivi. Elles saluent les progrès thérapeutiques, mais refusent que l'urgence clinique serve de prétexte à l'opacité. Elles réclament aussi une représentation dans les instances d'évaluation, sans confusion des rôles avec les industriels. Selon elles, la confiance des malades repose autant sur l'efficacité que sur l'équité d'accès et la clarté de l'information.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.`,
        },
        {
          title: 'Document 3 — Appel de chercheurs pour la recherche fondamentale',
          text: `Des chercheurs européens plaident pour un financement public accru de la recherche fondamentale, jugée trop dépendante de cycles courts et de logiques de rentabilité immédiate. Ils rappellent que nombre de ruptures thérapeutiques naissent de travaux exploratoires dont la valorisation industrielle survient des années plus tard. Ils proposent des mécanismes permettant à la collectivité de récupérer une part de la valeur lorsque des brevets s'appuient sur des résultats financés par l'impôt. Sans cela, disent-ils, le public paie deux fois : pour la recherche amont et pour des prix aval non régulés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.`,
        },
      ],
      problematique: 'Comment concilier innovation biotechnologique et justice d\'accès aux soins ?',
      synthesisPrompt:
        'À partir des documents, rédigez une synthèse objective (environ 200–240 mots) présentant les enjeux de coût, de transparence et de financement public de la recherche.',
      essayPrompt:
        'Vous rédigez un essai argumenté (250 mots minimum) répondant à la problématique. Prenez position et proposez des pistes de gouvernance.',
    },
    speaking: {
      dossier: [
        {
          title: 'Document A — Rythme des comités d\'éthique',
          text: `Les comités d'éthique sont parfois accusés d'être trop lents face à l'urgence clinique, notamment lorsque des patients n'ont pas d'alternative thérapeutique. Des réformes proposent des calendriers accélérés, des expertises en parallèle et une meilleure inclusion des représentants de patients. Les défenseurs des garde-fous rappellent qu'une autorisation précipitée peut détruire la confiance publique pour toute une génération de technologies.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.`,
        },
        {
          title: 'Document B — Légitimité démocratique des décisions scientifiques',
          text: `Sans débat public, les décisions technocratiques perdent en légitimité, même lorsqu'elles sont scientifiquement fondées. Des forums citoyens, des conventions et des consultations structurées sont expérimentés dans plusieurs pays européens. Leur efficacité dépend de la qualité de l'information fournie et du lien réel avec la décision politique.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.`,
        },
        {
          title: 'Document C — Qui paie les thérapies extrêmement coûteuses ?',
          text: `Le financement des thérapies avancées oppose solidarité collective et soutenabilité budgétaire. Plafonds de prix, paiements à la performance et contribution publique en amont sont débattus. La question n'est pas seulement « qui paie », mais « qui capture la valeur » lorsque l'innovation s'appuie sur la recherche publique et sur des données de patients.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.

Les maladies rares illustrent particulièrement le dilemme : les populations concernées sont peu nombreuses, les traitements souvent très coûteux, et l'urgence clinique est réelle. Une solidarité assumée suppose des critères publics d'arbitrage, et non des décisions opaques au cas par cas.

La formation des cliniciens et des citoyens à la culture scientifique est un enjeu parallèle. Comprendre ce qu'est un essai clinique, un biais, un niveau de preuve, permet d'éviter aussi bien le rejet irrationnel que l'adhésion naïve à toute innovation présentée comme salvatrice.

Sur le plan international, l'absence de convergence sur les modifications germinales crée un risque de dumping éthique : la recherche pourrait se déplacer vers les juridictions les moins-disantes. D'où l'importance d'accords multilatéraux, même imparfaits, plutôt que d'un patchwork de règles nationales.

Les données génétiques et de santé soulèvent des questions de propriété, de consentement et de sécurité. Une innovation responsable exige des cadres stricts de gouvernance des données, sous peine de transformer le patient en simple gisement informationnel pour des acteurs privés.

Les systèmes de santé doivent apprendre à négocier avec davantage de transparence sur la structure des coûts, afin de distinguer ce qui relève de la complexité scientifique réelle et ce qui relève de stratégies de rente. Sans cette clarté, le consentement démocratique au remboursement s'érode.`,
        },
      ],
      instructions: `À partir du dossier, préparez un exposé de 8–10 minutes sur science, éthique et accès aux soins. Analysez les documents et proposez une prise de position. Puis répondez aux questions de l'examinateur.`,
      examinerQuestions: [
        'Faut-il un moratoire sur certaines modifications génétiques ? Lesquelles, et pourquoi ?',
        'Qui doit payer les thérapies extrêmement coûteuses, et selon quels critères ?',
        'Comment associer les citoyens au débat scientifique sans nier l\'expertise ?',
        'L\'Europe doit-elle prioriser le cadre éthique ou l\'accélération industrielle ? Peut-on faire les deux ?',
      ],
    },
  },
};
