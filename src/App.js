import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize';
import 'progressbar.js/dist/progressbar';
import socketListener from './services/socket.service';
import ConnectionStatus from './components/connectionstatus';
import JobTable from './components/jobtable';
const ProgressBar = require('react-progressbar.js');
const Line = ProgressBar.Line;

let jobs = {};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { jobs: jobs, isConnected: socketListener.isConnected() };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        socketListener.addListener(this.onChange);
    }

    componentWillUnmount() {
        socketListener.removeAllListeners();
    }

    tryCancel(uuid) {
        socketListener.requestCancel(uuid);
    }

    onChange(job, type) {
        if (type === 'start') {
            jobs[job.job.uuid] = job;
        }
        if (type === 'progress') {
            jobs[job.job.uuid] = job;
        }
        if (type === 'end') {
            delete jobs[job.job.uuid];
        }
        if (type === 'disconnect') {
            jobs = [];
        }
        this.setState({ jobs: jobs, isConnected: socketListener.isConnected() });
    }

    render() {
        return (
          <div className="App">
              <div id="pagecontainer" className="container">
                  <ConnectionStatus isConnected={ this.state.isConnected }/>
                  <JobTable jobs={ this.state.jobs } callbackParent={ this.tryCancel } />
              </div>
          </div>
        )
    };
}

export default App;
