const withLess = require("@zeit/next-less")
const withTypescript = require("@zeit/next-typescript")
const lessToJS = require("less-vars-to-js")
const fs = require("fs")
const path = require("path")

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf-8"))

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {}
}

module.exports = withTypescript(
  withLess({
    target: "serverless",
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    },
  }),
)
