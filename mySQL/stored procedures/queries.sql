-- query "Available Events"

SELECT CONCAT("Event nº",e.oid), 
	   GROUP_CONCAT(t.name), e.oddhome, 
       e.oddaway, e.odddraw, l.name, 
       s.name
FROM Event e
INNER JOIN League l ON e.league_oid = l.oid
INNER JOIN Sport s ON e.sport_oid = s.oid
INNER JOIN Event_Team et ON e.oid = et.event_oid
INNER JOIN Team t ON et.team_oid = t.oid
GROUP BY(e.oid);


-- query "My Bets"

SELECT b.oid, CONCAT("Event nº",e.oid), 
	   GROUP_CONCAT(t.name),
       b.amount, b.result
FROM Event e
INNER JOIN Event_Team et ON e.oid = et.event_oid
INNER JOIN Team t ON et.team_oid = t.oid
INNER JOIN Bet b ON e.oid = b.event_oid
GROUP BY b.oid;


-- SELECT b.oid, CONCAT("Event nº",e.oid), 
-- 	   GROUP_CONCAT(t.name),
--       b.amount, e.result,
-- 	   n.balancebet, n.status
-- FROM Event e
-- INNER JOIN Event_Team et ON e.oid = et.event_oid
-- INNER JOIN Team t ON et.team_oid = t.oid
-- INNER JOIN Bet b ON e.oid = b.event_oid
-- INNER JOIN User u ON b.user_oid = u.oid
-- INNER JOIN Notification n ON u.oid = n.event_oid
-- WHERE e.status = 'fechado'
-- GROUP BY b.oid;


-- query "My Notifications"

SELECT b.oid AS betNumber, n.event_oid, e.result, n.balancebet, n.status 
FROM Notification n
INNER JOIN Event e ON n.event_oid = e.oid
INNER JOIN Bet b ON e.oid = b.event_oid
INNER JOIN Event_Team et ON e.oid = et.event_oid
INNER JOIN Team t ON et.team_oid = t.oid
GROUP BY n.oid;