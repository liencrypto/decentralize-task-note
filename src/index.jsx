import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import './styles.css';
import nos from "@nosplatform/api-functions/es6";
import { create } from "axios";
import {
    str2hexstring,
    int2hex,
    hexstring2str
} from "@cityofzion/neon-js/src/utils";

const ipfs = "https://ipfs.infura.io/ipfs/";
class Note extends React.Component {


    constructor(props) {
        super(props);
        this.state = {address: 'loading...', listNotes: []};
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({text: '', listNotes: [...this.state.listNotes, this.state.text]});

    };

    onChange = (event) => {
        this.setState({text: event.target.value});
    };

    componentWillMount = async () => {
        await this.handleGetAddress();
        await this.handleGetStorage();
    };

    handleGetAddress = async () => {
        const address = await nos.getAddress();
        this.setState({address: address});
    };

    handleGetStorage = async () => {
        const scriptHash = "5115bed787fbc60175d6c5e954b8ef36986d1d49";
        const key = "to-do-ipfs-hash";
        const option = { encode: false };

        const storedData = await nos.testInvoke(scriptHash, 'GetIPFSHash', ["LIENLIEN"], option);
        console.log(hexstring2str(storedData));

        const dataFromSmartContract = await nos.getStorage(scriptHash, key);
        // const dataFromSmartContract = await nos.testInvoke(scriptHash, "GetIPFSHash", key, option);
        alert(dataFromSmartContract);
        console.log(hexstring2str(dataFromSmartContract));
        // const ipfsFileHash = dataFromSmartContract.hash;
        // const { data } = await req.get(ipfs + ipfsFileHash);
        //
        // this.setState({address: address});
    };

    render() {
        return (
            <div className="wrapper">
                <div className="inner-wrapper">

                    <div className="row-header">
                        <span className="add-new-note-text">Your wallet address: </span>
                        <span className="wallet-text">{this.state.address}</span>
                        <div/>
                    </div>

                    <div className="row-header add-new-note">
                        <img className="add-button-image" alt="add-button-image" src={require('../add-button.png')}/>
                        <span className="add-new-note-text">Add new note</span>
                        <div/>
                    </div>

                    <div className="row-header">
                        <span className="title-header-text">To do dapp</span>
                        <div/>
                    </div>

                    <div className="table">
                        <div className="row">
                            <div className="first-cell">1</div>
                            <div className="second-cell"><span className="second-cell-text to-do-text-color">TODO</span></div>
                            <div className="cell">Need to create UI stuff for to-do-daily-note based on nOS plaform</div>
                        </div>

                        <div className="row">
                            <div className="first-cell" data-title="Age">2</div>
                            <div className="second-cell"><span className="second-cell-text fix-me-text-color">FIXME</span></div>
                            <div className="cell" data-title="Location">Investigate bug happened when integrating ipfs</div>
                        </div>

                        <div className="row">
                            <div className="first-cell" data-title="Age">3</div>
                            <div className="second-cell"><span className="second-cell-text note-text-color">NOTE</span></div>
                            <div className="cell" data-title="Location">Inspired everyday</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const List = (props) => {
    return (
        <ul>
            {
                props.items.map((item, index) => <li key={index}>{item} </li>)
            }
        </ul>
    );
};

ReactDOM.render(
    <Note/>,
    document.getElementById("root")
);

// export default injectSheet(styles)(Note);