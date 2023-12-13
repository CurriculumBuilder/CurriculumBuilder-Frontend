import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import "../styles/AllCurriculums.css"
Modal.setAppElement("#root");
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import janeDoeCv from "../assets/janeDoeCv.png"


function AllCurriculumsPage() {
    const storedToken = localStorage.getItem("authToken");
    const API_URL = import.meta.env.VITE_API_URL
    const [curriculums, setCurriculums] = useState([]);
    const [curriculumToDelete, setCurriculumToDelete] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [curriculumToDeleteId, setCurriculumToDeleteId] = useState(null);
    

    useEffect(() => {

        if(storedToken){
        axios
          .get(`${API_URL}/api/curriculums`, { headers: { Authorization: `Bearer ${storedToken}`} })
          .then((response) => {
            setCurriculums(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }}, []);

      const openModal = (curriculumId) => {
        setCurriculumToDeleteId(curriculumId);
        setModalIsOpen(true);
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };

      const deleteCurriculum = () => {
            axios
              .delete(`${API_URL}/api/curriculums/${curriculumToDeleteId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
              .then(() => {
                toast.success('Deleted Successfuly!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  
                });
                closeModal();
                setCurriculums((prevCurriculums) =>
                  prevCurriculums.filter((c) => c._id !== curriculumToDeleteId)
                );
                
              })
              .catch((error) => {
                closeModal();
                toast.error('Deletion Failed!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                console.error(error);
                
              });
          }
      
  return (
    <>
      <h1 className='font-bold text-slate-800 text-4xl p-5'>My Curriculums</h1>

      <section className="bg-base-100 gap-4 m-2 md:grid md:grid-cols-2 md:gap-4 justify-center items-center">
  {curriculums.map((curriculum) => (
    <div key={curriculum._id} className="flex items-center min-w-0 gap-x-4 shadow-lg m-2 w-full grid-cols-2 p-3 mr-2">
      <div className="min-w-0 flex-auto text-center">
        <Link to={`./update-curriculum/${curriculum._id}`}>
          
          <h3 className="text-lg mt-2 font-semibold leading-6 text-gray-900">{curriculum.personalData.name}</h3>
          <p className='mt-1 mb-2 p-3 text-md leading-5 text-gray-600'>{curriculum.personalData.position}</p>
          <img className="mx-auto w-72" src={janeDoeCv} alt="" />
          
        </Link>

        <button
          className="inline-flex font-semibold items-center justify-center rounded-md p-2.5 text-red-800 shadow-md hover:bg-red-800 hover:text-white mt-5 mb-3"
          onClick={() => openModal(curriculum._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</section>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation Modal"
        className={"modal-delete-container"}
      >
        <div className='modal-delete-card'>
          <p className='modal-delete-text'>Are you sure you want to delete?</p>
          <button className='modal-delete-yes-btn' onClick={deleteCurriculum}>Yes</button>
          <button className='modal-delete-no-btn' onClick={closeModal}>No</button>
        </div>
      </Modal>

      <ToastContainer />
    </>
  )
}

export default AllCurriculumsPage