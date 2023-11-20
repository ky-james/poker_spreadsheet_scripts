function findNumNewPlayers(newGame, nameRange)
{
  var newPlayerNameCol = newGame.getRange(nameRange);
  var newPlayerNames = newPlayerNameCol.getValues();
  var numNewPlayers = 0;

  for (var row = 0; row < newPlayerNames.length; row ++)
  {
    var cellContent = newPlayerNames[row][0];

    if (cellContent != "SUMMATION:" && cellContent != "" )
    {
      numNewPlayers += 1;
    }

    else
    {
      return numNewPlayers;
    }
  }
}

function getNewPlayers(newGame, numNewPlayers, nameRange)
{
  var newPlayerNameCol = newGame.getRange(nameRange);
  var newPlayerNames = newPlayerNameCol.getValues().map((nestedArray) => nestedArray[0]);
  newPlayerNames = newPlayerNames.slice(0, numNewPlayers);
  newPlayerNames = newPlayerNames.slice().sort();
  
  return newPlayerNames;
}

function getNewGameNumber(sheet, column)
{
  var gameNumCol = sheet.getRange(column + "2:" + column + sheet.getLastRow()).getValues();
  var currGameNumber = 0;
  
  for (var i = 0; i < gameNumCol.length; i++) {
    var cellValue = gameNumCol[i][0];
    
    if (!isNaN(cellValue) && Number(cellValue) % 1 === 0 && cellValue > currGameNumber) {
      currGameNumber = cellValue;
    }

    else if (cellValue == "")
    {
      return currGameNumber + 1;
    }
  }
  return currGameNumber + 1;
}

function insertNewRows(sheet, numRowsToInsert, insertAfter)
{
  for (var i = 0; i < numRowsToInsert; i ++)
  {
    sheet.insertRowAfter(insertAfter);
  }
}

function deleteRows(sheet, numRowsToDelete, deleteRow)
{
  for (var i = 0; i < numRowsToDelete; i ++)
  {
    sheet.deleteRow(deleteRow);
  }
}

function formatHeaderAndFooter(sheet, copyHeaderRange, copyFooterRange, pasteHeaderRange, pasteFooterRange)
{
  var copyHeader = sheet.getRange(copyHeaderRange);
  var copyFooter = sheet.getRange(copyFooterRange);
  var pasteHeader = sheet.getRange(pasteHeaderRange);
  var pasteFooter = sheet.getRange(pasteFooterRange);

  copyHeader.copyTo(pasteHeader, {formatOnly:false});
  copyFooter.copyTo(pasteFooter, {formatOnly:false});
}

function formatDataEntries(sheet, copyLightRange, copyDarkRange, startRow, leftColumnBound, rowUpperBound)
{
  var copyLight = sheet.getRange(copyLightRange);
  var copyDark = sheet.getRange(copyDarkRange);

  for (var row = startRow; row < rowUpperBound; row ++)
  {
    var pasteRange = sheet.getRange("B" + row + ":" + leftColumnBound + row);

    if (row % 2 != 0)
    {
      copyLight.copyTo(pasteRange);
    }

    else
    {
      copyDark.copyTo(pasteRange);
    }
  }
}

function writeTotalMoneyInFormulas(sheet, buyInCol, buyBackCol, totalMoneyInCol, numNewPlayers)
{
  for (var row = 3; row < (3 + numNewPlayers); row++)
  {
    var cell = sheet.getRange(totalMoneyInCol + row);
    cell.setFormula("=sum(" + buyInCol + row + "+" + buyBackCol + row + ")");
  }
}

function writeWinningsFormulas(sheet, winningsCol, totalMoneyInCol, totalMoneyOutCol, numNewPlayers)
{
  for (var row = 3; row < (3 + numNewPlayers); row++)
  {
    var cell = sheet.getRange(winningsCol + row);
    cell.setFormula("=(" + totalMoneyOutCol + row + "-" + totalMoneyInCol + row + ")");
  }
}

function writeReturnFormulas(sheet, returnCol, winningsCol, totalMoneyInCol, numNewPlayers)
{
  for (var row = 3; row < (3 + numNewPlayers); row++)
  {
    var cell = sheet.getRange(returnCol + row);
    cell.setFormula("=iferror((" + winningsCol + row + "/" + totalMoneyInCol + row + ")," + 0 + ")");
  }
}

function writePlayersPlayingFooter(sheet, playerCellCol, numNewPlayers)
{
  var playerCell = sheet.getRange(playerCellCol + (numNewPlayers + 3));
  playerCell.setFormula(numNewPlayers);
}

function writeFooterFormulas(sheet, buyInCellCol, buyBackCellCol, totalMoneyInCellCol, totalMoneyOutCellCol, winningsCellCol, numNewPlayers)
{
  // var playerCell = sheet.getRange(playerCellCol + (numNewPlayers + 3));
  var buyInCell = sheet.getRange(buyInCellCol + (numNewPlayers + 3));
  var buyBackCell = sheet.getRange(buyBackCellCol + (numNewPlayers + 3));
  var totalMoneyInCell = sheet.getRange(totalMoneyInCellCol + (numNewPlayers + 3));
  var totalMoneyOutCell = sheet.getRange(totalMoneyOutCellCol + (numNewPlayers + 3));
  var winningsCell = sheet.getRange(winningsCellCol + (numNewPlayers + 3));

  // playerCell.setFormula(numNewPlayers);
  buyInCell.setFormula("=sum(" + buyInCellCol + 3 + ":" + buyInCellCol + (3 + numNewPlayers -1) + ")");
  buyBackCell.setFormula("=sum(" + buyBackCellCol + 3 + ":" + buyBackCellCol + (3 + numNewPlayers -1) + ")");
  totalMoneyInCell.setFormula("=sum(" + totalMoneyInCellCol + 3 + ":" + totalMoneyInCellCol + (3 + numNewPlayers -1) + ")");
  totalMoneyOutCell.setFormula("=sum(" + totalMoneyOutCellCol + 3 + ":" + totalMoneyOutCellCol + (3 + numNewPlayers -1) + ")");
  winningsCell.setFormula("=sum(" + winningsCellCol + 3 + ":" + winningsCellCol + (3 + numNewPlayers -1) + ")");
}

function writeGameInfo(sheet, dateCol, date, gameNumberCol, gameNumber, locationCol, location, playersPlayingCol, numPlayers, playerNameCol, playerNames)
{
  for (var row = 3; row < playerNames.length + 3; row ++)
  {
    var nameIdx = row - 3;

    var dateCell = sheet.getRange(dateCol + row);
    var gameNumberCell = sheet.getRange(gameNumberCol + row);
    var locationCell = sheet.getRange(locationCol + row);
    var playersPlayingCell = sheet.getRange(playersPlayingCol + row);
    var playerNamecell = sheet.getRange(playerNameCol + row);

    dateCell.setValue(date);
    gameNumberCell.setValue(gameNumber);
    locationCell.setValue(location);
    playersPlayingCell.setValue(numPlayers);
    playerNamecell.setValue(playerNames[nameIdx]);
  }
}

function getNumExistingRows(sheet, col, startRow)
{
  var names = sheet.getRange(col + startRow + ":" + col).getValues();
  var numRows = 0;
  for (var i = 0; i < names.length; i ++)
  {
    var name = names[i][0];
    if (name != "" && name != "SUMMATION:")
    {
      numRows ++;
    }

    else
    {
      return numRows;
    }
  }
  return numRows;
}

function clearNewGame(sheet, nameRange, dateAndLocationRange)
{
  var nameCells = sheet.getRange(nameRange);
  var dateAndLocationCells = sheet.getRange(dateAndLocationRange);

  nameCells.clearContent();
  dateAndLocationCells.clearContent();
}










