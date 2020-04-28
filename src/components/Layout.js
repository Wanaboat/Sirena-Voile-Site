import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import {
  Box,
  CSSReset,
  ThemeProvider
} from "@chakra-ui/core"
import theme from '../theme/theme';
import { Header, Footer } from "../components"
import '../scss/styles.scss'

// Global application wrapper
export const AppLayout = ({ children, pageContext }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            subTitle
          }
        }
      }
    `}
    render={data => {
      return (
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Header siteTitle={data.site.siteMetadata.title} />
          <Box
            minH="calc(100vh - 220px - 69px)"
            pt={{ xs:"50px", lg:0}}
            as="main">{children}</Box>
          <Footer title={data.site.siteMetadata.title} subTitle={data.site.siteMetadata.subTitle} />
        </ThemeProvider>
      )
    }
    }
  />
)

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
