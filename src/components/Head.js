import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, slug, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          siteMediaUrl,
          defaultImage,
          twitterUsername,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: (image !== null ) ? `${image}` : `${siteUrl}/${defaultImage}`,
        url: (slug !== null ) ? `${siteUrl}/${slug}` : `${siteUrl}`,
        faviconUrl: `${siteUrl}/favicon.png`,
      }
      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
          	<html lang="fr" />
            <meta charSet="utf-8" />
          	<link rel="canonical" href={seo.url} />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <link rel="icon" type="image/png" href={seo.faviconUrl} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:type" content="website" />
            <meta property="fb:app_id" content="209954609027802"/>
            {seo.url && <meta property="og:url" content={seo.url} />}
            {(article ? true : null) && (
              <meta property="og:type" content="article" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {twitterUsername && (
              <meta name="twitter:creator" content={twitterUsername} />
            )}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  slug: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  slug: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: siteUrl
        siteMediaUrl: siteMediaUrl
        defaultImage: image
      }
    }
  }
`
