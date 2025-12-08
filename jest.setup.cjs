const { TextEncoder, TextDecoder } = require("util");

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  // utf-8 is enough for tests
  global.TextDecoder = TextDecoder;
}
