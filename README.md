chatgpt-learning-app
======

A sample React application built with Next.js 13 and powered by the OpenAI Chat API. 

The application supports Japanese language settings. (日本語対応)

# Description

This is a discussion app that allows you to explore various viewpoints on specific topics. Simply provide a topic, and it will generate multiple responses based on different perspectives, enabling you to learn and understand various views. You can customize the attributes of each point of view or character. 

# Stack

* [Next.js 13](https://nextjs.org/docs/getting-started/installation), the React framework, latest version

  Manual installation

  ```sh
  $ npm install next@latest react@latest react-dom@latest
  ```

* [Storybook](https://storybook.js.org/recipes/next), components workshop 

  ```sh
  $ npx storybook@latest init
  ```

* [Material UI](npm install @mui/material @emotion/react @emotion/styled
), React components library

```sh
$ npm install @mui/material @emotion/react @emotion/styled
```

Roboto font

```sh
$ npm install @fontsource/roboto
```

Icons

```sh
$ npm install @mui/icons-material
```

* [Zustand](https://github.com/pmndrs/zustand), global app state management and also using the [persisting store data](https://docs.pmnd.rs/zustand/integrations/persisting-store-data) as simple database

```sh
$ npm install zustand
```

# App

Sample screenshot

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./docs/screenshot02.jpeg">
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshot12.jpeg">
  <img alt="Screenshot" src="./docs/story1.jpeg">
</picture>

Character list

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./docs/screenshot01.jpeg">
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshot11.jpeg">
  <img alt="Settings" src="./docs/story2.jpeg">
</picture>

# Custom Sample

Simulated discussion between characters from a galaxy far, far away

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./docs/screenshot03.jpeg">
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshot13.jpeg">
  <img alt="Screenshot" src="./docs/story3.jpeg">
</picture>

Character list

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./docs/screenshot04.jpeg">
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshot14.jpeg">
  <img alt="Settings" src="./docs/story4.jpeg">
</picture>

# Another Custom Sample - Japanese / 日本語

Simulated discussion between known figures of Japan's Bakumatsu period.

---

日本幕末期の著名な人物による模擬討論。

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./docs/screenshot05.jpeg">
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshot15.jpeg">
  <img alt="Screenshot" src="./docs/story5.jpeg">
</picture>

Character list

---

登場人物一覧

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./docs/screenshot06.jpeg">
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshot16.jpeg">
  <img alt="Settings" src="./docs/story6.jpeg">
</picture>

# Setup

Clone the repository and install the dependencies

```sh
git clone https://github.com/supershaneski/discussion-app.git myproject

cd myproject

npm install
```

Copy `.env.example` and rename it to `.env` then edit the `OPENAI_APIKEY` and use your own `OpenAI API key`.

```javascript
OPENAI_APIKEY=YOUR_OWN_API_KEY
```

Then run the app

```sh
npm run dev
```

Open your browser to `http://localhost:3007/` to load the application page.

