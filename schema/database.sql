create database Cementogram;

use Cementogram;

create table suppliers (

    id          int not null auto_increment primary key,
    name        varchar(150) not null,
    contact     varchar(15) not null unique key,
    location    varchar(200) not null,
    date        timestamp not null default current_timestamp

) default charset utf8;

create table supply_data (

    supplier_id      int not null,

    invoice_number   int not null auto_increment primary key,
    amount_paid      int not null default 0,
    sack_quantity    int not null default 0,
    paper_quantity   int not null default 0,
    credit_total     int not null default 0,

    driver           varchar(150) not null,
    customer         varchar(150) not null,

    date             timestamp not null default current_timestamp,

    foreign key (supplier_id) references suppliers(id) on update cascade on delete cascade

    
) default charset utf8;


create table customers (

    id        int not null auto_increment primary key,
    name      varchar(150) not null,
    contact   varchar(15) not null unique key,
    location  varchar(200) not null,
    date      timestamp not null default current_timestamp

) default charset utf8;


create table customer_data (

    customer_id     int not null,

    amount_paid     int not null default 0,
    amount_per_bag  int not null default 0,
    quantity        int not null default 0,
    supply          int not null default 0,
    credit          int not null default 0,
    debit           int not null default 0,
    amount_owed     int not null default 0,
    amount_owing    int not null default 0,
    
    date             timestamp not null default current_timestamp,

    foreign key (customer_id) references customers(id) on update cascade on delete cascade

) default charset utf8;


create table bonus_data (

    giver_id     int not null,

    bonus_amount        int not null default 0,
    amount_per_sack     int not null default 0,
    amount_per_paper    int not null default 0,
    quantity            int not null default 0,
    paper_demanded      int not null default 0,
    sack_demanaded      int not null default 0,
    credit_total        int not null default 0,
    
    date             timestamp not null default current_timestamp,

    foreign key (giver_id) references suppliers(id) on update cascade on delete cascade

) default charset utf8;
