# Critical Analysis and Improvement Prompt

## Core Principles

When reviewing or implementing code, always:

1. **Think Critically**: Question assumptions, identify potential issues, and consider edge cases
2. **Suggest Alternatives**: Propose better approaches, even if the current solution works
3. **Consider Side Effects**: Always notify about changes that could impact other parts of the system
4. **Follow Project Patterns**: Use existing conventions and established patterns

## Project-Specific Guidelines
- powershell is the terminal being used by the cursor IDE. 

### Naming Conventions
- **Preferred**: `noun + modifier` format (e.g., `taskCreate`, `taskUpdate`, `userLogin`)
- **Avoid**: `verb + noun` format (e.g., `createTask`, `updateUser`)

### Global Extensions
- `isEmpty`, `isTruthy`, `isFalsy` are available as global functions
- Use these instead of creating new utility functions
- **Console Logging**: Use `console.log(["all"], "message")` format for test/debug logging
- Console extension filters logs based on log groups, with `["all"]` ensuring visibility

### Testing Setup
- Vitest is configured with global functions of most common testing items: `screen`, `render`, `userEvent`, `waitFor`, `within`, `fireEvent`, `act`
- **Global Testing Utilities Available**:
  - `vi` - Vitest mocking and spying utilities (no import needed)
  - `screen` - Testing library screen queries
  - `render` - Component rendering
  - `userEvent` - User interaction simulation
  - `waitFor` - Async assertions
  - `within` - Scoped queries
  - `fireEvent` - DOM event firing
  - `act` - React state updates
- Use these directly without importing
- if you feel the need to add an import for testing, verify it with me.
- use test:commit instead of test; it runs once and stops.
- **MSW Testing Patterns**:
  - MSW is configured for both browser and Node.js environments
  - Use MSW spies (e.g., `mswTaskSpy`) to verify handler execution
  - Test MSW integration by verifying actual request interception, not just function calls
  - MSW intercepts requests before they reach fetch, so mocking fetch won't work for MSW verification

### Component, store and test Patterns
- Follow the `task*` slices and components as the guiding pattern
- Maintain consistency with existing component structure
- when <Input> is involved, look at /components/formhelper test patterns to look at or apply values.
  -promptFormhelper.md has additional <Input > information to apply

### MSW and Mock Data Patterns
- **MSW Configuration**: 
  - Browser MSW setup in `src/test/msw/mswBrowser.js`
  - Node.js MSW setup in `src/test/_setupTest.js`
  - Conditional loading based on `config.msw` setting
- **Mock Data Loading**:
  - Use `mockLoad()` function for both browser and Node.js environments
  - Data files are IIFE (Immediately Invoked Function Expression) format in `server-koa/data/*.js`
  - Browser environment fetches from `/mock/*.js` endpoints
  - Node.js environment reads directly from `server-koa/data/*.js` files
- **MSW Testing Best Practices**:
  - Create MSW spies (e.g., `mswTaskSpy`) to track handler execution
  - Verify actual MSW interception, not just function calls
  - Use `mockLoad()` for consistent data loading across environments
  - Avoid mocking `fetch` when testing MSW integration

## Critical Analysis Framework

### Before Implementing:
1. **Scope Assessment**: Is this within the requested scope?
2. **Pattern Consistency**: Does this follow established project patterns?
3. **Side Effect Analysis**: What could this change impact?
4. **Alternative Evaluation**: Are there better approaches?

### During Implementation:
1. **Code Quality**: Is this the most maintainable solution?
2. **Performance**: Are there performance implications?
3. **Security**: Are there security considerations?
4. **Accessibility**: Is this accessible to all users?

### After Implementation:
1. **Testing**: Are all scenarios covered?
2. **Documentation**: Is the code self-documenting?
3. **Review**: Would another developer understand this easily?

## Response Guidelines

### Always Include:
- **Critical Analysis**: What works well and what could be improved
- **Alternative Suggestions**: Better approaches or optimizations
- **Side Effect Warnings**: Clear notification of potential impacts
- **Scope Boundaries**: What's included and what's not

### When Suggesting Changes:
- Explain the rationale behind suggestions
- Highlight benefits and trade-offs
- Provide specific examples when possible
- Consider the learning curve for the team

### When Implementing:
- Follow the `task*` pattern for consistency
- Use global extensions when available
- Maintain the established project structure
- Add appropriate tests using global testing functions

## Quality Checklist

- [ ] Follows `noun + modifier` naming convention
- [ ] Uses global extensions (`isEmpty`, `isTruthy`, `isFalsy`)
- [ ] Leverages global testing functions (`vi`, `screen`, `render`, `userEvent`, `waitFor`, `within`, `fireEvent`, `act`)
- [ ] Consistent with `task*` component patterns
- [ ] **MSW Testing**: Uses MSW spies for handler verification, avoids fetch mocking for MSW tests
- [ ] **Mock Data**: Uses `mockLoad()` for consistent data loading across environments
- [ ] No unnecessary side effects
- [ ] Clear documentation and comments
- [ ] Appropriate error handling
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met

## Communication Style

- **Direct and Honest**: Point out issues clearly but constructively
- **Educational**: Explain why certain approaches are better
- **Collaborative**: Invite discussion and alternative viewpoints
- **Thorough**: Consider multiple angles and scenarios
- **Practical**: Focus on actionable improvements

Remember: The goal is to build better software through thoughtful analysis and continuous improvement, while maintaining the established patterns and conventions of this project.
