"""
Vygeneruje favicon ze značky v logu TIS — ozubené kolo se siluetou staveb.

SVG i rastrové varianty vznikají ze stejných čísel, takže se nemůžou rozejít.
Značka je zjednodušená schválně: detaily z loga (perspektivní zkosení budov,
kolo otevřené vpravo) se v 16 px slijí do šumu.

Vyžaduje:  Pillow (pip install Pillow) — jen pro tento skript, ne pro web.
Spuštění:  python scripts/make-favicon.py
Výstup:    src/app/icon.svg, src/app/favicon.ico, src/app/apple-icon.png
"""

from __future__ import annotations

import math
import pathlib

from PIL import Image, ImageDraw

# --- geometrie ve čtverci 64 × 64 -------------------------------------------

BOX = 64
CX = CY = 32.0

RING_R = 21.0  # střed prstence
RING_W = 5.0  # tenčí prstenec — uvnitř musí zbýt místo na stavby
TEETH = 8
TOOTH_INNER = 21.5
TOOTH_OUTER = 30.5
TOOTH_HALF_BASE = 4.4
TOOTH_HALF_TIP = 3.2

# --- barvy odebrané přímo z loga --------------------------------------------

NAVY = (9, 22, 39)  # #091627 — pozadí, shodné s tmavým režimem webu
WHITE = (255, 255, 255)  # kolo
# Odstíny z loga jsou si blízké (#b2b6bd a #9ba0a8) a v 16 px splynou,
# proto je od sebe odtáhneme; tonální role zůstává stejná.
GREY_LIGHT = (213, 217, 222)
GREY_DARK = (124, 133, 146)
# V logu je modrá budova #06447d. Na navy pozadí by se v 16 px ztratila,
# proto sáhneme po zesvětlené akcentní modré z design systému.
BLUE = (43, 109, 181)  # #2b6db5

# budovy: (x0, x1, y_vrchol, barva) — všechny stojí na společné základně
BASE_Y = 44.5
BUILDINGS = [
    (19.5, 26.5, 32.0, GREY_DARK),
    (27.3, 35.5, 20.0, GREY_LIGHT),
    (36.3, 44.0, 27.0, BLUE),
]


def tooth_polygon(index: int) -> list[tuple[float, float]]:
    """Jeden zub jako lichoběžník, špička je užší než pata."""
    angle = 2 * math.pi * index / TEETH - math.pi / 2
    ca, sa = math.cos(angle), math.sin(angle)
    # kolmice ke směru zubu
    nx, ny = -sa, ca

    def point(radius: float, half: float, side: int) -> tuple[float, float]:
        return (
            CX + ca * radius + nx * half * side,
            CY + sa * radius + ny * half * side,
        )

    return [
        point(TOOTH_INNER, TOOTH_HALF_BASE, +1),
        point(TOOTH_OUTER, TOOTH_HALF_TIP, +1),
        point(TOOTH_OUTER, TOOTH_HALF_TIP, -1),
        point(TOOTH_INNER, TOOTH_HALF_BASE, -1),
    ]


def hexa(rgb: tuple[int, int, int]) -> str:
    return "#%02x%02x%02x" % rgb


def build_svg() -> str:
    teeth = "\n".join(
        '    <polygon points="%s" />'
        % " ".join(f"{x:.2f},{y:.2f}" for x, y in tooth_polygon(i))
        for i in range(TEETH)
    )
    rects = "\n".join(
        f'  <rect x="{x0:.2f}" y="{top:.2f}" width="{x1 - x0:.2f}" '
        f'height="{BASE_Y - top:.2f}" fill="{hexa(color)}" />'
        for x0, x1, top, color in BUILDINGS
    )
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOX} {BOX}" role="img" aria-label="TIS Construction">
  <rect width="{BOX}" height="{BOX}" fill="{hexa(NAVY)}" />
  <g fill="{hexa(WHITE)}">
{teeth}
  </g>
  <circle cx="{CX}" cy="{CY}" r="{RING_R}" fill="none"
          stroke="{hexa(WHITE)}" stroke-width="{RING_W}" />
{rects}
</svg>
"""


def render(size: int) -> Image.Image:
    """Vykreslí značku ve zvoleném rozlišení; kreslíme 4× větší a zmenšujeme."""
    ss = 4
    s = size * ss
    k = s / BOX
    im = Image.new("RGB", (s, s), NAVY)
    d = ImageDraw.Draw(im)

    for i in range(TEETH):
        d.polygon([(x * k, y * k) for x, y in tooth_polygon(i)], fill=WHITE)

    d.ellipse(
        [
            (CX - RING_R) * k,
            (CY - RING_R) * k,
            (CX + RING_R) * k,
            (CY + RING_R) * k,
        ],
        outline=WHITE,
        width=max(1, round(RING_W * k)),
    )

    for x0, x1, top, color in BUILDINGS:
        d.rectangle([x0 * k, top * k, x1 * k, BASE_Y * k], fill=color)

    return im.resize((size, size), Image.LANCZOS)


def main() -> None:
    app = pathlib.Path(__file__).resolve().parent.parent / "src" / "app"

    (app / "icon.svg").write_text(build_svg(), encoding="utf-8")

    # ICO nese víc rozlišení najednou — prohlížeč si vybere.
    # Turbopack umí dekódovat jen ICO s RGBA kanálem, proto převod.
    render(256).convert("RGBA").save(
        app / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )

    render(180).save(app / "apple-icon.png", format="PNG")

    for name in ("icon.svg", "favicon.ico", "apple-icon.png"):
        f = app / name
        print(f"{name:18s} {f.stat().st_size:7d} B")


if __name__ == "__main__":
    main()
