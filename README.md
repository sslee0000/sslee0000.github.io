# sslee0000.github.io

개인 포트폴리오 홈페이지. https://sslee0000.github.io

## 구조 (프레임워크 없음 — 빌드 불필요)

```
index.html          # 랜딩: 사진·한 줄 소개·CV/Portfolio 입구
cv.html             # CV: 학력·경력·논문·스킬 + PDF 다운로드
portfolio.html      # Portfolio: 프로젝트 카드
assets/style.css    # 디자인 (다크/라이트 테마, 반응형)
assets/main.js      # 테마 토글 + 한/영 토글 + 스크롤 애니메이션
assets/favicon.svg  # 파비콘
files/Seungsu_Lee_CV.pdf  # 웹 공개용 CV (Seungsu_CV repo의 resume.pdf 복사본 — 원본에 전화번호 없음)
images/             # 프로필·프로젝트 이미지 (예정)
404.html            # 404 페이지
.nojekyll           # GitHub Pages의 Jekyll 처리 비활성화
QUESTIONS.md        # 미결 질문 (답변 후 정리)
```

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
