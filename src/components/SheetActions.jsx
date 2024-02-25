import React from 'react';

function SheetActions({ rows, cols, setRows, setCols }) {
  const handleAddRow = () => {
    setRows(rows + 1);
  };

  const handleAddCol = () => {
    setCols(cols + 1);
  };

  return (
    <div className="sheet-actions-cont">
      <div className="sheet-add-icon" onClick={handleAddRow}>
        Add Row
      </div>
      <div className="sheet-add-icon" onClick={handleAddCol}>
        Add Col
      </div>
    </div>
  );
}

export default SheetActions;
