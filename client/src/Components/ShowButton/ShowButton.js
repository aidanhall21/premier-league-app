//When the rendered <p> element is clicked 
//the function runs to determine the team that shows up most often
//in the App state data array
import React from 'react';

class ShowButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleResultsClick = this.handleResultsClick.bind(this);
    }

    handleResultsClick() {

        //finds the team that shows up most often in the App state data array
        //this is determined to be your new favorite team
        let mf = 0;
        let m = 0;
        let favTeam;
        for (let i = 0; i < this.props.data.length; i++) {
            for (let j = 1; j < this.props.data.length; j++) {
                if (this.props.data[i].name === this.props.data[j].name) {
                    m++;
                    if (mf < m) {
                        mf = m;
                        favTeam = this.props.data[i].name;
                    }
                };
            }
            m = 0;
        };

        //filters the data to only the objects that contain your favTeam name
        const favTeamArray = this.props.data.filter(team => team.name === favTeam);

        //reduces those objects down to one object to consolidate all data for that team
        const favTeamObject = favTeamArray.reduce((acc, cur) => Object.assign(acc, cur), {});

        this.props.onUpdate(favTeam, favTeamObject);

    }

    render() {
        return (
            <div className="button">
                <p onClick={this.handleResultsClick} >View Results</p>
            </div>
        )
    }
}

export default ShowButton;