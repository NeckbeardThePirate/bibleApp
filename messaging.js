const express  = require('express');
const config = require('./config');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const telnyx = require('telnyx')(config.TELNYX_API_KEY);
const router = module.exports = express.Router();
const url = require('url');

const toBase64 = data => (new Buffer.from(data)).toString('base64');
const fromBase64 = data => (new Buffer.from(data, 'base64')).toString();

const outboundMessageController = async (req, res) => {
    res.sendStatus(200); // Play nice and respond to webhook
    const event = req.body.data;
    console.log(`Received message DLR with ID: ${event.payload.id}`)
};


// In messaging.js
const inboundMessageController = async (req, res) => {
    res.sendStatus(200); // Play nice and respond to webhook
    const event = req.body.data;
    console.log(`Received inbound message with ID: ${event.payload.id}`)
    const dlrUrl = (new URL('/messaging/outbound', `${req.protocol}://${req.hostname}`)).href;
    const toNumber = event.payload.to[0].phone_number;
    const fromNumber = event.payload['from'].phone_number;
    
    try {
      const messageRequest = {
        from: toNumber,
        to: fromNumber,
        text: '👋 Hello World',
        webhook_url: dlrUrl,
        use_profile_webhooks: false
      }
      const telnyxResponse = await telnyx.messages.create(messageRequest);
      console.log(`Sent message with id: ${telnyxResponse.data.id}`);
    }
    catch (e)  {
      console.log('Error sending message');
      console.log(e);
    }
  
};



router.route('/inbound')
    .post(inboundMessageController);

router.route('/outbound')
    .post(outboundMessageController);