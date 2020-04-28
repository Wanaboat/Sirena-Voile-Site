import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../page-templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  // const tags = entry.getIn(['data', 'tags'])
  return (
    <BlogPostTemplate
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      featuredImage={entry.getIn(['data', 'featuredImage'])}
      content={widgetFor('body')}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
