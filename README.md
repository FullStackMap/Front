# FullStackMap

This project is built using React, TypeScript, Vite, and Docker.

## To clone this project

```bash
git clone git@github.com:FullStackMap/Front.git
```
## Add the .npmrc file to the root of the project

### First need to create a classic_token in your Github account
just need write and read package permissions
use this documentation to create a token
[Github documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

after you do that, you need to create a .npmrc file in the root of the project and add the following code
```bash
echo "//npm.pkg.github.com/:_authToken=your_token_classic_here
@FullStackMap:registry=https://npm.pkg.github.com" | cat - > .npmrc 
```

## Recommending you to use pnpm instead of npm, to install it

```bash
npm install -g pnpm
```

## Getting Started

### To run the project locally, follow these steps:

1. Install Node.js version 20.10.0.

2. Run

```bash
pnpm install
```

To install the project dependencies.

3. Run to start the development server.

```bash
pnpm run dev
```

To start the development server.

### To run the project in a container, follow these steps:

1. Install Docker.

2. Run to start the project container.

```bash
pnpm run start
```

That's it! You're now ready to start working with the project.

## License

This project is licensed under the [MIT License](LICENSE).
