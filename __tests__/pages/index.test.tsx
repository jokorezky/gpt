import React from "react";
import { test } from "uvu";
import * as assert from "uvu/assert";
import { matchMedia, setMedia } from "mock-match-media";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

import Homepage from "@/pages";

test.before((ctx) => {
  registerSuite(ctx);
  const viewportWidth = 1920;
  setMedia({
    width: viewportWidth + "px",
    type: "screen",
  });
  window.matchMedia = matchMedia;
  window.innerWidth = viewportWidth;
  window.innerHeight = 1080;
});

test.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

test("Homepage", () => {
  render(<Homepage />);
  assert.ok(screen.getByTestId("xx"));
});

test.run();
