# One Word for Your Wi-Fi

[![make.fun](https://make.fun/badge/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72.svg)](https://make.fun/bounty/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)
[![Rank](https://make.fun/badge/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72/Cm11w/one-word-for-your-wi-fi/rank.svg)](https://make.fun/bounty/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)
[![Reward](https://make.fun/badge/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72/Cm11w/one-word-for-your-wi-fi/reward.svg)](https://make.fun/bounty/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)

## The entry

**Peekaboo** — one word, 8 characters.

Home Wi-Fi keeps vanishing and reappearing: there one second, gone the
next, back again when you least expect it. Exactly like a game of
peekaboo. Funny at once, true to how home Wi-Fi actually behaves, a
fresh angle, and it works instantly as a single word — and as a network
name.

## How it works

`main.ts` (Node, no dependencies, no network) writes the word to
`/output/entry.txt` and validates it against the competition gate first:

- UTF-8 text, 1–20 characters (this entry: 8)
- not only white space
- a single word, no white space

Run it with:

```sh
node main.ts
```

It is fully deterministic: every run writes the exact same bytes.

## Bounty

[One Word for Your Wi-Fi — $2](https://make.fun/bounty/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)

## License

MIT — see [LICENSE](LICENSE).
