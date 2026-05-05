"""
Aegis AI — ML Prediction Logic
===============================
Phase 1: Dummy random predictor for development/testing.
Phase 2: Load trained TF-IDF + PassiveAggressiveClassifier model.
"""

import random

# ------------------------------------------------------------------
# Phase 2: Uncomment below to load a trained model
# ------------------------------------------------------------------
# import joblib
# import os
#
# MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
# VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")
#
# try:
#     model = joblib.load(MODEL_PATH)
#     vectorizer = joblib.load(VECTORIZER_PATH)
#     USE_TRAINED_MODEL = True
# except FileNotFoundError:
#     print("[WARNING] model.pkl or vectorizer.pkl not found. Using dummy predictor.")
#     USE_TRAINED_MODEL = False
# ------------------------------------------------------------------


def predict(text: str) -> dict:
    """
    Predict whether a given text is REAL or FAKE news.

    Parameters
    ----------
    text : str
        The news article or content to analyze.

    Returns
    -------
    dict
        {
            "status": "REAL" | "FAKE",
            "confidence": float (70–99)
        }
    """

    # ------------------------------------------------------------------
    # Phase 2: Replace dummy logic with trained model inference
    # ------------------------------------------------------------------
    # if USE_TRAINED_MODEL:
    #     tfidf_vector = vectorizer.transform([text])
    #     prediction = model.predict(tfidf_vector)[0]
    #     proba = model.decision_function(tfidf_vector)[0]
    #     confidence = round(min(abs(proba) * 10, 99.9), 1)
    #     status = "REAL" if prediction == 1 else "FAKE"
    #     return {"status": status, "confidence": confidence}
    # ------------------------------------------------------------------

    # Phase 1: Dummy random prediction
    status = random.choice(["REAL", "FAKE"])
    confidence = round(random.uniform(70.0, 99.0), 1)

    return {"status": status, "confidence": confidence}
