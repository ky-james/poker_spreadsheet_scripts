function addNewPlayersToAllTimeStats(project, names)
{
  var allTimeStatsSheet = project.getSheetByName("All Time Statistics");
  var nameCol = "B";
  var startingRow = 3;
  var numExistingRows = getNumExistingRows(allTimeStatsSheet, nameCol, startingRow);

  // deleting all name rows 
  deleteRows(allTimeStatsSheet, numExistingRows, startingRow);

  // inserting new rows
  var uniqueNames = names;
  var numNames = uniqueNames.length;
  insertNewRows(allTimeStatsSheet, numNames, 2);

  // formating data entries
  var copyLightRange = "AN1:BX1";
  var copyDarkRange = "BZ1:DJ1";
  var leftColumnBound = "AL";
  var rowUpperBound = 3 + numNames;

  formatDataEntries(allTimeStatsSheet, copyLightRange, copyDarkRange, startingRow, leftColumnBound, rowUpperBound);

  // write player names
  var allTimeCashGameNameRange = "B3:B" + startingRow + numNames;
  var allTimeTournamentNameRange = "M3:M" + startingRow + numNames;
  var allTimeNameRange = "AC3:AC" + startingRow + numNames;
  writePlayerNames(allTimeStatsSheet, uniqueNames, allTimeCashGameNameRange, allTimeTournamentNameRange, allTimeNameRange);

  // writing data entry formulas
  writeCashGameFormulas(allTimeStatsSheet, numNames, startingRow);
  writeTournamentFormulas(allTimeStatsSheet, numNames, startingRow);
  writeAllTimeFormulas(allTimeStatsSheet, numNames, startingRow);

}

function writeAllTimeFormulas(sheet, num, startRow)
{
  for (var row = startRow; row < (num + startRow); row ++)
  {
    var gamesPlayedCell = sheet.getRange("AD" + row);
    var averagePlayersPlayingCell = sheet.getRange("AE" + row);
    var buyInCell = sheet.getRange("AF" + row);
    var buyBackCell = sheet.getRange("AG" + row);
    var totalMoneyInCell = sheet.getRange("AH" + row);
    var totalMoneyOutCell = sheet.getRange("AI" + row);
    var winningsCell = sheet.getRange("AJ" + row);
    var winningsPerGameCell = sheet.getRange("AK" + row);
    var returnCell = sheet.getRange("AL" + row);

    gamesPlayedCell.setFormula("= C" + row + "+ N" + row);
    averagePlayersPlayingCell.setFormula("=iferror((((D" + row + "* C" + row + ") + (O" + row + "* " + "N" + row + ")) / (AD" + row + ")), 0)");
    buyInCell.setFormula("=E" + row + "+ U" + row);
    buyBackCell.setFormula("=F" + row + "+ V" + row);
    totalMoneyInCell.setFormula("=G" + row + "+ W" + row);
    totalMoneyOutCell.setFormula("=H" + row + "+ X" + row);
    winningsCell.setFormula("=I" + row + " + Y" + row);
    winningsPerGameCell.setFormula("=iferror(AJ" + row + "/ AD" + row + ", 0)");
    returnCell.setFormula("=iferror(AJ" + row + "/ AH" + row + ", 0)");
  }

  var gamesPlayedFooterCell = sheet.getRange("AD" + row);
  var buyInFooterCell = sheet.getRange("AF" + row);
  var buyBackFooterCell = sheet.getRange("AG" + row);
  var totalMoneyInFooterCell = sheet.getRange("AH" + row);
  var totalMoneyOutFooterCell = sheet.getRange("AI" + row);
  var winningsFooterCell = sheet.getRange("AJ" + row);

  gamesPlayedFooterCell.setFormula("=sum(AD3:AD" + (startRow + num - 1) + ")");
  buyInFooterCell.setFormula("=sum(AF3:AF" + (startRow + num - 1) + ")");
  buyBackFooterCell.setFormula("=sum(AG3:AG" + (startRow + num - 1) + ")");
  totalMoneyInFooterCell.setFormula("=sum(AH3:AH" + (startRow + num - 1) + ")");
  totalMoneyOutFooterCell.setFormula("=sum(AI3:AI" + (startRow + num - 1) + ")");
  winningsFooterCell.setFormula("=sum(AJ3:AJ" + (startRow + num - 1) + ")");
}

function writeTournamentFormulas(sheet, num, startRow)
{
  // writing data entry formulas
  for (var row = startRow; row < num + startRow; row ++)
  {
    var tournamentsPlayedCell = sheet.getRange("N" + row);
    var avgPlayersPlayingCell = sheet.getRange("O" + row);
    var winsCell = sheet.getRange("P" + row);
    var winPercentageCell = sheet.getRange("Q" + row);
    var topThreesCell = sheet.getRange("R" + row);
    var topThreesPercentageCell = sheet.getRange("S" + row);
    var averagePlacementCell = sheet.getRange("T" + row);
    var buyInCell = sheet.getRange("U" + row);
    var buyBackCell = sheet.getRange("V" + row);
    var totalMoneyInCell = sheet.getRange("W"+ row);
    var prizeCell = sheet.getRange("X" + row);
    var winningsCell = sheet.getRange("Y" + row);
    var winningsPerGameCell = sheet.getRange("Z" + row);
    var returnCell = sheet.getRange("AA" + + row);

    tournamentsPlayedCell.setFormula("=countif('Tournament Summaries'!E:E, M" + row + ")");
    avgPlayersPlayingCell.setFormula("=iferror(sumif('Tournament Summaries'!E:E, M" + row + ",'Tournament Summaries'!F:F)/N" + row + ", 0)");
    winsCell.setFormula("=countifs('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!J:J, 1)");
    winPercentageCell.setFormula("=iferror(P" + row + "/N" + row + ", 0)");
    topThreesCell.setFormula("=countifs('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!J:J, 1) + countifs('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!J:J, 2) + countifs('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!J:J, 3)");
    topThreesPercentageCell.setFormula("=iferror(R" + row + "/N" + row + ", 0)");
    averagePlacementCell.setFormula("=iferror(averageifs('Tournament Summaries'!J:J, 'Tournament Summaries'!E:E, M" + row + "), 0)");
    buyInCell.setFormula("=sumif('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!G:G)");
    buyBackCell.setFormula("=sumif('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!H:H)");
    totalMoneyInCell.setFormula("=sumif('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!I:I)");
    prizeCell.setFormula("=sumif('Tournament Summaries'!E:E, M" + row + ", 'Tournament Summaries'!K:K)");
    winningsCell.setFormula("=X" + row + "- W" + row);
    winningsPerGameCell.setFormula("=iferror(Y" + row + "/N" + row + ", 0)");
    returnCell.setFormula("=iferror(Y" + row + "/W" + row + ", 0)");
  }

  // writing footer formulas
  var tournamentsPlayedFooterCell = sheet.getRange("N" + row);
  var winsFooterCell = sheet.getRange("P" + row);
  var topThreesFooterCell = sheet.getRange("R" + row);
  var buyInFooterCell = sheet.getRange("U" + row);
  var buyBackFooterCell = sheet.getRange("V" + row);
  var totalMoneyInFooterCell = sheet.getRange("W" + row);
  var prizeFooterCell = sheet.getRange("X" + row);
  var winningsFooterCell = sheet.getRange("Y" + row);

  tournamentsPlayedFooterCell.setFormula("=sum(N3:N" + (startRow + num - 1) + ")");
  winsFooterCell.setFormula("=sum(P3:P" + (startRow + num - 1) + ")");
  topThreesFooterCell.setFormula("=sum(R3:R" + (startRow + num - 1) + ")");
  buyInFooterCell.setFormula("=sum(U3:U" + (startRow + num - 1) + ")");
  buyBackFooterCell.setFormula("=sum(V3:V" + (startRow + num - 1) + ")");
  totalMoneyInFooterCell.setFormula("=sum(W3:W" + (startRow + num - 1) + ")");
  prizeFooterCell.setFormula("=sum(X3:X" + (startRow + num - 1) + ")");
  winningsFooterCell.setFormula("=sum(Y3:Y" + (startRow + num - 1) + ")");
}

function writeCashGameFormulas(sheet, num, startRow)
{
  // writing data entry formulas
  for (var row = startRow; row < num + startRow; row ++)
  {
    var gamesPlayedCell = sheet.getRange("C" + row);
    var avgPlayersPlayingCell = sheet.getRange("D" + row);
    var buyInCell = sheet.getRange("E" + row);
    var buyBackCell = sheet.getRange("F" + row);
    var totalMoneyInCell = sheet.getRange("G"+ row);
    var totalMoneyOutCell = sheet.getRange("H" + row);
    var winningsCell = sheet.getRange("I" + row);
    var winningsPerGameCell = sheet.getRange("J" + row);
    var returnCell = sheet.getRange("K" + + row);

    gamesPlayedCell.setFormula("=countif('Cash Game Summaries'!E:E, B" + row + ")");
    avgPlayersPlayingCell.setFormula("=iferror(sumif('Cash Game Summaries'!E:E, B" + row + ",'Cash Game Summaries'!F:F)/C" + row + ", 0)");
    buyInCell.setFormula("=sumif('Cash Game Summaries'!E:E, B" + row + ", 'Cash Game Summaries'!G:G)");
    buyBackCell.setFormula("=sumif('Cash Game Summaries'!E:E, B" + row + ", 'Cash Game Summaries'!H:H)");
    totalMoneyInCell.setFormula("=sumif('Cash Game Summaries'!E:E, B" + row + ", 'Cash Game Summaries'!I:I)");
    totalMoneyOutCell.setFormula("=sumif('Cash Game Summaries'!E:E, B" + row + ", 'Cash Game Summaries'!J:J)");
    winningsCell.setFormula("=H" + row + "- G" + row);
    winningsPerGameCell.setFormula("=iferror(I" + row + "/C" + row + ", 0)");
    returnCell.setFormula("=iferror(I" + row + "/G" + row + ", 0)");
  }
  
  // writing footers 
  var gamesPlayedFooterCell = sheet.getRange("C" + row);
  var buyInFooterCell = sheet.getRange("E" + row);
  var buyBackFooterCell = sheet.getRange("F" + row);
  var totalMoneyInFooterCell = sheet.getRange("G"+ row);
  var totalMoneyOutFooterCell = sheet.getRange("H" + row);
  var winningsFooterCell = sheet.getRange("I" + row);

  gamesPlayedFooterCell.setFormula("=sum(C3:C" + (startRow + num - 1) + ")");
  buyInFooterCell.setFormula("=sum(E3:E" + (startRow + num - 1) + ")");
  buyBackFooterCell.setFormula("=sum(F3:F" + (startRow + num - 1) + ")");
  totalMoneyInFooterCell.setFormula("=sum(G3:G" + (startRow + num - 1) + ")");
  totalMoneyOutFooterCell.setFormula("=sum(H3:H" + (startRow + num - 1) + ")");
  winningsFooterCell.setFormula("=sum(I3:I" + (startRow + num - 1) + ")");
}

function getAllTimeStatsNames(project)
{
  var allTimeStats = project.getSheetByName("All Time Statistics");
  var nameCol = "B3:B";
  var nameRange = allTimeStats.getRange(nameCol);
  var nameValues = nameRange.getValues().map((nestedArray) => nestedArray[0]);
  var names = nameValues.filter(function(name)
  {
    return name != "" && name != "SUMMATION:";
  });

  return names;
}

function doWeNeedToAddPlayers(newGamePlayers, existingPlayers)
{
  for (var i = 0; i < newGamePlayers.length; i++)
  {
    var player = newGamePlayers[i];

    if (existingPlayers.indexOf(player) == -1)
    {
      return true;
    }
  }
  return false;
}

function getUniqueNames(newPlayerNames, existingPlayers)
{
  var allNames = newPlayerNames.concat(existingPlayers);

  var uniqueNames = [];

  for (var i = 0; i < allNames.length; i++) {
    var name = allNames[i];

    if (uniqueNames.indexOf(name) == -1) {
      uniqueNames.push(name);
    }
  }

  return uniqueNames;
}

function writePlayerNames(sheet, names, cashGameRange, tournamentNameRange, allTimeNameRange)
{
  var cashGameCells = sheet.getRange(cashGameRange);
  var tournamentCells = sheet.getRange(tournamentNameRange);
  var allTimeCells = sheet.getRange(allTimeNameRange);

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    
    // Write the name to the corresponding cell in each range.
    cashGameCells.getCell(i + 1, 1).setValue(name);
    tournamentCells.getCell(i + 1, 1).setValue(name);
    allTimeCells.getCell(i + 1, 1).setValue(name);
  }
}
