import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../contexts/AppContext'
import Exercise from './exercise.component';

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(res => {
        if(res.data.length > 0){
          setExercises(res.data);
        }
      })
      .catch(err => console.log(err)); 
  },[]);

  useEffect(() => {
    setExercises(exercises);
    console.log("reload")
  },[exercises]);

  return(
    <AppContext.Provider value={exercises}>
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <Exercise />
          </tbody>
        </table>
      </div>
    </AppContext.Provider>
  )
};

export default ExercisesList;