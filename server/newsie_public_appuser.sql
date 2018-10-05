CREATE TABLE public.appuser
(
    id integer DEFAULT nextval('appuser_id_seq'::regclass) PRIMARY KEY NOT NULL,
    email varchar(255),
    password varchar(255),
    role smallint
);
CREATE UNIQUE INDEX appuser_email_key ON public.appuser (email);
INSERT INTO public.appuser (id, email, password, role) VALUES (7, 'luculia.test4@gmail.com', '$2a$10$9unh980aatoBhP.rJ0ytEOQVygU/cZYmoSYV4j54qx7jtOGVlEDam', 0);
INSERT INTO public.appuser (id, email, password, role) VALUES (1, 'luculia.test1@gmail.com', '$2a$10$bukH.kpuUlyFG7PrhSdUh.1KA3As6fpxAYg/KPrX7Ec1g4CbbQDbu', 1);
INSERT INTO public.appuser (id, email, password, role) VALUES (3, 'luculia.test2@gmail.com', '$2a$10$fBrrej0TYO8JE0ogf8pd0ebbV5BdrHF1wEfWyijoVm9Vqbf1gVQtS', 0);
INSERT INTO public.appuser (id, email, password, role) VALUES (8, 'luculia.test5@gmail.com', '$2a$10$cwmZNLgEWsZI6BL8BQQt4.VXrIPKKfiIskwYncyu8JJxaZB.JuT9K', 1);
INSERT INTO public.appuser (id, email, password, role) VALUES (5, 'luculia.test3@gmail.com', '$2a$10$maKRS9ZhuOAtsPsYIJELj.YCqqiba0BRd0uI6l3Qt72bUEwHT4iom', 1);
INSERT INTO public.appuser (id, email, password, role) VALUES (10, 'luculia.test6@gmail.com', '$2a$10$s0rn6zR3BVcs4/rEx4yMwODE7qO/SKFoJwwYMRnDSd2fRDprvORMO', 1);
CREATE TABLE public.category
(
    id integer DEFAULT nextval('category_id_seq'::regclass) PRIMARY KEY NOT NULL,
    name varchar(50)
);
INSERT INTO public.category (id, name) VALUES (1, 'Music');
INSERT INTO public.category (id, name) VALUES (2, 'Design');
CREATE TABLE public.comment
(
    id integer DEFAULT nextval('comment_id_seq'::regclass) PRIMARY KEY NOT NULL,
    content text,
    postid integer,
    commenterid integer,
    datecommented timestamp,
    parentid integer,
    CONSTRAINT comment_postid_fkey FOREIGN KEY (postid) REFERENCES public.post (id),
    CONSTRAINT comment_commenterid_fkey FOREIGN KEY (commenterid) REFERENCES public.appuser (id)
);
INSERT INTO public.comment (id, content, postid, commenterid, datecommented, parentid) VALUES (2, 'Ohai ohai', 9, 10, '2018-10-05 14:55:05.614000', 1);
INSERT INTO public.comment (id, content, postid, commenterid, datecommented, parentid) VALUES (1, 'Ohai ohai', 9, 10, '2018-10-05 14:54:07.670000', -1);
INSERT INTO public.comment (id, content, postid, commenterid, datecommented, parentid) VALUES (4, 'Ohai ohai', 9, 10, '2018-10-05 14:55:48.693000', 2);
INSERT INTO public.comment (id, content, postid, commenterid, datecommented, parentid) VALUES (3, 'Ohai ohai', 9, 10, '2018-10-05 14:55:23.934000', -1);
INSERT INTO public.comment (id, content, postid, commenterid, datecommented, parentid) VALUES (5, '', 9, 10, '2018-10-05 15:43:02.650000', -1);
INSERT INTO public.comment (id, content, postid, commenterid, datecommented, parentid) VALUES (6, '<p>Flops</p>', 9, 10, '2018-10-05 15:44:43.155000', -1);
INSERT INTO public.comment (id, content, postid, commenterid, datecommented, parentid) VALUES (7, '<p><em>What does it mean?</em></p>', 9, 10, '2018-10-05 15:44:56.347000', 6);
CREATE TABLE public.favorite
(
    postid integer,
    userid integer,
    CONSTRAINT favorite_postid_fkey FOREIGN KEY (postid) REFERENCES public.post (id),
    CONSTRAINT favorite_userid_fkey FOREIGN KEY (userid) REFERENCES public.appuser (id)
);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
INSERT INTO public.favorite (postid, userid) VALUES (null, null);
CREATE TABLE public.post
(
    id integer DEFAULT nextval('post_id_seq'::regclass) PRIMARY KEY NOT NULL,
    name varchar(100),
    content text,
    categoryid integer,
    datepublished timestamp,
    authorid integer,
    previewimage varchar(255),
    public boolean DEFAULT false,
    CONSTRAINT post_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.category (id),
    CONSTRAINT post_authorid_fkey FOREIGN KEY (authorid) REFERENCES public.appuser (id)
);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (10, 'Here I am', 'Waterbug', 2, '2018-10-04 11:34:43.672000', 10, 'http://localhost:3000/public/images/ca88da50-c78e-11e8-b195-6f6657f6b06c.png', true);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (1, 'Post 100', null, 2, '2018-10-04 09:40:53.181000', 10, null, true);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (9, 'ddddd', '<div><img style="max-width: 300px;" src="http://localhost:3000/public/images/a4e51480-c78e-11e8-a4b5-ef3c514d5f74.jpg" class="fr-fil fr-dib">w<strong>ww</strong>w<img src="http://localhost:3000/public/images/16037710-c843-11e8-a1ac-5f747ed1c6b5.png" style="width: 300px;" class="fr-fic fr-dib"></div><p><br></p>', 1, '2018-10-04 11:33:42.222000', 10, null, true);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (2, 'Post 1', null, 1, '2018-10-01 16:47:49.092000', 10, null, true);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (3, 'Minimalism', 'ddddddiaho iaho iahod<img style="display: block; max-width: 300px;" src="http://localhost:3000/public/images/bccf8970-c77c-11e8-8733-2784f57f8280.jpg" />', null, '2018-10-04 09:27:04.318000', 10, null, false);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (4, 'Light', 'yffulF', null, '2018-10-04 09:40:53.181000', 10, null, null);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (6, 'Duelist', 'adfad', 1, '2018-10-04 10:04:05.053000', 10, null, null);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (7, 'Nya', '<div>fluffy</div><div><br></div><div>fluffy <br></div><div><img style="display: block; max-width: 300px;" src="http://localhost:3000/public/images/5203c770-c784-11e8-9d61-336127854030.jpg"></div><div><br></div><div><br></div><br><img style="display: block; max-width: 300px;" src="http://localhost:3000/public/images/12c28de0-c788-11e8-aac6-e37232585614.jpg"><img style="display: block; max-width: 300px;" src="http://localhost:3000/public/images/16430210-c788-11e8-aac6-e37232585614.jpg">', 1, '2018-10-04 10:19:50.873000', 10, null, true);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (5, 'aaaa', '<img style="display: block; max-width: 300px;" src="http://localhost:3000/public/images/5a1c7ab0-c77f-11e8-9d61-336127854030.jpg">', 1, '2018-10-04 09:44:11.437000', 10, 'http://localhost:3000/public/images/7caff570-c78e-11e8-a4b5-ef3c514d5f74.png', true);
INSERT INTO public.post (id, name, content, categoryid, datepublished, authorid, previewimage, public) VALUES (8, 'Happy', '<div><img style="display: block; max-width: 300px;" src="http://localhost:3000/public/images/8a6bbc80-c78e-11e8-a4b5-ef3c514d5f74.png"></div><div>Hello<br></div><br>', 1, '2018-10-04 11:33:04.615000', 10, null, true);
CREATE TABLE public.posttag
(
    postid integer NOT NULL,
    tagid integer NOT NULL,
    CONSTRAINT posttag_pk PRIMARY KEY (postid, tagid),
    CONSTRAINT posttag_postid_fkey FOREIGN KEY (postid) REFERENCES public.post (id),
    CONSTRAINT posttag_tagid_fkey FOREIGN KEY (tagid) REFERENCES public.tag (id)
);
CREATE TABLE public.tag
(
    id integer DEFAULT nextval('tag_id_seq'::regclass) PRIMARY KEY NOT NULL,
    name varchar(50)
);