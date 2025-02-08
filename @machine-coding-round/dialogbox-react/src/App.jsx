import React from "react";
import Dialoag from "./Dialog/dialog";

const App = () => {
  const [showDialog, setShowDialog] = React.useState(false);

  function handleShowDialog() {
    setShowDialog(!showDialog);
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  return (
    <div>
      <button onClick={handleShowDialog}>Show Dialog</button>
      {showDialog && (
        <Dialoag onClose={handleCloseDialog}>
          <p>Some random text</p>
        </Dialoag>
      )}
    </div>
  );
};

export default App;
