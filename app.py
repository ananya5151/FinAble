from flask import Flask, request, jsonify
import speech_recognition as sr
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
recognizer = sr.Recognizer()

@app.route('/recognize-speech', methods=['POST'])
def recognize_speech():
    with sr.Microphone() as source:
        print("Please say something!")
        recognizer.adjust_for_ambient_noise(source)
        audio_data = recognizer.listen(source)
        
    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        return "Sorry, I couldn't understand what you said."
    except sr.RequestError:
        return "Sorry, there was an error processing your request."

if __name__ == '__main__':
    app.run(debug=True)
