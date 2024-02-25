import React, { useState, useEffect } from 'react';

function FormulaBar({ address, selectedCell, handleCellChange }) {
  const [formula, setFormula] = useState('');

  useEffect(() => {
    if (selectedCell) {
      setFormula(selectedCell.cell.formula);
    }
  }, [selectedCell]);

  const handleChange = (e) => {
    setFormula(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCellChange(selectedCell.i, selectedCell.j, { ...selectedCell.cell, formula: formula });
    }
  };

  return (
    <div className="formula-actions-cont">
      <div className="address-bar">{address}</div>
      <input
        type="text"
        className="formula-bar"
        value={formula}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter formula..."
      />
    </div>
  );
}

export default FormulaBar;
