var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
 
var textToSpeech = new TextToSpeechV1({
  username: 'c0e0ec26-c270-4e46-943e-bc4295bf6e0c',
  password: 'NNl0dG17p3eg',
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});
 
var params = {
  text: 'Hello my name is Frank, how are you today? he said, byeee',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};
 
// Synthesize speech, correct the wav header, then save to disk
// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
textToSpeech
  .synthesize(params, function(err, audio) {
    if (err) {
      console.log(err);
      return;
    }
    textToSpeech.repairWavHeader(audio);
    fs.writeFileSync('audio.wav', audio);
    console.log('audio.wav written with a corrected wav header');
});