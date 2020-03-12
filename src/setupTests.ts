/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unicorn/filename-case */

/**
 * jest-dom adds custom jest matchers for asserting on DOM nodes.
 * allows you to do things like:
 * expect(element).toHaveTextContent(/react/i)
 * learn more: https://github.com/testing-library/jest-dom
 * react-testing-library renders your components to document.body,
 * this will ensure they're removed after each test.
 */

/* this adds jest-dom's custom assertions  */
import '@testing-library/jest-dom/extend-expect'

import { matchers } from 'jest-emotion'

beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation((...arguments_) => {
    // eslint-disable-next-line no-console
    console.warn('window.fetch is not mocked for this call', ...arguments_)
    return Promise.reject(new Error('This must be mocked!'))
  })
})

afterEach(() => {
  jest.spyOn(window, 'fetch').mockRestore()
})

expect.extend(matchers)

export default undefined
