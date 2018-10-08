--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: newsie; Type: DATABASE; Schema: -; Owner: postgres
--

-- CREATE DATABASE newsie WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


-- ALTER DATABASE newsie OWNER TO postgres;

-- \connect newsie

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET client_min_messages = warning;
-- SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: appuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appuser (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    role smallint
);


ALTER TABLE public.appuser OWNER TO postgres;

--
-- Name: appuser_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appuser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appuser_id_seq OWNER TO postgres;

--
-- Name: appuser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appuser_id_seq OWNED BY public.appuser.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(50)
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    content text,
    postid integer,
    commenterid integer,
    datecommented timestamp without time zone,
    parentid integer
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- Name: favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite (
    postid integer NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public.favorite OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    id integer NOT NULL,
    name character varying(100),
    content text,
    categoryid integer,
    datepublished timestamp without time zone,
    authorid integer,
    previewimage character varying(255),
    public boolean DEFAULT false
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: posttag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posttag (
    postid integer NOT NULL,
    tagid integer NOT NULL
);


ALTER TABLE public.posttag OWNER TO postgres;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying(50)
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO postgres;

--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- Name: appuser id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appuser ALTER COLUMN id SET DEFAULT nextval('public.appuser_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- Data for Name: appuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.appuser VALUES (7, 'luculia.test4@gmail.com', '$2a$10$9unh980aatoBhP.rJ0ytEOQVygU/cZYmoSYV4j54qx7jtOGVlEDam', 0);
INSERT INTO public.appuser VALUES (1, 'luculia.test1@gmail.com', '$2a$10$bukH.kpuUlyFG7PrhSdUh.1KA3As6fpxAYg/KPrX7Ec1g4CbbQDbu', 1);
INSERT INTO public.appuser VALUES (3, 'luculia.test2@gmail.com', '$2a$10$fBrrej0TYO8JE0ogf8pd0ebbV5BdrHF1wEfWyijoVm9Vqbf1gVQtS', 0);
INSERT INTO public.appuser VALUES (8, 'luculia.test5@gmail.com', '$2a$10$cwmZNLgEWsZI6BL8BQQt4.VXrIPKKfiIskwYncyu8JJxaZB.JuT9K', 1);
INSERT INTO public.appuser VALUES (5, 'luculia.test3@gmail.com', '$2a$10$maKRS9ZhuOAtsPsYIJELj.YCqqiba0BRd0uI6l3Qt72bUEwHT4iom', 1);
INSERT INTO public.appuser VALUES (10, 'luculia.test6@gmail.com', '$2a$10$s0rn6zR3BVcs4/rEx4yMwODE7qO/SKFoJwwYMRnDSd2fRDprvORMO', 1);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category VALUES (1, 'Music');
INSERT INTO public.category VALUES (2, 'Design');


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comment VALUES (23, '<hr><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus tellus ex, eu pharetra nunc dapibus vitae. Quisque dolor dolor, suscipit sed mauris iaculis, sodales finibus mauris.</p>', 3, 10, '2018-10-07 12:57:58.599', -1);
INSERT INTO public.comment VALUES (24, '<p>In elit ex, pretium vitae gravida nec, auctor ac lorem. Nam eget molestie tellus. Duis id semper felis, id vulputate tortor </p>', 3, 10, '2018-10-07 12:58:07.746', -1);
INSERT INTO public.comment VALUES (25, '<p>Donec quis felis vulputate, molestie sapien vitae, fringilla nisl. In convallis nisl sit amet risus vehicula, vitae fermentum tellus laoreet </p>', 3, 10, '2018-10-07 12:58:15.989', 23);
INSERT INTO public.comment VALUES (26, '<p>Donec quis felis vulputate, molestie sapien vitae, fringilla nisl. In convallis nisl sit amet risus vehicula, vitae fermentum tellus laoreet </p>', 3, 10, '2018-10-07 12:58:23.701', 23);


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.favorite VALUES (3, 10);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.post VALUES (10, ' Adaptive Vs. Responsive Layouts And Optimal Text Readability', '<p>Responsive web design offers us a way forward, finally allowing us to design for the ebb and flow of things. There are many variations of passages of Lorem Ipsum available, &nbsp;but the majority have suffered alteration in some form, by injected humour, or randomised words which don&rsquo;t look even slightly.</p><h2><strong>Responsive Design, Goods and Bads</strong></h2><p>Today i want to share with you a responsive slider plugin that adapts itself to various devices from desktop to mobile and with fancy css3 animations where available.</p><p>Him fowl divided. Lesser which fruitful image, first seas have the, seas grass image don&rsquo;t. Place midst place called unto was likeness form after said isn&rsquo;t wherein set, tree in fly night. One green. Created waters. Created saying created also you&rsquo;ll Divide.</p>', 2, '2018-10-04 11:34:43.672', 10, 'http://localhost:3000/public/images/ca88da50-c78e-11e8-b195-6f6657f6b06c.png', true);
INSERT INTO public.post VALUES (3, 'Move type definitions to DefinitelyTyped', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ligula eu urna posuere bibendum. Etiam eu massa sit amet ipsum ornare sollicitudin. Aliquam erat volutpat. Integer egestas felis vitae bibendum faucibus. Cras non lobortis neque. Nam vel orci at diam blandit vestibulum. Donec euismod consectetur dignissim. Quisque condimentum aliquam ante id pretium. Vestibulum tincidunt diam augue, a hendrerit ante egestas in. Aenean elementum feugiat nisi, vel sagittis velit commodo id. Nulla vitae nisi egestas, rhoncus magna in, tincidunt augue. Maecenas gravida consectetur feugiat. Vestibulum porttitor erat nisl, a ornare diam efficitur id. Fusce sed venenatis leo. Proin euismod dui quis est efficitur eleifend. Cras odio nunc, luctus et nibh vitae, egestas rutrum urna.</p><p><img src="http://localhost:3000/public/images/47d1ea70-c9f5-11e8-9413-052684ac9627.jpg" style="width: 300px;" class="fr-fic fr-dib"></p><table class="fr-dashed-borders" style="width: 100%;"><thead><tr><th><br></th><th><br></th><th>Nice Table<br></th><th><br></th><th><br></th></tr></thead><tbody><tr><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td></tr><tr><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td><td style="width: 20%; background-color: rgb(239, 239, 239);"><br></td></tr></tbody></table><p>Maecenas id nunc neque. Quisque ut vehicula magna. Suspendisse accumsan condimentum mi et auctor. Fusce sed aliquet dui. Aliquam augue lorem, bibendum a tempor vel, consequat et quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur eget dignissim justo.</p><p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer dignissim dui neque, eu cursus libero convallis at. Mauris pretium velit eros, ac porttitor massa tempor in. Mauris vitae orci lacus. Aenean tempor massa ex, nec ullamcorper erat pellentesque in. Sed urna felis, facilisis ut accumsan a, pulvinar eget mauris. Donec nulla magna, laoreet vitae ultrices id, lobortis ac risus. Duis dignissim ullamcorper dolor, vitae fringilla felis volutpat eu. Suspendisse tempor consectetur velit id condimentum. Praesent eget pharetra nulla. Donec dignissim dignissim turpis, nec lobortis neque tempus at. Integer arcu nunc, volutpat vitae est ut, placerat luctus erat. Donec et magna vitae nisi fermentum euismod. Phasellus feugiat eleifend eros commodo pharetra. Praesent posuere arcu quam, faucibus consequat tortor dignissim lobortis.</p><p><span style="font-size: 30px;">What happens after?</span></p><p>Nullam nec felis vel dui convallis finibus eu a lacus. Nam convallis quam tellus, sed auctor justo sodales vitae. Morbi lacinia eget odio fermentum suscipit. Etiam placerat augue eu diam porttitor, sed cursus erat aliquet. Sed ac eros in nisl pulvinar ullamcorper. Vivamus egestas finibus sodales. Sed vel auctor ligula, et cursus turpis. Fusce consequat maximus est a consequat. Quisque vestibulum sem eu risus ultrices, sed porttitor odio gravida. Phasellus id nisl nibh. Duis tincidunt vitae arcu et faucibus. Pellentesque ut ante lobortis, semper odio non, faucibus risus. Aenean vehicula est a interdum tempor. Cras congue, metus vel condimentum ullamcorper, mauris sapien pretium lacus, vel porta nunc tortor in libero. Maecenas ac lobortis ipsum.</p><p>Pellentesque aliquam augue massa, sed vestibulum tortor consectetur a. Aliquam pretium feugiat turpis, non pharetra magna efficitur eu. Donec pulvinar sodales ex id mollis. In mattis enim in metus accumsan, vel sollicitudin metus varius. Nulla non nibh vulputate neque semper porta porttitor a augue. Pellentesque quis lectus turpis. Etiam ut risus a eros malesuada faucibus. Nulla eget velit mollis, varius dui ut, congue justo. Sed a risus elementum, ullamcorper massa at, consectetur urna. In condimentum arcu at dictum porta.&nbsp;</p>', 1, '2018-10-07 12:56:05.331', 10, NULL, true);
INSERT INTO public.post VALUES (4, 'Cupcake Ipsum', '<p>Cupcake ipsum dolor sit amet danish. Halvah drag&eacute;e chupa chups gummies jelly beans cupcake pastry muffin lemon drops. Caramels macaroon jujubes candy canes gummi bears cookie. Chocolate cake sesame snaps pie oat cake brownie.</p><p>Jelly-o halvah sweet roll jelly beans. Sesame snaps gingerbread gingerbread jelly beans lollipop marzipan. Gummi bears dessert bonbon macaroon tiramisu oat cake.</p><p>Jelly-o apple pie biscuit wafer icing. Cupcake tootsie roll cupcake toffee cotton candy donut oat cake gingerbread apple pie. Cheesecake sweet roll sesame snaps. Bonbon jelly beans jelly beans bonbon jelly-o tootsie roll muffin.</p><p>Macaroon gummi bears apple pie jelly. Muffin ice cream caramels topping macaroon pudding. Pudding cake powder.</p><p>Carrot cake candy canes pudding ice cream dessert muffin chocolate cake gummies souffl&eacute;. Lemon drops cupcake carrot cake jujubes sweet roll pie jelly-o halvah brownie. Ice cream chocolate caramels caramels sesame snaps jelly beans pudding.</p>', 2, '2018-10-07 16:59:05.706', 10, 'http://localhost:3000/public/images/5e993e80-ca17-11e8-af65-f12652824ed8.jpg', true);
INSERT INTO public.post VALUES (5, 'Cupcake Ipsum', '<p>Cupcake ipsum dolor sit amet danish. Halvah drag&eacute;e chupa chups gummies jelly beans cupcake pastry muffin lemon drops. Caramels macaroon jujubes candy canes gummi bears cookie. Chocolate cake sesame snaps pie oat cake brownie.</p><p>Jelly-o halvah sweet roll jelly beans. Sesame snaps gingerbread gingerbread jelly beans lollipop marzipan. Gummi bears dessert bonbon macaroon tiramisu oat cake.</p><p>Jelly-o apple pie biscuit wafer icing. Cupcake tootsie roll cupcake toffee cotton candy donut oat cake gingerbread apple pie. Cheesecake sweet roll sesame snaps. Bonbon jelly beans jelly beans bonbon jelly-o tootsie roll muffin.</p><p>Macaroon gummi bears apple pie jelly. Muffin ice cream caramels topping macaroon pudding. Pudding cake powder.</p><p>Carrot cake candy canes pudding ice cream dessert muffin chocolate cake gummies souffl&eacute;. Lemon drops cupcake carrot cake jujubes sweet roll pie jelly-o halvah brownie. Ice cream chocolate caramels caramels sesame snaps jelly beans pudding.</p>', 2, '2018-10-07 16:59:40.153', 10, 'http://localhost:3000/public/images/5e993e80-ca17-11e8-af65-f12652824ed8.jpg', true);


--
-- Data for Name: posttag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posttag VALUES (5, 16);
INSERT INTO public.posttag VALUES (5, 7);
INSERT INTO public.posttag VALUES (5, 21);


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tag VALUES (1, 'Classical');
INSERT INTO public.tag VALUES (2, 'Jazz');
INSERT INTO public.tag VALUES (3, 'Rock');
INSERT INTO public.tag VALUES (4, 'Country Music');
INSERT INTO public.tag VALUES (5, 'Blues');
INSERT INTO public.tag VALUES (6, 'Architecture');
INSERT INTO public.tag VALUES (7, 'Landscape');
INSERT INTO public.tag VALUES (8, 'Impressionism');
INSERT INTO public.tag VALUES (9, 'Cupcake');
INSERT INTO public.tag VALUES (16, 'Moonlight');
INSERT INTO public.tag VALUES (19, 'Bookshelf');
INSERT INTO public.tag VALUES (20, 'Fairyesque');
INSERT INTO public.tag VALUES (21, 'Sunset');


--
-- Name: appuser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appuser_id_seq', 1, false);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 26, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_id_seq', 5, true);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_id_seq', 21, true);


--
-- Name: appuser appuser_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT appuser_email_key UNIQUE (email);


--
-- Name: appuser appuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT appuser_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: favorite favorite_postid_userid_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_postid_userid_pk PRIMARY KEY (postid, userid);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: posttag posttag_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posttag
    ADD CONSTRAINT posttag_pk PRIMARY KEY (postid, tagid);


--
-- Name: tag tag_name_uk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_name_uk UNIQUE (name);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: comment comment_commenterid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_commenterid_fkey FOREIGN KEY (commenterid) REFERENCES public.appuser(id);


--
-- Name: comment comment_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(id);


--
-- Name: favorite favorite_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(id);


--
-- Name: favorite favorite_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_userid_fkey FOREIGN KEY (userid) REFERENCES public.appuser(id);


--
-- Name: post post_authorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_authorid_fkey FOREIGN KEY (authorid) REFERENCES public.appuser(id);


--
-- Name: post post_categoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.category(id);


--
-- Name: posttag posttag_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posttag
    ADD CONSTRAINT posttag_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(id);


--
-- Name: posttag posttag_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posttag
    ADD CONSTRAINT posttag_tagid_fkey FOREIGN KEY (tagid) REFERENCES public.tag(id);


--
-- PostgreSQL database dump complete
--

