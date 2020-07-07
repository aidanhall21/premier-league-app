import React from 'react';

class ShowButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleResultsClick = this.handleResultsClick.bind(this);
    }

    handleResultsClick() {

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

        const favTeamArray = this.props.data.filter(team => team.name === favTeam);
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