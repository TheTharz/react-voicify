import React, { useState, useEffect } from 'react';

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

  const styles = {
    container: {
      maxWidth: '400px',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      marginBottom: '20px',
    },
    button: {
      width: '30%',
      margin: '5px 1%',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <div>
        <label style={styles.label}>
          Voice:
          <select
            style={styles.input}
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
        <label style={styles.label}>
          Rate: {rate}
          <input
            style={styles.input}
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
        <label style={styles.label}>
          Pitch: {pitch}
          <input
            style={styles.input}
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
        <label style={styles.label}>
          Volume: {volume}
          <input
            style={styles.input}
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
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          onClick={handlePlay}
        >
          {isPaused ? 'Resume' : 'Play'}
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          onClick={handlePause}
        >
          Pause
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
