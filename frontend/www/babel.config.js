module.exports = api => {
  api.cache(true)
  return {
    presets: ["next/babel", "@zeit/next-typescript/babel"],
    plugins: [
      ["import", { libraryName: "antd", style: true }]
    ],
  }
}
