import React from "react";

import styles from "./Achievements.module.css";
import { getImageUrl } from "../../utils";

export const Achievements = ({
  project: { title, imageSrc, description, skills, demo, date, link },
}) => {
  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {date && <p className={styles.date}>{date}</p>} {/* Display date if available */}
      <ul className={styles.skills}>
        {skills.map((skill, index) => (
          <li key={index} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>
      <div className={styles.links}>
        <a href={demo} className={styles.link} target="_blank" rel="noopener noreferrer">
          Link To View
        </a>
        {link && ( // Display the link if available
          <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">
            More Info
          </a>
        )}
      </div>
    </div>
  );
};
