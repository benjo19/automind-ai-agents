create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Remove any prior version of the job before re-scheduling
do $$
begin
  if exists (select 1 from cron.job where jobname = 'gsc-submit-sitemap-daily') then
    perform cron.unschedule('gsc-submit-sitemap-daily');
  end if;
end $$;

-- Run every day at 03:15 UTC
select cron.schedule(
  'gsc-submit-sitemap-daily',
  '15 3 * * *',
  $$
  select net.http_post(
    url := 'https://vkpaugrneyxbqqgkafgl.supabase.co/functions/v1/gsc-submit-sitemap',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);