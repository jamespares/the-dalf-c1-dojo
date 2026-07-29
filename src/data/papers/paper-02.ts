import type { StaticPaper } from './types';
import { audio } from './audio';

export const PAPER_02: StaticPaper = {
  slug: 'paper-02',
  title: 'DALF C1 — Digital Society',
  theme: 'Digital society',
  audioKeys: audio('paper-02'),
  content: {
    listening: {
      longDocument: {
        transcript: `Bonjour et bienvenue dans « Tech & Société ». Ce soir, nous interrogeons la manière dont l'intelligence artificielle générative reconfigure l'école, le travail et la démocratie informationnelle. Nous recevons Yann Lefèvre, sociologue du numérique, et en duplex depuis Bruxelles, Amira Haddad, juriste spécialisée dans la régulation européenne des technologies.

Présentatrice : Yann Lefèvre, on entend partout que ChatGPT et ses équivalents « révolutionnent » l'éducation. Est-ce un diagnostic sérieux, ou un effet de mode médiatique ?

Yann Lefèvre : Les deux, malheureusement. L'outil transforme réellement les pratiques d'écriture, de recherche et d'évaluation, mais le débat public oscille encore entre fascination et panique. Dans l'éducation, on voit deux camps caricaturaux : ceux qui interdisent purement et simplement les assistants génératifs, et ceux qui les intègrent comme panacée pédagogique. Or interdire sans former crée un angle mort : les élèves et les étudiants les utilisent quand même, souvent sans esprit critique, sans comprendre les biais, les hallucinations ni les enjeux de propriété intellectuelle. Intégrer sans cadre, à l'inverse, revient à sous-traiter la pensée à une machine statistique. Le vrai enjeu n'est donc pas l'outil, c'est la formation à une littératie algorithmique digne de ce nom.

Présentatrice : Amira Haddad, l'Europe a adopté l'AI Act. Suffit-il à protéger les citoyens ?

Amira Haddad : C'est un cadre historique, mais ce n'est pas une baguette magique. Le règlement classe les systèmes selon leurs risques, impose des obligations de transparence et de documentation, et interdit certains usages clairement attentatoires aux droits fondamentaux. Encore faut-il que les autorités nationales aient les moyens de contrôler, que les PME puissent s'y conformer sans être écrasées par la charge administrative, et que les citoyens comprennent réellement ce qui est automatisé dans les décisions qui les concernent — crédit, emploi, accès à des prestations. Une régulation opaque n'est pas une régulation démocratique.

Yann Lefèvre : J'ajouterai que le monde du travail est déjà polarisé. Les profils capables de piloter l'IA gagnent en productivité, tandis que les tâches répétitives de rédaction, de code basique ou de support s'automatisent. Ce n'est pas forcément une destruction nette d'emplois à court terme, mais une recomposition brutale des compétences. Le risque social majeur, c'est l'absence de formation continue pour les salariés de plus de quarante ans, souvent laissés hors des plans de transformation numérique des entreprises. On parle d'innovation ; on pratique parfois l'obsolescence humaine.

Présentatrice : Faut-il alors freiner le déploiement ?

Yann Lefèvre : Non. Il faut le conditionner. Transparence sur l'usage de l'IA dans les médias et la production académique, droit effectif à la formation, responsabilité des plateformes sur les contenus synthétiques — deepfakes, désinformation, usurpation d'identité. Sans cela, le débat public se noie dans une brume de contenus indiscernables, et la confiance — déjà fragile — s'effondre.

Amira Haddad : Exactement. La question n'est plus « faut-il réguler ? », mais « qui porte le coût de la conformité et qui capture la valeur ? ». Si seules les grandes plateformes peuvent absorber les obligations, on consolidera des monopoles sous couvert d'éthique. L'Europe doit donc accompagner les acteurs plus petits, tout en refusant le chantage à l'innovation brandi dès qu'une règle de protection apparaît.

Présentatrice : Et du côté des adolescents ? On parle beaucoup d'image, de filtres, d'estime de soi.

Yann Lefèvre : Les données sont inquiétantes. Une part croissante des jeunes utilise quotidiennement des filtres et des avatars générés, ce qui creuse l'écart entre image réelle et image numérique. Ce n'est pas un détail cosmétique : cela façonne le rapport au corps, à la comparaison sociale et à la vérité perçue. L'école ne peut plus traiter cela comme un sujet périphérique. C'est devenu un enjeu de santé mentale et de citoyenneté.

Amira Haddad : D'où l'importance d'une régulation qui ne se limite pas aux entreprises, mais qui protège aussi les mineurs dans les environnements numériques, avec des obligations claires pour les plateformes et des recours accessibles aux familles. Sans recours effectifs, les droits restent théoriques.

Présentatrice : Yann Lefèvre, Amira Haddad, merci. Nous reviendrons après la pause sur la question de la souveraineté des données. Avant cela, une dernière précision : peut-on encore parler de « choix » individuel face à des outils intégrés par défaut dans les logiciels professionnels et scolaires ?

Yann Lefèvre : Le vocabulaire du choix libre est souvent trompeur. Quand un employeur déploie un assistant génératif dans la suite bureautique, quand une plateforme scolaire l'intègre au cahier de textes, le salarié ou l'élève n'arbitre plus vraiment : il s'adapte, contourne ou se conforme. La sociologie du numérique montre depuis longtemps que les infrastructures configurent les comportements plus sûrement que les chartes éthiques affichées en page d'accueil. D'où l'importance de décisions collectives — syndicats, conseils d'établissement, parlements — sur des outils présentés à tort comme relevant de la seule préférence personnelle.

Amira Haddad : Et d'où l'importance, aussi, de droits procéduraux : droit de savoir qu'une décision a été assistée par un système automatisé, droit d'obtenir une explication intelligible, droit de contester. Sans ces droits, la société numérique devient une société de faits accomplis techniques.

Présentatrice : Merci à tous les deux. Restez avec nous sur « Tech & Société ».`,
        questions: [
          { id: 'L1', type: 'mcq', text: 'Selon Lefèvre, interdire purement les assistants génératifs à l\'école :', points: 2, options: ['A. Résout le problème', 'B. Crée un angle mort faute de formation critique', 'C. Est exigé par l\'AI Act', 'D. N\'arrive jamais en Europe'] },
          { id: 'L2', type: 'open', text: 'Reformulez la transformation du travail que décrit Yann Lefèvre.', points: 2 },
          { id: 'L3', type: 'open', text: 'Quel public salarié apparaît particulièrement exposé selon lui ?', points: 2 },
          { id: 'L4', type: 'tf', text: 'Amira Haddad considère que l\'AI Act suffit à lui seul à protéger démocratiquement les citoyens.', points: 1, hint: 'Justifiez brièvement.' },
          { id: 'L5', type: 'open', text: 'Quelles pistes de conditionnement du déploiement l\'invité mentionne-t-il ?', points: 2 },
          { id: 'L6', type: 'mcq', text: 'Son inquiétude sur la conformité à l\'AI Act porte surtout sur :', points: 2, options: ['A. Les grandes plateformes uniquement', 'B. La charge pour les PME et le risque de consolidation monopolistique', 'C. L\'interdiction totale de l\'IA', 'D. Les jeux vidéo'] },
          { id: 'L7', type: 'tf', text: 'Selon Lefèvre, les filtres IA chez les adolescents relèvent d\'un détail cosmétique sans enjeu éducatif.', points: 1 },
          { id: 'L8', type: 'open', text: 'Quelle question centrale Amira Haddad pose-t-elle à propos du coût de la régulation ?', points: 2 },
          { id: 'L9', type: 'open', text: 'Que signifie, d\'après Lefèvre, une « littératie algorithmique » dans le contexte scolaire ?', points: 2 },
          { id: 'L10', type: 'mcq', text: 'Pour Haddad, sans recours effectifs pour les familles :', points: 2, options: ['A. Les plateformes disparaissent', 'B. Les droits restent théoriques', 'C. L\'IA est interdite', 'D. Les écoles ferment'] },
        ],
        answerKey: [
          { questionId: 'L1', correctAnswer: 'B', acceptableAnswers: ['B', 'angle mort', 'esprit critique'], justificationRequired: false, points: 2 },
          { questionId: 'L2', correctAnswer: 'Polarisation : pilotes IA plus productifs ; tâches répétitives automatisées ; recomposition des compétences', acceptableAnswers: ['polarisation', 'automatisation', 'productivité', 'compétences'], justificationRequired: false, points: 2 },
          { questionId: 'L3', correctAnswer: 'Salariés de plus de quarante ans / manque de formation continue', acceptableAnswers: ['quarante', 'formation continue'], justificationRequired: false, points: 2 },
          { questionId: 'L4', correctAnswer: 'Faux', acceptableAnswers: ['Faux', 'faux'], justificationRequired: true, points: 1 },
          { questionId: 'L5', correctAnswer: 'Transparence médias/académique, droit à la formation, responsabilité des plateformes', acceptableAnswers: ['transparence', 'formation', 'plateformes'], justificationRequired: false, points: 2 },
          { questionId: 'L6', correctAnswer: 'B', acceptableAnswers: ['B', 'PME', 'monopoles'], justificationRequired: false, points: 2 },
          { questionId: 'L7', correctAnswer: 'Faux', acceptableAnswers: ['Faux', 'faux'], justificationRequired: false, points: 1 },
          { questionId: 'L8', correctAnswer: 'Qui porte le coût de la conformité et qui capture la valeur', acceptableAnswers: ['coût', 'conformité', 'valeur', 'PME'], justificationRequired: false, points: 2 },
          { questionId: 'L9', correctAnswer: 'Former à comprendre biais, hallucinations, enjeux de propriété intellectuelle et usage critique', acceptableAnswers: ['biais', 'esprit critique', 'hallucinations', 'algorithmique'], justificationRequired: false, points: 2 },
          { questionId: 'L10', correctAnswer: 'B', acceptableAnswers: ['B', 'théoriques'], justificationRequired: false, points: 2 },
        ],
      },
      shortDocuments: [
        {
          transcript: `Flash info — Une étude nationale révèle que 62 % des adolescents français utilisent quotidiennement des filtres d'intelligence artificielle sur les réseaux sociaux. Les psychologues alertent sur l'écart croissant entre image réelle et image numérique, et appellent les établissements scolaires à intégrer des modules d'éducation à l'image dès le collège. Plusieurs associations de parents demandent également un encadrement plus strict des fonctionnalités génératives accessibles aux mineurs sans consentement parental explicite. Le débat s'étend désormais aux applications de retouche vocale, capables d'imiter la voix d'un camarade à partir de quelques secondes d'enregistrement.`,
          questions: [
            { id: 'S1', type: 'mcq', text: 'Quel pourcentage d\'adolescents utilise des filtres IA quotidiennement ?', points: 2, options: ['A. 26 %', 'B. 62 %', 'C. 82 %', 'D. 12 %'] },
            { id: 'S2', type: 'open', text: 'Quel risque les psychologues soulignent-ils, et quelle réponse scolaire est évoquée ?', points: 2 },
          ],
          answerKey: [
            { questionId: 'S1', correctAnswer: 'B', acceptableAnswers: ['B', '62'], justificationRequired: false, points: 2 },
            { questionId: 'S2', correctAnswer: 'Écart image réelle / numérique ; modules d\'éducation à l\'image', acceptableAnswers: ['écart', 'image', 'éducation', 'collège'], justificationRequired: false, points: 2 },
          ],
        },
        {
          transcript: `Interview courte — Le ministère de l'Éducation annonce un plan de formation des enseignants à l'IA pédagogique, avec 10 000 places la première année et un référentiel commun sur l'évaluation des travaux assistés. Une représentante syndicale tempère : « Sans temps dédié dans les services et sans équipements dans les établissements ruraux, le plan restera une annonce parisienne. » Le ministère promet un bilan d'étape à dix-huit mois et évoque un accompagnement différencié selon la taille des académies, sans publier encore le détail budgétaire par territoire. Des élus locaux demandent que les crédits soient fléchés prioritairement vers les zones blanches numériques et les établissements sous-équipés.`,
          questions: [
            { id: 'S3', type: 'tf', text: 'Le plan de formation cible principalement les enseignants.', points: 1 },
            { id: 'S4', type: 'open', text: 'Quelle réserve la représentante syndicale formule-t-elle ?', points: 2 },
          ],
          answerKey: [
            { questionId: 'S3', correctAnswer: 'Vrai', acceptableAnswers: ['Vrai', 'vrai'], justificationRequired: false, points: 1 },
            { questionId: 'S4', correctAnswer: 'Manque de temps dédié et d\'équipements dans les établissements ruraux', acceptableAnswers: ['temps', 'ruraux', 'équipements'], justificationRequired: false, points: 2 },
          ],
        },
      ],
    },
    reading: {
      text: `La souveraineté numérique est devenue, en moins d'une décennie, l'un des mots d'ordre les plus brandis — et les plus ambigus — des politiques européennes. Derrière ce concept se jouent le contrôle des données personnelles et industrielles, la dépendance aux infrastructures cloud américaines ou asiatiques, la capacité à faire respecter le droit local sur des plateformes globales, et, plus profondément, la possibilité pour une société démocratique de décider de son destin technologique sans être réduite au rôle de consommateur captif. Or le débat oscille trop souvent entre deux caricatures : d'un côté, un souverainisme technologique qui rêve d'autarcie numérique ; de l'autre, un mondialisme naïf qui confond ouverture et vassalisation.

Les défenseurs d'une souveraineté forte plaident pour des clouds souverains, des semi-conducteurs européens, des câbles sous-marins contrôlés, et des règles strictes sur le transfert de données hors de l'Union. Leur argument n'est pas seulement économique : il est politique. Une démocratie qui ne peut ni auditer, ni localiser, ni, le cas échéant, saisir des données critiques dans le cadre d'une enquête, abdique une part de sa puissance publique. Les révélations successives sur l'accès extraterritorial de certaines administrations étrangères aux données hébergées par des entreprises soumises à leur droit ont durablement nourri cette méfiance. Dans cette perspective, l'Europe aurait trop longtemps confondu le libre-échange des services numériques avec l'abandon de ses leviers de contrôle.

Leurs critiques répondent que l'isolation technologique est illusoire et potentiellement suicidaire. L'innovation naît dans des écosystèmes ouverts, les chaînes de valeur sont mondiales, et une Europe trop protectionniste risque de ralentir ses start-up, d'augmenter les coûts pour les administrations et les PME, et de se couper des standards de fait qui structurent Internet. Ils soulignent aussi le décalage entre les discours souverains et les capacités industrielles réelles : produire des puces avancées, former des ingénieurs en nombre suffisant, et bâtir des infrastructures concurrentielles ne se décrète pas en une législature. À trop promettre une autonomie qui n'existe pas encore, les États nourrissent une défiance supplémentaire lorsque la réalité rattrape les communiqués.

Entre ces deux pôles, une voie pragmatique émerge progressivement dans les cercles d'experts, sinon toujours dans les discours électoraux : diversifier les fournisseurs pour éviter les points de défaillance uniques, imposer l'interopérabilité afin que les données et les services puissent migrer, investir massivement dans les compétences, et conditionner l'accès aux marchés publics européens à des exigences de sécurité, d'auditabilité et de respect du droit de l'Union. La question n'est plus seulement « où sont stockées les données ? », formule trop souvent réduite à une géographie magique, mais « qui peut les auditer, les porter ailleurs, en limiter les usages secondaires, et en rendre compte devant un juge européen ? ». Autrement dit, la souveraineté digne de ce nom est moins une forteresse qu'un ensemble de droits effectifs et de capacités techniques.

Pour les citoyens, l'enjeu reste concret, presque trivial dans sa brutalité : vie privée, manipulation informationnelle, accès équitable aux services numériques devenus essentiels — emploi, santé, démarches administratives, école. Une panne de plateforme, une discrimination algorithmique opaque ou une campagne de désinformation synthétique ne sont plus des hypothèses de laboratoire ; ce sont des expériences ordinaires. Une démocratie numérique digne de ce nom exige à la fois innovation et garde-fous, rapidité d'adaptation et lenteur délibérative lorsque des droits fondamentaux sont en jeu. Ce double tempo est difficile à tenir, surtout face à des acteurs privés dont le modèle économique repose sur la capture de l'attention et l'accumulation de données.

Il faut aussi parler d'asymétrie. Les États européens réglementent, enquêtant, amendent, menacent d'amendes records — et c'est nécessaire. Mais les plateformes, elles, déploient, testent, itèrent, et déplacent parfois leurs fonctions les plus sensibles hors de portée immédiate. Le droit court après le code. Cette course n'est pas une fatalité : elle révèle un déficit d'expertise publique, de moyens d'inspection et de coopération entre régulateurs. Sans ingénieurs, juristes et auditeurs réellement capables d'ouvrir les boîtes noires, la régulation reste déclarative. Le RGPD a montré qu'une règle ambitieuse peut transformer les pratiques ; il a aussi montré que l'application effective dépend de ressources et de priorités politiques variables selon les États membres.

Une autre tension, moins souvent formulée, concerne la culture démocratique elle-même. Les outils numériques ont élargi l'espace public et, simultanément, l'ont fragmenté en bulles, en économies de l'indignation et en marchés de la fausse évidence. L'IA générative accélère cette dynamique en rendant trivialement disponible la production de textes, d'images et de voix plausibles. Dans ce contexte, appeler à la « souveraineté » sans investir dans l'éducation critique, le journalisme d'intérêt public et des infrastructures d'information fiables, c'est soigner le symptôme tout en négligeant la maladie. La dépendance n'est pas seulement technique : elle est cognitive.

On objectera que l'Europe a déjà multiplié les textes — Digital Services Act, Digital Markets Act, AI Act, Data Act — et que la pile réglementaire risque d'étouffer l'innovation. L'objection n'est pas nulle. Une régulation empilée sans lisibilité produit de la conformité cosmétique et des avantages pour ceux qui peuvent payer des armées de juristes. Mais l'alternative n'est pas le laissez-faire : c'est une régulation mieux hiérarchisée, mieux outillée, et plus attentive aux acteurs de taille intermédiaire. La sophistication juridique sans capacité d'exécution n'est qu'une esthétique du contrôle.

Enfin, la souveraineté numérique pose une question de solidarité européenne. Un État membre seul ne pèse guère face aux géants mondiaux ; une Union divisée non plus. Or les intérêts industriels divergent, les cultures de protection des données aussi, et la tentation du dumping réglementaire n'a pas disparu. Construire une souveraineté partagée suppose d'accepter des transferts de compétences, des investissements communs et, parfois, des compromises nationaux douloureux. C'est précisément ce que le mot « souveraineté », dans sa version nationale romantique, peinait à penser.



Pourtant, reconnaître cette ambiguïté ne dispense pas d'agir. Les États qui attendent une définition philosophique parfaite de la souveraineté laissent le champ libre à des faits accomplis industriels. À l'inverse, ceux qui multiplient les labels « cloud souverain » sans capacités d'audit indépendantes vendent une sécurité cosmétique. Entre ces deux écueils, la seule boussole utile reste empirique : mesurons qui peut accéder à quelles données, sous quel droit, avec quels recours, et à quel coût pour les acteurs publics comme privés. Tout le reste est rhétorique.

Il convient aussi de rappeler que la dépendance numérique n'est pas seulement américaine ou asiatique : elle est interne à l'Europe elle-même, entre métropoles hyperconnectées et territoires où le débit, la formation et les services publics numériques restent insuffisants. Une souveraineté qui ignore la fracture territoriale reproduira, sous un vocabulaire nouveau, d'anciennes inégalités. Les collectivités locales, souvent en première ligne des démarches dématérialisées, savent que l'exclusion numérique n'est pas une métaphore : elle se traduit en droits non exercés, en retards de paiement, en isolement administratif.

La question culturelle ne peut être éludée non plus. Les langues, les corpus, les modèles d'IA et les standards d'interopérabilité ne sont pas neutres. Une Europe qui consomme des modèles entraînés ailleurs sur des données dont elle ne maîtrise ni la provenance ni les biais s'expose à une forme subtile d'hégémonie cognitive. Investir dans des modèles ouverts, multilingues, documentés et auditables n'est donc pas un caprice industriel : c'est une condition de pluralisme démocratique. Les bibliothèques, les universités et les médias publics ont ici un rôle que les seuls marchés ne rempliront pas.

Ajoutons que la confiance ne se décrète pas par règlement. Elle se construit par des preuves répétées : audits publiés, sanctions effectives, recours accessibles, et services numériques conçus pour les plus vulnérables plutôt que pour les seuls utilisateurs experts. Tant que l'expérience quotidienne du citoyen restera celle d'une opacité polie, les discours sur la souveraineté sonneront faux, quelle que soit la sophistication des textes européens.

Le débat, en définitive, n'oppose pas « plus de technologie » à « plus de droit ». Il oppose deux conceptions du pouvoir : celle qui confie aux marchés le soin de définir le possible, et celle qui refuse que des infrastructures devenues vitales échappent à toute reddition de comptes démocratique. Entre l'illusion autarcique et la dépendance consentie, l'Europe doit inventer une troisième voie : non pas celle des slogans, mais celle des capacités — industrielles, juridiques, éducatives — mesurables dans le temps. Faute de quoi la souveraineté numérique restera ce qu'elle est trop souvent aujourd'hui : un étendard brandi le matin, et une facture cloud signée le soir. Dans cette perspective, la souveraineté n'est pas un slogan de circonstance mais une infrastructure de confiance durablement exigée par les citoyens.`,
      questions: [
        { id: 'R1', type: 'open', text: 'Quels enjeux recouvre la souveraineté numérique selon le texte ? Reformulez.', points: 3 },
        { id: 'R2', type: 'mcq', text: 'Les critiques du protectionnisme craignent surtout :', points: 2, options: ['A. Une trop grande ouverture', 'B. Un ralentissement des start-up et une illusion d\'autonomie', 'C. La fin du cloud', 'D. L\'interdiction des smartphones'] },
        { id: 'R3', type: 'open', text: 'Quelle voie pragmatique est proposée entre souverainisme et mondialisme naïf ?', points: 3 },
        { id: 'R4', type: 'tf', text: 'Selon le texte, la seule question pertinente est le lieu géographique de stockage des données.', points: 2 },
        { id: 'R5', type: 'open', text: 'Quels enjeux concrets pour les citoyens sont cités ?', points: 2 },
        { id: 'R6', type: 'open', text: 'Que signifie l\'idée selon laquelle « le droit court après le code » ?', points: 3 },
        { id: 'R7', type: 'mcq', text: 'Pour l\'auteur, sans éducation critique et journalisme d\'intérêt public, appeler à la souveraineté :', points: 2, options: ['A. Suffit pleinement', 'B. Soigne le symptôme en négligeant la maladie', 'C. Remplace toute régulation', 'D. Interdit l\'IA'] },
        { id: 'R8', type: 'tf', text: 'Le texte affirme que l\'empilement réglementaire européen est nécessairement la meilleure solution sans nuance.', points: 2 },
        { id: 'R9', type: 'open', text: 'Pourquoi la solidarité européenne est-elle présentée comme une condition de la souveraineté numérique ?', points: 3 },
        { id: 'R10', type: 'mcq', text: 'La conclusion oppose principalement :', points: 3, options: ['A. Plus de technologie à moins de technologie', 'B. Deux conceptions du pouvoir : marchés vs reddition de comptes démocratique', 'C. États-Unis et Asie uniquement', 'D. École et entreprise'] },
      ],
      answerKey: [
        { questionId: 'R1', correctAnswer: 'Contrôle des données, dépendance cloud, application du droit local, destin technologique démocratique', acceptableAnswers: ['données', 'cloud', 'droit', 'dépendance'], justificationRequired: false, points: 3 },
        { questionId: 'R2', correctAnswer: 'B', acceptableAnswers: ['B', 'start-up', 'ralentir', 'illusion'], justificationRequired: false, points: 2 },
        { questionId: 'R3', correctAnswer: 'Diversifier fournisseurs, interopérabilité, compétences, exigences d\'auditabilité', acceptableAnswers: ['diversifier', 'interopérabilité', 'compétences', 'auditer'], justificationRequired: false, points: 3 },
        { questionId: 'R4', correctAnswer: 'Faux', acceptableAnswers: ['Faux', 'faux'], justificationRequired: false, points: 2 },
        { questionId: 'R5', correctAnswer: 'Vie privée, manipulation informationnelle, accès équitable aux services essentiels', acceptableAnswers: ['vie privée', 'manipulation', 'accès'], justificationRequired: false, points: 2 },
        { questionId: 'R6', correctAnswer: 'Les plateformes déploient plus vite que les États ne réglementent et contrôlent ; déficit d\'expertise publique', acceptableAnswers: ['régulation', 'plateformes', 'expertise', 'code'], justificationRequired: false, points: 3 },
        { questionId: 'R7', correctAnswer: 'B', acceptableAnswers: ['B', 'symptôme', 'maladie'], justificationRequired: false, points: 2 },
        { questionId: 'R8', correctAnswer: 'Faux', acceptableAnswers: ['Faux', 'faux'], justificationRequired: false, points: 2 },
        { questionId: 'R9', correctAnswer: 'Un État seul ne pèse pas face aux géants ; il faut investissements communs et coopération', acceptableAnswers: ['Union', 'seule', 'géants', 'investissements communs'], justificationRequired: false, points: 3 },
        { questionId: 'R10', correctAnswer: 'B', acceptableAnswers: ['B', 'pouvoir', 'marchés', 'démocratique'], justificationRequired: false, points: 3 },
      ],
    },
    writing: {
      dossier: [
        {
          title: 'Document 1 — Rapport d\'un think tank sur l\'IA au travail',
          text: `L'intelligence artificielle générative accroît la productivité dans plusieurs métiers intellectuels, mais redistribue inégalement les gains. Les salariés formés à piloter ces outils voient leur valeur de marché augmenter ; ceux dont les tâches sont standardisées subissent une pression à la baisse, voire une externalisation automatisée. Le rapport estime que sans plan massif de formation continue, notamment pour les salariés de plus de quarante ans, le risque n'est pas seulement technologique : il est social et politique. Les entreprises qui investissent uniquement dans les licences logicielles sans investir dans les compétences créent une dette humaine. Enfin, le document souligne que la productivité mesurée à court terme peut masquer une perte de savoir-faire collectif lorsque la mémoire organisationnelle est déléguée à des systèmes opaques, difficiles à auditer lors d'un contentieux ou d'une crise. Les auteurs recommandent des clauses sociales dans les marchés publics numériques, un droit à la formation certifiante sur le temps de travail, et des indicateurs de qualité du travail — et non seulement de débit — dans les tableaux de bord managériaux. Sans ces contreparties, l'IA au travail risque de devenir le nom moderne d'une intensification silencieuse, présentée comme une modernisation inévitable. Ils insistent aussi sur la nécessité d'associer les représentants du personnel dès la phase de déploiement, faute de quoi la méfiance s'installera plus vite que les gains de productivité. Le rapport propose enfin un observatoire national des mutations professionnelles liées à l'IA, chargé de publier chaque année des données territoriales et sectorielles accessibles au public.`,
        },
        {
          title: 'Document 2 — Tribune d\'un collectif d\'enseignants du supérieur',
          text: `Interdire les assistants génératifs dans les universités relève souvent du déni. Les étudiants les utilisent déjà ; la question est de savoir s'ils le font avec méthode ou dans la clandestinité. Nous plaidons pour une littératie algorithmique obligatoire : comprendre les biais, citer les outils, distinguer production assistée et production personnelle, et repenser l'évaluation vers des oraux, des portfolios et des tâches situées. Une prohibition pure protège moins l'intégrité académique qu'elle ne fabrique l'hypocrisie. À l'inverse, une intégration naïve qui traiterait l'IA comme un correcteur universel détruirait le sens même de l'apprentissage. Entre ces deux écueils, l'université doit redevenir un lieu où l'on apprend à penser avec et contre les machines, non un espace de police logicielle permanente. Cela suppose des moyens : formation des enseignants, effectifs permettant l'oral et le suivi, et une doctrine claire partagée entre établissements pour éviter que la géographie universitaire ne crée deux régimes d'intégrité académique. Les signataires rappellent enfin que l'enjeu n'est pas moralisateur : il s'agit de préserver la valeur du diplôme et la confiance publique dans la formation supérieure. Ils proposent des expérimentations évaluées sur trois ans plutôt que des interdictions générales immédiatement contournées. Cette prudence méthodologique contraste avec la précipitation de certains établissements qui improvisent des règlements intérieurs chaque semestre.`,
        },
        {
          title: 'Document 3 — Synthèse d\'un observatoire des plateformes',
          text: `Les deepfakes et contenus synthétiques se multiplient plus vite que les dispositifs de détection. Les plateformes annoncent des labels et des filigranes, mais leur efficacité varie et leur adoption reste inégale. L'observatoire note que les utilisateurs peinent à distinguer contenus authentiques et générés, surtout sur mobile et dans les fils algorithmiques rapides. Sans obligation de transparence renforcée et sans éducation aux médias, le débat public risque une crise de vérifiabilité durable. Les PME médiatiques, elles, n'ont pas les moyens des grands groupes pour déployer des outils de détection ; une régulation qui ignore cette asymétrie consolidera encore les acteurs dominants. L'observatoire recommande des standards ouverts de provenance des contenus et un financement public de l'éducation critique dès le collège. Il souligne également le rôle des bibliothèques, des médias locaux et des associations d'éducation populaire, trop souvent absents des plans nationaux centrés sur la seule régulation des plateformes. Sans écosystème d'information de proximité, la bataille de la vérifiabilité sera perdue d'avance, quelles que soient les amendes européennes. L'observatoire appelle enfin à des standards ouverts de filigrane et de provenance, interopérables entre plateformes, pour éviter que chaque acteur n'invente son label privé illisible. Il appelle les États à financer des audits indépendants plutôt qu'à se contenter des auto-déclarations des plateformes.`,
        },
      ],
      problematique: 'Comment faire de l\'intelligence artificielle un levier d\'émancipation collective plutôt qu\'un facteur de polarisation sociale, éducative et informationnelle ?',
      synthesisPrompt: 'À partir des documents du dossier, rédigez une synthèse objective (220 à 240 mots) présentant les effets de l\'IA générative sur le travail, l\'éducation et l\'information, ainsi que les tensions qui en découlent. N\'exprimez pas d\'opinion personnelle.',
      essayPrompt: 'Rédigez un essai argumenté (250 mots minimum) répondant à la problématique. Prenez position de façon nuancée et proposez des pistes concrètes (formation, régulation, pratiques éducatives).',
    },
    speaking: {
      dossier: [
        {
          title: 'Document A — Travail, compétences et polarisation',
          text: `Plusieurs enquêtes européennes convergent : l'IA générative n'élimine pas massivement les emplois à court terme, mais elle polarise les trajectoires. Les salariés capables de formuler des requêtes exigeantes, de vérifier les sorties et d'intégrer les outils dans des processus métiers gagnent du temps et de la visibilité. Les autres voient leurs tâches se fragmenter, se standardiser, puis s'automatiser. Les plans de formation continue restent trop souvent réservés aux cadres déjà favorisés. Dans les PME, l'absence de temps et de budget transforme l'innovation en injonction anxiogène. La question politique devient alors simple à formuler, difficile à trancher : faut-il laisser le marché trier les « adaptables », ou imposer un droit effectif à la reconversion financé par ceux qui capturent les gains de productivité ? Plusieurs syndicats européens demandent déjà une contribution sur les gains d'automatisation affectée à des fonds de formation territoriale. Les employeurs objectent le risque de fuite d'investissement. Entre ces positions, l'absence de compromis durable nourrit une anxiété sociale que les discours sur l'« agilité » ne suffisent plus à apaiser. Le document invite les pouvoirs publics à expérimenter des mécanismes de mutualisation avant que la polarisation ne se traduise en conflits ouverts. Il rappelle enfin que la qualité de l'emploi ne se mesure pas seulement au taux de chômage, mais à la capacité des salariés à comprendre et à infléchir les outils qui transforment leur métier. Sans cette capacité, la modernisation restera vécue comme une dépossession.`,
        },
        {
          title: 'Document B — École, évaluation et intégrité',
          text: `Les établissements oscillent entre interdiction et improvisation. Certains professeurs reçoivent des copies fluides dont l'origine est indécidable ; d'autres inventent des évaluations orales plus riches, mais chronophages. Les détecteurs automatiques d'IA produisent des faux positifs et des faux négatifs, ce qui rend leur usage disciplinaire juridiquement fragile. Des chercheurs en sciences de l'éducation recommandent de rendre explicite l'usage autorisé des outils, d'enseigner la vérification des sources et de valoriser le processus autant que le produit. Cette approche exige du temps de formation enseignant, des effectifs raisonnables et une doctrine claire des établissements — trois conditions rarement réunies simultanément. Sans elles, l'école risque de déléguer à la technologie le jugement moral qu'elle devrait exercer. Des chefs d'établissement témoignent aussi d'une fatigue normative : chaque semaine apporte un nouvel outil, une nouvelle consigne, une nouvelle alerte. Dans ce climat, la pédagogie de la lenteur — lecture longue, écriture révisée, débat oral — apparaît paradoxalement comme la plus radicale des innovations. Elle exige toutefois un soutien politique explicite, faute de quoi elle restera le luxe des établissements déjà favorisés. Le document conclut qu'aucune technologie ne remplacera le temps humain nécessaire à l'évaluation formative. Investir dans ce temps, c'est investir dans la crédibilité de l'institution scolaire à l'âge des machines plausibles.`,
        },
        {
          title: 'Document C — Espace public et contenus synthétiques',
          text: `La vérifiabilité de l'information devient un bien public menacé. Voix clonées, images fabriquées, articles plausibles : la production de faux n'exige plus de compétences rares. Les plateformes avancent des solutions techniques, mais le modèle économique de l'attention reste structurellement favorable au sensationnel. Des journalistes alertent : sans standards de provenance, sans éducation critique et sans responsabilité proportionnée des intermédiaires, la confiance démocratique s'érode plus vite que le droit ne peut la réparer. La régulation européenne offre des leviers ; encore faut-il des moyens d'enquête et une coopération réelle entre États membres, faute de quoi les acteurs les plus agiles contourneront les règles les plus ambitieuses. Le document conclut qu'une société numérique juste ne se construit ni par la seule technique ni par la seule loi, mais par l'articulation des deux avec une culture démocratique de la vérification. Cela implique des investissements publics durables, une responsabilité claire des intermédiaires, et le courage de ralentir certains déploiements lorsque les garde-fous ne sont pas prêts. Sans ce courage politique, la course à l'innovation restera une course à l'irresponsabilité différée. Les auteurs appellent les parlements à conditionner certains déploiements publics à des études d'impact démocratique préalables, rendues publiques.`,
        },
      ],
      instructions: `À partir du dossier, préparez un exposé structuré de 8 à 10 minutes. Présentez la problématique, analysez les documents, articulez les enjeux travail / école / information, puis proposez une prise de position argumentée sur les conditions d'une société numérique juste. Anticipez les objections. Puis répondez aux questions de l'examinateur.`,
      examinerQuestions: [
        'Faut-il interdire ou intégrer l\'IA générative à l\'école, et sous quelles conditions pédagogiques précises ?',
        'Qui devrait financer la formation continue des salariés face à l\'automatisation : État, entreprises, individus ?',
        'Dans quelle mesure la régulation européenne peut-elle réellement freiner la désinformation synthétique sans devenir une censure ?',
        'La souveraineté numérique est-elle compatible avec un Internet ouvert, ou faut-il accepter des formes de fragmentation ?',
      ],
    },
  },
};
