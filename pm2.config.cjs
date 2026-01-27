module.exports = {
  name: "Trabsen", // Name of your application
  script: "./.output/server/index.mjs", // Entry point of your application
  interpreter: "bun", // Bun interpreter
  env: {
    PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
  },
};