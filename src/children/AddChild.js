import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddChild() {

  const [allergies, setAllergies] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAddAllergy = (e) => {
    e.preventDefault();
    setAllergies([...allergies, {}]);
  };

  const handleRemoveAllergy = (e, index) => {
    e.preventDefault();
    const updatedAllergies = [...allergies];
    updatedAllergies.splice(index, 1);
    setAllergies(updatedAllergies);
  };

  const handleAllergyChange = (index, value) => {
    const updatedAllergies = [...allergies];
    updatedAllergies[index].title = value;
    setAllergies(updatedAllergies);
  };

  const handleAddVaccination = (e) => {
    e.preventDefault();
    setVaccinations([...vaccinations, {}]);
  };

  const handleRemoveVaccination = (e, index) => {
    e.preventDefault();
    const updatedVaccinations = [...vaccinations];
    updatedVaccinations.splice(index, 1);
    setVaccinations(updatedVaccinations);
  };

  const handleVaccinationChangeTitle = (index, value) => {
    const updatedVaccinations = [...vaccinations];
    updatedVaccinations[index].title = value;
    setVaccinations(updatedVaccinations);
  };

  const handleVaccinationChangeDate = (index, value) => {
    const updatedVaccinations = [...vaccinations];
    updatedVaccinations[index].date = value;
    setVaccinations(updatedVaccinations);
  };

  const onSubmit = async (data) => {
    const group = { id };
    data.group = group;

    const filteredDataAllergy = allergies.filter((elem) => elem.title.trim() != "");
    const allergiesData = filteredDataAllergy.map((elem) => ({ title: elem.title }));
    data.allergies = allergiesData;

    const vaccinationsData = vaccinations.filter((vaccination) => (vaccination.title) && (vaccination.title.trim() !== "") && (vaccination.date) && (vaccination.date.trim() !== ""));
    data.vaccinations = vaccinationsData;

    await axios.post(`${process.env.REACT_APP_APIURL}/children`, data);
    navigate(`/group/${id}`);
  };

  useEffect(() => {

  }, [id]);

  return (
    <div className='container my-5 pt-3 rounded shadow border col-5'>
      <Link className='btn' to={`/group/${id}`}>
        <svg style={{ width: "30px" }} fill="#000000" viewBox="0 0 1024 1024"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"></path></g></svg>
      </Link>
      <h2 className='mb-5 text-center'>Добавить ребенка в группу</h2>
      <form className='px-3 pb-5 text-center' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 form-floating">
          <input
            type="text"
            className={`form-control ${errors.surname ? "is-invalid" : ""}`}
            id="surnameInput"
            placeholder="Фамилия"
            {...register('surname', {
              required: { value: true, message: "Поле обязательно для заполнения" },
              minLength: { value: 2, message: "Поле содержать минимум 2 символа" },
              maxLength: { value: 32, message: "Поле должно содержать максимум 32 символа" }
            })}
          />
          <label htmlFor="surnameInput">Фамилия</label>
          {errors.surname && <span className="invalid-feedback">{errors.surname.message}</span>}
        </div>
        <div className="mb-3 form-floating">
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="nameInput"
            placeholder="Имя"
            {...register('name', {
              required: { value: true, message: "Поле обязательно для заполнения" },
              minLength: { value: 2, message: "Поле должно содержать минимум 2 символа" },
              maxLength: { value: 32, message: "Поле должно содержать максимум 32 символа" }
            })}
          />
          <label htmlFor="nameInput">Имя</label>
          {errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
        </div>
        <div className="mb-3 form-floating">
          <input
            type="text"
            className={`form-control ${errors.patronymic ? "is-invalid" : ""}`}
            id="patronymicInput"
            placeholder="Отчество"
            {...register('patronymic', {
              required: { value: true, message: "Поле обязательно для заполнения" },
              minLength: { value: 2, message: "Поле должно содержать минимум 2 символа" },
              maxLength: { value: 32, message: "Поле должно содержать максимум 32 символа" }
            })}
          />
          <label htmlFor="patronymicInput">Отчество</label>
          {errors.patronymic && <span className="invalid-feedback">{errors.patronymic.message}</span>}
        </div>
        <div className="mb-3 form-floating">
          <input
            type="date"
            className={`form-control ${errors.dateOfBirthday ? "is-invalid" : ""}`}
            id="dateOfBirthdayInput"
            placeholder="Дата рождения"
            {...register('dateOfBirthday', {
              required: { value: true, message: "Выберите дату рождения" }
            })}
          />
          <label htmlFor="dateOfBirthdayInput">Дата рождения</label>
          {errors.dateOfBirthday && <span className="invalid-feedback">{errors.dateOfBirthday.message}</span>}
        </div>
        <div className="mb-3 form-floating">
          <input
            type="text"
            className={`form-control ${errors.mainPhone ? "is-invalid" : ""}`}
            id="mainPhoneInput"
            placeholder="Основной номер телефона"
            {...register('mainPhone', {
              pattern: { value: /^((8|\+7)[ -]?)?(\(?\d{3}\)?[ -]?)?[\d -]{7,10}$/, message: "Номер телефона должен быть в формате +7(999)999-99-99" }
            })}
          />
          <label htmlFor="mainPhoneInput">Основной номер телефона</label>
          {errors.mainPhone && <span className="invalid-feedback">{errors.mainPhone.message}</span>}
        </div>
        <div className="mb-4 form-floating">
          <input
            type="text"
            className={`form-control ${errors.additionalPhone ? "is-invalid" : ""}`}
            id="additionalPhoneInput"
            placeholder="Дополнительный номер телефона"
            {...register('additionalPhone', {
              pattern: { value: /^((8|\+7)[ -]?)?(\(?\d{3}\)?[ -]?)?[\d -]{7,10}$/, message: "Номер телефона должен быть в формате +7(999)999-99-99" }
            })}
          />
          <label htmlFor="additionalPhoneInput">Дополнительный номер телефона</label>
          {errors.additionalPhone && <span className="invalid-feedback">{errors.additionalPhone.message}</span>}
        </div>
        <div className='mb-4'>
          <label className="form-label mx-3">Аллергии:</label>
          {allergies.map((allergy, index) => (
            <div className='d-flex mb-3' key={index}>
              <input
                type="text"
                className="form-control me-3 flex-fill"
                value={allergy.title}
                placeholder='Название аллергии'
                onChange={(e) => handleAllergyChange(index, e.target.value)}
              />
              <button className='btn btn-outline-danger' onClick={(e) => handleRemoveAllergy(e, index)}>Удалить</button>
            </div>
          ))}
          <button className='btn btn-outline-dark' onClick={handleAddAllergy}>Добавить аллергию</button>
        </div>
        <div className='mb-5'>
          <label className="form-label mx-3">Прививки:</label>
          {vaccinations.map((vaccination, index) => (
            <div className='d-flex mb-3' key={index}>
              <input
                type="text"
                className="form-control me-2"
                value={vaccination.title}
                placeholder='Название привики'
                onChange={(e) => handleVaccinationChangeTitle(index, e.target.value)}
              />
              <input
                type="date"
                className="form-control me-3"
                value={vaccination.date}
                placeholder='Дата привики'
                onChange={(e) => handleVaccinationChangeDate(index, e.target.value)}
              />
              <button className='btn btn-outline-danger' onClick={(e) => handleRemoveVaccination(e, index)}>Удалить</button>
            </div>
          ))}
          <button className='btn btn-outline-dark' onClick={handleAddVaccination}>Добавить прививку</button>
        </div>
        <button className='btn btn-outline-dark' type='submit'>Сохранить</button>
      </form>
    </div>
  );
};
