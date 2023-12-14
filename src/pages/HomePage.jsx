import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../styles/HomePage.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import janeDoeCv from "../assets/janeDoeCv.png";
import logo from "../assets/logo.png";

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
                your skills and achievements grab immediate attention. Your
                future career success starts with those crucial 6 seconds –
                maximize your impact with a standout resume.
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
            <h1 className="titles-home">About Us</h1>
            <div className="md:flex md:flex-row-reverse md:h-52 items-center ml-0 justify-evenly">
              <p className="p-about-section">
                Our goal in Curriculum Builder is to serve as the main supporter
                of individuals' personal career paths. We strive to
                impulse people to new career goals and expand their
                dreams through meticulously designed curriculums. 
                We want our users to be able to create an
                outstanding resume in just minutes, all within this platform.
                As a team of web developers, we set out to contribute to the
                community by creating an application that enables job seekers to
                discover their ideal job in a matter of minutes.
              </p>
              <img src={logo} alt="logo" className="h-72 md:h-96 " />
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
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-300"
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
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-300"
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
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="block p-2.5 w-full text-sm rounded-lg shadow-sm border focus:ring-primary-500 focus:border-primary-500 bg-gray-50  border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center text-slate-800 rounded-lg bg-slate-300 sm:w-fit hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
