import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink, graphql } from "gatsby"

import Seo from "../components/Head.js"

import Layout from "../components/Layout"
import Features from "../components/Features"
import BlogRoll from "../components/BlogRoll"
// import AdsRoll from "../components/AdsRoll"

import css from "./hero.module.scss";


// import HeroMobileWebp from "../images/hero-mobile.webp"
// import HeroMobileJpg from "../images/hero-mobile.jpg"

import HeroDesktopWebp from "../images/sl-5.2-hp.jpg"
import HeroDesktopJpg from "../images/sl-5.2-hp.jpg"

import {
  Box,
  Flex,
  Heading,
  Link,
  PseudoBox,
  SimpleGrid,
  Text,
  Stack
} from "@chakra-ui/core";

const Hero = ({ heading, subheading, chapo, phoneNumber, address, phoneNumberRaw, openingHours }) => {
  return (
    <Box
      id="home-hero"
      bg="brand.dark1"
      p={{ xs: 30, lg: 70 }}
    >
      <Stack spacing={{ xs: 6, lg: 10 }} maxW={{lg:"450px", xl:"650px", xxl:"700px"}}>
        <Box>
          <Heading
            as="h1"
            fontSize={{ xs: 26, md:30, lg: 58 }}
            color="brand.light1"
          >{heading}</Heading>
          <Text
            color="white"
            fontSize={{ xs: 16, md:18, lg: 22 }}
            textTransform="uppercase"
            letterSpacing="0.35rem"
          >
            {subheading}
          </Text>
        </Box>

        <Text
          fontSize={{ xs: 14, lg: 18 }}
          color="white"
        >
          {chapo}
        </Text>

        <Box>
          <Text fontSize={{ xs: 12, md: 24 }} fontWeight="bold" color="white" mb={4}>Accès et contact :</Text>
          <SimpleGrid
            fontSize={{ xs: 12, lg: 18 }}
            color="white" columns={{ xs: 1, lg: 2 }}>
            <Text>
              {address}
              <br />
              {openingHours}
            </Text>
            <Box>
              <Text mb={4}>Tél : <Link href={`tel:+${phoneNumberRaw}`}>{phoneNumber}</Link></Text>
              <PseudoBox
                mt={2}
                mb={2}
                as={GatsbyLink}
                to="/a-propos/"
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
                Contacts
              </PseudoBox>
            </Box>
          </SimpleGrid>
        </Box>
      </Stack>

      <Box
        position="absolute"
        right={0}
        top={"103px"}
        w="500px"
        h="500px"
        display={{ xs:"none", lg:"initial"}}
      >
        <picture className={css.headerIllu}>
          <source 
            srcSet={HeroDesktopWebp}
            type="image/webp"
          />
          <source 
            srcSet={HeroDesktopJpg}
            type="image/jpeg"
          />
          <img
            alt="Sirena Voile"
            loading="lazy"
            style={{
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }} src={HeroDesktopJpg} />

          <svg width="0" height="0">
            <defs>
              <clipPath id="headerIlluMask">
              <path fillRule="evenodd" clipRule="evenodd" d="M207.132 0.12207L60.6676 146.587C-20.2226 227.478 -20.2226 358.626 60.6678 439.517C98.8814 477.73 148.311 497.892 198.36 500H215.905C265.954 497.892 315.384 477.73 353.598 439.517L353.898 439.216L499.203 293.911V292.192L498.891 291.88H499.203V0H207.295V0.28418L207.132 0.12207Z" fill="#FF0000"/>
              </clipPath>
            </defs>
          </svg>
        </picture>
        <Box
          display={{ xs: "none", md: "block" }}
          position="absolute"
          top={"9rem"}
          right={"0"}
          zIndex={'base'}
        >
          <svg width="321" height="321" viewBox="0 0 321 321" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M132.979 0.0783409L38.9487 94.1088C-12.9829 146.04 -12.9829 230.238 38.9487 282.17C63.4829 306.704 95.2188 319.647 127.352 321H138.607C170.74 319.647 202.475 306.704 227.01 282.17L320.488 188.691V187.587L320.288 187.387H320.488V0H133.083V0.182537L132.979 0.0783409Z" fill="#FFE587"/>
          </svg>
        </Box>
      </Box>
    </Box>
  )
}

export const IndexPageTemplate = ({
  alertBanner,
  address,
  phoneNumber,
  phoneNumberRaw,
  openingHours,
  heading,
  subheading,
  description,
  offers,
  chapo,
}) => (
    <>
      <Flex
        bg="brand.light2"
        justify="center"
        p={1}
      >
        <Text
          textTransform="uppercase"
          fontSize={{ xs: 10, lg: "base" }}
          letterSpacing="0.15rem"
          textAlign="center"
        >
          {alertBanner}
        </Text>
      </Flex>
      <Hero
        heading={heading}
        subheading={subheading}
        chapo={chapo}
        address={address}
        openingHours={openingHours}
        phoneNumber={phoneNumber}
        phoneNumberRaw={phoneNumberRaw}
      />
      <Flex
        as="section"
        bg="#FAFAFA"
        justify="space-around"
        p={{ xs:4, lg:8 }}
        borderBottom="solid 1px"
        borderBottomColor="gray.100"
        flexWrap={{ xs: "wrap", lg: "nowrap" }}
      >
        <BlogRoll />
      </Flex>
      <Features gridItems={offers} />
    </>
  )

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  alertBanner: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <IndexPageTemplate
        alertBanner={frontmatter.alertBanner}
        openingHours={frontmatter.openingHours}
        address={frontmatter.address}
        phoneNumber={frontmatter.phoneNumber}
        phoneNumberRaw={frontmatter.phoneNumberRaw}
        image={frontmatter.image}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        chapo={frontmatter.chapo}
        offers={frontmatter.offers}
      />
    </Layout>
  )
}

// IndexPage.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       frontmatter: PropTypes.object,
//     }),
//   }),
// }

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        alertBanner
        address
        openingHours
        phoneNumber
        phoneNumberRaw
        heading
        subheading
        chapo
        offers {
          title
          text
          image {
            childImageSharp {
              fixed(width: 400, height: 400) {
                ...GatsbyImageSharpFixed_withWebp_noBase64
             }
            }
          }
          buttonLabel
          buttonTarget
        }
      }
    }
  }
`
