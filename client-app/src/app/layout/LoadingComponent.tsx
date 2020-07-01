import React, { FC } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent: FC<{ inverted?: boolean; content?: string }> = ({
  inverted = true,
  content,
}) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoadingComponent;
