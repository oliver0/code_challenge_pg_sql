-- Database name
sigma
-- Document your create tables SQL here
CREATE TABLE treats (
id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
description text NOT NULL,
pic VARCHAR(120)
);

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
