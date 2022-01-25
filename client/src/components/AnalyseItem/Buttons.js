import React from "react";
import { Button, Grid } from "semantic-ui-react";

/* Conditionally render buttons: if myPage set to true also render delete buttons*/
const Buttons = ({ moveToSingleView, removeItem, myPage }) => {
  return (
    <Grid verticalAlign="middle">
      <Grid.Column >
        {myPage
          ? <div>
            <Button
              onClick={moveToSingleView}
              content={"View"}
              compact
              style={{ height:"4em", color:"white", backgroundColor:"rgb(10, 40, 230)" }}
            />
            <Button
              onClick={removeItem}
              content={"Delete"}
              compact style={{ height:"4em", color:"white", backgroundColor:"red" }}
            />
          </div>
          :
          <Button
            onClick={moveToSingleView}
            content={"Check this out!"}
            compact
            style={{ height:"4em", color:"white", backgroundColor:"rgb(10, 40, 230)" }}
          />
        }
      </Grid.Column>
    </Grid>
  );
};

export default Buttons;
