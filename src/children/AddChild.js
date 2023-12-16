import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddGroup() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (data) => {
    axios.post(`${process.env.REACT_APP_APIURL}/children`, data);
    navigate(`/group/${id}`);
  };

  return (
    <div className='container p-5 my-5 rounded shadow border col-4 text-center'>
      <h2 className='mb-5'>Добавить ребенка</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 form-floating">
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="titleInput"
            placeholder="Название группы"
            {...register('title', { 
              required: { value: true, message: "Поле обязательно для заполнения" },
              minLength: { value: 2, message: "Название группы должно содержать минимум 2 символа" },
              maxLength: { value: 32, message: "Название группы должно содержать максимум 32 символа" }
            })}
          />
          <label htmlFor="titleInput">Название группы</label>
          {errors.title && <span className="invalid-feedback">{errors.title.message}</span>}
        </div>
        <Link className='btn btn-outline-dark me-2' to={`/group/${id}`}>Отменить</Link>
        <button className='btn btn-outline-dark' type='submit'>Сохранить</button>
      </form>
    </div>
  );
};
