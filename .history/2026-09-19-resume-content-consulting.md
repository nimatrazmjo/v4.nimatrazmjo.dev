# 2026-09-19 — resume content update + consulting availability

User: "I am not open to work, but I am open to consulting" + updated resume.

Snapshots: `snapshots/2026-09-19-resume-content-consulting/`.

## Availability reframed

The hero badge read **"Available for new projects"**, which scans as
open-to-work. Now "Available for consulting", and the contact lead says it
outright: *"I'm not looking for full-time roles, but I'm open to consulting
engagements — backend and cloud architecture, migrations, or shipping a feature
end to end."* Verified the rendered page no longer contains the old phrasing.

## Identity: Lead -> Senior Software Engineer

Resume headline is "Senior Software Engineer | Full Stack & Backend | React,
Python & AWS". Updated `<title>`, meta description, keywords, JSON-LD `jobTitle`
and the hero subhead.

Note the resume's *current* role title is **Senior DevOps Engineer** (Allegheny
County, Sept 2026 – Present), but the self-chosen headline is Senior Software
Engineer, so that's what the site uses.

## New shared config (`src/config/index.ts`)

`ROLE`, `YEARS_EXPERIENCE`, `AVAILABILITY`, `CAPABILITIES`. The capability chip
list was duplicated in three files (`hero.tsx`, `newsletter.tsx`, and inline in
`layout.tsx`'s keywords); all three now read from config. Chips updated to mirror
the resume headline: Full Stack & Backend · Python & FastAPI · React & Next.js ·
AWS & Terraform (was Scalable Systems · Cloud-Native Architecture ·
High-Traffic APIs · Production-Grade DevOps).

## Projects: 4 -> 6, strict reverse-chronological

Added the Korn Ferry work (most recent senior role, previously absent) and
reordered — EliteBrains (2022–23) had been sitting *after* NETLINKS (2016–22).

| # | Card | Role |
| --- | --- | --- |
| 1 | Job-Competency Data Pipeline *(new)* | Senior Software Engineer, Korn Ferry |
| 2 | Production Performance Optimization *(new)* | Senior Software Engineer, Korn Ferry |
| 3 | Real-Time Live Sports Platform | Lead Software Engineer, Draft Nation |
| 4 | Automated Coding Assessment Platform | Senior Software Developer, EliteBrains |
| 5 | Monolith to Microservices Migration | Senior Software Developer, NETLINKS Inc |
| 6 | Education Portal at 1M+ Users | Software Developer, NETLINKS Inc |

Company casing corrected to match the resume: `Netlinks Inc` -> `NETLINKS Inc`.

Stacks for the two new cards were kept deliberately conservative. The resume
lists Korn Ferry's AWS services (EC2, Lambda, IAM, S3) and datastores (MSSQL,
MongoDB) at *role* level, not per project, so the pipeline card says just
"FastAPI · Python · AWS" rather than inventing which service it ran on.

## Stats

`Certifications: 2 -> 1`. The old 2 counted "AWS AI & Kubernetes (CKAD) in
progress"; the updated resume lists only AWS Certified AI Practitioner (AIF-C01,
2025). CKAD is gone from the resume, so it is gone from the count.

## JSON-LD

Added `hasCredential` (the AWS cert) and `alumniOf` (University of Pune) from the
resume's Certifications and Education sections.

## Deliberately NOT done — needs the user's call

- **Phone number** (+1 412 327 3265) not added to the contact section. It is on
  the resume, but a resume goes to chosen recipients; a public page is scraped.
  Privacy decision, not mine.
- **Two Korn Ferry items left out** to keep "Selected Work" at six: the weekly
  Airflow analytics star-schema pipeline, and the Angular/React + NestJS UI
  delivery. Both are card-worthy if the user wants eight.
- **Allegheny County (current role)** has no card — the resume gives it one
  generic line ("Supporting DevOps, CI/CD, and infrastructure automation"), not
  enough for a project card.
- **"Certifications: 1" is a weak stat** on a consulting site. Suggest swapping
  it for "Users Served: 1M+", which is a real resume number and a far stronger
  signal. Left as-is because changing which stats exist is a design decision.
- **Hero headline** "Designing Scalable Digital Experiences" untouched — brand
  copy, not resume content, and arguably frontend-flavoured for a
  backend/infra consultant. Flagged only.
