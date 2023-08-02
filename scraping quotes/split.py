import json

with open("./scraping quotes/out.json", "r", encoding="utf-8") as f_out:
    quotes = json.load(f_out)
    for index, quote in enumerate(quotes):
        with open(
            f"./scraping quotes/split into files/quotes_data/quote_{index}.json",
            "w",
            encoding="utf-8",
        ) as f_quote:
            json.dump(quote, f_quote)
