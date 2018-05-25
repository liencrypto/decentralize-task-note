import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import './styles.css';

class Note extends React.Component {


    render() {
        return (
            <div>Create new project
            </div>
        );
    }
}

ReactDOM.render(
    <Note/>,
    document.getElementById("root")
);

// export default injectSheet(styles)(Note);