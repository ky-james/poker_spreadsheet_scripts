  const nameNumberDictionary = 
  {
    "Angus": "XXXXXXXXX",
    "Brady": "XXXXXXXXX",
    "Chris": "XXXXXXXXX",
    "Darius": "XXXXXXXXX",
    "Ethan": "XXXXXXXXX",
    "Evan": "XXXXXXXXX",
    "Hayden": "XXXXXXXXX",
    "Kyle": "XXXXXXXXX",
    "Marc": "XXXXXXXXX",
    "Noah": "XXXXXXXXX",
    "Owen": "XXXXXXXXX",
    "Phil": "XXXXXXXXX",
    "Simon": "XXXXXXXXX",
  };

function getPhoneNumbers(playerNames)
{
  const getValuesForNames = (playerNames, dictionary) => playerNames.map(name => dictionary[name]);
  var playerNumbers = getValuesForNames(playerNames, nameNumberDictionary);

  return playerNumbers;
}

function getPlayerContact(names, numbers)
{
  var playerContacts = [];

  for (var i = 0; i < names.length; i ++)
  {
    var playerContact = [names[i], numbers[i]];
    playerContacts.push(playerContact);
  }

  return playerContacts
}

function sendASMS(recipientPhoneNumber, messageBody)
{
  const accountSid = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  const authToken = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  const twilioPhoneNumber = 'XXXXXXXXX';

  // Twilio API endpoint for sending SMS
  const twilioApiUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  // Message details
  const encodedCredentials = Utilities.base64Encode(`${accountSid}:${authToken}`);
  const payload = {
    'To': recipientPhoneNumber,
    'From': twilioPhoneNumber,
    'Body': messageBody,
  };

  // Sending the HTTP request to Twilio API
  const options = {
    'method': 'post',
    'headers': {
      'Authorization': 'Basic ' + encodedCredentials,
    },
    'payload': payload,
  };

  const response = UrlFetchApp.fetch(twilioApiUrl, options);
  const responseData = JSON.parse(response.getContentText());

  return responseData;
}

