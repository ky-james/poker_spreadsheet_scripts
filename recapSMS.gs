function createRecapSMSTrigger()
{ 
  var sendDate = createSendDate();

  ScriptApp.newTrigger('sendAllRecapSMS')
  .timeBased()
  .at(sendDate)
  .create();
}

function sendAllRecapSMS()
{
  var playerNames = getPlayerNames();
  var phoneNumbers = getPhoneNumbers(playerNames);
  var playerContact = getPlayerContact(playerNames, phoneNumbers); // of form [player, number]

  var gameInfo = getGameInfo();
  var gameRecapText = createGameInfoText(gameInfo);

  for (let i = 0; i < gameInfo[2]; i++)
  {
    let player = playerContact[i];
    let name = player[0];
    let number = player[1];
    let winnings = getPlayerWinnings(name, gameInfo);

    let personalizedTextMessage = createPersonalizedTextMessage(gameRecapText, winnings);

    sendASMS(number, personalizedTextMessage);
  }
}

function createPersonalizedTextMessage(text, winnings)
{
  if (winnings > 0)
  {
    text + "\n\nYour winnings of " + formatWinnings(winnings).slice(1) + " will be sent to you via e-transfer 🏦";

  }

  else
  {
    text + "\n\nPlease e-transfer Kyle " + formatWinnings(-1 * winnings).slice(1) + " at (204)509-1038";
  }

  return text + "\nThank you for playing! 🎉";
}

function getPlayerWinnings(name, gameInfo)
{
  for (let i = 0; i < gameInfo[2]; i ++)
  {
    let currName = gameInfo[4][i][0][0];
    if (name === currName)
    {
      return gameInfo[4][i][1];
    }
  }
}

function createGameInfoText(gameInfo)
{
  var textBaseInfo = "🃏 DPL Game Recap 🃏\n\n";
  textBaseInfo += "📅 Game Number: " + gameInfo[0] + "\n";
  textBaseInfo += "📍 Location: " + gameInfo[1] + "\n";
  textBaseInfo += "👥 Players Playing: " + gameInfo[2] + "\n";
  textBaseInfo += "💰 Total Money on Table: $" + gameInfo[3] + "\n\n";

  const placementDict = 
  {
  0: "🥇 ",
  1: "🥈 ",
  2: "🥉 ",
  3: "4. ",
  4: "5. ",
  5: "6. ",
  6: "7. ",
  7: "8. ",
  8: "9. ",
  9: "10. ",
  10: "11. ",
  11: "12. ",
  12: "13. ",
  13: "14. ",
  14: "15. ",
  15: "16. ",
  16: "17. ",
  17: "18. ",
  18: "19. ",
  19: "20. ",
  };

  for (let i = 0; i < gameInfo[2]; i ++)
  {
    var winningsString = formatWinnings(gameInfo[4][i][1]);
    textBaseInfo += placementDict[i] +  gameInfo[4][i][0] + " (" + winningsString + ")\n";
  }

  return textBaseInfo;
}

function formatWinnings(amount) 
{
  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  var returnVal = formattedAmount.startsWith('-') ? formattedAmount : `+${formattedAmount}`;

  return returnVal;
}

function getGameInfo()
{
  var project = SpreadsheetApp.getActiveSpreadsheet();
  var cashGameSummaries = project.getSheetByName("Cash Game Summaries");
  var gameNumRange = "B3:B25";

  var gameNumber = cashGameSummaries.getRange("C3").getValue();
  var location = cashGameSummaries.getRange("D3").getValue();
  var numPlayers = findNumNewPlayers(cashGameSummaries, gameNumRange);
  var playerNames = cashGameSummaries.getRange("E3:E" + (2 + numPlayers)).getValues();
  var playerWinnings = cashGameSummaries.getRange("K3:K" + (2 + numPlayers)).getValues();
  var playerWinningsList = createPlayerWinnings(playerNames, playerWinnings);
  var moneyOnTable = cashGameSummaries.getRange("I" + (3 + numPlayers)).getValue();

  return [gameNumber, location, numPlayers, moneyOnTable, playerWinningsList];
}

function createPlayerWinnings(playerNames, playerWinnings) 
{
  const playersData = playerNames.map((name, index) => {
    const winnings = Number(playerWinnings[index]);
    const roundedWinnings = isNaN(winnings) ? winnings : Number(winnings.toFixed(3));
    return [name, roundedWinnings];
  });

  // Sort the array based on roundedPlayerWinnings in descending order
  playersData.sort((a, b) => b[1] - a[1]);

  return playersData;
}

function getPlayerNames()
{
  var project = SpreadsheetApp.getActiveSpreadsheet();
  var cashGameSummaries = project.getSheetByName("Cash Game Summaries");
  var gameNumRange = "B3:B25";
  var numPlayers = findNumNewPlayers(cashGameSummaries, gameNumRange);
  var nameRange = "E3:E" + String(3 + numPlayers);
  var playerNames = getNewPlayers(cashGameSummaries, numPlayers, nameRange);

  return playerNames;
}

function createSendDate()
{
  // Get the current date and time
  var today = new Date();

  // Create a new Date object for tomorrow
  var sendDate = new Date(today);
  sendDate.setDate(today.getDate() + 1);

  // Set the time to noon (12:00:00)
  sendDate.setHours(12);
  sendDate.setMinutes(0);
  sendDate.setSeconds(0);

  return sendDate;
}
