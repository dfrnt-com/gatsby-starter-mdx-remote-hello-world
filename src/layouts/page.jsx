import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

const shortcodes = { StaticImage: StaticImage, GatsbyImage };

const PageLayout = (props) => {
  return (
    <div>
      <MDXProvider components={shortcodes}>{props.children}</MDXProvider>
    </div>
  ); 
};

export default PageLayout;
