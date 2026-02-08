import sys
import pandas as pd
from src.exception import CustomException
from src.utils import load_object   

class PredictPipeline:
    def __init__(self):
        pass

    def predict(self, features):
        try:
            model_path = "artifacts/model.pkl"
            preprocessor_path = "artifacts/preprocessor.pkl"

            model = load_object(file_path=model_path)
            preprocessor = load_object(file_path=preprocessor_path)

            # 🔥 ADD EXACTLY HERE (before transform)
            expected_cols = list(preprocessor.feature_names_in_)

            for col in expected_cols:
                if col not in features.columns:
                    features[col] = 0

            features = features[expected_cols]

            # (temporary debug – remove later)
            print("Expected columns:", expected_cols)
            print("Received columns:", list(features.columns))

            data_scaled = preprocessor.transform(features)
            preds = model.predict(data_scaled)

            return preds

        except Exception as e:
            raise CustomException(e, sys)

      
class CustomData:
    def __init__(self,
        age:int,
        tenure_months:int,
        monthly_logins:int,
        weekly_active_days:int,
        avg_session_time:float,
        monthly_fee:float,
        total_revenue:float,
        payment_failures:int,
        support_tickets:int,
        csat_score:int,
        nps_score:int,
        gender:str,
        contract_type:str,
        payment_method:str,
        complaint_type:str,

        # 👇 DEFAULTED FEATURES
        country="India",
        city="Unknown",
        customer_segment="Individual",
        signup_channel="Web",
        survey_response="Neutral",
        discount_applied="No",
        price_increase_last_3m="No",
        features_used=5,
        usage_growth_rate=0.0,
        last_login_days_ago=7,
        avg_resolution_time=24.0,
        escalations=0,
        email_open_rate=0.5,
        marketing_click_rate=0.1,
        referral_count=0
    ):


        self.age = age
        self.tenure_months = tenure_months
        self.monthly_logins = monthly_logins
        self.weekly_active_days = weekly_active_days
        self.avg_session_time = avg_session_time
        self.monthly_fee = monthly_fee
        self.total_revenue = total_revenue
        self.payment_failures = payment_failures
        self.support_tickets = support_tickets
        self.csat_score = csat_score
        self.nps_score = nps_score
        self.gender = gender
        self.contract_type = contract_type
        self.payment_method = payment_method
        self.complaint_type = complaint_type

        self.country = country
        self.city = city
        self.customer_segment = customer_segment
        self.signup_channel = signup_channel
        self.survey_response = survey_response
        self.discount_applied = discount_applied
        self.price_increase_last_3m = price_increase_last_3m
        self.features_used = features_used
        self.usage_growth_rate = usage_growth_rate
        self.last_login_days_ago = last_login_days_ago
        self.avg_resolution_time = avg_resolution_time
        self.escalations = escalations
        self.email_open_rate = email_open_rate
        self.marketing_click_rate = marketing_click_rate
        self.referral_count = referral_count

    def get_data_as_data_frame(self):
        try:
            custom_data_input_dict = {
                "gender":[self.gender],
                "country":[self.country],
                "city":[self.city],
                "customer_segment":[self.customer_segment],
                "signup_channel":[self.signup_channel],
                "contract_type":[self.contract_type],
                "payment_method":[self.payment_method],
                "complaint_type":[self.complaint_type],
                "survey_response":[self.survey_response],
                "discount_applied":[self.discount_applied],
                "price_increase_last_3m":[self.price_increase_last_3m],

                "age":[self.age],
                "tenure_months":[self.tenure_months],
                "monthly_logins":[self.monthly_logins],
                "weekly_active_days":[self.weekly_active_days],
                "avg_session_time":[self.avg_session_time],
                "features_used":[self.features_used],
                "usage_growth_rate":[self.usage_growth_rate],
                "last_login_days_ago":[self.last_login_days_ago],
                "monthly_fee":[self.monthly_fee],
                "total_revenue":[self.total_revenue],
                "payment_failures":[self.payment_failures],
                "support_tickets":[self.support_tickets],
                "avg_resolution_time":[self.avg_resolution_time],
                "csat_score":[self.csat_score],
                "escalations":[self.escalations],
                "email_open_rate":[self.email_open_rate],
                "marketing_click_rate":[self.marketing_click_rate],
                "nps_score":[self.nps_score],
                "referral_count":[self.referral_count],
}
            df = pd.DataFrame(custom_data_input_dict)
            return df
        except Exception as e:
            raise CustomException(e, sys)