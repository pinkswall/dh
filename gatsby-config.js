// gatsby-config.js
const { generateConfig } = require("gatsby-plugin-ts-config")

module.exports = generateConfig({
  configDir: ".", // or wherever you would like to store your gatsby files
  projectRoot: __dirname,
})
