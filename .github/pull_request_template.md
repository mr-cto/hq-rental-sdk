## Description
Brief description of the changes introduced by this PR.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Test coverage improvement

## Related Issues
Closes #(issue number)
Related to #(issue number)

## Changes Made
- [ ] Added new API module: `src/apis/[category]/[module].ts`
- [ ] Enhanced existing functionality in: `[file path]`
- [ ] Updated documentation in: `[file path]`
- [ ] Added comprehensive tests in: `tests/[path]`
- [ ] Fixed bug in: `[file path]`
- [ ] Other: _______________

## API Changes
If this PR introduces new API functions or changes existing ones, please describe:

### New Functions
```typescript
// List any new exported functions with their signatures
export const newFunction = (params: ParamsType): Promise<ResponseType> => {}
```

### Modified Functions
```typescript
// List any modified function signatures
// Before:
export const oldFunction = (param: string): Promise<OldResponse> => {}
// After:
export const oldFunction = (param: string, newParam?: number): Promise<NewResponse> => {}
```

## Testing
- [ ] All existing tests pass (`npm test`)
- [ ] 100% test coverage maintained (`npm run test:coverage`)
- [ ] Added comprehensive unit tests for new functionality
- [ ] Added error handling test cases
- [ ] Added edge case test scenarios
- [ ] Manual testing completed

### Test Coverage Report
```
Functions: 100% (339/339) ✅
Statements: 100% (1140/1140) ✅
Branches: 100% (67/67) ✅
Lines: 100% (824/824) ✅
```

## Quality Checklist
- [ ] TypeScript compiles without errors or warnings
- [ ] Follows existing code patterns and conventions
- [ ] Includes JSDoc comments for public APIs
- [ ] Error handling is comprehensive
- [ ] Backward compatibility maintained (or breaking changes documented)
- [ ] Commit messages follow conventional commit format

## Screenshots/Examples
If applicable, add screenshots or code examples that demonstrate the changes.

```typescript
// Example usage of new functionality
import { newModule } from 'hq-rental-sdk';

const result = await newModule.newFunction({ id: '123' });
console.log(result);
```

## Documentation Updates
- [ ] Updated README.md with new functionality
- [ ] Added/updated JSDoc comments
- [ ] Updated examples in `/examples` directory
- [ ] Updated TypeScript type definitions
- [ ] Updated llms.txt if architectural changes were made

## Breaking Changes
If this PR introduces breaking changes, please describe:
- What functionality is affected
- How users should migrate their code
- Timeline for deprecation (if applicable)

## Performance Impact
- [ ] No performance impact
- [ ] Performance improvement (describe)
- [ ] Potential performance impact (describe and justify)

## Security Considerations
- [ ] No security implications
- [ ] Security improvement
- [ ] Potential security implications (describe)

## Additional Notes
Any additional information that reviewers should know about this PR.

---

## Reviewer Checklist (for maintainers)
- [ ] Code quality and consistency
- [ ] Test coverage and quality
- [ ] Documentation completeness
- [ ] Backward compatibility
- [ ] Performance implications
- [ ] Security considerations
- [ ] API design follows existing patterns