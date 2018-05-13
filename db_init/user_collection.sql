/**
 * mysql -u tickets_admin -p
 * source /{path}/user_collection.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `user_collection`;

CREATE TABLE `user_collection` (
    `username` varchar(64) NOT NULL,
    `movie_id` int NOT NULL,
    
    PRIMARY KEY (`username`, `movie_id`),
    FOREIGN KEY (`username`) REFERENCES `user`(`username`),
    FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
