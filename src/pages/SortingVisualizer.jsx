import { useState } from "react";

function SortingVisualizer() {
  const [array, setArray] = useState([5, 3, 8, 1]);
  const [currentlyComparing, setCurrentlyComparing] = useState([0, 1]);
  const [sortedBoundary, setSortedBoundary] = useState(array.length - 1);
  const [isSorted, setIsSorted] = useState(false);
  const startingArray = [5, 3, 8, 1];

  function swap(i, j) {
    let newArr = [...array];
    let temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
    setArray(newArr);
  }

  function nextComparison() {
    const leftIndex = currentlyComparing[0];
    const rightIndex = currentlyComparing[1];

    if (rightIndex === sortedBoundary) {
      const newBoundary = sortedBoundary - 1;

      setSortedBoundary(newBoundary);
      setCurrentlyComparing([0, 1]);

      if (newBoundary === 0) {
        setIsSorted(true);
      }
    } else {
      setCurrentlyComparing([leftIndex + 1, rightIndex + 1]);
    }
  }

  function compareCurrentPair() {
    const leftIndex = currentlyComparing[0];
    const rightIndex = currentlyComparing[1];

    if (isSorted) return;

    if (array[currentlyComparing[0]] > array[currentlyComparing[1]]) {
      swap(leftIndex, rightIndex);
    }
    nextComparison();
  }

  function resetArray() {
    setArray(startingArray);
    setCurrentlyComparing([0, 1]);
    setSortedBoundary(startingArray.length - 1);
    setIsSorted(false);
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
                backgroundColor: currentlyComparing.includes(index)
                  ? "#22cf22"
                  : "steelblue",
              }}
            ></div>

            <div>{number}</div>
          </div>
        ))}
        <button onClick={() => compareCurrentPair()}>Bubble Sort Button</button>
        <button onClick={() => resetArray()}>Reset</button>
      </div>
    </>
  );
}

export default SortingVisualizer;
