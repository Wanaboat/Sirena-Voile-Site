import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
// import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Img from "gatsby-image"

import {
  Box,
  Flex,
  Heading,
  PseudoBox,
  SimpleGrid,
  Text,
  Stack
} from "@chakra-ui/core";

const FeatureGrid = ({ gridItems }) => (
  <Box>
    {gridItems.map((item , index) => (
      <SimpleGrid
      key={`feature${index}`}
        borderBottom="solid 1px"
        borderBottomColor="gray.100"
        columns={{ xs: 1, lg: 2 }}>
        <Flex
          backgroundColor="gray.50"
          align="center"
          justify="center"
          p={{ xs: 10, lg: 50 }}
          position="relative"
          w={{ xs:"100vw", lg:"50vw"}}
        >
          <Flex
            w="100%"
            h="60%"
            justifyContent="center"
            flexWrap="wrap"
          >
            <picture
              style={{
                width:'100%',
                maxWidth: '450px'
              }}
            >
              <Img
                loading="lazy"
                style={{
                  width:'100%',
                  maxWidth: '450px',
                  zIndex:200,
                  borderRadius:'4px',
                }} fixed={item.image.childImageSharp.fixed} />
            </picture>
            <Box
              w="75%"
              borderRadius={8}
              h="40px"
              bg="brand.light2"
              zIndex="base"
              transform="translateY(-35px)"
              maxW={{ lg:"380px" }}
            />
          </Flex>
        </Flex>
        <Stack
          p={{ xs: 10, lg: 50 }}
          flexWrap="wrap"
          spacing={8}
        >
          <Box>
            <Heading
              as="h3"
              fontSize={{ xs: 'xl', lg: '3xl' }}
              mb={5}
              display="inline-block"
              borderBottom="solid 3px"
              borderColor="brand.light2"
            >
              {item.title}
            </Heading>
          </Box>
          <Text mb={5}>
            {item.text}
          </Text>
          <Box>
            <PseudoBox
              as={GatsbyLink}
              to={item.buttonTarget}
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
              {item.buttonLabel}
            </PseudoBox>
          </Box>
        </Stack>
      </SimpleGrid>
    ))}
  </Box>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
      buttonLabel: PropTypes.string,
      buttonTarget: PropTypes.string,
    })
  ),
}

export default FeatureGrid
