# Contributing to MultiVault

Thank you for your interest in contributing to MultiVault! This document provides guidelines for contributing to our blockchain asset tokenization platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Basic knowledge of React, TypeScript, and Solana

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/multivault.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Start development server: `npm run dev`

## 📝 Code Style

### TypeScript
- Use strict TypeScript configuration
- Define proper types for all functions and variables
- Use interfaces for object shapes
- Avoid `any` type unless absolutely necessary

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper error boundaries

### Solana
- Follow Solana program development best practices
- Use proper error handling for blockchain operations
- Implement proper wallet connection handling
- Use appropriate commitment levels

## 🧪 Testing

### Unit Tests
- Write tests for utility functions
- Test React components with React Testing Library
- Test Solana hooks and context providers

### Integration Tests
- Test wallet connection flows
- Test smart contract interactions
- Test API endpoints

### Running Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

## 📦 Pull Request Process

### Before Submitting
1. Ensure all tests pass
2. Run linting: `npm run lint`
3. Build the project: `npm run build`
4. Update documentation if needed

### PR Guidelines
- Use descriptive commit messages
- Include screenshots for UI changes
- Reference related issues
- Keep PRs focused and small
- Request reviews from maintainers

### Commit Message Format
```
type(scope): description

feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
```

## 🐛 Bug Reports

### Reporting Bugs
1. Check existing issues first
2. Use the bug report template
3. Include steps to reproduce
4. Provide environment details
5. Add screenshots if applicable

### Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node.js: [e.g. 18.0.0]
- Solana Version: [e.g. 1.14.0]

## Additional Context
Any other relevant information
```

## ✨ Feature Requests

### Suggesting Features
1. Check existing feature requests
2. Use the feature request template
3. Provide use cases and benefits
4. Consider implementation complexity

### Feature Request Template
```markdown
## Feature Description
Brief description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other approaches you've considered

## Additional Context
Any other relevant information
```

## 🏗️ Architecture Guidelines

### Component Structure
```
components/
├── ui/                 # Reusable UI components
├── forms/              # Form components
├── layout/             # Layout components
├── features/           # Feature-specific components
└── providers/          # Context providers
```

### File Naming
- Use PascalCase for components: `UserProfile.tsx`
- Use camelCase for utilities: `formatCurrency.ts`
- Use kebab-case for pages: `user-profile/page.tsx`

### Import Organization
```typescript
// 1. React imports
import React from 'react'
import { useState, useEffect } from 'react'

// 2. Third-party imports
import { NextPage } from 'next'
import { useWallet } from '@solana/wallet-adapter-react'

// 3. Internal imports
import { Button } from '@/components/ui/button'
import { useAssets } from '@/lib/hooks/use-assets'
```

## 🔒 Security

### Security Guidelines
- Never commit private keys or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Implement proper error handling
- Follow Solana security best practices

### Security Checklist
- [ ] No hardcoded private keys
- [ ] Proper input validation
- [ ] Secure wallet connection
- [ ] Error handling for blockchain operations
- [ ] Rate limiting for API endpoints

## 📚 Documentation

### Code Documentation
- Use JSDoc for functions and classes
- Include parameter descriptions
- Document return types
- Add usage examples

### Example
```typescript
/**
 * Connects a Solana wallet to the application
 * @param walletName - The name of the wallet to connect
 * @returns Promise that resolves when wallet is connected
 * @throws Error if wallet connection fails
 */
async function connectWallet(walletName: string): Promise<void> {
  // Implementation
}
```

## 🎯 Hackathon Guidelines

### For Colosseum Hackathon
- Focus on Solana ecosystem integration
- Implement innovative features
- Ensure production-ready code
- Include comprehensive documentation
- Add demo videos and screenshots

### Submission Requirements
- [ ] Working demo
- [ ] Source code on GitHub
- [ ] README with setup instructions
- [ ] Video demonstration
- [ ] Live deployment (optional)

## 📞 Getting Help

### Resources
- [Solana Documentation](https://docs.solana.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Community
- GitHub Discussions
- Discord Server
- Twitter Community
- Stack Overflow

## 🏆 Recognition

### Contributors
We recognize all contributors in our README and release notes. Your contributions help make MultiVault better for everyone!

### Types of Contributions
- Code contributions
- Bug reports
- Feature requests
- Documentation improvements
- Community support
- Testing and feedback

Thank you for contributing to MultiVault! 🚀
