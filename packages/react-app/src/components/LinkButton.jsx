import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

const LinkButton = props => {
  const { history, location, match, staticContext, to, onClick, ...rest } = props;
  return (
    <button
      {...rest} // `children` is just another prop!
      onClick={event => {
        onClick && onClick(event);
        history.push(to);
      }}
    />
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(LinkButton);
