


CREATE TABLE supplier(
   idx varchar ,
   namex VARCHAR ,
   phone VARCHAR ,
   email VARCHAR ,
   country VARCHAR ,
   city VARCHAR ,
   postcode VARCHAR ,
   address VARCHAR ,
	primary key (idx)
);

insert into supplier(idx,namex,phone,email,country,city,postcode,address)
values('idx','namexx','phonex','emailx','countryx','cityx','postcodex','addressx')


CREATE TABLE brand(
   idx varchar ,
   namex VARCHAR ,
	primary key (idx)
);
CREATE TABLE category(
   idx varchar ,
   namex VARCHAR ,
	primary key (idx)
)

insert into brand(idx,namex)
values('idx1','namexx')
insert into category(idx,namex)
values('idx1','namexx')

create Table product(
    idx varchar ,
	namex varchar,
	supplier_id varchar ,
	brand_id varchar, 
	category_id varchar, 
	buy_price varchar, 
	esitmated_sell_price varchar , 
	sell_price varchar, 
	created_at varchar, 
	updated_at varchar,
	description varchar,
	purchase_info varchar,
	quantity int,
	low_stock int,
  ///add the remaining fields [description,purchase_info,quantity] , yeah , just done it
	primary key (idx)

)

insert into product(idx,namex,supplier_id,brand_id,category_id,buy_price,esitmated_sell_price,sell_price,created_at,updated_at)
values('idx1','namexx','idx','idx','idx','buy_pricehuh','estimatedsellprice_1','sell_pricexx','created_at1','updated_at1')





