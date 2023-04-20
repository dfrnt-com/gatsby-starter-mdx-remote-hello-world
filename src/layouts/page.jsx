import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import YoutubeEmbed from "../../../gatsby-starter-dfrnt-graphql/src/components/YoutubeEmbed";

const shortcodes = { StaticImage, GatsbyImage, YoutubeEmbed };

const PageLayout = (props) => {
  return (
    <div>
      <MDXProvider components={shortcodes}>{props.children}</MDXProvider>
    </div>
  ); 
};

export default PageLayout;
