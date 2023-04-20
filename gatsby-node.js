

const path = require('path')

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // Data can come from anywhere, so let's just create an MDX input node programmatically from some data to load into the MDX Remote plugin
  const frontmatter = {
    author: "John Doe",
    slug: `blog/blogpost`,
    title: `A first blogpost`,
    imageList: ["https://images.unsplash.com/photo-1522262139463-236991a708cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"]
  }

  const content = {
    mdx: `import YoutubeEmbed from \"../../../../src/components/YoutubeEmbed.jsx\"\n\n# Hello world\n\nHello world text\n\n<GatsbyImage alt="test 0" image={getImage(props.pageContext.imageList[0]?.childImageSharp?.gatsbyImageData)}/>\n\n![Sign you've been looking for](https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)\n\n<YoutubeEmbed id=\"GuvAMcsoreI\"/>\n`,
    id: `my-data-${12345}`,
  }

  const gatsbyMdxContent = {
    frontmatter,
    statement: { markdown: content.mdx }
  };

  const gatsbyNodeMeta = {
    id: createNodeId(content.id),
    parent: null,
    children: [],
    internal: {
      type: `MyNodeType`,
      mediaType: `text/markdown`,
      content: JSON.stringify(gatsbyMdxContent),
      contentDigest: createContentDigest(gatsbyMdxContent)
    }
  }

  const node = Object.assign({}, { data: gatsbyMdxContent }, gatsbyNodeMeta)

  createNode(node)
}

exports.createPages = async ({ graphql, actions, reporter, getNode }) => {
  const { createPage, createNode } = actions;
  const result = await graphql(`
    query {
      allMyNodeType {
        nodes {
          childMdx {
            id
            markdownImageList {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
            imageList {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
            parent {
              id
            }
            internal {
              contentFilePath
            }
            frontmatter {
              slug
              imageList
              title
            }
          }
        }
      }
    }
  `);

  result.data.allMyNodeType.nodes.map(node => node.childMdx).forEach(node => {
    const postTemplate = path.resolve(`./src/layouts/page.jsx`);

    createPage({
      path: `/${(node?.frontmatter).slug}`,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // component: path.resolve(`./src/layouts/page.jsx?__contentFilePath=${node?.internal.contentFilePath}`),
      // component: node?.internal.contentFilePath,
      // Random owner Node ID name
      ownerNodeId: node.id,
      // The context is passed as props to the component as well
      // as into the component's GraphQL query.
      context: {
        ...node,
      },
    });
  })
};
