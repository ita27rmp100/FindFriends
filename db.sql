-- Creation
create database ChatAno;
use ChatAno;
create table currentUsers (username varchar(30) primary key);
-- Delete the undefined elements ( in case there is an error )
create table AllVisitorsNames (username varchar(30) primary key, ipaddr varchar(20));
delete from currentUsers where username = "undefined"
delete from AllVisitorsNames where username = "undefined"
-- To test
select * from currentUsers;
select * from AllVisitorsNames;