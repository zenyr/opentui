import { createCliRenderer, engine, type CliRendererConfig } from "@opentui/core"
import React, { type ReactNode } from "react"
import { AppContext } from "./components/app"
import { _render } from "./reconciler/reconciler"
import { ErrorBoundary } from "./components/error-boundary"

export type TestSetup = Awaited<ReturnType<typeof testRender>>

export async function testRender(node: ReactNode, rendererConfig: CliRendererConfig = {}) {
  const renderer = await createCliRenderer(rendererConfig)
  engine.attach(renderer)

  _render(
    React.createElement(
      AppContext.Provider,
      { value: { keyHandler: renderer.keyInput, renderer } },
      React.createElement(ErrorBoundary, null, node),
    ),
    renderer.root,
  )

  // Return a test setup compatible interface
  return {
    renderer,
    renderOnce: async () => {
      // For React, rendering is synchronous via reconciler
      await new Promise((resolve) => setTimeout(resolve, 0))
    },
    captureCharFrame: () => {
      const currentBuffer = renderer.currentRenderBuffer
      const frameBytes = currentBuffer.getRealCharBytes(true)
      const decoder = new TextDecoder()
      return decoder.decode(frameBytes)
    },
    resize: (width: number, height: number) => {
      // Resize not implemented for React test renderer
    },
  }
}

export async function withTestRender<T>(
  node: ReactNode,
  test: (setup: TestSetup) => T | Promise<T>,
  rendererConfig: CliRendererConfig = {},
): Promise<T> {
  const setup = await testRender(node, rendererConfig)
  await setup.renderOnce()
  try {
    return await test(setup)
  } finally {
    setup.renderer.destroy()
  }
}
