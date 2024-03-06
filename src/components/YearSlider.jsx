import React from "react";

function YearSlider({ year, setYear }) {
  function changeYear(event) {
    setYear(event.target.value);
  }

  return (
    <>
      <h2>{year}</h2>

      <div>
        <input
          type="range"
          min={1800}
          max={2015}
          onChange={(event) => changeYear(event)}
        />
        <div className="year-slider">
          <h3>1800</h3>
          <h3>2015</h3>
        </div>
      </div>
    </>
  );
}

export default YearSlider;
