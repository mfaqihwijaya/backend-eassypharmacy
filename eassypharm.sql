-- Active: 1706225400888@@127.0.0.1@5432@eassypharmacy@public
CREATE TABLE users(  
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    password VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT now(),
    "deletedAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

select * from users;

INSERT INTO users (username, email, "phoneNumber")
VALUES ('mfaqihwijaya', 'faqih@gmail.com', '087676928323');

CREATE TABLE medicines(  
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price FLOAT,
    stock INTEGER,
    image VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT now(),
    "deletedAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

SELECT * from medicines;

INSERT into medicines
(name, description, price, stock)
VALUES
('Paracetamol', 'Paracetamol', 10000.45, 100);

create table "medicineOrders"(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id) not null,
    "medicineId" INTEGER REFERENCES medicines(id) not null,
    "count" INTEGER,
    "subTotal" FLOAT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "deletedAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

insert into "medicineOrders"
("userId", "medicineId", count, "subTotal")
values
(1, 1, 1, 10000.45);