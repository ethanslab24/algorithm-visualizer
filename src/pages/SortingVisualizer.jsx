import { useState } from "react";

function SortingVisualizer() {
  const [array, setArray] = useState([5, 3, 8, 1]);
  console.log(array);

  function swapFirstTwo(){
    let newArr = [...array];
    let temp = newArr[0];
    newArr[0] = newArr[1];
    newArr[1] = temp;
    setArray(newArr)
  }

  function swap(i, j){
    let newArr = [...array]
    let temp = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = temp;
    setArray(newArr)
  }
  return (
    <>
      <h2>Sorting Visualizer</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
        {array.map((number, index) => (
          <div key={index}>
            <div
              style={{
                height: `${number * 20}px`,
                width: "40px",
                backgroundColor: "steelblue",
              }}
            ></div>

            <div>{number}</div>
          </div>
        ))}
        <button onClick={() => swap(1, 2)}>Swap First Two</button>
      </div>

    </>
  );
}

export default SortingVisualizer;
