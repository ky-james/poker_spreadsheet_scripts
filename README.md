# Poker Spreadsheet

## Origin Story
  This project originated from my friend group's shared passion for poker - a game that beautifully combines statistics, behavioral analysis, luck, and the thrill of bluffing friends. As we started playing more games, I started to notice a recurring issue of poor accounting leading to inaccurate payments. Recognizing the need for proper organization, I took it upon myself to create a comprehensive spreadsheet that tracks aspects of our poker games. Initially, the goal was to maintain records of our completed games, but quickly evolved as I realized the potential for statistical insights and general engineering. This idea was met with great enthusiasm among my friends, fostering competitiveness and a personal drive to further build the project and utilize the collected data.

## Project Framework
  This project is built on the infrastructure of Google's Cloud Platform. Leveraging the power of this platform, the project integrates a databased housed in Google Sheets, which provides a user-friendly interface for intuitive data input. The backbone of the system is a Google Apps Script written in JavaScript, which formats the Google Sheet and utilizes Twilio's API to send invitations to and recaps of games through SMS. A dedicated Google Cloud Project has been created with the hopes of eventually releasing the spreadsheet for free public use.

## Sheet Names and Content
#### Poker Invite
  The _Poker Invite_ sheet serves to manage player invitations. It contains a table listing all players who've played, each accompanied by a checkbox, and a "Send the Invite" button linked to a script. The script automates the process of sending SMS invitations to selected players, notifying them of the upcoming game.

#### Chip Denominations
  Within the _Chip Denomination_ sheet, users can view tables documenting the chip denominations and quantities of past games. This sheet requires manual entry and formatting, serving as a reference for chip configuration in the setup for future games.

#### New Game
  The _New Game_ sheet streamlines the process of entering a new game in the database. Two tables, accompanied by buttons linked to Google Apps Scripts, facilitate the automatic entry of game details. Users input the names of the players playing, date, and location, which are then added in _Cash Game Summaries_ or _Tournament Summaries_ sheet after the corresponding button is hit.

#### Cash Game Summaries
  Dedicated to recording details of each cash game, the _Cash Game Summaries_ sheet hosts individual tables for every recorded game. Information such as date, game number, player names, and location, are automatically filled, whereas buy in amount, buy back amount, and cash out amount must manually be entered for each player. The sheet uses Google Sheets formulas to calculate individual player winnings and return percentages, which are then added into the game summary.

#### Tournament Summaries
  Similar to the _Cash Game Summaries_, the _Tournament Summary_ sheet is designed for recording tournament details. It captures information such as date, tournament number, player names, and location are automatically entered, whereas buy-in amount, buy-back amount, placement, and prize money must manually be entered for each player. Calculations of individual player winnings and return percentages are performed using Google Sheets formulas, contributing to the overall game summary.

#### All Time Statistics 
 The _All Time Statistics_ sheet offers a comprehensive overview of player statistics, featuring three tables dedicated to Cash Games, Tournaments, and All Games. Each table provides detailed statistics for individual players, including the number of games played, average players per game, total buy in amount, buy back amount, money out, winnings, winnings per game, and return percentages. 

#### Leaderboards
  The _Leaderboards_ sheet includes six tables that rank players based on various criteria, offering insights into their performance. Rankings are provided for the number of games played, total buy-ins, total amount cashed out, winnings, winnings per game, and return percentages, creating a competitive yet informative aspect to the poker experience.

## Automated SMS Capabilities
  The standout feature of this spreadsheet lies in its ability to streamline communication with players through automated SMS messages. Currently, the project supports two types of text messages: an invitation to an upcoming game and a game recap. The recipients of invitations are managed through the dedicated _Poker Invite_ sheet, where the "Send the Invite" button triggers the SMS delivery. The game recap, on the other hand, is scheduled for noon the day after the game, allowing time for final adjustments to the game summary. The text message encapsulates a recap of each player's position and winnings, accompanied by personalized messages concerning the recipient's debts or winnings. Screenshots showcasing these two texts are below:
