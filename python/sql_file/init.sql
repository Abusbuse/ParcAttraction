DROP TABLE IF EXISTS attraction;

CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);

DROP TABLE IF EXISTS comment;

CREATE TABLE comment (
    comment_id int auto_increment,
    primary key(comment_id),
    attraction_id int,
    note int,
    commentaire varchar(255),
    foreign key(attraction_id) references attraction(attraction_id) on delete cascade
);