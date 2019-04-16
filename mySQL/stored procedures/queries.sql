-- query "Available Events"

SELECT CONCAT("Event nº",e.oid), 
	   (SELECT name FROM team t where e.team_oid = t.oid) AS 'Home Team', (SELECT name FROM team t where e.team_oid_2 = t.oid) AS 'Away Team',
       e.oddhome, e.oddaway, e.odddraw, l.name, 
       s.name
FROM Event e
INNER JOIN League l ON e.league_oid = l.oid
INNER JOIN Sport s ON e.sport_oid = s.oid
GROUP BY(e.oid);


-- query "My Bets"

SELECT b.oid, CONCAT("Event nº",e.oid), 
	   (SELECT name FROM team t where e.team_oid = t.oid) AS 'Home Team', (SELECT name FROM team t where e.team_oid_2 = t.oid) AS 'Away Team',
       b.amount, b.result
FROM Event e
INNER JOIN Bet b ON e.oid = b.event_oid
GROUP BY b.oid;



-- query "My Notifications"

SELECT b.oid AS betNumber,
	(SELECT name FROM team t where e.team_oid = t.oid) AS 'Home Team', (SELECT name FROM team t where e.team_oid_2 = t.oid) AS 'Away Team',
	e.oid, e.result, n.balancebet, n.status 
FROM Event e
INNER JOIN Notification n ON e.oid = n.event_oid
INNER JOIN Bet b ON e.oid = b.event_oid
GROUP BY n.oid;