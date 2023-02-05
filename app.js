const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
app.use(express.json());
let db = null;
const dbPath = path.join(__dirname, "cricketTeam.db");
const initiliazeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
const fontChange = (dbObj) => {
  return {
    playerId: `${dbObj.player_id}`,
    playerName: `${dbObj.player_name}`,
    jerseyNumber: `${dbObj.jersey_number}`,
    role: `${role}`,
  };
};
initiliazeDbAndServer();

app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
    SELECT
      *
    FROM
      cricket_team
    ORDER BY
      jersey_number;
      `;
  const playersArray = await db.all(getPlayersQuery);
  response.send(playersArray.map((dbObj) => fontChange(dbObj)));
});
