import React from "react";
import "./AnalyseItem.css";
import { useHistory } from "react-router-dom";
import { deleteAnalysis } from "../reducers/analysisReducer";
import { useDispatch } from "react-redux";
import { Segment, Grid, Image, Label, Icon } from "semantic-ui-react";


const AnalyseItem = ({ analysis, myPage }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const removeItem = async (id) => {
    dispatch(deleteAnalysis(id));
  };

  const moveToSingleView = () => {
    history.push(`analysis/${analysis.id}`);
  };

  return(
    <Segment color="olive" onClick={moveToSingleView} style={{ margin:"auto", height:"6em", maxWidth: "40em", marginBottom:"1em" }}>
      <Grid>
        <Grid.Column width={3}>
          <Image src={analysis.stockInformation.logoUrl} fluid style={{ height:"4em" }}/>
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid.Row>
            a new analysis on <b>{analysis.stockInformation.name}</b> was posted 1 hour ago
          </Grid.Row>
          <Grid.Row style={{ marginTop:"1em" }}>
            <Label color="black">
              <Icon name="like"></Icon>
              25
            </Label>
            <Label color="black">
              <Icon name="comments"></Icon>
              3
            </Label>
          </Grid.Row>
          {/* Only allow delete if user is on myPage */}
          {
            myPage
              ? <button onClick={() => removeItem(analysis.id)}> delete </button>
              : null
          }
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default AnalyseItem;