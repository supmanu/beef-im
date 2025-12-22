# 🏥 INSURANCE PROPOSAL ENGINE v1.5
## Module Extension for Nerd with Nart Content Engine

**Purpose:** Generate professional health insurance proposals in English AND Thai  
**Created:** December 8, 2025  
**Updated:** December 12, 2025 (v1.5 — AIA Total Care bundled requirement, iSign eligibility rules)  
**Based on:** Andy Z. (Canadian, 30), Joseph K. (American, 44), Kenta (Japanese, 41), Tui (Thai, 49) case studies

---

## ⚠️ IMPORTANT: This is a MODULE, Not a Standalone System

This Insurance Proposal Engine works **WITH** your existing Nerd with Nart Content Engine.

**You MUST also upload these CORE FILES:**

| Core File | Purpose | Required For |
|-----------|---------|--------------|
| `Voice_DNA_Blueprint_v5_2_CORE.md` | Your identity (Legacy Quant / Nerd with Nart) | All proposals |
| `PILLAR_2_Brand_Constitution_v4_3_2_OPTIMIZED.md` | Fiduciary positioning, banned terms | All proposals |
| `Terminology_Cheat_Sheet_v4_3_FINAL.md` | Correct Thai insurance terms | Thai proposals |
| `Thai_First_Handshake_EXCEPTIONS_v4_3_1_OPTIMIZED.md` | 85/15 Thai-First formatting | Thai proposals |

**Without these files, the system will lack:**
- Your authentic voice
- Brand compliance (no "HNW", no "รีบ", no sales urgency)
- Correct Thai terminology
- Fiduciary positioning

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#system-overview)
2. [Workflow Architecture](#workflow-architecture)
3. [Language Modes: English vs Thai](#language-modes)
4. [Proposal Structure Template](#proposal-structure-template)
5. [Client Segmentation Framework](#client-segmentation-framework)
6. [Product Knowledge Base](#product-knowledge-base)
7. [Key Terminology & Concepts](#key-terminology)
8. [Strategic Positioning by Nationality](#strategic-positioning)
9. [System Prompts](#system-prompts)
10. [Files to Upload](#files-to-upload)
11. [Quality Checklist](#quality-checklist)

---

<a name="system-overview"></a>
## 1. 🎯 SYSTEM OVERVIEW

### What This System Does

Generates professional, strategic health insurance proposals for:
- **Primary audience:** Clients in Thailand (expats AND Thai nationals)
- **Languages:** English AND Thai
- **Age range:** 25-60 (sweet spot: 30-50)
- **Products:** AIA Thailand health and critical illness portfolio

### Core Philosophy

**"Strategy, Not Sales"** (From Brand Constitution)

These proposals position Natapol as a **fiduciary advisor** who:
- Explains mechanisms, not just benefits
- Compares client's situation to alternatives
- Presents multiple options with honest trade-offs
- Recommends based on client's specific situation
- NEVER uses promotional urgency (per Brand Constitution)

**Key differentiator:** The "Why" section before the "What" — explaining the strategic logic before listing products.

### Integration with Content Engine

| Mode | Voice | Language | Use Case |
|------|-------|----------|----------|
| **English Proposal** | Legacy Quant | English | Expat clients |
| **Thai Proposal** | Nerd with Nart | Thai | Thai clients |
| **Thai Social Content** | Nerd with Nart | Thai | Facebook/LinkedIn |
| **English LinkedIn** | Legacy Quant | English | Professional content |

The Proposal Engine uses the SAME voice identities from Voice DNA — just applied to proposals instead of social content.

---

<a name="workflow-architecture"></a>
## 2. 🔄 WORKFLOW ARCHITECTURE

### Two-Agent System

| Agent | Role | Platform | Function |
|-------|------|----------|----------|
| **Claude Performer** | Draft Writer | Claude Project | Generates full proposal from client brief |
| **Gemini Auditor** | Quality Check | Gemini Gem | Reviews draft, suggests improvements |

### Standard Workflow

```
1. CLIENT BRIEF → Claude
   - Name, age, nationality
   - Language preference (English/Thai)
   - Visa type / residency status
   - Specific concerns mentioned
   - Budget range (if known)

2. CLAUDE GENERATES → Draft Proposal
   - Full markdown document
   - All sections populated
   - Voice matched to language (Legacy Quant / Nerd with Nart)

3. DRAFT → Gemini Auditor
   - Check for accuracy
   - Brand Constitution compliance
   - Terminology correctness (for Thai)
   - Suggest improvements

4. CLAUDE REVISES → Final Draft
   - Incorporate Gemini feedback
   - Polish language
   - Ensure consistency

5. NATAPOL REVIEWS → Final Human Check
   - Add screenshots
   - Convert to PDF
   - Send to client
```

### iSign Eligibility & Signing Process

**CRITICAL OPERATIONAL REQUIREMENT:**

| Client Type | Initial Application | Adding Riders Later | Annual Renewals |
|-------------|-------------------|-------------------|-----------------|
| **Thai Citizens** | ✅ iSign (remote via AIA App) | ✅ iSign (remote) | Payment only (wire/credit card) |
| **Foreigners (All)** | ❌ Must sign physically on agent's iPad (in-person meeting required) | Try iSign first (may work); if fails → meet physically | Payment only (wire/credit card) |

**Key Points:**

1. **First-Time Main Policy (Foreigners):**
   - Must coordinate physical meeting in Bangkok/Thailand
   - Sign on agent's iPad (digital signature, but in-person)
   - Takes 15-20 minutes
   - Cannot be done remotely

2. **Adding Riders/Products to Existing Policy (Foreigners):**
   - AIA system sometimes allows iSign for add-ons (not guaranteed)
   - Worth trying remote process first
   - Example: Canadian client successfully added PA via iSign ~1 month after initial Health Happy application
   - If system rejects → schedule brief meeting

3. **Annual Renewals (Everyone):**
   - No signature required
   - Client pays directly to AIA (bank transfer or credit card online)
   - Agent sends renewal reminder only

**Impact on Proposal Language:**

| Client Type | What to Say |
|-------------|-------------|
| **Thai Clients** | "ทำ iSign ได้เลยผ่าน AIA App ไม่ต้องเจอกัน ทั้งสมัครครั้งแรกและต่ออายุ" |
| **Foreign Clients** | "Once your visa is approved, we'll meet to complete the application on my iPad—takes about 15-20 minutes. After that, renewals are simple: just pay online, no need to meet." |

**Visa Timing Consideration:**
Foreign clients must be physically present in Thailand when their long-term visa (Business, Work Permit, Elite, Marriage, Retirement) is approved to complete the initial application.

---

### Trigger Phrases for Claude

| Trigger | Action |
|---------|--------|
| `Proposal EN: [Client Name], [Age], [Nationality]` | English proposal |
| `Proposal TH: [ชื่อลูกค้า], [อายุ]` | Thai proposal (standard) |
| `Proposal TH PRO: [ชื่อลูกค้า], [อายุ]` | Thai proposal (PRO MODE for HNW) |
| `Add PA section` | Add AIANPA4600 loophole closer section |
| `Switch to Option A/B/C` | Change recommendation |
| `Add CI Procare` | Include CI Procare in recommendation |
| `Generate LINE message` | Create delivery message for client |

---

<a name="language-modes"></a>
## 3. 🌐 LANGUAGE MODES: ENGLISH VS THAI

### English Proposals (Expat Clients)

**Voice:** Legacy Quant (from Voice DNA)
- Authoritative + Accessible
- Financial sophistication without jargon walls
- Essay format with clear thesis
- Data-driven, mechanism-focused

**Structure:**
- All headers in English
- Currency: THB with USD/CAD/GBP conversion
- Comparison: Client's home country vs Thailand
- Tone: Professional consultant

**Example Opening:**
```
Any health insurance policy that leaves you exposed to $50,000+ in out-of-pocket 
costs isn't protection — it's a false sense of security. Here's how to build 
actual coverage...
```

### Thai Proposals (Thai Clients)

**Voice:** Nerd with Nart (from Voice DNA)
- Systems Thinker + Caring Advocate
- Thai-First Handshake (85/15 ratio)
- Explains mechanisms with patience
- Protective guardian tone

**🔥 PRO MODE (For Thai HNW Clients)**

For wealthy Thai clients, use "Nerd with Nart: PRO MODE" — a hybrid:

| Component | What It Means |
|-----------|---------------|
| **NERD (Brain)** | Same sophisticated structures as Legacy Quant: Rent vs Mortgage, 24-hour loophole, Medical Arbitrage |
| **NART (Heart)** | Warm, protective, relationship-first tone: "ผม เข้าใจดีครับว่า...", protective framing |
| **PRO (Polish)** | High-end presentation, clean formatting, no casual slang |

**Why PRO MODE, not Legacy Quant for Thai?**
- Thai HNW culture is "High Context" — values relationship (Barami/Metta) alongside logic
- Legacy Quant sounds like a foreign institution (cold, distant, transactional)
- You LOSE your competitive advantage: the "Nart" (refuge/protector)

**The Formula:** "Speak like Nart (Warmth), Think like a Quant (Logic)."

**Structure:**
- All headers in Pure Thai (per Brand Constitution)
- Currency: THB primary
- Comparison: Current situation vs proposed coverage
- Tone: Trusted advisor who happens to be brilliant (not cold analyst)

**Thai-First Formatting (MANDATORY):**
```
✅ เบี้ยประกันภัย (Premium)
✅ ความคุ้มครอง (Coverage)
✅ มูลค่าเวนคืน (Surrender Value) — NOT มูลค่าจำนำ
✅ ค่าความเสี่ยงภัย (COI)
❌ Premium (เบี้ยประกันภัย) — WRONG ORDER
```

**Example Opening (Thai):**
```
ผม (เนิร์ดกับนาถ) เข้าใจดีครับว่า การเลือกประกันสุขภาพไม่ใช่เรื่องง่าย 
โดยเฉพาะเมื่อมีตัวเลือกมากมายที่ดูคล้ายกันหมด

แต่ความจริงที่หลายคนไม่รู้คือ: ราคาเท่ากัน ไม่ได้แปลว่าคุณค่าเท่ากัน

ให้ผมอธิบายกลไกที่ซ่อนอยู่...
```

### Key Differences Summary

| Aspect | English Proposal | Thai Proposal |
|--------|------------------|---------------|
| **Voice** | Legacy Quant | Nerd with Nart |
| **Headers** | English | Pure Thai |
| **Technical terms** | English primary | Thai-First (85/15) |
| **Currency** | THB + foreign conversion | THB primary |
| **Pronoun** | "I" (minimal), "you" (primary) | ผม (minimal), คุณ (primary) |
| **Opening** | Direct statement | Empathy + validation first |
| **Watermarks** | Optional | Required (ผม เนิร์ดกับนาถ...) |
| **Comparison** | Home country vs Thailand | Current vs proposed |

### Thai Terminology Quick Reference

| English | Correct Thai | WRONG Thai |
|---------|--------------|------------|
| Premium | เบี้ยประกันภัย | — |
| Coverage | ความคุ้มครอง | — |
| Sum Insured | จำนวนเงินเอาประกันภัย | ทุนประกัน |
| Surrender Value | มูลค่าเวนคืน | มูลค่าจำนำ ❌ |
| Cash Value | มูลค่าเงินสด | เงินสะสม ❌ |
| Critical Illness | โรคร้ายแรง | — |
| Waiting Period | ระยะเวลารอคอย | — |
| Claim | การเรียกร้องค่าสินไหม | — |
| Beneficiary | ผู้รับผลประโยชน์ | — |
| Premium Waiver | การยกเว้นเบี้ยประกันภัย | — |

**Full terminology: See `Terminology_Cheat_Sheet_v4_3_FINAL.md`**

---

<a name="proposal-structure-template"></a>
## 3. 📄 PROPOSAL STRUCTURE TEMPLATE

### Standard 13-Section Format

```markdown
# Health Insurance Proposal for [Client Name]

## Executive Summary
- Client profile (age, nationality, visa status)
- Recommended plan with total premium
- Key coverage summary table
- One-line key advantage

---

## The Reality Check: [Home Country] vs Thailand
- Comparison table (3 columns if relevant)
- Core argument for Thailand-based coverage
- "The Bottom Line" statement

---

## Understanding Your Coverage: Two Types of Benefits
- Type 1: Paid to Hospital (bills)
- Type 2: Cash to Client (income replacement)
- Why both matter

---

## Policy Design Options

### Option A: The Comprehensive
- Coverage summary table
- Total annual premium

### Option B: The Minimalist  
- Coverage summary table
- Total annual premium

### Option C: The Hybrid (if applicable)
- Coverage summary table
- Total annual premium
- "Rent vs Mortgage" explanation for CI Procare

---

## [Optional] The Strategic Add-On: PA Loophole Closer
- 24-hour rule explanation
- AIANPA4600 recommendation

---

## Why Health Happy 25M?
- Sufficient coverage argument
- Critical illness doubling feature
- Flexibility to downgrade

---

## Waiting Periods
- Table of waiting periods by condition type

---

## Exclusions (Brief)
- Pre-existing conditions
- Elective procedures
- Key exclusion categories

---

## Policy Validity & Residency
- Residency requirement (purchase only)
- Coverage while traveling
- Renewal guarantees

---

## Why AIA? The Regulatory Advantage
- OIC regulation benefits table
- Comparison to offshore insurers

---

## What Happens If...
- Scenario table (8-10 common questions)

---

## Summary: The Complete Protection Stack
- Final coverage layers table

---

## Recommendation
- Clear recommendation with reasoning
- Final premium summary table
- Comparison of all options
- Next steps

---

## Appendix
- List of brochures to attach
```

---

<a name="client-segmentation-framework"></a>
## 4. 👥 CLIENT SEGMENTATION FRAMEWORK

### By Nationality

| Nationality | Core Fear | Key Argument | Comparison Focus |
|-------------|-----------|--------------|------------------|
| **American** | Medical bankruptcy | "US healthcare = fast but will bankrupt you" | Speed + cost |
| **Canadian** | Wait times | "Free but 6-month waits for MRI" | Speed + availability |
| **British** | NHS decline | "NHS good for emergencies, poor for elective" | Quality + choice |
| **Australian** | Distance from home | "Can't fly 20 hours for treatment" | Proximity + continuity |
| **Japanese** | Rigid systems | "Japan good but inflexible; Thailand = quality + access" | Quality + flexibility |

### By Age

| Age Range | Premium Sensitivity | CI Procare Fit | Key Angle |
|-----------|---------------------|----------------|-----------|
| **25-35** | Lower | Excellent (long payoff runway) | "Lock in insurability now" |
| **36-45** | Medium | Good (20-year payoff still viable) | "Window narrowing" |
| **46-55** | Higher | Case-by-case (shorter runway) | "Last chance for good rates" |
| **56+** | High | Usually not recommended | "Focus on health coverage" |

### By Visa Type

| Visa Type | Residency Concern | Recommendation |
|-----------|-------------------|----------------|
| **Thailand Elite** | None (long-term) | Full suite recommended |
| **Business Visa** | Medium-term stability | Health + CI, flexible base |
| **Retirement Visa** | Insurance often required | May already have basic coverage |
| **DTV (Digital Nomad)** | Must transition to long-term visa first | Interim coverage OR wait for Business visa |
| **Tourist/Short-term** | High uncertainty | Cannot purchase (ineligible) |

---

<a name="product-knowledge-base"></a>
## 5. 📦 PRODUCT KNOWLEDGE BASE

### Core Products

#### Health Happy (Health Insurance)

| Plan | Annual Limit | Key Features |
|------|--------------|--------------|
| Health Happy 25M | 25,000,000 THB | Doubles to 50M for 4 years if CI diagnosed |
| Health Happy 15M | 15,000,000 THB | Same doubling feature |
| Health Happy 5M | 5,000,000 THB | Budget option |
| Health Happy 1M | 1,000,000 THB | Minimum coverage |

**Key points:**
- Coverage resets annually
- After 4-year CI boost, returns to base limit (continues for life)
- Flexibility to downgrade at renewal
- OPD limit: 2,000 THB/visit (general illness)
- Accidental OPD within 24 hours: Full coverage

#### HB Extra (Hospital Cash Benefit)

| Daily Benefit | Premium (Age 49) | Notes |
|---------------|------------------|-------|
| 200 THB/day | ~580 THB/year | Minimum unit |
| 5,000 THB/day | ~14,500 THB/year | Common unit |
| 10,000 THB/day | — | Maximum cap per person |

**Key points:**
- Cash paid to client (income replacement)
- AIA has a **hard cap of 10,000 THB/day** total across all policies
- Must check existing HB coverage before adding more
- Stacks with other benefits

#### Care for Cancer

| Unit | Inpatient | Outpatient |
|------|-----------|------------|
| 1 unit | 10,000 THB/day | 2,500 THB/day |
| 2 units | 20,000 THB/day | 5,000 THB/day |
| 3 units | 30,000 THB/day | 7,500 THB/day |

**Key points:**
- Cash benefit during cancer treatment
- Supplements Health Happy coverage
- Helps with non-medical costs (travel, family, etc.)

#### Multi-Pay CI Plus (Critical Illness)

| Sum Insured Options | Claims | Premium Waiver |
|---------------------|--------|----------------|
| 1,000,000 THB | Up to 6 | Yes, on severe CI diagnosis |
| 3,000,000 THB | Up to 6 | Yes, on severe CI diagnosis |
| 5,000,000 THB | Up to 6 | Yes, on severe CI diagnosis |

**Key points:**
- 44 covered conditions
- Multiple claims allowed (different conditions)
- Premium waived after severe CI diagnosis
- Lump sum paid within days of approval

**⚠️ CRITICAL: Multi-Pay CI Plus Bundle Requirement**

Multi-Pay CI Plus is NOT a standalone product. It is a **mandatory two-part package**:

| Component | What It Is | Can Be Separated? |
|-----------|------------|-------------------|
| **Multi-Pay CI Plus** | Main critical illness coverage | ❌ NO |
| **AIA Total Care** | Bundled rider (Major Impact Benefit, Continuing Care Benefit) | ❌ NO - MANDATORY |

**Premium Structure:**

| Sum Insured | Multi-Pay CI Plus Premium (Age 41) | AIA Total Care Premium (Age 41) | **TOTAL Package** |
|-------------|-----------------------------------|--------------------------------|-------------------|
| 3,000,000 THB | 46,410 THB | 4,200 THB | **50,610 THB** |
| 1,000,000 THB | 15,470 THB | ~1,400 THB* | **~16,870 THB** |

*Estimated proportionally - verify with AIA system

**AIA UneedLife App Limitation:**
The app CANNOT display all components in one screenshot. When you see Multi-Pay CI Plus displayed alone, remember that AIA Total Care is automatically included but not visible in that view. You must scroll or check separate screens to see Total Care listed.

**Impact on Proposals:**
When calculating total premiums, you MUST add both components:
- ❌ WRONG: "Multi-Pay CI Plus 3M = 46,410 THB"
- ✅ CORRECT: "Multi-Pay CI Plus 3M + Total Care = 50,610 THB"

**What is AIA Total Care?**
This bundled rider provides:
- **Major Impact Benefit (MIB):** Triggers premium waiver if major surgery + 5 days ICU, respiratory support + 5 days ICU, or major organ failure + 5 days ICU
- **Continuing Care Benefit:** Additional support benefits
- **Part of CI Procare's premium waiver triggers** (see CI Procare section)

This is the SAME trigger mechanism that waives CI Procare premiums.

---

#### CI Procare (Critical Illness with Savings)

| Feature | Detail |
|---------|--------|
| Payment period | 20 years (fixed) |
| Coverage period | Until age 99 |
| Premium waiver | On CI diagnosis OR MIB trigger |
| Surrender value | Approximately total premiums at end of payment period |

**Premium Waiver Triggers:**

1. **Severe CI Diagnosis:** Cancer, heart attack, stroke, kidney failure, etc.
2. **Major Impact Benefit (MIB):** Major surgery, respiratory support, or major organ failure with 5+ days ICU

**"Rent vs Mortgage" analogy:**
- Multi-Pay CI Plus = "Rent" (pay forever, own nothing)
- CI Procare = "Mortgage" (pay 20 years, own coverage for life)

#### AIANPA4600 (Personal Accident)

| Feature | Detail |
|---------|--------|
| Coverage | 100,000 THB per incident |
| Claim window | 365 days from incident |
| Annual premium | ~4,600 THB |
| Use case | Closes "24-hour OPD loophole" |

**24-Hour Rule Explanation:**

| Timing | Treatment Type | Standard Health Coverage |
|--------|----------------|--------------------------|
| Within 24 hours | OPD | Full 25M |
| Within 24 hours | IPD | Full 25M |
| After 24 hours | IPD | Full 25M |
| **After 24 hours** | **OPD** | **Only 2,000 THB/visit** |

AIANPA4600 covers accident follow-ups (MRI, physio, ortho) for 365 days regardless of timing.

---

<a name="key-terminology"></a>
## 6. 📖 KEY TERMINOLOGY & CONCEPTS

### Insurance Terms

| Term | Definition | Use in Proposal |
|------|------------|-----------------|
| **Premium** | Annual payment for coverage | Always state in THB and client's home currency |
| **Sum Insured** | Maximum payout amount | Clarify if per-incident or per-year |
| **Rider** | Add-on coverage to base policy | Explain as "layers of protection" |
| **Waiting Period** | Time before coverage activates | Always disclose prominently |
| **Pre-existing Condition** | Health issue before policy start | Key exclusion to explain |
| **Underwriting** | Risk assessment process | Mention re: health declaration |

### Strategic Concepts

| Concept | Explanation | When to Use |
|---------|-------------|-------------|
| **Insurability Window** | Coverage gets harder/more expensive with age | Age-based urgency (not promotional urgency) |
| **Mathematical Necessity** | Numbers prove the case | Replace "hurry" with logic |
| **Salary Continuation** | CI cash as income replacement | For business owners / breadwinners |
| **The Loophole Closer** | PA covers gaps in standard health | When recommending AIANPA4600 |
| **Rent vs Mortgage** | CI Procare builds equity | When recommending Option C |

### Regulatory Terms (OIC Advantage — Your Weapon Against Offshore Competitors)

| Term | Definition | Why It Matters |
|------|------------|----------------|
| **OIC** | Office of Insurance Commission (Thai regulator) | Local legal recourse if disputes arise |
| **New Health Standard (2024)** | Standardized policy terms, no hidden exclusions | No "fine print surprises" at claim time |
| **Guaranteed Renewal** | Insurer **cannot cancel or refuse renewal**, even if you have high claims (fraud only exception) | This is HUGE — offshore insurers can drop you after big claims |
| **Portfolio-Based Pricing** | Premiums adjusted based on **entire portfolio**, not your individual claim history | You won't be "priced out" individually just because you got sick |

### Agent Commission Rules

| Rule | Detail | Implication |
|------|--------|-------------|
| **180-Day Rule** | If client cancels/surrenders existing policy within 180 days of buying new policy from same agent, commission is forfeited | When replacing old policies, ensure new policy is issued 180+ days before old policy renewal |
| **Commission Timing** | Major commission in Year 1 only | Agents have incentive to sell, less incentive to service |

**Strategic Use of 180-Day Rule:**

When client has old policy to cancel/surrender:
1. Calculate renewal date of old policy
2. Ensure new policy is **issued at least 180 days before** old policy renewal
3. Client can safely let old policy expire at renewal without agent penalty

**Example:** If old policy renews in June 2026 → New policy must be issued by December 2025 (6 months prior)

### Old Standard vs New Health Standard

| Feature | Old Standard (Pre-2024) | New Health Standard (2024+) |
|---------|------------------------|----------------------------|
| Individual price increases | ⚠️ Allowed based on claims | ❌ NOT allowed |
| Policy cancellation | ⚠️ Insurer can refuse renewal | ❌ NOT allowed (fraud only) |
| Co-payment clause | ❌ None | ⚠️ May apply (after April 2024) |
| OIC protection | Limited | Full protection |
| **Recommendation** | Replace with New Standard | Keep/Renew |

**When to recommend NOT renewing old policies:**
- Old standard policy with similar coverage to new policy client already has
- Premium keeps increasing yearly (compound cost)
- No special benefits that new policy can't match

**🔥 THE OIC PITCH (Use This Against Offshore Competitors):**

> "Some expats buy health coverage from non-OIC-regulated providers — offshore insurers, travel insurance companies. These may be cheaper, but when it's time to claim — especially for large amounts — there's no Thai regulator to protect you.
>
> With AIA (OIC-regulated), if there's ever a dispute, you have legal recourse through the OIC. More importantly: **they cannot cancel your policy or refuse renewal just because you made claims.** Offshore insurers can — and do — drop clients after expensive treatments.
>
> That peace of mind is worth the premium."

---

<a name="strategic-positioning"></a>
## 7. 🌐 STRATEGIC POSITIONING BY NATIONALITY

### American Clients

**Core Argument:** "Medical bankruptcy protection"

**Key Statistics:**
- Medical debt is #1 cause of personal bankruptcy in USA
- Average serious diagnosis = $50,000-$150,000+ out of pocket even WITH insurance
- Deductibles, co-pays, out-of-network surprises

**Comparison Table Template:**

| Factor | USA | Thailand (with AIA) |
|--------|-----|---------------------|
| Speed to specialist | Fast (if insured) | Fast |
| Out-of-pocket risk | $50,000-$150,000+ | Near zero |
| Premium cost | $12,000-$24,000/year | $3,000-$5,000/year |
| Bankruptcy risk | Real | None |

**Key Line:** "Thailand gives you US-level speed without US-level bankruptcy risk."

### Canadian Clients

**Core Argument:** "Speed and availability"

**Key Statistics:**
- Average wait for specialist: 27.7 weeks (Fraser Institute)
- MRI wait: 3-6 months in many provinces
- Some treatments "not covered" or require travel

**Comparison Table Template:**

| Factor | Canada | Thailand (with AIA) | USA (for reference) |
|--------|--------|---------------------|---------------------|
| Cost | Free (taxes) | ~$3,500-$5,000/year | $15,000-$25,000/year |
| Wait time | Weeks to months | Days | Days |
| Quality | Good | Excellent (JCI hospitals) | Excellent |
| Bankruptcy risk | None | None | Real |

**Key Line:** "Thailand gives you US-level speed at Canadian-level cost, without Canadian wait times."

### British Clients

**Core Argument:** "NHS supplement / quality of care"

**Key Points:**
- NHS excellent for emergencies
- Elective procedures: long waits, limited choice
- Dental, vision often excluded
- Private UK insurance: expensive

**Key Line:** "Thailand offers NHS-level cost structure with US-level speed and choice."

### Japanese Clients

**Core Argument:** "Quality + flexibility without rigid systems"

**Key Points:**
- Japan has excellent universal healthcare (70-80% coverage)
- But rigid systems, long wait times for non-urgent care
- Language barriers when traveling
- Thailand offers same quality with more flexibility

**Key Line:** "Thailand gives you Japanese-level quality care with international flexibility and English/Japanese support."

---

<a name="system-prompts"></a>
## 8. 🤖 SYSTEM PROMPTS

### Claude Project: Insurance Proposal Performer

```
*** SYSTEM ROLE: INSURANCE PROPOSAL PERFORMER v1.4 ***

<role>
You are a professional insurance proposal writer for Natapol Supmanu, a licensed insurance agent and investment consultant in Thailand.

You generate strategic health insurance proposals in BOTH English AND Thai.

Your proposals position Natapol as a fiduciary advisor who explains mechanisms, not just benefits.
</role>

<required_knowledge_files>
You have access to these files (ALWAYS reference them):
1. Voice_DNA_Blueprint_v5_2_CORE.md — Your voice identity
2. PILLAR_2_Brand_Constitution_v4_3_2_OPTIMIZED.md — Laws and bans
3. Terminology_Cheat_Sheet_v4_3_FINAL.md — Correct Thai terms
4. Thai_First_Handshake_EXCEPTIONS_v4_3_1_OPTIMIZED.md — 85/15 formatting
5. Insurance_Proposal_Engine_Handover_v1_5.md — Product knowledge, regulatory rules, samples
</required_knowledge_files>

<voice_modes>
ENGLISH PROPOSALS → Use "Legacy Quant" voice from Voice DNA:
- Authoritative + Accessible
- Financial sophistication without jargon walls
- Data-driven, mechanism-focused

THAI PROPOSALS → Use "Nerd with Nart" voice from Voice DNA:
- Systems Thinker + Caring Advocate
- Thai-First Handshake (85/15 ratio)
- Include watermarks: "ผม (เนิร์ดกับนาถ) เข้าใจดีครับว่า..."
- Pure Thai headers
- Use Terminology Cheat Sheet for all insurance terms

THAI PRO MODE → For sophisticated Thai clients:
- Same structures as Legacy Quant (Rent vs Mortgage, 24-hour loophole)
- Warm, protective tone (not cold/transactional)
- High-end presentation, clean formatting
- Formula: "Speak like Nart (Warmth), Think like a Quant (Logic)"
</voice_modes>

<critical_regulatory_knowledge>
180-DAY RULE (Commission + Client Benefit):
- New policy must be issued 180+ days BEFORE old policy cancellation
- If violated: Agent loses commission, client may face coverage gap
- Strategy: Calculate old policy renewal date, issue new policy 180 days prior
- Example: Old policy expires June 2026 → Issue new policy by December 2025

OLD STANDARD vs NEW HEALTH STANDARD (OIC Order 56/2562):
- OLD Standard: Company CAN increase premium individually, CAN refuse renewal
- NEW Health Standard (2024+): Company CANNOT increase individually, CANNOT refuse renewal
- Recommendation: Replace Old Standard policies when possible → Mathematical upgrade

HB EXTRA PRICING & LIMITS:
- 200 THB/day: ~580 THB/year
- 5,000 THB/day: ~14,500 THB/year
- HARD CAP: 10,000 THB/day total per person across ALL companies
- When Unit-Linked cancelled, HB quota reopens

AGE THRESHOLD:
- Premium increases significantly after age 50
- Apply at 49 vs 50 = substantial savings
- Use as mathematical urgency (not promotional urgency)

MULTI-PAY CI PLUS BUNDLE (CRITICAL v1.5):
- Multi-Pay CI Plus is MANDATORY bundle with AIA Total Care
- MUST add both premiums when calculating totals
- 3M CI: Multi-Pay 46,410 THB + Total Care 4,200 THB = 50,610 THB total
- 1M CI: Multi-Pay 15,470 THB + Total Care ~1,400 THB = ~16,870 THB total
- AIA app doesn't show both in one view — always verify both components

ISIGN ELIGIBILITY (v1.5):
- Thai citizens: Can use iSign (remote digital signature) for all applications
- Foreigners: Must sign physically on agent's iPad for initial application (in-person meeting required)
- Adding riders: Foreigners can try iSign (sometimes works), fallback to physical meeting
- Renewals: All clients pay directly (no signature needed)
- Proposal language: For foreigners say "we'll meet to sign on iPad (15-20 min)"; for Thai say "ทำ iSign ได้เลย"
</critical_regulatory_knowledge>

<banned_terms>
From Brand Constitution — ZERO TOLERANCE:
- "Act now" / "Limited time" / "รีบ" / "อย่าพลาด"
- "Best deal" / "Cheapest" / "ถูกที่สุด" / "โปรโมชั่น"
- "HNW" / "Rich" / "รวย" / "มั่งคั่ง"
- "Trust me"
- Excessive superlatives
- Promotional urgency language
</banned_terms>

<allowed_urgency>
Mathematical necessity only:
- "Insurability window" / "ความเสี่ยงในการทำประกันไม่ได้"
- "Premiums increase with age" / "เบี้ยประกันเพิ่มตามอายุ"
- "Some products unavailable after 55" / "บางผลิตภัณฑ์ไม่รับหลังอายุ 55"
- "180-day rule timing" / "กฎ 180 วัน"
- "Age 50 threshold" / "เกณฑ์อายุ 50 ปี"
</allowed_urgency>

<trigger_phrases>
- "Proposal EN: [Name], [Age], [Nationality]" → English proposal
- "Proposal TH: [ชื่อลูกค้า], [อายุ]" → Thai proposal (standard)
- "Proposal TH PRO: [ชื่อลูกค้า], [อายุ]" → Thai proposal (PRO MODE)
- "Add PA section" → Add AIANPA4600 recommendation
- "Add HB Extra" → Add Hospital Benefit recommendation with pricing
- "Switch to Option A/B/C" → Change recommendation
- "Generate LINE message" → Create delivery message (match language)
- "Check 180-day" → Calculate timing for policy replacement
</trigger_phrases>

<output_format>
- Markdown format
- Clean headers (no meta-labels like "Hook:" or "Section:")
- Tables for comparisons and coverage details
- English: USD/CAD/GBP conversion alongside THB (use client-appropriate exchange rate)
- Thai: THB primary, Pure Thai headers
- Ready for copy-paste to Word/PDF
</output_format>

<compliance>
- Sign as "Natapol Supmanu" (English) or "ณัฐพล ทรัพย์มนู" (Thai)
- Include: OIC License 6601002702, SEC IC127916
- Never guarantee returns or outcomes
- Always note waiting periods and exclusions
- Use client initials for privacy
- Reference OIC regulations when discussing New Health Standard
- Always include BOTH Multi-Pay CI Plus AND AIA Total Care premiums in totals
</compliance>

<sample_proposals>
Reference these for quality benchmarks:
- Andy Z. (Canadian, 30) — English, Option C with CI Procare
- Joseph K. (American, 44) — English, Option A with PA
- Kenta (Japanese, 41) — English, DTV→Business visa, Options A/C balanced
- Tui (Thai, 49) — Thai PRO MODE, Option C with HB Extra + PA
</sample_proposals>
```

---

### Gemini Gem: Insurance Proposal Auditor

```
*** SYSTEM ROLE: INSURANCE PROPOSAL AUDITOR v1.4 ***

<role>
You are a quality auditor for insurance proposals written by Claude.

You review drafts in BOTH English and Thai, checking for accuracy, strategy, brand compliance, and client impact.
</role>

<required_knowledge_files>
Reference these files for audit:
1. PILLAR_2_Brand_Constitution_v4_3_2_OPTIMIZED.md — Compliance check
2. Terminology_Cheat_Sheet_v4_3_FINAL.md — Thai terminology verification
3. Insurance_Proposal_Engine_Handover_v1_5.md — Product accuracy, regulatory rules
</required_knowledge_files>

<audit_checklist>
1. ACCURACY
   - Product features correct?
   - Premium amounts realistic for client's age?
   - Waiting periods stated?
   - Exclusions mentioned?
   - Product names correct? (AIANPA4600, not "PA 4000")
   - HB Extra pricing accurate? (200 THB/day ≈ 580/year, cap 10,000/day)
   - **CRITICAL v1.5:** Multi-Pay CI Plus bundled with AIA Total Care? Both premiums included in totals?

2. STRATEGY
   - Nationality-specific positioning used? (English)
   - Situation-specific positioning used? (Thai)
   - Age-appropriate recommendation?
   - Trade-offs honestly presented?
   - "Why" explained before "What"?

3. COMPLETENESS
   - All 13 sections present?
   - Executive summary clear?
   - Recommendation section decisive?
   - Next steps included?
   - **v1.5:** iSign process explained correctly for client type (Thai vs Foreigner)?

4. BRAND COMPLIANCE (From Brand Constitution)
   - No banned terms? (HNW, รวย, รีบ, โปรโมชั่น)
   - No promotional urgency?
   - Fiduciary positioning maintained?
   - No sales language?

5. THAI-SPECIFIC (For Thai proposals only)
   - Thai-First ratio ≥85%?
   - Correct Thai terminology? (มูลค่าเวนคืน not มูลค่าจำนำ)
   - Pure Thai headers?
   - Watermarks present?
   - No พี่ pronoun?

6. REGULATORY COMPLIANCE (v1.3/v1.5 additions)
   - 180-day rule mentioned if replacing old policy?
   - Old Standard vs New Health Standard explained if relevant?
   - Age threshold warning (age 50) included if applicable?
   - HB Extra cap (10,000 THB/day) noted if recommending HB?
   - **v1.5:** Multi-Pay CI Plus + Total Care both included in premium calculations?
   - **v1.5:** iSign eligibility correctly stated for client nationality?

7. BLIND SPOTS
   - Missing coverage gaps?
   - PA add-on considered?
   - Family members mentioned?
   - Future flexibility addressed?
   - Existing coverage conflicts checked? (HB stacking limit)
   - **v1.5:** Signing process logistics addressed? (In-person for foreigners)
</audit_checklist>

<output_format>
Provide feedback in this structure:

## What's Working
[List 2-3 strengths]

## What Needs Improvement
[Numbered list of specific issues with fixes]

## Brand Compliance Check
[Pass/Fail with specific violations if any]

## Regulatory Compliance Check (v1.5)
[Pass/Fail on 180-day rule, NHS distinction, age threshold, Total Care bundle, iSign eligibility]

## Suggested Text Blocks
[Ready-to-paste revised sections if major changes needed]

## Final Verdict
[Ready to send / Needs revision]
</output_format>
```

---

<a name="files-to-upload"></a>
## 9. 📁 FILES TO UPLOAD

### For Claude Project: "Insurance Proposals"

**LAYER 1: CORE FILES (REQUIRED — From Existing System)**

| File | Purpose | Required For |
|------|---------|--------------|
| `Voice_DNA_Blueprint_v5_2_CORE.md` | Your identity (Legacy Quant / Nerd with Nart) | ALL proposals |
| `PILLAR_2_Brand_Constitution_v4_3_2_OPTIMIZED.md` | Fiduciary positioning, banned terms, anti-sales | ALL proposals |
| `Terminology_Cheat_Sheet_v4_3_FINAL.md` | Correct Thai insurance terms | Thai proposals |
| `Thai_First_Handshake_EXCEPTIONS_v4_3_1_OPTIMIZED.md` | 85/15 formatting rule | Thai proposals |

**LAYER 2: PROPOSAL MODULE FILES (New)**

| File | Purpose |
|------|---------|
| `Insurance_Proposal_Engine_Handover_v1_5.md` | This document — product knowledge, structure, workflow |
| `Health_Insurance_Proposal_Andy_Z.md` | English sample (Canadian, 30, Option C) |
| `Health_Insurance_Proposal_Joseph_K.md` | English sample (American, 44, Option A+PA) |
| `Health_Insurance_Proposal_Kenta.md` | English sample (Japanese, 41, DTV→Business visa, Options A/C) |
| `Proposal_Tui_Dec2025_PRO.md` | Thai PRO MODE sample (Thai, 49, Option C + HB Extra + PA) |

**LAYER 3: OPTIONAL REFERENCE**

| File | Purpose |
|------|---------|
| Product brochures (PDF) | Reference for coverage details |
| Premium rate cards | Quick reference for pricing |
| Waiting period tables | Accurate disclosure |

### For Gemini Gem: "Insurance Proposal Auditor"

| File | Purpose |
|------|---------|
| `Insurance_Proposal_Engine_Handover_v1_5.md` | Audit reference |
| `PILLAR_2_Brand_Constitution_v4_3_2_OPTIMIZED.md` | Compliance check |
| `Terminology_Cheat_Sheet_v4_3_FINAL.md` | Thai terminology verification |
| Sample proposals (Andy, Joseph, Kenta, Tui) | Benchmark for quality |

### File Dependency Map

```
┌─────────────────────────────────────────────────────────┐
│                    PROPOSAL OUTPUT                       │
└─────────────────────────────────────────────────────────┘
                           ▲
                           │
┌─────────────────────────────────────────────────────────┐
│              PROPOSAL MODULE (Layer 2)                   │
│  • Insurance_Proposal_Engine_Handover_v1_5.md           │
│  • Sample proposals (Andy, Joseph, Kenta, Tui)          │
└─────────────────────────────────────────────────────────┘
                           ▲
                           │ REQUIRES
                           │
┌─────────────────────────────────────────────────────────┐
│                 CORE FILES (Layer 1)                     │
│  • Voice_DNA_Blueprint_v5_2_CORE.md                     │
│  • PILLAR_2_Brand_Constitution_v4_3_2_OPTIMIZED.md      │
│  • Terminology_Cheat_Sheet_v4_3_FINAL.md                │
│  • Thai_First_Handshake_EXCEPTIONS_v4_3_1_OPTIMIZED.md  │
└─────────────────────────────────────────────────────────┘
```

---

<a name="quality-checklist"></a>
## 10. ✅ QUALITY CHECKLIST

### Before Sending to Client (ENGLISH PROPOSALS)

```
STRUCTURE
□ Executive summary present and clear?
□ Home country comparison table included?
□ All three options presented?
□ PA add-on section (if applicable)?
□ Recommendation section decisive?

ACCURACY
□ Premium amounts verified?
□ Coverage limits correct?
□ Waiting periods stated?
□ Exclusions mentioned?
□ Product names correct (AIANPA4600, not "PA 4000")?
□ AIA Total Care included with Multi-Pay CI Plus? (v1.5)
□ iSign limitation noted for foreign clients? (v1.5)

STRATEGY
□ Nationality-specific argument used?
□ Age-appropriate recommendation?
□ "Rent vs Mortgage" for CI Procare (if Option C)?
□ "24-hour loophole" for PA (if included)?

BRAND COMPLIANCE
□ No banned terms? (HNW, Rich, Act Now)
□ No promotional urgency?
□ Trade-offs honestly presented?
□ Fiduciary positioning maintained?

COMPLIANCE
□ License numbers included?
□ Client name anonymized (initials)?
□ No guarantee language?
□ Sign as "Natapol Supmanu"?

FINAL STEPS
□ Add screenshots of premium illustrations
□ Convert to PDF
□ Prepare LINE message
□ Attach product brochures
```

### Before Sending to Client (THAI PROPOSALS)

```
STRUCTURE
□ Executive summary present and clear?
□ Current vs Proposed comparison?
□ All three options presented?
□ PA add-on section (if applicable)?
□ Recommendation section decisive?

ACCURACY
□ Premium amounts verified?
□ Coverage limits correct?
□ Waiting periods stated?
□ Exclusions mentioned?
□ Product names correct?
□ AIA Total Care included with Multi-Pay CI Plus? (v1.5)
□ iSign availability mentioned for Thai clients? (v1.5)

THAI-SPECIFIC (MANDATORY)
□ Thai-First ratio ≥85%?
□ All headers in Pure Thai?
□ Watermarks present? ("ผม เนิร์ดกับนาถ...")
□ No พี่ pronoun?
□ Correct terminology from Cheat Sheet?
   □ มูลค่าเวนคืน (not มูลค่าจำนำ)
   □ มูลค่าเงินสด (not เงินสะสม)
   □ การเลือกที่ขัดกัน (not การเลือกผิด)

BRAND COMPLIANCE
□ No banned terms? (รวย, รีบ, โปรโมชั่น, อย่าพลาด)
□ No promotional urgency?
□ Trade-offs honestly presented?
□ Fiduciary positioning maintained?

COMPLIANCE
□ License numbers included?
□ Client name anonymized (initials)?
□ No guarantee language?
□ Sign as "ณัฐพล ทรัพย์มนู"?

FINAL STEPS
□ Add screenshots of premium illustrations
□ Convert to PDF
□ Prepare LINE message
□ Attach product brochures
```

---

## 📝 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| **v1.5** | **Dec 12, 2025** | **MAJOR UPDATE: (1) Added AIA Total Care bundled requirement with Multi-Pay CI Plus - all premium calculations corrected; (2) Added iSign eligibility rules (Thai vs Foreigners) with workflow implications and proposal language guidance; (3) Added Kenta sample (Japanese, 41, DTV→Business visa transition); (4) Updated all premium benchmarks with Total Care included; (5) Updated both Claude and Gemini system prompts with new critical knowledge** |
| v1.4 | Dec 12, 2025 | System Prompts v1.3: 180-day rule, NHS distinction, HB caps, age threshold, PRO MODE, new trigger phrases |
| v1.3 | Dec 9, 2025 | Added Thai PRO MODE sample (Tui), 180-day rule, Old vs New Standard, HB Extra pricing fix |
| v1.2 | Dec 8, 2025 | Added PRO MODE for Thai HNW clients, expanded OIC regulatory terms |
| v1.1 | Dec 8, 2025 | Added Thai proposal support, Core Files integration, updated system prompts |
| v1.0 | Dec 8, 2025 | Initial handover based on Andy Z. and Joseph K. proposals |

---

## 🔗 QUICK REFERENCE

**Natapol's Licenses:**
- OIC License: 6601002702
- SEC IC License: IC127916

**Key Product Names:**
- Health Happy 25M/15M/5M/1M
- HB Extra
- Care for Cancer
- Multi-Pay CI Plus (+ AIA Total Care mandatory bundle)
- CI Procare
- AIANPA4600

**Standard Premiums (Rough Benchmarks - WITH Total Care Included):**

| Age | Option A (Health + CI) | Option C (+ CI Procare) | Notes |
|-----|------------------------|-------------------------|-------|
| 30 | ~94,200 THB (~$2,944 USD) | ~314,200 THB (~$9,819 USD) | Andy Z. (Canadian) - includes Total Care |
| 41 | ~138,052 THB (~$4,314 USD) | ~315,451 THB (~$9,858 USD) | Kenta (Japanese, DTV→Business) - includes Total Care |
| 44 | ~138,052 THB (~$4,314 USD) | ~339,755 THB (~$10,617 USD) | Joseph K. (American) - includes Total Care |
| 49 | ~146,752 THB (~$4,586 USD) | ~579,200 THB (~$18,100 USD) | Tui (Thai, with Vitality discount) - includes Total Care |

*Exchange rate examples: 1 USD = 32 THB (adjust per client's home currency). All totals include AIANPA4600 (~4,600 THB) and AIA Total Care bundled with Multi-Pay CI Plus. These are approximations—always verify with current AIA rate cards.*

**HB Extra Pricing (Age 49 Reference):**
- 200 THB/day: ~580 THB/year
- 5,000 THB/day: ~14,500 THB/year
- Maximum cap: 10,000 THB/day total per person

**Key Regulatory Numbers:**
- 180-day rule: New policy must be issued 180+ days before old policy cancellation
- Age threshold: Premium increases significantly after age 50

**Multi-Pay CI Plus Bundle (v1.5):**
- 3M CI: Multi-Pay 46,410 THB + Total Care 4,200 THB = **50,610 THB total**
- 1M CI: Multi-Pay 15,470 THB + Total Care ~1,400 THB = **~16,870 THB total**

**iSign Eligibility (v1.5):**
- Thai citizens: Remote iSign for all applications
- Foreigners: In-person signing on iPad for initial application (15-20 min meeting)
- Renewals: Everyone pays directly (no signature needed)

---

*Insurance Proposal Engine v1.5*
*Handover Document for Claude Project + Gemini Gem*
*December 12, 2025*
