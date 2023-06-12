
-- create database
create database startjunior;

-- use database
use startjunior;

--create tables

create table projects(
    id int not null auto_increment,
    name varchar(80) not null,
    description text not null,
    contact varchar(255)not null,
    website varchar(255) not null,
    org_name varchar(80) not null,
    logo varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key(id)
);



create table topics(
    id int not null auto_increment,
    name varchar(80) not null,
    primary key(id)
);

create table impact_areas(
    id int not null auto_increment,
    name varchar(80) not null,
    primary key(id)
);

create table technology(
    id int not null auto_increment,
    name varchar(80) not null,
    primary key(id)
);


---

create table projects_topics(
    id_project int not null,
    id_topic int not null,
    foreign key(id_project) references projects(id),
    foreign key(id_topic) references topics(id)
);


create table projects_impact_areas(
    id_project int not null,
    id_impact_area int not null,
    foreign key(id_project) references projects(id),
    foreign key(id_impact_area) references impact_areas(id)
);

-- create table projects_impact_areas(
--     id_project int not null,
--     id_impact_area int not null,
--     foreign key(id_project) references projects(id),
--     foreign key(id_impact_area) references impact_areas(id)
-- );


create table projects_technologies(
    id_project int not null,
    id_technology int not null,
    foreign key(id_project) references projects(id),
    foreign key(id_technology) references technology(id)
);



--insert values

--topics

INSERT INTO topics(name)
VALUES
("Development Tools"),
("Programing Languages"),
("Security"),
("Web"),
("Frontend"),
("Backend"),
("Full-Stack");



INSERT INTO impact_areas(name)
VALUES
("Software engineering"),
("Data Science"),
("Security");

INSERT INTO technology(name)
VALUES
    ("JavaScript"),
    ("Java"),
    ("Python"),
    ("HTML"),
    ("CSS"),
    ("Git"),
    ("React"),
    ("Angular"),
    ("Vue.js"),
    ("Node.js"),
    ("Express.js"),
    ("PHP"),
    ("Laravel"),
    ("Ruby"),
    ("Ruby on Rails"),
    ("C#"),
    (".NET"),
    ("ASP.NET"),
    ("ASP.NET Core"),
    ("SQL"),
    ("MySQL"),
    ("PostgreSQL"),
    ("MongoDB"),
    ("Firebase"),
    ("AWS"),
    ("Azure"),
    ("Heroku"),
    ("Docker"),
    ("Kubernetes"),
    ("GraphQL"),
    ("REST"),
    ("JSON"),
    ("XML"),
    ("Bootstrap"),
    ("Sass"),
    ("Less"),
    ("Tailwind CSS"),
    ("jQuery"),
    ("Redux"),
    ("Unity"),
    ("Flutter"),
    ("Swift"),
    ("Objective-C"),
    ("Kotlin"),
    ("Android"),
    ("iOS"),
    ("TensorFlow"),
    ("PyTorch");