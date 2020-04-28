import React from 'react'
import PropTypes from 'prop-types'
// import { PageTemplate } from '../../page-templates/page'
import {
  Heading,
  CSSReset,
  ThemeProvider
} from "@chakra-ui/core"

const PagePreview = ({ entry, widgetFor }) => (

<div style={{ color:"red !important"}}>
  <ThemeProvider>
    <CSSReset />
    <Heading boxShadow="lg">
      Test
    </Heading>
  {/* <PageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  /> */}
  </ThemeProvider>
  </div>



)

PagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PagePreview