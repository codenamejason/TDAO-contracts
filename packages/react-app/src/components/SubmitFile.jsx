import React from "react";

const SubmitFile = ({ fileName, onChange }) => {
  return (
    <div>
      <input type="file" name={fileName} onChange={onChange} />
    </div>
  );
};

export default SubmitFile;
