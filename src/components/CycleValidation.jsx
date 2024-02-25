import React from 'react';

function CycleValidation({ sheetDB }) {
  const findCycle = (visited, stack, i, j) => {
    if (visited[i][j] && stack[i][j]) {
      return true;
    }

    visited[i][j] = true;
    stack[i][j] = true;

    let cell = sheetDB[i][j];
    if (cell.formula) {
      let [row, col] = extractCell(cell.formula);
      if (findCycle(visited, stack, row, col)) {
        return true;
      }
    }

    stack[i][j] = false;
    return false;
  };

  const extractCell = (formula) => {
    // Parse formula to extract cell reference
    return [0, 0]; // Placeholder, replace with actual logic
  };

  const handleCycleCheck = () => {
    let cycleFound = false;
    let visited = Array(sheetDB.length)
      .fill()
      .map(() => Array(sheetDB[0].length).fill(false));
    let stack = Array(sheetDB.length)
      .fill()
      .map(() => Array(sheetDB[0].length).fill(false));

    for (let i = 0; i < sheetDB.length; i++) {
      for (let j = 0; j < sheetDB[0].length; j++) {
        if (!visited[i][j]) {
          if (findCycle(visited, stack, i, j)) {
            cycleFound = true;
            break;
          }
        }
      }
      if (cycleFound) break;
    }

    if (cycleFound) {
      alert('Cycle found!');
    } else {
      alert('No cycle found.');
    }
  };

  return (
    <div className="page-action" onClick={handleCycleCheck}>
      Cycle Check
    </div>
  );
}

export default CycleValidation;
