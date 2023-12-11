import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AllCurriculumsPage() {
    const storedToken = localStorage.getItem("authToken");
    const API_URL = "http://localhost:5005/api";
    const [curriculums, setCurriculums] = useState([]);
    const [curriculumToDelete, setCurriculumToDelete] = useState([]);

    useEffect(() => {

        if(storedToken){
        axios
          .get(`${API_URL}/curriculums`, { headers: { Authorization: `Bearer ${storedToken}`} })
          .then((response) => {
            setCurriculums(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }}, []);

      const deleteCurriculum = (curriculum) => {
        axios
          .delete(`${API_URL}/curriculums/${curriculum._id}`)
          .then(() => {
            setCurriculums((prevCurriculums) =>
              prevCurriculums.filter((c) => c._id !== curriculum._id)
            );
          })
          .catch((error) => {
            console.error(error);
          });
      };
  return (
    <>
    <h1 className='font-bold text-slate-800 text-4xl p-5'>My Curriculums</h1>

    <section className=" bg-base-100  grid grid-cols-2 gap-4 m-2">
        {curriculums.map((curriculum) => (
          <div key={curriculum.id} className="flex min-w-0 gap-x-4 shadow-lg m-2 w-full grid-cols-2">
            <div className="min-w-0 flex-auto">
              <Link to={`./update-curriculum/${curriculum._id}`}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 ml-2">{curriculum.personalData.name}</h3>
                <img src="https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="" />
                <p className='mt-1 truncate text-xs leading-5 text-gray-500 ml-2'>{curriculum.personalData.position}</p>
              </Link>

              <button
                    className="inline-flex font-semibold items-center justify-center rounded-md p-2.5 text-red-800 shadow-md hover:bg-red-800 hover:text-white m-2"
                    onClick={() => {
                        alert("Are you sure you want to delete?")
                        deleteCurriculum(curriculum);
                    }}
                  >
                    Delete
                  </button>
              
            </div>
          </div>
        ))}
      </section>
        </>
  )
}

export default AllCurriculumsPage