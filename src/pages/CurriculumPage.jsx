import { useContext, useState, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import { useReactToPrint } from "react-to-print";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/Curriculum.css";
import DOMPurify from "dompurify";
import axios from "axios";
import { htmlToDraft } from "html-to-draftjs";

function CurriculumPage() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
 
  let editorState = EditorState.createEmpty();
  const [summry, setSummry] = useState(editorState);
  const [htmlContentSummry, setHtmlContentSummry] = useState("");

  const [links, setLinksValues] = useState([]);
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const [skills, setSkillsValues] = useState([]);

  const [languages, setLanguageValues] = useState([]);

  const [projects, setProjects] = useState(EditorState.createEmpty());
  const [htmlContentProjects, setHtmlContentProjects] = useState("");

  const [experience, setExperience] = useState(EditorState.createEmpty());
  const [htmlContentExperience, setHtmlContentExperience] = useState("");

  const [education, setEducation] = useState(EditorState.createEmpty());
  const [htmlContentEducation, setHtmlContentEducation] = useState("");

  const [awards, setAwardsValues] = useState([]);

  const componentRef = useRef();

  const API_URL = "http://localhost:5005/api";

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const maxCharSummary = 100;
  const maxCharProjects = 1000;
  const maxCharExperience = 1000;
  const maxCharEducation = 1000;








  const onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharSummary) {
      setHtmlContentSummry(markup);
      setSummry(editorState);
    }
  };

  const onContentStateChange = (contentState) => {
    console.log(contentState);
  };



  const handleChangeSkill = (index, event) => {
    const skillsCopy = [...skills];
    skillsCopy[index] = event.target.value;
    setSkillsValues(skillsCopy);
  };

  const handleChangeLanguage = (index, event) => {
    const languagesCopy = [...languages];
    languagesCopy[index] = event.target.value;
    setLanguageValues(languagesCopy);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (platform !== "" && url !== "") {
      const newLink = {
        platform: platform,
        url: url,
      };
      setLinksValues([...links, newLink]);
      setPlatform("");
      setUrl("");
    }
  };

  const handleAddSkill = (event) => {
    event.preventDefault();
    setSkillsValues([...skills, ""]);
  };

  const handleAddLanguage = (event) => {
    event.preventDefault();
    setLanguageValues([...languages, ""]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinksValues(updatedLinks);
  };

  const handleRemoveSkill = (index) => {
    const skillsCopy = [...skills];
    skillsCopy.splice(index, 1);
    setSkillsValues(skillsCopy);
  };

  const handleRemoveLanguage = (index) => {
    const languagesCopy = [...languages];
    languagesCopy.splice(index, 1);
    setLanguageValues(languagesCopy);
  };




  const onProjectsEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharProjects) {
      setHtmlContentProjects(markup);
      setProjects(editorState);
    }
  };

  const onExperienceEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharExperience) {
      setHtmlContentExperience(markup);
      setExperience(editorState);
    }
  };

  const onEducationEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharEducation) {
      setHtmlContentEducation(markup);
      setEducation(editorState);
    }
  };


  const handleChangeAward = (index, event) => {
    const awardsCopy = [...awards];
    awardsCopy[index] = event.target.value;
    setAwardsValues(awardsCopy);
  };

  const handleAddAward = (event) => {
    event.preventDefault();
    setAwardsValues([...awards, ""]);
  };

  const handleRemoveAward = (index) => {
    const awardsCopy = [...awards];
    awardsCopy.splice(index, 1);
    setAwardsValues(awardsCopy);
  };

  const handleSubmit = (event) => {
    const storedToken = localStorage.getItem("authToken");
    event.preventDefault();

    const requestBody = {
      userId: user._id,
      personalData: {
        name: name,
        phone: phone,
        email: email,
        address: address,
        position: position,
        summary: htmlContentSummry,
      },
      links: links,
      skills: skills,
      languages: languages,
      projects: htmlContentProjects,
      experience: htmlContentExperience,
      education: htmlContentEducation,
      awards: awards,
    };

    if (storedToken) {
      axios
        .post(`${API_URL}/curriculums`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error creating CV from the API...");
          console.log(error);
        });
    }
  };

  const toolbarOptions = {
    options: ["inline", "list", "textAlign", "link"],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
    },
    list: {
      options: ["unordered", "ordered"],
    },
    textAlign: {
      options: ["left", "center", "right", "justify"],
    },
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2 className="text-2xl text-gray-900">Personal Details</h2>
        <hr className="w-96 m-3" />
        <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
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
                placeholder="Jane Doe"
                value={name}
                onChange={(e)=>setName(e.target.value)}
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
                placeholder="janedoe@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Position
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-position"
                type="text"
                placeholder="Front End Developer"
                value={position}
                onChange={(e)=>setPosition(e.target.value)}
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
                placeholder="01-123-4567-8910"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
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
                placeholder="Berlin, Germany"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
              />
            </div>
          </div>
          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Summary
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{ border: "1px solid black", height: "200px" }}
          >
            <Editor
              editorState={summry}
              toolbarClassName="toolbarClassName"
              toolbar={toolbarOptions}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                summry.getCurrentContent().getPlainText("").length >=
                maxCharSummary
              }
            />
          </div>
          <p className=" text-gray-400">
            {maxCharSummary -
              summry.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharSummary}
          </p>
          <br />

          <hr className="w-96 m-3" />

          <div>
            <h2>Links</h2>
            <div>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="">Select a link</option>
                <option value="Platform 1">LinkedIn</option>
                <option value="Platform 2">GitHub</option>
                <option value="Platform 3">Website</option>
              </select>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button onClick={handleAddLink}>Add Link</button>
            </div>
            <div>
              {links.map((link, index) => (
                <div key={index}>
                  <p>Platform: {link.platform} - URL: {link.url}</p>
                  <button onClick={() => handleRemoveLink(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <hr className="w-96 m-3" />

          <div>
            <h2 className="tblock tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Skills
            </h2>
            {skills.map((skills, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skills}
                  className="input-cv"
                  onChange={(event) => handleChangeSkill(index, event)}
                  required={true}
                />
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="btbtn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={handleAddSkill} className="btnCV">
              Add Skill{" "}
            </button>
          </div>

          <hr className="w-96 m-3" />

          <div>
            <h2 className="tblock tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Languages
            </h2>
            {languages.map((languages, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={languages}
                  className="input-cv"
                  onChange={(event) => handleChangeLanguage(index, event)}
                  defaultValue={"English"}
                />
                <button
                  onClick={() => handleRemoveLanguage(index)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={handleAddLanguage} className="btnCV">
              Add Language{" "}
            </button>
          </div>
          <br />
          <hr className="w-96 m-3" />
          <br />
          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Projects
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{ border: "1px solid black", height: "200px" }}
          >
            <Editor
              editorState={projects}
              toolbarClassName="toolbarClassName"
              toolbar={toolbarOptions}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onProjectsEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                projects.getCurrentContent().getPlainText("").length >=
                maxCharProjects
              }
            />
          </div>
          <p className="text-gray-400">
            {maxCharProjects -
              projects.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharProjects}
          </p>
          <br />
          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Experience
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{
              border: "1px solid black",
              height: "200px",
              marginBottom: "20px",
            }}
          >
            <Editor
              editorState={experience}
              toolbarClassName="toolbarClassName"
              toolbar={toolbarOptions}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onExperienceEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                experience.getCurrentContent().getPlainText("").length >=
                maxCharExperience
              }
            />
          </div>
          <p className="text-gray-400">
            {maxCharExperience -
              experience.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharExperience}
          </p>
          <br />

          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Education
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{
              border: "1px solid black",
              height: "200px",
              marginBottom: "20px",
            }}
          >
            <Editor
              editorState={education}
              toolbarClassName="toolbarClassName"
              toolbar={toolbarOptions}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEducationEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                education.getCurrentContent().getPlainText("").length >=
                maxCharEducation
              }
            />
          </div>
          <p className="text-gray-400">
            {maxCharEducation -
              education.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharEducation}
          </p>
          <br />
          <hr className="w-96 m-3" />
          <div>
            <h2 className="tblock tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Awards
            </h2>
            {awards.map((awards, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={awards}
                  onChange={(event) => handleChangeAward(index, event)}
                  className="input-cv"
                />
                <button
                  onClick={() => handleRemoveAward(index)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={handleAddAward} className="btnCV">
              Add Award{" "}
            </button>
          </div>

          <button type="submit" className="btn-save-CV">
            Save CV
          </button>
        </form>
      </div>

      <div className="preview-container">
        <div className="preview-menu">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-8 "
          >
            Download CV
          </button>
        </div>
        <div className="preview-pdf relative" ref={componentRef}>
          {name && (
            <div className="flex justify-between items-center m-3">
              <div>
                <div className="bg-gray-300 font-bold text-white text-7xl rounded-full h-32 w-32 char-card">
                  <p>{name[0].toUpperCase()}</p>
                </div>
              </div>
              <div className="grid justify-items-end">
                <h1 className="text-3xl font-extrabold">{name}</h1>
                {position && <p className="text-lg mt-1">{position}</p>}
              </div>
            </div>
          )}
          <main className="flex gap-x-10 mt-10 m-3">
            <div className="w-2/6">
              {(email || phone || address) && <strong className="text-xl font-medium">Contact Details</strong>}
              <ul className="mt-2 mb-10 list-none">
                    
                    {email && <li className="px-1 mt-1 list-none"><strong className="mr-1">E-mail </strong>
                        <a href="mailto:" className="block">{email}</a>
                    </li>}
                   {phone && <li className="px-1  list-none"><strong className="mr-1">Phone </strong>
                        <a href="tel:+821023456789" className="block">{phone}</a>
                    </li>}
                    {address && <li className="px-1  list-none"><strong className="mr-1">Location</strong><span className="block">{address}</span></li>}
                </ul>
{/* 
                {links && 
                <ul className="mt-2">
                {links.map((link,index)=>{
                  return(
                    <li className="px-2 mt-1 list-none text-xs" key={index}><a href={link}>{link}</a></li>
                  )
                })}  
                </ul>} */}

                {skills.length>0 && 
                <>
                <strong className="text-xl font-medium mt-1">Skills</strong>
                <ul className="mt-2 flex flex-wrap">
                {skills.map((skill,index)=>{
                  return(
                    <li className="px-2 mt-1 list-none bg-gray-600 text-white py-1 ml-1 text-xs rounded" key={index}>{skill}</li>
                  )
                })}  
                </ul>
                </>
                }

                {languages.length>0 && 
                <>
                <strong className="text-xl font-medium mt-1">Languages</strong>
                <ul className="mt-2 flex flex-col">
                {languages.map((language,index)=>{
                  return(
                    <li className="px-2 mt-1 list-none text-s" key={index}>{language}</li>
                  )
                })}  
                </ul>
                </>
                }

                {
              htmlContentEducation && 
                <>
                  <h2 className="text-xl font-medium mt-1">Education</h2>
                   
                    <p className="mt-4 text-s flex flex-wrap flex-col"  dangerouslySetInnerHTML={{ __html: htmlContentEducation }}></p>
                
                  
                </>              
            }

            {awards.length>0 && 
                <>
                <strong className="text-xl font-medium mt-1">Awards & Achievements</strong>
                <ul className="mt-2 flex flex-col">
                {awards.map((award,index)=>{
                  return(
                    <li className="px-2 mt-1 list-none text-s" key={index}>{award}</li>
                  )
                })}  
                </ul>
                </>
                }

            </div>


            <div className="w-4/6">
            {
              htmlContentSummry && 
                <>
                  <h2 className="text-2xl pb-1 border-b font-semibold">Summary</h2>
                  <p className="mt-4 text-s flex flex-wrap flex-col"  dangerouslySetInnerHTML={{ __html: htmlContentSummry }}></p>
                </>              
            }
            {
              htmlContentProjects && 
                <>
                  <h2 className="text-2xl pb-1 border-b font-semibold">Projects</h2>
                  <p className="mt-4 text-s flex flex-wrap flex-col"  dangerouslySetInnerHTML={{ __html: htmlContentProjects }}></p>
                </>              
            }

            {
              htmlContentExperience && 
                <>
                  <h2 className="text-2xl pb-1 border-b font-semibold">Work Experience</h2>
                  <p className="mt-4 text-s flex flex-wrap flex-col"  dangerouslySetInnerHTML={{ __html: htmlContentExperience }}></p>
                </>              
            }
              
            </div>
          </main>

      
          
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
