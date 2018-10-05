create database newsie
with owner postgres;

create table appuser
(
  id       serial not null,
  email    varchar(255),
  password varchar(255),
  role     smallint,
  constraint appuser_pkey
  primary key (id),
  constraint appuser_email_key
  unique (email)
);

alter table appuser
  owner to postgres;

create table category
(
  id   serial not null,
  name varchar(50),
  constraint category_pkey
  primary key (id)
);

alter table category
  owner to postgres;

create table post
(
  id            serial not null,
  name          varchar(100),
  content       text,
  categoryid    integer,
  datepublished timestamp,
  authorid      integer,
  previewimage  varchar(255),
  public        boolean default false,
  constraint post_pkey
  primary key (id),
  constraint post_categoryid_fkey
  foreign key (categoryid) references category,
  constraint post_authorid_fkey
  foreign key (authorid) references appuser
);

alter table post
  owner to postgres;

create table tag
(
  id   serial not null,
  name varchar(50),
  constraint tag_pkey
  primary key (id)
);

alter table tag
  owner to postgres;

create table posttag
(
  postid integer not null,
  tagid  integer not null,
  constraint posttag_pk
  primary key (postid, tagid),
  constraint posttag_postid_fkey
  foreign key (postid) references post,
  constraint posttag_tagid_fkey
  foreign key (tagid) references tag
);

alter table posttag
  owner to postgres;

create table comment
(
  id            serial not null,
  content       text,
  postid        integer,
  commenterid   integer,
  datecommented timestamp,
  parentid      integer,
  constraint comment_pkey
  primary key (id),
  constraint comment_postid_fkey
  foreign key (postid) references post,
  constraint comment_commenterid_fkey
  foreign key (commenterid) references appuser
);

alter table comment
  owner to postgres;

create table favorite
(
  postid integer,
  userid integer,
  constraint favorite_postid_fkey
  foreign key (postid) references post,
  constraint favorite_userid_fkey
  foreign key (userid) references appuser
);

alter table favorite
  owner to postgres;


