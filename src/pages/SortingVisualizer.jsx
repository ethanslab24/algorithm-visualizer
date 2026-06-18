import { useEffect, useState } from "react";

function SortingVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(500);
  const [isRunning, setIsRunning] = useState(false);
  //Bubble sort states
  const [currentlyComparing, setCurrentlyComparing] = useState([0, 1]);
  const [isSorted, setIsSorted] = useState(false);

  //Selection sort states
  const [minimumIndex, setMinimumIndex] = useState(0);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [currentIndexBeingChecked, setCurrentIndexBeingChecked] = useState(1);

  //Insertion sort states
  const [activeIndex, setActiveIndex] = useState(1);
  const [comparingIndex, setComparingIndex] = useState(0);
  const [insertionSortedBoundary, setInsertionSortedBoundary] = useState(1);

  //merge sort visualizer
  const [mergeSteps, setMergeSteps] = useState([]);
  const [currentMergeStep, setCurrentMergeStep] = useState(0);

  function generateRandomArray() {
    const nums = [];

    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * 100) + 1;

      nums.push(randomNumber);
    }

    return nums;
  }

  function handleStep() {
    if (selectedAlgorithm === "bubble") {
      bubbleSortStep();
    }

    if (selectedAlgorithm === "selection") {
      selectionSortStep();
    }

    if (selectedAlgorithm === "insertion") {
      insertionSortStep();
    }

    if (selectedAlgorithm === "merge") {
      if (currentMergeStep < mergeSteps.length - 1) {
        setCurrentMergeStep(currentMergeStep + 1);
      } else {
        setIsSorted(true);
      }
    }
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

  function bubbleSortStep() {
    const leftIndex = currentlyComparing[0];
    const rightIndex = currentlyComparing[1];

    if (isSorted) return;

    if (array[currentlyComparing[0]] > array[currentlyComparing[1]]) {
      swap(leftIndex, rightIndex);
    }

    nextComparison();
  }

  function selectionSortStep() {
    if (isSorted) return;

    if (currentIndexBeingChecked < array.length) {
      if (array[minimumIndex] > array[currentIndexBeingChecked]) {
        setMinimumIndex(currentIndexBeingChecked);
      }

      setCurrentIndexBeingChecked(currentIndexBeingChecked + 1);
    } else {
      swap(currentStartIndex, minimumIndex);

      const nextStartIndex = currentStartIndex + 1;

      if (nextStartIndex >= array.length - 1) {
        setIsSorted(true);
      }

      setCurrentStartIndex(nextStartIndex);
      setMinimumIndex(nextStartIndex);
      setCurrentIndexBeingChecked(nextStartIndex + 1);
    }
  }

  function insertionSortStep() {
    if (isSorted) return;

    if (activeIndex >= array.length) {
      setIsSorted(true);
      return;
    }

    if (comparingIndex >= 0 && array[comparingIndex] > array[activeIndex]) {
      swap(comparingIndex, activeIndex);
      setActiveIndex(comparingIndex);
      setComparingIndex(comparingIndex - 1);
    } else {
      const nextActiveIndex = activeIndex + 1;

      if (nextActiveIndex >= array.length) {
        setIsSorted(true);
        return;
      }

      setActiveIndex(nextActiveIndex);
      setComparingIndex(nextActiveIndex - 1);
      setInsertionSortedBoundary(nextActiveIndex);
    }
  }
  function resetArray() {
    const newArray = generateRandomArray();

    setArray(newArray);
    setSortedBoundary(newArray.length - 1);
    setCurrentlyComparing([0, 1]);
    setCurrentStartIndex(0);
    setMinimumIndex(0);
    setCurrentIndexBeingChecked(1);
    setComparingIndex(0);
    setInsertionSortedBoundary(1);
    setActiveIndex(1);
    setCurrentMergeStep(0);
    setIsRunning(false);
    setIsSorted(false);

    if (selectedAlgorithm === "merge") {
      setMergeSteps(generateMergeSteps(newArray));
    } else {
      setMergeSteps([]);
    }
  }

  useEffect(() => {
    if (!isRunning || isSorted) return;
    const delay = 1100 - speed * 100;
    const intervalId = setInterval(() => {
      handleStep();
    }, delay);

    return () => clearInterval(intervalId);
  }, [
    isRunning,
    isSorted,
    array,
    currentlyComparing,
    sortedBoundary,
    speed,
    selectedAlgorithm,
    minimumIndex,
    currentStartIndex,
    currentIndexBeingChecked,
    activeIndex,
    comparingIndex,
    insertionSortedBoundary,
    mergeSteps,
    currentMergeStep,
  ]);

  function getBarColor(index) {
    if (isSorted) return "purple";

    if (selectedAlgorithm === "bubble") {
      if (index > sortedBoundary) return "purple";
      if (currentlyComparing.includes(index)) return "green";
      return "steelblue";
    }

    if (selectedAlgorithm === "selection") {
      if (index < currentStartIndex) return "purple";
      if (index === minimumIndex) return "red";
      if (index === currentIndexBeingChecked) return "green";
      return "steelblue";
    }

    if (selectedAlgorithm === "insertion") {
      if (index === activeIndex) return "green";
      if (index === comparingIndex) return "red";
      if (index <= insertionSortedBoundary) return "purple";
      return "steelblue";
    }

    return "steelblue";
  }

  const leftValue = array[currentlyComparing[0]];
  const rightValue = array[currentlyComparing[1]];

  const algorithmDetails = {
    bubble: {
      title: "How Bubble Sort Works",
      description:
        "Bubble Sort compares neighboring values. If the left value is bigger than the right value, they swap. After each pass, the largest unsorted value moves to its final position at the end.",
      time: "O(n²)",
      space: "O(1)",
    },
    selection: {
      title: "How Selection Sort Works",
      description:
        "Selection Sort searches the unsorted section for the smallest value. After finding it, the algorithm swaps it into the first unsorted position. Then the sorted section grows from left to right.",
      time: "O(n²)",
      space: "O(1)",
    },
    insertion: {
      title: "How Insertion Sort Works",
      description:
        "Insertion Sort builds a sorted section from left to right. It takes the next value and moves it left until it reaches the correct position.",
      time: "O(n²)",
      space: "O(1)",
    },
    merge: {
      title: "How Merge Sort Works",
      description:
        "Merge Sort splits the array into smaller halves until each group has one value. Then it merges the groups back together in sorted order.",
      time: "O(n log n)",
      space: "O(n)",
    },
  };

  const currentAlgorithmInfo = algorithmDetails[selectedAlgorithm];

  function mergeSort(array) {
    if (array.length <= 1) {
      return array;
    }

    const mid = Math.floor(array.length / 2);

    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return merge(sortedLeft, sortedRight);
  }

  function merge(left, right) {
    const merged = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        merged.push(left[leftIndex]);
        leftIndex++;
      } else {
        merged.push(right[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      merged.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      merged.push(right[rightIndex]);
      rightIndex++;
    }

    return merged;
  }

  function getStatusText() {
    if (isSorted) {
      return "Array Sorted!";
    }

    if (selectedAlgorithm === "bubble") {
      const left = array[currentlyComparing[0]];
      const right = array[currentlyComparing[1]];

      return `Comparing ${left ?? "-"} and ${right ?? "-"}`;
    }

    if (selectedAlgorithm === "selection") {
      const minimum = array[minimumIndex];
      const checking = array[currentIndexBeingChecked];

      return `Current minimum: ${minimum ?? "-"} | Checking: ${checking ?? "-"}`;
    }

    if (selectedAlgorithm === "insertion") {
      const active = array[activeIndex];
      const compared = array[comparingIndex];

      return `Inserting ${active ?? "-"} | Comparing against ${compared ?? "-"}`;
    }

    if (selectedAlgorithm === "merge") {
      if (mergeSteps.length === 0) {
        return "Ready to begin Merge Sort";
      }

      const halfway = Math.ceil(mergeSteps.length / 2);

      if (currentMergeStep < halfway) {
        return `Splitting arrays`;
      }

      return `Merging arrays`;
    }

    return "";
  }

  function generateMergeSteps(array) {
    const steps = [];

    steps.push([array]);

    function splitLevel(groups) {
      const nextGroups = [];

      let didSplit = false;

      for (const group of groups) {
        if (group.length <= 1) {
          nextGroups.push(group);
        } else {
          const mid = Math.floor(group.length / 2);
          const left = group.slice(0, mid);
          const right = group.slice(mid);

          nextGroups.push(left);
          nextGroups.push(right);
          didSplit = true;
        }
      }

      if (didSplit) {
        steps.push(nextGroups);
        splitLevel(nextGroups);
      }
    }

    splitLevel([array]);

    function mergeLevel(groups) {
      if (groups.length === 1) return;

      const nextGroups = [];

      for (let i = 0; i < groups.length; i += 2) {
        if (i + 1 < groups.length) {
          nextGroups.push(merge(groups[i], groups[i + 1]));
        } else {
          nextGroups.push(groups[i]);
        }
      }

      steps.push(nextGroups);
      mergeLevel(nextGroups);
    }

    const smallestGroups = steps[steps.length - 1];
    mergeLevel(smallestGroups);

    return steps;
  }

  return (
    <section className="sorting-page">
      <div className="visualizer-card">
        <div className="visualizer-header">
          <div>
            <h2>Algorithm Visualizer</h2>
            <p>
              Visualize how different sorting algorithms organize data step by
              step.
            </p>
          </div>

          <div className="status-pill">{isSorted ? "Sorted" : "Sorting"}</div>
        </div>

        <div className="controls">
          <button onClick={handleStep} disabled={isSorted}>
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
              onChange={(e) => {
                const algorithm = e.target.value;
                setSelectedAlgorithm(algorithm);
                resetArray();

                if (algorithm === "merge") {
                  const newArray = generateRandomArray();
                  setArray(newArray);
                  setMergeSteps(generateMergeSteps(newArray));
                  setCurrentMergeStep(0);
                }
              }}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="merge">Merge Sort</option>
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

        <div className="status-text">{getStatusText()}</div>

        <div className="array-container">
          {selectedAlgorithm === "merge" && mergeSteps.length > 0 ? (
            <div className="merge-groups">
              {mergeSteps[currentMergeStep].map((group, groupIndex) => (
                <div className="merge-group" key={groupIndex}>
                  {group.map((number, index) => (
                    <div className="merge-value" key={index}>
                      {number}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            array.map((number, index) => (
              <div className="bar-group" key={index}>
                <div
                  className="array-bar"
                  style={{
                    height: `${number * 3}px`,
                    backgroundColor: getBarColor(index),
                  }}
                ></div>

                <div className="bar-value">{number}</div>
              </div>
            ))
          )}
        </div>

        <div className="algorithm-info">
          <h3>{currentAlgorithmInfo.title}</h3>
          <p>{currentAlgorithmInfo.description}</p>

          <div className="complexity-row">
            <span>Time: {currentAlgorithmInfo.time}</span>
            <span>Space: {currentAlgorithmInfo.space}</span>
          </div>
        </div>

        {selectedAlgorithm !== "merge" && (
          <div className="color-guide">
            <div className="guide-item">
              <div className="guide-color unsorted"></div>
              <span>Unsorted</span>
            </div>

            {selectedAlgorithm === "bubble" && (
              <div className="guide-item">
                <div className="guide-color comparing"></div>
                <span>Comparing</span>
              </div>
            )}

            {selectedAlgorithm === "selection" && (
              <>
                <div className="guide-item">
                  <div className="guide-color comparing"></div>
                  <span>Being checked</span>
                </div>

                <div className="guide-item">
                  <div className="guide-color checking"></div>
                  <span>Current minimum</span>
                </div>
              </>
            )}

            {selectedAlgorithm === "insertion" && (
              <>
                <div className="guide-item">
                  <div className="guide-color comparing"></div>
                  <span>Value being inserted</span>
                </div>

                <div className="guide-item">
                  <div className="guide-color checking"></div>
                  <span>Compared value</span>
                </div>
              </>
            )}

            <div className="guide-item">
              <div className="guide-color sorted"></div>
              <span>Sorted</span>
            </div>
          </div>
        )}
        {selectedAlgorithm === "merge" && (
          <div className="color-guide">
            <div className="guide-item">
              <span>Each box shows one split or merged group.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SortingVisualizer;
