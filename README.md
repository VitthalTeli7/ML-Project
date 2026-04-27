# End to End Machine Learning Project
# Requirement : dataset resource: https://www.kaggle.com/datasets

# ChurnPredict Pro - Advanced Customer Churn Prediction System

[![Python Version](https://img.shields.io/badge/python-3.9+-blue.svg)](https://python.org)
[![Flask Version](https://img.shields.io/badge/flask-2.3+-green.svg)](https://flask.palletsprojects.com)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

# Project Overview

ChurnPredict Pro is an enterprise-grade machine learning system that predicts customer churn with 86% accuracy. Built with Flask, MySQL, and SQLAlchemy, it provides real-time predictions, interactive dashboards, and automated retention campaign management.

### Live Demo Features
-  Real-time churn predictions
-  Interactive analytics dashboard
-  Customer 360° view
-  ROI tracking for retention campaigns
-  Model performance monitoring
-  Automated high-risk alerts

## **Key Features**

### **Machine Learning Capabilities**
- **Model**: Random Forest Classifier with 86.5% accuracy
- **Features**: 20+ customer attributes analyzed
- **Real-time Predictions**: <200ms response time
- **Model Versioning**: Track multiple model versions
- **Explainable AI**: SHAP values for each prediction

### Web Application
- Premium UI: Modern, responsive design with dark mode
- Mobile Friendly: Works on all devices
- Real-time Updates: Live charts and metrics
- Interactive Dashboards: Drill down into data
- Campaign Management: Create and track retention offers

## System Architecture
┌─────────────────────────────────────────────────────────────┐
│ Client Browser │
│ (React.js / HTML5 / Tailwind CSS) │
└─────────────────┬───────────────────────────────────────────┘
│
┌─────────────────▼───────────────────────────────────────────┐
│ Flask Web Server │
│ (REST API + Template Rendering) │
└─────────────────┬───────────────────────────────────────────┘
│
┌─────────────────▼───────────────────────────────────────────┐
│ Business Logic Layer │
│ - Prediction Pipeline │
│ - Data Transformation │
│ - Model Management │
└─────────────────┬───────────────────────────────────────────┘

## 📁 **Project Structure**
ML-PROJECT/
│
├── 📁 artifacts/ # Saved model outputs
│ ├── model.pkl # Trained model
│ ├── preprocessor.pkl # Data preprocessor
│ ├── train.csv # Training data
│ └── test.csv # Test data
│
├── 📁 data/ # Dataset storage
│ ├── raw/
│ │ └── customer_churn_business_dataset.csv
│ └── processed/ # Processed datasets
│
├── 📁 src/ # Source code
│ ├── 📁 components/ # ML pipeline components
│ │ ├── data_ingestion.py
│ │ ├── data_transformation.py
│ │ └── model_trainer.py
│ │
│ │
│ ├── 📁 pipeline/ # Pipeline orchestration
│ │ ├── train_pipeline.py
│ │ └── predict_pipeline.py
│ │
│ ├── 📁 utils/ # Utility functions
│ │ ├── logger.py
│ │ └── exception.py
│ │
│ └── app.py # Flask application
│
├── 📁 static/ # Frontend assets
│ ├── css/
│ │ └── style.css # 1500+ lines of CSS
│ ├── js/
│ │ ├── charts.js # 800+ lines of charts
│ │ └── model_insights.js # 700+ lines of analytics
│ └── images/
│
├── 📁 templates/ # HTML templates
│ ├── base.html
│ ├── dashboard.html
│ ├── predict.html
│ ├── customers.html
│ ├── insights.html
│ └── retention.html
││
├── 📁 logs/ # Application logs
│ └── app.log
│
├── 📁 notebooks/ # Jupyter notebooks
│ ├── Churn_Prediction_EDA.ipynb
│ └── Model_Training.ipynb
│
├── 📁 scripts/ # Utility scripts
│ ├── init_db.py # Database initialization
│ ├── load_data.py # Load CSV to MySQL
│ └── backup_db.py # Automated backups
│
├── 📄 .env # Environment variables
├── 📄 .gitignore
├── 📄 requirements.txt # Python dependencies
├── 📄 config.yaml # Configuration
├── 📄 Dockerfile # Containerization
├── 📄 docker-compose.yml # Multi-container setup
└── 📄 README.md # This file

## 🚀 uick Start Guide

### Prerequisites

# Required versions
Python 3.9+
Git
Step 1: Clone the Repository

git clone https://github.com/VitthalTeli7/ML-Project.git
cd churn-prediction-pro
Step 2: Set Up Virtual Environment

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate
Step 3: Install Dependencies

pip install -r requirements.txt
Step 4: Configure Database

Step 5: Set Environment Variables
Create .env file:

env
 
# Application Configuration
FLASK_ENV=production
FLASK_DEBUG=False

# Model Configuration
MODEL_PATH=artifacts/model.pkl
PREPROCESSOR_PATH=artifacts/preprocessor.pkl
Step 6: Initialize Database & Load Data

# Create tables and load initial data
python scripts/init_db.py
python scripts/load_data.py
Step 7: Train the Model (First Time)

# Train model on your data
python src/pipeline/train_pipeline.py
Step 8: Run the Application

# Start Flask server
python src/app.py

# Access the application
Open browser: http://localhost:5000