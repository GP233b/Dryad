create table "Auctions"
(
    auc_id            integer generated always as identity
        constraint "Auction_pk"
            primary key,
    auc_bai_id        integer
        constraint "Auctions_Bailiff_bai_id_fk"
            references "Bailiff",
    auc_winning_price money   not null,
    auc_winner_id     integer
        constraint "Auctions_Users_data_urd_id_fk"
            references "Users_data",
    auc_end_date      date    not null,
    auc_rel_id        integer not null
        constraint "Auctions_Real_estate_rel_id_fk"
            references "Real_estate"
);

alter table "Auctions"
    owner to postgres;

