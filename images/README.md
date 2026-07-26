# images/ — 직접 넣어야 하는 파일들

여기에 파일을 **정확한 이름으로** 저장하고 dev 브랜치에 커밋하면, 해당 자리에 자동으로 들어가도록 HTML을 연결해 드립니다.
(파일만 넣는다고 화면에 나오지는 않습니다. 넣은 뒤 알려주시면 `<img>` 연결까지 처리합니다.)

## 1. 프로필 / 아바타 — `images/profile.jpg`

- 위치: 랜딩(`index.html`)의 왼쪽 원형 자리. 지금은 `~/` 이니셜이 대신 들어가 있음
- 권장 규격: **정사각형**, 최소 400×400px, 800×800px 이상이면 충분. jpg 또는 png
- 사진이 아니어도 됨 (캐릭터·일러스트·아이콘 등). 아래 "아바타 대안" 참고

## 2. 프로젝트 이미지 — `images/projects/`

`portfolio.html` 카드의 아이콘 자리를 실제 그림으로 교체하는 용도.
석사 시절 Google Drive에 있던 요약 그림 4장이 여기에 해당합니다.

| 파일명 | 어떤 카드에 들어가는지 | 현재 CV의 Drive 링크 |
|---|---|---|
| `images/projects/thesis-optimization.png` | 자율주행 워크로드 실시간 최적화 (석사논문) | `1mLYj1gPrIlD5_JXhRmAdBsFvHk32w9qZ` |
| `images/projects/ros-profiling.png` | ROS 실행시간 프로파일링 도구 | `1FqTZ_ow2Y9Zh8VXd1LV-HUV_lMD4-8kD` |
| `images/projects/experiment-platform.png` | 자율주행 실험 플랫폼 구축 | `1SNUHTQ38F06AR_zdK5QodntQLMq4_dG5` |
| `images/projects/task-parallelization.png` | 실시간 태스크 최적 병렬화 연구 | `1xIhKjmlj0ARhjgfz6Eh1UmbU9tyGaWVO` |

- 권장 규격: **가로형 16:9**, 1200×675px 내외 (1600×900px까지 OK)
- 파일당 **300KB 이하** 권장 (png보다 jpg/webp가 작음). 글자가 많은 도식이면 png가 선명함
- 확장자를 바꾸고 싶으면(`.jpg`, `.webp`) 알려주세요 — HTML 연결 시 맞춰 씁니다

> 이 4장이 들어가면 **CV(LaTeX)의 Google Drive 링크를 이 홈페이지 링크로 교체**할 수 있습니다.
> Drive 의존이 사라지고, 링크가 죽을 걱정도 없어집니다.

### 회사 프로젝트(P1 / ALT-B) 이미지는?

사내 자료는 넣지 마세요. 대신 네이버랩스가 공개한 공식 블로그 이미지가 이미 링크로 연결돼 있고,
거리뷰는 네이버 지도 실제 결과 링크가 붙어 있어서 별도 이미지가 없어도 검증됩니다.

## 아바타 대안 (사진을 넣기 싫을 때)

- **이니셜/모노그램** — 지금 상태(`~/`). 터미널 모티프와 잘 맞고 아무 파일도 필요 없음
- **직접 만든 일러스트 아바타** — DiceBear 등 오픈소스 생성기로 SVG를 만들어 `assets/`에 저장
- **도메인 상징 그래픽** — 차량·로봇·회로 같은 본인 분야를 나타내는 커스텀 SVG
- **저작권 있는 캐릭터(월-E 등)는 피할 것** — 디즈니/픽사 저작물이라 채용 담당자가 보는 공개 사이트에는 부적절
