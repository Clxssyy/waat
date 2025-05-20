import { useState } from "react";

const Equipment = ({ props }: { props: { slot: String } }) => {
  const { slot } = props;
  const [test, setTest] = useState(0);
  return (
    <div>
      <h2>{slot}</h2>
      <button onClick={() => setTest(test + 1)}>{test}</button>
    </div>
  );
};

export default Equipment;
