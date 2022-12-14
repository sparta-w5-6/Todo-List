# Todo List

- Todo list 
- 완료/미완료
- 댓글
- 좋아요

# 사용 스택
- Node.js
- TypeScript
- Express.js
- Sequelize.js
- MySQL
- Jest

# Getting Started

```bash
git clone https://github.com/sparta-w5-6/Todo-List.git
cd Todo-List
npm ci
```

## 프로젝트 빌드(TypeScript Transpile)

```bash
npm run build
```

> - `dist/` 디렉토리에 프로젝트를 `.js` 파일로 생성
> - ℹ️ `dist/`는 Git에 트래킹 되지 않음

## 애플리케이션 실행

```bash
npm run start
```

> - `dist/app.js` 파일을 `nodemon`으로 실행  
> - ⚠️ 프로젝트가 빌드(`npm run build`) 되지 않은 상태라면 실행되지 않습니다!

## TO-DO

- [ ] 프로젝트의 애플리케이션 부분 JavaScript 코드를 TypeScript(`.ts`)로 마이그레이션
  - [ ] `tsconfig.json` 파일의 `compilerOptions.allowJs`를 `false`로 변경

# 개발 규칙
- .gitignore 파일 생성 - gitignore.io 이용해서 커밋 하기
- 3-Layered Architecture 적용
- 각자 브랜치에서 작업 후 develop 에서 merge(ex. signup_feature001 , comment_feature002)
- merge 후 본인 브랜치 삭제 후 feature +1 해서 브랜치 새로 생성

# 파트 분배
- 로그인/회원가입 - 나지원
- Todo list 작성 - 백수빈
- 댓글 작성 - 조철희
- 좋아요/Todo 완료 - 박민수

# prettier
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
};


# API 명세서
![스크린샷 2022-12-12 오후 12 39 03](https://user-images.githubusercontent.com/105340187/206955698-fd11f9b6-63f9-49c4-9604-450c3c09c49e.png)


#ERD
![스크린샷 2022-12-12 오후 12 42 58](https://user-images.githubusercontent.com/105340187/206955920-fe8bfdd5-7945-4bc6-8b02-a7ad7a26e560.png)

