import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import "./styles/chartsModal.css";

const ChartsModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Modal
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      trigger={<button className="sav-left-button">CHARTS</button>}
      size="large">
      <div className="fa">
        <div className="fa-wrapper">
          <div className="fa-header">CHARTS</div>
          <Modal.Content scrolling></Modal.Content>
        </div>
      </div>
    </Modal>
  );
};

export default ChartsModal;
