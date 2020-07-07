import React from 'react';

class Quality extends React.Component {

    constructor(props) {
        super(props);

        this.updateFavorite = this.updateFavorite.bind(this);
        this.updateUnderdog = this.updateUnderdog.bind(this);
    }

    updateFavorite() {
        fetch('/api/quality')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            //find avg of xGdiff90 and separate the bottom tier from the top
            const avgGoalDiff = jsonResponse.reduce((acc, cur) => acc + Number(cur.xGdiff90), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.xGdiff90 > avgGoalDiff);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'favorite';
            this.props.onUpdate(arrayOfObjectsToUpdate)
        })
    }

    updateUnderdog() {
        fetch('/api/quality')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            //find avg of xGdiff90 and separate the bottom tier from the top
            const avgGoalDiff = jsonResponse.reduce((acc, cur) => acc + Number(cur.xGdiff90), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.xGdiff90 < avgGoalDiff);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'underdog';
            this.props.onUpdate(arrayOfObjectsToUpdate)
        })
    }



    render() {

        let favorite;
        let underdog;

        if (this.selection === 'favorite') {
            favorite = 'selected';
        } else if (this.selection === 'underdog') {
            underdog = 'selected';
        }

        return (
            <div>
                <h2>Would you rather root for a team that's already great or a team with the potential to overachieve, but also to face relegation?</h2>
                <div className='options'>
                    <div>
                        <p onClick={this.updateFavorite} className={favorite}>Favorite</p>
                    </div>
                    <div>
                        <p onClick={this.updateUnderdog} className={underdog}>Underdog</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quality;