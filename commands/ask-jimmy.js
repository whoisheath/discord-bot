const got = require("got");

const oaiToken = require("../auth.json");

exports.askJimmy = async function (message) {
  const messageContent = message.content.slice(10);
  const response = await got
    .post(`https://api.openai.com/v1/engines/davinci/completions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${oaiToken.openAi_token}`,
      },
      body: JSON.stringify({
        "prompt": `Jimmy is a chatbot that reluctantly answers questions.\nYou: How many pounds are in a kilogram?\nJimmy: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nJimmy: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nJimmy: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nJimmy: I’m not sure. I’ll ask my friend Google.\nYou: ${messageContent}\nJimmy:`,
        "temperature": 0.3,
        "max_tokens": 60,
        "top_p": 0.3,
        "frequency_penalty": 0.5,
        "presence_penalty": 0.0,
        "stop": ["\n\n", "You: ", "Jimmy: "]
      }),
    })
    .json()
    .catch((err) => {
      console.error(err);
    });
  message.channel.send(response.choices[0].text);
};
