create table "Real_estate_pictures"
(
    rep_id      integer generated always as identity
        constraint "Real_estate_pictures_pk"
            primary key,
    rep_auc_id  integer
        constraint "Real_estate_pictures_Auctions_auc_id_fk"
            references "Auctions",
    rep_picture varchar(255)
);

alter table "Real_estate_pictures"
    owner to postgres;

