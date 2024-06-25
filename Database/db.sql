USE BSI;

DROP TABLE IF EXISTS users;
CREATE TABLE users
  (
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(50),
    password varchar(500),
    S_Role varchar(10)
  );

DROP TABLE IF EXISTS booking;
CREATE TABLE booking
  (
    id int,
    username varchar(50),
    Source_City varchar(50),
    Destination_City varchar(50),
    Bus_Arrival_time VARCHAR(50),
    Bus_Departure_time VARCHAR(50),
    Booked_at DATE DEFAULT CURRENT_DATE,
    bus_number VARCHAR(10)
  );

DROP TRIGGER IF EXISTS set_random_time;
CREATE TRIGGER set_random_time
BEFORE INSERT ON booking
FOR EACH ROW
BEGIN
  SET @randomHour = LPAD(FLOOR(1 + RAND() * 12), 2, '0');
  SET @randomMinute = LPAD(FLOOR(RAND() * 60), 2, '0');
  SET @randomSecond = LPAD(FLOOR(RAND() * 60), 2, '0');
  SET @isPM = IF(RAND() < 0.5, ' AM', ' PM');
  SET NEW.Bus_Arrival_time = CONCAT(@randomHour, ':', @randomMinute, ':', @randomSecond, @isPM);
  SET @Bus_Arrival_time_24h = DATE_FORMAT(STR_TO_DATE(NEW.Bus_Arrival_time, '%r'), '%T');
  SET @Bus_Departure_time_24h = ADDTIME(@Bus_Arrival_time_24h, SEC_TO_TIME(FLOOR(1800 + RAND() * 5400)));
  SET @Bus_Departure_time_hour = LPAD(HOUR(@Bus_Departure_time_24h), 2, '0');
  SET @Bus_Departure_time_minute = LPAD(MINUTE(@Bus_Departure_time_24h), 2, '0');
  SET @Bus_Departure_time_second = LPAD(SECOND(@Bus_Departure_time_24h), 2, '0');
  SET @isPM = IF(@Bus_Departure_time_hour >= 12, ' PM', ' AM');
  SET @Bus_Departure_time_hour = IF(@Bus_Departure_time_hour > 12, @Bus_Departure_time_hour - 12, @Bus_Departure_time_hour);
  SET NEW.Bus_Departure_time = CONCAT(@Bus_Departure_time_hour, ':', @Bus_Departure_time_minute, ':', @Bus_Departure_time_second, @isPM);
END;


DROP PROCEDURE IF EXISTS RandomBusNumber;
CREATE PROCEDURE RandomBusNumber(OUT randomStr CHAR(36))
BEGIN
  DECLARE i INT DEFAULT 0;
  DECLARE randomStrLength INT;
  DECLARE allowedChars CHAR(62) DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  SET randomStr = '';
  SET randomStrLength = FLOOR(4 + RAND() * 4); -- Random length between 4 and 7
  WHILE i < randomStrLength DO
    SET randomStr = CONCAT(randomStr, SUBSTRING(allowedChars, FLOOR(1 + RAND() * 62), 1));
    SET i = i + 1;
  END WHILE;
END;


DROP TRIGGER IF EXISTS set_random_bus_number;
CREATE TRIGGER set_random_bus_number
BEFORE INSERT ON booking
FOR EACH ROW
BEGIN
  CALL RandomBusNumber(@randomBusNumber);
  SET NEW.bus_number = @randomBusNumber;
END;


