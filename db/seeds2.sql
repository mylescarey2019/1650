USE invest;

INSERT INTO InvestRateTypes (invest_type) VALUES ('monthly');
INSERT INTO InvestRateTypes (invest_type) VALUES ('yearly');

INSERT INTO PlanTypes (type_name) VALUES ('demo');
INSERT INTO PlanTypes (type_name) VALUES ('guest');
INSERT INTO PlanTypes (type_name) VALUES ('user');

INSERT INTO PlanUsers (user_name) VALUES ('system');
INSERT INTO PlanUsers (user_name) VALUES ('guest');
INSERT INTO PlanUsers (user_name) VALUES ('Kyra Rose');
INSERT INTO PlanUsers (user_name) VALUES ('Rory Alexis');

INSERT INTO Plans (plan_name, PlanUserId, PlanTypeId) VALUES ('Demo Model',1,1);
INSERT INTO Plans (plan_name, PlanUserId, PlanTypeId) VALUES ('Demo Model 2',1,1);
INSERT INTO Plans (plan_name, PlanUserId, PlanTypeId) VALUES ('Demo Model 3',1,1);

INSERT INTO Plans (plan_name, PlanUserId, PlanTypeId) VALUES ('My Future',2,2);
INSERT INTO Plans (plan_name, PlanUserId, PlanTypeId) VALUES ('Down the Road',3,2);

INSERT INTO LifeChapters (seq_no,chapter_name,start_age,end_age,invest_amount,InvestRateTypeId,return_pct,inflation_pct,PlanId)
     VALUES (1,'High School',16,18,10.00,1,10.0,3.0,1),
            (2,'College',19,22,100.00,2,8.0,3.0,1),
            (3,'Early Adult',23,35,100.00,1,9.0,3.2,1),
            (4,'Mid Adult',36,55,200.00,1,8.0,3.4,1), 
            (5,'Later Adult',56,66,120.00,1,7.0,4.0,1);

INSERT INTO LifeChapters (seq_no,chapter_name,start_age,end_age,invest_amount,InvestRateTypeId,return_pct,inflation_pct,PlanId)
     VALUES (1,'High School',16,18,20.00,1,10.0,3.0,2),
            (2,'College',19,22,30.00,1,10.5,3.0,2),
            (3,'Adult',23,66,5000.00,2,7.0,4.0,2);

INSERT INTO LifeChapters (seq_no,chapter_name,start_age,end_age,invest_amount,InvestRateTypeId,return_pct,inflation_pct,PlanId)
     VALUES (1,'School Years',16,24,10.00,1,8.0,3.0,3),
            (2,'Adult',24,60,75.00,1,7.0,3.0,3),
            (3,'Early Retirement',61,66, 1000.00,2,6.0,4.5,3);

INSERT INTO LifeChapters (seq_no,chapter_name,start_age,end_age,invest_amount,InvestRateTypeId,return_pct,inflation_pct,PlanId)
     VALUES (1,'High School',16,18,50.00,1,10.0,3.0,4),
            (2,'College',19,22,20.00,1,8.0,3.0,4),
            (3,'Post Grad',23,25,30.00,1,9.0,3.2,4),
            (4,'Early Adult',26,36,200.00,1,8.0,3.4,4), 
            (5,'Mid Adult',37,50,300.00,1,7.0,4.0,4),
            (6,'Later Adult',51,66,400.00,1,5.0,4.0,4);

INSERT INTO LifeChapters (seq_no,chapter_name,start_age,end_age,invest_amount,InvestRateTypeId,return_pct,inflation_pct,PlanId)
     VALUES (1,'High School',16,18,30.00,1,10.0,3.0,5),
            (2,'College',19,22,50.00,1,8.5,3.0,5),
            (3,'Adult',23,66,250.00,1,7.0,3.8,5);