/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    // To be included for sourcing MDX from GraphQL at DFRNT (and elsewhere like TerminusCMS and others)
    // `@dfrnt/gatsby-source-graphql-nodes`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `layouts`,
        path: `${__dirname}/src/layouts`,
      },
    },
    {
      resolve: `gatsby-mdx-remote`,
      options: {
        mdxNodeTypes: {
          "MyNodeType": {
            mdxField: "data.statement.markdown",
            mdxFrontmatterField: "data.frontmatter",
            gatsbyImageClassName: "rounded-md",
            preprocessImages: true,
          }
        },
        frontmatterSharpRemoteImageUrlArrayField: "imageList",
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ],
}
