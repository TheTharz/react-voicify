"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TextToSpeech = _ref => {
  let {
    text
  } = _ref;
  const [isPaused, setIsPaused] = (0, _react.useState)(false);
  const [utterance, setUtterance] = (0, _react.useState)(null);
  const [voices, setVoices] = (0, _react.useState)([]);
  const [selectedVoice, setSelectedVoice] = (0, _react.useState)(null);
  const [rate, setRate] = (0, _react.useState)(1);
  const [pitch, setPitch] = (0, _react.useState)(1);
  const [volume, setVolume] = (0, _react.useState)(1);
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
    if (utterance) {
      utterance.voice = voices.find(voice => voice.name === selectedVoice);
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
      fontFamily: 'Arial, sans-serif'
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      marginBottom: '20px'
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
      fontSize: '16px'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    style: styles.label
  }, "Voice:", /*#__PURE__*/_react.default.createElement("select", {
    style: styles.input,
    value: selectedVoice,
    onChange: e => setSelectedVoice(e.target.value)
  }, voices.map(voice => /*#__PURE__*/_react.default.createElement("option", {
    key: voice.name,
    value: voice.name
  }, voice.name, " (", voice.lang, ")"))))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    style: styles.label
  }, "Rate: ", rate, /*#__PURE__*/_react.default.createElement("input", {
    style: styles.input,
    type: "range",
    min: "0.5",
    max: "2",
    step: "0.1",
    value: rate,
    onChange: e => setRate(e.target.value)
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    style: styles.label
  }, "Pitch: ", pitch, /*#__PURE__*/_react.default.createElement("input", {
    style: styles.input,
    type: "range",
    min: "0",
    max: "2",
    step: "0.1",
    value: pitch,
    onChange: e => setPitch(e.target.value)
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    style: styles.label
  }, "Volume: ", volume, /*#__PURE__*/_react.default.createElement("input", {
    style: styles.input,
    type: "range",
    min: "0",
    max: "1",
    step: "0.1",
    value: volume,
    onChange: e => setVolume(e.target.value)
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    style: styles.button,
    onMouseOver: e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor,
    onMouseOut: e => e.target.style.backgroundColor = styles.button.backgroundColor,
    onClick: handlePlay
  }, isPaused ? 'Resume' : 'Play'), /*#__PURE__*/_react.default.createElement("button", {
    style: styles.button,
    onMouseOver: e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor,
    onMouseOut: e => e.target.style.backgroundColor = styles.button.backgroundColor,
    onClick: handlePause
  }, "Pause"), /*#__PURE__*/_react.default.createElement("button", {
    style: styles.button,
    onMouseOver: e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor,
    onMouseOut: e => e.target.style.backgroundColor = styles.button.backgroundColor,
    onClick: handleStop
  }, "Stop")));
};
var _default = exports.default = TextToSpeech;