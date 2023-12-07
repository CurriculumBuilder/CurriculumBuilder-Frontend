import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/Curriculum.css";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

function CurriculumPage() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  let editorState = EditorState.createEmpty();
  const [summry, setSummry] = useState(editorState);

  const onEditorStateChange = (editorState) => {

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    console.log("..........");
    console.log(markup);
    console.log("..........");
  
    setSummry(editorState);
  };

  const onContentStateChange = (contentState) => {
    console.log("......")
    console.log(contentState)
    console.log("......")
  }

  return (
    <div className="main-container">
      <div className="form-container">
        <h2 className="text-2xl text-gray-900 dark:text-white">
          Personal Details
        </h2>
        <hr className="w-96 m-3" />
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
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
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          </div>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{ border: "1px solid black", height: "200px" }}
          >
            <Editor
              editorState={summry}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "200px" }}
            />
            <textarea
              className="bg-slate-400"
              style={{ display: "none" }}
              disabled
              maxLength={12}
              ref={(val) => summry === val}
              value={draftToHtml(convertToRaw(summry.getCurrentContent()))}
            />
          </div>
        </form>
      </div>

      <div className="preview-container">
        <div className="preview-menu">
          <PDFDownloadLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-8 ">
            Download CV
          </PDFDownloadLink>
        </div>
        <PDFViewer className="preview-pdf">
          <Document>
            <Page size="A4">
              <View>
                <Text style={tw("bg-cyan-950 text-white")}> {name}</Text>
                <Text> {email}</Text>
                <Text> {phone}</Text>
                <Text> {address}</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
}

export default CurriculumPage;
