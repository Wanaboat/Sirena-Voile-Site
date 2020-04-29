import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default () => {
  const { title, siteUrl } = useSiteMetadata()
  return <h1>welcome to {title}</h1>
}