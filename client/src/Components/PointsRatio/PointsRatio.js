//This component will hold one question and potential answers and is meant
//to determine which color jersey you'd prefer rooting for

//import React
import React from 'react';

class Players extends React.Component {

    constructor(props) {
        super(props);

        this.updateStars = this.updateStars.bind(this);
        this.updateScrubs = this.updateScrubs.bind(this);
    }

    updateStars() {

        //passes an array to the prop function updateScore
        //first need to make an api call
        fetch('/api/ratio')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgTopThreeRatio = jsonResponse.reduce((acc, cur) => acc + Number(cur.top_3_ratio), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.top_3_ratio > avgTopThreeRatio);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'stars';
            this.props.onUpdate(arrayOfObjectsToUpdate)
        })
    }

    updateScrubs() {
        fetch('/api/ratio')
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            const avgTopThreeRatio = jsonResponse.reduce((acc, cur) => acc + Number(cur.top_3_ratio), 0) / jsonResponse.length;
            return jsonResponse.filter(team => team.top_3_ratio < avgTopThreeRatio);
        })
        .then(arrayOfObjectsToUpdate => {
            this.selection = 'scrubs';
            this.props.onUpdate(arrayOfObjectsToUpdate)
        })
    }



    render() {

        //adds the CSS class selected to element that was clicked
        let stars;
        let scrubs;

        if (this.selection === 'stars') {
            stars = 'selected';
        } else if (this.selection === 'scrubs') {
            scrubs = 'selected';
        }

        return (
            <div>
                <h2>Would you rather root for a team with a couple superstars or a team where everyone shares the glory?</h2>
                <div className='options'>
                    <div>
                        <p onClick={this.updateStars} className={stars}>I like rooting for the best players</p>
                    </div>
                    <div>
                        <p onClick={this.updateScrubs} className={scrubs}>I prefer balance and less famous faces</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Players;