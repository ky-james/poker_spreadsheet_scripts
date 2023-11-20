function createNewCashGame()
{
  // retrieving sheets
  var project = SpreadsheetApp.getActiveSpreadsheet();
  var newGame = project.getSheetByName("New Game");
  var cashGameSummaries = project.getSheetByName("Cash Game Summaries");

  // retrieving new cash game formulas
  var newPlayerRange = "B3:B22";
  var numCashGamePlayers = findNumNewPlayers(newGame, newPlayerRange);
  var cashGamePlayers = getNewPlayers(newGame, numCashGamePlayers, newPlayerRange);
  var cashGameDate = newGame.getRange("C3").getValue();
  var cashGameLocation = newGame.getRange("D3").getValue();
  var cashGameGameNumber = getNewGameNumber(cashGameSummaries, "C");

  // inserting new rows
  insertNewRows(cashGameSummaries, numCashGamePlayers + 2, 1);

  // formatting headers and footers
  var footerRow = 3 + numCashGamePlayers;
  var cashGameCopyHeaderRange = "N1:X1";
  var cashGameCopyFooterRange = "AX1:BH1";
  var cashGamePasteHeaderRange = "B2:L2";
  var cashGamePasteFooterRange = "B" + footerRow + ":L" + footerRow;
  
  formatHeaderAndFooter(cashGameSummaries, cashGameCopyHeaderRange, cashGameCopyFooterRange, cashGamePasteHeaderRange, cashGamePasteFooterRange);
  cleanCashGameSummariesFormatting(cashGameSummaries);

  // formatting data entries
  var copyLightRange = "Z1:AJ1";
  var copyDarkRange = "AL1:AV1";
  var startRow = 3;
  var leftColumnBound = "L";
  var rowUpperBound = 3 + numCashGamePlayers;

  formatDataEntries(cashGameSummaries, copyLightRange, copyDarkRange, startRow, leftColumnBound, rowUpperBound);

  // writing data entry formulas
  var dateColumn = "B";
  var gameNumberColumn = "C";
  var locationColumn = "D";
  var playersPlayingColumn = "F";
  var playerColumn = "E";
  var buyInColumn = "G";
  var buyBackColumn = "H";
  var totalMoneyInColumn = "I";
  var totalMoneyOutColumn = "J";
  var winningsColumn = "K";
  var returnColumn = "L";

  // write formulas
  writeTotalMoneyInFormulas(cashGameSummaries, buyInColumn, buyBackColumn, totalMoneyInColumn, numCashGamePlayers);
  writeWinningsFormulas(cashGameSummaries, winningsColumn, totalMoneyInColumn, totalMoneyOutColumn, numCashGamePlayers);
  writeReturnFormulas(cashGameSummaries, returnColumn, winningsColumn, totalMoneyInColumn, numCashGamePlayers);
  writeFooterFormulas(cashGameSummaries, buyInColumn, buyBackColumn, totalMoneyInColumn, totalMoneyOutColumn, winningsColumn, numCashGamePlayers);
  writePlayersPlayingFooter(cashGameSummaries, playerColumn, numCashGamePlayers);
  writeGameInfo(cashGameSummaries, dateColumn, cashGameDate, gameNumberColumn, cashGameGameNumber, locationColumn, cashGameLocation, playersPlayingColumn, numCashGamePlayers, playerColumn, cashGamePlayers)

  // rewriting names in all time stats and leaderboards
  var allTimeStatsNames = getAllTimeStatsNames(project);
  var namesToAdd = getUniqueNames(cashGamePlayers, allTimeStatsNames).slice().sort();
  addNewPlayersToAllTimeStats(project, namesToAdd);
  addNewPlayersToLeaderboards(project, namesToAdd);

  // resetting the new cash game table
  clearNewGame(newGame, "B3:B22", "C3:D3");

  // creating the recap SMS trigger
  createRecapSMSTrigger()
}

function cleanCashGameSummariesFormatting(cashGameSummaries)
{
  var blankCopy = cashGameSummaries.getRange("N23:BH47");
  var blankPaste = cashGameSummaries.getRange("N2:BH26");
  blankCopy.copyTo(blankPaste, {formatOnly: false});
}

