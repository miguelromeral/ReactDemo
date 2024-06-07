
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

const LoggedScreen = () => {

  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    AuthService.getProfile().then(user => {
      if (user) {
        setName(user);
      }
    });
  }, []);

  const logout = async () => {
    setProcessing(true);

    try {
      let data = await AuthService.logout();
      if (data.status) {
        setProcessing(false); navigate(`/login`);
        console.log(data.message);
      } else {
        setProcessing(false);
      }
    }
    catch (e) {
      setProcessing(false);
      console.error("Something went wrong.");
    }
  }

  return (
    <div className="container page-container">
      <div item md={4} sm={6} xs={11} className="page-block">
        <p className="page-heading">
          Welcome
          <br />
          <span>{name}</span>
        </p>
        <br />
        <button className='bg-red-500 text-white' variant="contained" color='error' disabled={processing} onClick={logout}>Salir
        </button>
      </div>
    </div>)
}

export default LoggedScreen;