import React, { useState } from "react";
import { Modal } from "semantic-ui-react";

import "./styles/fullAnalysisModal.css";

/** Component to render each paragraph within full analysis modal.
 *  Conditionally renders the title and the content based on content's existance.
 */

const Paragraph = ({ title, content }) => {
  if (!content) return null;
  return (
    <div className="fa-paragraph">
      <h1 className="fa-paragraph-header">{title}</h1>
      <p className="fa-paragraph-content">{content}</p>
    </div>
  );
};

/** Component renders a button, which triggers a new modal. Modal displays the written equity analysis.
 *  The written analysis is divided in multiple sections which of each are rendered using
 *  Paragraph component.
 */

const FullAnalysisModal = ({ analysis }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Modal
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      trigger={<button className="sav-left-button">FULL ANALYSIS</button>}
      size="large">
      <div className="fa">
        <div className="fa-wrapper">
          <div className="fa-header">FULL ANALYSIS</div>
          <Modal.Content scrolling>
            <Paragraph title={"Summary"} content={analysis.content.summary} />
            <Paragraph
              title={"Basic company information"}
              content={analysis.content.basicCompanyInformation}
            />
            <Paragraph
              title={"Business description"}
              content={analysis.content.businessDescription}
            />
            <Paragraph
              title={"Industry overview and competitive positioning"}
              content={analysis.content.industryOverviewAndCompetitivePositioning}
            />
            <Paragraph title={"Investment summary"} content={analysis.content.investmentSummary} />
            <Paragraph title={"Financial analysis"} content={analysis.content.financialAnalysis} />
            <Paragraph title={"Valuation"} content={analysis.content.valuation} />
            <Paragraph title={"Investment risks"} content={analysis.content.investmentRisks} />
            <Paragraph title={"ESG matters"} content={analysis.content.ESGMatters} />
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
};

export default FullAnalysisModal;
