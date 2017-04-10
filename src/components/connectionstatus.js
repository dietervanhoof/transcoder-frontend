import React from 'react';

class ConnectionStatus extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return <div>
            <p className="right-align" style={{ color: this.props.isConnected ? 'Green' : 'Red'}}>
                <u>{ this.props.isConnected ? 'Connected' : 'Not connected!' }</u>
            </p>
        </div>;
    }
};

module.exports = ConnectionStatus;