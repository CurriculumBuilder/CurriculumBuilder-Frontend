import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../styles/HomePage.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import janeDoeCv from "../assets/janeDoeCv.png";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
    <div className="home">
      <div className="content-home">
        <section className="main-section-home" id="home">
          <div className="text-main-section">
            <h1 className="titles-home">
              Studies show that recruiters spend an average of 6 seconds
              reviewing a resume
            </h1>
            <p className="p-main-section">
              Make those seconds count! Create a compelling CV to ensure that
              your skills and achievements grab immediate attention. Your future
              career success starts with those crucial 6 seconds – maximize your
              impact with a standout resume.
            </p>

            {isLoggedIn && (
              <Link to={"/curriculum"}>
                <button className="btnHome">Create CV </button>
              </Link>
            )}

            {!isLoggedIn && (
              <Link to={"/signup"}>
                <button className="btnHome">Create Account </button>
              </Link>
            )}
          </div>
          <img src={janeDoeCv} alt="cv-image" className="imgExample" />
        </section>

        <br />

          <section id="about-us">
            <div>
              <h1 className="titles-home">About Us</h1>
              <p className="p-main-section">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                ullamcorper magna malesuada metus hendrerit gravida. In congue
                tincidunt augue, nec bibendum nisl vehicula lacinia. Duis
                mollis, est sit amet gravida ultricies, dui nisl pellentesque
                justo, vitae venenatis ex enim at est. Vivamus fringilla, nunc
                non rutrum viverra, risus nisl pellentesque risus, in blandit
                nulla urna vitae ligula.
              </p>
            </div>
          </section>
       
        <br />
      </div>
      
          <section id="contact" className="bg-slate-800">
            <div className="py-8 lg:py-16 px-8 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-semibold text-white">
                Contact Us
              </h2>
              <p className="mb-8 lg:mb-16 font-medium text-gray-500 dark:text-gray-400 sm:text-xl">
                Got a technical issue? Want to send feedback about a feature?
                Wanna say "hi"? Let us know.
              </p>
              <form action="#" className="space-y-8">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="example@example.com"
                    required
                  ></input>
                </div>
                <div>
                  <label
                    for="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Let us know how we can help you"
                    required
                  ></input>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className="block p-2.5 w-full text-sm rounded-lg shadow-sm border focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send message
                </button>
              </form>
            </div>
            <br />
            <br />
          </section>
        
        </div>
      <Footer />
    </>
  );
}

export default HomePage;
