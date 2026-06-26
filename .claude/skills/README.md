# Claude Code Skills

Agent skills installed under `.claude/skills/`. Each subdirectory contains a
`SKILL.md` (with name/description frontmatter) plus any supporting files, and is
auto-discovered by Claude Code.

## Installed skills

| Skill | Source repo | License |
|-------|-------------|---------|
| `design-taste-frontend` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT |
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 |
| `emil-design-eng` | [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT |
| `review-animations` | [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT |

### design-taste-frontend
Anti-slop frontend skill for landing pages, portfolios, and redesigns. This is
the headline skill from the `taste-skill` library; that repo also ships several
stylistic variants (brutalist, minimalist, soft, redesign, image-to-code, etc.)
that can be added on request.

### impeccable
Design guidance for AI coding agents — one skill with many sub-commands
(craft, audit, critique, animate, polish, etc.), deterministic detector rules,
and live browser iteration. Self-contained: its `scripts/` and `reference/`
files resolve relative to `.claude/skills/impeccable/`, so this directory must
keep that exact path.

### emil-design-eng
Emil Kowalski's philosophy on UI polish, component design, animation decisions,
and the invisible details that make software feel great.

### review-animations
Reviews animation/motion code against a high craft bar derived from the same
philosophy. User-invocable (model auto-invocation disabled).

Each skill retains the license of its upstream repository; see the table above.
