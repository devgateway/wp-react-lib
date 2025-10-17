# @devgateway/wp-react-lib

## 0.4.7

### Patch Changes

- 7174745: fix env variables imports

## 0.4.6

### Patch Changes

- 2e20f93: Standardize dependencies for consitency

## 0.4.5

### Patch Changes

- 8bf45ce: Upgrade dependencies to fix CVEs

## 0.4.4

### Patch Changes

- Update version to 0.4.4
- Add missing menu and search contexts

## 0.4.3

### Patch Changes

- 7558929: Fix links and remove old process.env.VITE_REACT_APP_WP_HOSTS

## 0.4.2

### Patch Changes

- 31e237f: Add missing exports

## 0.4.1

### Patch Changes

- 7e58a8e: # Hotfix

  - Fix missing exports

## 0.4.0

### Minor Changes

- ad59d59: # Changelog

  ## Changes

  - Update Media Consumer to include type definitions.
  - Update Page Consumer to include type definitions.
  - Update Post Consumer to include type definitions.
  - Update Search Consumer to include type definitions.
  - Update Settings Consumer to include type definitions.
  - Update Taxonomy Consumer to include type definitions.

  ## New Features

  - Add Categories consumer.
  - Add date range API.
  - Add Categories provider.

## 0.3.2

### Patch Changes

- 7ce74cb: Fix localized provider by fixing the destructured props

## 0.3.1

### Patch Changes

- 7ea6235: Fix rendering issues in the replace link but handling empty values

## 0.3.0

### Minor Changes

- 78c8a42: # Changelog

  ### ⚙️ Miscellaneous Tasks

  - _(TCDICORE-234)_ Update dependencies
  - _(DVIZ-42)_ Migrate consumers and some components to typescript
  - _(DVIZ-42)_ Migrate from babel to unbuild (rollup)
  - _(DVIZ-42)_ Remove unused packages
  - UI enhancements
  - TCDICORE-146 fix double loader
  - TCDICORE-151 remove unused variables
  - TCDICORE-151 add missing env variable
  - _(TCDICORE-195)_ Add settings context export

  ### Breaking Change

  - Introduction of TypeScript support requires consumers to update their build configuration
  - TypeScript types are now available for all components and utilities

  ### 🐛 Bug Fixes

  - Issue with opening pages in some iOS devices
