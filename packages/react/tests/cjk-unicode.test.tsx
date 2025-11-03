import { describe, expect, it } from "bun:test"
import { withTestRender } from "../src/testing"
import React from "react"

describe("React Renderer - CJK & Unicode Support", () => {
  describe("Emoji Rendering", () => {
    it("should render basic emojis correctly", () =>
      withTestRender(React.createElement("text", null, "Hello 🌍 World 👋"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("Hello 🌍 World 👋")
      }))

    it("should render multiple emojis in list", () =>
      withTestRender(
        React.createElement(
          "box",
          null,
          React.createElement("text", null, "🚀 Rocket"),
          React.createElement("text", null, "🔥 Fire"),
          React.createElement("text", null, "✨ Sparkle"),
          React.createElement("text", null, "💯 Perfect"),
        ),
        (setup) => {
          const frame = setup.captureCharFrame()
          expect(frame).toContain("🚀")
          expect(frame).toContain("🔥")
          expect(frame).toContain("✨")
          expect(frame).toContain("💯")
        },
      ))

    it("should handle emoji with wrapping", () =>
      withTestRender(
        React.createElement(
          "text",
          { wrapMode: "word" },
          "This is a test 🌟 with emojis 🎉 that should wrap properly 🚀 across multiple lines",
        ),
        (setup) => {
          const frame = setup.captureCharFrame()
          expect(frame).toContain("🌟")
          expect(frame).toContain("🎉")
          expect(frame).toContain("🚀")
        },
      ))
  })

  describe("CJK Character Rendering", () => {
    it("should render Korean characters", () =>
      withTestRender(React.createElement("text", null, "안녕하세요 한글 테스트"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("안녕하세요")
        expect(frame).toContain("한글")
      }))

    it("should render Japanese characters", () =>
      withTestRender(React.createElement("text", null, "こんにちは テスト"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("こんにちは")
      }))

    it("should render Chinese characters", () =>
      withTestRender(React.createElement("text", null, "你好世界 中文测试"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("你好世界")
        expect(frame).toContain("中文测试")
      }))

    it("should render Vietnamese characters", () =>
      withTestRender(React.createElement("text", null, "Xin chào Tiếng Việt"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("Xin")
      }))
  })

  describe("Mixed CJK & Emoji", () => {
    it("should render mixed Korean and emoji", () =>
      withTestRender(React.createElement("text", null, "한글 🎉 테스트 ✨"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("한글")
        expect(frame).toContain("🎉")
        expect(frame).toContain("✨")
      }))

    it("should render mixed Chinese and emoji", () =>
      withTestRender(React.createElement("text", null, "中文 🌟 文本 🚀"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("中文")
        expect(frame).toContain("🌟")
        expect(frame).toContain("🚀")
      }))

    it("should render mixed Japanese and emoji", () =>
      withTestRender(React.createElement("text", null, "日本語 🎯 テスト 🌸"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("日本語")
        expect(frame).toContain("🎯")
        expect(frame).toContain("🌸")
      }))
  })

  describe("Unicode Special Characters", () => {
    it("should render combining diacriticals", () =>
      withTestRender(React.createElement("text", null, "café naïve"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("caf")
        expect(frame).toContain("na")
      }))

    it("should render arrows and symbols", () =>
      withTestRender(React.createElement("text", null, "← ↑ → ↓ ♠ ♣ ♥ ♦"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("←")
        expect(frame).toContain("♠")
      }))

    it("should render mathematical symbols", () =>
      withTestRender(React.createElement("text", null, "∑ ∏ √ ∫ ≈ ≠ ≤ ≥"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("∑")
        expect(frame).toContain("√")
      }))
  })

  describe("CJK Width Handling", () => {
    it("should properly calculate width for wide characters", () =>
      withTestRender(React.createElement("text", null, "한글한글한글"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("한글")
      }))

    it("should handle mixed width characters", () =>
      withTestRender(React.createElement("text", null, "a한b글c"), (setup) => {
        const frame = setup.captureCharFrame()
        expect(frame).toContain("한")
        expect(frame).toContain("글")
      }))
  })

  describe("Dynamic Updates", () => {
    it("should render multiple CJK text lines", () =>
      withTestRender(
        React.createElement(
          "box",
          null,
          React.createElement("text", null, "첫번째 라인"),
          React.createElement("text", null, "두번째 라인"),
        ),
        (setup) => {
          const frame = setup.captureCharFrame()
          expect(frame).toContain("첫번째")
          expect(frame).toContain("라인")
        },
      ))

    it("should render multiple emoji lines", () =>
      withTestRender(
        React.createElement(
          "box",
          null,
          React.createElement("text", null, "🎉 First Line"),
          React.createElement("text", null, "🌟 Second Line"),
        ),
        (setup) => {
          const frame = setup.captureCharFrame()
          expect(frame).toContain("🎉")
          expect(frame).toContain("🌟")
        },
      ))
  })
})
