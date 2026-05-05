# Developer Workflow: AI Context Prompts

## Pre-Development Checklist

Before starting any development work:

1. **Review Relevant Prompts**
   ```bash
   # Read the main project prompt
   cat prompt.md
   
   # Read specialized prompts for your task
   cat promptFormhelper.md  # For form components
   cat promptTesting.md     # For testing
   ```

2. **Verify Prompt Currency**
   ```bash
   # Check when prompts were last updated
   git log --oneline prompt*.md
   ```

## Copilot Interaction Protocol

### Step 1: Context Declaration
Always start Copilot conversations with:
```
Context: prompt.md, promptFormhelper.md
Scope: [Brief description of what you're working on]
Question: [Your specific question]
```

### Step 2: Follow Prompt Guidelines
- Use `noun + modifier` naming (e.g., `taskCreate`, not `createTask`)
- Leverage global utilities (`isEmpty`, `isTruthy`, `isFalsy`)
- Follow `task*` component patterns
- Use global testing functions (`vi`, `screen`, `render`, etc.)

### Step 3: Validate Against Prompts
Before committing, verify your code follows prompt patterns:
```bash
# Run validation
node validate-prompt-context.js
```

## Git Integration

### Commit Message Format
Include prompt context in commit messages:
```
feat: add new form input component

Context: prompt.md, promptFormhelper.md
- Follows noun+modifier naming convention
- Uses global utilities as specified
- Implements proper form validation patterns
```

### Pre-commit Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
node validate-prompt-context.js
if [ $? -ne 0 ]; then
  echo "❌ Prompt context validation failed"
  exit 1
fi
```

## Team Enforcement

### Code Review Requirements
- [ ] Verify prompt files were referenced
- [ ] Check code follows prompt patterns
- [ ] Confirm naming conventions match requirements
- [ ] Validate testing patterns align with guidelines

### Automated Checks
- GitHub Actions workflow for prompt validation
- Pre-commit hooks for local validation
- PR templates requiring prompt context

## Troubleshooting

### Common Issues

**Issue**: Copilot suggests code that doesn't follow project patterns
**Solution**: Explicitly reference the relevant prompt file in your request

**Issue**: Validation fails on naming conventions
**Solution**: Review `prompt.md` naming section and refactor accordingly

**Issue**: Missing global utilities
**Solution**: Check `prompt.md` for available global functions

### Getting Help

1. **Check Prompt Files First**: Most questions are answered in the prompt files
2. **Ask Team Lead**: For prompt interpretation or updates
3. **Update Prompts**: If patterns change, update relevant prompt files

## Best Practices

### For New Team Members
1. Read all prompt files before starting development
2. Practice with simple components following prompt patterns
3. Ask questions about prompt interpretation early

### For Experienced Developers
1. Keep prompts updated as patterns evolve
2. Share new patterns by updating prompt files
3. Mentor others on prompt usage

### For Team Leads
1. Regularly review and update prompt files
2. Ensure prompt compliance in code reviews
3. Provide training on prompt usage

