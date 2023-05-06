import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { RxCrossCircled } from 'react-icons/rx';

const ListItem = ({
  user,
  setting,
  handleExpand,
  handleSave,
  index,
  editOpen,
  handleEditOpen,
  toggleModal,
}) => {
  const [expand, expandId] = setting;

  const [editDescription, setEditDescription] = useState(user.description);
  const [editCountry, setEditCountry] = useState(user.country);
  const [editGender, setEditGender] = useState(user.gender);
  const [editDate, setEditDate] = useState(user.dob);

  function isChanged() {
    return (
      editDescription == user.description &&
      editGender == user.gender &&
      editDate == user.dob &&
      editCountry == user.country
    );
  }

  function calculateAge(date) {
    // Set the birth date
    let birthDate = new Date(date);

    // Get the current date
    let currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust for months and days
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();

    if (currentMonth < birthMonth) {
      age--;
    } else if (currentMonth === birthMonth) {
      const currentDay = currentDate.getDate();
      const birthDay = birthDate.getDate();

      if (currentDay < birthDay) {
        age--;
      }
    }
    return age;
  }

  function handleSubmit(e) {
    handleSave(e, {
      index,
      editDate,
      editGender,
      editCountry,
      editDescription,
    });

    setTimeout(() => {
      handleEditOpen(false);
    }, 2000);
  }

  return (
    <div className='listItemContainer'>
      <div className='listitem'>
        <img src={user.picture} alt='' width='50px' height='50px' />
        <div>
          <p>{user.first + ' ' + user.last}</p>
          {expand && expandId == user.id ? (
            <HiChevronUp
              size={28}
              onClick={() => {
                handleEditOpen(false);
                handleExpand(user.id);
              }}
            />
          ) : (
            <button
              disabled={editOpen}
              style={{ cursor: editOpen ? 'not-allowed' : '' }}
            >
              <HiChevronDown
                size={28}
                onClick={() => {
                  if (editOpen) {
                    return;
                  }
                  handleExpand(user.id);
                }}
              />
            </button>
          )}
        </div>
      </div>
      <form
        className={`details ${expand && expandId == user.id ? 'expand' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className='detailsTop'>
          <div>
            <span>Age</span>
            {editOpen ? (
              <input
                type='date'
                defaultValue={editDate}
                onChange={(e) => {
                  setEditDate(e.target.value);
                }}
                required
              />
            ) : (
              <p>{calculateAge(user.dob)} Years</p>
            )}
          </div>
          <div>
            <span>Gender</span>
            {editOpen ? (
              <select
                name='gender'
                id='gender'
                defaultValue={user.gender}
                onChange={(e) => {
                  setEditGender(e.target.value);
                }}
                required
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='transgender'>Transgender</option>
                <option value='rather not say'>Rather not say</option>
                <option value='other'>Other</option>
              </select>
            ) : (
              <p>
                {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </p>
            )}
          </div>
          <div>
            <span>Country</span>
            {editOpen ? (
              <input
                defaultValue={user.country}
                onChange={(e) => {
                  setEditCountry(e.target.value);
                }}
                name='country'
                type='text'
                pattern='^[a-zA-Z]+$'
                required
              />
            ) : (
              <p>{user.country}</p>
            )}
          </div>
        </div>
        <div className='description'>
          <span>Description</span>
          {editOpen ? (
            <textarea
              name='description'
              id='description'
              cols='10'
              rows='5'
              defaultValue={user.description}
              onChange={(e) => {
                setEditDescription(e.target.value);
              }}
              pattern='^[a-zA-Z]+$'
              required
            ></textarea>
          ) : (
            <p>{user.description}</p>
          )}
        </div>
        <div className='actions'>
          {editOpen ? (
            <>
              <button>
                <RxCrossCircled
                  color='red'
                  size={18}
                  onClick={() => {
                    handleEditOpen(false);
                  }}
                />
              </button>
              <button
                type='sumbit'
                disabled={isChanged()}
                style={{ cursor: isChanged() ? 'not-allowed' : '' }}
              >
                <RiCheckboxCircleLine color='green' size={18} />
              </button>
            </>
          ) : (
            <>
              <MdDeleteForever color='red' size={18} onClick={toggleModal} />
              {calculateAge(user.dob) > 18 && (
                <MdEdit
                  color='blue'
                  size={18}
                  onClick={() => {
                    handleEditOpen(true);
                  }}
                />
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ListItem;
