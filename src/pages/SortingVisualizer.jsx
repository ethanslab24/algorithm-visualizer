import { useEffect, useState } from "react";

function SortingVisualizer() {
  const [currentlyComparing, setCurrentlyComparing] = useState([0, 1]);
  const [isSorted, setIsSorted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");

  function generateRandomArray() {
    const nums = [];

    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * 100) + 1;

      nums.push(randomNumber);
    }

    return nums;
  }

  const [array, setArray] = useState(generateRandomArray());
  const [sortedBoundary, setSortedBoundary] = useState(array.length - 1);

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
    const newArray = generateRandomArray();
    setArray(newArray);
    setSortedBoundary(newArray.length - 1);
    setCurrentlyComparing([0, 1]);
    setIsRunning(false);
    setIsSorted(false);
  }

  useEffect(() => {
    if (!isRunning || isSorted) return;
    const delay = 1100 - speed * 100;
    const intervalId = setInterval(() => {
      compareCurrentPair();
    }, delay);

    return () => clearInterval(intervalId);
  }, [isRunning, isSorted, array, currentlyComparing, sortedBoundary, speed]);

  const leftValue = array[currentlyComparing[0]];
  const rightValue = array[currentlyComparing[1]];

  return (
    <section className="sorting-page">
      <div className="visualizer-card">
        <div className="visualizer-header">
          <div>
            <h2>Bubble Sort Visualizer</h2>
            <p>Step through comparisons, swaps, and sorted boundaries.</p>
          </div>

          <div className="status-pill">{isSorted ? "Sorted" : "Sorting"}</div>
        </div>

        <div className="controls">
          <button onClick={compareCurrentPair} disabled={isSorted}>
            Step
          </button>
          <button onClick={() => setIsRunning(!isRunning)} disabled={isSorted}>
            {isRunning ? "Pause" : "Auto Sort"}
          </button>
          <button onClick={resetArray}>Reset</button>
        </div>

        <div className="settings-row">
          <label className="algorithm-select">
            <span>Algorithm</span>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>
          </label>

          <label className="speed-control">
            <span>Speed</span>
            <input
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="status-text">
          {isSorted
            ? "Array Sorted!"
            : `Comparing ${leftValue} and ${rightValue}`}
        </div>

        <div className="array-container">
          {array.map((number, index) => (
            <div className="bar-group" key={index}>
              <div
                className="array-bar"
                style={{
                  height: `${number * 3}px`,
                  backgroundColor: isSorted
                    ? "purple"
                    : index > sortedBoundary
                      ? "purple"
                      : currentlyComparing.includes(index)
                        ? "green"
                        : "steelblue",
                }}
              ></div>

              <div className="bar-value">{number}</div>
            </div>
          ))}
        </div>

        <div className="algorithm-info">
          <h3>How Bubble Sort Works</h3>
          <p>
            Bubble Sort compares two neighboring values. If the left value is
            bigger than the right value, they swap. After each pass, the largest
            unsorted value moves to its final position at the end.
          </p>

          <div className="complexity-row">
            <span>Time: O(n²)</span>
            <span>Space: O(1)</span>
          </div>
        </div>

        <div className="color-guide">
  <div className="guide-item">
    <div className="guide-color unsorted"></div>
    <span>Unsorted</span>
  </div>

  <div className="guide-item">
    <div className="guide-color comparing"></div>
    <span>Comparing</span>
  </div>

  <div className="guide-item">
    <div className="guide-color sorted"></div>
    <span>Sorted</span>
  </div>
</div>
      </div>
    </section>
  );
}

export default SortingVisualizer;
