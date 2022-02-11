import React from "react";
import { Grid, Header } from "semantic-ui-react";

/* Conditionally render title and content based on if content exists. */
const Paragraph = ({ title, content }) => {
  if (!content) return null;
  return (
    <Grid.Row style={{ marginBottom: "3em" }}>
      <Header as="h3" style={{ fontSize: "1.5em", textAlign: "center" }}>
        {title}
      </Header>
      <p style={{ fontSize: "1.0em", color: "black" }}>{content}</p>
    </Grid.Row>
  );
};

/* TextSection presents users written analysis in multiple paragraphs. */
export const TextSection = ({ analysis }) => {
  return (
    <Grid.Row style={{ maxWidth: "800px", margin: "auto" }}>
      <Grid.Column>
        <Paragraph title={"Summary"} content={analysis.content.summary} />
        <Paragraph
          title={"Basic company information"}
          content={analysis.content.basicCompanyInformation}
        />
        <Paragraph title={"Business description"} content={analysis.content.businessDescription} />
        <Paragraph
          title={"Industry overview and competitive positioning"}
          content={analysis.content.industryOverviewAndCompetitivePositioning}
        />
        <Paragraph title={"Investment summary"} content={analysis.content.investmentSummary} />
        <Paragraph title={"Financial analysis"} content={analysis.content.financialAnalysis} />
        <Paragraph title={"Valuation"} content={analysis.content.valuation} />
        <Paragraph title={"Investment risks"} content={analysis.content.investmentRisks} />
        <Paragraph title={"ESG matters"} content={analysis.content.ESGMatters} />
      </Grid.Column>
    </Grid.Row>
  );
};
