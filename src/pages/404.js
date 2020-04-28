import React from "react"
import {Link as GatsbyLink} from "gatsby"
import Layout from '../components/Layout'

import {
  Box,
  Link,
  Text
} from "@chakra-ui/core";

const NotFoundPage = () => (
  <Layout>
    <Box
      maxW="1000px"
      mx="auto"
      p={{ xs:"5rem", lg:"10rem"}}
    >
      <Text
        textAlign="center"
      >
        Oups, on ne trouve rien.{' '}
        <Link textDecoration="underline" as={GatsbyLink} to="/">Retour à la page d'accueil</Link>
      </Text>
    </Box>
  </Layout>
)
export default NotFoundPage