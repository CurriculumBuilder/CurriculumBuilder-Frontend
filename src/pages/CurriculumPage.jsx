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
  const [label, setLabel] = useState("");
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

  const API_URL = import.meta.env.VITE_API_URL;

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
    if (label !== "" && url !== "") {
      const newLink = {
        label: label,
        url: url,
      };
      setLinksValues([...links, newLink]);
      setLabel("");
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
        .post(`${API_URL}/api/curriculums`, requestBody, {
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
                required
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
                required
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
                required
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
                required
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
                required
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
            <h2 className="block tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Links
            </h2>
            <div>
              <select
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-2/5 p-2.5"
              >
                <option value="">Select a link</option>
                <option value="linkedIn">LinkedIn</option>
                <option value="gitHub">GitHub</option>
                <option value="portfolio">Portfolio</option>
              </select>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="appearance-none ml-2 mr-2 w-2/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <button onClick={handleAddLink} className="btnCV py-1.5">
                Add Link
              </button>
            </div>
            <div>
              {links.map((link, index) => (
                <div key={index}>
                  <p className="my-3 mr-2 text-gray-500 font-medium inline-block">
                    {" "}
                    <svg
                      className=" inline-block w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {link.label} - {link.url}
                  </p>
                  <button
                    onClick={() => handleRemoveLink(index)}
                    className="btn-remove"
                  >
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
                  className="btn-remove"
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
 
            {links && <ul className="flex flex-wrap justify-end gap-2 m-2">
               {
                links.map((link,index)=>{
                  return (
                    <>
                      {link.label === "linkedIn" && (
                        <li className="list-none" key={index}>
                          <a
                            href={link.url}
                            className="bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                            target="_blank"
                          >
                            <svg
                              className="w-3 h-3 fill-current"
                              role="img"
                              viewBox="0 0 256 256"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path>
                              </g>
                            </svg>
                          </a>
                        </li>
                      )}
                      {link.label === "gitHub" && (
                        <li className="list-none"  key={index}>
                          <a
                            href="https://github.com/"
                            className="bg-gray-700 p-2 font-medium text-white inline-flex items-center space-x-2 rounded"
                            target="_blank"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              aria-hidden="true"
                              role="img"
                              className="w-3"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 24 24"
                            >
                              <g fill="none">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                                  fill="currentColor"
                                />
                              </g>
                            </svg>
                          </a>
                        </li>
                      )}

                      {link.label === "portfolio" && (
                        <li className="list-none"  key={index}>
                          <a
                            href={link.url}
                            className="bg-black p-2 font-medium text-white inline-flex items-center space-x-2 rounded"
                            target="_blank"
                          >
                            <svg
                              className="w-3 h-3"
                              role="img"
                              aria-hidden="true"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 32 447.99999999999994 448"
                              xmlns="http://www.w3.org/2000/svg"
                              width="2500"
                              height="2321"
                            >
                              <g fill="none">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35s5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z"
                                  fill="currentColor"
                                />
                              </g>
                            </svg>
                          </a>
                        </li>
                      )}
                    </>
                  );
                })
               }
                </ul>}

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
              {(email || phone || address) && (
                <strong className="text-xl font-medium">Contact Details</strong>
              )}
              <ul className="mt-2 mb-10 list-none">
                    
                    {email && <li className="px-1 mt-1 list-none"><strong className="mr-1">E-mail </strong>
                        <a href="mailto:" className="block">{email}</a>
                    </li>}
                   {phone && <li className="px-1  list-none"><strong className="mr-1">Phone </strong>
                        <a href="tel:+821023456789" className="block">{phone}</a>
                    </li>}
                    {address && <li className="px-1  list-none"><strong className="mr-1">Location</strong><span className="block">{address}</span></li>}
                </ul>


              {skills.length > 0 && (
                <>
                  <strong className="text-xl font-medium mt-1">Skills</strong>
                  <ul className="mt-2 flex flex-wrap">
                    {skills.map((skill, index) => {
                      return (
                        <li
                          className="px-2 mt-1 list-none bg-gray-600 text-white py-1 ml-1 text-xs rounded"
                          key={index}
                        >
                          {skill}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {languages.length > 0 && (
                <>
                  <strong className="text-xl font-medium mt-1">
                    Languages
                  </strong>
                  <ul className="mt-2 flex flex-col">
                    {languages.map((language, index) => {
                      return (
                        <li className="px-2 mt-1 list-none text-s" key={index}>
                          {language}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {htmlContentEducation && (
                <>
                  <h2 className="text-xl font-medium mt-1">Education</h2>

                  <p
                    className="mt-4 text-s flex flex-wrap flex-col"
                    dangerouslySetInnerHTML={{ __html: htmlContentEducation }}
                  ></p>
                </>
              )}

              {awards.length > 0 && (
                <>
                  <strong className="text-xl font-medium mt-1">
                    Awards & Achievements
                  </strong>
                  <ul className="mt-2 flex flex-col">
                    {awards.map((award, index) => {
                      return (
                        <li className="px-2 mt-1 list-none text-s" key={index}>
                          {award}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="w-4/6">
              {htmlContentSummry && (
                <>
                  <h2 className="text-2xl pb-1 border-b font-semibold">
                    Summary
                  </h2>
                  <p
                    className="mt-4 text-s flex flex-wrap flex-col"
                    dangerouslySetInnerHTML={{ __html: htmlContentSummry }}
                  ></p>
                </>
              )}
              {htmlContentProjects && (
                <>
                  <h2 className="text-2xl pb-1 border-b font-semibold">
                    Projects
                  </h2>
                  <p
                    className="mt-4 text-s flex flex-wrap flex-col"
                    dangerouslySetInnerHTML={{ __html: htmlContentProjects }}
                  ></p>
                </>
              )}

              {htmlContentExperience && (
                <>
                  <h2 className="text-2xl pb-1 border-b font-semibold">
                    Work Experience
                  </h2>
                  <p
                    className="mt-4 text-s flex flex-wrap flex-col"
                    dangerouslySetInnerHTML={{ __html: htmlContentExperience }}
                  ></p>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
