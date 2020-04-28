const path = require('path')

const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({graphql, actions}) => {
  
  const {createPage} = actions
  const adTemplate      = path.resolve('src/page-templates/ad.template.jsx')

  const CmsPages =  graphql(`
  {
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          id
          frontmatter {
            path
            templateKey
          }
        }
      }
    }
  }
`).then(result => {
  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(edge => {
    const id = edge.node.id
    if( edge.node.frontmatter.path ){
      createPage({
        path: edge.node.frontmatter.path,
        component: path.resolve(
          `src/page-templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    }
  })
})

  // Return a Promise which would wait for both the queries to resolve
  return Promise.all([ CmsPages ]);

};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}