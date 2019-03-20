-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
  primary key (`oid`)
);


-- Player [ent1]
create table `player` (
   `oid`  integer  not null,
   `balance`  decimal(19,2),
   `phoneno`  varchar(255),
   `name`  varchar(255),
  primary key (`oid`)
);


-- Bet [ent2]
create table `bet` (
   `oid`  integer  not null,
   `result`  varchar(255),
   `amount`  decimal(19,2),
  primary key (`oid`)
);


-- Event [ent3]
create table `event` (
   `oid`  integer  not null,
   `odddraw`  decimal(19,2),
   `oddaway`  decimal(19,2),
   `oddhome`  decimal(19,2),
   `result`  varchar(255),
   `status`  varchar(255),
  primary key (`oid`)
);


-- Team [ent4]
create table `team` (
   `oid`  integer  not null,
   `name`  varchar(255),
  primary key (`oid`)
);


-- League [ent6]
create table `league` (
   `oid`  integer  not null,
   `name`  varchar(255),
  primary key (`oid`)
);


-- Sport [ent7]
create table `sport` (
   `oid`  integer  not null,
   `name`  varchar(255),
  primary key (`oid`)
);


-- Notification [ent8]
create table `notification` (
   `oid`  integer  not null,
   `balancebet`  decimal(19,2),
   `status`  varchar(255),
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;
alter table `group`   add index fk_group_module (`module_oid`), add constraint fk_group_module foreign key (`module_oid`) references `module` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
);
alter table `group_module`   add index fk_group_module_group (`group_oid`), add constraint fk_group_module_group foreign key (`group_oid`) references `group` (`oid`);
alter table `group_module`   add index fk_group_module_module (`module_oid`), add constraint fk_group_module_module foreign key (`module_oid`) references `module` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`  add column  `group_oid`  integer;
alter table `user`   add index fk_user_group (`group_oid`), add constraint fk_user_group foreign key (`group_oid`) references `group` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `user_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_user (`user_oid`), add constraint fk_user_group_user foreign key (`user_oid`) references `user` (`oid`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);


-- Event_Sport [rel11]
alter table `sport`  add column  `event_oid`  integer;
alter table `sport`   add index fk_sport_event (`event_oid`), add constraint fk_sport_event foreign key (`event_oid`) references `event` (`oid`);


-- Sport_League [rel12]
alter table `sport`  add column  `league_oid`  integer;
alter table `sport`   add index fk_sport_league (`league_oid`), add constraint fk_sport_league foreign key (`league_oid`) references `league` (`oid`);


-- Team_League [rel2]
create table `team_league` (
   `team_oid`  integer not null,
   `league_oid`  integer not null,
  primary key (`team_oid`, `league_oid`)
);
alter table `team_league`   add index fk_team_league_team (`team_oid`), add constraint fk_team_league_team foreign key (`team_oid`) references `team` (`oid`);
alter table `team_league`   add index fk_team_league_league (`league_oid`), add constraint fk_team_league_league foreign key (`league_oid`) references `league` (`oid`);


-- Bet_Player [rel4]
alter table `player`  add column  `bet_oid`  integer;
alter table `player`   add index fk_player_bet (`bet_oid`), add constraint fk_player_bet foreign key (`bet_oid`) references `bet` (`oid`);


-- Player_Notification [rel5]
alter table `player`  add column  `notification_oid`  integer;
alter table `player`   add index fk_player_notification (`notification_oid`), add constraint fk_player_notification foreign key (`notification_oid`) references `notification` (`oid`);


-- User_Player [rel6]
alter table `player`  add column  `user_oid`  integer;
alter table `player`   add index fk_player_user (`user_oid`), add constraint fk_player_user foreign key (`user_oid`) references `user` (`oid`);


-- Bet_Event [rel7]
alter table `event`  add column  `bet_oid`  integer;
alter table `event`   add index fk_event_bet (`bet_oid`), add constraint fk_event_bet foreign key (`bet_oid`) references `bet` (`oid`);


-- Event_Team [rel8]
alter table `team`  add column  `event_oid`  integer;
alter table `team`   add index fk_team_event (`event_oid`), add constraint fk_team_event foreign key (`event_oid`) references `event` (`oid`);


