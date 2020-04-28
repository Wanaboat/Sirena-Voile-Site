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
import { Radio, RadioGroup } from "@chakra-ui/core"

class BoatsRoll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ads: null,
      filter: 'all'
    }
  }

  render() {

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const { filter } = this.state;
    const handleFilter = (value) => {
      this.setState({
        filter: value,
       });
    }
    return (
      <>
        <Stack
              display={{ xs:"none", lg:"flex"}}
              borderBottom="solid 3px" mb={8} px={2} py={4} borderColor="brand.light1" isInline spacing={8}>
              <Text>Filtrer :</Text>
              <RadioGroup defaultValue="all" name="filter" isInline spacing={8} onChange={(e) => { handleFilter(e.target.value) }}>
                <Radio value="all">Tous les bateaux</Radio>
                <Radio value="solo">Solo</Radio>
                <Radio value="double">Double</Radio>
                <Radio value="équipage">Équipage</Radio>
              </RadioGroup>
            </Stack>
        {posts &&
          posts.map(({ node: post }) => (

             filter === 'all' || filter === post.frontmatter.crew  ? 
            <Grid
              as="article"
              bg="white"
              templateColumns={{ xs:"100%", lg:"15% 250px calc( 100% - 15% - 250px ) "}}
              key={post.id}
              w={{ xs:"100%"}}
              mb={0}
              borderTop="solid 1px"
              borderTopColor="gray.100"
              h={{ xs:"auto", lg:"220px"}}
              
            >
              <Box
                display={{ xs:"none", lg:"initial"}}
              >
                <Text
                  mt={1}
                  textTransform="uppercase"
                  color="gray.400"
                >{post.frontmatter.crew}</Text>
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
              
              <Stack spacing={4} px={{xs:0, lg:10}} py={5}>
                <Heading
                  as="h3"
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
                  <strong>{post.frontmatter.title}</strong> — {post.frontmatter.description}
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
            :null

          ))}

        
      </>
    )
  }
}

BoatsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BoatsRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "boat-spec" } } }
          limit: 1000
        ) {
          edges {
            node {
              excerpt(pruneLength: 80)
              id
              frontmatter {
                path
                title
                templateKey
                crew
                description
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
    render={(data, count) => <BoatsRoll data={data} count={count} />}
  />
)
