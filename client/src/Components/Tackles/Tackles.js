//This component will hold one question and potential answers and is meant
//to determine which color jersey you'd prefer rooting for

//import React
import React from 'react';

class Tackles extends React.Component {

    constructor(props) {
        super(props);

        this.updateAggressive = this.updateAggressive.bind(this);
        this.updateClean = this.updateClean.bind(this);
    }

    updateAggressive() {

        //passes an array to the prop function updateScore
        //first need to make an api call
        fetch('/api/tackles')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgTackles = jsonResponse.reduce((acc, cur) => acc + Number(cur.tackles), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.tackles > avgTackles);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'aggressive';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    updateClean() {

        fetch('/api/tackles')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgTackles = jsonResponse.reduce((acc, cur) => acc + Number(cur.tackles), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.tackles < avgTackles);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'clean';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    render() {

        //adds the CSS class selected to element that was clicked
        let aggressive;
        let clean;

        if (this.selection === 'aggressive') {
            aggressive = 'selected';
        } else if (this.selection === 'clean') {
            clean = 'selected';
        }

        return (
            <div>
                <h2>Do you prefer watching an aggressive style of play?</h2>
                <div className='options'>
                    <div>
                        <p onClick={this.updateAggressive} className={aggressive}>I don't mind it a bit rough</p>
                    </div>
                    <div>
                        <p onClick={this.updateClean} className={clean}>Let's keep it clean</p>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Tackles;