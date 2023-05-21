
-- create database
create database makerpunks;

-- use database
use makerpunks;

--create tables

create table projects(
    id int not null auto_increment,
    name varchar(80) not null,
    description text not null,
    contact varchar(255)not null,
    website varchar(255) not null,
    repo varchar(255) not null,
    org_name varchar(80) not null,
    logo varchar(255) not null,
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

-- create table type(
--     id int not null auto_increment,
--     name varchar(80) not null,
--     primary key(id)
-- );

-- create table exp_level(
--     id int not null auto_increment,
--     name varchar(80) not null,
--     primary key(id)
-- );


-- 

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

create table projects_impact_areas(
    id_project int not null,
    id_impact_area int not null,
    foreign key(id_project) references projects(id),
    foreign key(id_impact_area) references impact_areas(id)
);


create table projects_technologies(
    id_project int not null,
    id_technology int not null,
    foreign key(id_project) references projects(id),
    foreign key(id_technology) references technology(id)
);


-- create table skills(
--     id int not null auto_increment,
--     id_project int not null,
--     id_technology int not null,
--     id_type int not null,
--     id_exp_level int not null ,
--     primary key(id),
--     foreign key(id_project) references projects(id),
--     foreign key(id_technology) references technology(id),
--     foreign key(id_type) references type(id),
--     foreign key(id_exp_level) references exp_level(id)
-- );



--insert values

--topics

insert into topics(name)
values
("Data"),
("Development Tools"),
("End user application"),
("Infrastructure and Cloud"),
("Media"),
("Operating System"),
("Programing Languages"),
("Security"),
("Web"),
("Web3"),
("AI")
("Blockchain");


insert into impact_areas(name)
values
("Society"),
("Education"),
("Environment"),
("Humanitarian"),
("Accessibility"),
("Science"),
("Health");


insert into technology(name)
values
("Arduino"),
("Assembly"),
("Batchfile"),
("C"),
("C#"),
("C++"),
("CSS"),
("CoffeeScript"),
("Cython"),
("Dart"),
("Dockerfile"),
("EJS"),
("Elixir"),
("Fluent"),
("Go"),
("HCL"),
("HTML"),
("Haml"),
("Java"),
("JavaScript"),
("Jsonnet"),
("Jupyter Notebook"), 
("Kotlin"),
("Kubernetes"),
("Less"),
("Lua"),
("Makefile"),
("PHP"),
("Perl"),
("Python"),
("R"),
("Roff"),
("Ruby"),
("Rust"),
("SCSS"),
("Scala"),
("Shell"),
("Stylus"),
("Solidity"),
("Svelte"),
("Swift"),
("TSQL"),
("TeX"),
("TypeScript"),
("Vue"),
("Git"),
("GitLab"),
("WordPress");


insert into type(name)
values
("Required"),
("Preferred"),
("Nice to have");



insert into exp_level(name)
values
("Challenge"),
("Comfortable"),
("Experimented"), 
("Concepts"), 
("No knowledge Required");









