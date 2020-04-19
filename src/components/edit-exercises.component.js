import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const EditExercise = props => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [newdate, setNewdate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${props.match.params.id}`)
      .then(res => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setNewdate(new Date(res.data.date));
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/users')
      .then(response => {
        if(response.data.length > 0){
          setUsers(response.data.map(user => user.username));
        }
      }) 
    },
  [])
 
  const onChangeUsername = e => {
    setUsername(e.target.value);
  }

  const onChangeDescription = e => {
    setDescription(e.target.value);
  }

  const onChangeDuration = e => {
    setDuration(e.target.value);
  }

  const onChangeDate = date => {
    setNewdate(date);
  }

  const onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date: newdate
    }

    axios.post(`http://localhost:5000/exercises/update/${props.match.params.id}`, exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    window.location = "/";
  }

  return(
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select 
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
          {users.map(user => {
            return(
              <option
                key={user}
                value={user}
              >
              {user}
              </option>
            )
          })}           
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input 
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>   
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={newdate}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
};

export default EditExercise;