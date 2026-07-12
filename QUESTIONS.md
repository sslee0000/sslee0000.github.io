# 홈페이지 — 확인 필요 사항 (2026-07-13 갱신)

## 사용자 액션 대기

1. **프로필 사진** (넣기로 결정됨): 사진 파일을 `images/profile.jpg` 로 넣어주시면 랜딩의 아바타 자리에 반영합니다. 그 전까지는 `~/` 이니셜 아바타.
2. **프로젝트 이미지 4장** (석사 시절 Drive의 요약 그림): `images/projects/` 에 넣어주시면 Portfolio 카드에 삽입 → CV의 Drive 링크도 홈페이지 링크로 교체 가능 (Drive 의존 제거).
3. **LinkedIn URL 확인**: `linkedin.com/in/seung-su-lee-a69827169` (CV에서 가져옴) — 맞나요?

## 질문 (답변 필요)

4. **Publications DOI 링크**: RTSS/TC 논문에 IEEE Xplore 링크를 달까요? DOI를 주시거나, 제가 검색해서 달 수도 있습니다.
5. **이메일 공개**: soulist77@gmail.com이 랜딩·CV·Portfolio 푸터에 노출됩니다 (mailto). 스팸 우려 시 폼 서비스로 교체 가능. 이대로 OK?
6. **404 페이지 유머**: "Segmentation fault (core dumped)" — 과하면 말씀 주세요.

## 결정된 것 (기록)

- 구조: 참고 사이트(spiraline.github.io)의 **구조만** 차용 — 랜딩(사진+한줄+입구 카드) / CV / Portfolio 3페이지. Posts 없음. 디자인은 기존 자체 디자인 유지.
- **한/영 토글: 전체 번역, 기본 한글** (2026-07-13 확정). 논문 제목·기술 용어는 양쪽 모두 영문.
- **CV PDF 게재**: 전화번호 제거 버전(`files/Seungsu_Lee_CV.pdf`)을 CV 페이지에서 다운로드 제공. 원본 빌드는 `Seungsu_CV` repo의 `make_web_cv.sh`.
- "led" 표현 제거 (사실 정정, CV·홈페이지 모두), Seongnam→Seoul.
- 스택: 프레임워크 없는 정적 HTML/CSS/JS 유지 (push=배포, 빌드 없음).
