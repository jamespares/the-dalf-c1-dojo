#!/usr/bin/env python3
"""Generate French TTS audio for CEFR practice stories using Microsoft Edge TTS.

Install edge-tts in a virtual environment first:
    python3 -m venv .venv
    source .venv/bin/activate
    pip install edge-tts

Then run:
    python3 scripts/generate-practice-audio.py

Output MP3s are written to public/static/audio/practice/ and served as static assets.
"""

import asyncio
import re
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "public" / "static" / "audio" / "practice"
VOICE = "fr-FR-DeniseNeural"

STORIES = [
    {
        "level": "A1",
        "filename": "a1-une-journee-a-paris.mp3",
        "text": """Bonjour ! Je m'appelle Marie. J'habite à Paris avec ma famille. Chaque matin, je prends le métro pour aller au travail. J'aime beaucoup marcher dans les petites rues de la ville.

Aujourd'hui, il fait beau. Le soleil brille et les oiseaux chantent. Je vais au marché pour acheter des fruits et des légumes frais. Le vendeur est très sympathique. Il me donne une pomme gratuite.

Après le marché, je rentre à la maison. Je prépare un déjeuner simple : du pain, du fromage et une salade verte. Ma sœur vient manger avec moi. Nous parlons de nos vacances. Nous voulons aller à la mer cet été.

L'après-midi, je lis un livre dans le parc. Un chien joue avec une balle. Les enfants rient et courent. C'est une journée tranquille et heureuse.

Le soir, je regarde la télévision avec mes parents. Nous buvons du thé et nous mangeons un gâteau. Je me couche tôt parce que demain est un nouveau jour.""",
    },
    {
        "level": "A2",
        "filename": "a2-mon-premier-voyage-en-france.mp3",
        "text": """L'année dernière, j'ai fait mon premier voyage en France. Je suis allé à Lyon avec mon meilleur ami. Nous avons voyagé en train pendant trois heures. Le paysage était magnifique.

À Lyon, nous avons loué un petit appartement près de la rivière. Chaque matin, nous prenions un café dans une boulangerie du quartier. Le croissant était délicieux et le serveur nous connaissait déjà.

Nous avons visité de vieux quartiers et de belles églises. Nous avons aussi pris beaucoup de photos. Un jour, il a plu, alors nous sommes allés au musée de la soie. J'ai appris beaucoup de choses sur l'histoire de la ville.

Le soir, nous mangions dans des restaurants typiques. J'ai goûté la salade lyonnaise et une quenelle. C'était un peu salé pour moi, mais très bon. Mon ami préférait la tarte aux pommes.

Nous avons rencontré des gens charmants. Un vieux monsieur nous a raconté des histoires sur Lyon il y a cinquante ans. Je n'ai pas tout compris, mais j'ai aimé écouter sa voix.

Ce voyage m'a donné envie de découvrir d'autres villes françaises. La prochaine fois, je voudrais visiter Bordeaux ou Strasbourg.""",
    },
    {
        "level": "B1",
        "filename": "b1-une-nouvelle-vie-a-la-campagne.mp3",
        "text": """Après dix ans à travailler dans une grande entreprise à Londres, Julie a décidé de tout changer. Elle a démissionné, vendu son appartement et acheté une petite maison à la campagne, dans le sud-ouest de la France. Ses amis pensaient qu'elle était folle, mais elle se sentait fatiguée et avait besoin de calme.

Les premiers mois n'ont pas été faciles. Il fallait réparer le toit, apprendre à entretenir le jardin et trouver de nouvelles habitudes. Le village était tranquille, presque trop tranquille. Les commerces fermaient tôt et le supermarché le plus proche se trouvait à vingt minutes en voiture.

Petit à petit, Julie s'est adaptée. Elle a commencé à cuisiner avec des produits locaux : fromage de chèvre, miel, légumes du marché. Elle a pris des cours de poterie et a rencontré des voisins très accueillants. Le dimanche, elle allait au café du village pour lire le journal et discuter de la pluie et du beau temps.

Un jour, elle a eu une idée : pourquoi ne pas transformer une partie de sa maison en chambre d'hôtes ? Elle a fait quelques travaux, acheté des meubles anciens et ouvert son gîte au printemps suivant. Les premiers clients étaient un couple d'Allemands. Ils ont adoré le lieu et ont laissé un commentaire très positif sur Internet.

Aujourd'hui, Julie gagne moins d'argent qu'avant, mais elle vit plus sainement. Elle a appris que le bonheur ne vient pas toujours d'une promotion ou d'un salaire élevé. Parfois, il suffit d'avoir du temps, des amis sincères et un jardin à arroser le matin.""",
    },
    {
        "level": "B2",
        "filename": "b2-le-mystere-du-vieux-phare.mp3",
        "text": """Depuis des générations, les habitants de Port-Rochelle racontaient la même histoire : le soir de certaines tempêtes, on entendait une chanson ancienne sortir du phare abandonné. Personne n'y habitait plus depuis la guerre, pourtant la lumière s'allumait parfois, pendant quelques secondes, avant de disparaître.

Thomas, journaliste pour un magazine régional, avait décidé d'enquêter. Il ne croyait pas aux fantômes, mais il admettait que l'endroit avait une atmosphère étrange. Il passa trois nuits dans le village, interrogea les pêcheurs, consulta les archives municipales et finit par obtenir la clé du phare.

L'intérieur était plus grand qu'il ne l'imaginait. Les murs étaient couverts de gravures : des bateaux, des étoiles, des dates. Au deuxième étage, il trouva une malle poussiéreuse contenant des lettres et des photographies jaunies. Elles racontaient l'histoire d'un gardien et de sa fille, une chanteuse qui avait refusé de quitter l'île pendant l'occupation.

En lisant ces lettres, Thomas comprit que la chanson n'était pas un signe surnaturel. Elle était transmise par les vents, à travers une ouverture spéciale du phare, créant une illusion acoustique parfaite. Quant à la lumière, elle provenait d'un ancien mécanisme alimenté par des batteries solaires, installé par un club d'archéologues amateurs dans les années quatre-vingt.

Thomas publia son article sans détruire le mystère. Il écrivit que certaines légendes méritent d'être préservées, même quand la science leur trouve une explication. Le village, depuis, reçoit encore plus de visiteurs l'hiver. Et parfois, quand le vent souffle dans la bonne direction, on entend toujours cette chanson lointaine.""",
    },
    {
        "level": "C1",
        "filename": "c1-la-fracture-numerique.mp3",
        "text": """À première vue, la révolution numérique semble avoir démocratisé l'accès au savoir. En quelques clics, on peut consulter des encyclopédies entières, suivre des cours universitaires ou dialoguer avec des experts du monde entier. Pourtant, sous cette apparente égalité se cache une fracture profonde qui menace de reproduire, voire d'accentuer, les inégalités sociales.

Cette fracture ne se limite pas à l'accès matériel. Posséder un smartphone ou une connexion Internet ne suffit plus. Il s'agit désormais de savoir comment trier l'information, identifier les biais, protéger ses données et maîtriser les codes culturels des plateformes. Autrement dit, la fracture numérique s'est muée en fracture cognitive et symbolique.

Les conséquences sont particulièrement visibles dans le domaine éducatif. Des élèves dotés des mêmes outils n'en tirent pas tous le même parti. Certains bénéficient d'un environnement familial qui valorise la curiosité intellectuelle, tandis que d'autres restent prisonniers d'une consommation passive de contenus, souvent algorithmiquement prédéterminée. L'école, censée compenser ces disparités, peine parfois à former ses enseignants aux enjeux réels du numérique.

Par ailleurs, la question du travail ne peut être éludée. L'automatisation promet de libérer l'humanité de tâches répétitives, mais elle exclut aussi ceux dont les compétences ne correspondent plus aux besoins du marché. La transformation digitale exige une adaptabilité constante, une qualité que tout le monde n'a pas les moyens de développer.

Face à ces défis, il ne suffit pas de distribuer des appareils. Il faut repenser l'éducation, renforcer la littératie numérique et réguler les géants de la technologie pour qu'ils servent l'intérêt général. Le progrès technologique n'est ni bon ni mauvais en soi ; il devient ce que la société choisit d'en faire.""",
    },
    {
        "level": "C2",
        "filename": "c2-l-art-de-l-essai.mp3",
        "text": """L'essai, dans sa forme la plus accomplie, est bien plus qu'un exercice scolaire ou un genre littéraire convenu : c'est une manière de penser à haute voix, une exploration sans fin où l'esprit se met à l'épreuve devant les contradictions du monde. Dès ses origines, avec Montaigne, il a revendiqué cette liberté de tourner autour d'une question sans prétendre l'épuiser. Le titre des premiers essais, tout simplement « Essais », porte en lui cette humilité fondatrice : tenter, vérifier, tâtonner.

Ce qui distingue l'essai d'autres formes d'argumentation, c'est sa subjectivité assumée. L'essayiste ne cherche pas à dissimuler sa présence derrière une façade d'objectivité scientifique. Au contraire, il met en scène son propre parcours intellectuel, ses hésitations, ses retournements. Le lecteur n'est pas seulement convaincu ; il est invité à partager une aventure de la pensée. C'est peut-être pourquoi l'essai résiste si bien à l'époque des réponses immédiates et des opinions tranchées : il affirme la valeur intrinsèque du doute.

Pourtant, cette liberté n'implique pas le laisser-aller. Un bon essai exige une rigueur implicite, une architecture discrète qui soutient la réflexion sans l'écraser. Chaque digression doit sembler nécessaire, chaque exemple choisi avec soin, chaque transition préparer subtilement la suite. L'art de l'essayiste consiste à faire paraître le hasard comme inévitable et la construction comme spontanée.

Dans le contexte actuel, où l'information circule à une vitesse vertigineuse et où le débat public privilégie souvent l'affect à l'analyse, l'essai offre une contre-mesure précieuse. Il demande du temps, de la distance et une certaine forme de courage : celui de ne pas savoir d'avance où l'on aboutira. C'est peut-être là son enseignement le plus précieux : apprendre à penser, c'est accepter que la pensée soit un mouvement, et non une possession.

Ainsi, l'essai ne nous donne pas de vérités closes. Il nous offre des outils pour habiter le monde avec plus de nuance. À l'heure où tant de discours prétendent tout expliquer, il rappelle que la sagesse commence souvent par une question bien posée.""",
    },
]


def normalize_whitespace(text: str) -> str:
    # Replace paragraph breaks with a single newline; collapse excessive whitespace.
    text = text.strip()
    text = re.sub(r"\n\s*\n", "\n", text)
    return text


async def generate_one(item: dict) -> None:
    output_path = OUTPUT_DIR / item["filename"]
    communicate = edge_tts.Communicate(normalize_whitespace(item["text"]), VOICE)
    await communicate.save(str(output_path))
    print(f"Generated {output_path}")


async def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    tasks = [generate_one(item) for item in STORIES]
    await asyncio.gather(*tasks)
    print(f"\nAll {len(STORIES)} practice audio files written to {OUTPUT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
