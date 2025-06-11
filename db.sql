-- Creation
create database ChatAno;
use ChatAno;
create table visitors(
    username varchar(30) primary key,
    gender enum('male','female'),
    country varchar(20),
    link varchar(255),
    arabic boolean,
    english boolean,
    spanish boolean,
    topic1 varchar(15),
    topic2 varchar(15),
    topic3 varchar(15)
);
-- Delete the undefined elements ( in case there is an error )
delete from visitors where username = "undefined";
-- To test
select * from visitors;