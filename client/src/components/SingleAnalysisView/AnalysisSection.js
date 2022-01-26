import React from "react";
import {
  Grid,
  Header,
  Segment,
  Label,
  Image,
} from "semantic-ui-react";

/* Render label based on recommendation input. */
const RecommendationLabel = ({ recommendation }) => {
  switch(recommendation){
  case "BUY":
    return <Label color="green" size="huge">BUY</Label>;
  case "HOLD":
    return <Label color="yellow" size="huge">HOLD</Label>;
  case "SELL":
    return <Label color="red" size="huge">SELL</Label>;
  default:
    return <Label color="black" size="huge">N/A</Label>;
  }
};

/* Presents general information on the left side, such as company name, user that
made the analysis, recommendation and target price. Constructed as Semantic UI
column with multiple rows. */
const SummarySection = ({ analysis }) => {
  return (
    <Grid.Column width={4} textAlign="center">
      <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
        <Grid.Column>
          <Segment vertical>
            <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Equity</Header>
            <Image verticalAlign="middle" size="small" src={analysis.stockInformation.logoUrl}/>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
        <Grid.Column>
          <Segment vertical>
            <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Analysis by</Header>
            <Header as="h3" color="blue" style={{ fontSize:"1.5em" }}>{analysis.user.username}</Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
        <Grid.Column>
          <Segment vertical>
            <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Recommendation</Header>
            <RecommendationLabel recommendation={analysis.recommendation}/>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Segment vertical>
            <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Target price</Header>
            <Label tag color="black" size="huge"> € {analysis.targetPrice}</Label>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid.Column>
  );
};

/* Conditionally render title and content based on if content exists. */
const Paragraph = ({ title, content }) => {
  if(!content) return null;
  return (
    <div style={{ marginBottom: "3em" }}>
      <Header as="h3" style={{ fontSize:"1.5em" }}>{title}</Header>
      <p style={{ fontSize:"1.0em" }}>{content}</p>
    </div>
  );
};

/* TextSection presents users written analysis in multiple paragraphs */
const TextSection = ({ analysis }) => {
  return (
    <Grid.Column width={12}>
      <Header as="h1" style={{ fontSize:"2.5em" }}>{analysis.title}</Header>
      <Paragraph title={"Summary"} content={analysis.content.summary} />
      <Paragraph title={"Basic company information"} content={analysis.content.basicCompanyInformation} />
      <Paragraph title={"Business description"} content={analysis.content.businessDescription} />
      <Paragraph title={"Industry overview and competitive positioning"} content={analysis.content.industryOverviewAndCompetitivePositioning} />
      <Paragraph title={"Investment summary"} content={analysis.content.investmentSummary} />
      <Paragraph title={"Financial analysis"} content={analysis.content.financialAnalysis} />
      <Paragraph title={"Valuation"} content={analysis.content.valuation} />
      <Paragraph title={"Investment risks"} content={analysis.content.investmentRisks} />
      <Paragraph title={"ESG matters"} content={analysis.content.ESGMatters} />
    </Grid.Column>
  );
};

/* Presents summary component on the left and written analysis on the right. */
const AnalysisSection = ({ analysis }) => {
  return(
    <Grid.Row>
      <SummarySection analysis={analysis} />
      <TextSection analysis={analysis}/>
    </Grid.Row>
  );
};

export default AnalysisSection;