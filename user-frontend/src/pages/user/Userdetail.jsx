import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './userdetail.css'
const Userdetail = () => {
    const [loading, setLoading] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        setError(false)
        axios.get('http://localhost:8000/users').then(res => {
            setError(false)
            setLoading(false);
            setUserdata(res.data);
        }).catch(err => {
            setError(true);
            setErrorMsg(err.message);
        })
    }, [])
    const handleRemove = (item) => {
        const { id } = item;
        axios.delete(`http://localhost:8000/users/${id}`, item).then(res => {
            setUserdata(res.data);
            setLoading(false);
            setError(false);
            setErrorMsg('')
        }).catch(e => {
            setError(true);
            setLoading(false);
            setErrorMsg(e.message)
        })
    }
    return (
        <div className="use-container">
            <div className="user-detail">
                User detail
            </div>
            {
                loading ? (<div>Loading...</div>) : error ? (<div> {errorMsg} </div>) : userdata.length === 0 ? (<div>No record found</div>) : (
                    userdata.map((item, index) => {
                        return (
                            <div key={index} className='user-card'>
                                <p>Name: {item.name} </p>
                                <p>Profession: {item.profession}</p>
                                <button onClick={() => navigate('/edituser', { state: item })}>Edit</button>
                                <button onClick={() => handleRemove(item)}>Delete</button>
                            </div>
                        )
                    })
                )
            }
            <div className="add-button">
                <button onClick={() => navigate('/adduser')} >Add user</button>
            </div>
        </div>
    )
}
export default Userdetail;