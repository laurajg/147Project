drop table if exists Users;
drop table if exists CurrUser;


create table Users(UserID VARCHAR(20) NOT NULL PRIMARY KEY, Password CHAR(30) NOT NULL, Email VARCHAR(50) NOT NULL);
create table CurrUser(currUser text);
