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

## 수정 방법

1. `index.html`에서 텍스트 수정 (섹션별 주석 `<!-- ===== Hero ===== -->` 참고)
2. `git add -A && git commit -m "..." && git push`
3. 1~2분 내 https://sslee0000.github.io 반영

로컬 미리보기: `python3 -m http.server 8000` 후 http://localhost:8000

## 이전 사이트

Jekyll(lanyon-plus) 기반 구버전은 `legacy-lanyon` 브랜치에 보존. 복구: `git checkout legacy-lanyon`
