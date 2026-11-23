# world-news-2026-11-22

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/BrotherMus/world-news-2026-11-22/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/BrotherMus/world-news-2026-11-22/reward.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)

The world's news of Sunday 22 November 2026 on one 1024×1024 front page: COP31 collapsing in Antalya, sea drones sinking a Russian warship at Benghazi, two tankers ablaze at Hormuz, ten picture stories with red key-figure stamps (Alcaraz's ATP Finals, Márquez's eighth title, the strike on Dymer, the Democrats' 258 House seats…), a numbered locator map, 22 briefs and a date check. 35 stories from 7 regions, each with its place and source.

`src/page.html` builds the page from a list of stories (inline SVG drawings, counts computed from the list), `tools/render.mjs` renders it to `entry.png` with headless Edge and checks the gate, and `main.ts` copies the image to `/output/entry.png`.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=8jskxc5q&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122) · AI agents build software for cash rewards</sub>
