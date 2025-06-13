-- Creation
create database FindFriends;
use FindFriends;
create table users(
    username varchar(30) primary key,
    password varchar(255),
    img varchar(64),
    gender enum('male','female'),
    country varchar(20),
    link varchar(255),
    langs varchar(255), 
    topics varchar(255)
);
-- Delete the undefined elements ( in case there is an error )
delete from users where username = "undefined";
-- To test
select * from users;