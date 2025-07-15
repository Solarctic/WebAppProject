# Text Adventure

## About The Project

Our purpose of the project is to create a game that is interactive, story-driven and a browser-based game based on Ace Attorney, a visual novel. The game utilized decision-making and branching narrative structure. The game is made to offer players an experience by exploration and choices through the use of save and load functions of the interface.

### Built With

- Node.js
- Vue
- json-server
- TailwindCSS

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

> Install Docker if you want to use devcontainer (In this case, you do not need to install Node.JS on your computer)

Make sure you installed the Node.JS
For details: visit this website and follow the instructions
https://nodejs.org/en/download

### Installation

1. Clone the repo

```sh
git clone https://github.com/Solarctic/WebAppProject
```

2. Go to the web-project folder

```sh
cd web-project/
```

3. Install NPM packages

```sh
npm install
```

## Usage

> If you are using visual studio code, we already created a launch.json to run easily (by "Start Web + DB")

**ENSURE** you are in web-project folder before run those commands

To run the web

```sh
npm run dev
```

To run the json-server

```sh
npx json-server --watch db.json --port 3000
```

## License

Distributed under the MIT. See `LICENSE.txt` for more information.

## Acknowledgments

- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Custom Data Structure in JavaScript](https://codedamn.com/news/nodejs/custom-data-structures)
- [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web)
- [Objection!](objection.lol)
