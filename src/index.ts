import { initTopicAndSubscribe, findSubscribers } from "./export";
import { createClient } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import { createServer } from "http";

async function main() {
  // connect to the Fluence network
  const client = await createClient(krasnodar[1]);
  let topic = "myTopic";
  let value = "myValue";
  // create topic (if not exists) and subscribe on it
  await initTopicAndSubscribe(
    client,
    client.relayPeerId!,
    topic,
    value,
    client.relayPeerId!,
    null
  );
  // find other peers subscribed to that topic
  let subscribers = await findSubscribers(client, client.relayPeerId!, topic);
  return subscribers;
}

//create a server object:
createServer(async function (req, res) {
  let subs = await main();
  res.write("Hello World!\n"); //write a response to the client
  res.write(JSON.stringify(subs));
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
