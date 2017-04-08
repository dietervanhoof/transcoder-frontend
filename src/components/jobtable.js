import React, { Component } from 'react';
import JobRow from './jobrow';

class JobTable extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return <table className="striped">
            <thead>
            <tr>
                <th width="40%">File</th>
                <th width="30%">Progress</th>
                <th width="15%">ETA</th>
                <th width="15%">Cancel</th>
            </tr>
            </thead>
            <tbody id="tablebody">
            { Object.keys(this.props.jobs).map(key => {
                return <JobRow key={ this.props.jobs[key].job.uuid } job={ this.props.jobs[key] }  callbackParent={ this.props.callbackParent }/>
            }) }
            </tbody>
        </table>;
    }
};

module.exports = JobTable;