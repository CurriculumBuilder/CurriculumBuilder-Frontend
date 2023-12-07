import { useContext, useState,useRef } from "react";
import { AuthContext } from "../context/auth.context";
import "../styles/Curriculum.css";
import ReactToPrint from "react-to-print";


function CurriculumPage() {

  const componentRef = useRef()
 
  const { user } = useContext(AuthContext);
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("")

  return (
    <div className="main-container">
      <div className="form-container">
        <h2 className="text-2xl text-gray-900 dark:text-white">
          Personal Details
        </h2>
        <hr className="w-96 m-3"/>
        <form className="w-full max-w-2xl">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-500 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
              
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}
              />
              
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
              />
            </div>
          </div>
          
        </form>
      </div>
      <div className="preview-container">
        <div className="preview-menu">
        <ReactToPrint trigger={()=>(
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-8 ">
            Download CV
          </button>
        )}
          content={()=>componentRef.current}
        />

        </div>
        <div ref={componentRef} className="preview-pdf">
        <p className="p-0 bg-cyan-950 text-white">
          {name} <br />
          {email} <br />
          {phone} <br />
          {address} <br />
        </p>
          
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
