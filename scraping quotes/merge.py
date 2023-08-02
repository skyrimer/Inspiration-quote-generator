import json

final_path = "./scraping quotes/out.json"
final_object = []
with open("./scraping quotes/quotes1.json", "r", encoding="utf-8") as f1:
    final_object.extend(json.load(f1))

with open("./scraping quotes/quotes2.json", "r", encoding="utf-8") as f2:
    for quote in json.load(f2):
        quote["q"] = quote["quote"]
        del quote["quote"]
        quote["a"] = quote["author"]
        del quote["author"]
        final_object.append(quote)


filtered_final_object = list(
    {dictionary["q"]: dictionary for dictionary in final_object}.values()
)

with open(final_path, "w", encoding="utf-8") as f_out:
    json.dump(final_object, f_out)
