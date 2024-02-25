import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import FormulaBar from './components/FormulaBar';
import CellProperties from './components/CellProperties';
import SheetActions from './components/SheetActions';
import OpenSave from './components/OpenSave';
import CycleValidation from './components/CycleValidation';

function App() {
  const [rows, setRows] = useState(100);
  const [cols, setCols] = useState(26);
  const [sheetDB, setSheetDB] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [address, setAddress] = useState('A1');
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    createSheetDB(); // eslint-disable-next-line react-hooks/exhaustive-deps
    createGraphComponentMatrix(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createSheetDB = () => {
    let sheet = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let cellProp = {
          bold: false,
          italic: false,
          underline: false,
          alignment: 'left',
          fontFamily: 'monospace',
          fontSize: '14',
          fontColor: '#000000',
          BGcolor: '#000000',
          value: '',
          formula: '',
          children: [],
        };
        row.push(cellProp);
      }
      sheet.push(row);
    }
    setSheetDB(sheet);
  };

  const createGraphComponentMatrix = () => {
    let graphComponentMatrix = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push([]);
      }
      graphComponentMatrix.push(row);
    }
  };

  const handleSelectedCell = (cell, i, j) => {
    setSelectedCell({ cell, i, j });
    let address = String.fromCharCode(65 + j) + (i + 1);
    setAddress(address);
  };

  const handleCopy = () => {
    if (!selectedCell) return;
    setCopyData([selectedCell.cell]);
  };

  const handleCut = () => {
    if (!selectedCell) return;
    setCopyData([selectedCell.cell]);
    handleCellChange(selectedCell.i, selectedCell.j, {
      ...selectedCell.cell,
      value: '',
      formula: '',
    });
  };

  const handlePaste = () => {
    if (!selectedCell || copyData.length === 0) return;
    handleCellChange(selectedCell.i, selectedCell.j, copyData[0]);
  };

  const handleCellChange = (i, j, newCell) => {
    let newSheetDB = [...sheetDB];
    newSheetDB[i][j] = newCell;
    setSheetDB(newSheetDB);
  };

  return (
    <div className="App">
      <div className="page-actions-cont">
        <OpenSave sheetDB={sheetDB} setSheetDB={setSheetDB} />
        <button className="page-action" onClick={handleCopy}>
          Copy
        </button>
        <button className="page-action" onClick={handleCut}>
          Cut
        </button>
        <button className="page-action" onClick={handlePaste}>
          Paste
        </button>
      </div>
      <SheetActions rows={rows} cols={cols} setRows={setRows} setCols={setCols} />
      <CycleValidation sheetDB={sheetDB} />
      <div className="grid-cont">
        <Grid rows={rows} cols={cols} sheetDB={sheetDB} handleCellChange={handleCellChange} handleSelectedCell={handleSelectedCell} />
      </div>
      <FormulaBar address={address} selectedCell={selectedCell} handleCellChange={handleCellChange} />
      <CellProperties selectedCell={selectedCell} handleCellChange={handleCellChange} />
    </div>
  );
}

export default App;
