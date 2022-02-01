import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAnalysis } from "../../reducers/analysisReducer";

/* Conditionally render buttons: if myPage set to true also render delete buttons. */
const Buttons = ({ analysis, myPage }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const moveToSingleView = () => {
    history.push(`analysis/${analysis.id}`);
  };

  const removeItem = async () => {
    dispatch(deleteAnalysis(analysis.id));
  };

  return (
    <Grid verticalAlign="middle">
      <Grid.Column>
        {myPage ? (
          <div>
            <Button
              onClick={moveToSingleView}
              content={"View"}
              compact
              style={{
                height: "4em",
                width: "6em",
                color: "white",
                backgroundColor: "rgb(10, 40, 230)"
              }}
            />
            <Button
              onClick={removeItem}
              content={"Delete"}
              compact
              style={{ height: "4em", width: "6em", color: "white", backgroundColor: "red" }}
            />
          </div>
        ) : (
          <Button
            onClick={moveToSingleView}
            content={"View analysis"}
            compact
            style={{ height: "4em", color: "white", backgroundColor: "rgb(10, 40, 230)" }}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Buttons;
