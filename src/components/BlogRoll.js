import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink, graphql, StaticQuery } from "gatsby"
// import PreviewCompatibleImage from "./PreviewCompatibleImage"
import Img from "gatsby-image"

import {
  Box,
  Grid,
  Link,
  Text,
} from "@chakra-ui/core";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <>
        {posts &&
          posts.map(({ node: post }) => (
            <Grid
              as="article"
              templateColumns={{ xs: "96px calc( 100% - 96px )", lg: "90px 96px calc( 100% - 186px ) " }}
              key={post.id}
              w={{ xs: "100%", lg: "50%" }}
              mb={{ xs: 4, lg: 0 }}
              borderTop="solid 1px"
              borderTopColor="gray.200"
              maxH="96px"
              overflow="hidden"
            >
              <Text 
                display={{ xs: "none", lg: "initial" }}
                textAlign="center"
                mt={1}
                textTransform="uppercase"
                fontSize={{ lg: 14 }}
                color="gray.400"
              >
                {post.frontmatter.date}
              </Text>
              {post.frontmatter.featuredImage ?
                <picture>
                  <Img fixed={post.frontmatter.featuredImage.childImageSharp.fixed} />
                </picture>
              : null}
              <Box
                p={5}
                py={{ xs:2, lg:5}}
                bg="white"
              >
                <Link
                  as={GatsbyLink}
                  mb={5}
                  color="gray.700"
                  to={post.frontmatter.path}
                  fontSize={{ xs: 16, lg: 18 }}
                  fontWeight="bold"
                >
                  {post.frontmatter.title}
                </Link>
                <Text
                  fontSize={{ xs: 14, lg: 14 }}
                >
                  {post.excerpt}
                </Text>
              </Box>

            </Grid>
          ))}
      </>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 2
        ) {
          edges {
            node {
              excerpt(pruneLength: 80)
              id
              frontmatter {
                title
                path
                templateKey
                date(formatString: "D/M/Y")
                featuredImage {
                  childImageSharp {
                    fixed(width: 100, height: 100) {
                      ...GatsbyImageSharpFixed_withWebp
                   }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
