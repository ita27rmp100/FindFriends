-- Creation
create database ChatAno;
use ChatAno;
create table visitors(
    username varchar(30) primary key,
    img varchar(64),
    gender enum('male','female'),
    country varchar(20),
    link varchar(255),
    langs varchar(255), 
    topics varchar(255)
);
-- Delete the undefined elements ( in case there is an error )
delete from visitors where username = "undefined";
-- To test
select * from visitors;