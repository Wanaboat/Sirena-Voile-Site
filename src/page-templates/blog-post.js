import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
// import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
// import Img from "gatsby-image"

import {
  Box,
  Heading,
} from "@chakra-ui/core";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <Box
      maxW={"900px"}
      mx="auto"
      px={{ xs: "1.5rem", lg: "5rem" }}
      py={{ xs: "2rem", lg: "5rem" }}
    >
      <Heading mb={4} as="h1">{title}</Heading>
      { (description) ?
        <Heading
          as="h3"
          color="gray.700"
          fontSize={{ xs: 16, lg: 22 }}
          textTransform="uppercase"
          letterSpacing="0.35rem"
        >
          {description}
        </Heading> : null }
        <Box my={4}>
          <PostContent content={content} />
        </Box>
    </Box>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  // console.log( post.frontmatter.featuredImage.childImageSharp.fluid.src )
  return (
    <Layout>
      <BlogPostTemplate
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        // featuredImage={post.frontmatter.featuredImage.childImageSharp}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        #featuredImage {
        #  childImageSharp {
        #    fixed(width: 800, height: 600) {
        #      ...GatsbyImageSharpFixed
        #   }
        #  }
        #}
      }
    }
  }
`
