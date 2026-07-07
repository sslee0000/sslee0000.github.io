# sslee0000.github.io

개인 포트폴리오 홈페이지. https://sslee0000.github.io

## 구조 (프레임워크 없음 — 빌드 불필요)

```
index.html          # 페이지 전체 (콘텐츠 수정은 여기)
assets/style.css    # 디자인 (다크/라이트 테마, 반응형)
assets/main.js      # 테마 토글 + 스크롤 애니메이션 (최소한)
assets/favicon.svg  # 파비콘
404.html            # 404 페이지
.nojekyll           # GitHub Pages의 Jekyll 처리 비활성화
QUESTIONS.md        # 재제작 관련 미결 질문 (답변 후 정리)
```

## 브랜치 전략 (dev / prod 분리)

| 브랜치 | 역할 | 반영되는 곳 |
|---|---|---|
| `dev` | 개발·수정 작업은 항상 여기서 | 미리보기 URL (아래) |
| `main` | **prod** — 머지하는 순간 라이브 배포 | https://sslee0000.github.io |

## 수정 워크플로

1. `git checkout dev` 상태에서 `index.html` 등 수정 (섹션별 주석 `<!-- ===== Hero ===== -->` 참고)
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
