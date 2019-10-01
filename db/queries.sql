USE INVEST;

-- User's plans

SELECT pu.id, pu.user_name
      ,p.id, p.plan_name
      ,pt.id, pt.type_name
  FROM plan_user AS pu 
  JOIN plan AS p 
    ON pu.id = p.plan_user_id
  JOIN plan_type AS pt 
    ON pt.id = p.plan_type_id
 ORDER BY pu.id, p.id;


-- Plans's chapters

SELECT pu.id, pu.user_name
      ,p.id, p.plan_name
      ,pt.id, pt.type_name
      ,lc.id, lc.seq_no, lc.chapter_name
      ,lc.start_age, lc.end_age
      ,lc.invest_amount
      ,irt.invest_type
      ,lc.return_pct
      ,lc.inflation_pct 
  FROM plan_user AS pu 
  JOIN plan AS p 
    ON pu.id = p.plan_user_id
  JOIN plan_type AS pt 
    ON pt.id = p.plan_type_id
  JOIN life_chapter AS lc 
    ON p.id = lc.plan_id
  JOIN invest_rate_type AS irt 
    ON irt.id = lc.invest_rate_type_id
 ORDER BY pu.id, p.id, lc.seq_no