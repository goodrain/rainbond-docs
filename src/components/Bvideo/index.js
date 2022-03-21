import PropTypes from 'prop-types';
import React from 'react';
import styles from './style.module.css';

function Bvideo({ src, bsrc }) {
  return (
    <>
      <iframe
        src={src}
        loading='lazy'
        scrolling='no'
        border={0}
        frameBorder='no'
        framespacing={0}
        allowFullScreen={true}
        // style={{ width: "100%", height: "500px" }}
        className={styles.videoFrame}
      ></iframe>
    </>
  );
}

Bvideo.propTypes = {
  src: PropTypes.string.isRequired,
  bsrc: PropTypes.string
};

export default Bvideo;
