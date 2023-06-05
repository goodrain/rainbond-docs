import React, { useState } from "react";

import Typist from "react-typist";

export default function CTypist({ words }) {
  const [index, setIndex] = useState(0);

  let word = words[index % words.length];
  let Infi = () => {
    return (
      <Typist
        onTypingDone={() => {
          setIndex((i) => i + 1);
        }}
      >
        {word}
        <Typist.Backspace count={word.length} delay={word.length * 400} />
      </Typist>
    );
  };
  return <Infi />;
}
