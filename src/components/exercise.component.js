import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const Exercise = () => {
  const exercises = useContext(AppContext);

  const [deleteAfterExercises, setDeleteAfterExercises] = useState(exercises);

  const deleteExercise = exercise_id => {
    axios.delete(`http://localhost:5000/exercises/${exercise_id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setDeleteAfterExercises(exercises.filter(exercise => exercise._id !== exercise_id));
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
            <Link to={`/edit/${exercise._id}`}>Edit</Link> | <a href="/" onClick={() => deleteExercise(exercise._id)}>Delete</a>
          </td>
        </tr>
      )
    })
  )
};

export default Exercise;