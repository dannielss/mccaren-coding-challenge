<h3 align="center">
  <img src="https://cdn.prod.website-files.com/6765d3a3eb10195eb9e2b55a/6766f49bd6306d9079f3de5d_fix.png" alt="logo" width="200" />
</h3>
<h3 align="center">McCarren Coding Challenge</h3>

<p align="center">
  <a href="#gift-Features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-Configuration">Configuration</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-Technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-Decisions">Decisions</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#camera-Screenshots">Screenshots</a>&nbsp;&nbsp;&nbsp;
</p>

### You can check the project here: [McCarren Coding Challenge](https://mccaren-coding-challenge.vercel.app/)

## :gift: Features

- Upload multiple files
- Search for keyword/highlight text
- Dark theme

## :wrench: Configuration

`Node version: 20.13.1`

```bash
1. Install all dependencies
$ npm install

2. Start application
$ npm run dev
```

## :rocket: Technologies

- Next
- Tailwind
- TypeScript

## :memo: Decisions

- I decided to transform all lines in an array item to be able to filter/highlight easily and use the next step as approach for secure a good performance for large files.
- I decided to use only `react-window` for virtualization, ensuring we can highlight even large files with a good performance.
- I also used lodash.debounce to avoid unnecessary re-renders.

## :computer: Future improvements

- Storybook for components documentation
- Unit/integration tests with React Testing Library
- Tests e2e with Cypress
- Enhance upload file experience with a uploading progress feedback component

## :camera: Screenshots

<details>
<summary>McCarren Coding Challenge</summary>

![image](https://github.com/user-attachments/assets/7aea3389-4428-4273-8d73-9b3da625f87a)

![image](https://github.com/user-attachments/assets/d768c3f5-1bc5-4bce-a1c3-5da58f83fd9d)

![image](https://github.com/user-attachments/assets/9c59c55c-a160-4269-bf9b-8e39df7cddb0)

![image](https://github.com/user-attachments/assets/817bc30d-b572-40e2-b934-b124d9e8039a)

![image](https://github.com/user-attachments/assets/6527b19c-3311-48e3-8a10-d13f859902a2)

![image](https://github.com/user-attachments/assets/1a60987b-56b0-4e25-b2d7-a0e6624ca4c6)

</details>
