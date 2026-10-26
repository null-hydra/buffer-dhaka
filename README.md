# 🚏 Buffer Dhaka — Arrival Reliability Planner

[![Live Deployment](https://img.shields.io/badge/Live-Demo-emerald?style=for-the-badge&logo=githubpages&logoColor=white)](https://null-hydra.github.io/buffer-dhaka/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Python](https://img.shields.io/badge/Engine-Python%203.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)

An intelligent urban transit planner designed specifically for commuters in Dhaka, Bangladesh. Rather than relying on deceptive "average travel times" across heavily congested roads, **Buffer Dhaka** calculates statistical departure buffers ($P_{50}$, $P_{80}$, and $P_{95}$) alongside multi-modal transfers (Dhaka Metro MRT-6, city buses, and local feeder rickshaws/legunas).

---

## Key Architecture & Features

- **44 Two-Way Corridors**: Covers 22 major arterial routes across Dhaka with a one-click `Swap ⇄` direction toggle.
- **Smart Doorstep Hub Routing**: Automatically identifies the closest Metro Station or bus stand to avoid backtracking.
- **Realistic Feeder Fares**: Distinguishes between reserved rickshaws and shared leguna/auto feeder fares (৳15).
- **Statistical Percentile Engine**: Recommends departure buffers tailored to user lateness tolerance:
  - **$P_{50}$ Standard**: Median commute duration for casual errands.
  - **$P_{80}$ Office/Class**: Balanced safety buffer protecting against typical peak-hour slowdowns.
  - **$P_{95}$ Critical**: High-confidence departure window for exams, flights, and interviews.
- **Live Crowdsourced Intake**: Commuter trip submissions persist to a PostgreSQL backend on Supabase.
- **Automated Data Processing**: GitHub Actions workflows run scheduled Python scripts to filter outliers and recalculate percentiles.

---

## Project Organization

```text
buffer-dhaka/
├── .github/workflows/       # GitHub Actions automated workflows
├── scripts/                 # Python statistical engine & dependency files
├── assets/                  # UI screenshots & preview media
├── index.html               # Frontend application & client-side routing logic
├── README.md                # Project documentation & portfolio summary
├── LICENSE                  # MIT License
└── .gitignore               # Ignored system and build files
```

---

## Tech Stack

- **Client**: HTML5, Vanilla JavaScript (ES6+), Tailwind CSS, Plus Jakarta Sans
- **Database & Storage**: PostgreSQL via Supabase (Row Level Security enabled)
- **Analytics & Pipelines**: Python 3.11, NumPy, GitHub Actions
- **Mapping**: Google Maps Embed Platform

---

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/buffer-dhaka.git
   cd buffer-dhaka
   ```
2. Run the web client:
   Open `index.html` directly in any modern web browser.

3. (Optional) Test the Python computation script:
   ```bash
   pip install -r scripts/requirements.txt
   export SUPABASE_URL="your-supabase-url"
   export SUPABASE_SERVICE_KEY="your-supabase-service-key"
   python scripts/recompute_buffers.py
   ```

---

## Author

**Muntasir Islam**  
[LinkedIn Profile](https://www.linkedin.com/in/muntasir-islam-shafin)
