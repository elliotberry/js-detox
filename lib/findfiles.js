const findFilesToChange = async function (filesArray) {
    let filesToChange = [];
    for await (f of filesArray) {
      let p = path.parse(f);
      let oldName = p.name;
      let newName = format(oldName);
      if (p.name !== newName) {
        filesToChange.push({ oldName: oldName, newName: newName });
      }
    }
    return filesToChange;
  };

  module.exports = findFilesToChange;