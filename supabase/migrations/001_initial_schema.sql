-- Consultation request submissions (the floating "Get Free Consultation" widget)
create table if not exists consultation_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text,
  ip_address text,
  created_at timestamptz default now()
);

create index if not exists consultation_submissions_ip_created_idx
  on consultation_submissions (ip_address, created_at);

alter table consultation_submissions enable row level security;
create policy "Allow public insert consultation"
  on consultation_submissions for insert with check (true);

-- Agency directory submissions (the /submit-agency form)
create table if not exists agency_submissions (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  website text not null,
  contact_email text not null,
  contact_name text,
  description text,
  services text,
  location text,
  status text default 'pending',
  ip_address text,
  created_at timestamptz default now()
);

create index if not exists agency_submissions_ip_created_idx
  on agency_submissions (ip_address, created_at);

alter table agency_submissions enable row level security;
create policy "Allow public insert agency"
  on agency_submissions for insert with check (true);
