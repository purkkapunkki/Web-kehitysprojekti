DROP DATABASE IF EXISTS restaurant_site;
CREATE DATABASE restaurant_site;
USE restaurant_site;

 CREATE USER 'restaurant_user'@'localhost' IDENTIFIED BY 'supersalainen';
 GRANT ALL PRIVILEGES ON `restaurant_site`.* TO 'restaurant_user'@'localhost';
 FLUSH PRIVILEGES;

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
('Loki', 'Laufeyjarson', 'loki.laufeyjarson@hveralundr.com', 'Pistänsappeasimaan098', FALSE),
('Býleistur', 'Fárbautison', 'býleistur.fárbautison@valhöll.com', 'Mysteerihenkilö456', FALSE),
('Þór', 'Óðinson', 'þór.óðinson@ásgarður.com', 'Käärmeentappaja123', FALSE),
('Admin', 'Käyttäjä', 'admin.kayttaja@example.com', 'adminsalasana0', TRUE),
('Anomuumi', 'Laaksolainen', 'anomuumi.laaksolainen@muumilaakso.fi', 'salasana000', FALSE);

-- Insert Products
INSERT INTO Product (name, image, price, description, product_class)
VALUES 
('Taiyaki (Adzukipaputäyte)', 'taiyaki-punapapu.jpg', 3.50, 'Vohvelitaikinaleivos punapaputäytteellä.', 'jälkiruoka'),
('Taiyaki (Suklaatäyte)', 'taiyaki-suklaa.jpg', 3.50, 'Vohvelitaikinaleivos suklaatäytteellä.', 'jälkiruoka'),
('Taiyaki (Vaniljatäyte)', 'taiyaki-vanilja.jpg', 3.50, 'Vohvelitaikinaleivos vaniljatäytteellä.', 'jälkiruoka'),
('Kappamaki', 'kappamaki.jpg', 9.00, 'Kurkkusushi 8 kpl.', 'ruoka'),
('Nigiri (Lohi)', 'nigiri-lohi.jpg', 9.00, 'Lohi nigirisushi 8 kpl.', 'ruoka'),
('Nigiri (Tonnikala)', 'nigiri-tonnikala.jpg', 9.00, 'Tonnikala nigirisushi 8 kpl.', 'ruoka'),
('Tonkatsu', 'tonkatsu.jpg', 12.50, 'Friteerattua possua tonkatsu kastikkeella.', 'ruoka'),
('Yakitori', 'yakitori.jpg', 9.50, 'Grillattua kanaa vartaassa kastikkeella.', 'ruoka'),
('Onigiri (Tonnikalamajoneesi)', 'onigiri-tonnikala.jpg', 3.50, 'Riisipallo, jossa tonnikalamajoneesitäyte.', 'ruoka'),
('Onigiri (Lohi)', 'onigiri-lohi.jpg', 3.50, 'Riisipallo, jossa lohitäyte.', 'ruoka'),
('Novelle kivennäisvesi', 'novelle.jpg', 2.99, 'Kivennäisvesi (500ml).', 'juoma'),
('Fanta Melonilimu', 'fanta-meloni.jpg', 3.99, 'Melonilimu (500ml).', 'juoma'),
('Fanta Viinirypälelimu', 'fanta-rypäle.jpg', 3.99, 'Viinirypälelimu (500ml).', 'juoma'),
('Fanta Persikkalimu', 'fanta-persikka.jpg', 3.99, 'Persikkalimu (500ml).', 'juoma'),
('Oshiruko', 'adzukipapukeitto.jpg', 2.50, 'Punapapukeitto.', 'jälkiruoka');

-- Insert Allergens
INSERT INTO Allergen (name)
VALUES 
('Pähkinät'),
('Gluteenit'),
('Maito'),
('Kananmuna');

-- Insert Product Allergen Associations
INSERT INTO Product_allergen (allergen_id, product_id)
VALUES 
(3, 1),
(3, 2),
(3, 3),
(3, 9),
(2, 1),
(2, 2),
(2, 3),
(4, 1),
(4, 2),
(4, 3),
(4, 7),
(4, 9);

-- Insert into Shopping Cart
INSERT INTO Shopping_cart (user_id)
VALUES 
(1),
(2),
(3),
(4),
(5);

