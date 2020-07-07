import React from 'react';

class Balance extends React.Component {

    constructor(props) {
        super(props);

        this.updateOffense = this.updateOffense.bind(this);
        this.updateDefense = this.updateDefense.bind(this);
    }

    updateOffense() {

        fetch('http://localhost:3001/api/balance')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgDspi = jsonResponse.reduce((acc, cur) => acc + Number(cur.dspi), 0) / jsonResponse.length;
            const avgxG = jsonResponse.reduce((acc, cur) => acc + Number(cur.xG), 0) / jsonResponse.length
            return jsonResponse.filter(team => (1 - (team.dspi / avgDspi)) < ((team.xG / avgxG) - 1));
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'offense';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    updateDefense() {

        fetch('http://localhost:3001/api/balance')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgDspi = jsonResponse.reduce((acc, cur) => acc + Number(cur.dspi), 0) / jsonResponse.length;
            const avgxG = jsonResponse.reduce((acc, cur) => acc + Number(cur.xG), 0) / jsonResponse.length
            return jsonResponse.filter(team => (1 - (team.dspi / avgDspi)) > ((team.xG / avgxG) - 1));
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'defense';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    render() {

        let offense;
        let defense;

        if (this.selection === 'offense') {
            offense = 'selected';
        } else if (this.selection === 'defense') {
            defense = 'selected';
        }

        return (
            <div>
                <h2>Do you enjoy great defense or great offense more?</h2>
                <div className='options'>
                    <div>
                        <p onClick={this.updateOffense} className={offense}>Offense</p>
                    </div>
                    <div>
                        <p onClick={this.updateDefense} className={defense}>Defense</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Balance;