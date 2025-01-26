from transformers import pipeline

emotion_analyzer = pipeline('text-classification', model='j-hartmann/emotion-english-distilroberta-base')

def analyze_text(text):
    """ Analyze the emotion of a given text """
    emotion_distribution = emotion_analyzer(text)
    emotion = emotion_distribution[0]['label']

    return emotion
