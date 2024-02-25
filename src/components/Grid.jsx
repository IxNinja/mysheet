import React from 'react';

function Grid({ rows, cols, sheetDB, handleCellChange, handleSelectedCell }) {
  const renderCells = () => {
    let cells = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let cell = sheetDB[i][j];
        cells.push(
          <div
            className="cell"
            key={`${i}-${j}`}
            onClick={() => handleSelectedCell(cell, i, j)}
            style={{
              border: '1px solid lightgrey',
              fontWeight: cell.bold ? 'bold' : 'normal',
              fontStyle: cell.italic ? 'italic' : 'normal',
              textDecoration: cell.underline ? 'underline' : 'none',
              fontSize: cell.fontSize + 'px',
              fontFamily: cell.fontFamily,
              color: cell.fontColor,
              backgroundColor: cell.BGcolor === '#000000' ? 'transparent' : cell.BGcolor,
              textAlign: cell.alignment,
            }}
            contentEditable={true}
            onBlur={(e) => handleBlur(e, i, j)}
          >
            {cell.value}
          </div>
        );
      }
    }
    return cells;
  };

  const handleBlur = (e, i, j) => {
    let value = e.target.innerText;
    handleCellChange(i, j, { ...sheetDB[i][j], value: value });
  };

  return <div className="grid">{renderCells()}</div>;
}

export default Grid;
