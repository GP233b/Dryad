create table "Bailiff"
(
    bai_id              integer generated always as identity
        constraint bailiff_pk
            primary key,
    bai_name            varchar(255),
    bai_surname         varchar(255),
    bai_phone_number    integer,
    bai_office_location varchar(255)
);

alter table "Bailiff"
    owner to postgres;

