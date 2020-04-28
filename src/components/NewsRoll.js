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
  Heading,
  PseudoBox,
  Stack
} from "@chakra-ui/core";

class NewsRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <>
        {posts &&
          posts.map(({ node: post }) => (
            <Grid
              as="article"
              bg="white"
              templateColumns={{ xs:"100%", lg:"15% 250px calc( 100% - 15% - 250px ) "}}
              key={post.id}
              w={{ xs:"100%"}}
              borderTop="solid 1px"
              borderTopColor="gray.100"
              h={{ xs:"auto", lg:"200px"}}
              mb={{xs:0, lg:10}}
            >
              <Box
                display={{ xs:"none", lg:"initial"}}
              >
                <Text
                  mt={1}
                  textTransform="uppercase"
                  color="gray.400"
                > le {post.frontmatter.date}</Text>
              </Box>
              <Box
                display={{ xs:"none", lg:"initial"}}
              >
                {post.frontmatter.featuredImage ? 
                <picture>
                  <Img fixed={post.frontmatter.featuredImage.childImageSharp.fixed} />
                  {/* <Image borderRadius="5px" mr="10px" size="96px" loading="lazy" alt={post.frontmatter.title} src={post.frontmatter.featuredImage} /> */}
                </picture>
              :null}
              </Box>
              
              <Stack spacing={4} px={{xs:"1.5rem", lg:"5rem"}} py={5}>
                <Heading
                  as="h4"
                  textTransform="uppercase"
                  fontSize={{ xs:14, lg:22}}
                >
                <Link
                  as={GatsbyLink}
                  mb={2}
                  to={post.frontmatter.path}
                  fontSize={{ xs:22, lg:16}}
                  fontWeight="normal"
                >
                  {post.frontmatter.title}
                </Link>
                </Heading>
                <Text
                  fontSize={{ xs:14, lg:14}}
                >
                  {post.excerpt}
                </Text>
                <Box>
                <PseudoBox
                  as={GatsbyLink}
                  display="inline-block"
                  to={post.frontmatter.path}
                  backgroundColor="brand.light1"
                  color="gray.700"
                  letterSpacing="0.035rem"
                  fontSize={13}
                  fontWeight="bold"
                  textTransform="uppercase"
                  borderRadius={3}
                  py={2}
                  px={4}
                >
                  Lire la suite
                </PseudoBox>
                </Box>

              </Stack>
            </Grid>
          ))}
      </>
    )
  }
}

NewsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query NewsRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 3
        ) {
          edges {
            node {
              excerpt(pruneLength: 120)
              id
              frontmatter {
                title
                path
                templateKey
                date(formatString: "D/M/Y")
                featuredImage {
                  childImageSharp {
                    fixed(width: 250, height: 200) {
                      ...GatsbyImageSharpFixed
                   }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <NewsRoll data={data} count={count} />}
  />
)
