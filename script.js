const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
const root = document.querySelector('#root');

textarea.value = localStorage.getItem('savedText') || '';

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'en-EN'; 
recognition.continuous = true; 

recognition.onresult = function(event) {
  const last = event.results.length - 1;
  const text = event.results[last][0].transcript;

  
  function typeText(text, index = 0) {
    if (index < text.length) {
      textarea.value += text[index]; 
      setTimeout(() => typeText(text, index + 1), 50);
    } else {
      textarea.value += '\n'; 
      localStorage.setItem('savedText', textarea.value); 
    }
  }

  typeText(text); 
}

recognition.onerror = function(event) {
  root.textContent = 'Please allow me to use the microphone!';
  console.error('Microphone access denied: ' + event.error);
}

button.addEventListener('click', function() {
  if (button.classList.contains('animation')) {
    recognition.stop(); 
    button.classList.remove('animation'); 
  } else {
    recognition.start(); 
    button.classList.add('animation'); 
  }
});

textarea.addEventListener('input', function() {
  localStorage.setItem('savedText', textarea.value);
});
