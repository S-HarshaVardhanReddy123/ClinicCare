-- ClinicCare India demo location and hospital seed data
-- Adds 36 State/UT entries, 104 cities, and 312 demo hospitals.
-- Existing ClinicCare data is preserved.
-- Hospital names are intentionally marked as DEMO/SAMPLE data.

BEGIN;

-- ------------------------------------------------------------
-- LOCATIONS
-- ------------------------------------------------------------
INSERT INTO locations (state, district, city)
SELECT 'Andhra Pradesh', 'Guntur', 'Guntur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Andhra Pradesh'
      AND city = 'Guntur'
);
INSERT INTO locations (state, district, city)
SELECT 'Andhra Pradesh', 'Vijayawada', 'Vijayawada'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Andhra Pradesh'
      AND city = 'Vijayawada'
);
INSERT INTO locations (state, district, city)
SELECT 'Andhra Pradesh', 'Visakhapatnam', 'Visakhapatnam'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Andhra Pradesh'
      AND city = 'Visakhapatnam'
);
INSERT INTO locations (state, district, city)
SELECT 'Arunachal Pradesh', 'Itanagar', 'Itanagar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Arunachal Pradesh'
      AND city = 'Itanagar'
);
INSERT INTO locations (state, district, city)
SELECT 'Arunachal Pradesh', 'Naharlagun', 'Naharlagun'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Arunachal Pradesh'
      AND city = 'Naharlagun'
);
INSERT INTO locations (state, district, city)
SELECT 'Arunachal Pradesh', 'Tawang', 'Tawang'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Arunachal Pradesh'
      AND city = 'Tawang'
);
INSERT INTO locations (state, district, city)
SELECT 'Assam', 'Guwahati', 'Guwahati'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Assam'
      AND city = 'Guwahati'
);
INSERT INTO locations (state, district, city)
SELECT 'Assam', 'Dibrugarh', 'Dibrugarh'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Assam'
      AND city = 'Dibrugarh'
);
INSERT INTO locations (state, district, city)
SELECT 'Assam', 'Silchar', 'Silchar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Assam'
      AND city = 'Silchar'
);
INSERT INTO locations (state, district, city)
SELECT 'Bihar', 'Patna', 'Patna'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Bihar'
      AND city = 'Patna'
);
INSERT INTO locations (state, district, city)
SELECT 'Bihar', 'Gaya', 'Gaya'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Bihar'
      AND city = 'Gaya'
);
INSERT INTO locations (state, district, city)
SELECT 'Bihar', 'Muzaffarpur', 'Muzaffarpur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Bihar'
      AND city = 'Muzaffarpur'
);
INSERT INTO locations (state, district, city)
SELECT 'Chhattisgarh', 'Raipur', 'Raipur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Chhattisgarh'
      AND city = 'Raipur'
);
INSERT INTO locations (state, district, city)
SELECT 'Chhattisgarh', 'Bhilai', 'Bhilai'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Chhattisgarh'
      AND city = 'Bhilai'
);
INSERT INTO locations (state, district, city)
SELECT 'Chhattisgarh', 'Bilaspur', 'Bilaspur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Chhattisgarh'
      AND city = 'Bilaspur'
);
INSERT INTO locations (state, district, city)
SELECT 'Goa', 'Panaji', 'Panaji'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Goa'
      AND city = 'Panaji'
);
INSERT INTO locations (state, district, city)
SELECT 'Goa', 'Margao', 'Margao'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Goa'
      AND city = 'Margao'
);
INSERT INTO locations (state, district, city)
SELECT 'Goa', 'Vasco da Gama', 'Vasco da Gama'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Goa'
      AND city = 'Vasco da Gama'
);
INSERT INTO locations (state, district, city)
SELECT 'Gujarat', 'Ahmedabad', 'Ahmedabad'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Gujarat'
      AND city = 'Ahmedabad'
);
INSERT INTO locations (state, district, city)
SELECT 'Gujarat', 'Surat', 'Surat'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Gujarat'
      AND city = 'Surat'
);
INSERT INTO locations (state, district, city)
SELECT 'Gujarat', 'Vadodara', 'Vadodara'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Gujarat'
      AND city = 'Vadodara'
);
INSERT INTO locations (state, district, city)
SELECT 'Haryana', 'Gurugram', 'Gurugram'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Haryana'
      AND city = 'Gurugram'
);
INSERT INTO locations (state, district, city)
SELECT 'Haryana', 'Faridabad', 'Faridabad'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Haryana'
      AND city = 'Faridabad'
);
INSERT INTO locations (state, district, city)
SELECT 'Haryana', 'Panipat', 'Panipat'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Haryana'
      AND city = 'Panipat'
);
INSERT INTO locations (state, district, city)
SELECT 'Himachal Pradesh', 'Shimla', 'Shimla'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Himachal Pradesh'
      AND city = 'Shimla'
);
INSERT INTO locations (state, district, city)
SELECT 'Himachal Pradesh', 'Dharamshala', 'Dharamshala'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Himachal Pradesh'
      AND city = 'Dharamshala'
);
INSERT INTO locations (state, district, city)
SELECT 'Himachal Pradesh', 'Mandi', 'Mandi'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Himachal Pradesh'
      AND city = 'Mandi'
);
INSERT INTO locations (state, district, city)
SELECT 'Jharkhand', 'Ranchi', 'Ranchi'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Jharkhand'
      AND city = 'Ranchi'
);
INSERT INTO locations (state, district, city)
SELECT 'Jharkhand', 'Jamshedpur', 'Jamshedpur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Jharkhand'
      AND city = 'Jamshedpur'
);
INSERT INTO locations (state, district, city)
SELECT 'Jharkhand', 'Dhanbad', 'Dhanbad'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Jharkhand'
      AND city = 'Dhanbad'
);
INSERT INTO locations (state, district, city)
SELECT 'Karnataka', 'Bengaluru', 'Bengaluru'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Karnataka'
      AND city = 'Bengaluru'
);
INSERT INTO locations (state, district, city)
SELECT 'Karnataka', 'Mysuru', 'Mysuru'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Karnataka'
      AND city = 'Mysuru'
);
INSERT INTO locations (state, district, city)
SELECT 'Karnataka', 'Mangaluru', 'Mangaluru'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Karnataka'
      AND city = 'Mangaluru'
);
INSERT INTO locations (state, district, city)
SELECT 'Kerala', 'Thiruvananthapuram', 'Thiruvananthapuram'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Kerala'
      AND city = 'Thiruvananthapuram'
);
INSERT INTO locations (state, district, city)
SELECT 'Kerala', 'Kochi', 'Kochi'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Kerala'
      AND city = 'Kochi'
);
INSERT INTO locations (state, district, city)
SELECT 'Kerala', 'Kozhikode', 'Kozhikode'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Kerala'
      AND city = 'Kozhikode'
);
INSERT INTO locations (state, district, city)
SELECT 'Madhya Pradesh', 'Bhopal', 'Bhopal'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Madhya Pradesh'
      AND city = 'Bhopal'
);
INSERT INTO locations (state, district, city)
SELECT 'Madhya Pradesh', 'Indore', 'Indore'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Madhya Pradesh'
      AND city = 'Indore'
);
INSERT INTO locations (state, district, city)
SELECT 'Madhya Pradesh', 'Jabalpur', 'Jabalpur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Madhya Pradesh'
      AND city = 'Jabalpur'
);
INSERT INTO locations (state, district, city)
SELECT 'Maharashtra', 'Mumbai', 'Mumbai'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Maharashtra'
      AND city = 'Mumbai'
);
INSERT INTO locations (state, district, city)
SELECT 'Maharashtra', 'Pune', 'Pune'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Maharashtra'
      AND city = 'Pune'
);
INSERT INTO locations (state, district, city)
SELECT 'Maharashtra', 'Nagpur', 'Nagpur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Maharashtra'
      AND city = 'Nagpur'
);
INSERT INTO locations (state, district, city)
SELECT 'Manipur', 'Imphal', 'Imphal'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Manipur'
      AND city = 'Imphal'
);
INSERT INTO locations (state, district, city)
SELECT 'Manipur', 'Thoubal', 'Thoubal'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Manipur'
      AND city = 'Thoubal'
);
INSERT INTO locations (state, district, city)
SELECT 'Manipur', 'Churachandpur', 'Churachandpur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Manipur'
      AND city = 'Churachandpur'
);
INSERT INTO locations (state, district, city)
SELECT 'Meghalaya', 'Shillong', 'Shillong'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Meghalaya'
      AND city = 'Shillong'
);
INSERT INTO locations (state, district, city)
SELECT 'Meghalaya', 'Tura', 'Tura'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Meghalaya'
      AND city = 'Tura'
);
INSERT INTO locations (state, district, city)
SELECT 'Meghalaya', 'Jowai', 'Jowai'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Meghalaya'
      AND city = 'Jowai'
);
INSERT INTO locations (state, district, city)
SELECT 'Mizoram', 'Aizawl', 'Aizawl'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Mizoram'
      AND city = 'Aizawl'
);
INSERT INTO locations (state, district, city)
SELECT 'Mizoram', 'Lunglei', 'Lunglei'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Mizoram'
      AND city = 'Lunglei'
);
INSERT INTO locations (state, district, city)
SELECT 'Mizoram', 'Champhai', 'Champhai'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Mizoram'
      AND city = 'Champhai'
);
INSERT INTO locations (state, district, city)
SELECT 'Nagaland', 'Kohima', 'Kohima'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Nagaland'
      AND city = 'Kohima'
);
INSERT INTO locations (state, district, city)
SELECT 'Nagaland', 'Dimapur', 'Dimapur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Nagaland'
      AND city = 'Dimapur'
);
INSERT INTO locations (state, district, city)
SELECT 'Nagaland', 'Mokokchung', 'Mokokchung'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Nagaland'
      AND city = 'Mokokchung'
);
INSERT INTO locations (state, district, city)
SELECT 'Odisha', 'Bhubaneswar', 'Bhubaneswar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Odisha'
      AND city = 'Bhubaneswar'
);
INSERT INTO locations (state, district, city)
SELECT 'Odisha', 'Cuttack', 'Cuttack'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Odisha'
      AND city = 'Cuttack'
);
INSERT INTO locations (state, district, city)
SELECT 'Odisha', 'Rourkela', 'Rourkela'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Odisha'
      AND city = 'Rourkela'
);
INSERT INTO locations (state, district, city)
SELECT 'Punjab', 'Amritsar', 'Amritsar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Punjab'
      AND city = 'Amritsar'
);
INSERT INTO locations (state, district, city)
SELECT 'Punjab', 'Ludhiana', 'Ludhiana'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Punjab'
      AND city = 'Ludhiana'
);
INSERT INTO locations (state, district, city)
SELECT 'Punjab', 'Jalandhar', 'Jalandhar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Punjab'
      AND city = 'Jalandhar'
);
INSERT INTO locations (state, district, city)
SELECT 'Rajasthan', 'Jaipur', 'Jaipur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Rajasthan'
      AND city = 'Jaipur'
);
INSERT INTO locations (state, district, city)
SELECT 'Rajasthan', 'Jodhpur', 'Jodhpur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Rajasthan'
      AND city = 'Jodhpur'
);
INSERT INTO locations (state, district, city)
SELECT 'Rajasthan', 'Udaipur', 'Udaipur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Rajasthan'
      AND city = 'Udaipur'
);
INSERT INTO locations (state, district, city)
SELECT 'Sikkim', 'Gangtok', 'Gangtok'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Sikkim'
      AND city = 'Gangtok'
);
INSERT INTO locations (state, district, city)
SELECT 'Sikkim', 'Namchi', 'Namchi'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Sikkim'
      AND city = 'Namchi'
);
INSERT INTO locations (state, district, city)
SELECT 'Sikkim', 'Gyalshing', 'Gyalshing'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Sikkim'
      AND city = 'Gyalshing'
);
INSERT INTO locations (state, district, city)
SELECT 'Tamil Nadu', 'Chennai', 'Chennai'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Tamil Nadu'
      AND city = 'Chennai'
);
INSERT INTO locations (state, district, city)
SELECT 'Tamil Nadu', 'Coimbatore', 'Coimbatore'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Tamil Nadu'
      AND city = 'Coimbatore'
);
INSERT INTO locations (state, district, city)
SELECT 'Tamil Nadu', 'Madurai', 'Madurai'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Tamil Nadu'
      AND city = 'Madurai'
);
INSERT INTO locations (state, district, city)
SELECT 'Telangana', 'Hyderabad', 'Hyderabad'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Telangana'
      AND city = 'Hyderabad'
);
INSERT INTO locations (state, district, city)
SELECT 'Telangana', 'Warangal', 'Warangal'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Telangana'
      AND city = 'Warangal'
);
INSERT INTO locations (state, district, city)
SELECT 'Telangana', 'Nizamabad', 'Nizamabad'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Telangana'
      AND city = 'Nizamabad'
);
INSERT INTO locations (state, district, city)
SELECT 'Tripura', 'Agartala', 'Agartala'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Tripura'
      AND city = 'Agartala'
);
INSERT INTO locations (state, district, city)
SELECT 'Tripura', 'Udaipur', 'Udaipur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Tripura'
      AND city = 'Udaipur'
);
INSERT INTO locations (state, district, city)
SELECT 'Tripura', 'Dharmanagar', 'Dharmanagar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Tripura'
      AND city = 'Dharmanagar'
);
INSERT INTO locations (state, district, city)
SELECT 'Uttar Pradesh', 'Lucknow', 'Lucknow'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Uttar Pradesh'
      AND city = 'Lucknow'
);
INSERT INTO locations (state, district, city)
SELECT 'Uttar Pradesh', 'Kanpur', 'Kanpur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Uttar Pradesh'
      AND city = 'Kanpur'
);
INSERT INTO locations (state, district, city)
SELECT 'Uttar Pradesh', 'Varanasi', 'Varanasi'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Uttar Pradesh'
      AND city = 'Varanasi'
);
INSERT INTO locations (state, district, city)
SELECT 'Uttarakhand', 'Dehradun', 'Dehradun'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Uttarakhand'
      AND city = 'Dehradun'
);
INSERT INTO locations (state, district, city)
SELECT 'Uttarakhand', 'Haridwar', 'Haridwar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Uttarakhand'
      AND city = 'Haridwar'
);
INSERT INTO locations (state, district, city)
SELECT 'Uttarakhand', 'Haldwani', 'Haldwani'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Uttarakhand'
      AND city = 'Haldwani'
);
INSERT INTO locations (state, district, city)
SELECT 'West Bengal', 'Kolkata', 'Kolkata'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'West Bengal'
      AND city = 'Kolkata'
);
INSERT INTO locations (state, district, city)
SELECT 'West Bengal', 'Siliguri', 'Siliguri'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'West Bengal'
      AND city = 'Siliguri'
);
INSERT INTO locations (state, district, city)
SELECT 'West Bengal', 'Durgapur', 'Durgapur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'West Bengal'
      AND city = 'Durgapur'
);
INSERT INTO locations (state, district, city)
SELECT 'Andaman and Nicobar Islands', 'Port Blair', 'Port Blair'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Andaman and Nicobar Islands'
      AND city = 'Port Blair'
);
INSERT INTO locations (state, district, city)
SELECT 'Andaman and Nicobar Islands', 'Diglipur', 'Diglipur'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Andaman and Nicobar Islands'
      AND city = 'Diglipur'
);
INSERT INTO locations (state, district, city)
SELECT 'Andaman and Nicobar Islands', 'Car Nicobar', 'Car Nicobar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Andaman and Nicobar Islands'
      AND city = 'Car Nicobar'
);
INSERT INTO locations (state, district, city)
SELECT 'Chandigarh', 'Chandigarh', 'Chandigarh'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Chandigarh'
      AND city = 'Chandigarh'
);
INSERT INTO locations (state, district, city)
SELECT 'Dadra and Nagar Haveli and Daman and Diu', 'Daman', 'Daman'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Dadra and Nagar Haveli and Daman and Diu'
      AND city = 'Daman'
);
INSERT INTO locations (state, district, city)
SELECT 'Dadra and Nagar Haveli and Daman and Diu', 'Diu', 'Diu'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Dadra and Nagar Haveli and Daman and Diu'
      AND city = 'Diu'
);
INSERT INTO locations (state, district, city)
SELECT 'Dadra and Nagar Haveli and Daman and Diu', 'Silvassa', 'Silvassa'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Dadra and Nagar Haveli and Daman and Diu'
      AND city = 'Silvassa'
);
INSERT INTO locations (state, district, city)
SELECT 'Delhi', 'New Delhi', 'New Delhi'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Delhi'
      AND city = 'New Delhi'
);
INSERT INTO locations (state, district, city)
SELECT 'Delhi', 'Delhi', 'Delhi'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Delhi'
      AND city = 'Delhi'
);
INSERT INTO locations (state, district, city)
SELECT 'Jammu and Kashmir', 'Srinagar', 'Srinagar'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Jammu and Kashmir'
      AND city = 'Srinagar'
);
INSERT INTO locations (state, district, city)
SELECT 'Jammu and Kashmir', 'Jammu', 'Jammu'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Jammu and Kashmir'
      AND city = 'Jammu'
);
INSERT INTO locations (state, district, city)
SELECT 'Jammu and Kashmir', 'Anantnag', 'Anantnag'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Jammu and Kashmir'
      AND city = 'Anantnag'
);
INSERT INTO locations (state, district, city)
SELECT 'Ladakh', 'Leh', 'Leh'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Ladakh'
      AND city = 'Leh'
);
INSERT INTO locations (state, district, city)
SELECT 'Ladakh', 'Kargil', 'Kargil'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Ladakh'
      AND city = 'Kargil'
);
INSERT INTO locations (state, district, city)
SELECT 'Ladakh', 'Nubra', 'Nubra'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Ladakh'
      AND city = 'Nubra'
);
INSERT INTO locations (state, district, city)
SELECT 'Lakshadweep', 'Kavaratti', 'Kavaratti'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Lakshadweep'
      AND city = 'Kavaratti'
);
INSERT INTO locations (state, district, city)
SELECT 'Lakshadweep', 'Agatti', 'Agatti'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Lakshadweep'
      AND city = 'Agatti'
);
INSERT INTO locations (state, district, city)
SELECT 'Lakshadweep', 'Andrott', 'Andrott'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Lakshadweep'
      AND city = 'Andrott'
);
INSERT INTO locations (state, district, city)
SELECT 'Puducherry', 'Puducherry', 'Puducherry'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Puducherry'
      AND city = 'Puducherry'
);
INSERT INTO locations (state, district, city)
SELECT 'Puducherry', 'Karaikal', 'Karaikal'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Puducherry'
      AND city = 'Karaikal'
);
INSERT INTO locations (state, district, city)
SELECT 'Puducherry', 'Yanam', 'Yanam'
WHERE NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE state = 'Puducherry'
      AND city = 'Yanam'
);

-- ------------------------------------------------------------
-- HOSPITALS
-- Three demo hospitals per city.
-- ------------------------------------------------------------
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Guntur',
    'Main Healthcare Road, Guntur, Andhra Pradesh',
    '1800-000-0001',
    'demo1@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Guntur, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Guntur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Guntur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Guntur',
    'Central Medical Avenue, Guntur, Andhra Pradesh',
    '1800-000-0002',
    'demo2@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Guntur, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Guntur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Guntur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Guntur',
    'Community Health Road, Guntur, Andhra Pradesh',
    '1800-000-0003',
    'demo3@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Guntur, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Guntur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Guntur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Vijayawada',
    'Main Healthcare Road, Vijayawada, Andhra Pradesh',
    '1800-000-0004',
    'demo4@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vijayawada, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Vijayawada'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Vijayawada'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Vijayawada',
    'Central Medical Avenue, Vijayawada, Andhra Pradesh',
    '1800-000-0005',
    'demo5@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vijayawada, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Vijayawada'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Vijayawada'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Vijayawada',
    'Community Health Road, Vijayawada, Andhra Pradesh',
    '1800-000-0006',
    'demo6@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vijayawada, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Vijayawada'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Vijayawada'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Visakhapatnam',
    'Main Healthcare Road, Visakhapatnam, Andhra Pradesh',
    '1800-000-0007',
    'demo7@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Visakhapatnam, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Visakhapatnam'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Visakhapatnam'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Visakhapatnam',
    'Central Medical Avenue, Visakhapatnam, Andhra Pradesh',
    '1800-000-0008',
    'demo8@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Visakhapatnam, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Visakhapatnam'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Visakhapatnam'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Visakhapatnam',
    'Community Health Road, Visakhapatnam, Andhra Pradesh',
    '1800-000-0009',
    'demo9@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Visakhapatnam, Andhra Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andhra Pradesh'
  AND l.city = 'Visakhapatnam'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Visakhapatnam'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Itanagar',
    'Main Healthcare Road, Itanagar, Arunachal Pradesh',
    '1800-000-0010',
    'demo10@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Itanagar, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Itanagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Itanagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Itanagar',
    'Central Medical Avenue, Itanagar, Arunachal Pradesh',
    '1800-000-0011',
    'demo11@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Itanagar, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Itanagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Itanagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Itanagar',
    'Community Health Road, Itanagar, Arunachal Pradesh',
    '1800-000-0012',
    'demo12@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Itanagar, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Itanagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Itanagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Naharlagun',
    'Main Healthcare Road, Naharlagun, Arunachal Pradesh',
    '1800-000-0013',
    'demo13@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Naharlagun, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Naharlagun'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Naharlagun'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Naharlagun',
    'Central Medical Avenue, Naharlagun, Arunachal Pradesh',
    '1800-000-0014',
    'demo14@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Naharlagun, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Naharlagun'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Naharlagun'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Naharlagun',
    'Community Health Road, Naharlagun, Arunachal Pradesh',
    '1800-000-0015',
    'demo15@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Naharlagun, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Naharlagun'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Naharlagun'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Tawang',
    'Main Healthcare Road, Tawang, Arunachal Pradesh',
    '1800-000-0016',
    'demo16@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Tawang, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Tawang'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Tawang'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Tawang',
    'Central Medical Avenue, Tawang, Arunachal Pradesh',
    '1800-000-0017',
    'demo17@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Tawang, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Tawang'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Tawang'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Tawang',
    'Community Health Road, Tawang, Arunachal Pradesh',
    '1800-000-0018',
    'demo18@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Tawang, Arunachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Arunachal Pradesh'
  AND l.city = 'Tawang'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Tawang'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Guwahati',
    'Main Healthcare Road, Guwahati, Assam',
    '1800-000-0019',
    'demo19@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Guwahati, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Guwahati'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Guwahati'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Guwahati',
    'Central Medical Avenue, Guwahati, Assam',
    '1800-000-0020',
    'demo20@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Guwahati, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Guwahati'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Guwahati'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Guwahati',
    'Community Health Road, Guwahati, Assam',
    '1800-000-0021',
    'demo21@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Guwahati, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Guwahati'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Guwahati'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Dibrugarh',
    'Main Healthcare Road, Dibrugarh, Assam',
    '1800-000-0022',
    'demo22@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dibrugarh, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Dibrugarh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Dibrugarh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Dibrugarh',
    'Central Medical Avenue, Dibrugarh, Assam',
    '1800-000-0023',
    'demo23@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dibrugarh, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Dibrugarh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Dibrugarh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Dibrugarh',
    'Community Health Road, Dibrugarh, Assam',
    '1800-000-0024',
    'demo24@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dibrugarh, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Dibrugarh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Dibrugarh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Silchar',
    'Main Healthcare Road, Silchar, Assam',
    '1800-000-0025',
    'demo25@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Silchar, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Silchar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Silchar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Silchar',
    'Central Medical Avenue, Silchar, Assam',
    '1800-000-0026',
    'demo26@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Silchar, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Silchar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Silchar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Silchar',
    'Community Health Road, Silchar, Assam',
    '1800-000-0027',
    'demo27@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Silchar, Assam. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Assam'
  AND l.city = 'Silchar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Silchar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Patna',
    'Main Healthcare Road, Patna, Bihar',
    '1800-000-0028',
    'demo28@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Patna, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Patna'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Patna'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Patna',
    'Central Medical Avenue, Patna, Bihar',
    '1800-000-0029',
    'demo29@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Patna, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Patna'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Patna'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Patna',
    'Community Health Road, Patna, Bihar',
    '1800-000-0030',
    'demo30@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Patna, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Patna'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Patna'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Gaya',
    'Main Healthcare Road, Gaya, Bihar',
    '1800-000-0031',
    'demo31@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gaya, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Gaya'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Gaya'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Gaya',
    'Central Medical Avenue, Gaya, Bihar',
    '1800-000-0032',
    'demo32@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gaya, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Gaya'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Gaya'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Gaya',
    'Community Health Road, Gaya, Bihar',
    '1800-000-0033',
    'demo33@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gaya, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Gaya'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Gaya'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Muzaffarpur',
    'Main Healthcare Road, Muzaffarpur, Bihar',
    '1800-000-0034',
    'demo34@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Muzaffarpur, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Muzaffarpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Muzaffarpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Muzaffarpur',
    'Central Medical Avenue, Muzaffarpur, Bihar',
    '1800-000-0035',
    'demo35@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Muzaffarpur, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Muzaffarpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Muzaffarpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Muzaffarpur',
    'Community Health Road, Muzaffarpur, Bihar',
    '1800-000-0036',
    'demo36@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Muzaffarpur, Bihar. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Bihar'
  AND l.city = 'Muzaffarpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Muzaffarpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Raipur',
    'Main Healthcare Road, Raipur, Chhattisgarh',
    '1800-000-0037',
    'demo37@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Raipur, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Raipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Raipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Raipur',
    'Central Medical Avenue, Raipur, Chhattisgarh',
    '1800-000-0038',
    'demo38@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Raipur, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Raipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Raipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Raipur',
    'Community Health Road, Raipur, Chhattisgarh',
    '1800-000-0039',
    'demo39@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Raipur, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Raipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Raipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Bhilai',
    'Main Healthcare Road, Bhilai, Chhattisgarh',
    '1800-000-0040',
    'demo40@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhilai, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Bhilai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Bhilai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Bhilai',
    'Central Medical Avenue, Bhilai, Chhattisgarh',
    '1800-000-0041',
    'demo41@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhilai, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Bhilai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Bhilai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Bhilai',
    'Community Health Road, Bhilai, Chhattisgarh',
    '1800-000-0042',
    'demo42@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhilai, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Bhilai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Bhilai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Bilaspur',
    'Main Healthcare Road, Bilaspur, Chhattisgarh',
    '1800-000-0043',
    'demo43@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bilaspur, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Bilaspur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Bilaspur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Bilaspur',
    'Central Medical Avenue, Bilaspur, Chhattisgarh',
    '1800-000-0044',
    'demo44@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bilaspur, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Bilaspur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Bilaspur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Bilaspur',
    'Community Health Road, Bilaspur, Chhattisgarh',
    '1800-000-0045',
    'demo45@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bilaspur, Chhattisgarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chhattisgarh'
  AND l.city = 'Bilaspur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Bilaspur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Panaji',
    'Main Healthcare Road, Panaji, Goa',
    '1800-000-0046',
    'demo46@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Panaji, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Panaji'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Panaji'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Panaji',
    'Central Medical Avenue, Panaji, Goa',
    '1800-000-0047',
    'demo47@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Panaji, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Panaji'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Panaji'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Panaji',
    'Community Health Road, Panaji, Goa',
    '1800-000-0048',
    'demo48@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Panaji, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Panaji'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Panaji'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Margao',
    'Main Healthcare Road, Margao, Goa',
    '1800-000-0049',
    'demo49@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Margao, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Margao'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Margao'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Margao',
    'Central Medical Avenue, Margao, Goa',
    '1800-000-0050',
    'demo50@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Margao, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Margao'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Margao'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Margao',
    'Community Health Road, Margao, Goa',
    '1800-000-0051',
    'demo51@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Margao, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Margao'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Margao'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Vasco da Gama',
    'Main Healthcare Road, Vasco da Gama, Goa',
    '1800-000-0052',
    'demo52@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vasco da Gama, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Vasco da Gama'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Vasco da Gama'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Vasco da Gama',
    'Central Medical Avenue, Vasco da Gama, Goa',
    '1800-000-0053',
    'demo53@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vasco da Gama, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Vasco da Gama'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Vasco da Gama'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Vasco da Gama',
    'Community Health Road, Vasco da Gama, Goa',
    '1800-000-0054',
    'demo54@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vasco da Gama, Goa. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Goa'
  AND l.city = 'Vasco da Gama'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Vasco da Gama'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Ahmedabad',
    'Main Healthcare Road, Ahmedabad, Gujarat',
    '1800-000-0055',
    'demo55@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ahmedabad, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Ahmedabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Ahmedabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Ahmedabad',
    'Central Medical Avenue, Ahmedabad, Gujarat',
    '1800-000-0056',
    'demo56@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ahmedabad, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Ahmedabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Ahmedabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Ahmedabad',
    'Community Health Road, Ahmedabad, Gujarat',
    '1800-000-0057',
    'demo57@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ahmedabad, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Ahmedabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Ahmedabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Surat',
    'Main Healthcare Road, Surat, Gujarat',
    '1800-000-0058',
    'demo58@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Surat, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Surat'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Surat'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Surat',
    'Central Medical Avenue, Surat, Gujarat',
    '1800-000-0059',
    'demo59@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Surat, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Surat'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Surat'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Surat',
    'Community Health Road, Surat, Gujarat',
    '1800-000-0060',
    'demo60@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Surat, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Surat'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Surat'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Vadodara',
    'Main Healthcare Road, Vadodara, Gujarat',
    '1800-000-0061',
    'demo61@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vadodara, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Vadodara'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Vadodara'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Vadodara',
    'Central Medical Avenue, Vadodara, Gujarat',
    '1800-000-0062',
    'demo62@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vadodara, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Vadodara'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Vadodara'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Vadodara',
    'Community Health Road, Vadodara, Gujarat',
    '1800-000-0063',
    'demo63@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Vadodara, Gujarat. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Gujarat'
  AND l.city = 'Vadodara'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Vadodara'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Gurugram',
    'Main Healthcare Road, Gurugram, Haryana',
    '1800-000-0064',
    'demo64@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gurugram, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Gurugram'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Gurugram'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Gurugram',
    'Central Medical Avenue, Gurugram, Haryana',
    '1800-000-0065',
    'demo65@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gurugram, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Gurugram'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Gurugram'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Gurugram',
    'Community Health Road, Gurugram, Haryana',
    '1800-000-0066',
    'demo66@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gurugram, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Gurugram'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Gurugram'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Faridabad',
    'Main Healthcare Road, Faridabad, Haryana',
    '1800-000-0067',
    'demo67@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Faridabad, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Faridabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Faridabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Faridabad',
    'Central Medical Avenue, Faridabad, Haryana',
    '1800-000-0068',
    'demo68@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Faridabad, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Faridabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Faridabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Faridabad',
    'Community Health Road, Faridabad, Haryana',
    '1800-000-0069',
    'demo69@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Faridabad, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Faridabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Faridabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Panipat',
    'Main Healthcare Road, Panipat, Haryana',
    '1800-000-0070',
    'demo70@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Panipat, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Panipat'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Panipat'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Panipat',
    'Central Medical Avenue, Panipat, Haryana',
    '1800-000-0071',
    'demo71@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Panipat, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Panipat'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Panipat'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Panipat',
    'Community Health Road, Panipat, Haryana',
    '1800-000-0072',
    'demo72@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Panipat, Haryana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Haryana'
  AND l.city = 'Panipat'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Panipat'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Shimla',
    'Main Healthcare Road, Shimla, Himachal Pradesh',
    '1800-000-0073',
    'demo73@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Shimla, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Shimla'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Shimla'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Shimla',
    'Central Medical Avenue, Shimla, Himachal Pradesh',
    '1800-000-0074',
    'demo74@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Shimla, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Shimla'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Shimla'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Shimla',
    'Community Health Road, Shimla, Himachal Pradesh',
    '1800-000-0075',
    'demo75@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Shimla, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Shimla'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Shimla'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Dharamshala',
    'Main Healthcare Road, Dharamshala, Himachal Pradesh',
    '1800-000-0076',
    'demo76@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dharamshala, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Dharamshala'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Dharamshala'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Dharamshala',
    'Central Medical Avenue, Dharamshala, Himachal Pradesh',
    '1800-000-0077',
    'demo77@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dharamshala, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Dharamshala'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Dharamshala'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Dharamshala',
    'Community Health Road, Dharamshala, Himachal Pradesh',
    '1800-000-0078',
    'demo78@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dharamshala, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Dharamshala'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Dharamshala'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Mandi',
    'Main Healthcare Road, Mandi, Himachal Pradesh',
    '1800-000-0079',
    'demo79@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mandi, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Mandi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Mandi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Mandi',
    'Central Medical Avenue, Mandi, Himachal Pradesh',
    '1800-000-0080',
    'demo80@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mandi, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Mandi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Mandi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Mandi',
    'Community Health Road, Mandi, Himachal Pradesh',
    '1800-000-0081',
    'demo81@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mandi, Himachal Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Himachal Pradesh'
  AND l.city = 'Mandi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Mandi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Ranchi',
    'Main Healthcare Road, Ranchi, Jharkhand',
    '1800-000-0082',
    'demo82@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ranchi, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Ranchi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Ranchi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Ranchi',
    'Central Medical Avenue, Ranchi, Jharkhand',
    '1800-000-0083',
    'demo83@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ranchi, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Ranchi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Ranchi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Ranchi',
    'Community Health Road, Ranchi, Jharkhand',
    '1800-000-0084',
    'demo84@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ranchi, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Ranchi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Ranchi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Jamshedpur',
    'Main Healthcare Road, Jamshedpur, Jharkhand',
    '1800-000-0085',
    'demo85@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jamshedpur, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Jamshedpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Jamshedpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Jamshedpur',
    'Central Medical Avenue, Jamshedpur, Jharkhand',
    '1800-000-0086',
    'demo86@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jamshedpur, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Jamshedpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Jamshedpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Jamshedpur',
    'Community Health Road, Jamshedpur, Jharkhand',
    '1800-000-0087',
    'demo87@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jamshedpur, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Jamshedpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Jamshedpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Dhanbad',
    'Main Healthcare Road, Dhanbad, Jharkhand',
    '1800-000-0088',
    'demo88@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dhanbad, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Dhanbad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Dhanbad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Dhanbad',
    'Central Medical Avenue, Dhanbad, Jharkhand',
    '1800-000-0089',
    'demo89@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dhanbad, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Dhanbad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Dhanbad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Dhanbad',
    'Community Health Road, Dhanbad, Jharkhand',
    '1800-000-0090',
    'demo90@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dhanbad, Jharkhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jharkhand'
  AND l.city = 'Dhanbad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Dhanbad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Bengaluru',
    'Main Healthcare Road, Bengaluru, Karnataka',
    '1800-000-0091',
    'demo91@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bengaluru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Bengaluru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Bengaluru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Bengaluru',
    'Central Medical Avenue, Bengaluru, Karnataka',
    '1800-000-0092',
    'demo92@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bengaluru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Bengaluru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Bengaluru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Bengaluru',
    'Community Health Road, Bengaluru, Karnataka',
    '1800-000-0093',
    'demo93@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bengaluru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Bengaluru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Bengaluru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Mysuru',
    'Main Healthcare Road, Mysuru, Karnataka',
    '1800-000-0094',
    'demo94@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mysuru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Mysuru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Mysuru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Mysuru',
    'Central Medical Avenue, Mysuru, Karnataka',
    '1800-000-0095',
    'demo95@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mysuru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Mysuru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Mysuru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Mysuru',
    'Community Health Road, Mysuru, Karnataka',
    '1800-000-0096',
    'demo96@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mysuru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Mysuru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Mysuru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Mangaluru',
    'Main Healthcare Road, Mangaluru, Karnataka',
    '1800-000-0097',
    'demo97@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mangaluru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Mangaluru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Mangaluru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Mangaluru',
    'Central Medical Avenue, Mangaluru, Karnataka',
    '1800-000-0098',
    'demo98@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mangaluru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Mangaluru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Mangaluru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Mangaluru',
    'Community Health Road, Mangaluru, Karnataka',
    '1800-000-0099',
    'demo99@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mangaluru, Karnataka. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Karnataka'
  AND l.city = 'Mangaluru'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Mangaluru'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Thiruvananthapuram',
    'Main Healthcare Road, Thiruvananthapuram, Kerala',
    '1800-000-0100',
    'demo100@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Thiruvananthapuram, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Thiruvananthapuram'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Thiruvananthapuram'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Thiruvananthapuram',
    'Central Medical Avenue, Thiruvananthapuram, Kerala',
    '1800-000-0101',
    'demo101@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Thiruvananthapuram, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Thiruvananthapuram'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Thiruvananthapuram'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Thiruvananthapuram',
    'Community Health Road, Thiruvananthapuram, Kerala',
    '1800-000-0102',
    'demo102@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Thiruvananthapuram, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Thiruvananthapuram'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Thiruvananthapuram'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Kochi',
    'Main Healthcare Road, Kochi, Kerala',
    '1800-000-0103',
    'demo103@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kochi, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Kochi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Kochi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Kochi',
    'Central Medical Avenue, Kochi, Kerala',
    '1800-000-0104',
    'demo104@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kochi, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Kochi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Kochi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Kochi',
    'Community Health Road, Kochi, Kerala',
    '1800-000-0105',
    'demo105@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kochi, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Kochi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Kochi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Kozhikode',
    'Main Healthcare Road, Kozhikode, Kerala',
    '1800-000-0106',
    'demo106@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kozhikode, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Kozhikode'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Kozhikode'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Kozhikode',
    'Central Medical Avenue, Kozhikode, Kerala',
    '1800-000-0107',
    'demo107@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kozhikode, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Kozhikode'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Kozhikode'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Kozhikode',
    'Community Health Road, Kozhikode, Kerala',
    '1800-000-0108',
    'demo108@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kozhikode, Kerala. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Kerala'
  AND l.city = 'Kozhikode'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Kozhikode'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Bhopal',
    'Main Healthcare Road, Bhopal, Madhya Pradesh',
    '1800-000-0109',
    'demo109@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhopal, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Bhopal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Bhopal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Bhopal',
    'Central Medical Avenue, Bhopal, Madhya Pradesh',
    '1800-000-0110',
    'demo110@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhopal, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Bhopal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Bhopal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Bhopal',
    'Community Health Road, Bhopal, Madhya Pradesh',
    '1800-000-0111',
    'demo111@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhopal, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Bhopal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Bhopal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Indore',
    'Main Healthcare Road, Indore, Madhya Pradesh',
    '1800-000-0112',
    'demo112@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Indore, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Indore'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Indore'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Indore',
    'Central Medical Avenue, Indore, Madhya Pradesh',
    '1800-000-0113',
    'demo113@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Indore, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Indore'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Indore'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Indore',
    'Community Health Road, Indore, Madhya Pradesh',
    '1800-000-0114',
    'demo114@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Indore, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Indore'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Indore'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Jabalpur',
    'Main Healthcare Road, Jabalpur, Madhya Pradesh',
    '1800-000-0115',
    'demo115@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jabalpur, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Jabalpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Jabalpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Jabalpur',
    'Central Medical Avenue, Jabalpur, Madhya Pradesh',
    '1800-000-0116',
    'demo116@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jabalpur, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Jabalpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Jabalpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Jabalpur',
    'Community Health Road, Jabalpur, Madhya Pradesh',
    '1800-000-0117',
    'demo117@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jabalpur, Madhya Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Madhya Pradesh'
  AND l.city = 'Jabalpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Jabalpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Mumbai',
    'Main Healthcare Road, Mumbai, Maharashtra',
    '1800-000-0118',
    'demo118@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mumbai, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Mumbai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Mumbai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Mumbai',
    'Central Medical Avenue, Mumbai, Maharashtra',
    '1800-000-0119',
    'demo119@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mumbai, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Mumbai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Mumbai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Mumbai',
    'Community Health Road, Mumbai, Maharashtra',
    '1800-000-0120',
    'demo120@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mumbai, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Mumbai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Mumbai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Pune',
    'Main Healthcare Road, Pune, Maharashtra',
    '1800-000-0121',
    'demo121@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Pune, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Pune'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Pune'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Pune',
    'Central Medical Avenue, Pune, Maharashtra',
    '1800-000-0122',
    'demo122@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Pune, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Pune'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Pune'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Pune',
    'Community Health Road, Pune, Maharashtra',
    '1800-000-0123',
    'demo123@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Pune, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Pune'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Pune'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Nagpur',
    'Main Healthcare Road, Nagpur, Maharashtra',
    '1800-000-0124',
    'demo124@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nagpur, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Nagpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Nagpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Nagpur',
    'Central Medical Avenue, Nagpur, Maharashtra',
    '1800-000-0125',
    'demo125@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nagpur, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Nagpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Nagpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Nagpur',
    'Community Health Road, Nagpur, Maharashtra',
    '1800-000-0126',
    'demo126@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nagpur, Maharashtra. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Maharashtra'
  AND l.city = 'Nagpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Nagpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Imphal',
    'Main Healthcare Road, Imphal, Manipur',
    '1800-000-0127',
    'demo127@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Imphal, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Imphal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Imphal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Imphal',
    'Central Medical Avenue, Imphal, Manipur',
    '1800-000-0128',
    'demo128@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Imphal, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Imphal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Imphal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Imphal',
    'Community Health Road, Imphal, Manipur',
    '1800-000-0129',
    'demo129@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Imphal, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Imphal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Imphal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Thoubal',
    'Main Healthcare Road, Thoubal, Manipur',
    '1800-000-0130',
    'demo130@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Thoubal, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Thoubal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Thoubal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Thoubal',
    'Central Medical Avenue, Thoubal, Manipur',
    '1800-000-0131',
    'demo131@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Thoubal, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Thoubal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Thoubal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Thoubal',
    'Community Health Road, Thoubal, Manipur',
    '1800-000-0132',
    'demo132@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Thoubal, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Thoubal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Thoubal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Churachandpur',
    'Main Healthcare Road, Churachandpur, Manipur',
    '1800-000-0133',
    'demo133@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Churachandpur, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Churachandpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Churachandpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Churachandpur',
    'Central Medical Avenue, Churachandpur, Manipur',
    '1800-000-0134',
    'demo134@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Churachandpur, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Churachandpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Churachandpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Churachandpur',
    'Community Health Road, Churachandpur, Manipur',
    '1800-000-0135',
    'demo135@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Churachandpur, Manipur. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Manipur'
  AND l.city = 'Churachandpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Churachandpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Shillong',
    'Main Healthcare Road, Shillong, Meghalaya',
    '1800-000-0136',
    'demo136@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Shillong, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Shillong'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Shillong'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Shillong',
    'Central Medical Avenue, Shillong, Meghalaya',
    '1800-000-0137',
    'demo137@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Shillong, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Shillong'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Shillong'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Shillong',
    'Community Health Road, Shillong, Meghalaya',
    '1800-000-0138',
    'demo138@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Shillong, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Shillong'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Shillong'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Tura',
    'Main Healthcare Road, Tura, Meghalaya',
    '1800-000-0139',
    'demo139@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Tura, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Tura'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Tura'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Tura',
    'Central Medical Avenue, Tura, Meghalaya',
    '1800-000-0140',
    'demo140@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Tura, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Tura'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Tura'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Tura',
    'Community Health Road, Tura, Meghalaya',
    '1800-000-0141',
    'demo141@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Tura, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Tura'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Tura'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Jowai',
    'Main Healthcare Road, Jowai, Meghalaya',
    '1800-000-0142',
    'demo142@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jowai, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Jowai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Jowai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Jowai',
    'Central Medical Avenue, Jowai, Meghalaya',
    '1800-000-0143',
    'demo143@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jowai, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Jowai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Jowai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Jowai',
    'Community Health Road, Jowai, Meghalaya',
    '1800-000-0144',
    'demo144@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jowai, Meghalaya. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Meghalaya'
  AND l.city = 'Jowai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Jowai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Aizawl',
    'Main Healthcare Road, Aizawl, Mizoram',
    '1800-000-0145',
    'demo145@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Aizawl, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Aizawl'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Aizawl'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Aizawl',
    'Central Medical Avenue, Aizawl, Mizoram',
    '1800-000-0146',
    'demo146@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Aizawl, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Aizawl'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Aizawl'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Aizawl',
    'Community Health Road, Aizawl, Mizoram',
    '1800-000-0147',
    'demo147@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Aizawl, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Aizawl'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Aizawl'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Lunglei',
    'Main Healthcare Road, Lunglei, Mizoram',
    '1800-000-0148',
    'demo148@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Lunglei, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Lunglei'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Lunglei'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Lunglei',
    'Central Medical Avenue, Lunglei, Mizoram',
    '1800-000-0149',
    'demo149@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Lunglei, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Lunglei'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Lunglei'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Lunglei',
    'Community Health Road, Lunglei, Mizoram',
    '1800-000-0150',
    'demo150@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Lunglei, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Lunglei'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Lunglei'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Champhai',
    'Main Healthcare Road, Champhai, Mizoram',
    '1800-000-0151',
    'demo151@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Champhai, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Champhai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Champhai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Champhai',
    'Central Medical Avenue, Champhai, Mizoram',
    '1800-000-0152',
    'demo152@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Champhai, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Champhai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Champhai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Champhai',
    'Community Health Road, Champhai, Mizoram',
    '1800-000-0153',
    'demo153@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Champhai, Mizoram. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Mizoram'
  AND l.city = 'Champhai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Champhai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Kohima',
    'Main Healthcare Road, Kohima, Nagaland',
    '1800-000-0154',
    'demo154@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kohima, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Kohima'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Kohima'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Kohima',
    'Central Medical Avenue, Kohima, Nagaland',
    '1800-000-0155',
    'demo155@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kohima, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Kohima'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Kohima'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Kohima',
    'Community Health Road, Kohima, Nagaland',
    '1800-000-0156',
    'demo156@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kohima, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Kohima'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Kohima'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Dimapur',
    'Main Healthcare Road, Dimapur, Nagaland',
    '1800-000-0157',
    'demo157@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dimapur, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Dimapur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Dimapur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Dimapur',
    'Central Medical Avenue, Dimapur, Nagaland',
    '1800-000-0158',
    'demo158@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dimapur, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Dimapur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Dimapur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Dimapur',
    'Community Health Road, Dimapur, Nagaland',
    '1800-000-0159',
    'demo159@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dimapur, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Dimapur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Dimapur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Mokokchung',
    'Main Healthcare Road, Mokokchung, Nagaland',
    '1800-000-0160',
    'demo160@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mokokchung, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Mokokchung'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Mokokchung'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Mokokchung',
    'Central Medical Avenue, Mokokchung, Nagaland',
    '1800-000-0161',
    'demo161@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mokokchung, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Mokokchung'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Mokokchung'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Mokokchung',
    'Community Health Road, Mokokchung, Nagaland',
    '1800-000-0162',
    'demo162@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Mokokchung, Nagaland. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Nagaland'
  AND l.city = 'Mokokchung'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Mokokchung'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Bhubaneswar',
    'Main Healthcare Road, Bhubaneswar, Odisha',
    '1800-000-0163',
    'demo163@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhubaneswar, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Bhubaneswar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Bhubaneswar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Bhubaneswar',
    'Central Medical Avenue, Bhubaneswar, Odisha',
    '1800-000-0164',
    'demo164@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhubaneswar, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Bhubaneswar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Bhubaneswar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Bhubaneswar',
    'Community Health Road, Bhubaneswar, Odisha',
    '1800-000-0165',
    'demo165@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Bhubaneswar, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Bhubaneswar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Bhubaneswar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Cuttack',
    'Main Healthcare Road, Cuttack, Odisha',
    '1800-000-0166',
    'demo166@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Cuttack, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Cuttack'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Cuttack'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Cuttack',
    'Central Medical Avenue, Cuttack, Odisha',
    '1800-000-0167',
    'demo167@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Cuttack, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Cuttack'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Cuttack'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Cuttack',
    'Community Health Road, Cuttack, Odisha',
    '1800-000-0168',
    'demo168@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Cuttack, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Cuttack'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Cuttack'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Rourkela',
    'Main Healthcare Road, Rourkela, Odisha',
    '1800-000-0169',
    'demo169@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Rourkela, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Rourkela'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Rourkela'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Rourkela',
    'Central Medical Avenue, Rourkela, Odisha',
    '1800-000-0170',
    'demo170@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Rourkela, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Rourkela'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Rourkela'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Rourkela',
    'Community Health Road, Rourkela, Odisha',
    '1800-000-0171',
    'demo171@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Rourkela, Odisha. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Odisha'
  AND l.city = 'Rourkela'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Rourkela'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Amritsar',
    'Main Healthcare Road, Amritsar, Punjab',
    '1800-000-0172',
    'demo172@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Amritsar, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Amritsar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Amritsar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Amritsar',
    'Central Medical Avenue, Amritsar, Punjab',
    '1800-000-0173',
    'demo173@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Amritsar, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Amritsar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Amritsar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Amritsar',
    'Community Health Road, Amritsar, Punjab',
    '1800-000-0174',
    'demo174@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Amritsar, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Amritsar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Amritsar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Ludhiana',
    'Main Healthcare Road, Ludhiana, Punjab',
    '1800-000-0175',
    'demo175@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ludhiana, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Ludhiana'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Ludhiana'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Ludhiana',
    'Central Medical Avenue, Ludhiana, Punjab',
    '1800-000-0176',
    'demo176@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ludhiana, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Ludhiana'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Ludhiana'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Ludhiana',
    'Community Health Road, Ludhiana, Punjab',
    '1800-000-0177',
    'demo177@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Ludhiana, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Ludhiana'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Ludhiana'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Jalandhar',
    'Main Healthcare Road, Jalandhar, Punjab',
    '1800-000-0178',
    'demo178@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jalandhar, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Jalandhar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Jalandhar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Jalandhar',
    'Central Medical Avenue, Jalandhar, Punjab',
    '1800-000-0179',
    'demo179@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jalandhar, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Jalandhar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Jalandhar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Jalandhar',
    'Community Health Road, Jalandhar, Punjab',
    '1800-000-0180',
    'demo180@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jalandhar, Punjab. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Punjab'
  AND l.city = 'Jalandhar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Jalandhar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Jaipur',
    'Main Healthcare Road, Jaipur, Rajasthan',
    '1800-000-0181',
    'demo181@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jaipur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Jaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Jaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Jaipur',
    'Central Medical Avenue, Jaipur, Rajasthan',
    '1800-000-0182',
    'demo182@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jaipur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Jaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Jaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Jaipur',
    'Community Health Road, Jaipur, Rajasthan',
    '1800-000-0183',
    'demo183@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jaipur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Jaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Jaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Jodhpur',
    'Main Healthcare Road, Jodhpur, Rajasthan',
    '1800-000-0184',
    'demo184@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jodhpur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Jodhpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Jodhpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Jodhpur',
    'Central Medical Avenue, Jodhpur, Rajasthan',
    '1800-000-0185',
    'demo185@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jodhpur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Jodhpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Jodhpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Jodhpur',
    'Community Health Road, Jodhpur, Rajasthan',
    '1800-000-0186',
    'demo186@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jodhpur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Jodhpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Jodhpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Udaipur',
    'Main Healthcare Road, Udaipur, Rajasthan',
    '1800-000-0187',
    'demo187@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Udaipur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Udaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Udaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Udaipur',
    'Central Medical Avenue, Udaipur, Rajasthan',
    '1800-000-0188',
    'demo188@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Udaipur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Udaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Udaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Udaipur',
    'Community Health Road, Udaipur, Rajasthan',
    '1800-000-0189',
    'demo189@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Udaipur, Rajasthan. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Rajasthan'
  AND l.city = 'Udaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Udaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Gangtok',
    'Main Healthcare Road, Gangtok, Sikkim',
    '1800-000-0190',
    'demo190@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gangtok, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Gangtok'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Gangtok'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Gangtok',
    'Central Medical Avenue, Gangtok, Sikkim',
    '1800-000-0191',
    'demo191@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gangtok, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Gangtok'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Gangtok'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Gangtok',
    'Community Health Road, Gangtok, Sikkim',
    '1800-000-0192',
    'demo192@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gangtok, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Gangtok'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Gangtok'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Namchi',
    'Main Healthcare Road, Namchi, Sikkim',
    '1800-000-0193',
    'demo193@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Namchi, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Namchi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Namchi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Namchi',
    'Central Medical Avenue, Namchi, Sikkim',
    '1800-000-0194',
    'demo194@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Namchi, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Namchi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Namchi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Namchi',
    'Community Health Road, Namchi, Sikkim',
    '1800-000-0195',
    'demo195@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Namchi, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Namchi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Namchi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Gyalshing',
    'Main Healthcare Road, Gyalshing, Sikkim',
    '1800-000-0196',
    'demo196@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gyalshing, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Gyalshing'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Gyalshing'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Gyalshing',
    'Central Medical Avenue, Gyalshing, Sikkim',
    '1800-000-0197',
    'demo197@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gyalshing, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Gyalshing'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Gyalshing'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Gyalshing',
    'Community Health Road, Gyalshing, Sikkim',
    '1800-000-0198',
    'demo198@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Gyalshing, Sikkim. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Sikkim'
  AND l.city = 'Gyalshing'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Gyalshing'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Chennai',
    'Main Healthcare Road, Chennai, Tamil Nadu',
    '1800-000-0199',
    'demo199@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Chennai, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Chennai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Chennai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Chennai',
    'Central Medical Avenue, Chennai, Tamil Nadu',
    '1800-000-0200',
    'demo200@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Chennai, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Chennai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Chennai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Chennai',
    'Community Health Road, Chennai, Tamil Nadu',
    '1800-000-0201',
    'demo201@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Chennai, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Chennai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Chennai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Coimbatore',
    'Main Healthcare Road, Coimbatore, Tamil Nadu',
    '1800-000-0202',
    'demo202@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Coimbatore, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Coimbatore'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Coimbatore'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Coimbatore',
    'Central Medical Avenue, Coimbatore, Tamil Nadu',
    '1800-000-0203',
    'demo203@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Coimbatore, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Coimbatore'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Coimbatore'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Coimbatore',
    'Community Health Road, Coimbatore, Tamil Nadu',
    '1800-000-0204',
    'demo204@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Coimbatore, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Coimbatore'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Coimbatore'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Madurai',
    'Main Healthcare Road, Madurai, Tamil Nadu',
    '1800-000-0205',
    'demo205@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Madurai, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Madurai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Madurai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Madurai',
    'Central Medical Avenue, Madurai, Tamil Nadu',
    '1800-000-0206',
    'demo206@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Madurai, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Madurai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Madurai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Madurai',
    'Community Health Road, Madurai, Tamil Nadu',
    '1800-000-0207',
    'demo207@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Madurai, Tamil Nadu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tamil Nadu'
  AND l.city = 'Madurai'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Madurai'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Hyderabad',
    'Main Healthcare Road, Hyderabad, Telangana',
    '1800-000-0208',
    'demo208@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Hyderabad, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Hyderabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Hyderabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Hyderabad',
    'Central Medical Avenue, Hyderabad, Telangana',
    '1800-000-0209',
    'demo209@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Hyderabad, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Hyderabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Hyderabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Hyderabad',
    'Community Health Road, Hyderabad, Telangana',
    '1800-000-0210',
    'demo210@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Hyderabad, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Hyderabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Hyderabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Warangal',
    'Main Healthcare Road, Warangal, Telangana',
    '1800-000-0211',
    'demo211@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Warangal, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Warangal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Warangal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Warangal',
    'Central Medical Avenue, Warangal, Telangana',
    '1800-000-0212',
    'demo212@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Warangal, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Warangal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Warangal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Warangal',
    'Community Health Road, Warangal, Telangana',
    '1800-000-0213',
    'demo213@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Warangal, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Warangal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Warangal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Nizamabad',
    'Main Healthcare Road, Nizamabad, Telangana',
    '1800-000-0214',
    'demo214@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nizamabad, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Nizamabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Nizamabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Nizamabad',
    'Central Medical Avenue, Nizamabad, Telangana',
    '1800-000-0215',
    'demo215@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nizamabad, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Nizamabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Nizamabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Nizamabad',
    'Community Health Road, Nizamabad, Telangana',
    '1800-000-0216',
    'demo216@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nizamabad, Telangana. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Telangana'
  AND l.city = 'Nizamabad'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Nizamabad'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Agartala',
    'Main Healthcare Road, Agartala, Tripura',
    '1800-000-0217',
    'demo217@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Agartala, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Agartala'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Agartala'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Agartala',
    'Central Medical Avenue, Agartala, Tripura',
    '1800-000-0218',
    'demo218@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Agartala, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Agartala'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Agartala'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Agartala',
    'Community Health Road, Agartala, Tripura',
    '1800-000-0219',
    'demo219@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Agartala, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Agartala'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Agartala'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Udaipur',
    'Main Healthcare Road, Udaipur, Tripura',
    '1800-000-0220',
    'demo220@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Udaipur, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Udaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Udaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Udaipur',
    'Central Medical Avenue, Udaipur, Tripura',
    '1800-000-0221',
    'demo221@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Udaipur, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Udaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Udaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Udaipur',
    'Community Health Road, Udaipur, Tripura',
    '1800-000-0222',
    'demo222@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Udaipur, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Udaipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Udaipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Dharmanagar',
    'Main Healthcare Road, Dharmanagar, Tripura',
    '1800-000-0223',
    'demo223@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dharmanagar, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Dharmanagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Dharmanagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Dharmanagar',
    'Central Medical Avenue, Dharmanagar, Tripura',
    '1800-000-0224',
    'demo224@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dharmanagar, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Dharmanagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Dharmanagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Dharmanagar',
    'Community Health Road, Dharmanagar, Tripura',
    '1800-000-0225',
    'demo225@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dharmanagar, Tripura. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Tripura'
  AND l.city = 'Dharmanagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Dharmanagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Lucknow',
    'Main Healthcare Road, Lucknow, Uttar Pradesh',
    '1800-000-0226',
    'demo226@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Lucknow, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Lucknow'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Lucknow'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Lucknow',
    'Central Medical Avenue, Lucknow, Uttar Pradesh',
    '1800-000-0227',
    'demo227@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Lucknow, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Lucknow'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Lucknow'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Lucknow',
    'Community Health Road, Lucknow, Uttar Pradesh',
    '1800-000-0228',
    'demo228@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Lucknow, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Lucknow'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Lucknow'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Kanpur',
    'Main Healthcare Road, Kanpur, Uttar Pradesh',
    '1800-000-0229',
    'demo229@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kanpur, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Kanpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Kanpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Kanpur',
    'Central Medical Avenue, Kanpur, Uttar Pradesh',
    '1800-000-0230',
    'demo230@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kanpur, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Kanpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Kanpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Kanpur',
    'Community Health Road, Kanpur, Uttar Pradesh',
    '1800-000-0231',
    'demo231@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kanpur, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Kanpur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Kanpur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Varanasi',
    'Main Healthcare Road, Varanasi, Uttar Pradesh',
    '1800-000-0232',
    'demo232@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Varanasi, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Varanasi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Varanasi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Varanasi',
    'Central Medical Avenue, Varanasi, Uttar Pradesh',
    '1800-000-0233',
    'demo233@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Varanasi, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Varanasi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Varanasi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Varanasi',
    'Community Health Road, Varanasi, Uttar Pradesh',
    '1800-000-0234',
    'demo234@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Varanasi, Uttar Pradesh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttar Pradesh'
  AND l.city = 'Varanasi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Varanasi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Dehradun',
    'Main Healthcare Road, Dehradun, Uttarakhand',
    '1800-000-0235',
    'demo235@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dehradun, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Dehradun'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Dehradun'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Dehradun',
    'Central Medical Avenue, Dehradun, Uttarakhand',
    '1800-000-0236',
    'demo236@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dehradun, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Dehradun'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Dehradun'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Dehradun',
    'Community Health Road, Dehradun, Uttarakhand',
    '1800-000-0237',
    'demo237@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Dehradun, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Dehradun'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Dehradun'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Haridwar',
    'Main Healthcare Road, Haridwar, Uttarakhand',
    '1800-000-0238',
    'demo238@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Haridwar, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Haridwar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Haridwar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Haridwar',
    'Central Medical Avenue, Haridwar, Uttarakhand',
    '1800-000-0239',
    'demo239@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Haridwar, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Haridwar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Haridwar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Haridwar',
    'Community Health Road, Haridwar, Uttarakhand',
    '1800-000-0240',
    'demo240@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Haridwar, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Haridwar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Haridwar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Haldwani',
    'Main Healthcare Road, Haldwani, Uttarakhand',
    '1800-000-0241',
    'demo241@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Haldwani, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Haldwani'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Haldwani'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Haldwani',
    'Central Medical Avenue, Haldwani, Uttarakhand',
    '1800-000-0242',
    'demo242@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Haldwani, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Haldwani'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Haldwani'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Haldwani',
    'Community Health Road, Haldwani, Uttarakhand',
    '1800-000-0243',
    'demo243@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Haldwani, Uttarakhand. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Uttarakhand'
  AND l.city = 'Haldwani'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Haldwani'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Kolkata',
    'Main Healthcare Road, Kolkata, West Bengal',
    '1800-000-0244',
    'demo244@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kolkata, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Kolkata'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Kolkata'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Kolkata',
    'Central Medical Avenue, Kolkata, West Bengal',
    '1800-000-0245',
    'demo245@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kolkata, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Kolkata'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Kolkata'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Kolkata',
    'Community Health Road, Kolkata, West Bengal',
    '1800-000-0246',
    'demo246@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kolkata, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Kolkata'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Kolkata'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Siliguri',
    'Main Healthcare Road, Siliguri, West Bengal',
    '1800-000-0247',
    'demo247@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Siliguri, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Siliguri'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Siliguri'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Siliguri',
    'Central Medical Avenue, Siliguri, West Bengal',
    '1800-000-0248',
    'demo248@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Siliguri, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Siliguri'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Siliguri'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Siliguri',
    'Community Health Road, Siliguri, West Bengal',
    '1800-000-0249',
    'demo249@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Siliguri, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Siliguri'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Siliguri'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Durgapur',
    'Main Healthcare Road, Durgapur, West Bengal',
    '1800-000-0250',
    'demo250@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Durgapur, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Durgapur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Durgapur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Durgapur',
    'Central Medical Avenue, Durgapur, West Bengal',
    '1800-000-0251',
    'demo251@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Durgapur, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Durgapur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Durgapur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Durgapur',
    'Community Health Road, Durgapur, West Bengal',
    '1800-000-0252',
    'demo252@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Durgapur, West Bengal. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'West Bengal'
  AND l.city = 'Durgapur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Durgapur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Port Blair',
    'Main Healthcare Road, Port Blair, Andaman and Nicobar Islands',
    '1800-000-0253',
    'demo253@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Port Blair, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Port Blair'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Port Blair'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Port Blair',
    'Central Medical Avenue, Port Blair, Andaman and Nicobar Islands',
    '1800-000-0254',
    'demo254@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Port Blair, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Port Blair'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Port Blair'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Port Blair',
    'Community Health Road, Port Blair, Andaman and Nicobar Islands',
    '1800-000-0255',
    'demo255@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Port Blair, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Port Blair'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Port Blair'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Diglipur',
    'Main Healthcare Road, Diglipur, Andaman and Nicobar Islands',
    '1800-000-0256',
    'demo256@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Diglipur, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Diglipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Diglipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Diglipur',
    'Central Medical Avenue, Diglipur, Andaman and Nicobar Islands',
    '1800-000-0257',
    'demo257@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Diglipur, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Diglipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Diglipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Diglipur',
    'Community Health Road, Diglipur, Andaman and Nicobar Islands',
    '1800-000-0258',
    'demo258@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Diglipur, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Diglipur'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Diglipur'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Car Nicobar',
    'Main Healthcare Road, Car Nicobar, Andaman and Nicobar Islands',
    '1800-000-0259',
    'demo259@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Car Nicobar, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Car Nicobar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Car Nicobar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Car Nicobar',
    'Central Medical Avenue, Car Nicobar, Andaman and Nicobar Islands',
    '1800-000-0260',
    'demo260@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Car Nicobar, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Car Nicobar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Car Nicobar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Car Nicobar',
    'Community Health Road, Car Nicobar, Andaman and Nicobar Islands',
    '1800-000-0261',
    'demo261@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Car Nicobar, Andaman and Nicobar Islands. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Andaman and Nicobar Islands'
  AND l.city = 'Car Nicobar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Car Nicobar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Chandigarh',
    'Main Healthcare Road, Chandigarh, Chandigarh',
    '1800-000-0262',
    'demo262@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Chandigarh, Chandigarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chandigarh'
  AND l.city = 'Chandigarh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Chandigarh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Chandigarh',
    'Central Medical Avenue, Chandigarh, Chandigarh',
    '1800-000-0263',
    'demo263@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Chandigarh, Chandigarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chandigarh'
  AND l.city = 'Chandigarh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Chandigarh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Chandigarh',
    'Community Health Road, Chandigarh, Chandigarh',
    '1800-000-0264',
    'demo264@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Chandigarh, Chandigarh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Chandigarh'
  AND l.city = 'Chandigarh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Chandigarh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Daman',
    'Main Healthcare Road, Daman, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0265',
    'demo265@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Daman, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Daman'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Daman'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Daman',
    'Central Medical Avenue, Daman, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0266',
    'demo266@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Daman, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Daman'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Daman'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Daman',
    'Community Health Road, Daman, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0267',
    'demo267@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Daman, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Daman'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Daman'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Diu',
    'Main Healthcare Road, Diu, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0268',
    'demo268@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Diu, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Diu'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Diu'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Diu',
    'Central Medical Avenue, Diu, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0269',
    'demo269@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Diu, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Diu'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Diu'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Diu',
    'Community Health Road, Diu, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0270',
    'demo270@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Diu, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Diu'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Diu'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Silvassa',
    'Main Healthcare Road, Silvassa, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0271',
    'demo271@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Silvassa, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Silvassa'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Silvassa'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Silvassa',
    'Central Medical Avenue, Silvassa, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0272',
    'demo272@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Silvassa, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Silvassa'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Silvassa'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Silvassa',
    'Community Health Road, Silvassa, Dadra and Nagar Haveli and Daman and Diu',
    '1800-000-0273',
    'demo273@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Silvassa, Dadra and Nagar Haveli and Daman and Diu. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Dadra and Nagar Haveli and Daman and Diu'
  AND l.city = 'Silvassa'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Silvassa'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - New Delhi',
    'Main Healthcare Road, New Delhi, Delhi',
    '1800-000-0274',
    'demo274@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in New Delhi, Delhi. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Delhi'
  AND l.city = 'New Delhi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - New Delhi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - New Delhi',
    'Central Medical Avenue, New Delhi, Delhi',
    '1800-000-0275',
    'demo275@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in New Delhi, Delhi. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Delhi'
  AND l.city = 'New Delhi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - New Delhi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - New Delhi',
    'Community Health Road, New Delhi, Delhi',
    '1800-000-0276',
    'demo276@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in New Delhi, Delhi. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Delhi'
  AND l.city = 'New Delhi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - New Delhi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Delhi',
    'Main Healthcare Road, Delhi, Delhi',
    '1800-000-0277',
    'demo277@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Delhi, Delhi. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Delhi'
  AND l.city = 'Delhi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Delhi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Delhi',
    'Central Medical Avenue, Delhi, Delhi',
    '1800-000-0278',
    'demo278@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Delhi, Delhi. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Delhi'
  AND l.city = 'Delhi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Delhi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Delhi',
    'Community Health Road, Delhi, Delhi',
    '1800-000-0279',
    'demo279@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Delhi, Delhi. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Delhi'
  AND l.city = 'Delhi'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Delhi'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Srinagar',
    'Main Healthcare Road, Srinagar, Jammu and Kashmir',
    '1800-000-0280',
    'demo280@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Srinagar, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Srinagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Srinagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Srinagar',
    'Central Medical Avenue, Srinagar, Jammu and Kashmir',
    '1800-000-0281',
    'demo281@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Srinagar, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Srinagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Srinagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Srinagar',
    'Community Health Road, Srinagar, Jammu and Kashmir',
    '1800-000-0282',
    'demo282@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Srinagar, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Srinagar'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Srinagar'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Jammu',
    'Main Healthcare Road, Jammu, Jammu and Kashmir',
    '1800-000-0283',
    'demo283@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jammu, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Jammu'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Jammu'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Jammu',
    'Central Medical Avenue, Jammu, Jammu and Kashmir',
    '1800-000-0284',
    'demo284@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jammu, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Jammu'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Jammu'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Jammu',
    'Community Health Road, Jammu, Jammu and Kashmir',
    '1800-000-0285',
    'demo285@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Jammu, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Jammu'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Jammu'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Anantnag',
    'Main Healthcare Road, Anantnag, Jammu and Kashmir',
    '1800-000-0286',
    'demo286@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Anantnag, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Anantnag'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Anantnag'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Anantnag',
    'Central Medical Avenue, Anantnag, Jammu and Kashmir',
    '1800-000-0287',
    'demo287@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Anantnag, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Anantnag'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Anantnag'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Anantnag',
    'Community Health Road, Anantnag, Jammu and Kashmir',
    '1800-000-0288',
    'demo288@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Anantnag, Jammu and Kashmir. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Jammu and Kashmir'
  AND l.city = 'Anantnag'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Anantnag'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Leh',
    'Main Healthcare Road, Leh, Ladakh',
    '1800-000-0289',
    'demo289@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Leh, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Leh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Leh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Leh',
    'Central Medical Avenue, Leh, Ladakh',
    '1800-000-0290',
    'demo290@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Leh, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Leh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Leh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Leh',
    'Community Health Road, Leh, Ladakh',
    '1800-000-0291',
    'demo291@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Leh, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Leh'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Leh'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Kargil',
    'Main Healthcare Road, Kargil, Ladakh',
    '1800-000-0292',
    'demo292@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kargil, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Kargil'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Kargil'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Kargil',
    'Central Medical Avenue, Kargil, Ladakh',
    '1800-000-0293',
    'demo293@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kargil, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Kargil'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Kargil'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Kargil',
    'Community Health Road, Kargil, Ladakh',
    '1800-000-0294',
    'demo294@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kargil, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Kargil'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Kargil'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Nubra',
    'Main Healthcare Road, Nubra, Ladakh',
    '1800-000-0295',
    'demo295@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nubra, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Nubra'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Nubra'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Nubra',
    'Central Medical Avenue, Nubra, Ladakh',
    '1800-000-0296',
    'demo296@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nubra, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Nubra'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Nubra'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Nubra',
    'Community Health Road, Nubra, Ladakh',
    '1800-000-0297',
    'demo297@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Nubra, Ladakh. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Ladakh'
  AND l.city = 'Nubra'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Nubra'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Kavaratti',
    'Main Healthcare Road, Kavaratti, Lakshadweep',
    '1800-000-0298',
    'demo298@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kavaratti, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Kavaratti'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Kavaratti'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Kavaratti',
    'Central Medical Avenue, Kavaratti, Lakshadweep',
    '1800-000-0299',
    'demo299@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kavaratti, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Kavaratti'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Kavaratti'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Kavaratti',
    'Community Health Road, Kavaratti, Lakshadweep',
    '1800-000-0300',
    'demo300@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Kavaratti, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Kavaratti'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Kavaratti'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Agatti',
    'Main Healthcare Road, Agatti, Lakshadweep',
    '1800-000-0301',
    'demo301@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Agatti, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Agatti'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Agatti'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Agatti',
    'Central Medical Avenue, Agatti, Lakshadweep',
    '1800-000-0302',
    'demo302@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Agatti, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Agatti'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Agatti'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Agatti',
    'Community Health Road, Agatti, Lakshadweep',
    '1800-000-0303',
    'demo303@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Agatti, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Agatti'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Agatti'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Andrott',
    'Main Healthcare Road, Andrott, Lakshadweep',
    '1800-000-0304',
    'demo304@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Andrott, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Andrott'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Andrott'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Andrott',
    'Central Medical Avenue, Andrott, Lakshadweep',
    '1800-000-0305',
    'demo305@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Andrott, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Andrott'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Andrott'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Andrott',
    'Community Health Road, Andrott, Lakshadweep',
    '1800-000-0306',
    'demo306@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Andrott, Lakshadweep. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Lakshadweep'
  AND l.city = 'Andrott'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Andrott'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Puducherry',
    'Main Healthcare Road, Puducherry, Puducherry',
    '1800-000-0307',
    'demo307@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Puducherry, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Puducherry'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Puducherry'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Puducherry',
    'Central Medical Avenue, Puducherry, Puducherry',
    '1800-000-0308',
    'demo308@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Puducherry, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Puducherry'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Puducherry'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Puducherry',
    'Community Health Road, Puducherry, Puducherry',
    '1800-000-0309',
    'demo309@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Puducherry, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Puducherry'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Puducherry'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Karaikal',
    'Main Healthcare Road, Karaikal, Puducherry',
    '1800-000-0310',
    'demo310@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Karaikal, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Karaikal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Karaikal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Karaikal',
    'Central Medical Avenue, Karaikal, Puducherry',
    '1800-000-0311',
    'demo311@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Karaikal, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Karaikal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Karaikal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Karaikal',
    'Community Health Road, Karaikal, Puducherry',
    '1800-000-0312',
    'demo312@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Karaikal, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Karaikal'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Karaikal'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo Multispeciality Hospital - Yanam',
    'Main Healthcare Road, Yanam, Puducherry',
    '1800-000-0313',
    'demo313@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Yanam, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Yanam'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo Multispeciality Hospital - Yanam'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo City Hospital - Yanam',
    'Central Medical Avenue, Yanam, Puducherry',
    '1800-000-0314',
    'demo314@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Yanam, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Yanam'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo City Hospital - Yanam'
  );
INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description,
    is_active
)
SELECT
    l.id,
    'ClinicCare Demo General Hospital - Yanam',
    'Community Health Road, Yanam, Puducherry',
    '1800-000-0315',
    'demo315@cliniccare.demo',
    'https://cliniccare.demo',
    TRUE,
    'Demo hospital record for ClinicCare development and testing in Yanam, Puducherry. This is sample data and does not represent a real hospital.',
    TRUE
FROM locations l
WHERE l.state = 'Puducherry'
  AND l.city = 'Yanam'
  AND NOT EXISTS (
      SELECT 1
      FROM hospitals h
      WHERE h.location_id = l.id
        AND h.name = 'ClinicCare Demo General Hospital - Yanam'
  );

COMMIT;

-- Verification queries
SELECT state, COUNT(*) AS city_count
FROM locations
GROUP BY state
ORDER BY state;

SELECT COUNT(*) AS total_locations FROM locations;
SELECT COUNT(*) AS total_hospitals FROM hospitals;