import json
import re

with open("src/data/allSeededBooks.json", "r") as f:
    books = json.load(f)

pom = next(b for b in books if "psychology-of-money" in b.get("id", ""))

insights = [
    # Ch 1
    "Here is a wild truth: your entire lifetime experience makes up roughly 0.00000001% of everything that has ever happened in the global economy, but you use it to explain about 80% of how you think the world works!\n\nIf you came of age during the brutal 1970s inflation, you look at bonds like radioactive garbage. If you graduated college during the 1990s tech boom, you think stocks are a magical piñata that showers you with free money every quarter. Neither person is crazy—we are all just emotional prisoners of whatever the market was doing when we were nineteen years old and trying to figure out how to pay rent. Stop expecting everyone to agree with your spreadsheet logic; their financial trauma was forged in a completely different galaxy than yours.",
    # Ch 2
    "Whenever an entrepreneur strikes it rich, we publish 400-page biographies praising their superhuman discipline and 4:00 AM ice baths. When someone goes bankrupt, we lecture them on reckless risk-taking. But here is the jaw-dropping reality: in 1968, there were roughly 303 million high-school-aged kids on Earth. Exactly one high school on the entire planet—Lakeside in Seattle—had the money and audacity to buy a computer teletype.\n\nBill Gates went there. His brilliant best friend Kent Evans went there too. Gates hit the one-in-a-million lottery of luck and founded Microsoft. Evans hit the one-in-a-million tragedy of risk and died in a mountaineering accident before finishing high school. Both had the exact same genius, grit, and drive. The line between being hailed as a visionary genius and being forgotten as an overconfident casualty is often just a chaotic coin toss by the universe.",
    # Ch 3
    "How does an executive with a $100 million net worth, a Manhattan penthouse, and seats on the world's most powerful corporate boards end up wearing an orange prison jumpsuit? Meet Rajat Gupta, former global head of McKinsey and board member at Goldman Sachs. He had enough cash to buy small Caribbean islands, yet he looked at billionaire hedge fund titans and felt like a humiliated pauper!\n\nSo he illegally leaked Warren Buffett's confidential $5 billion investment in Goldman Sachs just to turn an obscene fortune into a slightly more obscene fortune—and nuked his entire life in the process. The single most dangerous financial trap is letting the goalpost sprint away every time you kick a goal. If your expectations rise at the exact same speed as your income, you are trapped on a gilded hamster wheel where the only possible grand finale is doing something utterly reckless to impress people who aren't even watching.",
    # Ch 4
    "Prepare to have your mind completely blown: Warren Buffett is worth over $100 billion, but more than 99% of that staggering fortune arrived *after* his 50th birthday, and over 95% came after he turned 65!\n\nIf Buffett had retired at age 60 like a sensible human to play bridge and practice his golf swing, his net worth would have peaked at around $11 million. You would literally never have heard of him! His entire superpower isn't that he's a sorcerer at picking stocks; it's that he has been investing continuously since he was ten years old. Human brains are physically hardwired for linear math (1 + 1 + 1), so exponential math (10 x 10 x 10) feels like alien magic. You don't need astronomical, heroic returns to become outrageously wealthy; you just need decent returns and the stubborn refusal to ever interrupt the compounding machine.",
    # Ch 5
    "Getting wealthy and staying wealthy are two completely different sports requiring diametrically opposite personalities! Getting rich requires swinging for the fences, taking bold risks, and radiating relentless optimism. Staying rich requires borderline clinical paranoia, terrifying humility, and the acute realization that everything you built could vanish before breakfast.\n\nDuring the 1929 stock market crash, while ruined Wall Street tycoons were leaping out of hotel windows, legendary speculator Jesse Livermore made $100 million in cash in a single afternoon by shorting stocks. He was one of the richest men on Earth. Yet within four short years, his aggressive optimism drove him to total financial ruin, and he took his own life. The ultimate key to financial survival isn't chasing the highest score; it's making yourself so financially bulletproof that bad luck never has the power to wipe you off the board.",
    # Ch 6
    "You can be flat-out wrong 50% of the time—or even 90% of the time—and still make an obscene fortune! Look at Amazon: they blew hundreds of millions of dollars on humiliating disasters like the Amazon Fire Phone, which was so universally despised they had to write off warehouses full of unsold plastic.\n\nDid Jeff Bezos go broke? Not even close! Because a tiny handful of outlier \"tail events\"—Amazon Web Services (AWS) and Amazon Prime—succeeded so colossally that they wiped out thousands of failures and minted billions in profit. Most of life and investing works this way: a microscopic fraction of days, decisions, and investments drive 99% of all lifetime returns. Stop beating yourself up over your frequent misses; your job is simply to survive long enough to let your rare tail-winners carry the entire show.",
    # Ch 7
    "The ultimate luxury that wealth can buy is not a sports car with butterfly doors, a private jet, or a Rolex encrusted with diamonds. The ultimate dividend money pays is waking up on a random Tuesday, staring at the ceiling, and realizing: \"I can do whatever the heck I want today.\"\n\nDecades of psychological research on human happiness reveal that the single most dependable predictor of joy is not salary, job title, or house square footage—it is having total autonomy over your calendar. When money buys you shiny objects, it gives you a five-minute dopamine spike followed by immediate hedonic boredom. When money buys you control over your time, it buys you the priceless sovereignty of owning your own life.",
    # Ch 8
    "When you see a guy roaring down the street in a sleek, neon-green $300,000 Lamborghini, what is your immediate reaction? Do you stare at the driver and think, \"Wow, that man is so deep, cultured, and spiritually accomplished\"? Of course you don't! You don't give a damn about the driver; you don't even look at his face!\n\nInstead, you immediately imagine *yourself* behind the wheel, basking in the imaginary admiration of onlookers. This is the great irony of luxury spending: we buy expensive status symbols to demand love and admiration from strangers, completely oblivious to the fact that those strangers are ignoring us entirely and using our toys to daydream about themselves! If genuine respect is what you seek, try humility, integrity, and kindness; high-octane horsepower won't get you an ounce of it.",
    # Ch 9
    "We have an absurd, backward habit of judging people's financial success by what we can see: their leased German SUV, their bespoke tailored suits, their lavish vacation photos. But here is the brutal mathematical reality: spending money to show people how much money you have is literally the quickest way on Earth to have less money!\n\nRichness is current income on loud, flamboyant display; wealth is financial freedom quietly hidden beneath the surface. Wealth is the sports car you chose not to buy, the first-class ticket you skipped, the designer watch you left in the store, and the portfolio you left untouched to compound. The next time you see someone driving a $100,000 sports car, the only factual piece of data you actually possess is that their bank account has $100,000 less than it did before they signed the lease.",
    # Ch 10
    "Most personal finance advice tells you that you should only save money if you have a specific goal—like buying a house, replacing a broken transmission, or funding a dream wedding. Morgan Housel says: throw that entire concept out the window! Save money just for the pure, unadulterated joy of saving.\n\nWhy? Because the most expensive and consequential curveballs of your future life will be events that you are currently incapable of predicting! You don't need a specific justification to stockpile cash. Unallocated savings is pure financial ammunition: it is the freedom to tell a toxic boss to take a hike, the patience to wait out a terrifying market crash, and the liquidity to seize once-in-a-decade opportunities that desperate, cash-strapped people are forced to walk past.",
    # Ch 11
    "Academic finance professors love writing equations assuming human beings are cold, spreadsheet-optimizing androids. They will show you mathematical proofs demonstrating that paying off a 3% mortgage is \"financially irrational\" because you could earn 8% in the stock market. But Morgan Housel paid off his 3% mortgage anyway! Why? Because a spreadsheet doesn't tuck your children into bed, and a spreadsheet cannot cure a panic attack when the stock market drops 40%!\n\nAiming to be mathematically \"rational\" looks brilliant on paper, but being emotionally \"reasonable\" is what keeps you from panic-selling your entire life savings at the terrifying bottom of a crash. The best financial strategy is never the one with the highest theoretical return; it is the one that lets you sleep like an exhausted baby every single night.",
    # Ch 12
    "Here is the great tragicomedy of Wall Street: analysts spend millions of dollars meticulously studying 150 years of stock charts to predict what will happen next year. But history is, by definition, the study of unprecedented surprises!\n\nThe most monumental economic events in modern memory—the Great Depression, World War II, the rise of the personal computer, the 2008 subprime implosion, the COVID-19 pandemic—had exactly zero historical precedent right before they blindsided the world. Treating historical market charts as a prophetic roadmap for the future is like driving at 80 miles per hour down a foggy highway while staring exclusively into your rearview mirror. History teaches us how humans behave when terrified or greedy, but it will never tell you what the next giant surprise will look like.",
    # Ch 13
    "The single most critical element of any financial plan is planning on your plan not going according to plan! Civil engineers understand this intuitively: if a suspension bridge only needs to support 10,000-pound delivery trucks, they don't design it to hold 10,000 pounds—they build it to hold 60,000 pounds because they know that bizarre, unforeseen weather and freak accidents happen.\n\nYet in personal finance, people borrow up to their eyeballs, budget down to the last penny, and assume their salary will grow in a smooth, uninterrupted diagonal line for the next thirty years. Building a margin of safety isn't an admission of defeat; it is the humble admission that reality does not give a damn about your neat spreadsheet. If your plan requires everything to go perfectly to succeed, you aren't planning—you are gambling with your family's future.",
    # Ch 14
    "Psychologists have identified a hilarious mental blind spot called \"The End of History Illusion.\" We all look back at who we were a decade ago and laugh at our awful hairstyles, questionable fashion choices, and cringeworthy priorities. Yet we look in the mirror today and confidently proclaim: \"Yup, this is the final, finished masterpiece of me; I will never change again!\"\n\nThen we lock ourselves into 30-year career paths and rigid lifestyle blueprints that our future self will look at with profound horror. Human desires evolve continuously. If you want a durable financial life, avoid extreme bets—like working 90-hour weeks for thirty years or surviving on instant ramen so you can retire at age 27—because the stranger you become tomorrow will want a totally different life than the person you are today.",
    # Ch 15
    "When you take your family to an amusement park, you don't scream at the ticket booth attendant when they charge you for admission; you gladly hand over your cash because you know rollercoasters cost money! But when the stock market plunges 20% and temporarily vaporizes $40,000 of your portfolio, investors scream and panic as if they just got slapped with a fraudulent parking ticket!\n\nMorgan Housel offers a transformative mental paradigm shift: market volatility is not a fine for doing something wrong; it is simply the price of admission for capturing compounding wealth over a lifetime. If you want the outsized long-term returns of equities, you must pay the emotional entrance fee: stomach-churning dips, headlines predicting the apocalypse, and sleepless nights. Pay the fee with a smile, stay on the rollercoaster, and stop trying to sneak in through the exit gate.",
    # Ch 16
    "Picture an Olympic marathon runner in the middle of a 26-mile race taking pacing advice from a 100-meter sprinter who just sprinted past them at top speed—it would be pure lunacy! Yet investors commit this exact comedy every single morning.\n\nA day trader buying a speculative tech stock at 9:35 AM does not care about price, dividends, or ten-year earnings; they only care whether the stock ticks up 40 cents before 9:42 AM so they can flip it for a quick profit. When a 30-year retirement investor looks at that surging price, gets infected with FOMO, and buys at the peak, financial disaster is practically guaranteed. You cannot take investment cues from someone who is playing an entirely different sport with a completely different time horizon. Know your own game, write your own rules, and ignore the cheerleaders on adjacent fields.",
    # Ch 17
    "Go on television and announce that the global economy is about to collapse into a fiery inferno, and people will call you a prophetic genius, shower you with book deals, and invite you to prestigious conferences. Go on television and state that human ingenuity will quietly compound and solve problems over the next thirty years, and people will pat you on the head and dismiss you as a naive toddler!\n\nPessimism always sounds infinitely smarter than optimism because disasters happen overnight in dramatic, terrifying headlines, while progress happens in slow, invisible, daily increments that are too boring to make the news. A factory closing or a bank failing takes twenty minutes to report; the quiet compounding of medicine, computing power, and agricultural efficiency takes decades. Optimism is not blind cheerleading; it is the historical recognition that human problem-solving compounds faster than human stupidity.",
    # Ch 18
    "Why did rational people buy worthless tulip bulbs in 1637, hollow dot-com companies with zero revenue in 1999, and cartoon digital monkey jpegs in 2021? Because when people are desperate to get rich without working, their analytical brains pack their bags and leave the building!\n\nThe more desperately you crave a specific outcome to be true, the more vulnerable you become to believing an absurd, impossible fairy tale that promises guaranteed riches with zero downside. We crave certainty in a chaotic, random universe, so we invent seductive stories to convince ourselves we understand what is coming next. But that vast canyon between what you desperately want to believe and what is cold, objective reality is the exact graveyard where every speculative bubble, financial scam, and personal bankruptcy is born.",
    # Ch 19
    "If you took every heavyweight finance textbook, business school lecture, and Wall Street trading handbook and threw them into a roaring fireplace, what essential wisdom would survive the ashes? It wouldn't be complex Black-Scholes options formulas, discounted cash flow spreadsheets, or macroeconomic forecasting models.\n\nIt would be this timeless, simple formula: conquer your ego, live comfortably below your means, give compounding decades to do its invisible magic, and make financial choices that let you sleep peacefully at night. Outsized financial success is not an intellectual competition of raw IQ—in fact, brilliant people regularly destroy themselves through overconfidence. It is purely an emotional game of patience, humility, and staying power.",
    # Ch 20
    "Here is the ultimate, refreshingly candid confession from Morgan Housel himself: despite spending his entire professional career analyzing high-finance data, his personal balance sheet is so simple it would make an aggressive Wall Street hedge fund manager laugh out loud!\n\nHe paid off his low-rate mortgage because he cherished the psychological euphoria of being 100% debt-free. He hoards an uncomfortably huge mountain of cash in basic bank accounts, earning virtually nothing, purely for emotional peace of mind. And nearly all of his equity wealth sits in boring, low-cost index funds. He doesn't pick hot stocks, he doesn't try to time market bottoms, and he doesn't try to beat the market. His goal is not to be the richest man in the cemetery; it is to be financially unbreakable so he can live life strictly on his own terms."
]

def clean_quotes(s):
    if not isinstance(s, str):
        return s
    # Convert **"text"** or **'text'** to "text"
    s = re.sub(r'\*\*"([^"]+)"\*\*', r'"\1"', s)
    s = re.sub(r"\*\*\'([^\']+)\'*\*", r'"\1"', s)
    # Convert **phrase with quote or statement** to "phrase"
    def fix_bold(m):
        inner = m.group(1).strip()
        if len(inner.split()) > 3 or any(p in inner for p in [".", ",", "!", "?", "'", '"']):
            clean_inner = inner.strip('"').strip("'")
            return f'"{clean_inner}"'
        return f"**{inner}**"
    s = re.sub(r"\*\*([^\*\n]+)\*\*", fix_bold, s)
    return s

for i, b in enumerate(pom["blinks"]):
    b["keyInsight"] = insights[i]
    b["content"] = clean_quotes(b.get("content", ""))
    b["keyTakeaway"] = clean_quotes(b.get("keyTakeaway", ""))
    b["audioSnippetText"] = clean_quotes(b.get("audioSnippetText", ""))

for s in pom.get("stories", []):
    s["narrative"] = clean_quotes(s.get("narrative", ""))

for ic in pom.get("ideaCards", []):
    ic["headline"] = clean_quotes(ic.get("headline", ""))
    ic["body"] = clean_quotes(ic.get("body", ""))
    if "quote" in ic and ic["quote"]:
        q = ic["quote"].strip()
        if not q.startswith('"') and not q.startswith("“"):
            q = f'"{q}"'
        ic["quote"] = q

header = """import type { Book } from "../../types/index.ts";

export const PSYCHOLOGY_OF_MONEY_BOOK: Book = """

output_ts = header + json.dumps(pom, indent=2, ensure_ascii=False) + ";\n"
with open("src/data/books/psychologyOfMoneyExpanded.ts", "w") as f:
    f.write(output_ts)

print("Updated psychologyOfMoneyExpanded.ts successfully! Blinks:", len(pom["blinks"]))

