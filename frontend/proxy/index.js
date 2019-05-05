const http = require("http");
const URL = require("url");
const request = require("request");

module.exports = (req, res) => {
  const { url, ...qs } = URL.parse(req.url, true).query;
  if (url) {
    console.log({ url, qs });
    request({
      url,
      qs
    })
      .on("error", function(e) {
        res.end(e);
      })
      .pipe(res);
  } else {
    res.end("no url found");
  }
};
