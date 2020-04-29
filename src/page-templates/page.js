import React from 'react'
import PropTypes from 'prop-types'
import Helmet from "react-helmet"
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import {
  Box,
  Heading,
} from "@chakra-ui/core";

export const PageTemplate = ({ title, content, description, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <Box
      maxW={"900px"}
      mx="auto"
      px={{ xs: "1.5rem", lg: "5rem" }}
      py={{ xs: "2rem", lg: "5rem" }}
    >
      <Heading mb={4} as="h1">{title}</Heading>
      { (description) ? <Heading as="h2" mb="2rem" textTransform="uppercase" fontWeight="light" fontSize="16px">{description}</Heading> : null }
      <PageContent content={content} />
    </Box>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const Page = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s | Sirena Voile">
        <title>{`${post.frontmatter.title}`}</title>
        <meta
          name="description"
          content={`${post.frontmatter.description}`}
        />
      </Helmet>
      <PageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        content={post.html}
      />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const PageQuery = graphql`
  query Page($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
