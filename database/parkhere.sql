
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(20),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    phone_number BIGINT,
    license_number VARCHAR(20),
    car_model VARCHAR(20)
);

CREATE TABLE Locations (
    parking_space_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    address VARCHAR(100),
    amenities TEXT,
    price DECIMAL,
    latitude DECIMAL,
    longitude DECIMAL,
    availability VARCHAR(20),
    owner_id INT REFERENCES Users(user_id)
);

CREATE TABLE Bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES Users(user_id),
    parking_space_id INT REFERENCES ParkingSpaces(parking_space_id),
    start_date DATE,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    total_price DECIMAL
);


INSERT INTO Users (email, password, first_name, last_name, phone_number, license_number, car_model)
VALUES
('john.doe@example.com', 'password123', 'John', 'Doe', 5551234567, 'ABC123', 'Honda Civic'),
('jane.smith@example.com', 'securepassword', 'Jane', 'Smith', 5552345678, 'XYZ789', 'Toyota Camry'),
('bob.johnson@example.com', 'strongpassword', 'Bob', 'Johnson', 5553456789, 'DEF456', 'Ford Focus'),
('alice.williams@example.com', 'password1234', 'Alice', 'Williams', 5554567890, 'GHI012', 'Chevrolet Cruze'),
('david.brown@example.com', 'securepassword1', 'David', 'Brown', 5555678901, 'JKL345', 'Nissan Altima'),
('mary.wilson@example.com', 'password1235', 'Mary', 'Wilson', 5556789012, 'MNO678', 'Hyundai Elantra'),
('peter.jones@example.com', 'securepassword2', 'Peter', 'Jones', 5557890123, 'PQR901', 'Kia Optima'),
('susan.davis@example.com', 'password1236', 'Susan', 'Davis', 5558901234, 'STU234', 'Volkswagen Jetta')


INSERT INTO Locations (name, address, amenities, price, latitude, longitude, availability, owner_id) VALUES
(' NCP Holborn Car Park', '230 High Holborn, Holborn, London WC1V 7DN', 'Charging', 22.00, 51.5194, -0.1236, TRUE, 6),
(' Q-Park Covent Garden', '13-14 Russell St, Covent Garden, London WC2B 5HZ', 'No Charging', 28.00, 51.5139, -0.1231, TRUE, 7),
(' NCP Euston Car Park', '340 Euston Rd, St Pancras, London NW1 3AD','No Charging', 24.00, 51.5272, -0.1339, TRUE, 8),
('Indigo London Paddington', '22 Sheldon Square, Paddington, London W2 6EY', 'Charging', 16.00, 51.5167, -0.1833, TRUE, 9),
(' NCP Baker Street Car Park', '1 Allsop Pl, Marylebone, London NW1 5LJ', 'Charging', 26.00, 51.5208, -0.1575, TRUE, 10),
('Smart Parking Euston', '200 York Way, Kings Cross, London N1 9AA','Charging', 20.00, 51.5306, -0.1231, TRUE, 11),
(' NCP Victoria Car Park', '111 Buckingham Palace Rd, Victoria, London SW1W 9SA', 'Charging', 18.00, 51.4950, -0.1450, TRUE, 12),
('Indigo London Waterloo', '10 Stamford St, South Bank, London SE1 9NH', 'Charging', 25.00, 51.5042, -0.1139, TRUE, 13),
(' NCP Tower of London Car Park', 'Byward St, Tower Hill, London EC3R 5BJ', 'Charging', 22.00, 51.5083, -0.0775, TRUE, 14),
('Smart Parking London Bridge', '100 Tooley St, London SE1 2TH','Avaialble', 19.00, 51.5036, -0.0833, TRUE, 15);

INSERT INTO Bookings (user_id, parking_space_id, start_date, end_date, start_time, end_time, total_price)
VALUES
(1, 11, '2023-12-15', '2023-12-16', '10:00:00', '12:00:00', 20.00),
(2, 11, '2023-12-17', '2023-12-18', '14:00:00', '16:00:00', 30.00),
(3, 15, '2023-12-19', '2023-12-20', '08:00:00', '10:00:00', 15.00),
(4, 12, '2023-12-21', '2023-12-22', '12:00:00', '14:00:00', 25.00),
(5, 15, '2023-12-23', '2023-12-24', '16:00:00', '18:00:00', 35.00),
(6, 18, '2023-12-25', '2023-12-26', '10:00:00', '12:00:00', 20.00),
(7, 20, '2023-12-27', '2023-12-28', '14:00:00', '16:00:00', 30.00),
(8, 20, '2023-12-29', '2023-12-30', '08:00:00', '10:00:00', 15.00),
(8, 17, '2023-12-31', '2024-01-01', '12:00:00', '14:00:00', 25.00),
(2, 19, '2024-01-02', '2024-01-03', '16:00:00', '18:00:00', 35.00);

