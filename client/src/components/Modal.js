import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Modal extends Component {
  onClickParentFunction = () => {
    this.props.onClickFunction();
  };

  onClose = () => {
    this.props.onClose && this.props.onClose();
  };

  render() {
    //toggle Modal state
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-background">
        <div className="modal" id="modal">
          <h2>Confirmation required</h2>
          <div className="content">{this.props.children}</div>
          <div className="actions">
            <button
              className="toggle-button delete"
              onClick={(this.onClose, this.onClickParentFunction)}
            >
              Yes, delete
            </button>
            <button className="toggle-button cancel" onClick={this.onClose}>
              No, cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
