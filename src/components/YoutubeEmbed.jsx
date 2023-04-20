import * as React from 'react';

const YoutubeEmbed = ({ id }) => (
  <>
    <div>
      <iframe title="Video" style={{aspectRatio: "16/9", width: "100%"}} src={`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`} frameborder="0"></iframe>
    </div>
  </>
);

export default YoutubeEmbed;