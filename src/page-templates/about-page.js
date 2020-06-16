import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import Seo from "../components/Head.js"

import {
  Box,
  Heading,
  Stack,
  } from "@chakra-ui/core";

export const AboutPageTemplate = ({
  title,
  description,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content
  const defaultOptions = {
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: true,
    draggableCursor: "default",
    draggingCursor: "move",
  }
  const { locationCoordinate } = useSiteMetadata()
  return (
    <Box>
        <Stack
          spacing="4"
          maxWidth="900px"
          mx="auto"
          my={{ xs:4, lg:20}}
          px={{ xs:"2rem", lg:"5rem" }}
          py={{ xs:"2rem", lg:"2rem" }}
        >
          <Heading as="h1">{title}</Heading>
          <Heading
            as="h3"
            fontWeight="ligth"
            fontSize={{ xs:16, lg:22}}
            >{description}</Heading>
        </Stack>
        <Box
          maxW="1280px"
          mx="auto"
          my={4}
        >
          <LoadScript
            id="script-loader"
            googleMapsApiKey="AIzaSyC7O1XSp3BY1qkSUWKhR0hl4mOHcCIxi_U"
          >
            <GoogleMap
              id="model-map"
              mapContainerStyle={{
                height: "400px",
                width: "100%",
              }}
              zoom={8}
              center={{
                lat: locationCoordinate.lat,
                lng: locationCoordinate.lon,
              }}
              defaultOptions={defaultOptions}
            >
              <Marker
                position={{
                  lat: locationCoordinate.lat,
                  lng: locationCoordinate.lon,
                }}
                id={1}
                label="Sirena Voile"
                label-color="white"
                labelStyle={{ size: "10px" }}
                title="Sirena"
                clickable={true}
              />
            </GoogleMap>
          </LoadScript>
        </Box>
        <Box
          maxWidth="900px"
          mx="auto"
          px={{ xs:"2rem", lg:"5rem" }}
          py={{ xs:"2rem", lg:"5rem" }}
        >
          <PageContent content={content} />
        </Box>
      </Box>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Seo title="test" description="description" />
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
