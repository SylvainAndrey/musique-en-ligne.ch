#!/usr/bin/env python3
"""Génère les petites images de notation (SVG) utilisées par les exercices :
signatures rythmiques et tableau des intervalles, toutes avec la même clé de sol
vectorielle que les exercices interactifs (tracé lu dans src/scripts/exercises/clef.ts).

Usage : python3 scripts/generate-notation-images.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLEF_TS = os.path.join(ROOT, 'src', 'scripts', 'exercises', 'clef.ts')
OUT = os.path.join(ROOT, 'public', 'images', '11h-intervalles-et-signatures')
FONT = "Georgia, 'Times New Roman', 'DejaVu Serif', serif"

CLEF = re.search(r"TREBLE_CLEF_PATH =\s*'([^']+)'", open(CLEF_TS, encoding='utf8').read()).group(1)
INK = '#1d1d1b'


def staff(x1, x2, top, gap, color=INK, width=1.4):
    return ''.join(
        f'<line x1="{x1}" y1="{top + i * gap}" x2="{x2}" y2="{top + i * gap}" stroke="{color}" stroke-width="{width}"/>'
        for i in range(5)
    )


def clef(x, bottom, gap, color=INK):
    s = gap / 250
    return f'<path transform="translate({x} {bottom}) scale({s:.4f} {-s:.4f})" fill="{color}" d="{CLEF}"/>'


def time_signature(num, den):
    gap, top, w = 14, 26, 112
    bottom = top + 4 * gap
    mid = top + 2 * gap
    cx = 82
    size = 2 * gap * 1.32
    body = (
        staff(4, w - 4, top, gap)
        + clef(6, bottom, gap)
        + f'<g font-family="{FONT}" font-weight="700" font-size="{size:.1f}" fill="{INK}" text-anchor="middle">'
        + f'<text x="{cx}" y="{mid - 1}">{num}</text><text x="{cx}" y="{bottom - 1}">{den}</text></g>'
    )
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


def hero():
    bg, ink, accent = '#3d2233', '#f3f0e8', '#c98a52'
    gap, top = 25, 150
    bottom = top + 4 * gap
    half = gap / 2

    def head(x, step, color):
        y = bottom - step * half
        return f'<ellipse cx="{x}" cy="{y}" rx="11" ry="8" fill="{color}" transform="rotate(-18 {x} {y})"/>'

    body = (
        f'<rect width="300" height="400" fill="{bg}"/>'
        + f'<g opacity="0.9">{staff(30, 270, top, gap, ink, 2)}</g>'
        + clef(34, bottom, gap, ink)
        + f'<g font-family="{FONT}" font-weight="700" font-size="64" fill="{ink}" text-anchor="middle">'
        + f'<text x="122" y="{top + 2 * gap - 2}">6</text><text x="122" y="{bottom - 2}">8</text></g>'
        + head(186, 0, ink) + head(236, 4, accent)
        + f'<path d="M186 290 Q211 312 236 290" fill="none" stroke="{accent}" stroke-width="2.5"/>'
        + f'<text x="211" y="330" font-family="{FONT}" font-size="20" fill="{accent}" text-anchor="middle">quinte</text>'
    )
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
    with open(os.path.join(ROOT, 'public', 'images', 'themes', '11h-intervalles-et-signatures-rythmiques.svg'), 'w', encoding='utf8') as f:
        f.write(hero())
    print('Images générées dans', OUT)


if __name__ == '__main__':
    main()
