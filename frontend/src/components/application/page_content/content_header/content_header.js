import React from "react";
import "./content_header.css";

class ContentHeader extends React.Component {
  render() {
    return (
      <div className="content-header" >
        <span className="content-header-rumble-match">
          <span className="content-header-rumble">rumble</span>{" "}
          <span className="content-header-match">{this.props.headerText}</span>
        </span>
      </div>
    );
  }
}

export default ContentHeader;