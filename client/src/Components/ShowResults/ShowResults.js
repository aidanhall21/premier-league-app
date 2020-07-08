//This component displays the results of the selections
//the favTeam prop is passed down from the App state
import React from 'react';
import './ShowResults.css';

class ShowResults extends React.Component {

    render() {
        return (
            <div className="resultsSummary">
                <h4>You got {this.props.favTeam}!</h4>
            </div>
        )
    }
}

export default ShowResults;