import React, { useState, useEffect } from 'react';

function CellProperties({ selectedCell, handleCellChange }) {
  const [cellProperties, setCellProperties] = useState(null);

  useEffect(() => {
    if (selectedCell) {
      setCellProperties(selectedCell.cell);
    }
  }, [selectedCell]);

  const handleBold = () => {
    if (cellProperties) {
      let bold = !cellProperties.bold;
      setCellProperties({ ...cellProperties, bold: bold });
      handleCellChange(selectedCell.i, selectedCell.j, { ...cellProperties, bold: bold });
    }
  };

  const handleItalic = () => {
    if (cellProperties) {
      let italic = !cellProperties.italic;
      setCellProperties({ ...cellProperties, italic: italic });
      handleCellChange(selectedCell.i, selectedCell.j, { ...cellProperties, italic: italic });
    }
  };

  const handleUnderline = () => {
    if (cellProperties) {
      let underline = !cellProperties.underline;
      setCellProperties({ ...cellProperties, underline: underline });
      handleCellChange(selectedCell.i, selectedCell.j, { ...cellProperties, underline: underline });
    }
  };

  const handleFontColor = (color) => {
    if (cellProperties) {
      setCellProperties({ ...cellProperties, fontColor: color });
      handleCellChange(selectedCell.i, selectedCell.j, { ...cellProperties, fontColor: color });
    }
  };

  const handleBGColor = (color) => {
    if (cellProperties) {
      setCellProperties({ ...cellProperties, BGcolor: color });
      handleCellChange(selectedCell.i, selectedCell.j, { ...cellProperties, BGcolor: color });
    }
  };

  return (
    <div className="cellprop-actions-cont">
      <div className="cell-prop" onClick={handleBold}>
        <i className={`fas fa-bold ${cellProperties && cellProperties.bold ? 'active' : ''}`}></i>
      </div>
      <div className="cell-prop" onClick={handleItalic}>
        <i className={`fas fa-italic ${cellProperties && cellProperties.italic ? 'active' : ''}`}></i>
      </div>
      <div className="cell-prop" onClick={handleUnderline}>
        <i className={`fas fa-underline ${cellProperties && cellProperties.underline ? 'active' : ''}`}></i>
      </div>
      <div className="color-prop">
        <input
          type="color"
          onChange={(e) => handleFontColor(e.target.value)}
          value={cellProperties ? cellProperties.fontColor : '#000000'}
        />
      </div>
      <div className="color-prop">
        <input
          type="color"
          onChange={(e) => handleBGColor(e.target.value)}
          value={cellProperties ? cellProperties.BGcolor : '#000000'}
        />
      </div>
    </div>
  );
}

export default CellProperties;
