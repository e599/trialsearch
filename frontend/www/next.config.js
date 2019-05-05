const withLess = require("@zeit/next-less")
const withTypescript = require("@zeit/next-typescript")
const lessToJS = require("less-vars-to-js")
const fs = require("fs")
const path = require("path")

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf-8"))

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {}
}

/**
 * To Deploy to S3 make sure to you next 7 and not next 8. There is currently
 * as bug with processing .less files in the antd library
 */

module.exports = withTypescript(
  withLess({
    target: "serverless",
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    },
  }),
)
