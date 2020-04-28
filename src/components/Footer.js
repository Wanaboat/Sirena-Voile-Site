// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Flex, Text } from "@chakra-ui/core";

export const Footer = ({ title, subTitle }) => (
  <Flex
    as="footer"
    h="220px"
    bg="brand.dark1"
    justify="center"
    align="center"
    >
      <Box>
        <Text
          fontSize={{ xs:22, lg:42}}
          fontWeight="bold"
          textAlign="center"
          color="brand.light1">{title}</Text>
        <Text
          fontSize={{ xs:10, lg:14}}
          fontWeight="normal"
          textAlign="center"
          textTransform="uppercase"
          letterSpacing="0.25rem"
          color="white"
        >{subTitle}</Text>
      </Box>
    
  </Flex>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}
