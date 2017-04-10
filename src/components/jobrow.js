import React from 'react';
import Utils from './../services/util';
import ProgressBar from './progressbar';

class JobRow extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.onClickCancel = this.onClickCancel.bind(this);
    }

    onClickCancel() {
        this.props.callbackParent(this.props.job.job.uuid);
    };

    render() {
        return <tr>
            <td>
                <p>{ this.props.job.job.filename }</p>
            </td>
            <td>
                <ProgressBar progress={ this.props.job.progress.percentComplete }/>
            </td>
            <td>
                <p>{ Utils.prettyPrintTimeRemaining(this.props.job.progress.eta) }</p>
            </td>
            <td>
                <i className="material-icons center" onClick={ this.onClickCancel } >stop</i>
            </td>
        </tr>;
    }
};

module.exports = JobRow;