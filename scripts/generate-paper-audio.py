#!/usr/bin/env python3
"""Generate French listening audio for static DALF papers via edge-tts.

Transcripts keyed by paper slug — keep in sync with src/data/static-papers.ts
(via scripts/build-expanded-static-papers.py).
"""

from __future__ import annotations

import asyncio
import re
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
PAPERS_DIR = ROOT / "public" / "papers"
VOICE_HOST = "fr-FR-HenriNeural"
VOICE_GUEST_F = "fr-FR-DeniseNeural"
VOICE_NEWS = "fr-FR-EloiseNeural"


def clean_text(text: str) -> str:
    text = text.replace("«", '"').replace("»", '"')
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


async def synthesize(text: str, voice: str, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    communicate = edge_tts.Communicate(clean_text(text), voice, rate="-5%")
    await communicate.save(str(out_path))
    size = out_path.stat().st_size
    if size < 1000:
        raise RuntimeError(f"Audio too small ({size} bytes): {out_path}")
    print(f"  OK {out_path.relative_to(ROOT)} ({size // 1024} KB) [{voice}]")



# Transcripts keyed by paper slug — keep in sync with src/data/static-papers.ts
PAPERS: dict[str, dict[str, str]] = {
    "paper-01": {
        "long": """Bonjour et bienvenue dans  Débats d'aujourd'hui . Ce soir, nous recevons Claire Moreau, urbaniste et auteure d'un rapport sur la renaturation des villes européennes, ainsi que Karim El Amrani, porte-parole d'un collectif d'habitants de la banlieue parisienne.

Présentateur : Claire Moreau, votre rapport parle d'une  révolution verte silencieuse . En quoi consiste-t-elle concrètement ?

Claire Moreau : Depuis une dizaine d'années, les métropoles européennes multiplient les projets de végétalisation — toitures, cours d'école, corridors écologiques, débitumisation de places. Ce n'est plus seulement esthétique : il s'agit de santé publique, de lutte contre les îlots de chaleur et de résilience face aux canicules. À Paris, Lyon ou Barcelone, on observe une baisse mesurable de la température de surface — entre 1,5 et 3 degrés en été — dans les quartiers où l'on a planté des arbres matures et créé des continuités vertes. Prenons l'exemple de la rue de la République à Lyon : après deux saisons de végétalisation, la fréquentation piétonne a augmenté de 22 %, et les commerces de proximité signalent une clientèle plus régulière en semaine.

Présentateur : Pourtant, certains habitants dénoncent une  végétalisation de luxe  qui gentrifie les quartiers populaires.

Karim El Amrani : C'est exactement ce que nous vivons à Saint-Denis. On inaugure des jardins partagés magnifiques, on pose des bancs en bois, et six mois plus tard, les loyers grimpent. Les familles qui ont tenu le quartier pendant des décennies se retrouvent reléguées vers la périphérie — là où, paradoxalement, l'exposition à la chaleur et à la pollution reste plus forte. Ce n'est pas la nature qui pose problème ; c'est l'absence de politiques de logement social concomitantes.

Claire Moreau : Karim a raison sur le diagnostic. Si l'on améliore le cadre de vie sans plafonds de loyer ni obligation de maintenir une part de logements abordables, on transforme un bien collectif en signal de marché. La renaturation doit être accompagnée d'une gouvernance inclusive : concerts de quartier réels, budgets participatifs dédiés, et clauses anti-spéculation sur les zones vertes créées.

Présentateur : Quels résultats mesurables avez-vous observés dans les villes pilotes ?

Claire Moreau : Outre la baisse thermique, on constate une meilleure rétention des eaux de pluie — jusqu'à 30 % de ruissellement en moins sur certains sites — et une hausse de la biodiversité urbaine. Mais le défi majeur reste le financement : planter ne suffit pas, il faut entretenir pendant des décennies. Les collectivités qui réussissent sont celles qui budgétisent l'entretien dès le départ, et non seulement l'inauguration. À Amsterdam, par exemple, chaque mètre carré de végétalisation est associé à un contrat d'entretien pluriannuel financé par une taxe locale dédiée.

Karim El Amrani : Et il faut que cet entretien crée des emplois locaux, pas seulement des contrats externalisés. Sinon, la transition écologique reste une vitrine pour les classes moyennes, tandis que les habitants précaires en paient le prix sans en récolter les bénéfices.

Présentateur : Un dernier mot sur la justice climatique ?

Claire Moreau : La renaturation n'est pas un luxe : c'est une infrastructure de santé publique. Mais sans justice sociale, elle devient un accélérateur d'inégalités. L'enjeu, ce n'est pas de choisir entre vert et social — c'est de les penser ensemble.

Présentateur : Comment financer l'entretien à long terme sans alourdir la fiscalité locale ?

Claire Moreau : Il faut diversifier : taxes de séjour ciblées, contrats public-privé avec clauses sociales, et cofinancements européens pour les corridors écologiques transfrontaliers. À Milan, un fonds dédié alimenté par une contribution des propriétaires bénéficiaires de plus-value a permis de financer dix ans d'entretien sans detourner les budgets de l'action sociale.

Karim El Amrani : Attention aux fausses solutions : externaliser l'entretien à des multinationales de services peu payées ne résout rien. Nous voulons des emplois-formation : jardiniers, éducateurs populaires, médiateurs de quartier. La renaturation doit être un levier d'insertion pour les jeunes des quartiers qu'elle transforme.

Présentateur : Et la participation des habitants aux choix d'espèces végétales ?

Claire Moreau : C'est crucial. Des essences inadaptées — trop gourmandes en eau, allergènes — ont parfois été imposées sans consultation. Les jardins partagés co-gérés obtiennent de meilleurs taux de fréquentation et moins de vandalisme. La nature en ville n'est pas un décor : c'est un commons à gouverner collectivement.

Présentateur : Un mot pour conclure ?

Claire Moreau : La renaturation est une infrastructure de santé publique — pas un luxe.

Karim El Amrani : À condition qu'elle profite à ceux qui en ont le plus besoin, pas seulement aux quartiers déjà valorisés.""",
        "short1": """Flash info — Le Parlement européen a adopté une directive visant à réduire de 40 % l'usage des pesticides chimiques d'ici 2030, avec des dérogations possibles lorsque  aucune alternative viable  n'existe. Les organisations agricoles dénoncent un calendrier irréaliste et une menace sur la sécurité alimentaire, tandis que les ONG environnementales jugent l'objectif insuffisant face à l'effondrement de la biodiversité. Bruxelles promet des fonds de transition pour les exploitations de moins de cinquante hectares, mais les syndicats estiment que le montant annoncé couvre à peine un tiers des besoins estimés.""",
        "short2": """Interview — Marc Petit, maire d'une commune littorale de la Manche :  Nous avons dû avancer de quinze jours la fermeture de certaines plages cet été en raison des algues toxiques. Ce n'est plus exceptionnel : c'est devenu saisonnier. Les scientifiques relient ce phénomène à la hausse des températures de l'eau et aux nitrates agricoles. Nous demandons un plan national de surveillance et une indemnisation des commerces de plage touchés, car la perte économique est considérable pour une commune de huit mille habitants.""",
    },
    "paper-02": {
        "long": """Bonsoir et bienvenue dans  Tech & Société . Ce soir, nous recevons Yann Lefèvre, sociologue du numérique à l'Université de Lyon, et Inès Karam, juriste spécialisée dans la protection des données et la défense des droits numériques.

Présentatrice : Yann Lefèvre, l'intelligence artificielle générative a-t-elle déjà transformé le travail intellectuel plus vite que les institutions ne s'adaptent ?

Yann Lefèvre : Oui, et de manière inégale. Dans l'éducation, on observe deux camps : ceux qui interdisent ChatGPT, et ceux qui l'intègrent comme outil d'apprentissage. Interdire sans former crée un angle mort : les élèves l'utilisent quand même, souvent sans esprit critique ni traçabilité des sources. Dans le monde professionnel, les métiers de la rédaction, du code et du design sont déjà reconfigurés. Ce n'est pas forcément une destruction nette d'emplois, mais une polarisation : les profils capables de piloter l'IA gagnent en productivité, tandis que les tâches répétitives s'automatisent. Le risque social majeur, c'est l'absence de formation continue pour les salariés de plus de quarante ans, qui peinent à accéder aux reconversions financées.

Présentatrice : Inès Karam, cette accélération pose-t-elle un problème démocratique ?

Inès Karam : Absolument. Les plateformes concentrent des volumes de données considérables, alimentent des modèles opaques, et influencent nos fils d'actualité sans que nous sachions toujours pourquoi tel contenu nous est proposé. L'AI Act européen est une avancée, mais il ne suffit pas : il faut aussi renforcer la littératie numérique dès le collège, imposer la transparence algorithmique dans les services publics, et garantir un droit effectif à la formation pour les travailleurs exposés à l'automatisation. Sans cela, la souveraineté numérique reste un slogan.

Présentatrice : Faut-il réguler plus strictement ?

Yann Lefèvre : Oui, mais intelligemment. Transparence sur l'usage de l'IA dans les médias, responsabilité des plateformes sur les contenus synthétiques, et audits indépendants des systèmes utilisés pour l'évaluation scolaire ou professionnelle. L'enjeu n'est pas d'interdire l'innovation, mais d'éviter qu'elle ne creuse les inégalités cognitives et sociales.

Inès Karam : Je nuancerai : la régulation ne doit pas écraser les PME, qui n'ont ni les juristes ni les budgets des géants américains. L'Europe doit proposer des guichets d'accompagnement, des modèles open source certifiés, et des standards interopérables. Sinon, seules les multinationales pourront se conformer, et nous renforcerons paradoxalement leur domination.

Présentatrice : Un dernier mot sur la fracture numérique ?

Yann Lefèvre : Elle ne se limite plus à l'accès à Internet. Aujourd'hui, elle concerne la capacité à comprendre, contester et utiliser les outils d'IA. Un citoyen informé n'est pas un citoyen qui consomme plus de technologie : c'est un citoyen qui sait poser les bonnes questions.

Présentatrice : Inès Karam, la souveraineté numérique est-elle compatible avec des infrastructures cloud américaines ?

Inès Karam : Compatible seulement si nous imposons chiffrement, auditabilité et portabilité. Stocker en Europe ne suffit pas si les clés restent contrôlées par des entités soumises au Cloud Act. Nous avons besoin de standards ouverts et de compétences locales pour administrer nos propres instances.

Yann Lefèvre : Et côté éducation, le numérique peut aussi réduire les inégalités — accès à des ressources premium, tutorat en ligne — si l'État garantit équipement et bande passante. Sinon, la fracture se reproduit : certains élèves promptent des IA avancées, d'autres peinent à ouvrir un PDF.

Présentatrice : Les deepfakes menacent-ils la confiance démocratique ?

Inès Karam : Oui. D'où l'importance de l'étiquetage obligatoire, de la traçabilité des contenus synthétiques, et de la formation des citoyens à vérifier les sources. La régulation ne doit pas viser l'interdiction, mais la transparence et la responsabilité des plateformes qui amplifient.

Présentatrice : L'Europe peut-elle vraiment rivaliser sans sacrifier ses valeurs ?

Inès Karam : Oui, en misant sur l'interopérabilité, la formation et des modèles ouverts — pas sur l'autarcie.

Yann Lefèvre : Et en refusant que l'innovation serve uniquement à optimiser la surveillance.

Présentatrice : Dernier sujet : les deepfakes électoraux.

Inès Karam : Nous avons besoin de sanctions rapides, de vérification collaborative et de médiation éducative — pas seulement de technologie de détection arrive trop tard.

Yann Lefèvre : Former les citoyens à douter intelligemment est aussi important que de réguler les plateformes.

Présentatrice : En résumé : former, réguler, diversifier — sans exclure.

Yann Lefèvre : Exactement.

Inès Karam : Et sans laisser les PME sur le bord de la route.

Présentatrice : Avant de conclure, revenons sur la souveraineté des données personnelles.

Inès Karam : Le RGPD a posé des principes solides, mais son application inégale alimente le cynisme. Il faut des contrôles plus rapides et des sanctions proportionnées au chiffre d'affaires des contrevenants, pas seulement des amendes symboliques.

Yann Lefèvre : Et former les citoyens à lire les paramètres de confidentialité — une compétence civique aussi essentielle que l'alphabetisation numérique de base.""",
        "short1": """Flash info — Une étude de l'Observatoire des jeunes et du numérique révèle que 62 % des adolescents français utilisent quotidiennement des filtres d'intelligence artificielle sur les réseaux sociaux. Les psychologues alertent sur l'écart croissant entre image réelle et image numérique, et sur la baisse de l'estime de soi chez les filles de quatorze à dix-sept ans. L'étude recommande des modules de médiation parentale et scolaire dès la cinquième.""",
        "short2": """Communiqué — Le ministère de l'Éducation nationale annonce un plan de formation des enseignants à l'IA pédagogique : dix mille places la première année, avec un module obligatoire sur l'esprit critique et la détection de contenus synthétiques. Les syndicats saluent l'initiative mais demandent du temps dégagé sur le temps de travail, arguant que 68 % des professeurs se disent insuffisamment formés aux outils numériques.""",
    },
    "paper-03": {
        "long": """Bienvenue dans  Regards culturels . Ce soir, Amélie Durand, directrice du festival documentaire Visions du réel, et Thomas Girard, critique de cinéma et enseignant en esthétique, débattent de l'avenir de la culture à l'ère des plateformes.

Présentateur : Amélie Durand, le documentaire vit-il un paradoxe ?

Amélie Durand : Un paradoxe absolu. Jamais autant de films n'ont été produits — caméras légères, financements participatifs, archives numériques —, jamais la diffusion en salle n'a été aussi fragile. Les plateformes offrent une vitrine mondiale, mais imposent des formats courts, des accroches immédiates, et une logique d'algorithme qui peut étouffer les œuvres longues et exigeantes. Le documentaire d'auteur, qui demande du temps et de l'attention, peine à trouver sa place dans des interfaces conçues pour la rétention rapide.

Présentateur : Thomas Girard, partagez-vous ce diagnostic ?

Thomas Girard : Oui, mais j'ajoute une dimension esthétique. La culture n'est pas qu'un produit à consommer : c'est un espace de confrontation avec l'autre, avec l'histoire, avec l'inconnu. Quand tout devient contenu personnalisé, on risque de confirmer nos préférences au lieu de les déstabiliser. Les festivals, les salles indépendantes, les médiations scolaires restent essentiels parce qu'ils créent un public collectif — une salle sombre, un débat après la projection.

Amélie Durand : Exactement. Nos séances-débats remplissent mieux que les projections silencieuses. Nous travaillons avec les lycées : former le regard, c'est former le citoyen. Un adolescent qui analyse un plan-séquence comprend mieux comment une image peut manipuler ou émouvoir — compétence cruciale à l'ère de la désinformation visuelle.

Présentateur : Et le financement public ?

Thomas Girard : Sans aides publiques, seuls les sujets immédiatement rentables survivraient. Or, le rôle de la culture publique est précisément de soutenir ce qui n'est pas rentable mais collectivement nécessaire : création expérimentale, patrimoine, accès des territoires ruraux. Réduire les budgets, c'est appauvrir la diversité des voix.

Amélie Durand : Je précise : la baisse des subventions municipales — stagnation depuis dix ans dans de nombreuses villes — pousse les institutions à chercher des mécènes privés. Cela peut enrichir, mais aussi orienter la programmation vers des sujets  brandables . L'indépendance éditoriale des festivals devient un combat permanent.

Présentateur : Les jeunes publics sont-ils perdus pour la culture  live  ?

Thomas Girard : Non, mais il faut adapter sans trahir. Tarifs solidaires, horaires flexibles, formats hybrides — projection suivie d'un podcast en ligne —, et surtout une éducation artistique dès l'école primaire. Une enquête récente montre que 35 % des dix-huit–vingt-cinq ans n'ont pas fréquenté de lieu culturel payant en un an, mais 58 % consomment régulièrement des contenus culturels en ligne. Le défi est de convertir cette curiosité numérique en expérience partagée.

Amélie Durand : Un dernier mot : la culture n'est pas un luxe décoratif. Dans les périodes de crise, elle cimente le lien social et permet de nommer collectivement ce que nous traversons.

Présentateur : Thomas Girard, le streaming tue-t-il le cinéma d'auteur ?

Thomas Girard : Il le transforme. Le cinéma d'auteur existe toujours, mais sa visibilité dépend de festivals, de salles art et essai, et de coproductions publiques. Les plateformes financent des documentaires, oui, mais calibrés pour la rétention : trois minutes d'accroche, pas de silence, pas de plan fixe de cinq minutes. L'attention devient une ressource extractive.

Amélie Durand : Nous compensons par l'événement : rencontres, masterclass, résidences. Le public paie parfois plus cher pour une soirée unique que pour un abonnement mensuel — parce qu'il achète une expérience sociale, pas seulement un flux vidéo.

Présentateur : Et le patrimoine numérisé ?

Thomas Girard : Numériser ne préserve pas tout. Il faut des conservateurs, des restaurateurs, des politiques de dépôt légal pour les œuvres numériques natives. Sinon, nous perdons des formats entiers — jeux indépendants, performances web — faute d'archivage.

Présentateur : La culture a-t-elle encore le pouvoir de transformer ?

Amélie Durand : Oui — quand elle crée du lien réel, pas seulement des clics.

Thomas Girard : À condition qu'on finance la longue durée, pas seulement les buzz.

Présentateur : Et la diversité des programmations ?

Amélie Durand : Sans quotas indicatifs et soutien aux cinéastes émergents, nous aurons des catalogues uniformes.

Thomas Girard : Le public existe — il faut lui donner des ponts vers les œuvres exigeantes, pas seulement des bandes-annonces de deux minutes.

Présentateur : Merci à nos invités. Retrouvez l'intégralité sur notre site.

Amélie Durand : Et venez en salle — le débat continue après le générique.

Présentateur : Un mot sur la diversité des publics ?

Amélie Durand : Nous programmons des séances en langue des signes, des audiodescriptions renforcées, des tarifs solidaires. L'accessibilité n'est pas un supplément : c'est une condition de la démocratisation réelle.

Thomas Girard : Les plateformes peinent à reproduire cette diversité d'accueil — leur logique est standardisée, notre mission est singulière.""",
        "short1": """Culture — Le Louvre annonce une plage horaire mensuelle  Nuit des moins de vingt-six ans  : accès gratuit de vingt heures à minuit, avec médiation par des étudiants en histoire de l'art. En septembre, 4 200 jeunes avaient participé à la première édition, dépassant les prévisions de 40 %. Le musée espère élargir le dispositif à d'autres établissements nationaux d'ici 2027.""",
        "short2": """Recherche — Une étude publiée dans Cognition & Culture montre que la lecture de fiction améliore l'empathie mesurée chez les adolescents davantage que la lecture purement informative. Les auteurs recommandent de réintroduire des œuvres narratives complètes au collège, plutôt que des extraits uniquement analytiques.""",
    },
    "paper-04": {
        "long": """Bonjour, vous écoutez  Vie pro . Ce matin, Sophie Bernard, ergonome et chercheuse en santé au travail, et Karim Haddad, directeur des ressources humaines dans un groupe industriel, débattent du sens du travail à l'ère du télétravail hybride.

Présentateur : Sophie Bernard, le télétravail a-t-il amélioré le bien-être des salariés ?

Sophie Bernard : C'est nuancé. Le télétravail hybride a réduit certains stress — trajets, bruit open space —, mais en a créé d'autres : disponibilité permanente, isolement, brouillage entre vie privée et vie professionnelle. Nos enquêtes montrent que 45 % des salariés hybrides répondent à des messages professionnels hors horaires au moins trois fois par semaine. Le burnout n'est pas qu'une affaire de résilience personnelle : c'est aussi une question d'organisation, de charge et de reconnaissance.

Présentateur : Karim Haddad, comment votre entreprise gère-t-elle ces risques ?

Karim Haddad : Nous avons fixé des règles claires : plages de déconnexion contractuelles, objectifs par résultats plutôt que par présence, et espaces de collaboration intentionnels — deux jours par semaine en présentiel pour les équipes projet. Nous mesurons l'engagement et la charge perçue chaque trimestre via un baromètre anonyme. Ce n'est pas parfait, mais cela permet d'agir avant la rupture.

Sophie Bernard : Attention à ne pas individualiser le problème. Quand une entreprise célèbre la flexibilité sans réduire la charge globale, elle transfère le stress sur le domicile. Les télétravailleurs — surtout les femmes — reprennent souvent les tâches domestiques en parallèle, créant une double journée invisible.

Karim Haddad : Je suis d'accord sur le risque de double charge. C'est pourquoi nous proposons des formations aux managers sur la détection des signaux de surcharge, et un accès élargi au médecin du travail. Nous testons aussi la semaine de quatre jours à salaire constant dans un site pilote — les premiers résultats montrent une baisse de l'absentéisme, mais la charge perçue reste élevée dans certains services.

Présentateur : Le travail a-t-il encore un sens pour les jeunes générations ?

Sophie Bernard : Oui, mais pas n'importe lequel. Les dix-huit–trente ans que nous interviewons valorisent l'autonomie, l'impact social et la qualité des relations plus que le statut hiérarchique. Quand l'organisation ne correspond pas, ils partent — ou se désengagent silencieusement. Le  quiet quitting  est un signal organisationnel, pas une paresse individuelle.

Karim Haddad : Notre défi est de concilier sens et performance. Nous avons lancé des missions à impact interne — réduction des déchets, mentorat — comptabilisées dans l'évaluation annuelle. Cela ne résout pas tout, mais cela revalorise des compétences non techniques.

Présentateur : Un mot sur l'équipement domestique ?

Sophie Bernard : Les troubles musculo-squelettiques liés à des postes mal adaptés — table de cuisine, écran trop bas — ont augmenté de 18 % selon l'INRS. L'employeur doit assumer une part de responsabilité : budget ergonomie, audit à domicile, chaise certifiée. Sinon, on externalise les coûts de santé sur la Sécurité sociale.

Présentateur : Karim, comment mesurez-vous concrètement le bien-être ?

Karim Haddad : Nous croisons absentéisme, turnover, scores de charge perçue, et entretiens qualitatifs semestriels. Les chiffres seuls mentent : un taux d'absentéisme stable peut masquer une présentéisme épuisé. Nous formons les managers à repérer l'isolement des télétravailleurs.

Sophie Bernard : Je plaide pour des indicateurs externes auditables, pas seulement des baromètres internes. Des tiers indépendants pourraient certifier le respect des plages de déconnexion, comme on certifie la sécurité alimentaire.

Présentateur : La semaine de quatre jours est-elle exportable à l'industrie ?

Karim Haddad : Difficilement sans réorganisation des cadences. Dans nos ateliers, nous testons des équipes en 4x8 avec relais, mais cela exige investissement et dialogue syndical. Il n'y a pas de recette unique.

Sophie Bernard : Exactement : le bien-être passe par le pouvoir des salariés à négocier l'organisation, pas par un RH bienveillant qui distribue des applications de méditation.

Présentateur : Le sens du travail peut-il revenir au centre ?

Sophie Bernard : Seulement si les organisations partagent le pouvoir, pas seulement des valeurs affichées.

Karim Haddad : Nos salariés le demandent — nous devons les entendre.

Présentateur : Comment éviter le présentéisme hybride ?

Sophie Bernard : Évaluer les résultats, pas les connexions. Et protéger le droit à la déconnexion sans stigma.

Karim Haddad : Nos managers sont formés à ne pas envoyer de mails nocturnes — la direction doit montrer l'exemple.

Présentateur : Prochain numéro : reconversions et filières vertes.

Sophie Bernard : Avec des salaires décents, j'espère.

Karim Haddad : C'est tout le enjeu.

Présentateur : Le télétravail a-t-il modifié les relations hiérarchiques ?

Sophie Bernard : Oui : certains managers compensent l'absence de présence par une micro-surveillance numérique — relevés de connexion, messages répétés. C'est l'inverse du bien-être promis.

Karim Haddad : Nous avons interdit ces pratiques et formé les encadrants au management par objectifs. La confiance se mesure aux résultats, pas aux pixels verts d'une messagerie.""",
        "short1": """Politique — Une loi expérimentale dans trois régions teste la semaine de quatre jours à salaire égal dans la fonction publique territoriale pendant vingt-quatre mois. Les syndicats demandent un protocole strict de mesure de la charge réelle et un droit de retour à la semaine de cinq jours sans sanction.""",
        "short2": """Statistiques — Selon l'INSEE, le taux de burnout déclaré a augmenté de 18 % en cinq ans chez les cadres du secteur privé. Les médecins du travail citent l'hyper-disponibilité numérique et la dilution des frontières pro/perso comme facteurs principaux.""",
    },
    "paper-05": {
        "long": """Bienvenue dans  Économie et société . Ce matin, Nadia Benali, économiste de la consommation, et Julien Mercier, responsable RSE d'une grande enseigne de distribution, analysent l'écart entre intentions éthiques et comportements d'achat.

Présentatrice : Nadia Benali, les consommateurs consomment-ils vraiment  moins et mieux  ?

Nadia Benali : Depuis la pandémie, une partie des consommateurs dit vouloir consommer moins et mieux. Pourtant, les données de vente montrent que le volume global de biens jetables continue d'augmenter — emballages, fast fashion, appareils électroniques. Il y a un écart massif entre intentions déclarées et comportements réels. D'abord, le prix : les produits durables restent souvent plus chers. Ensuite, le marketing vert : beaucoup d'étiquettes écologiques sont floues, ce qui crée de la méfiance. Enfin, l'urgence du quotidien pousse vers la facilité.

Présentatrice : Julien Mercier, comment votre enseigne répond-elle à cette méfiance ?

Julien Mercier : Nous avons lancé un label interne audité par un organisme indépendant, avec critères publics : origine, empreinte carbone, conditions de travail. Ce n'est pas parfait — les coûts de certification sont élevés pour les petits fournisseurs —, mais la transparence progresse. Nos ventes de produits labellisés ont crû de 28 % en deux ans, surtout chez les vingt-cinq–quarante ans urbains.

Nadia Benali : Je nuancerai : le greenwashing persiste. Une enquête de l'UFC-Que choisir montre que 34 % des allégations  éco-responsables  sur les emballages sont impossibles à vérifier. Sans régulation stricte, le consommateur éthique devient détective — ce qui favorise les classes éduquées et laisse les autres vulnérables aux discours marketing.

Julien Mercier : D'où notre soutien à un label européen harmonisé. Mais les PME de l'économie circulaire peinent à concurrencer nos prix : une bouilloire réparable coûte 40 % plus cher à production égale. Nous négocions des volumes pour les mettre en avant, mais la marge est faible.

Présentatrice : Que peuvent faire les pouvoirs publics ?

Nadia Benali : Trois leviers : fiscalité rendant le durable compétitif ; information fiable et standardisée ; soutien aux filières réparation et réemploi. Le bonus réparation est une bonne piste, mais son montant reste limité. Sans cela, l'éthique reste un luxe pour une minorité.

Julien Mercier : J'ajoute la responsabilité des grandes surfaces : allouer des linéaires stables aux producteurs locaux, accepter des marges réduites sur le durable, et ne pas utiliser le bio comme variable premium sans justification. Les campagnes de boycott sur les réseaux sociaux nous rappellent que la réputation peut chuter en quarante-huit heures.

Présentatrice : Les jeunes sont-ils plus éthiques ?

Nadia Benali : Ils le déclarent plus — 54 % des dix-huit–trente ans disent boycotter occasionnellement une marque —, mais achètent aussi massivement sur des plateformes ultra-rapides. L'éthique est sélective : elle cible les grandes marques visibles, pas toujours ses propres habitudes de consommation numérique.

Présentatrice : Julien, vos clients comprennent-ils les labels ?

Julien Mercier : De moins en moins. Trop de sigles, trop de auto-certifications. Nous simplifions en regroupant nos produits durables sous trois critères affichés en gondole : origine, réparabilité, empreinte carbone indicielle.

Nadia Benali : Simplifier ne suffit pas sans contrôle indépendant. Sinon, c'est encore du marketing. L'État devrait financer des tests aléatoires en laboratoire, comme pour la sécurité alimentaire.

Présentatrice : Le second-hand et le réemploi menacent-ils votre modèle ?

Julien Mercier : Ils nous obligent à innover : abonnements, location longue durée, reprise en fin de vie. Certaines marques voient le réemploi comme une cannibalisation ; d'autres y voient un nouveau marché. La régulation — bonus réparation, index de réparabilité — accélère le mouvement.

Nadia Benali : Oui, mais les PME du réemploi ont besoin d'accès aux pièces et à la visibilité en grande surface. Sans cela, l'économie circulaire reste marginale.

Présentatrice : L'éthique deviendra-t-elle la norme ?

Nadia Benali : Pas sans régulation et justice sociale.

Julien Mercier : Les enseignes qui ne s'adaptent pas perdront la confiance — et le marché.

Présentatrice : Le bio est-il devenu un produit de luxe ?

Nadia Benali : Trop souvent, oui — d'où l'importance des coupons sociaux et de la fiscalité.

Julien Mercier : Nous travaillons à des gammes  accessible  avec marges réduites — c'est un pari économique.

Présentatrice : Merci. La consommation éthique reste un travail collectif.

Nadia Benali : Individuelle et politique — les deux.

Julien Mercier : Nos clients nous y poussent — lentement, mais sûrement.

Présentatrice : Les jeunes consommateurs sont-ils plus exigeants ?

Nadia Benali : Ils le disent, mais ils subissent aussi la précarité. Boycotter une marque sur TikTok ne coûte rien ; payer bio chaque semaine, si.

Julien Mercier : Nous devons rendre l'éthique visible et abordable — sinon, elle reste un badge social pour les aisés.""",
        "short1": """Enquête — Cinquante-quatre pour cent des jeunes de dix-huit à trente ans déclarent boycotter occasionnellement une marque pour des raisons éthiques, mais seulement 18 % vérifient systématiquement les labels avant achat. Les chercheurs parlent d'un  activisme de consommation performatif  sur les réseaux sociaux.""",
        "short2": """Politique — Le gouvernement annonce un bonus réparation étendu aux smartphones et lave-linge dès l'automne, avec une prise en charge de 25 % du coût plafonnée à cent cinquante euros. Les réparateurs indépendants saluent la mesure mais demandent une simplification des pièces détachées imposée aux fabricants.""",
    },
    "paper-06": {
        "long": """Grand entretien sur  Éducation et société . Aujourd'hui, Thomas Leroy, sociologue de la famille et de l'école, et Émilie Vasseur, proviseure de lycée en zone prioritaire.

Présentatrice : Thomas Leroy, la parentalité contemporaine est-elle devenue un terrain de compétition ?

Thomas Leroy : La parentalité est prise en tenaille entre deux injonctions : réussir l'enfant et respecter son autonomie. Les réseaux sociaux amplifient cette pression en exposant des modèles parentaux idéalisés — repas bio, activités extrascolaires multiples, suivi scolaire permanent. Les parents culpabilisent lorsqu'ils ne  optimisent  pas chaque dimension de l'enfance.

Présentatrice : Et l'école dans tout cela ?

Thomas Leroy : L'école concentre les attentes de mobilité sociale. Or, les inégalités scolaires se forment très tôt, souvent avant l'entrée en primaire — vocabulaire, familiarité avec les codes institutionnels, temps parental disponible pour les devoirs. Les familles les mieux informées anticipent, choisissent leurs établissements, accompagnent. Les autres subissent un système opaque.

Émilie Vasseur : Je vois cela chaque jour. Mes élèves de première ont des parcours très inégaux : certains ont déjà une culture générale de lycéen parisien, d'autres peinent à rédiger un paragraphe cohérent faute d'accompagnement à la maison — pas par manque d'intelligence, mais par manque de temps et de méthode transmise. Nous avons ouvert un study hall gratuit deux soirs par semaine ; la fréquentation dépasse nos capacités.

Présentatrice : Faut-il davantage de mixité sociale ?

Thomas Leroy : Oui, mais pas seulement par la carte scolaire. Il faut des moyens pour les établissements — ratios encadrement, remplacement des absences —, une formation des enseignants aux biais implicites, et une politique du logement qui évite la ségrégation urbaine. Sinon, la mixité reste un slogan affiché sur les plaquettes.

Émilie Vasseur : Dans mon lycée, la mixité existe statistiquement, mais les filières se séparent : générale selective vs professionnelle stigmatisée. L'orientation devient un moment de tri social. Les parents les plus informés plaident pour des options, d'autres signent ce qu'on leur propose.

Présentatrice : Et le numérique ?

Thomas Leroy : Le temps d'écran des huit–douze ans a augmenté de quarante minutes en moyenne depuis 2020. L'interdiction du téléphone au collège, testée dans douze établissements, montre des gains de concentration, mais pose des questions de sécurité et de cohésion sociale — les élèves organisent leur vie hors écran autrement.

Émilie Vasseur : Nous préférons la médiation à l'interdiction pure : ateliers sur les algorithmes, fabrication de podcasts, esprit critique. Confisquer sans former ne produit que de la clandestinité.

Présentatrice : Émilie, l'interdiction du téléphone fonctionne-t-elle ?

Émilie Vasseur : Partiellement. Les incidents liés aux réseaux sociaux baissent, la concentration en classe progresse selon nos enseignants. Mais certains élèves contourment, et les familles les plus précaires redoutent de ne pas joindre leur enfant. Il faut des téléphones collectifs en vie scolaire et une médiation numérique sérieuse.

Thomas Leroy : L'école ne peut pas compenser seule vingt ans de politique du logement ségrégative. Tant que les quartiers populaires concentrent les établissements surchargés, les inégalités persisteront. La mixité sociale exige mixité résidentielle.

Présentatrice : Les devoirs à la maison aggravent-ils les écarts ?

Émilie Vasseur : Oui. Nous expérimentons des study halls obligatoires financés par la région : devoirs faits sur place, encadrement, accès à des ressources numériques équitables. Les parents salariés en horaires décalés y voient un soulagement ; les élèves gagnent en méthode.

Thomas Leroy : C'est une piste, mais il faudrait généraliser avec des moyens stables, pas des projets ponctuels.

Présentatrice : L'école peut-elle tout porter ?

Thomas Leroy : Non — elle doit être soutenue par logement, santé, culture.

Émilie Vasseur : Mais elle reste le levier le plus universel — si on la finance.

Présentatrice : Que dire aux parents épuisés ?

Thomas Leroy : Alléger les injonctions, renforcer l'école, garantir des temps de loisirs non marchandisés.

Émilie Vasseur : Et reconnaître que nous ne compensons pas vingt ans de coupes budgétaires en un trimestre.

Présentatrice : L'école ne peut pas tout, mais elle peut beaucoup — si on l'aide.

Thomas Leroy : C'est la condition sine qua non.

Émilie Vasseur : Mes élèves le méritent.

Présentatrice : L'orientation scolaire est-elle transparente ?

Thomas Leroy : Non. Parcoursup et les options demeurent opaques pour les familles peu familiarisées avec le système. La méritocratie affichée masque une sélection sociale préalable.

Émilie Vasseur : Nous organisons des ateliers d'orientation dès la troisième — avec des intervenants extérieurs — pour réduire cette asymétrie d'information.

Présentatrice : Un mot sur le numérique à l'école ?

Thomas Leroy : Il faut enseigner l'esprit critique, pas seulement l'outil. Sinon, nous produisons des utilisateurs passifs face aux IA.

Émilie Vasseur : Et garantir l'équipement pour tous — sinon, nous creusons encore les écarts.""",
        "short1": """Recherche — Le CNRS publie une étude : le temps d'écran quotidien des enfants de huit à douze ans a augmenté de quarante minutes en moyenne depuis 2020, surtout pour les vidéos courtes. Les auteurs recommandent des règles familiales co-construites plutôt que des interdictions unilatérales.""",
        "short2": """Éducation — Douze collèges testent l'interdiction du téléphone portable toute la journée scolaire, pause déjeuner incluse. Bilan provisoire : baisse de 22 % des incidents liés aux réseaux sociaux, mais contestation de 35 % des parents invoquant la sécurité trajet.""",
    },
    "paper-07": {
        "long": """Ville en débat  accueille Léa Moretti, architecte-urbaniste, et Paul N'Guessan, maire adjoint chargé de l'urbanisme dans une commune de banlieue parisienne.

Présentateur : Léa Moretti, comment densifier sans asphyxier les centres-villes ?

Léa Moretti : C'est le défi central. On construit trop souvent des tours sans services publics, sans espaces verts, sans commerces de proximité. Le résultat : quartiers dormitories où les habitants partent travailler ailleurs et ne croisent jamais leurs voisins. La densité n'a de sens que si elle s'accompagne de mixité fonctionnelle — logements, bureaux légers, commerces, équipements — et de transports doux performants.

Paul N'Guessan : Je partage le diagnostic, mais les maires sont coincés entre la loi — objectifs de logements, ZAN — et le budget. On nous demande plus de logements sociaux, plus de pistes cyclables, plus de crèches, et moins d'impôts locaux. Sans financements pluriannuels stables, nous reportons les équipements  après  les livraisons immobilières — et le  après  n'arrive jamais.

Léa Moretti : D'où l'importance de la participation citoyenne dès l'esquisse. Trop souvent, les concerts publics arrivent quand le projet est figé. Les habitants ont l'impression d'être consultés pour valider, pas pour co-concevoir. À Bordeaux, un projet de rénovation de quartier a été repensé après des ateliers avec maquettes : hauteur réduite, cour végétalisée préservée, commerce de bouche maintenu.

Paul N'Guessan : Nous testons des budgets participatifs — 800 000 euros par an, soit 0,8 % du budget municipal — pour des micro-projets choisis par les habitants : mobiliers urbains, jardins, éclairage. Ce n'est pas magique, mais cela réduit les conflits en montrant que la mairie écoute avant l'engagement lourd.

Présentateur : Et les commerces de proximité ?

Léa Moretti : Ils disparaissent dans les centres-villes de moins de vingt mille habitants : concurrence des zones commerciales périurbaines, loyers, livraisons e-commerce. Sans commerce, plus de vie de quartier ; sans vie, moins de sécurité ressentie. Il faut des loyers encadrés pour les artisans, des pieds-à-terre commerciaux publics.

Paul N'Guessan : À Lyon, quinze kilomètres de pistes cyclables sécurisées sont financés en partie par l'État — bonne nouvelle —, mais les commerçants de l'axe central craignent la perte de places de stationnement. Nous négocions des livraisons nocturnes et des arrêts minute, mais le dialogue est tendu.

Présentateur : Un mot sur les tours de logements sociaux ?

Léa Moretti : Les reconstruire est nécessaire — énergivores, inaccessible —, mais les projets doivent inclure écoles, santé, espaces partagés. Sinon, on répète les erreurs des grands ensembles des années soixante.

Paul N'Guessan : Nos habitants demandent surtout de la prévisibilité : savoir ce qui sera construit, quand, avec quels services. L'opacité nourrit la défiance.

Présentateur : Paul, les objectifs ZAN bloquent-ils vos projets ?

Paul N'Guessan : Ils nous contraignent à densifier là où nous manquons de transports. Nous négocions avec la région des financements pour des lignes de bus à haut niveau de service avant d'approuver de nouvelles tours. Sinon, nous créons des quartiers sans mobilité réelle.

Léa Moretti : La ZAN est nécessaire écologiquement, mais mal appliquée socialement si elle ignore les besoins locaux. Il faudrait des quotas de logements abordables liés à chaque permis, pas des promesses postérieures.

Présentateur : Comment éviter que la participation ne soit pas qu'un alibi ?

Paul N'Guessan : En donnant du pouvoir : budgets participatifs significatifs, droit de veto consultatif sur les hauteurs, médiateurs indépendants financés par l'État. Sinon, les habitants fatiguent de parler sans être entendus.

Léa Moretti : Et en planifiant les commerces de proximité dès l'esquisse : pieds-à-terre publics, loyers encadrés pour artisans, livraisons consolidées. Une ville sans boulangerie n'est pas une ville durable, c'est un dormitory.

Présentateur : La ville de demain sera-t-elle plus juste ?

Léa Moretti : Seulement si densité rime avec services et participation.

Paul N'Guessan : Nos habitants nous jugent sur les résultats concrets — pas sur les slogans.

Présentateur : Les jeunes ménages peuvent-ils encore s'installer en ville ?

Léa Moretti : Pas sans logements abordables réels — pas des quotas papier.

Paul N'Guessan : Nous négocions avec l'État des prêts bonifiés pour primo-accédants dans nos opérations.

Présentateur : La ville se transforme — avec ou sans consentement.

Léa Moretti : Mieux vaut avec.

Paul N'Guessan : Nos ateliers le prouvent chaque mois.

Présentateur : Le télétravail modifie-t-il la ville ?

Léa Moretti : Oui : moins de bureaux en centre, plus de logements reconvertis. Il faut anticiper : commerces de quartier, crèches, espaces partagés — pas seulement des mètres carrés supplémentaires.

Paul N'Guessan : Nous révisons nos PLU pour intégrer ces mutations. Une ville qui dort le jour faute d'activités locales n'est pas une ville vivante.""",
        "short1": """Mobilité — Lyon annonce quinze kilomètres de pistes cyclables sécurisées d'ici 2027, cofinancées par l'État à hauteur de 40 %. Les associations cyclistes saluent ; la confédération des commerçants demande des études d'impact économique avant travaux.""",
        "short2": """Commerce — Un rapport alerte : 28 % des commerces de proximité ont fermé en dix ans dans les centres-villes de moins de vingt mille habitants. Causes : zones commerciales périurbaines, loyers, livraisons express. Recommandation : loyers encadrés pour artisans et pieds-à-terre commerciaux publics.""",
    },
    "paper-08": {
        "long": """Sciences et société  reçoit la docteure Amina Khelifi, chercheuse en biotechnologies, et le professeur Marc Delorme, bioéthicien.

Présentateur : Amina Khelifi, où en sont les thérapies géniques ?

Amina Khelifi : Elles progressent rapidement — maladies rares, certains cancers, déficits immunitaires —, but l'accès reste profondément inégal. Les coûts dépassent parfois plusieurs centaines de milliers d'euros par patient. Sans régulation et sans négociation collective des prix, on risque une médecine à deux vitesses : les richissimes pays et patients d'abord, le reste ensuite.

Présentateur : Marc Delorme, quelles questions éthiques cela soulève-t-il ?

Marc Delorme : Elles sont centrales. Modifier le génome — surtout la lignée germinale transmissible aux générations futures — soulève consentement, irreversibilité, définition du  normal . Il faut des comités indépendants, transparence des essais, débat public informé. Les décisions ne peuvent pas rester technocratiques.

Amina Khelifi : Je précise : les thérapies somatiques actuelles — non transmissibles — ont déjà sauvé des enfants. Le défi est l'accès : l'Agence européenne des médicaments a autorisé un traitement pour une maladie rare touchant environ deux mille patients en Europe, mais seuls 400 ont été traités faute de financement.

Marc Delorme : D'où la pétition de scientifiques demandant un moratoire sur certaines modifications germinales tant qu'un consensus international n'est pas atteint. La course à la publication et au brevet ne doit pas précéder la réflexion éthique.

Présentateur : L'Europe est-elle en retard ?

Amina Khelifi : Sur le financement de la recherche fondamentale, parfois — budgets stables mais inférieurs aux États-Unis et à la Chine en croissance. Sur le cadre éthique, elle est plutôt en avance : Charte de bioéthique, comités locaux, interdiction de certaines modifications germinales. Le défi : allier innovation et justice d'accès.

Marc Delorme : Les associations de patients demandent un accès équitable et une transparence sur les essais — données négatives comprises. Trop souvent, seuls les résultats positifs sont publiés, biaisant le débat public.

Présentateur : Et l'IA en recherche biomédicale ?

Amina Khelifi : Elle accélère la découverte de cibles thérapeutiques, but elle ne remplace pas les essais cliniques ni l'évaluation éthique. Un algorithme peut proposer une molécule ; seul un protocole rigoureux prouve qu'elle ne fait pas plus de mal que de bien.

Marc Delorme : Un dernier mot : sans débat public, les décisions technocratiques perdent en légitimité — cf. controverses sur les vaccins ou les OGM. La confiance se construit par transparence et participation, pas par communication descendante.

Présentateur : Marc, faut-il un moratoire total sur les modifications germinales ?

Marc Delorme : Moratoire prudent sur la lignée germinale transmissible, oui — tant qu'il n'y a pas consensus international et protocoles de suivi intergénérationnel. Pour les thérapies somatiques, la prudence ne doit pas devenir obstruction face à des maladies létales.

Amina Khelifi : Je souscris. Le moratoire ne doit pas pénaliser les essais somatiques qui sauvent des vies aujourd'hui. La distinction est fondamentale pour le débat public, souvent brouillée par des titres sensationnalistes.

Présentateur : L'IA accélère-t-elle les essais cliniques de manière sûre ?

Amina Khelifi : Elle accélère la phase de cible, pas la validation humaine. Nous utilisons des modèles pour prioriser des molécules, mais chaque candidat passe par des phases rigoureuses, comités d'éthique inclus. Raccourcir cette étape serait dangereux.

Marc Delorme : Et il faut publier les échecs. La crédibilité scientifique repose sur des résultats négatifs accessibles, sinon le public croit à des miracles et rejette ensuite toute vaccination ou thérapie.

Présentateur : La science restera-t-elle un bien commun ?

Amina Khelifi : Elle doit l'être — nos impôts la financent.

Marc Delorme : Alors le débat public doit être aussi rigoureux que les protocoles.

Présentateur : Un mot sur l'accès aux soins dans les territoires ruraux.

Amina Khelifi : Les thérapies complexes ne doient pas être réservées aux métropoles — il faut des centres régionaux équipés.

Marc Delorme : Et une information loyale pour les patients, sans promesses marketing.

Présentateur : Science et démocratie doivent avancer ensemble.

Amina Khelifi : Sinon, nous perdons les deux.

Marc Delorme : La confiance est notre ressource la plus fragile.

Présentateur : Les patients comprennent-ils les essais cliniques ?

Amina Khelifi : Pas toujours. D'où l'importance des associations de patients experts, des consentements clarifiés, des délais de réflexion réels — pas des formulaires de vingt pages illisibles.

Marc Delorme : La médecine avancée exige une literacy scientifique collective. Sans cela, les fake news médicales combleront le vide.

Présentateur : La recherche publique est-elle suffisante ?

Amina Khelifi : Non. Sans budgets stables, nous dépendons du privé pour financer l'essentiel — et les prix suivent.

Marc Delorme : D'où l'importance des marchés publics européens pour les médicaments innovants.""",
        "short1": """Santé — L'Agence européenne des médicaments a autorisé un nouveau traitement génique contre une maladie rare neuromusculaire touchant environ deux mille patients en Europe. Prix annoncé : 1,9 million d'euros par dose. Les États négocient un accès progressif par cohortes.""",
        "short2": """Éthique — Une pétition signée par 120 chercheurs demande un moratoire sur certaines modifications germinales tant qu'un consensus international n'est pas atteint. Ils invoquent transmissibilité aux générations futures et risques d'usage non thérapeutique.""",
    },
}

async def generate_paper(slug: str, data: dict[str, str] | None = None) -> None:
    data = data or PAPERS[slug]
    audio_dir = PAPERS_DIR / slug / "audio"
    print(f"\n== {slug} ==")
    # Prefer dialogue synthesis with collapsed speaker labels
    long_text = data["long"]
    lines = []
    for raw in long_text.split("\n"):
        line = raw.strip()
        if not line:
            continue
        if " :" in line or " : " in line:
            parts = re.split(r"\s*:\s*", line, maxsplit=1)
            if len(parts) == 2 and len(parts[0]) < 40:
                speaker, speech = parts
                lines.append(f"{speaker}. {speech}")
                continue
        lines.append(line)
    await synthesize(" ".join(lines), VOICE_HOST, audio_dir / "long.mp3")
    await synthesize(data["short1"], VOICE_NEWS, audio_dir / "short-1.mp3")
    await synthesize(data["short2"], VOICE_GUEST_F, audio_dir / "short-2.mp3")
    for wav in audio_dir.glob("*.wav"):
        wav.unlink()
        print(f"  removed {wav.name}")


async def main(argv: list[str]) -> None:
    slugs = argv[1:] if len(argv) > 1 else list(PAPERS.keys())
    for slug in slugs:
        if slug not in PAPERS:
            print(f"Unknown paper: {slug}", file=sys.stderr)
            sys.exit(1)
        await generate_paper(slug, PAPERS[slug])
    print("\nDone.")


if __name__ == "__main__":
    asyncio.run(main(sys.argv))
