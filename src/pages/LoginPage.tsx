import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = localStorage.getItem('bookstoreRegister');
    if (!saved) {
      alert('Нет зарегистрированных пользователей');
      return;
    }
    const { username, password } = JSON.parse(saved);
    if (user === username && pass === password) {
      dispatch(login(user));
      navigate('/');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Пользователь: </label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль: </label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
