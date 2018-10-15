import React from "react";
import { Button } from "react-bootstrap";
import "./LoaderButton.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSyncAlt)
export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <FontAwesomeIcon icon="sync-alt" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>;