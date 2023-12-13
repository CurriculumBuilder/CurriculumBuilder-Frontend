import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { HashLink } from "react-router-hash-link";
import "../styles/HomePage.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import  exampleCV from "../assets/exampleCV.png"

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
    <div className="content-home">
      <section className="main-section-home">
        <div className="text-main-section">
          <h1 className="titles-home">
            Studies show that recruiters spend an average of 6 seconds reviewing
            a resume
          </h1>
          <p className="p-main-section">
            Make those seconds count! Create a compelling CV to ensure that your
            skills and achievements grab immediate attention. Your future career
            success starts with those crucial 6 seconds – maximize your impact
            with a standout resume.
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
        <img
            src={exampleCV}
            alt="cv-image"
            className="imgExample"
          />
      </section>

      <br />

      <HashLink to="/#about-us">
        <section id="about-us">
          <div>
            <h1 className="titles-home">About Us</h1>
            <p className="p-main-section">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              ullamcorper magna malesuada metus hendrerit gravida. In congue
              tincidunt augue, nec bibendum nisl vehicula lacinia. Duis mollis,
              est sit amet gravida ultricies, dui nisl pellentesque justo, vitae
              venenatis ex enim at est. Vivamus fringilla, nunc non rutrum
              viverra, risus nisl pellentesque risus, in blandit nulla urna
              vitae ligula.
            </p>
          </div>
        </section>
      </HashLink>

      <br />

      <HashLink to="/#contact">
        <section id="contact">
          <div>
            <h1 className="titles-home">Contact</h1>
            <p className="p-main-section">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              ullamcorper magna malesuada metus hendrerit gravida. In congue
              tincidunt augue, nec bibendum nisl vehicula lacinia. Duis mollis,
              est sit amet gravida ultricies, dui nisl pellentesque justo, vitae
              venenatis ex enim at est. Vivamus fringilla, nunc non rutrum
              viverra, risus nisl pellentesque risus, in blandit nulla urna
              vitae ligula.
            </p>
          </div>
        </section>
      </HashLink>

      <br />

      <HashLink to="/#faq">
        <section id="faq">
          <div>
            <h1 className="titles-home">FAQ</h1>
            <p className="p-main-section">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              ullamcorper magna malesuada metus hendrerit gravida. In congue
              tincidunt augue, nec bibendum nisl vehicula lacinia. Duis mollis,
              est sit amet gravida ultricies, dui nisl pellentesque justo, vitae
              venenatis ex enim at est. Vivamus fringilla, nunc non rutrum
              viverra, risus nisl pellentesque risus, in blandit nulla urna
              vitae ligula.
            </p>
          </div>
        </section>
      </HashLink>
      </div>
      <Footer />
      </>
  );
}

export default HomePage;
