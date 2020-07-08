//This component will hold one question and potential answers and is meant
//to determine whether you prefer your team to have younger or older players

//import React
import React from 'react';

//create a child class
class Age extends React.Component {
    constructor(props) {
        super(props);

        this.updateOld = this.updateOld.bind(this);
        this.updateYoung = this.updateYoung.bind(this);
    }

    updateOld() {
        //passes an array to the prop function updateScore
        //this array contains a list of team names with an older average age
        //first need to make an api call to get those teams
        fetch('/api/age')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            //find average of avg_age
            const totalAge = jsonResponse.reduce((acc, cur) => acc + Number(cur.avg_age), 0);
            const avgTotalAge = ( totalAge / jsonResponse.length );
            //returns array of objects where avg_age is greater than the average age for all teams
            return jsonResponse.filter(team => team.avg_age > avgTotalAge);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'vets';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })  
    }

    updateYoung() {
        //passes an array to the prop function updateScore
        //this array contains a list of team names with a younger average age
        //first need to make an api call to get those teams
        fetch('/api/age')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            //find average of avg_age
            const totalAge = jsonResponse.reduce((acc, cur) => acc + Number(cur.avg_age), 0);
            const avgTotalAge = ( totalAge / jsonResponse.length );
            //returns array of objects where avg_age is less than the average age for all teams
            return jsonResponse.filter(team => team.avg_age < avgTotalAge);
            //add a key to the objects in the array indicating the question number
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'rookies';
            this.props.onUpdate(arrayOfObjectsToUpdate);
        })
    }

    render() {

        //when an answer is selected the CSS class for that element will update
        let vets;
        let rookies;

        if (this.selection === 'vets') {
            vets = 'selected';
        } else if (this.selection === 'rookies') {
            rookies = 'selected';
        }

        return (
            <div>
                <h2>Would you rather root for a team filled with established stars or exciting prospects?</h2>
                <div className='options'>
                    <div>
                        <p onClick={this.updateOld} className={vets}>Vets</p>
                    </div>
                    <div>
                        <p onClick={this.updateYoung} className={rookies} >Rookies</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Age;