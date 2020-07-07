import React from 'react';
import ShowButton from '../ShowButton/ShowButton';
import ShowResults from '../ShowResults/ShowResults';

class Results extends React.Component {

    render() {
        const isFinished = this.props.results;
        let button;
        if (!isFinished) {
            button = <ShowButton onUpdate={this.props.onUpdate} data={this.props.data}/>;
        } else {
            button = <ShowResults favTeam={this.props.favTeam} favTeamData={this.props.favTeamData}/>;
        }

        return (
            <div>
                {button}
            </div>
        )
    }
}

export default Results;