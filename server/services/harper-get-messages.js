const axios = require("axios");

function harperGetMessages(room) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;

  if (!dbPw || !dbUrl) return null;

  var data = JSON.stringify({
    operation: "sql",
    sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`,
  });

  const config = {
    method: "POST",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: dbPw,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

module.exports = harperGetMessages;
