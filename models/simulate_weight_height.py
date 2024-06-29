import numpy as np
import pandas as pd

# Constants for height and weight distributions based on gender
mean_height_male = 175  # mean height for males in centimeters
std_dev_height_male = 8
mean_weight_male = 80  # mean weight for males in kilograms
std_dev_weight_male = 10

mean_height_female = 162  # mean height for females in centimeters
std_dev_height_female = 6
mean_weight_female = 65  # mean weight for females in kilograms
std_dev_weight_female = 8

# Simulate 1000 patients
num_patients = 1000

# Generate genders for patients (assuming equal distribution for simplicity)
genders = np.random.choice(['Male', 'Female'], size=num_patients)

# Initialize arrays to store simulated data
heights = np.zeros(num_patients)
weights = np.zeros(num_patients)

# Vectorized approach to generate heights and weights based on gender
male_indices = np.where(genders == 'Male')
female_indices = np.where(genders == 'Female')

# Generate heights and weights for males
heights[male_indices] = np.random.normal(mean_height_male, std_dev_height_male, len(male_indices[0]))
weights[male_indices] = np.random.normal(mean_weight_male, std_dev_weight_male, len(male_indices[0]))

# Generate heights and weights for females
heights[female_indices] = np.random.normal(mean_height_female, std_dev_height_female, len(female_indices[0]))
weights[female_indices] = np.random.normal(mean_weight_female, std_dev_weight_female, len(female_indices[0]))

# Ensure heights and weights are positive
heights = np.maximum(heights, 0)
weights = np.maximum(weights, 0)

height_ft = heights / 30.48  # convert height to feet
weight_lbs = weights * 2.20462  # convert weight to pounds

# Calculate BMI (Body Mass Index)
# BMI = weight (kg) / (height (m))^2
heights_meters = heights / 100  # convert height to meters
bmi_values = weights / (heights_meters ** 2)

# Add noise to BMI calculations
bmi_noise = np.random.normal(0, 1, num_patients)  # noise with mean 0 and std deviation 1
bmi_values_with_noise = bmi_values + bmi_noise

# patient id 
patient_id = np.arange(1, num_patients + 1)

# Create a DataFrame to store the data
data = pd.DataFrame({
    'Patient_ID': patient_id,
    'Gender': genders,
    'Height_cm': heights,
    'Weight_kg': weights,
    'Height_ft': height_ft,
    'Weight_lbs': weight_lbs,
    'BMI': bmi_values_with_noise  # using BMI values with added noise
})

# Save data to a CSV file
csv_filename = 'simulated_patient_gender_height_weight_bmi.csv'
data.to_csv(csv_filename, index=False)

print(f"Simulated patient data with BMI (including noise) saved to '{csv_filename}'.")
