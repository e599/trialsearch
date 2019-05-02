import React from "react"

type PageContext = {
  page: number
  putPage: (page: number) => void
}

export const PageContext = React.createContext<PageContext>({
  page: 1,
  putPage() {},
})
