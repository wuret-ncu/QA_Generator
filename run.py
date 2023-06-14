import os
import openai
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Define your API endpoint
@app.route('/openai')
def index():
    openai.api_type = "azure"
    openai.api_base = "https://qag02.openai.azure.com/"
    openai.api_version = "2022-12-01"
    openai.api_key = "17f82d1fc6fe4d0ba2a768d8836c3e89"

    response = openai.Completion.create(
    engine="QAG03",
    prompt="Generate a multiple choice quiz from the text below. Quiz should contain at least 5 questions. Each answer choice should be on a separate line, with a blank line separating each question.\n\nA neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich. Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars. Neutron stars have a radius on the order of 10 kilometers (6.2 mi) and a mass of about 1.4 solar masses. They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.\n\nExample:\nQ1. What is a neutron star?\nA. The collapsed core of a massive supergiant star\nB. The smallest and densest stellar object\nC. A white hole\nD. A quark star",
    temperature=0.8,
    max_tokens=500,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0.5,
    best_of=1,
    stop=None)
    print("fuck")
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=80,debug=True)