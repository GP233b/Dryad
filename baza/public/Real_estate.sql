create table "Real_estate"
(
    rel_id                                integer generated always as identity
        constraint "Real_estate_pk"
            primary key,
    rel_starting_price                    money not null,
    rel_estimated_price                   money,
    rel_land_and_mortgage_register_number varchar(30),
    rel_geoportal_number                  varchar(255),
    rel_plot_size                         varchar(100),
    rel_descripcion                       text
);

alter table "Real_estate"
    owner to postgres;

