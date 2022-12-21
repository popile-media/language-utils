# @popile/language-utils <!-- omit in toc -->

[![npm version](https://img.shields.io/npm/v/@popile/language-utils.svg)](https://npmjs.com/package/@popile/language-utils)
[![Build and Deploy](https://github.com/popile-media/language-utils/actions/workflows/build_and_deploy.workflow.yml/badge.svg)](https://github.com/popile-media/language-utils/actions/workflows/build_and_deploy.workflow.yml)
[![codecov](https://codecov.io/gh/popile-media/language-utils/branch/main/graph/badge.svg?token=4G9ZHBL8UA)](https://codecov.io/gh/popile-media/language-utils)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![license](https://img.shields.io/npm/l/@popile/language-utils.svg)](https://github.com/popile-media/language-utils/blob/master/LICENSE)

> Language utilities

## Installation

```bash
npm i @popile/language-utils
```

## Usage

```javascript
import { Turkish } from '@popile/language-utils';

// returns -> ['Si', 'ne', 'ma']
Turkish.spelling('Sinema');

// returns -> Ali'ye
new Turkish('Ali').dative().toString();

// returns -> Ali'den
new Turkish('Ali').ablative().toString();

// returns -> Ali'de
new Turkish('Ali').locative().toString();

// returns -> Ali'yi
new Turkish('Ali').accusative().toString();
```
