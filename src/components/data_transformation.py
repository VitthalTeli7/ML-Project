import sys
from dataclasses import dataclass

import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from src.exception import CustomException
from src.logger import logging  
import os

from src.utils import save_object

#from src.components.data_ingestion import DataIngestion


@dataclass
class DataTransformationConfig:
    preprocessor_obj_file_path=os.path.join('artifacts','preprocessor.pkl') 

class DataTransformation:
    def __init__(self):
        self.data_transformation_config=DataTransformationConfig()

    def get_data_transformer_object(self):
        '''
        This function is responsible for data transformation
        '''
        try:
            categorical_columns= [
                "gender",
                "country",
                "city",
                "customer_segment",
                "signup_channel",
                "contract_type",
                "payment_method",
                "complaint_type",
                "survey_response",
                "discount_applied",
                "price_increase_last_3m"
            ]
            numerical_columns= [
                "age",
                "tenure_months",
                "monthly_logins",
                "weekly_active_days",
                "avg_session_time",
                "features_used",
                "usage_growth_rate",
                "last_login_days_ago",
                "monthly_fee",
                "total_revenue",
                "payment_failures",
                "support_tickets",
                "avg_resolution_time",
                "csat_score",
                "escalations",
                "email_open_rate",
                "marketing_click_rate",
                "nps_score",
                "referral_count"
            ]
            
            num_pipeline=Pipeline(
                steps=[
                    ('imputer',SimpleImputer(strategy='median')),
                    ('scaler',StandardScaler())
                ]
            )
            cat_pipeline = Pipeline(
                steps=[
                    ('imputer', SimpleImputer(strategy='most_frequent')),
                    ('one_hot_encoder', OneHotEncoder(handle_unknown="ignore")),
                    ('scaler', StandardScaler(with_mean=False))
             ]
            )

            logging.info("Numerical columns standard scaling completed")
            logging.info("Categorical columns encoding completed")

            preprocessor=ColumnTransformer(
                [
                    ('num_pipeline',num_pipeline,numerical_columns),
                    ('cat_pipeline',cat_pipeline,categorical_columns)
                ]
            )   

            return preprocessor
        
        except Exception as e:
            raise CustomException(e,sys)    
        
    def initiate_data_transformation(self,train_path,test_path):
        try:
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)

            logging.info("Read train and test data completed")
            logging.info("Obtaining preprocessor object")

            preprocessing_obj=self.get_data_transformer_object()

            target_column_name = "churn"

            numerical_columns= [
                "age",
                "tenure_months",
                "monthly_logins",
                "weekly_active_days",
                "avg_session_time",
                "features_used",
                "usage_growth_rate",
                "last_login_days_ago",
                "monthly_fee",
                "total_revenue",
                "payment_failures",
                "support_tickets",
                "avg_resolution_time",
                "csat_score",
                "escalations",
                "email_open_rate",
                "marketing_click_rate",
                "nps_score",
                "referral_count"
            ]
            input_feature_train_df = train_df.drop(columns=[target_column_name])
            target_feature_train_df = train_df[target_column_name]

            input_feature_test_df = test_df.drop(columns=[target_column_name])
            target_feature_test_df = test_df[target_column_name]

            logging.info(
                f"Applying preprocessing object on training and testing datasets."
            )

            input_feature_train_arr=preprocessing_obj.fit_transform(input_feature_train_df)
            input_feature_test_arr=preprocessing_obj.transform(input_feature_test_df)

            train_arr=np.c_[input_feature_train_arr,np.array(target_feature_train_df)]
            test_arr=np.c_[input_feature_test_arr,np.array(target_feature_test_df)]

            logging.info("Saved preprocessing object.")

            save_object(
                file_path=self.data_transformation_config.preprocessor_obj_file_path,
                obj=preprocessing_obj
            )

            return(
                train_arr,
                test_arr,
                self.data_transformation_config.preprocessor_obj_file_path,
            )

        except Exception as e:
            raise CustomException(e,sys)
        
"""if __name__=="__main__":
    obj=DataIngestion()
    train_data,test_data=obj.initiate_data_ingestion()  

    data_transformation=DataTransformation()
    data_transformation.initiate_data_transformation(train_data,test_data)  """
