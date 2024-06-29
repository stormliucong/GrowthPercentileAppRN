import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, mean_squared_error, r2_score
import joblib

# Load simulated patient data from CSV
csv_filename = 'simulated_patient_gender_height_weight_bmi.csv'
data = pd.read_csv(csv_filename)

# Encode categorical variable 'Gender' (Male = 0, Female = 1)
label_encoder = LabelEncoder()
data['Gender'] = label_encoder.fit_transform(data['Gender'])

# Separate features (X) and target (y)
X = data[['Gender','Height_cm','Weight_kg','Height_ft','Weight_lbs']]

# Standardize features (optional but recommended for logistic regression)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


# Instantiate logistic regression model
# model1 = LogisticRegression()
# y1 = (data['BMI'] > 25).astype(int)  # Binary classification: BMI > 25 (overweight) or not
# X_train, X_test, y1_train, y1_test = train_test_split(X_scaled, y1, test_size=0.2, random_state=42)
# model1.fit(X_train, y1_train)
# y1_pred = model1.predict(X_test)
# # Evaluate the model
# print("Classification Report:")
# print(classification_report(y1_test, y1_pred))
# print("\nConfusion Matrix:")
# print(confusion_matrix(y1_test, y1_pred))
# # Save the model to disk
# model_filename = 'skl_logistic_regression_model.pkl'
# joblib.dump(model1, model_filename)

model2 = LinearRegression()
y2 = data['BMI']
X_train, X_test, y2_train, y2_test = train_test_split(X_scaled, y2, test_size=0.2, random_state=42)
model2.fit(X_train, y2_train)
y2_pred = model2.predict(X_test)
# Evaluate the model
mse = mean_squared_error(y2_test, y2_pred)
r2 = r2_score(y2_test, y2_pred)
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"R^2 Score: {r2:.2f}")
# Save the model to disk
model_filename = 'skl_linear_regression_model.pkl'
joblib.dump(model2, model_filename)


