import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const Exercise = () => {
  const exercises = useContext(AppContext);

  const deleteExercise = exercise_id => {
    axios.delete(`http://localhost:5000/exercises/${exercise_id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  
  return(
    exercises.map(exercise => {
      return(
        <tr key={exercise._id}>
          <td>{exercise.username}</td>
          <td>{exercise.description}</td>
          <td>{exercise.duration}</td>
          <td>{exercise.date.substring(0,10)}</td>
          <td>
            <Link to={`/edit/${exercise._id}`}>Edit</Link> | <Link to="/" onClick={() => deleteExercise(exercise._id)}>Delete</Link>
          </td>
        </tr>
      )
    })
  )
};

export default Exercise;