import pickle
from flask import Flask, request,render_template
import numpy as np  
import pandas as pd
from sklearn.preprocessing import StandardScaler
from src.pipeline.predict_pipeline import PredictPipeline, CustomData



application = Flask(__name__)
app = application


# 🏠 Landing Page
@app.route('/')
def home():
    return render_template('home.html')


# 🧪 Prediction Page
@app.route('/predict')
def predict_page():
    return render_template('predict.html')


@app.route('/predictdata', methods=['POST'])
def predict_datapoint():
     try:
        data = CustomData(
            age=int(request.form['age']),
            tenure_months=int(request.form['tenure_months']),
            monthly_logins=int(request.form['monthly_logins']),
            weekly_active_days=int(request.form['weekly_active_days']),
            avg_session_time=float(request.form['avg_session_time']),
            monthly_fee=float(request.form['monthly_fee']),
            total_revenue=float(request.form['total_revenue']),
            payment_failures=int(request.form['payment_failures']),
            support_tickets=int(request.form['support_tickets']),
            csat_score=int(request.form['csat_score']),
            nps_score=int(request.form['nps_score']),
            gender=request.form['gender'],
            contract_type=request.form['contract_type'],
            payment_method=request.form['payment_method'],
            complaint_type=request.form['complaint_type']
        )

        pred_df = data.get_data_as_data_frame()
        pipeline = PredictPipeline()
        prediction = pipeline.predict(pred_df)[0]

        result = "Customer Will Churn ❌" if prediction == 1 else "Customer Will Stay ✅"

        return render_template('predict.html', results=result)
     except Exception as e:
         return render_template('predict.html', results=str(e))

# 📊 Dashboard (static for now)
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route("/insights")
def insights():
    return render_template("insights.html")


if __name__ == "__main__":
    app.run(debug=True)
