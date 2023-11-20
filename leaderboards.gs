function addNewPlayersToLeaderboards(project, names) 
{
  var leaderboardsSheet = project.getSheetByName("Leaderboards");
  var allTimeStatsSheet = project.getSheetByName("All Time Statistics");
  var rankingCols = ["B", "E", "H", "K", "N", "Q"];
  var nameCols = ["C", "F", "I", "L", "O", "R"];
  var statCols = ["D", "G", "J", "M", "P", "S"];
  var startingRow = 4;
  var numExistingRows = getNumExistingLeaderboardsRows(leaderboardsSheet, rankingCols[0], startingRow);

  // deleting existing data entries
  deleteRows(leaderboardsSheet, numExistingRows, startingRow);

  // inserting new rows
  var uniqueNames = names;
  var numNames = uniqueNames.length;
  insertNewRows(leaderboardsSheet, numNames, startingRow - 1);  

  // formatting data entries
  var copyLightRange = "U1:AL1";
  var copyDarkRange = "AN1:BE1";
  var leftColumnBound = "S";
  var rowUpperBound = startingRow + numNames;

  formatDataEntries(leaderboardsSheet, copyLightRange, copyDarkRange, startingRow, leftColumnBound, rowUpperBound);
  formatRankings(leaderboardsSheet, startingRow, numNames, rankingCols);

  // writing data entries
  writeRankings(leaderboardsSheet, startingRow, numNames, rankingCols);

  writeLeaderboardsGamesPlayedFormulas(leaderboardsSheet, startingRow, numNames, nameCols[0]);
  writeLeaderboardsMoneyInFormulas(leaderboardsSheet, startingRow, numNames, nameCols[1], statCols[1]);
  writeLeaderboardsMoneyOutFormulas(leaderboardsSheet, startingRow, numNames, nameCols[2], statCols[2]);
  writeLeaderboardsWinningsFormulas(leaderboardsSheet, startingRow, numNames, nameCols[3], statCols[3]);
  writeLeaderboardsWinningsPerGameFormulas(leaderboardsSheet, startingRow, numNames, nameCols[4], statCols[4]);
  writeLeaderboardsReturnFormulas(leaderboardsSheet, startingRow, numNames, nameCols[5], statCols[5]);
}

function writeLeaderboardsReturnFormulas(sheet, start, numNames, nameCol, statCol)
{
  var range = "AC3:AL" + (3 + numNames - 1);
  var nameCell = sheet.getRange(nameCol + start);
  var statCell = sheet.getRange(statCol + start);
  nameCell.setFormula("index(sort('All Time Statistics'!" + range + ", 10, FALSE), , 1)");
  statCell.setFormula("index(sort('All Time Statistics'!" + range + ", 10, FALSE), , 10)");
}

function writeLeaderboardsWinningsPerGameFormulas(sheet, start, numNames, nameCol, statCol)
{
  var range = "AC3:AL" + (3 + numNames - 1);
  var nameCell = sheet.getRange(nameCol + start);
  var statCell = sheet.getRange(statCol + start);
  nameCell.setFormula("index(sort('All Time Statistics'!" + range + ", 9, FALSE), , 1)");
  statCell.setFormula("index(sort('All Time Statistics'!" + range + ", 9, FALSE), , 9)");
}

function writeLeaderboardsWinningsFormulas(sheet, start, numNames, nameCol, statCol)
{
  var range = "AC3:AL" + (3 + numNames - 1);
  var nameCell = sheet.getRange(nameCol + start);
  var statCell = sheet.getRange(statCol + start);
  nameCell.setFormula("index(sort('All Time Statistics'!" + range + ", 8, FALSE), , 1)");
  statCell.setFormula("index(sort('All Time Statistics'!" + range + ", 8, FALSE), , 8)");
}

function writeLeaderboardsMoneyOutFormulas(sheet, start, numNames, nameCol, statCol)
{
  var range = "AC3:AL" + (3 + numNames - 1);
  var nameCell = sheet.getRange(nameCol + start);
  var statCell = sheet.getRange(statCol + start);
  nameCell.setFormula("index(sort('All Time Statistics'!" + range + ", 7, FALSE), , 1)");
  statCell.setFormula("index(sort('All Time Statistics'!" + range + ", 7, FALSE), , 7)");
}

function writeLeaderboardsMoneyInFormulas(sheet, start, numNames, nameCol, statCol)
{
  var range = "AC3:AL" + (3 + numNames - 1);
  var nameCell = sheet.getRange(nameCol + start);
  var statCell = sheet.getRange(statCol + start);
  nameCell.setFormula("index(sort('All Time Statistics'!" + range + ", 6, FALSE), , 1)");
  statCell.setFormula("index(sort('All Time Statistics'!" + range + ", 6, FALSE), , 6)")
}

function writeLeaderboardsGamesPlayedFormulas(sheet, start, numNames, nameCol)
{
  var range = "AC3:AD" + (3 + numNames - 1);
  var cell = sheet.getRange(nameCol + start);
  cell.setFormula("=sort('All Time Statistics'!" + range + ", 2, FALSE)");
}

function formatRankings(sheet, start, numNames, cols)
{
  var gold = "#ffd700";
  var silver = "#c0c0c0";
  var bronze = "#bd742b";

  for (var row = start; row < Math.min((start + numNames), (start + 3)); row ++)
  {
    for (var colIdx = 0; colIdx < cols.length; colIdx ++)
    {
      var col = cols[colIdx];
      var cell = sheet.getRange(col + row);

      if (row == start)
      {
        cell.setBackground(gold);
      }

      else if(row == start + 1)
      {
        cell.setBackground(silver);
      }

      else if (row == start + 2)
      {
        cell.setBackground(bronze);
      }
    }
  }
}

function writeRankings(sheet, start, numNames, cols)
{
  for (var i = 1; i < (numNames + 1); i++)
  {
    for (var j = 0; j < cols.length; j ++)
    {
      var cell = sheet.getRange(cols[j] + (start + i - 1));
      cell.setValue(i);
    }
  }
}

function getNumExistingLeaderboardsRows(sheet, rankingCol, start)
{
  var rankingCells = sheet.getRange(rankingCol + start + ":" + rankingCol).getValues();
  var numRows = 0;

  for (var row = 0; row < rankingCells.length; row ++)
  {
    var data = rankingCells[row][0];
    if (data != "")
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
