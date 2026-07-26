#!/usr/bin/env python3
"""원본 프로젝트 그림(images/*.png)을 웹용 크기로 줄여 images/projects/ 에 저장.

원본은 장당 1~3MB라 그대로 올리면 모바일에서 느리고 git 히스토리에도 영구히 남는다.
카드에는 -thumb 을 쓰고, 클릭하면 full 을 연다.

새 그림을 추가하려면 FILES 에 이름만 넣고 실행:
    python3 tools/make_project_images.py
"""
from PIL import Image
import os

FILES = [
    "thesis-optimization",
    "ros-profiling",
    "experiment-platform",
    "task-parallelization",
]

FULL_MAX_W = 1600   # 클릭했을 때 보는 크기
THUMB_BOX = (760, 760)

os.makedirs("images/projects", exist_ok=True)

for name in FILES:
    src = f"images/{name}.png"
    if not os.path.exists(src):
        print(f"skip {name}: {src} 없음")
        continue
    im = Image.open(src).convert("RGB")
    w, h = im.size

    scale = min(1.0, FULL_MAX_W / w)
    full = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS) if scale < 1 else im
    full.save(f"images/projects/{name}.jpg", "JPEG", quality=85, optimize=True, progressive=True)

    thumb = im.copy()
    thumb.thumbnail(THUMB_BOX, Image.LANCZOS)
    thumb.save(f"images/projects/{name}-thumb.jpg", "JPEG", quality=82, optimize=True, progressive=True)

    print(f"{name}: {w}x{h} -> full {full.size[0]}x{full.size[1]}, thumb {thumb.size[0]}x{thumb.size[1]}")
