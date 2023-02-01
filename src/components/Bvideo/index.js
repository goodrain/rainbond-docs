import PropTypes from 'prop-types';
import React from 'react';
import styles from './style.module.css';

function Bvideo({ src }) {
  return (
    <>
      <iframe
        src={src}
        loading="lazy"
        scrolling="no"
        border={0}
        frameBorder="no"
        framespacing={0}
        allowFullScreen={true}
        className={styles.videoFrame}
      ></iframe>
    </>
  );
}

Bvideo.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Bvideo;
