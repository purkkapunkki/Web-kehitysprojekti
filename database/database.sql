DROP DATABASE IF EXISTS restaurant_site;
CREATE DATABASE restaurant_site;
USE restaurant_site;

CREATE TABLE User (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL
);

CREATE TABLE Product (
  product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(6, 2) NOT NULL,
  description VARCHAR(255) NOT NULL,
  product_class VARCHAR(255) NOT NULL
);

CREATE TABLE Allergen (
  allergen_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Product_allergen (
  allergen_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (allergen_id) REFERENCES Allergen(allergen_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id),
  PRIMARY KEY (allergen_id, product_id)
);

CREATE TABLE Favorite_product (
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Product(product_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  PRIMARY KEY (product_id, user_id)
);

CREATE TABLE Shopping_cart (
  shopping_cart_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Shopping_cart_product (
  shopping_cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (shopping_cart_id) REFERENCES Shopping_cart(shopping_cart_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id),
  PRIMARY KEY (shopping_cart_id, product_id)
);

CREATE TABLE Restaurant_order (
  restaurant_order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  restaurant_order_status VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Restaurant_order_product (
  restaurant_order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (restaurant_order_id) REFERENCES Restaurant_order(restaurant_order_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id),
  PRIMARY KEY (restaurant_order_id, product_id)
);

-- Insert Users
INSERT INTO User (first_name, last_name, email, password, is_admin)
VALUES 
('Matti', 'Meikäläinen', 'matti.meikalainen@example.com', 'salasana123', FALSE),
('Liisa', 'Virtanen', 'liisa.virtanen@example.com', 'salasana456', FALSE),
('Aleksi', 'Nieminen', 'aleksi.nieminen@example.com', 'adminsalasana', TRUE),
('Sanna', 'Korhonen', 'sanna.korhonen@example.com', 'salasanani', FALSE);

-- Insert Products
INSERT INTO Product (name, image, price, description, product_class)
VALUES 
('Karjalanpiirakka', 'karjalanpiirakka.jpg', 3.50, 'Perinteinen suomalainen karjalanpiirakka.', 'ruoka'),
('Lohikeitto', 'lohikeitto.jpg', 11.00, 'Kermainen lohikeitto tuoreilla yrteillä.', 'ruoka'),
('Ruisleipä', 'ruisleipa.jpg', 2.00, 'Maukasta ruisleipää suomalaisesta rukiista.', 'ruoka'),
('Marjamehu', 'marjamehu.jpg', 4.00, 'Tuoreista marjoista valmistettu mehu.', 'juoma'),
('Korvapuusti', 'korvapuusti.jpg', 2.50, 'Cinnamon-sokerikanelipullat.', 'jälkiruoka');

-- Insert Allergens
INSERT INTO Allergen (name)
VALUES 
('Pähkinät'),
('Gluteenit'),
('Maito'),
('Äyriäiset'),
('Soija');

-- Insert Product Allergen Associations
INSERT INTO Product_allergen (allergen_id, product_id)
VALUES 
(1, 1),  -- Karjalanpiirakka contains Pähkinät
(2, 1),  -- Karjalanpiirikka contains Gluteenit
(3, 2),  -- Lohikeitto contains Maito
(2, 3),  -- Ruisleipä contains Gluteenit
(4, 4)  -- Marjamehu contains Äyriäiset

-- Insert to Favorite Products
INSERT INTO Favorite_product (product_id, user_id)
VALUES 
(1, 1),  -- Matti suosii Karjalanpiirikkaa
(2, 2),  -- Liisa suosii Lohikeittoa
(3, 3),  -- Aleksi suosii Ruisleipää
(4, 4);  -- Sanna suosii Marjamehua

-- Insert into Shopping Cart
INSERT INTO Shopping_cart (user_id)
VALUES 
(1),
(2),
(3),
(4);

-- Insert into Shopping Cart Products
INSERT INTO Shopping_cart_product (shopping_cart_id, product_id, quantity)
VALUES 
(1, 1, 2),  -- Matti has 2 Karjalanpiirikkaa
(1, 2, 1),  -- Matti has 1 Lohikeitto
(2, 3, 1),  -- Liisa has 1 Ruisleipä
(3, 4, 1);  -- Aleksi has 1 Marjamehu

-- Insert Restaurant Orders
INSERT INTO Restaurant_order (user_id, restaurant_order_status)
VALUES 
(1, 'complete'),         -- 'Completed'
(2, 'pending'),          -- 'Pending'
(3, 'pending'),          -- 'Pending'
(4, 'in progress');      -- 'In Progress'

-- Insert Restaurant Order Products
INSERT INTO Restaurant_order_product (restaurant_order_id, product_id, quantity)
VALUES 
(1, 1, 2),  -- Tilauksessa 1 on 2 Karjalanpiirikkaa
(2, 2, 1),  -- Tilauksessa 2 on 1 Lohikeitto
(3, 3, 1),  -- Tilauksessa 3 on 1 Ruisleipä
(4, 4, 1);  -- Tilauksessa 4 on 1 Marjamehu

-- query joka hakee kaikki jälkiruoat 
SELECT * FROM Product WHERE product_class="jälkiruoka";
-- nimeää Korvapuustin Korvariksi
UPDATE Product SET name = "Korvari"  WHERE name = "Korvapuusti";
-- hakee kaikki jälkiruoat 
SELECT * FROM Product WHERE product_class="jälkiruoka";
-- poistaa Korvarin tuotteista
DELETE FROM Product WHERE name = "Korvari";
-- hakee kaikki jälkiruoat 
SELECT * FROM Product WHERE product_class="jälkiruoka";
