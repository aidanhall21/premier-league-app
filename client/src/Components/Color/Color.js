//This component will hold one question and potential answers and is meant
//to determine which color jersey you'd prefer rooting for

//import React
const React = require('react');

class Color extends React.Component {

    constructor(props) {
        super(props);

        this.updateRed = this.updateRed.bind(this);
        this.updateBlue = this.updateBlue.bind(this);
        this.updateOther = this.updateOther.bind(this);
    }

    updateRed() {

        //passes an array to the prop function updateScore
        //first need to make an api call
        fetch('/api/colour')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed');
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            return jsonResponse.filter(team => team.color === 'red');
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'red';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    updateBlue() {
        fetch('/api/colour')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed');
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            return jsonResponse.filter(team => team.color === 'blue');
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'blue';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })     
    }

    updateOther() {
        fetch('/api/colour')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed');
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            return jsonResponse.filter(team => team.color !== 'red' && team.color !== 'blue');
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'other';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    render() {

        //adds the CSS class selected to element that was clicked
        let red;
        let blue;
        let other;

        if (this.selection === 'red') {
            red = 'selected';
        } else if (this.selection === 'blue') {
            blue = 'selected';
        } else if (this.selection === 'other') {
            other = 'selected';
        }

        return (
            <div>
                <h2>What's your favorite color?</h2>
                <div className='options'>
                    <div>
                        <p onClick={this.updateRed} className={red}>Red</p>
                    </div>
                    <div>
                        <p onClick={this.updateBlue} className={blue}>Blue</p>
                    </div>
                    <div>
                        <p onClick={this.updateOther} className={other}>Other</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Color;