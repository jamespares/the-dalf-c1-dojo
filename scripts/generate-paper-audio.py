#!/usr/bin/env python3
"""Generate French listening audio for static DALF papers via edge-tts."""

from __future__ import annotations

import asyncio
import re
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
PAPERS_DIR = ROOT / "public" / "papers"

# fr-FR neural voices
VOICE_HOST = "fr-FR-HenriNeural"
VOICE_GUEST_F = "fr-FR-DeniseNeural"
VOICE_GUEST_M = "fr-FR-RemyMultilingualNeural"
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


async def synth_long_dialogue(transcript: str, out_path: Path) -> None:
    """Prefer a single natural narration for reliability and timing."""
    # Collapse speaker labels into spoken prose for cleaner TTS
    lines = []
    for raw in transcript.split("\n"):
        line = raw.strip()
        if not line:
            continue
        # "Name : text" → keep as spoken with slight pause via period
        if " :" in line or " : " in line:
            parts = re.split(r"\s*:\s*", line, maxsplit=1)
            if len(parts) == 2 and len(parts[0]) < 40:
                speaker, speech = parts
                lines.append(f"{speaker}. {speech}")
                continue
        lines.append(line)
    await synthesize(" ".join(lines), VOICE_HOST, out_path)


# Transcripts keyed by paper slug — keep in sync with src/data/static-papers.ts
PAPERS: dict[str, dict[str, str]] = {
    "paper-01": {
        "long": """Bonjour et bienvenue dans Débats d'aujourd'hui. Ce soir, nous recevons Claire Moreau, urbaniste et auteure d'un rapport sur la renaturation des villes européennes.

Claire Moreau. Depuis dix ans, les métropoles européennes multiplient les projets de végétalisation. Ce n'est plus seulement une question d'esthétique : il s'agit de santé publique, de lutte contre les îlots de chaleur et de résilience face aux canicules. À Paris, Lyon ou Barcelone, on observe une baisse mesurable de la température de surface dans les quartiers où l'on a planté des arbres et créé des corridors verts.

Présentateur. Pourtant, certains habitants dénoncent une végétalisation de luxe qui gentrifie les quartiers populaires.

Claire Moreau. C'est un risque réel. Si l'on améliore le cadre de vie sans politiques de logement social, les loyers augmentent et les populations les plus modestes sont poussées vers la périphérie — là où, paradoxalement, l'exposition à la chaleur et à la pollution est souvent plus forte. La renaturation doit donc être accompagnée d'une gouvernance inclusive : concerts de quartier, plafonds de loyer, et obligation de maintenir une part de logements abordables.

Présentateur. Quels résultats concrets avez-vous mesurés ?

Claire Moreau. Dans les villes pilotes, on constate une réduction de un virgule cinq à trois degrés en été dans les zones densément végétalisées, une meilleure rétention des eaux de pluie, et une hausse de la fréquentation des espaces publics. Mais le défi majeur reste le financement : planter ne suffit pas, il faut entretenir pendant des décennies. Les collectivités qui réussissent sont celles qui budgétisent l'entretien dès le départ, et non seulement l'inauguration.""",
        "short1": """Flash info. Le Parlement européen a adopté une directive visant à réduire de quarante pour cent l'usage des pesticides chimiques d'ici deux mille trente. Les organisations agricoles dénoncent un calendrier irréaliste, tandis que les ONG environnementales jugent l'objectif insuffisant.""",
        "short2": """Interview courte. Marc Petit, maire d'une commune littorale. Nous avons dû avancer de quinze jours la fermeture de certaines plages cet été en raison des algues toxiques. Ce n'est plus exceptionnel : c'est devenu saisonnier.""",
    },
    "paper-02": {
        "long": """Émission Tech et Société. Invité : Yann Lefèvre, sociologue du numérique.

Yann Lefèvre. L'intelligence artificielle générative transforme le travail intellectuel plus vite que les institutions ne s'adaptent. Dans l'éducation, on voit deux camps : ceux qui interdisent ChatGPT, et ceux qui l'intègrent comme outil d'apprentissage. Or, interdire sans former crée un angle mort : les élèves l'utilisent quand même, sans esprit critique.

Présentatrice. Et dans le monde du travail ?

Yann Lefèvre. Les métiers de la rédaction, du code, du design sont déjà reconfigurés. Ce n'est pas forcément une destruction nette d'emplois, mais une polarisation : les profils capables de piloter l'IA gagnent en productivité, tandis que les tâches répétitives s'automatisent. Le risque social, c'est l'absence de formation continue pour les salariés de plus de quarante ans.

Présentatrice. Faut-il réguler ?

Yann Lefèvre. Oui, mais une régulation intelligente. Transparence sur l'usage de l'IA dans les médias, droit à la formation, et responsabilité des plateformes sur les contenus synthétiques. L'Europe avance avec l'AI Act ; encore faut-il que les PME puissent s'y conformer sans être écrasées par la charge administrative.""",
        "short1": """Une étude révèle que soixante-deux pour cent des adolescents français utilisent quotidiennement des filtres d'intelligence artificielle sur les réseaux sociaux. Les psychologues alertent sur l'écart croissant entre image réelle et image numérique.""",
        "short2": """Le ministère de l'Éducation annonce un plan de formation des enseignants à l'IA pédagogique, avec dix mille places la première année.""",
    },
    "paper-03": {
        "long": """Magazine culturel. Invité : Amélie Durand, directrice d'un festival de cinéma documentaire.

Amélie Durand. Le documentaire vit un paradoxe. Jamais autant de films n'ont été produits, jamais la diffusion en salle n'a été aussi fragile. Les plateformes offrent une vitrine mondiale, mais imposent des formats courts, des accroches immédiates, et une logique d'algorithme qui peut étouffer les œuvres longues et exigeantes.

Présentateur. Comment résistez-vous ?

Amélie Durand. Par le lien avec le public. Nos séances-débats remplissent mieux que les projections silencieuses. Le documentaire n'est pas seulement un objet à consommer : c'est un espace de discussion démocratique. Nous travaillons aussi avec les lycées : former le regard, c'est former le citoyen.

Présentateur. Et le financement ?

Amélie Durand. Les aides publiques restent vitales. Sans elles, seuls les sujets porteurs survivraient. Or, le rôle de la culture publique est précisément de soutenir ce qui n'est pas immédiatement rentable, mais collectivement nécessaire.""",
        "short1": """Le Louvre a annoncé une plage horaire réservée aux visiteurs de moins de vingt-six ans un soir par mois, avec médiation gratuite.""",
        "short2": """Une étude montre que la lecture de fiction améliore l'empathie mesurée chez les adolescents, davantage que la lecture purement informative.""",
    },
    "paper-04": {
        "long": """Débat radio. Le travail a-t-il encore un sens ?

Sophie Bernard, ergonome. Le télétravail hybride a réduit certains stress, notamment les trajets, mais en a créé d'autres : disponibilité permanente, isolement, brouillage entre vie privée et vie professionnelle.

Karim Haddad, directeur des ressources humaines. Les entreprises qui réussissent fixent des règles claires : plages de déconnexion, objectifs par résultats plutôt que par présence, et espaces de collaboration intentionnels.

Sophie Bernard. Attention à ne pas individualiser le problème. Le burnout n'est pas qu'une affaire de résilience personnelle : c'est aussi une question d'organisation, de charge, et de reconnaissance.

Karim Haddad. D'accord. Nous mesurons désormais l'engagement et la charge perçue chaque trimestre. Ce n'est pas parfait, mais cela permet d'agir avant la rupture.""",
        "short1": """Une loi expérimentale dans trois régions teste la semaine de quatre jours à salaire égal dans la fonction publique territoriale.""",
        "short2": """Selon l'INSEE, le taux de burnout déclaré a augmenté de dix-huit pour cent en cinq ans chez les cadres du secteur privé.""",
    },
    "paper-05": {
        "long": """Émission Économie et société. Ce matin, nous recevons Nadia Benali, économiste spécialisée dans la consommation éthique.

Nadia Benali. Depuis la pandémie, une partie des consommateurs dit vouloir consommer moins et mieux. Pourtant, les données de vente montrent que le volume global de biens jetables continue d'augmenter. Il y a donc un écart entre les intentions déclarées et les comportements réels.

Présentateur. Pourquoi cet écart ?

Nadia Benali. D'abord, le prix. Les produits durables restent souvent plus chers. Ensuite, le marketing vert : beaucoup d'étiquettes écologiques sont floues, ce qui crée de la méfiance. Enfin, l'urgence du quotidien pousse vers la facilité.

Présentateur. Que peuvent faire les pouvoirs publics ?

Nadia Benali. Trois leviers : une fiscalité qui rend le durable compétitif, une information fiable et standardisée, et le soutien aux filières de réparation et de réemploi. Sans cela, l'éthique reste un luxe pour une minorité.""",
        "short1": """Une enquête européenne indique que cinquante-quatre pour cent des jeunes de dix-huit à trente ans déclarent boycotter occasionnellement une marque pour des raisons éthiques.""",
        "short2": """Le gouvernement annonce un bonus réparation étendu aux smartphones et aux lave-linge dès l'automne prochain.""",
    },
    "paper-06": {
        "long": """Grand entretien. Invité : Thomas Leroy, sociologue de la famille et de l'éducation.

Thomas Leroy. La parentalité contemporaine est prise en tenaille entre deux injonctions : réussir l'enfant et respecter son autonomie. Les réseaux sociaux amplifient cette pression en exposant des modèles parentaux idéalisés.

Présentatrice. Et l'école dans tout ça ?

Thomas Leroy. L'école concentre les attentes de mobilité sociale. Or, les inégalités scolaires se forment très tôt, souvent avant même l'entrée en primaire. Les familles les mieux informées anticipent, choisissent, accompagent. Les autres subissent un système opaque.

Présentatrice. Faut-il davantage de mixité sociale ?

Thomas Leroy. Oui, mais pas seulement par la carte scolaire. Il faut aussi des moyens pour les établissements, une formation des enseignants aux biais, et une politique du logement qui évite la ségrégation urbaine. Sinon, la mixité reste un slogan.""",
        "short1": """Selon une étude du CNRS, le temps d'écran quotidien des enfants de huit à douze ans a augmenté de quarante minutes en moyenne depuis deux mille vingt.""",
        "short2": """Une expérimentation dans douze collèges teste l'interdiction du téléphone portable pendant toute la journée scolaire, y compris la pause déjeuner.""",
    },
    "paper-07": {
        "long": """Débat. Urbanisme et transformation des villes. Avec Léa Moretti, architecte, et Paul N'Guessan, élu local.

Léa Moretti. Densifier les centres sans les asphyxier, voilà le défi. On construit trop souvent des tours sans services publics, sans espaces verts, sans commerces de proximité. Le résultat : des quartiers dortoirs.

Paul N'Guessan. Je suis d'accord sur le diagnostic, mais les maires sont coincés entre la loi et le budget. On nous demande plus de logements sociaux, plus de mobilité douce, et moins d'impôts. Il faut des financements pluriannuels stables.

Léa Moretti. Et la participation citoyenne ? Trop souvent, les concerts publics arrivent trop tard, quand le projet est déjà figé. Il faudrait co-concevoir dès l'esquisse.

Paul N'Guessan. Nous testons des ateliers de quartier avec maquettes et budgets participatifs. Ce n'est pas magique, mais cela réduit les conflits plus tard.""",
        "short1": """La ville de Lyon annonce la création de quinze kilomètres de pistes cyclables sécurisées d'ici deux mille vingt-sept, financés en partie par l'État.""",
        "short2": """Un rapport alerte sur la disparition progressive des commerces de proximité dans les centres-villes de moins de vingt mille habitants.""",
    },
    "paper-08": {
        "long": """Sciences et société. Invité : Docteur Amina Khelifi, chercheuse en biotechnologies.

Amina Khelifi. Les thérapies géniques progressent rapidement, mais l'accès reste inégal. Les coûts de traitement peuvent dépasser plusieurs centaines de milliers d'euros par patient. Sans régulation, on risque une médecine à deux vitesses.

Présentateur. Et la question éthique ?

Amina Khelifi. Elle est centrale. Modifier le génome soulève des questions de consentement, de transmissibilité aux générations futures, et de définition du normal. Il faut des comités indépendants, une transparence des essais, et un débat public informé, pas seulement des décisions technocratiques.

Présentateur. L'Europe est-elle en retard ?

Amina Khelifi. Sur le financement de la recherche fondamentale, parfois. Sur le cadre éthique, elle est plutôt en avance. Le défi, c'est d'allier innovation et justice d'accès.""",
        "short1": """L'Agence européenne des médicaments a autorisé un nouveau traitement contre une maladie génétique rare touchant environ deux mille patients en Europe.""",
        "short2": """Une pétition de scientifiques demande un moratoire sur certaines modifications germinales tant qu'un consensus international n'est pas atteint.""",
    },
}


async def generate_paper(slug: str) -> None:
    data = PAPERS[slug]
    audio_dir = PAPERS_DIR / slug / "audio"
    print(f"\n== {slug} ==")
    await synthesize(data["long"], VOICE_HOST, audio_dir / "long.mp3")
    await synthesize(data["short1"], VOICE_NEWS, audio_dir / "short-1.mp3")
    await synthesize(data["short2"], VOICE_GUEST_F, audio_dir / "short-2.mp3")
    # Remove old placeholder wavs if present
    for wav in audio_dir.glob("*.wav"):
        wav.unlink()
        print(f"  removed {wav.name}")


async def main(argv: list[str]) -> None:
    slugs = argv[1:] if len(argv) > 1 else list(PAPERS.keys())
    for slug in slugs:
        if slug not in PAPERS:
            print(f"Unknown paper: {slug}", file=sys.stderr)
            sys.exit(1)
        await generate_paper(slug)
    print("\nDone.")


if __name__ == "__main__":
    asyncio.run(main(sys.argv))
