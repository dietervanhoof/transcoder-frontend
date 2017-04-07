import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize';
import 'progressbar.js/dist/progressbar';
import socketListener from './services/socket.service';
const ProgressBar = require('react-progressbar.js')
const Line = ProgressBar.Line;

let jobs = {};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { jobs: jobs};
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        socketListener.addListener(this.onChange);
    }

    componentWillUnmount() {
        socketListener.removeAllListeners();
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
            console.log('Got a disconnect');
            jobs = [];
        }
        this.setState({ jobs: jobs });
    }

    render() {
    return (
      <div className="App">
          <div style={{width: 70 + '%'}} id="pagecontainer" className="center">
              { socketListener.isConnected() ?
                  (<div><p className="right-align" style={{ color: 'Green'}}><u>Connected</u></p></div>) :
                  (<div><p className="right-align" style={{ color: 'Red' }}><u>Not connected!</u></p></div>) }
              <table className="bordered">
                  <thead>
                      <tr>
                          <th width="40%">File</th>
                          <th width="30%">Progress</th>
                          <th width="30%">ETA</th>
                      </tr>
                  </thead>

                  <tbody id="tablebody">
                  { Object.keys(jobs).map(key => {
                      var job = jobs[key];
                      return renderJob(job)
                  }) }
                  </tbody>
              </table>
          </div>
      </div>
    )
    };
}

var renderJob = function(job) {
    const style = { width: job.progress.percentComplete + '%' };
    return (
        <tr key={ job.job.uuid }>
            <td>{ job.job.filename }</td>
            <td>
                <div id="container" className="col s10 valign">
                        <Line
                            progress={(job.progress.percentComplete / 100)}
                            text={job.progress.percentComplete + '%'}
                            initialAnimate={true}
                            options={{
                                strokeWidth: 2,
                                easing: 'easeInOut',
                                color: '#5bc0de',
                                trailColor: '#eee',
                                trailWidth: 2,
                                svgStyle: {width: '100%', height: '100%'},
                                from: {color: '#5bc0de'},
                                to: {color: '#5bc0de'},
                                text: {
                                    style: {
                                        // Text color.
                                        // Default: same as stroke color (options.color)
                                        color: '#999',
                                        position: 'absolute',
                                        right: '0',
                                        top: '18px',
                                        padding: 0,
                                        margin: 0,
                                        transform: null
                                    },
                                    autoStyleContainer: false
                                }
                            }}/>
                </div>
            </td>
            <td>
                <p className="center">{ prettyPrintTimeRemaining(job.progress.eta) }</p>
            </td>
            <td>
                <button onClick={ () => tryCancel(job.job.uuid) }>Cancel</button>
            </td>
        </tr>
    );
};

function tryCancel(uuid) {
    socketListener.requestCancel(uuid);
}

function prettyPrintTimeRemaining(eta) {
    if (eta === '') {
        return 'Unknown';
    } else {
        const hours = eta.substring(0, 2);
        const minutes = eta.substring(3, 5);
        const seconds = eta.substring(6, 8);
        let prettyString = '';
        if (hours !== '00') {
            prettyString += hours + ' h ';
        }
        if (minutes !== '00') {
            prettyString += minutes + ' m ';
        }
        if (seconds !== '00') {
            prettyString += seconds + ' s';
        }
        return prettyString;
    }
};



export default App;
