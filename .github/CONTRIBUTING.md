# Contributing Guidelines

Thank you for your interest in contributing to the HQ Rental SDK! This document provides detailed guidelines for contributors.

## 🎯 Project Vision

The HQ Rental SDK aims to provide a comprehensive, reliable, and well-tested TypeScript SDK for the HQ Rental Software API. We maintain **100% test coverage** and strict quality standards to ensure reliability for all users.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Git
- TypeScript knowledge
- Jest testing experience (helpful)

### Initial Setup
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/hq-rental-sdk.git
cd hq-rental-sdk

# Install dependencies
npm install

# Run tests to ensure everything works
npm test
npm run test:coverage
```

## 📋 Development Workflow

### 1. Planning Your Contribution

Before starting work:
- Check existing issues and PRs
- Create an issue to discuss major changes
- Comment on issues you'd like to work on

### 2. Creating Your Branch

```bash
# Create a descriptive branch name
git checkout -b feat/add-vehicle-tracking-api
git checkout -b fix/authentication-token-refresh  
git checkout -b docs/improve-fleet-examples
```

### 3. Development Standards

#### Code Quality Requirements
- **100% Test Coverage**: All new code must include comprehensive tests
- **TypeScript Strict Mode**: No `any` types, proper interface definitions
- **Consistent Patterns**: Follow existing architectural patterns
- **Error Handling**: Comprehensive error scenarios
- **Documentation**: JSDoc comments for public APIs

#### Testing Requirements
Every contribution must include:
- Unit tests for all new functions
- Error handling test cases
- Edge case scenarios
- Parameter validation tests
- Integration with existing test patterns

#### Example Test Structure
```typescript
describe('New API Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('newFunction', () => {
    it('should call client with correct URL and parameters', () => {
      // Test implementation
    });

    it('should handle errors properly', () => {
      // Error test
    });

    it('should handle edge cases', () => {
      // Edge case test
    });
  });

  describe('error handling', () => {
    it('should propagate client errors', () => {
      // Error propagation test
    });
  });
});
```

### 4. Code Patterns

#### API Module Pattern
```typescript
// src/apis/category/new-module.ts
import client from '../../client';

export const newFunction = async (params: ParamsType): Promise<ResponseType> => {
  return client.get(`/api/endpoint/${params.id}`, params);
};

export const anotherFunction = async (id: string, data: DataType): Promise<ResponseType> => {
  return client.post(`/api/endpoint/${id}`, data);
};

// Always include default export
export default {
  newFunction,
  anotherFunction,
};
```

#### Type Definition Pattern
```typescript
// Include TypeScript interfaces
export interface NewModuleParams {
  id: string;
  name?: string;
  options?: ModuleOptions;
}

export interface NewModuleResponse {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
```

### 5. Testing Your Changes

```bash
# Run all tests
npm test

# Run with coverage (must maintain 100%)
npm run test:coverage

# Run specific test file
npm test tests/apis/your-module.test.ts

# Run tests in watch mode during development
npm run test:watch
```

### 6. Commit Guidelines

We use conventional commits:

```bash
# Feature additions
git commit -m "feat: add vehicle damage tracking API with full CRUD operations"

# Bug fixes  
git commit -m "fix: resolve authentication token refresh edge case"

# Documentation
git commit -m "docs: add comprehensive examples for fleet management APIs"

# Tests
git commit -m "test: add edge cases for payment processing validation"

# Refactoring
git commit -m "refactor: improve error handling consistency across modules"
```

## 🔍 Code Review Process

### Before Submitting PR
- [ ] All tests pass locally
- [ ] 100% test coverage maintained
- [ ] TypeScript compiles without errors
- [ ] Follow existing code patterns
- [ ] Update documentation if needed
- [ ] Commit messages follow convention

### PR Requirements
- **Clear Title**: Describe what the PR does
- **Detailed Description**: Explain the changes and reasoning
- **Issue References**: Link to related issues
- **Screenshots/Examples**: If UI or API changes
- **Breaking Changes**: Clearly marked if applicable

### Review Criteria
Reviewers will check:
- Code quality and consistency
- Test coverage and quality
- Documentation completeness
- Backward compatibility
- Performance implications
- Security considerations

## 🏗️ Architecture Guidelines

### File Organization
```
src/
├── apis/
│   ├── car-rental/     # Car rental specific APIs
│   ├── fleets/         # Fleet management APIs
│   ├── contacts/       # Contact management
│   └── [category]/     # New category modules
├── auth/               # Authentication utilities
├── models/             # Data models and validation
├── types/              # TypeScript definitions
└── utils/              # Shared utilities

tests/
├── apis/               # Mirror src/apis structure
├── auth/               # Authentication tests
├── models/             # Model tests
└── utils/              # Utility tests
```

### Adding New API Categories
1. Create new directory under `src/apis/`
2. Create `index.ts` file for exports
3. Follow existing module patterns
4. Add comprehensive tests
5. Update main `src/index.ts` exports

## 🐛 Bug Reports

When reporting bugs, include:
- **Environment**: Node.js version, OS, package version
- **Reproduction Steps**: Clear steps to reproduce
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens  
- **Code Examples**: Minimal reproducible example
- **Error Messages**: Full error messages and stack traces

## 💡 Feature Requests

For new features:
- **Use Case**: Describe the problem you're solving
- **Proposed Solution**: How you envision it working
- **API Design**: Proposed API signatures
- **Backward Compatibility**: Impact on existing code
- **Testing Strategy**: How it should be tested

## 📚 Resources

- **API Documentation**: [HQ Rental Software API Docs](https://api-docs.hqrentalsoftware.com/)
- **Architecture Guide**: See `llms.txt` for detailed patterns
- **TypeScript Handbook**: [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **Jest Testing**: [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🤝 Community

- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions
- **Code Review**: All changes go through peer review
- **Recognition**: Contributors are recognized in releases

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the HQ Rental SDK! Together we're building a reliable, comprehensive SDK that developers can depend on. 🚀