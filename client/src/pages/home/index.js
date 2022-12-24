import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Soro-soke</h1>
        <input className={styles.input} placeholder="Username..." />
        <select className={styles.input} name="room" id="room">
          <option>--Select room--</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Express">Express</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <button className="btn btn-primary">
          Speak up <FontAwesomeIcon icon="fa-solid fa-microphone" />
        </button>
      </div>
    </div>
  );
};

export default Home;
