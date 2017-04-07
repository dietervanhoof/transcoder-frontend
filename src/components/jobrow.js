import React, { Component } from 'react';
import Utils from './../services/util';
import ProgressBar from './progressbar';

class JobRow extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return <tr>
            <td>
                <p>{ this.props.job.job.filename }</p>
            </td>
            <td>
                <ProgressBar progress={ this.props.job.progress.percentComplete }/>
            </td>
            <td>
                <p className="center">{ Utils.prettyPrintTimeRemaining(this.props.job.progress.eta) }</p>
            </td>
        </tr>;
    }
};

module.exports = JobRow;