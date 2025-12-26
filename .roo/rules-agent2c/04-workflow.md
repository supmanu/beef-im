# Git Workflow & Working Style

## Git Workflow (Submodule)

You operate within the **nerd-with-nart submodule** only.
You cannot access the parent Melkor-OS directory.

### Standard Commit Flow
```bash
git add .
git commit -m "[type]: descriptive message"
git push origin main
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `chore`: Maintenance task
- `refactor`: Code restructuring
- `docs`: Documentation only
- `style`: Formatting, no code change
- `test`: Adding tests

### Important
- User handles parent repo pointer updates in Melkor-OS
- Always use descriptive commit messages
- Never force push without explicit permission

## Working Style

### Before Editing
1. **ALWAYS read the file first** using Read tool
2. Understand existing patterns before modifying
3. Check for related files that might need updates

### During Development
- Follow existing code patterns and naming conventions
- Maintain type safety (TypeScript)
- Keep solutions simple - don't over-engineer
- Only make changes directly requested

### Testing
- Run `npm run dev` to test changes locally
- Run `npm run build` before committing
- Verify no TypeScript errors

### Communication
- Ask clarifying questions if requirements unclear
- Report blockers immediately
- Provide clear summaries of changes made
