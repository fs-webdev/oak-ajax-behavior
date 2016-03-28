module.exports = {
  plugins: {
    istanbul: {
      dir: "./coverage",
      reporters: [
        "text-summary", "lcov"
      ],
      exclude: [],
      include: [
        "**/oak-ajax-behavior.html"
      ],
    }
  }
}