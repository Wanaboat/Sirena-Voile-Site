const siteConfig = require("./config.js");
// const path = require("path");

let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${activeEnv}`
});

module.exports = {
  siteMetadata: siteConfig.metaData,
  plugins: [
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: siteConfig.contentFullSpaceId,
    //     accessToken: siteConfig.contentFullAccessToken
    //   }
    // },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/static/img`,
          name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown`,
        name: 'markdown-pages',
      },
    },
 
    `gatsby-plugin-sass`,

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
  },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sirena`,
        short_name: `Sirena`,
        start_url: `/`,
        background_color: `hsl(0, 0%, 21%)`,
        theme_color: `hsl(0, 0%, 21%)`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-offline`
    },
    // 'gatsby-plugin-offline',

    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://deriveurs-services.wanaboat.fr',
        sitemap: 'https://deriveurs-services.wanaboat.fr/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: "gatsby-plugin-chakra-ui",
      options: {
        isResettingCSS: true,
        isUsingColorMode: false,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentityWidget: true,
        publicPath: `admin`,
        htmlTitle: `Gestion des contenus Dériveur Service`,
        htmlFavicon: `src/images/favicon.png`,
        includeRobots: false,
        },
    },
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ],
}
