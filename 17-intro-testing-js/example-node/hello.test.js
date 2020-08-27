const hello = require('./hello')

test('hello works as intended!', () => {
  expect(hello("matt")).toBe("hello matt!")
})
