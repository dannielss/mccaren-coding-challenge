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
- I decided to use only `react-window` for virtualization, ensuring we can highlight even large files with a good performance
- I also used lodash.debounce to avoid unnecessary re-renders

## :camera: Screenshots

<details>
<summary>McCarren Coding Challenge</summary>

</details>
