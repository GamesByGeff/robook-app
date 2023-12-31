import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import './App.css'
import Scroll from '../components/Scroll';


import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

//STATE-the description of your app
function App() {
    const [robots, setRobots] = useState([])
    const [searchField, onSearchChange] = useState('')
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)});
            console.log(count);
    },[count]) // only run if count changes
           
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className="tc">
                <h1 className="f1">Robook</h1>
                <button onClick={()=>setCount(count + 1)}>Click Me</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                        <CardList robots={filteredRobots} />                        
                </Scroll>
            </div>
        );
    }    
    
    export default connect(mapStateToProps, mapDispatchToProps)(App);