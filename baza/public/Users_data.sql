create table "Users_data"
(
    urd_id            integer generated always as identity
        constraint users_data_pkey
            primary key,
    urd_name          varchar(255) not null,
    urd_surname       varchar(255),
    urd_date_of_birth date         not null,
    urd_pesel         integer      not null
);

alter table "Users_data"
    owner to postgres;

