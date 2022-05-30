import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './edituser.css'
const EditUser = () => {
    const user = useLocation().state;
    const { name, password, profession, id } = user;
    const [Name, setName] = useState(name);
    // const [Id, setId] = useState(id);
    const [Password, setPassword] = useState(password);
    const [Profession, setProfession] = useState(profession);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const hanldeResetForm = () => {
        setName('');
        setPassword('');
        setProfession('');
        // setId('');
    }
    const handleSubmit = (e, name, password, profession) => {
        e.preventDefault();
        let body = {
            name: name,
            password: password,
            profession: profession
        }
        axios.put(`http://localhost:8000/users/${id}`, body).then(res => {
            if (res) {
                navigate('/');
                return res.data
            }
        }).catch(e => {
            setError(e.message);
            return e
        })
    }
    return (
        <div className="edit-user-container">
            {
                error !== '' && <div>{error}</div>
            }
            <div className='edit-user-text'>Edit user</div>
            <form className='edit-user-form' onSubmit={(e) => handleSubmit(e, Name, Password, Profession)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" value={Name} placeholder='name' onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={Password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="profession">Profession:</label>
                    <input type="text" value={Profession} placeholder='profession' onChange={(e) => setProfession(e.target.value)} required />
                </div>
                {/* <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" value={Id} placeholder='id' onChange={(e) => setId(e.target.value)} required />
                </div> */}
                <div className='button-container'>
                    <button type='submit'>Edit</button>
                    <button onClick={() => hanldeResetForm()} >Reset</button>
                    <button onClick={() => navigate('/')} >Go to Home</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser;