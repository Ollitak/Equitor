import React from "react";
import { useDispatch } from "react-redux";
import { deleteAnalysis } from "../../reducers/analysisReducer";
import "./styles/buttons.css";

/** Component to render buttons for an analysis item. Includes two button elements, one to delete
 *  and one to modify analysis.
 *  [modification not yet implemented]
 */

const Buttons = ({ analysis }) => {
  const dispatch = useDispatch();

  const moveToSingleView = () => {
    window.confirm("Modification is not yet implemented :(");
  };

  const removeItem = async () => {
    if (window.confirm("Are you sure you want to delete an analysis?")) {
      dispatch(deleteAnalysis(analysis.id));
    }
  };

  return (
    <div className="feed-item-buttons">
      <button onClick={moveToSingleView} className="feed-item-button feed-item-button-modify">
        MODIFY
      </button>
      <button onClick={removeItem} className="feed-item-button feed-item-button-delete">
        DELETE
      </button>
    </div>
  );
};

export default Buttons;
