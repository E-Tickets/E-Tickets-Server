/**
 * mysql -u tickets_admin -p
 * source /{path}/movie.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `movie`;

CREATE TABLE `movie` (
    `movie_id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(64) NOT NULL,
    `poster` varchar(64) NOT NULL DEFAULT '/images/poster/default.png',
    `director` varchar(64) NOT NULL,
    `actors` varchar(64) NOT NULL,
    `tags` varchar(64) NOT NULL,
    
    PRIMARY KEY (`movie_id`),
    INDEX (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
