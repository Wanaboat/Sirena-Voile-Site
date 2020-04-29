import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import Menu from './menu.component.js'
import logo from '../images/logo-sirena.svg'

export const Header = ({ siteTitle }) => (
  <Flex
    as="header"
    bg="brand.dark1"
    h={{xs:"50px", lg:"80px"}}
    top="0"
    left="0"
    w="100vw"
    justify={{ xs:"space-between", lg:"center"}}
    align={{ xs:"center", lg:"initial"}}
    position={{xs:"fixed", lg:"initial"}}
    zIndex="modal"
  >
    <Box w={"160px"} color="brand.light1" fontWeight="bold" pl={2} display={{ xs:"initial", lg:"none"}}>
      <Link to="/">
          <img
            style={{
              height: "32px"
            }}
            src={logo}
            alt={siteTitle}
          />
      </Link>
    </Box>
    <Menu />
  </Flex>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
