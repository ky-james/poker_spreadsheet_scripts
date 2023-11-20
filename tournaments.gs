function createNewTournament()
{
  // retrieving sheets
  var project = SpreadsheetApp.getActiveSpreadsheet();
  var newGame = project.getSheetByName("New Game");
  var tournamentSummaries = project.getSheetByName("Tournament Summaries");

  // retrieving new cash game formulas
  var newPlayerNameRange = "F3:F22";
  var numTournamentPlayers = findNumNewPlayers(newGame, newPlayerNameRange);
  var tournamentPlayers = getNewPlayers(newGame, numTournamentPlayers, newPlayerNameRange);
  var tournamentDate = newGame.getRange("G3").getValue();
  var tournamentLocation = newGame.getRange("H3").getValue();
  var tournamentGameNumber = getNewGameNumber(tournamentSummaries, "C");

  // inserting new rows
  insertNewRows(tournamentSummaries, numTournamentPlayers + 2, 1);

  // formatting headers and footers
  var footerRow = 3 + numTournamentPlayers;
  var tournamentCopyHeaderRange = "O1:Z1";
  var tournamentCopyFooterRange = "BB1:BM1";
  var tournamentPasteHeaderRange = "B2:M2";
  var tournamentPasteFooterRange = "B" + footerRow + ":M" + footerRow;
  
  formatHeaderAndFooter(tournamentSummaries, tournamentCopyHeaderRange, tournamentCopyFooterRange, tournamentPasteHeaderRange, tournamentPasteFooterRange);
  cleantournamentSummariesFormatting(tournamentSummaries);

  // formatting data entries
  var copyLightRange = "AB1:AM1";
  var copyDarkRange = "AO1:AZ1";
  var startRow = 3;
  var leftColumnBound = "M";
  var rowUpperBound = 3 + numTournamentPlayers;

  formatDataEntries(tournamentSummaries, copyLightRange, copyDarkRange, startRow, leftColumnBound, rowUpperBound);

  // writing data entry formulas
  var dateColumn = "B";
  var gameNumberColumn = "C";
  var locationColumn = "D";
  var playerColumn = "E";
  var playersPlayingColumn = "F";
  var buyInColumn = "G";
  var buyBackColumn = "H";
  var totalMoneyInColumn = "I";
  var totalMoneyOutColumn = "K";
  var winningsColumn = "L";
  var returnColumn = "M";

  writeTotalMoneyInFormulas(tournamentSummaries, buyInColumn, buyBackColumn, totalMoneyInColumn, numTournamentPlayers);
  writeWinningsFormulas(tournamentSummaries, winningsColumn, totalMoneyInColumn, totalMoneyOutColumn, numTournamentPlayers);
  writeReturnFormulas(tournamentSummaries, returnColumn, winningsColumn, totalMoneyInColumn, numTournamentPlayers);
  writeFooterFormulas(tournamentSummaries, buyInColumn, buyBackColumn, totalMoneyInColumn, totalMoneyOutColumn, winningsColumn, numTournamentPlayers);
  writePlayersPlayingFooter(tournamentSummaries, playerColumn, numTournamentPlayers);
  writeGameInfo(tournamentSummaries, dateColumn, tournamentDate, gameNumberColumn, tournamentGameNumber, locationColumn, tournamentLocation, playersPlayingColumn, numTournamentPlayers, playerColumn, tournamentPlayers)

  // re-writing the all time stats and leaderboards
  var allTimeStatsNames = getAllTimeStatsNames(project);
  var namesToAdd = getUniqueNames(tournamentPlayers, allTimeStatsNames).slice().sort();
  addNewPlayersToAllTimeStats(project, namesToAdd);
  addNewPlayersToLeaderboards(project, namesToAdd);

  // resetting the new tournament table
  clearNewGame(newGame, "F3:F22", "G3:H3");
}

function cleantournamentSummariesFormatting(tournamentSummaries)
{
  var blankCopy = tournamentSummaries.getRange("N23:BM47");
  var blankPaste = tournamentSummaries.getRange("N2:BM26");
  blankCopy.copyTo(blankPaste, {formatOnly: false});
}
