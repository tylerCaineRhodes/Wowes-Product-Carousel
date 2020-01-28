import React from 'react';
import axios from 'axios';
import Item from './components/Item.jsx';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data : [],
      isActive : false
    }
    this.handleToggleClass = this.handleToggleClass.bind(this);
  }

  handleToggleClass(){
    if(this.state.isActive === false){
      this.setState({isActive : true})
    }
    if(this.state.isActive === true){
      this.setState({isActive : false})
    }
  }

  componentDidMount(){
    this.fetchAllData()
  }

  fetchAllData(){
    axios.get('http://localhost:3005/wowStuff').then((response) => {
      console.log('this is the response from getting all the stuff --> ', response.data)
      this.setState({
        data : response.data,
      })
    })
    .catch((err) => {
      console.log('something went wrong with fetching all data from database', err)
    })
  }

  render(){
    return (
      <div className='container'>

        <button className="leftButton" onClick={this.handleToggleClass}></button>

        <button className="rightButton" onClick={() => {console.log('clicked right!')}}></button>

        <div className="niceRow">

          {this.state.data.map((item) => 
          <div key={item.id}><Item name={item.name} image={item.image} category={item.category} rating={item.rating} /></div>
          )}

        </div>
      </div>
    )
  }
}