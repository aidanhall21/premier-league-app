import React from 'react';
import Age from '../Age/Age';
import Color from '../Color/Color';
import Tackles from '../Tackles/Tackles';
import Quality from '../Quality/Quality';
import Ratio from '../PointsRatio/PointsRatio';
import Passing from '../Passing/Passing';
import Balance from '../Balance/Balance';
import Results from '../Results/Results';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      results: false,
      favTeam: null,
      favTeamObj: {}
    };

    this.updateData = this.updateData.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  updateData(updateObj) {

    const mergedState = [...this.state.data, ...updateObj];
    this.setState({ data: mergedState });

  }

  updateResults(team, obj) {

    this.setState({ results: true });
    this.setState({ favTeam: team });
    this.setState({ favTeamObj: obj })

  }
  
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Which Premier League Team Should You Root For?</h1>
        </div>
        <div className="main">
          <Age onUpdate={this.updateData} isActive={false}/>
          <Color onUpdate={this.updateData} />
          <Tackles onUpdate={this.updateData} />
          <Quality onUpdate={this.updateData} />
          <Ratio onUpdate={this.updateData} />
          <Passing onUpdate={this.updateData} />
          <Balance onUpdate={this.updateData} />
        </div>
        <div className="results">
          <Results results={this.state.results} 
                  onUpdate={this.updateResults} 
                  data={this.state.data} 
                  favTeam={this.state.favTeam}
                  favTeamData={this.state.favTeamObj} />
        </div>
        <div className="footer">
          <p>© Aidan Bradley Hall, 2020</p>
        </div>
      </div>
    )
  }
};

export default App;
