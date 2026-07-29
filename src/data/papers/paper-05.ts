import type { StaticPaper } from './types';
import { audio } from './audio';

export const PAPER_05: StaticPaper = {
  slug: 'paper-05',
  title: 'DALF C1 — Consumption & Ethics',
  theme: 'Consumption and ethics',
  audioKeys: audio('paper-05'),
  content: {
    listening: {
      longDocument: {
        transcript: `Émission « Économie et société ». Présentatrice : Sophie Durand. Invité : Nadia Benali, économiste spécialisée dans la consommation éthique et auteure d'un rapport pour l'Observatoire européen des modes de vie.

Sophie Durand : Bonjour Nadia Benali. Depuis la pandémie, les enquêtes d'opinion répètent que les consommateurs veulent consommer moins et mieux. Pourtant, les chiffres de vente racontent une autre histoire. Comment expliquez-vous cet écart ?

Nadia Benali : L'écart entre intentions déclarées et comportements réels n'est pas nouveau, mais il s'est accentué. D'un côté, une majorité de personnes affirme vouloir boycotter les marques irresponsables, privilégier le local, réparer plutôt que remplacer. De l'autre, le volume global de biens jetables continue d'augmenter, notamment dans l'électronique, le textile et l'emballage alimentaire. Ce n'est pas de l'hypocrisie individuelle : c'est le produit d'un système qui rend l'option éthique coûteuse, opaque et chronophage.

Sophie Durand : Vous pointez d'abord le prix ?

Nadia Benali : Oui. Les produits durables restent souvent plus chers à l'achat, même lorsqu'ils coûtent moins sur le cycle de vie. Or, une part croissante des ménages arbitre sous contrainte budgétaire. Quand le panier alimentaire augmente plus vite que les salaires, la vertu écologique devient un luxe relatif. Ensuite, le marketing vert : beaucoup d'étiquettes écologiques sont floues, non standardisées, parfois purement déclaratives. Cela crée de la méfiance, et la méfiance pousse au prix le plus bas, perçu comme le seul critère objectif. Enfin, l'urgence du quotidien — trajets, travail, charge mentale — favorise la facilité du clic et du jetable.

Sophie Durand : Certains disent que l'information suffit : si l'on étiquette mieux, le marché s'autorégulera. Qu'en pensez-vous ?

Nadia Benali : L'information est nécessaire, mais insuffisante. Sans cadre commun, chaque marque invente son propre langage de vertu. On aboutit à une inflation discursive : chartes, reports RSE, labels privés, notes applications. Le consommateur moyen n'a ni le temps ni les compétences pour démêler le vrai du faux. C'est pourquoi je défends une information fiable et standardisée, contrôlée par des tiers indépendants, avec des sanctions en cas de greenwashing. Mais même une étiquette claire ne règle pas l'asymétrie de pouvoir entre grands distributeurs et filières de réparation.

Sophie Durand : Que peuvent faire concrètement les pouvoirs publics ?

Nadia Benali : Trois leviers principaux. Premier levier : une fiscalité qui rend le durable compétitif — TVA différenciée, bonus réparation, malus sur l'obsolescence programmée, contribution sur les emballages non recyclables. Deuxième levier : l'information standardisée que je viens d'évoquer, avec un indice de réparabilité étendu et vérifiable. Troisième levier : le soutien structurel aux filières de réparation, de réemploi et d'économie circulaire — formation, ateliers de quartier, accès au crédit pour les PME. Sans cela, l'éthique reste un marché de niche pour une minorité aisée.

Sophie Durand : Vous êtes critique aussi envers le boycott en ligne. Pourquoi ?

Nadia Benali : Le boycott peut être efficace à court terme : une marque recule, une campagne disparaît. Mais il est volatile, sélectif, et souvent piloté par l'algorithme plus que par une stratégie durable. Il ne remplace pas la régulation. Pire : il peut donner l'illusion que le problème est résolu dès qu'une entreprise publie des excuses. Or, ce qui compte, ce sont les chaînes d'approvisionnement, les contrats fournisseurs, les volumes produits. Ces leviers sont rarement accessibles au consommateur isolé.

Sophie Durand : Et côté entreprises responsables, que constatez-vous ?

Nadia Benali : Il existe des acteurs sincères — coopératives, PME locales, marques qui intègrent vraiment le coût environnemental. Mais elles peinent à concurrencer les prix des grands groupes qui externalisent leurs impacts. Tant que le coût écologique et social n'est pas internalisé dans le prix de marché, le vertueux est pénalisé. C'est pourquoi je parle d'éthique de marché, et non seulement d'éthique de consommation : il faut changer les règles du jeu, pas seulement les paniers.

Sophie Durand : Une dernière question. Si vous ne deviez retenir qu'un message pour les auditeurs ?

Nadia Benali : Ne culpabilisez pas les ménages précaires. La transition de la consommation sera juste si elle démocratise le durable par le prix, le droit et l'infrastructure — pas si elle moralise les individus tout en laissant intactes les structures de production.

Sophie Durand : Les ressourceries et ateliers municipaux que vous évoquez souvent, quel rôle peuvent-ils jouer à grande échelle ?

Nadia Benali : Ils réduisent les déchets et créent des emplois peu délocalisables, mais leur montée en charge dépend de financements pluriannuels et d'un accès facilité aux locaux. Sans cela, ils restent des expériences locales inspirantes, pas une infrastructure nationale.

Sophie Durand : Et sur le plan fiscal, comment éviter que l'écologie ne pèse surtout sur les ménages modestes ?

Nadia Benali : En internalisant les externalités tout en compensant : tant que polluer et jeter coûtent moins que réparer, le signal-prix contredit le discours éthique. Une fiscalité écologique crédible doit donc combiner malus sur le jetable et mécanismes compensatoires pour les bas revenus.

Sophie Durand : Dernier point : le droit de la consommation est-il à la hauteur du marketing vert ?

Nadia Benali : Pas encore. L'allégation environnementale vague devrait être traitée comme pratique commerciale trompeuse, avec des amendes proportionnelles. Et il faut former massivement des réparateurs : sans compétences territoriales, la régulation reste lettre morte.`,
        questions: [
          {
            id: 'L1',
            type: 'open',
            text: 'Quel écart Nadia Benali met-elle en évidence entre les enquêtes et les données de vente ? Reformulez.',
            points: 3,
          },
          {
            id: 'L2',
            type: 'mcq',
            text: 'Selon elle, le volume global de biens jetables :',
            points: 2,
            options: [
              'A. Diminue fortement depuis la pandémie',
              'B. Continue d\'augmenter, notamment dans l\'électronique, le textile et l\'emballage',
              'C. Est stable depuis dix ans',
              'D. N\'est mesuré que dans le textile',
            ],
          },
          {
            id: 'L3',
            type: 'open',
            text: 'Citez les trois causes principales de l\'écart intentions / comportements qu\'elle développe.',
            points: 3,
          },
          {
            id: 'L4',
            type: 'tf',
            text: 'Nadia Benali estime que le marketing vert renforce toujours la confiance des consommateurs.',
            points: 1,
          },
          {
            id: 'L5',
            type: 'open',
            text: 'Pourquoi considère-t-elle l\'information comme nécessaire mais insuffisante ? Justifiez à partir de ses arguments.',
            points: 3,
            hint: 'Réponse attendue avec reformulation et justification.',
          },
          {
            id: 'L6',
            type: 'open',
            text: 'Quels trois leviers publics propose-t-elle ?',
            points: 3,
          },
          {
            id: 'L7',
            type: 'mcq',
            text: 'Selon Nadia Benali, le boycott en ligne :',
            points: 2,
            options: [
              'A. Remplace efficacement toute régulation',
              'B. Est toujours inefficace',
              'C. Peut être efficace à court terme mais reste volatile et ne remplace pas la régulation',
              'D. Ne concerne que le secteur alimentaire',
            ],
          },
          {
            id: 'L8',
            type: 'tf',
            text: 'Elle affirme que les PME éthiques concurrencent déjà aisément les prix des grands groupes.',
            points: 1,
          },
          {
            id: 'L9',
            type: 'open',
            text: 'Que signifie pour elle passer d\'une « éthique de consommation » à une « éthique de marché » ?',
            points: 3,
          },
          {
            id: 'L10',
            type: 'mcq',
            text: 'Son message final invite surtout à :',
            points: 2,
            options: [
              'A. Culpabiliser davantage les ménages précaires',
              'B. Moraliser les individus sans toucher aux structures',
              'C. Démocratiser le durable par le prix, le droit et l\'infrastructure',
              'D. Interdire toute publicité commerciale',
            ],
          },
        ],
        answerKey: [
          {
            questionId: 'L1',
            correctAnswer:
              'Écart entre intentions déclarées (consommer moins/mieux) et comportements réels (volume de biens jetables en hausse)',
            acceptableAnswers: ['intentions', 'comportements', 'écart', 'jetables'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L2',
            correctAnswer: 'B',
            acceptableAnswers: ['B', 'augmenter'],
            justificationRequired: false,
            points: 2,
          },
          {
            questionId: 'L3',
            correctAnswer: 'Prix plus élevé du durable ; marketing vert flou / méfiance ; urgence du quotidien',
            acceptableAnswers: ['prix', 'marketing', 'méfiance', 'quotidien'],
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
              'Sans cadre commun, inflation de labels opaques ; le consommateur n\'a ni temps ni compétences ; il faut standardisation et sanctions contre le greenwashing',
            acceptableAnswers: ['insuffisante', 'labels', 'standardis', 'greenwashing', 'temps'],
            justificationRequired: true,
            points: 3,
          },
          {
            questionId: 'L6',
            correctAnswer: 'Fiscalité favorable au durable ; information standardisée ; soutien aux filières réparation/réemploi',
            acceptableAnswers: ['fiscalité', 'information', 'réparation', 'réemploi'],
            justificationRequired: false,
            points: 3,
          },
          {
            questionId: 'L7',
            correctAnswer: 'C',
            acceptableAnswers: ['C', 'volatile', 'régulation'],
            justificationRequired: false,
            points: 2,
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
              'Changer les règles du jeu (internaliser les coûts écologiques/sociaux) plutôt que seulement les paniers individuels',
            acceptableAnswers: ['règles', 'marché', 'internalis', 'structures'],
            justificationRequired: true,
            points: 3,
          },
          {
            questionId: 'L10',
            correctAnswer: 'C',
            acceptableAnswers: ['C', 'démocratiser', 'infrastructure'],
            justificationRequired: false,
            points: 2,
          },
        ],
      },
      shortDocuments: [
        {
          transcript: `Flash info Europe. Une enquête menée dans douze pays auprès de jeunes de 18 à 30 ans indique que 54 % déclarent boycotter occasionnellement une marque pour des raisons éthiques — conditions de travail, impact climatique ou bien-être animal. Toutefois, seuls 19 % affirment maintenir ce boycott plus de six mois, et 61 % reconnaissent avoir racheté le produit concerné lors d'une promotion. Les auteurs soulignent ainsi la fragilité des engagements déclaratifs face aux incitations commerciales.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.`,
          questions: [
            {
              id: 'S1',
              type: 'mcq',
              text: 'Quel pourcentage de jeunes déclare boycotter occasionnellement une marque ?',
              points: 2,
              options: ['A. 45 %', 'B. 54 %', 'C. 61 %', 'D. 19 %'],
            },
            {
              id: 'S2',
              type: 'open',
              text: 'Quelle contradiction les auteurs mettent-ils en évidence concernant la durée du boycott ?',
              points: 2,
            },
            {
              id: 'S3',
              type: 'tf',
              text: 'L\'enquête ne porte que sur la France.',
              points: 1,
            },
          ],
          answerKey: [
            {
              questionId: 'S1',
              correctAnswer: 'B',
              acceptableAnswers: ['B', '54'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S2',
              correctAnswer:
                'Seuls 19 % maintiennent le boycott plus de six mois ; 61 % rachètent en promotion',
              acceptableAnswers: ['19', 'six mois', '61', 'promotion'],
              justificationRequired: false,
              points: 2,
            },
            {
              questionId: 'S3',
              correctAnswer: 'Faux',
              acceptableAnswers: ['Faux'],
              justificationRequired: false,
              points: 1,
            },
          ],
        },
        {
          transcript: `Communiqué gouvernemental. Le ministère de la Transition écologique annonce l'extension du bonus réparation aux smartphones, tablettes et lave-linge dès l'automne prochain. Le forfait passera de 25 à 45 euros pour les petits appareils et jusqu'à 80 euros pour le gros électroménager, à condition que la réparation soit réalisée par un professionnel labellisé. Les associations de consommateurs saluent la mesure, tout en rappelant que le coût moyen d'une réparation de smartphone dépasse encore 120 euros, rendant l'effet d'aubaine limité sans baisse des pièces détachées.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.`,
          questions: [
            {
              id: 'S4',
              type: 'tf',
              text: 'Le bonus réparation concernera notamment les smartphones dès l\'automne prochain.',
              points: 1,
            },
            {
              id: 'S5',
              type: 'open',
              text: 'Quelles conditions et quels montants sont mentionnés pour bénéficier du dispositif ?',
              points: 3,
            },
            {
              id: 'S6',
              type: 'mcq',
              text: 'Selon les associations, le principal frein restant est :',
              points: 2,
              options: [
                'A. L\'interdiction des réparations',
                'B. Le coût moyen de réparation encore supérieur au bonus',
                'C. L\'absence de professionnels',
                'D. La suppression du forfait',
              ],
            },
          ],
          answerKey: [
            {
              questionId: 'S4',
              correctAnswer: 'Vrai',
              acceptableAnswers: ['Vrai'],
              justificationRequired: false,
              points: 1,
            },
            {
              questionId: 'S5',
              correctAnswer:
                '25 à 45 € (petits appareils) / jusqu\'à 80 € (gros électroménager) ; réparation par professionnel labellisé',
              acceptableAnswers: ['45', '80', 'labellisé', 'automne'],
              justificationRequired: false,
              points: 3,
            },
            {
              questionId: 'S6',
              correctAnswer: 'B',
              acceptableAnswers: ['B', '120', 'coût'],
              justificationRequired: false,
              points: 2,
            },
          ],
        },
      ],
    },
    reading: {
      text: `La consommation éthique est devenue, en moins de deux décennies, un argument commercial omniprésent. Labels, chartes, rapports de responsabilité sociale, notes d'applications mobiles, campagnes de transparence : les entreprises multiplient les signes de vertu. Dans les rayons comme sur les plateformes en ligne, le consommateur est sommé de choisir « mieux », « local », « responsable », « zéro déchet ». Pourtant, derrière cette inflation discursive, une question demeure : qui peut réellement consommer autrement, et à quelles conditions collectives ?

Les chercheurs en sociologie de la consommation ont longtemps montré que le « mieux consommer » n'est pas un simple acte de volonté. Il suppose du temps pour comparer, de l'information pour décoder les labels, un capital culturel pour hiérarchiser les critères, et souvent un surplus monétaire pour absorber le surcoût immédiat du produit durable. Les ménages précaires, eux, optimisent d'abord le prix et la disponibilité. Faire de l'éthique une responsabilité individuelle sans toucher aux structures de production revient donc à culpabiliser les uns et à absoudre les autres. Cette moralisation asymétrique est d'autant plus problématique qu'elle circule massivement sur les réseaux sociaux, où la performance de vertu peut se substituer à l'analyse des filières.

Le greenwashing n'est pas un accident marginal : il est le produit logique d'un marché où la réputation écologique a une valeur financière, tandis que le contrôle reste coûteux et fragmenté. Des enquêtes journalistiques ont révélé des filières textiles se revendiquant « durables » alors que leurs audits sociaux étaient superficiels ; des marques alimentaires ont surestimé la part de produits locaux dans leurs paniers ; des entreprises d'électronique ont communiqué sur la réparabilité tout en limitant l'accès aux pièces détachées. Face à ces pratiques, les associations de consommateurs demandent des labels officiels contrôlés, des sanctions dissuasives et une responsabilité juridique accrue des donneurs d'ordre sur l'ensemble de la chaîne.

Mais la régulation ne suffit pas si elle ignore la question du prix. Une approche plus juste combinerait au moins trois leviers. Premier levier : interdire ou taxer lourdement les pratiques les plus destructrices — obsolescence programmée, substances dangereuses, emballages superflus — afin de faire basculer le coût réel dans le prix de marché. Deuxième levier : imposer une transparence obligatoire et comparable, avec des indicateurs communs (réparabilité, empreinte carbone, conditions sociales) vérifiés par des tiers indépendants. Troisième levier : démocratiser le durable par le prix, via des aides ciblées, une TVA différenciée, des marchés publics exemplaires et un soutien massif aux filières de réparation et de réemploi. Sans ce troisième pilier, le marché continuera de vendre de la bonne conscience à ceux qui peuvent se l'offrir.

Il faut aussi prendre au sérieux la dimension territoriale. La consommation éthique n'a pas le même sens dans une métropole densément équipée en circuits courts et dans une zone périurbaine dépendante de l'hypermarché et de la voiture. Les politiques publiques qui se contentent d'inciter les individus à « mieux choisir » sans investir dans les infrastructures — ateliers de réparation, consignes, compostage, transports, accès à des produits frais abordables — reproduisent les inégalités géographiques. Autrement dit, l'éthique de consommation est aussi une question d'aménagement et de service public.

Les entreprises elles-mêmes ne forment pas un bloc homogène. Des coopératives, des PME de l'économie circulaire et certaines marques engagées tentent d'internaliser leurs impacts. Elles se heurtent toutefois à une concurrence déloyale de fait : tant que les externalités négatives ne sont pas intégrées dans le prix, le producteur vertueux est pénalisé. C'est pourquoi plusieurs économistes plaident pour une « éthique de marché » plutôt que pour une simple éthique du panier : changer les règles du jeu concurrentiel, pas seulement les préférences déclarées des consommateurs.

Enfin, le rôle du numérique mérite d'être interrogé. Les plateformes de notation et les applications de scan de codes-barres peuvent éclairer certains choix. Elles peuvent aussi simplifier à l'excès des réalités complexes, créer de nouveaux biais, et concentrer le pouvoir d'évaluation entre quelques acteurs privés. Une démocratie de la consommation exige des données ouvertes, des méthodologies discutables publiquement, et des contre-pouvoirs associatifs capables de contester les scores dominants.

En définitive, la consommation éthique ne sera pas l'effet spontané d'une prise de conscience généralisée. Elle dépendra de la capacité des sociétés à conjuguer régulation stricte, redistribution du coût écologique, infrastructures accessibles et information fiable. Tant que l'on demandera aux seuls individus de porter le poids moral de la transition, on entretiendra un marché de la vertu pour une minorité — et une économie du jetable pour le plus grand nombre.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.`,
      questions: [
        {
          id: 'R1',
          type: 'open',
          text: 'Quel paradoxe le texte met-il en lumière concernant la consommation éthique ? Reformulez avec vos propres mots.',
          points: 4,
        },
        {
          id: 'R2',
          type: 'mcq',
          text: 'Selon les sociologues cités, consommer autrement suppose surtout :',
          points: 2,
          options: [
            'A. Uniquement de la volonté individuelle',
            'B. Du temps, de l\'information, un capital culturel et souvent un surplus monétaire',
            'C. L\'interdiction de toute publicité',
            'D. Un diplôme universitaire obligatoire',
          ],
        },
        {
          id: 'R3',
          type: 'open',
          text: 'Pourquoi individualiser l\'éthique de consommation est-il critiqué ? Justifiez.',
          points: 4,
        },
        {
          id: 'R4',
          type: 'tf',
          text: 'Selon le texte, le greenwashing est un accident marginal sans lien avec la logique du marché.',
          points: 2,
        },
        {
          id: 'R5',
          type: 'open',
          text: 'Quels trois leviers une approche plus juste combinerait-elle ?',
          points: 4,
        },
        {
          id: 'R6',
          type: 'mcq',
          text: 'La dimension territoriale est soulignée parce que :',
          points: 2,
          options: [
            'A. Toutes les régions ont les mêmes infrastructures',
            'B. L\'éthique de consommation dépend aussi de l\'aménagement et des services publics locaux',
            'C. Seules les zones rurales peuvent consommer éthiquement',
            'D. Les hypermarchés ont disparu',
          ],
        },
        {
          id: 'R7',
          type: 'open',
          text: 'Que signifie « éthique de marché » par opposition à « éthique du panier » ?',
          points: 4,
        },
        {
          id: 'R8',
          type: 'tf',
          text: 'Le texte présente les applications de notation comme une solution démocratique suffisante en elles-mêmes.',
          points: 2,
        },
        {
          id: 'R9',
          type: 'open',
          text: 'Quelle conclusion l\'auteur tire-t-il sur les conditions d\'une consommation éthique généralisée ?',
          points: 4,
        },
      ],
      answerKey: [
        {
          questionId: 'R1',
          correctAnswer:
            'Inflation de signes de vertu commerciale vs accessibilité réelle limitée / inégalités de capacité à consommer autrement',
          acceptableAnswers: ['paradoxe', 'accessib', 'labels', 'inégal', 'vertu'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R2',
          correctAnswer: 'B',
          acceptableAnswers: ['B', 'temps', 'information', 'surplus'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R3',
          correctAnswer:
            'Culpabilise les ménages précaires sans toucher aux structures de production ; moralisation asymétrique',
          acceptableAnswers: ['culpabil', 'structures', 'individuel', 'précaires'],
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
            'Régulation/taxation des pratiques destructrices ; transparence obligatoire comparable ; démocratisation du durable par le prix et les filières',
          acceptableAnswers: ['régulation', 'transparence', 'prix', 'réparation'],
          justificationRequired: false,
          points: 4,
        },
        {
          questionId: 'R6',
          correctAnswer: 'B',
          acceptableAnswers: ['B', 'aménagement', 'infrastructures'],
          justificationRequired: false,
          points: 2,
        },
        {
          questionId: 'R7',
          correctAnswer:
            'Changer les règles concurrentielles (internaliser les externalités) plutôt que seulement les préférences individuelles du consommateur',
          acceptableAnswers: ['règles', 'marché', 'panier', 'externalit'],
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
            'Elle dépend de régulation, redistribution du coût écologique, infrastructures et information fiable — pas de la seule conscience individuelle',
          acceptableAnswers: ['régulation', 'infrastructures', 'information', 'individus'],
          justificationRequired: false,
          points: 4,
        },
      ],
    },
    writing: {
      dossier: [
        {
          title: 'Document 1 — Extrait d\'une étude d\'opinion européenne',
          text: `Selon une étude menée en 2025 auprès de 12 000 consommateurs dans huit pays européens, 70 % des personnes interrogées se disent prêtes à payer davantage pour un produit présenté comme éthique. Pourtant, seuls 18 % déclarent le faire régulièrement, et 41 % avouent choisir le prix le plus bas dès que l'écart dépasse 10 %. L'étude distingue nettement les intentions déclaratives et les comportements d'achat observés en magasin. Les freins les plus cités sont le coût (62 %), le manque de confiance dans les labels (48 %), et le manque de temps pour comparer (37 %). Les jeunes de 18 à 30 ans boycottent plus souvent, mais abandonnent aussi plus vite. Les auteurs concluent que sans réduction du surcoût du durable et sans standardisation des informations, le marché de la consommation éthique restera minoritaire, même dans les sociétés où le discours écologique est dominant.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.`,
        },
        {
          title: 'Document 2 — Tribune d\'une fédération d\'associations de consommateurs',
          text: `Nous dénonçons depuis des années le greenwashing comme une pratique structurelle, non comme une dérive isolée. Des entreprises multiplient les signes de vertu — emballages verts, slogans, rapports RSE — tout en maintenant des chaînes d'approvisionnement opaques. Les labels privés, financés par les marques elles-mêmes, ne constituent pas une garantie suffisante. Nous demandons des labels officiels contrôlés par des autorités indépendantes, des sanctions financières proportionnelles au chiffre d'affaires, et une obligation de traçabilité sur l'ensemble de la filière. Nous rappelons aussi que le consommateur n'est pas un expert : lui faire porter seul la responsabilité de décoder des dizaines de logos revient à organiser l'impuissance. Une consommation plus juste commence par des règles claires, opposables, et par le droit de réparer.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.`,
        },
        {
          title: 'Document 3 — Témoignage d\'une dirigeante de PME de l\'économie circulaire',
          text: `Notre entreprise reconditionne des smartphones et forme des techniciens à la réparation. La demande existe, notamment chez les jeunes urbains. Mais nous peinions à concurrencer les prix du neuf importé à bas coût, dont l'empreinte sociale et environnementale n'apparaît pas sur l'étiquette. Les aides publiques sont fragmentées, les appels d'offres complexes, et l'accès aux pièces détachées reste parfois restreint par les fabricants. Le bonus réparation aide, mais il ne change pas l'équilibre concurrentiel. Si les pouvoirs publics veulent une filière viable, il faut des marchés publics exemplaires, un accès garanti aux pièces, et une fiscalité qui cesse de favoriser le jetable. Sinon, l'économie circulaire restera une vitrine, pas une alternative de masse.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.`,
        },
      ],
      problematique: 'Comment rendre la consommation éthique accessible au plus grand nombre sans la réduire à un marché de la vertu pour une minorité ?',
      synthesisPrompt:
        'À partir des documents, rédigez une synthèse objective (environ 200–240 mots) présentant les écarts entre intentions et pratiques, le problème du greenwashing et les obstacles rencontrés par les filières durables.',
      essayPrompt:
        'Vous rédigez un essai argumenté (250 mots minimum) répondant à la problématique. Prenez position et proposez des leviers concrets (fiscalité, régulation, infrastructures, information).',
    },
    speaking: {
      dossier: [
        {
          title: 'Document A — Bonus réparation et durée de vie des appareils',
          text: `Le bonus réparation vise à allonger la durée de vie des appareils électroniques et électroménagers. Son extension aux smartphones et lave-linge est saluée, mais les montants restent souvent inférieurs au coût réel d'une intervention professionnelle. Des études montrent qu'un forfait de 45 euros ne suffit pas lorsque la pièce détachée et la main-d'œuvre dépassent 120 euros. Par ailleurs, l'accès aux pièces et aux schémas techniques demeure inégal selon les fabricants. Les associations estiment que sans obligation de réparabilité forte et sans régulation des prix des pièces, le bonus restera un signal positif mais insuffisant pour concurrencer le neuf à grande échelle.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.`,
        },
        {
          title: 'Document B — Boycotts numériques et pouvoir des marques',
          text: `Les campagnes de boycott sur les réseaux sociaux peuvent faire plier certaines marques en quelques jours : retrait d'une publicité, excuses publiques, engagement symbolique. Cette réactivité médiatique ne garantit pourtant pas de transformations durables des chaînes d'approvisionnement. Les chercheurs soulignent le caractère sélectif et volatile de ces mobilisations, souvent dépendantes des algorithmes. Ils opposent à la « moralisation virale » des instruments plus stables : régulation, audits indépendants, responsabilité juridique des donneurs d'ordre. Le consommateur connecté peut alerter ; il ne remplace pas l'État ni le droit.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.`,
        },
        {
          title: 'Document C — Prix, précarité et justice de la transition',
          text: `Dans les ménages à bas revenus, le critère du prix demeure déterminant. Demander à ces ménages de « consommer mieux » sans baisser le coût du durable ni améliorer l'offre de proximité revient à transformer une contrainte structurelle en faute morale. Des économistes proposent une TVA différenciée, des paniers durables subventionnés, et le développement d'ateliers de réparation de quartier. L'enjeu n'est pas seulement écologique : c'est aussi celui de la cohésion sociale. Une transition qui réserve l'éthique aux classes moyennes supérieures creuse le sentiment d'injustice et affaiblit l'adhésion collective.

Les enquêtes de terrain montrent en outre que la confiance dans les labels s'érode à chaque scandale, ce qui renforce le réflexe du prix comme critère unique. Restaurer cette confiance exige non seulement de meilleures normes, mais aussi des contrôles visibles et des sanctions effectivement appliquées.

Dans les collectivités locales, des expérimentations de ressourceries municipales et d'ateliers de réparation solidaires ont permis de réduire certains volumes de déchets tout en créant des emplois peu délocalisables. Leur montée en charge dépend toutefois de financements pluriannuels et d'un accès facilité aux locaux.

Les économistes de l'environnement insistent sur l'internalisation des externalités : tant que polluer et jeter restent moins coûteux que réparer et produire durablement, le signal-prix contredit le discours éthique. La fiscalité écologique doit donc être conçue avec des mécanismes compensatoires pour les ménages modestes.

Le droit de la consommation évolue lentement face à des pratiques marketing de plus en plus sophistiquées. L'allégation environnementale vague, non vérifiable, devrait être traitée comme une pratique commerciale trompeuse, avec des amendes proportionnelles au préjudice collectif et non comme un simple écart de communication.

Enfin, la formation professionnelle des réparateurs, des diagnostiqueurs et des conseillers en économie circulaire constitue un maillon souvent négligé. Sans compétences disponibles sur le territoire, même les meilleures intentions réglementaires se heurtent à l'absence d'offre concrète pour les citoyens.`,
        },
      ],
      instructions: `À partir du dossier, préparez un exposé de 8–10 minutes : présentez la problématique de la consommation éthique, analysez les documents, et proposez une prise de position argumentée sur les leviers (régulation, prix, réparation, boycott). Puis répondez aux questions de l'examinateur.`,
      examinerQuestions: [
        'Le consommateur est-il vraiment libre de ses choix dans le système actuel ?',
        'Faut-il interdire le greenwashing, et par quels instruments juridiques ?',
        'La réparation peut-elle concurrencer le neuf à grande échelle ? Sous quelles conditions ?',
        'Comment éviter que la transition écologique de la consommation n\'aggrave les inégalités sociales ?',
      ],
    },
  },
};
