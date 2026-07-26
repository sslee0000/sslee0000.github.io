# images/ — 직접 넣어야 하는 파일들

여기에 파일을 **정확한 이름으로** 저장하고 dev 브랜치에 커밋하면, 해당 자리에 자동으로 들어가도록 HTML을 연결해 드립니다.
(파일만 넣는다고 화면에 나오지는 않습니다. 넣은 뒤 알려주시면 `<img>` 연결까지 처리합니다.)

## 1. 프로필 / 아바타 — 현재 SVG 로봇 사용 중

- 랜딩(`index.html`)의 원형 자리에는 **자체 제작 SVG 로봇 아바타**가 인라인으로 들어가 있음 (파일 불필요)
- `images/profile.jpg`(증명사진)를 받아 두었지만 **사용하지도, 커밋하지도 않았습니다.**
  "프로필 사진은 넣기 싫다"고 하셨고, 공개 저장소에 커밋하면 페이지에 링크가 없어도
  `sslee0000.github.io/images/profile.jpg` 로 누구나 받을 수 있기 때문입니다. `.gitignore`에 등록돼 있음
- 마음이 바뀌어 사진을 쓰고 싶으면 아래 표대로 교체 (규격: 정사각형 권장, 현재 파일은 472×591 세로형이라 위아래가 잘림)

## 2. 프로젝트 이미지 — 완료 (2026-07-26)

석사 시절 요약 그림 4장이 반영됐습니다. **원본은 `images/*.png`, 웹에 쓰이는 건 `images/projects/*.jpg`.**

| 원본 (커밋 안 함) | 카드 | 웹용 |
|---|---|---|
| `thesis-optimization.png` | 자율주행 워크로드 실시간 최적화 (석사논문) | `projects/thesis-optimization{,-thumb}.jpg` |
| `ros-profiling.png` | ROS 실행시간 프로파일링 도구 | `projects/ros-profiling{,-thumb}.jpg` |
| `experiment-platform.png` | 자율주행 실험 플랫폼 구축 | `projects/experiment-platform{,-thumb}.jpg` |
| `task-parallelization.png` | 실시간 태스크 최적 병렬화 연구 | `projects/task-parallelization{,-thumb}.jpg` |

- 카드에는 `-thumb`(760px)을 쓰고, 클릭하면 `full`(1600px)이 열립니다
- 원본 4장 합계 4.3MB → 웹용 519KB로 축소. 원본은 `.gitignore`에 있어 커밋되지 않습니다
- **그림을 교체하거나 추가하려면**: `images/`에 같은 이름의 png를 넣고
  ```bash
  python3 tools/make_project_images.py
  ```
- 이 그림들은 **CV(LaTeX)의 Google Drive 링크를 대체**했습니다 →
  `https://sslee0000.github.io/images/projects/<이름>.jpg`
  (단, dev를 main에 머지해야 실제로 열립니다)

### 회사 프로젝트(P1 / ALT-B) 이미지는?

사내 자료는 넣지 마세요. 네이버랩스 공식 블로그 링크가 붙어 있고,
거리뷰는 네이버 지도 실제 서비스 링크로 확인되므로 별도 이미지가 필요 없습니다.

## 아바타를 되돌리거나 바꾸려면

`index.html`의 `<div class="avatar">` 안을 교체하면 됩니다. 세 가지 선택지:

| 원하는 것 | 넣을 내용 |
|---|---|
| 현재 (로봇 SVG) | 그대로 두기 |
| 이니셜로 회귀 | `<div class="avatar-fallback mono">~/</div>` |
| 실제 사진 | `<img src="images/profile.jpg" alt="">` |

> 저작권 있는 캐릭터(월-E 등)는 피하는 편이 좋습니다 — 디즈니/픽사 저작물이라
> 채용 담당자가 보는 공개 사이트에 쓰기엔 부담이 있습니다.
