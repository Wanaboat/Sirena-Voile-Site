import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  CSSReset,
  ThemeProvider
} from "@chakra-ui/core"
import { IndexPageTemplate } from '../../page-templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <ThemeProvider theme={theme}>
      <CSSReset />
      <Header siteTitle={data.site.siteMetadata.title} />

      <Box
            minH="calc(100vh - 220px - 69px)"
            pt={{ xs:"50px", lg:0}}
            as="main">
      <IndexPageTemplate
        image={data.image}
        title={data.title}
        heading={data.heading}
        subheading={data.subheading}
        description={data.description}
        intro={data.intro || { blurbs: [] }}
        mainpitch={data.mainpitch || {}}
      />

            </Box>
          <Footer title={data.site.siteMetadata.title} subTitle={data.site.siteMetadata.subTitle} />
        </ThemeProvider>
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
