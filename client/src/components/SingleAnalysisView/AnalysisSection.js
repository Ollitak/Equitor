import React from "react";
import { Grid, Header, Segment, Label, Image, Divider } from "semantic-ui-react";

/* Render label based on recommendation input. */
const RecommendationLabel = ({ recommendation }) => {
  switch (recommendation) {
    case "BUY":
      return (
        <Label color="green" size="medium">
          BUY
        </Label>
      );
    case "HOLD":
      return (
        <Label color="yellow" size="medium">
          HOLD
        </Label>
      );
    case "SELL":
      return (
        <Label color="red" size="medium">
          SELL
        </Label>
      );
    default:
      return (
        <Label color="black" size="medium">
          N/A
        </Label>
      );
  }
};

/* Presents general information on the left side, such as company name, user that
made the analysis, recommendation and target price. Constructed as Semantic UI
column with multiple rows. */
export const SummarySection = ({ analysis }) => {
  return (
    <Grid.Row>
      <Grid stackable container style={{ margin: "auto", marginTop: "3em" }}>
        <Grid.Row columns="6">
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Header as="h3" style={{ fontSize: "1em", fontFamily: "Courier New" }}>
              Company name:
            </Header>
          </Grid.Column>

          <Grid.Column textAlign="left" verticalAlign="middle">
            <Image verticalAlign="middle" size="tiny" src={analysis.stockInformation.logoUrl} />
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Header
              as="h3"
              style={{ fontSize: "1em", fontFamily: "Courier New", fontStyle: "italic" }}>
              BUY,HOLD or SELL:
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="left" verticalAlign="middle">
            <RecommendationLabel recommendation={analysis.recommendation} />
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Header
              as="h3"
              style={{ fontSize: "1em", fontFamily: "Courier New", fontStyle: "italic" }}>
              Target price:
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="left" verticalAlign="middle">
            <Label tag color="black" size="small">
              {" "}
              € {analysis.targetPrice}
            </Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Row>
  );
};

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

/* Presents summary component on the left and written analysis on the right. */
const AnalysisSection = ({ analysis }) => {
  return (
    <Grid>
      <Grid.Row>
        <SummarySection analysis={analysis} />
      </Grid.Row>
      <Grid.Row>
        <TextSection analysis={analysis} />
      </Grid.Row>
    </Grid>
  );
};

export default AnalysisSection;
