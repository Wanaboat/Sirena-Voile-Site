import React from 'react'
import PropTypes from 'prop-types'
import '../wysiwyg.css'
export const HTMLContent = ({ content }) => (
  <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content }) => (
  <div>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content