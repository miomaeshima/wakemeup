import React, {Fragment} from "react";
import './App.css';
import InputEntries from "./components/InputEntries"
import ListEntries from "./components/ListEntries"
function App() {
  return (
    <Fragment>
       <h1>Wakemeup with a bird's song</h1>
       <InputEntries/>    
       <div id="list">
       <ListEntries/>
       </div>
    </Fragment>
  );
}

export default App;
