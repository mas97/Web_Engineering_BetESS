DROP PROCEDURE IF EXISTS get_lista;
DELIMITER $$
CREATE PROCEDURE get_lista()
BEGIN
	DECLARE erro BOOL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
    START TRANSACTION;


SELECT CONCAT('Evento nº',e.oid) AS Evento, 
	   GROUP_CONCAT(t.name) AS Equipas, e.oddhome, 
       e.oddaway, e.odddraw, l.name AS Liga, 
       s.name AS Desporto 
FROM event e
INNER JOIN League l ON e.league_oid = l.oid
INNER JOIN Sport s ON e.sport_oid = s.oid
INNER JOIN Event_team et ON e.oid = et.event_oid
INNER JOIN Team t ON et.team_oid = t.oid
GROUP BY(e.oid);

	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END
$$
DELIMITER ;