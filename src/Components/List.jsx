import React, { useState } from 'react';
import celebrities from '../celebrities.json';
import ListItem from './ListItem';

const List = () => {
  const [celebrityList, setCelebrityList] = useState([...celebrities]);
  const [expand, setExpand] = useState(false);
  const [expandId, setExpandId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  function handleExpand(id) {
    console.log('expand id', expandId);
    console.log('received id', id);

    if (expand) {
      expand && id == expandId
        ? (setExpandId(null), setExpand(false))
        : setExpandId(id);
    } else {
      setExpand(true);
      setExpandId(id);
    }

    // expand == true && id == expandId ? setExpandId(null) : setExpandId(id);
  }

  function handleSave(
    e,
    { index, editDate, editGender, editCountry, editDescription }
  ) {
    e.preventDefault();
    const newArray = [...celebrityList];

    newArray[index] = {
      ...newArray[index],
      dob: editDate,
      gender: editGender,
      country: editCountry,
      description: editDescription,
    };

    setCelebrityList(newArray);
  }

  function handleDelete(id) {
    let newArray = [...celebrityList];
    newArray = newArray.filter((item) => {
      return item.id != id;
    });

    console.log('newArray', newArray);
    setExpand(false);
    setExpandId(null);
    setCelebrityList([...newArray]);
  }

  return (
    <div className='list'>
      {celebrityList.map((celebrity, index) => {
        return (
          <ListItem
            key={celebrity.id}
            user={celebrity}
            setting={[expand, expandId]}
            handleExpand={handleExpand}
            handleSave={handleSave}
            index={index}
            editOpen={editOpen}
            handleEditOpen={setEditOpen}
            handleDelete={handleDelete}
            toggleModal={toggleModal}
          />
        );
      })}

      {/* The Modal */}
      <div>
        {isOpen && (
          <div className='modal-overlay'>
            <div className='modal'>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '30px',
                }}
              >
                <p>Are you sure want to delete ?</p>
                <span className='close' onClick={toggleModal}>
                  &times;
                </span>
              </div>
              <div className='btnDiv'>
                <button onClick={toggleModal}>Cancel</button>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      toggleModal();
                      handleDelete(expandId);
                    }, 1000);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
