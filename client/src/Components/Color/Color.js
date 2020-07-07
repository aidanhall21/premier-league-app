const React = require('react');

class Color extends React.Component {

    constructor(props) {
        super(props);

        this.updateRed = this.updateRed.bind(this);
        this.updateBlue = this.updateBlue.bind(this);
        this.updateOther = this.updateOther.bind(this);
    }

    updateRed() {
        fetch('http://localhost:3001/api/colour')
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
        fetch('http://localhost:3001/api/colour')
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
        fetch('http://localhost:3001/api/colour')
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