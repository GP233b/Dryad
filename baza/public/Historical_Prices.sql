create table "Historical_Prices"
(
    his_id     integer generated always as identity
        constraint "Historical_Prices_pk"
            primary key,
    his_urd_id integer
        constraint "Historical_Prices_Users_data_urd_id_fk"
            references "Users_data",
    his_price  money,
    his_auc_id integer
        constraint "Historical_Prices_Auctions_auc_id_fk"
            references "Auctions",
    his_date   date
);

alter table "Historical_Prices"
    owner to postgres;

