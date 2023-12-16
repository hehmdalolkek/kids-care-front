import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  const [groups, setGroups] = useState([]);
  const [errorDelete, setErrorDelete] = useState(false);

  const loadGroups = async () => {
    const result = await axios.get(`${process.env.REACT_APP_APIURL}/groups`);
    const sortedGroups = result.data.sort((a, b) => a.number - b.number);
    setGroups(sortedGroups);
  };

  const handleDeleteGroup = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_APIURL}/groups/${id}`)
      .catch((err) => {
        setErrorDelete(true);
        setTimeout(() => setErrorDelete(false), 3000);
      });
  };

  useEffect(() => {
    loadGroups();
  }, [groups]);

  return (

    <div className='container py-5'>
      <div className={`error-container ${errorDelete ? 'show' : ''}`}>
        <div className="bg-light py-4 px-5 shadow border rounded error-message" role="alert">
          Ошибка удаления. Группа не пустая.
        </div>
      </div>
      <h2 className='text-center mb-5 col-8 mx-auto border rounded shadow py-5'>Группы детского сада:</h2>
      <div>
        {
          groups.map((group) => (
            <div key={group.id} className='col-6 mx-auto d-flex border rounded shadow mb-3'>
              <Link
                className='d-block flex-fill ps-3 py-4 fs-5 text-center text-dark link-underline link-underline-opacity-0'
                to={`/group/${group.id}`}
              >
                {group.number} – {group.title}
              </Link>
              <div className='d-flex align-items-center pe-3'>
                <Link className='btn' to={`/editgroup/${group.id}`}>
                  <svg style={{ width: "30px" }} viewBox="0 0 24 24" fill="none"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                </Link>
                <button className='btn' onClick={() => handleDeleteGroup(group.id)}>
                  <svg style={{ width: "30px" }} viewBox="0 0 24 24" fill="none"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
