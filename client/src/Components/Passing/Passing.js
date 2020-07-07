import React from 'react';

class Passing extends React.Component {

    constructor(props) {
        super(props);

        this.updateDribbling = this.updateDribbling.bind(this);
        this.updatePassing = this.updatePassing.bind(this);
    }

    updatePassing() {

        fetch('/api/passing')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgRatio = jsonResponse.reduce((acc, cur) => acc + Number(cur.ratio), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.ratio < avgRatio);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'passing';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    updateDribbling() {

        fetch('/api/passing')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgRatio = jsonResponse.reduce((acc, cur) => acc + Number(cur.ratio), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.ratio > avgRatio);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'dribbling';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    render() {

        let passing;
        let dribbling;

        if (this.selection === 'passing') {
            passing = 'selected';
        } else if (this.selection === 'dribbling') {
            dribbling = 'selected';
        }

        return (
            <div>
                <h2>Do you enjoy great passing technique or great dribbling technique more?</h2>
                <div className='options'>
                    <div>
                        <p onClick={this.updatePassing} className={passing}>Passing</p>
                    </div>
                    <div>
                        <p onClick={this.updateDribbling} className={dribbling}>Dribbling</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Passing;