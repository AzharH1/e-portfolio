"""Regenerate display-sized WebP assets. Requires Pillow (python3 -m pip install Pillow)."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'src/assets'
# Keep original source images. Sizes allow roughly 2x display density.
images = {
    'fullstack.png': 800, 'applestore.png': 800, 'twitter.png': 800,
    'web.png': 128, 'backend.png': 128, 'mobile.png': 128, 'creator.png': 128,
    'github.png': 48, 'company/frontendSimplified.png': 96,
    'company/WoolworthsD.png': 96, 'company/jbhifi3.png': 96,
}
output = root / 'optimized'
output.mkdir(exist_ok=True)
for source, size in images.items():
    image = Image.open(root / source).convert('RGBA')
    image.thumbnail((size, size), Image.Resampling.LANCZOS)
    target = output / (Path(source).stem + '.webp')
    image.save(target, 'WEBP', quality=85, method=6)
    print(f'{source}: {(root / source).stat().st_size:,} -> {target.stat().st_size:,} bytes')
