import { useState } from "react";
import YearSlider from "./YearSlider";
import Map from "./Map";


function Visuals() {
  const [year, setYear] = useState(1800);

  return (
    <>
      <YearSlider year={year} setYear={setYear} />
      <Map year={year} setYear={setYear}/>
    </>
  );
}

export default Visuals;
