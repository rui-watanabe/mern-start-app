import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => {

  const deleteExercise = () => {
    axios.delete(`http://localhost:5000/exercises/${props.exercise._id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  
  return(
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={`/edit/${props.exercise._id}`}>Edit</Link> | <Link to="/" onClick={deleteExercise}>Delete</Link>
      </td>
    </tr>
  )
};

export default Exercise;