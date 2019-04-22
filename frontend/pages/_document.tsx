import React from "react"
import Document, { Main, Head, NextScript, NextDocumentContext } from "next/document"

export default class MyDocument extends Document {
  public render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
          <style>{`*{ box-sizing: border-box;}`}</style>
        </Head>
        <body>
          <Main {...this.props} />
          <NextScript />
        </body>
      </html>
    )
  }
}
