import React from "react"

export const Heading = ({ tag, children }) => {
  const Htag = `h${tag}`
  return <Htag className={`title is-${tag}`}>{children}</Htag>
}

export default Heading
