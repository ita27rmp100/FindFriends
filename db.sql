create database ChatAno;
use ChatAno;
create table currentUsers (username varchar(30) primary key);
create table AllVisitorsNames (username varchar(30) primary key, ipaddr varchar(20));

select * from currentUsers;
select * from AllVisitorsNames;