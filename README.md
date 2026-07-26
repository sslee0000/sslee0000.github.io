# sslee0000.github.io

개인 포트폴리오 홈페이지. https://sslee0000.github.io

## 구조 (프레임워크 없음 — 빌드 불필요)

```
index.html          # 랜딩: 사진·한 줄 소개·CV/Portfolio 입구
cv.html             # CV: 학력·경력·논문·스킬 + PDF 다운로드
portfolio.html      # Portfolio: 프로젝트 카드
toys.html           # 사이드 프로젝트 카드
assets/style.css    # 디자인 (다크/라이트 테마, 반응형)
assets/main.js      # 테마 토글 + 한/영 토글 + 스크롤 애니메이션
assets/favicon.svg  # 파비콘
files/Seungsu_Lee_CV.pdf  # 웹 공개용 CV (Seungsu_CV repo의 resume.pdf 복사본 — 원본에 전화번호 없음)
images/             # 프로필 아바타·프로젝트 그림 (원본 png는 커밋 안 함, images/README.md 참고)
tools/              # 이미지 리사이즈 등 유지보수 스크립트
demos/              # 토이 프로젝트 데모 (다른 repo에서 복사해 온 산출물 — 아래 참고)
404.html            # 404 페이지
.nojekyll           # GitHub Pages의 Jekyll 처리 비활성화
QUESTIONS.md        # 미결 질문 (답변 후 정리)
```

## 데모 제공 방식 3가지

토이 프로젝트마다 데모를 붙이는 방식이 다릅니다. 어떤 방식인지에 따라 **고치는 곳**과
**깨지는 이유**가 달라지므로 구분해 둡니다.

| 프로젝트 | 방식 | 사는 곳 | 원본 |
|---|---|---|---|
| lease-vs-buy | ① 정적 파일 복사 | `demos/lease-vs-buy/` | `mock_real_estate` (private) |
| asset-flow | ② 정적 스냅샷 크롤링 | `demos/asset-flow/` | `asset-flow` (private) |
| findata | ③ 집 서버 실시간 | Tailscale Funnel | `sslee0000/findata` (public) |

### ① 정적 파일 복사 — lease-vs-buy

계산이 전부 브라우저에서 도는 단일 HTML(60KB, 외부 리소스 참조 0)이라 그대로 복사하면 됩니다.
원본에서 고친 뒤 `mock_real_estate`의 `./sync_to_homepage.sh`.

### ② 정적 스냅샷 크롤링 — asset-flow

서버 렌더링 앱이라 파일 복사로는 안 됩니다. **가짜 데모 DB**로 앱을 띄워 각 페이지를
크롤링한 결과가 `demos/asset-flow/` 13개 HTML입니다. 원본에서 고친 뒤
`asset-flow`의 `./make_demo_snapshot.py`.

스냅샷을 다시 만들 때마다 **아래 3가지를 반드시 확인**하세요:

1. **가짜 DB로 돌렸는지.** 실제 재무 데이터가 한 번이라도 들어가면 공개 저장소의
   git 히스토리에 영구히 남습니다. 되돌리려면 히스토리 재작성 + force push가 필요합니다.
2. **데모 배너가 모든 페이지에 있는지** (`demo-banner` 클래스). 숫자가 가상이라는 안내입니다.
3. **폼 차단 JS가 살아 있는지** (`preventDefault`). 스냅샷의 `<form>`은 `action="/accounts"`
   같은 서버 경로를 그대로 갖고 있어서, JS가 막지 않으면 제출 시 GitHub Pages에서 404가 납니다.

확인 명령:

```bash
for f in demos/asset-flow/*.html; do
  printf "%-24s banner=%s inert=%s\n" "$(basename $f)" \
    "$(grep -c demo-banner $f)" "$(grep -c preventDefault $f)"
done   # 전부 0보다 커야 함
```

### ③ 집 서버 실시간 — findata

`demos/` 에 파일이 없습니다. 집 서버의 FastAPI 앱을 Tailscale Funnel로 직접 공개하고
`toys.html`에서 그 주소로 링크합니다. 그래서 **집 서버가 꺼져 있으면 포트폴리오의
"라이브 데모" 링크가 죽습니다.** 이 repo를 아무리 고쳐도 복구되지 않습니다.

- Funnel은 Tailscale 인프라를 경유하므로 집 IP는 노출되지 않습니다
- 단, `/docs`·`/openapi.json`·`/redoc`이 공개돼 있어 API 전체 구조가 그대로 보입니다
- 장기적으로는 상시 가동이 필요 없도록 응답을 캐시해 정적 스냅샷(②)으로 바꾸는 것도 방법입니다

## 한/영 토글 (기본: 한글)

같은 자리에 두 언어를 나란히 쓰고 CSS로 하나만 보여주는 방식:

```html
<span class="ko">시스템 소프트웨어 엔지니어</span><span class="en">System Software Engineer</span>
```

- 텍스트 수정 시 **ko/en 두 span을 함께** 고칠 것 (블록 단위는 `<ul class="ko">` / `<ul class="en">` 쌍)
- 우상단 `EN`/`KO` 버튼으로 전환, localStorage에 저장됨

## 브랜치 전략 (dev / prod 분리)

| 브랜치 | 역할 | 반영되는 곳 |
|---|---|---|
| `dev` | 개발·수정 작업은 항상 여기서 | 미리보기 URL (아래) |
| `main` | **prod** — 머지하는 순간 라이브 배포 | https://sslee0000.github.io |

## 수정 워크플로

1. `git checkout dev` 상태에서 수정
2. `git add -A && git commit -m "..." && git push`
3. **미리보기로 확인** (둘 중 편한 것):
   - 로컬: `python3 -m http.server 8000` → http://localhost:8000
   - 원격(폰/외부에서 확인 가능): https://raw.githack.com/sslee0000/sslee0000.github.io/dev/index.html
4. 확인 후 라이브 반영:
   ```bash
   git checkout main && git merge dev && git push && git checkout dev
   ```
5. 1~2분 내 https://sslee0000.github.io 반영

> 원격 미리보기는 [raw.githack.com](https://raw.githack.com)이 dev 브랜치 파일을 그대로 렌더링해주는 방식 (무설정·무료). dev URL은 캐시가 없어 push 직후 바로 갱신됨. 미리보기일 뿐 검색엔진에 노출되는 정식 사이트는 아님.

## 이전 사이트

Jekyll(lanyon-plus) 기반 구버전은 `legacy-lanyon` 브랜치에 보존. 복구: `git checkout legacy-lanyon`
