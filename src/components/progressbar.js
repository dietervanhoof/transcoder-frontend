import React, { Component } from 'react';
const ReactProgressBar = require('react-progressbar.js');
const Line = ReactProgressBar.Line;

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return <div id="container" className="col s10 valign">
            <Line
                progress={(this.props.progress / 100)}
                text={this.props.progress + '%'}
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
        </div>;
    }
};

module.exports = ProgressBar;