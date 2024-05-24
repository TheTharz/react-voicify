import React, { useState, useEffect } from 'react';
import './TextToSpeech.css';

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const fetchVoices = () => {
      const voiceList = synth.getVoices();
      setVoices(voiceList);

      if (voiceList.length > 0) {
        setSelectedVoice(voiceList[0].name);
      }
    };

    fetchVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = fetchVoices;
    }

    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  useEffect(() => {
    if (utterance) {
      utterance.voice = voices.find((voice) => voice.name === selectedVoice);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
    }
  }, [utterance, selectedVoice, rate, pitch, volume, voices]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
  };

  return (
    <div className='text-to-speech'>
      <div>
        <label>
          Voice:
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Rate: {rate}
          <input
            type='range'
            min='0.5'
            max='2'
            step='0.1'
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Pitch: {pitch}
          <input
            type='range'
            min='0'
            max='2'
            step='0.1'
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Volume: {volume}
          <input
            type='range'
            min='0'
            max='1'
            step='0.1'
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handlePlay}>{isPaused ? 'Resume' : 'Play'}</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default TextToSpeech;
