# Memory Bridge Workflow

## Agent 2B → You → Agent 2A

This workflow helps you efficiently bridge work between the two agents.

---

## 📝 End-of-Session Review Commands

### Command 1: Session Summary Request
**When to use:** After completing any significant work
**What to say:**
```
Review this session and tell me:
1. What should be saved to Agent 2B memory (file-based)?
2. What should be saved to Agent 2A memory (strategic)?
3. Draft the exact commands for both.
```

### Command 2: Pattern Extraction
**When to use:** After solving a problem or implementing a feature
**What to say:**
```
Extract the key pattern from this session:
- What problem did we solve?
- What pattern should be saved?
- Should this go in .claude/rules/ or Agent 2A?
```

### Command 3: Decision Bridge
**When to use:** After making architectural decisions
**What to say:**
```
We just made some decisions. Which ones are:
- Tactical (Agent 2B file memory)
- Strategic (Agent 2A cloud memory)
Draft the save commands for both.
```

---

## 🎯 What Goes Where?

### Agent 2B Memory (File-Based)
**Save here:** Implementation details, patterns, HOW-TO

**Examples:**
- "Payload uses hard-wire pattern for importMap"
- "Dev command: npm run dev --webpack"
- "API routes must include try-catch error handling"
- "Use Stripe Checkout, not Elements API"

**How to save:**
```bash
# I'll create/update the appropriate .claude/rules/ file
# Then you commit to git
```

---

### Agent 2A Memory (MCP Cloud)
**Save here:** Strategic decisions, WHY decisions, brand rules

**Examples:**
- "Never deviate from Teal protocol (#2bb1bb)"
- "Always prioritize data sovereignty over convenience"
- "Nerd with Nart must maintain self-hosted CMS (Payload 3.0)"
- "Node 20 LTS is the standard (24+ breaks critical tools)"

**How to save:**
```
[Switch to Antigravity Chat - Agent 2A]
Paste the command I provide
```

---

## 🤖 Agent 2B Evaluation Prompts

### Prompt 1: "Should I Save This?"
```
Evaluate this session:
- Did we establish any new patterns?
- Did we make any strategic decisions?
- Should anything be saved to memory?
- If yes, draft the save commands.
```

### Prompt 2: "What's Worth Remembering?"
```
What from this session should persist?
- New patterns → .claude/rules/
- Strategic decisions → Agent 2A
- Nothing significant → Skip save

Draft the exact text to save.
```

### Prompt 3: "Memory Bridge Ready?"
```
Prepare the memory bridge:
1. List what happened this session
2. Identify tactical vs strategic knowledge
3. Draft Agent 2B save (file update)
4. Draft Agent 2A save command (paste-ready)
```

---

## 📋 Response Template (For Agent 2B)

When you ask for session review, I'll respond in this format:

```markdown
## Session Summary

**Work Completed:**
- [List of what we did]

**Patterns Identified:**
- [Any new patterns worth saving]

**Strategic Decisions:**
- [Any architectural or brand decisions]

---

## Recommended Saves

### Agent 2B (File Memory) - LOCAL
**Action:** Update .claude/rules/[topic].md
**Content:**
[Draft markdown to add]

**Why save here:** [Reason - implementation detail, team pattern, etc.]

---

### Agent 2A (Cloud Memory) - STRATEGIC
**Action:** Switch to Antigravity Chat and paste this:

**Command for Agent 2A:**
```
Remember: [Strategic decision in plain language]

Context: [Why this matters]
Project: Nerd with Nart
Date: [Today's date]
```

**Why save here:** [Reason - long-term decision, cross-project rule, etc.]

---

## Skip Save?
**Reason:** [Why nothing needs saving - routine work, no new patterns, etc.]
```

---

## 🚀 Quality of Life Shortcuts

### Shortcut 1: "Save?"
Single word prompt at end of session:
```
Save?
```
I'll evaluate and respond with recommendations.

### Shortcut 2: "Bridge"
For strategic decisions:
```
Bridge
```
I'll draft the Agent 2A command immediately.

### Shortcut 3: "Document"
For new patterns:
```
Document
```
I'll create/update the appropriate .claude/rules/ file.

---

## 🎓 Example Workflow

### Scenario: You just implemented Stripe payments

**You:** "Save?"

**Agent 2B:**
```
## Session Summary
Work Completed:
- Implemented Stripe Checkout integration
- Created payment webhook handlers
- Added error handling for failed payments

Patterns Identified:
- Stripe Checkout over Elements (faster integration)
- Webhook signature verification required
- Error handling pattern for payment failures

Strategic Decisions:
- Chose Stripe over PayPal (better API, more reliable)

---

## Recommended Saves

### Agent 2B (File Memory) - LOCAL
Action: Create .claude/rules/payments.md

Content:
# Payment Integration Pattern

## Provider: Stripe

**Decision:** Use Stripe Checkout, not Elements API
**Reason:** Faster integration, Stripe handles PCI compliance

**Implementation:**
- Checkout session: /api/checkout/route.ts
- Webhooks: /api/webhooks/stripe/route.ts
- Verify signatures using STRIPE_WEBHOOK_SECRET

**Error Handling:**
All payment routes use try-catch with specific error messages:
- Payment failed → Show user-friendly message
- Webhook signature invalid → Return 400
- Unknown error → Log and return 500

---

### Agent 2A (Cloud Memory) - STRATEGIC

Command for Agent 2A:
```
Remember: Nerd with Nart uses Stripe as the payment provider.

Decision rationale:
- Stripe chosen over PayPal for superior API quality and reliability
- Stripe Checkout chosen over Elements for faster implementation
- This is a project-wide standard for all payment processing

Project: Nerd with Nart
Date: December 16, 2025
```

Why save here: Cross-cutting decision that affects all future payment features.
```

**You:** [Copy command, switch to Antigravity, paste]

**Done!** Both agents now know about the payment decision.

---

## 🔄 Maintenance

### Weekly Review
```
Review all files in .claude/rules/:
- Any outdated patterns?
- Any redundant files?
- Any patterns that became strategic decisions?
```

### Pattern Promotion
When a tactical pattern becomes a strategic rule:
```
You: "Promote payment pattern to strategic"

Agent 2B:
1. Extracts core decision from .claude/rules/payments.md
2. Drafts Agent 2A save command
3. You can optionally remove tactical details from Agent 2B
```

---

## 💡 Pro Tips

1. **End every significant session with "Save?"**
   - Gets you in the habit
   - Ensures nothing important is lost
   - Takes 30 seconds

2. **Strategic decisions get immediate bridge**
   - Don't wait - save to Agent 2A right away
   - While context is fresh
   - Prevents forgetting the "why"

3. **Tactical patterns can batch**
   - Don't need immediate save
   - Can accumulate and document weekly
   - Less urgent than strategic decisions

4. **Use git commits as natural checkpoints**
   - Before committing code, run "Save?"
   - Ensures patterns documented with code
   - Reviewers see both code AND rationale

---

## 🎯 Success Metrics

You'll know this workflow is working when:
- ✅ You never forget why you made a decision
- ✅ Agent 2A recalls strategic decisions from weeks ago
- ✅ New team members understand patterns from .claude/rules/
- ✅ You spend <1 minute bridging per session
- ✅ Both agents stay in sync automatically
