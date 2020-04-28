import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
// import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import Img from "gatsby-image"
import {
    Box,
    Heading
} from "@chakra-ui/core"

import AdsRoll from "../components/AdsRoll"


export const BoatSpecTemplate = ({
    content,
    contentComponent,
    description,
    featuredImage,
    modelID,
    title,
    helmet,
}) => {
    const PostContent = contentComponent || Content
    return (
        <Box  as="section" maxW={"1280px"} mx="auto">
            <Img fluid={featuredImage.childImageSharp.fluid} />
            <Box
                position="relative"
                zIndex="popup"
                w={{ xs:"100%", lg:"90%", xl:"75%" }}
                p={{ xs:5, lg:10 }}
                borderRadius={{ xs:0, lg:"10px" }}
                bg="white"
                mx="auto"
                mt={{ xs:"-30px", lg:"-80px", xl:"-140px"}}>
                {helmet || ""}
                <Heading as="h1">{title}</Heading>
                <Heading
                    as="h3"
                    color="gray.700"
                    fontSize={{ xs: 16, lg: 22 }}
                    textTransform="uppercase"
                    letterSpacing="0.35rem"
                >{description}</Heading>
                <Box my={5}>
                    <PostContent content={content} />
                </Box>
                
            </Box>
            <Box p={{ xs:2 }}>
                <AdsRoll modelID={modelID} />
            </Box>
        </Box>
    )
}

BoatSpecTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const BoatSpec = ({ data }) => {
    const { markdownRemark: post } = data
    // console.log( post.frontmatter.featuredImage.childImageSharp.fluid.src )
    return (
        <Layout>
            <BoatSpecTemplate
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                modelID={post.frontmatter.modelID}
                featuredImage={post.frontmatter.featuredImage}
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

BoatSpec.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default BoatSpec

export const pageQuery = graphql`
  query BoatSpecByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        modelID
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1280, maxHeight: 600) {
              ...GatsbyImageSharpFluid
           }
          }
        }
      }
    }
  }
`
