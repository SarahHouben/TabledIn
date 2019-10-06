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
          <h3>Confirmation required</h3>
          <div className="modal-content">{this.props.children}</div>
          <div className="actions">
            <button
              className="delete-button"
              onClick={(this.onClose, this.onClickParentFunction)}
            >
              Yes, delete
            </button>
            <button className="cancel-button" onClick={this.onClose}>
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
