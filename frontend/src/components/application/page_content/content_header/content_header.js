import React from "react";
import { Link } from "react-router-dom";
import "./content_header.css";

class ContentHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-header" title="application > page_content > content_header.js">
        <span className="content-header-rumble-match">
          <span className="content-header-rumble">rumble</span>{" "}
          <span className="content-header-match">match</span>
        </span>
      </div>
    );
  }
}

export default ContentHeader;