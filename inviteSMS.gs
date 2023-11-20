function sendInvite()
{
  var project = SpreadsheetApp.getActiveSpreadsheet();
  var pokerInvite = project.getSheetByName("Poker Invite");

  var playerNameRange = "B3:B";
  var numPlayers = findNumNewPlayers(pokerInvite, playerNameRange);
  
  var playerNames = getPlayersToText(pokerInvite, numPlayers);
  var phoneNumbers = getPhoneNumbers(playerNames);
  var playerContact = getPlayerContact(playerNames, phoneNumbers);

  for (let i = 0; i < playerContact.length; i ++)
  {
    var playerName = playerContact[i][0];
    var playerNumber = playerContact[i][1];

    var inviteMessage = generateInvite(playerName);

    sendASMS(playerNumber, inviteMessage);
  }

  uncheckInviteBoxes(pokerInvite, numPlayers);
}

function uncheckInviteBoxes(sheet, numPlayers)
{
  for (let i = 0; i < numPlayers; i ++)
  {
    var checkBoxCell = sheet.getRange("E" + (3 + i));
    checkBoxCell.setValue("FALSE");
  }
}

function generateInvite(name) 
{
  return `
    👋 Hey ${name}!\n\n🃏 This is the automated text service for the Degenerate Poker League, and there's a poker game tonight! If you're down to play, shoot Kyle a text at 204-509-1038.\n\n🎉 See you at the table!
  `;
}

function addCheckBox(sheet, cell)
{
  var checkBox = sheet.insertCheckBox(cell);
  checkBox.setValue("false");
}

function getPlayersToText(sheet, numPlayers)
{
  var playersToText = [];

  for (var i = 0; i < numPlayers; i ++ ) 
  {
    let cell = sheet.getRange("E" + (3 + i));
    let text = cell.getValue();
    let playerToTextCell = sheet.getRange("B" + (3 + i));
    
    if (text)
    {
      let playerToText = playerToTextCell.getValue();
      playersToText.push(playerToText)
    }
  }

  return playersToText
}
