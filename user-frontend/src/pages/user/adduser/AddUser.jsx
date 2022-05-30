import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adduser.css'
const AddUser = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [profession, setProfession] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const hanldeResetForm = () => {
        setName('');
        setPassword('');
        setProfession('');
        setId('');
    }
    const handleSubmit = (e, Name, Password, Profession, Id) => {
        e.preventDefault();
        let body = {
            name: Name,
            password: Password,
            profession: Profession,
            id: Id
        }
        axios.post('http://localhost:8000/users', body).then(res => {
            navigate('/');
            return res.data
        }).catch(e => {
            setError(e.message);
            return e
        })
    }
    return (
        <div className="add-user-container">
            {
                error !== '' && <div>{error}</div>
            }
            <div className='add-user-text'>Add user</div>
            <form className='add-user-form' onSubmit={(e) => handleSubmit(e, name, password, profession, id)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" value={name} placeholder='name' onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="profession">Profession:</label>
                    <input type="text" value={profession} placeholder='profession' onChange={(e) => setProfession(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" value={id} placeholder='id' onChange={(e) => setId(e.target.value)} required />
                </div>
                <div className='button-container'>
                    <button type='submit'>Add</button>
                    <button onClick={() => hanldeResetForm()} >Reset</button>
                    <button onClick={() => navigate('/')} >Go to Home</button>
                </div>
            </form>
        </div>
    )
}

export default AddUser;