/**
 * Copyright 2019 Artificial Solutions. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4337;
const TwilioClient = require("twilio")('AC1af78acfc138a7e0b1b00fd3bf5059cd', '23b193f5e47d68c3c481d903c512a35e');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// twilio message comes in
app.post("/", handleTwilioMessages());

// handle incoming twilio message
function handleTwilioMessages() {
  return async (req, res) => {
    console.log(req.body)
    // get the sender's phone number
    const from = req.body.From;
    const to = req.body.To;
    
    TwilioClient.messages
      .create({
         from: to,
         body: 'Hello there!',
         to: from
       })
      .then(message => console.log(message.sid));
  }
}

  



http.createServer(app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});