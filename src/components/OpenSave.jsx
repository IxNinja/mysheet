import React from 'react';

function OpenSave({ sheetDB, setSheetDB }) {
  const handleDownload = () => {
    let jsonData = JSON.stringify(sheetDB);
    let file = new Blob([jsonData], { type: 'application/json' });

    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'SheetData.json';
    a.click();
  };

  const handleUpload = (e) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      let contents = e.target.result;
      let parsedData = JSON.parse(contents);
      setSheetDB(parsedData);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="open-save">
      <label htmlFor="file-upload" className="page-action">
        Open
      </label>
      <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleUpload} />
      <div className="page-action" onClick={handleDownload}>
        Save
      </div>
    </div>
  );
}

export default OpenSave;
