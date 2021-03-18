import React, { Fragment, useState } from "react";

const InputEntries = () => {
  const [description, setDescrtiption] = useState("");

  const changeHandler = (e) => {
    setDescrtiption(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("etarget is " + e.target);
    const body = {
      day: "2021-03-12",
      sunrise: "06:05:00",
      description: description,
    };
    console.log(body);

    try {
      const response = await fetch("http://localhost:5000/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add description"
          value={description}
          onChange={changeHandler}
        />
        <button type="submit">Add</button>
      </form>
    </Fragment>
  );
};

export default InputEntries;
