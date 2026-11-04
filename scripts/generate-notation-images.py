#!/usr/bin/env python3
"""Génère les petites images de notation (SVG) utilisées par les exercices :
signatures rythmiques et tableau des intervalles, toutes avec la même clé de sol
vectorielle que les exercices interactifs (tracé lu dans src/scripts/exercises/clef.ts).

Usage : python3 scripts/generate-notation-images.py
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLEF_TS = os.path.join(ROOT, 'src', 'scripts', 'exercises', 'clef.ts')
OUT = os.path.join(ROOT, 'public', 'images', '11h-intervalles-et-signatures')
FONT = "Georgia, 'Times New Roman', 'DejaVu Serif', serif"

CLEF = re.search(r"TREBLE_CLEF_PATH =\s*'([^']+)'", open(CLEF_TS, encoding='utf8').read()).group(1)
# Chiffres vectoriels (hauteur égale, « chiffres alignés ») pour que chaque chiffre occupe exactement
# deux interlignes de la portée, quel que soit l'appareil.
DIGITS = json.load(open(os.path.join(ROOT, 'scripts', 'notation-digits.json'), encoding='utf8'))['digits']
DIGIT_HEIGHT = 714  # hauteur des chiffres plats (ex. 1, 4, 7) en unités de police
INK = '#1d1d1b'


def staff(x1, x2, top, gap, color=INK, width=1.4):
    return ''.join(
        f'<line x1="{x1}" y1="{top + i * gap}" x2="{x2}" y2="{top + i * gap}" stroke="{color}" stroke-width="{width}"/>'
        for i in range(5)
    )


def clef(x, bottom, gap, color=INK):
    s = gap / 250
    return f'<path transform="translate({x} {bottom}) scale({s:.4f} {-s:.4f})" fill="{color}" d="{CLEF}"/>'


def number(text, cx, baseline, gap, color=INK):
    """Écrit un nombre centré en cx, posé sur `baseline`, haut de deux interlignes."""
    k = 2 * gap / DIGIT_HEIGHT
    spacing = -20  # léger resserrement entre deux chiffres (unités de police)
    total = sum(DIGITS[c]['width'] for c in text) + spacing * (len(text) - 1)
    x = cx - total * k / 2
    out = ''
    for c in text:
        out += f'<path transform="translate({x:.2f} {baseline}) scale({k:.5f} {-k:.5f})" fill="{color}" d="{DIGITS[c]['d']}"/>'
        x += (DIGITS[c]['width'] + spacing) * k
    return out


def time_signature(num, den):
    gap, top = 14, 26
    bottom = top + 4 * gap
    mid = top + 2 * gap
    # Largeur du nombre le plus large (en px), pour centrer les chiffres après la clé et adapter l'image.
    k = 2 * gap / DIGIT_HEIGHT
    widest = max(sum(DIGITS[c]['width'] for c in t) * k for t in (num, den))
    cx = 62 + widest / 2
    w = max(112, round(cx + widest / 2 + 12))
    body = staff(4, w - 4, top, gap) + clef(6, bottom, gap) + number(num, cx, mid, gap) + number(den, cx, bottom, gap)
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="112" viewBox="0 0 {w} 112" role="img" aria-label="Signature rythmique {num}/{den}"><rect width="{w}" height="112" fill="#fff"/>{body}</svg>'


def note(x, step, bottom, gap):
    half = gap / 2
    y = bottom - step * half
    out = ''
    if step < 0:
        for k in range(-2, step - 1, -2):
            out += f'<line x1="{x - 12}" y1="{bottom - k * half}" x2="{x + 12}" y2="{bottom - k * half}" stroke="{INK}" stroke-width="1.4"/>'
    out += f'<ellipse cx="{x}" cy="{y}" rx="7.5" ry="5.5" fill="none" stroke="{INK}" stroke-width="2.2" transform="rotate(-20 {x} {y})"/>'
    return out


def interval_chart():
    names = ['Prime ou unisson', 'Seconde', 'Tierce', 'Quarte', 'Quinte', 'Sixte', 'Septième', 'Octave']
    gap, cell_w, cell_h = 12, 340, 92
    parts = []
    for i, name in enumerate(names):
        col, row = (0, i) if i < 4 else (1, i - 4)
        ox, oy = col * cell_w + 10, row * cell_h + 16
        top = oy + 8
        bottom = top + 4 * gap
        parts.append(staff(ox, ox + 150, top, gap) + clef(ox + 2, bottom, gap))
        base = -2  # Do4
        x = ox + 92
        if i == 0:
            parts.append(note(x - 8, base, bottom, gap) + note(x + 8, base, bottom, gap))
        else:
            parts.append(note(x, base, bottom, gap) + note(x + (15 if i == 1 else 0), base + i, bottom, gap))
        parts.append(f'<text x="{ox + 162}" y="{top + 2.4 * gap}" font-family="{FONT}" font-size="20" fill="{INK}">{name}</text>')
    w, h = 2 * cell_w + 10, 4 * cell_h + 16
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="Les intervalles à partir de do"><rect width="{w}" height="{h}" fill="#fff"/>{"".join(parts)}</svg>'


def hero(kind):
    """Images des sous-thèmes 11H (fond prune du degré, même clé de sol vectorielle)."""
    bg, ink, accent = '#3d2233', '#f3f0e8', '#c98a52'
    gap, top = 25, 150
    bottom = top + 4 * gap
    half = gap / 2

    def head(x, step, color=ink):
        y = bottom - step * half
        return f'<ellipse cx="{x}" cy="{y}" rx="11" ry="8" fill="{color}" transform="rotate(-18 {x} {y})"/>'

    def stem_up(x, step, length=62, color=ink):
        y = bottom - step * half
        return f'<line x1="{x + 10}" y1="{y - 2}" x2="{x + 10}" y2="{y - length}" stroke="{color}" stroke-width="2.5"/>'

    body = f'<rect width="300" height="400" fill="{bg}"/>' + f'<g opacity="0.9">{staff(30, 270, top, gap, ink, 2)}</g>' + clef(34, bottom, gap, ink)
    if kind == 'intervalles':
        body += head(150, 0) + head(220, 4, accent)
        body += f'<path d="M150 290 Q185 312 220 290" fill="none" stroke="{accent}" stroke-width="2.5"/>'
        body += f'<text x="185" y="330" font-family="{FONT}" font-size="20" fill="{accent}" text-anchor="middle">quinte</text>'
    elif kind == 'signatures':
        body += number('6', 134, top + 2 * gap, gap, ink) + number('8', 134, bottom, gap, ink)
        xs, steps = [186, 214, 242], [2, 3, 4]
        for x, st in zip(xs, steps):
            body += head(x, st) + stem_up(x, st, 70 + (st - 2) * 0)
        y_beam = bottom - 2 * half - 70
        body += f'<path d="M{xs[0] + 9} {y_beam} L{xs[-1] + 11.5} {y_beam - 2 * half} L{xs[-1] + 11.5} {y_beam - 2 * half + 7} L{xs[0] + 9} {y_beam + 7} Z" fill="{ink}"/>'
    elif kind == 'dictee':
        for x, st in zip([130, 170, 210], [0, 2, 4]):
            body += head(x, st) + stem_up(x, st)
        body += f'<text x="250" y="{bottom - 6 * half + 9}" font-family="{FONT}" font-size="46" font-weight="700" fill="{accent}" text-anchor="middle">?</text>'
    elif kind == 'lecture':
        body += head(170, 2, accent)
        body += f'<text x="170" y="330" font-family="{FONT}" font-size="24" fill="{accent}" text-anchor="middle">sol</text>'
    return f'<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">{body}</svg>'


def main():
    os.makedirs(OUT, exist_ok=True)
    signatures = ['2/2', '2/4', '4/4', '4/1', '3/2', '3/4', '1/1', '3/8', '12/8', '6/8', '11/8', '7/8', '5/8', '10/8', '5/16']
    for sig in signatures:
        num, den = sig.split('/')
        with open(os.path.join(OUT, f'signature-{num}-{den}.svg'), 'w', encoding='utf8') as f:
            f.write(time_signature(num, den))
    with open(os.path.join(OUT, 'intervalles.svg'), 'w', encoding='utf8') as f:
        f.write(interval_chart())
    for kind, name in [('intervalles', '11h-intervalles'), ('signatures', '11h-signatures-rythmiques'), ('dictee', '11h-dictee-musicale'), ('lecture', '11h-lecture-de-notes')]:
        with open(os.path.join(ROOT, 'public', 'images', 'themes', f'{name}.svg'), 'w', encoding='utf8') as f:
            f.write(hero(kind))
    print('Images générées dans', OUT)


if __name__ == '__main__':
    main()
