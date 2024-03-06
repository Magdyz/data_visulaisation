import { useMemo, useEffect, useState } from "react";
import DataTable from "./DataTable";

function Map({ year }) {
  const [meteorites, setMeteroites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [thisYear, setThisYear] = useState([]);
  const [showSmall, setShowSmall] = useState(false);

  const yearMeteorites = (year) => {
    if (year < 1800) {
      return [];
    }

    return meteorites
      .filter((meteorite) => meteorite.year)
      .filter((meteorite) => {
        const mYear = meteorite.year.split("-")[0];
        return mYear === String(year);
      })
      .filter((meteorite) => {
        return showSmall || meteorite.mass >= 500;
      });
  };

  const meteoritesTags = (meteoritesYear, opacity) => {
    return (
      <>
        {meteoritesYear
          .filter((meteorite) => {
            return meteorite.mass > 1;
          })
          .map((meteorite) => {
            if (!meteorite.geolocation) {
              return;
            }

            const relX = (Number(meteorite.geolocation.longitude) + 180) / 3.6;
            const relY = -(Number(meteorite.geolocation.latitude) - 90) / 1.8;

            return (
              <img
                key={meteorite.id}
                src="../../assets/red-dot.png"
                className="dot"
                style={{
                  top: relY + "%",
                  left: relX + "%",
                  opacity: opacity,
                  width: Math.log10(meteorite.mass) / 10 + "em",
                  height: Math.log10(meteorite.mass) / 10 + "em",
                }}
              ></img>
            );
          })}
      </>
    );
  };

  const flattenArrays = (arrays) => {
    const newArray = [];

    arrays.forEach((array) => {
      newArray.push(...array.props.children);
    });

    return newArray;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Mass (g)",
        accessor: "mass",
      },
      {
        Header: "Recclass",
        accessor: "recclass",
      },
    ],
    []
  );

  useEffect(() => {
    fetch("https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=50000")
      .then((response) => response.json())
      .then((data) => {
        setMeteroites(data);
      });
  }, []);

  useEffect(() => {
    const meteoritesYearsArr = [yearMeteorites(year)];
    setThisYear(meteoritesYearsArr[0]);
    const dotLocations = meteoritesYearsArr.map((currYear, index) => {
      return meteoritesTags(currYear, 1 - 0.4 * index);
    });

    setLocations(flattenArrays(dotLocations));
  }, [year, showSmall]);

  const toggleShowSmall = () => {
    if (showSmall) {
      setShowSmall(false);
    } else {
      setShowSmall(true);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          toggleShowSmall();
        }}
      >
        {showSmall ? "Hide" : "Show"} small meteorites
      </button>
      <div className="container">
        <img src="../../assets/worldmap.jpg" className="map"></img>
        {locations}
      </div>
      <DataTable
        setMeteroites={setThisYear}
        columns={columns}
        meteorites={thisYear}
      />
    </>
  );
}

export default Map;
