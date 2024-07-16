
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(20),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    phone_number INT(20)
);

CREATE TABLE Locations (
    parking_space_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    address VARCHAR(100),
    amenities TEXT,
    price DECIMAL,
    availability BOOLEAN,
    owner_id INT REFERENCES Users(user_id)
);

CREATE TABLE Bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES Users(user_id),
    parking_space_id INT REFERENCES ParkingSpaces(parking_space_id),
    car_id INT REFERENCES Cars(car_id),
    start_time DATETIME,
    end_time DATETIME,
    total_price DECIMAL
);

CREATE TABLE Cars (
    car_id INT PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    license_plate VARCHAR(255) UNIQUE,
    make VARCHAR(255),
    model VARCHAR(255),
    color VARCHAR(255)
);


INSERT INTO Users (user_id, email, password, first_name, last_name, phone_number) VALUES
(1, 'john.doe@example.com', 'password123', 'John', 'Doe', '555-123-4567'),
(2, 'jane.smith@example.com', 'securepassword', 'Jane', 'Smith', '555-234-5678'),
(3, 'bob.johnson@example.com', 'strongpassword', 'Bob', 'Johnson', '555-345-6789'),
(4, 'alice.williams@example.com', 'password1234', 'Alice', 'Williams', '555-456-7890'),
(5, 'david.brown@example.com', 'securepassword1', 'David', 'Brown', '555-567-8901');

INSERT INTO Locations (parking_space_id, name, address, amenities, price, availability, owner_id) VALUES
(1, 'City Center Garage', '123 Main St, Cityville', 'Charging', 15.00, 'Available', 1),
(2, 'Beachfront Lot', '456 Ocean Blvd, Seaside', 'Charging', 10.00, 'Available', 2),
(3, 'Residential Driveway', '789 Elm St, Anytown', 'No Charging', 5.00, 'Available', 3),
(4, 'Airport Parking', '101 Airport Rd, Airfield', 'Charging', 20.00, 'Available', 4),
(5, 'Shopping Mall Garage', '202 Mall Dr, Shopperville', 'Charging', 12.00, 'Available', 5);


INSERT INTO Bookings (booking_id, user_id, parking_space_id, car_id, start_time, end_time, total_price) VALUES
(1, 1, 2, 1, '2023-11-22 10:00:00', '2023-11-22 14:00:00', 40.00),
(2, 2, 1, 2, '2023-11-23 18:00:00', '2023-11-24 08:00:00', 180.00),
(3, 3, 3, 3, '2023-11-24 12:00:00', '2023-11-24 16:00:00', 20.00),
(4, 4, 5, 4, '2023-11-25 09:00:00', '2023-11-25 17:00:00', 96.00),
(5, 5, 4, 5, '2023-11-26 14:00:00', '2023-11-27 10:00:00', 160.00);


INSERT INTO Cars (car_id, user_id, license_plate, make, model, color) VALUES
(1, 1, 'ABC123', 'Honda', 'Civic', 'Silver'),
(2, 2, 'DEF456', 'Toyota', 'Camry', 'Blue'),
(3, 3, 'GHI789', 'Ford', 'F-150', 'Black'),
(4, 4, 'JKL012', 'Chevrolet', 'Tahoe', 'White'),
(5, 5, 'MNO345', 'Tesla', 'Model 3', 'Red');