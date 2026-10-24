import json
import os
import re

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
BOOK_PATH = os.path.join(WORKSPACE_DIR, "src/data/books/psychologyOfMoneyExpanded.ts")

with open(BOOK_PATH, "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(export const [A-Za-z0-9_]+: Book = )", text)
prefix = m.group(1)
end_idx = text.rfind(";")
book = json.loads(text[m.end():end_idx].strip())

book.pop("subtitle", None)
book.pop("description", None)
book["onePageSummary"]["elevatorPitch"] = "Money is not a math test—it is a game of behavior! Discover the secret cheat codes of money: why nobody is crazy, why time is a giant snowball, and how true wealth is invisible freedom."
book["onePageSummary"]["coreThesis"] = "Doing well with money has little to do with being smart and almost everything to do with how you behave. Simple patience, humble living, and room for error beat fancy math every single time."

book["onePageSummary"]["executiveSummary"] = """Money is not a math test. It is a game of behavior and self-control! Most people think getting rich requires being a super-genius who memorizes giant stock charts and speaks in complicated college words. But in real life, your success with money depends almost entirely on how you act when nobody is looking.

Think of money like a video game. If you have the fanciest armor and the biggest sword, but you get greedy, run straight into a pit of spikes, or panic and drop your controller, you lose all your lives. But if you have simple gear, keep your cool, avoid silly traps, and let your gold coins grow like a giant snowball rolling down a mountain, you win the entire game!

In this book, Morgan Housel reveals the secret rules of the money game. You will discover why nobody who spends money is actually crazy, why luck and risk are identical twins, why showing off expensive toys is the quickest way to end up broke, and how the greatest prize money can ever buy isn't a sports car—it is waking up every morning with total freedom to do whatever you want."""

book["onePageSummary"]["keyPillars"] = [
    {
        "title": "Nobody Is Playing the Same Game",
        "description": "Everyone treats money based on the world they grew up in. A person who lived through hard times hides cash in their mattress; a person who grew up in boom times thinks money grows on trees. Neither is crazy—they just play different levels of the game.",
        "actionableTakeaway": "Never judge someone else's money choices, and never let strangers tell you how to play your own game."
    },
    {
        "title": "The Giant Snowball of Time",
        "description": "Warren Buffett isn't rich because he's a wizard at math. He's rich because he started rolling his money snowball when he was 10 years old and never stopped for 80 years. Time is the secret engine of wealth.",
        "actionableTakeaway": "Start saving early, even if it's just pocket change, and leave it alone to let time do the heavy lifting."
    },
    {
        "title": "Rich vs. Wealthy: The Invisible Ledger",
        "description": "Being 'rich' is showing off what you buy: the fancy sports car, the designer shoes, the big house. Being 'wealthy' is what you don't spend. Wealth is the secret freedom and peace of mind stored away in your bank account.",
        "actionableTakeaway": "Stop spending money to impress strangers who don't even care about you. True wealth is invisible."
    },
    {
        "title": "Freedom: The Ultimate Prize",
        "description": "The best thing money can buy isn't more stuff—it's time. Being able to wake up on a Tuesday morning, look at your calendar, and do whatever you want is the highest reward money will ever pay.",
        "actionableTakeaway": "Save money so you can buy your own freedom, control your calendar, and choose what you want to do each day."
    },
    {
        "title": "Pack an Extra Shield (Room for Error)",
        "description": "Life loves throwing surprise curveballs. The world is full of things that have never happened before. If your plan only works when everything is perfect, your plan will fail.",
        "actionableTakeaway": "Always keep an emergency stash of safe cash so a bad surprise can never knock you out of the game."
    }
]

book["onePageSummary"]["frameworkSteps"] = [
    {
        "step": 1,
        "name": "Draw Your 'Enough' Finish Line",
        "summary": "Decide what makes you happy and stop moving the goalposts every time you score.",
        "executionTip": "Write down the simple things that make life awesome so you never risk your happiness chasing things you don't need."
    },
    {
        "step": 2,
        "name": "Save Like a Smart Squirrel",
        "summary": "Saving money is the only part of finance you can 100% control, regardless of what the stock market does.",
        "executionTip": "Put away 20% of whatever money you get automatically before you even have a chance to spend it."
    },
    {
        "step": 3,
        "name": "Aim for Good Sleep, Not Perfect Math",
        "summary": "A simple plan that lets you sleep like a baby beats a fancy plan that makes you panic when prices drop.",
        "executionTip": "Keep enough cash in a safe place so you never have to worry or sell your investments during scary times."
    },
    {
        "step": 4,
        "name": "Pay the Roller Coaster Ticket",
        "summary": "Ups and downs in investing are not a punishment or a police fine—they are just the ticket price for the ride.",
        "executionTip": "When your investments dip, remind yourself: 'This is just the bumpy part of the roller coaster ride.'"
    },
    {
        "step": 5,
        "name": "Stick to Your Own Video Game",
        "summary": "Never copy what other people are doing with their money—they have totally different goals and time horizons.",
        "executionTip": "Ignore loud people bragging on social media; your game is measured in decades, not daily clicks."
    }
]

# 20 Chapters rewritten with 10-year-old boy readability, fun hooks, and zero PhD syllabus tone
chapters = [
    {
        "ch": 1,
        "headline": "Chapter 1: No One's Crazy — The Secret Game Everyone Plays",
        "takeaway": "Nobody is crazy with money; people make choices based on the world they saw growing up.",
        "audio": "Chapter 1. No One's Crazy. People make weird money choices because their childhood was totally different from yours. Nobody is nuts; we just play different levels of the game.",
        "insight": "Here is a crazy truth: your entire life is less than a tiny speck of dust in history, but your brain acts like it knows everything about how money works!\n\nIf you grew up when prices were shooting up like rockets, you want to spend your cash fast before it buys less. If you grew up when tech apps were booming, you think investing is a magical candy machine. Nobody is crazy. Everyone is just playing by the rules of whatever world they were born into. Stop getting mad at people who handle money differently—their game had completely different weather than yours!",
        "content": "Have you ever seen someone do something totally bonkers with their money and thought, \"Are they completely nuts?!\"\n\nWell, here is a giant secret: nobody is actually crazy.\n\nImagine you grew up on a weird planet where it rained chocolate milk every Tuesday. If someone from a dry desert planet visited you and saw you placing giant buckets in your yard, they would think you lost your mind. But on your planet, catching chocolate rain is totally normal!\n\nThat is how money works. Your personal life experience is just a tiny speck of dust—less than 0.00000001% of all history. But inside your head, it feels like 80% of how the whole universe operates.\n\nIf your grandpa was a kid when banks broke and money disappeared into thin air, he might hide dollar bills inside his socks like a squirrel hiding nuts. If your big cousin grew up when video games and tech apps were booming, he thinks investing is a cheat code that gives you free gold coins every day.\n\nNeither of them is stupid. They just grew up in different video games with totally different rules! Next time you see someone spend or save money in a way that looks totally weird, don't laugh. Just ask yourself: \"What game did they grow up playing?\""
    },
    {
        "ch": 2,
        "headline": "Chapter 2: Luck & Risk — The Tale of Two Geniuses",
        "takeaway": "Luck and risk are identical twins: forces you can't control shape your results. Never let success make you arrogant or failure make you give up.",
        "audio": "Chapter 2. Luck & Risk. Bill Gates attended the only school in the world with a computer, while his equally brilliant best friend died in a freak accident. Luck and risk are twins.",
        "insight": "Whenever someone gets rich, they write a 400-page book explaining how their 4:00 AM ice showers made them a genius. But in 1968, out of 300 million kids on Earth, only ONE school had a computer. Bill Gates went to that school!\n\nHis best buddy Kent Evans went there too. Kent was just as brilliant as Bill, but died in a freak mountain accident before graduation. Bill got hit by one-in-a-million good luck; Kent got hit by one-in-a-million bad luck. Both had the same talent and grit. Next time you see someone winning or losing big, remember: hard work matters, but luck is always flipping an invisible coin behind your back!",
        "content": "Imagine you play a video game, beat the final boss, and win first place. You feel awesome, right? You brag to your friends, \"I won because I am a master gamer!\" But what if your controller had lagged and you lost? You would scream, \"That lag was totally unfair!\"\n\nWe do this all the time. When things go great, we think we are superheroes. When things go wrong, we blame bad luck.\n\nHere is a true story that will blow your mind. In 1968, there were 300 million kids going to school in the world. But only ONE high school on planet Earth had a real computer: a school in Seattle called Lakeside.\n\nAn eighth-grader named Bill Gates went to that exact school. He fell in love with coding and later built Microsoft. Bill Gates himself said: \"If there was no Lakeside computer, there would be no Microsoft.\" What were the chances of Bill being at that one school? About one in a million. That was incredible, magical luck!\n\nNow meet his best friend, Kent Evans. Kent was just as smart as Bill. They stayed up late coding together and planned to conquer the tech world side-by-side. But before high school graduation, Kent died in a freak mountain accident. The odds of a teenager dying on a mountain in America? Also about one in a million.\n\nBill got hit by one-in-a-million good luck. Kent got hit by one-in-a-million terrible risk. Both were equally smart. Both worked equally hard.\n\nWhenever you see a billionaire on YouTube bragging about their morning routine, or someone who lost their business, remember this rule: nothing in life is ever quite as good or as bad as it looks. The universe is always tossing an invisible coin behind your back."
    },
    {
        "ch": 3,
        "headline": "Chapter 3: Never Enough — The Man with $100 Million in Prison",
        "takeaway": "Never risk what you already have and love for something you don't even need. The greatest trap is moving your finish line.",
        "audio": "Chapter 3. Never Enough. Rajat Gupta had $100 million, yet went to prison for cheating because he wanted to be a billionaire. If you don't know when to stop, greed will ruin you.",
        "insight": "Imagine having $100 million in the bank and still feeling like a total loser because your neighbor owns a bigger yacht!\n\nThat is what happened to Rajat Gupta. He was rich enough to buy his own tropical island, but he got jealous of billionaires, cheated on secret stock trades, and landed in a federal prison in an orange jumpsuit. The single most dangerous trap in the world is moving your own goalposts. If you run faster every time you score, you will end up exhausted and do something crazy. Knowing when you have \"enough\" is the real cheat code to life!",
        "content": "How much money would you need before you looked around and said, \"Okay, I am totally happy and I don't need any more\"?\n\nMost people think the answer is: \"Just a little bit more than whatever I have right now!\" And that is how people ruin their lives.\n\nMeet a man named Rajat Gupta. He was super smart. He grew up as an orphan in India, worked hard, and became the top boss of the world's most famous consulting company, McKinsey. He sat in fancy meetings with presidents and lived in mansions. He had over $100 million.\n\nIf you had $100 million, you could buy sports cars, giant mansions, and all the video games in the world, and you would never run out of money. But Rajat hung out with billionaires who had $5 billion. Because they had more than him, he felt poor!\n\nSo during a big bank panic in 2008, he heard secret insider news before anyone else. He picked up his phone and leaked the secret so his friend could make a fast trade. The police caught him. Rajat was sent straight to prison in an orange jumpsuit. His whole life and reputation were wrecked forever.\n\nWhy would someone with $100 million risk going to jail for a tiny bit of extra cash? Because he never learned the superpower word: \"Enough\".\n\nA famous writer once went to a party thrown by a billionaire. A friend asked him, \"How does it feel that this billionaire made more money yesterday than all your books made in your entire life?\" The writer smiled and said, \"I have something he will never have: enough.\"\n\nIf you keep moving your finish line every time you score, you will keep running until you fall off a cliff. The richest person in the room is not the one with the most toys—it is the one who knows when to stop wanting more."
    },
    {
        "ch": 4,
        "headline": "Chapter 4: The Giant Snowball — Warren Buffett's 80-Year Secret",
        "takeaway": "The secret to wealth isn't crazy high returns—it's letting your money grow for decades without interrupting it.",
        "audio": "Chapter 4. Confounding Compounding. Warren Buffett started investing at age 10; over 99% of his fortune came after age 50. Time is the giant snowball that builds real wealth.",
        "insight": "Everyone thinks Warren Buffett is rich because he has super-brain stock picking powers. Nope!\n\nHis actual secret? He started investing when he was literally 10 years old, and he is still doing it in his nineties. Over 99% of his fortune came after he turned 50! It's like rolling a snowball down a huge hill. If you roll it for three minutes, it's just a slushy baseball. If you roll it for 80 years, it turns into an avalanche that can flatten a village. Patience is the real superpower.",
        "content": "Here is a fun riddle: Would you rather have $1 million in cash right now, or a single magic penny that doubles in value every single day for 30 days?\n\nMost people pick the million dollars. But let's see what happens to the magic penny! On day 5, you only have 16 cents. On day 10, you have about $5. It feels boring, right? But on day 20, you have over $5,000. And on day 30, that single penny turns into more than $5 million!\n\nThat magic trick is called \"compounding\". It is just like rolling a snowball down a giant snowy mountain. At first, it is tiny, like an apple. But as it rolls and rolls without stopping, every roll picks up more snow, until it becomes a giant boulder as big as a house!\n\nWarren Buffett is one of the richest people on Earth. Thousands of people write books trying to guess his secret math formulas. But his real secret is ridiculously simple: he started rolling his snowball when he was 10 years old, and he never stopped!\n\nOver 99% of all of Warren Buffett's billions came AFTER his 50th birthday. If he had started investing at age 30 like most grown-ups and retired at 60, hardly anyone would have ever heard his name.\n\nYou don't need to be an evil genius or find crazy magic stocks. You just need to build a snowball, roll it down a long hill, and never push it into a wall. Time does all the heavy lifting for you."
    },
    {
        "ch": 5,
        "headline": "Chapter 5: Getting Rich vs. Staying Rich — The Power of Survival",
        "takeaway": "Getting money requires courage and big swings; keeping money requires staying humble and avoiding dangerous traps.",
        "audio": "Chapter 5. Getting Wealthy vs. Staying Wealthy. Trader Jesse Livermore made $100M in a day and then lost it all; Warren Buffett survived by refusing to borrow dangerous money.",
        "insight": "Getting rich and staying rich are two completely different sports! Getting rich is like sprinting fast in a race: you take big risks and swing for the fences. Staying rich is like surviving a zombie apocalypse: you need to be careful, humble, and carry extra supplies.\n\nIn 1929, a famous trader named Jesse Livermore made $100 million in a single day by betting against the stock market. Four years later, he borrowed too much money, lost every single penny, and had nothing left. Warren Buffett survived for decades because he refused to borrow money that could wipe him out. Winning the game means staying on the board!",
        "content": "Getting rich and staying rich sound like the exact same thing, but they are totally different skills!\n\nGetting rich is like being an awesome attacker in soccer: you run fast, take shots, and take big risks. But staying rich is like being the goalie: your only job is to stop bad things from scoring on you. If you only know how to attack and you leave your goal wide open, one bad kick will destroy you.\n\nBack in 1929, the entire American stock market crashed. While people were crying, a trader named Jesse Livermore made $100 million in cash in a single afternoon by making a super bold bet! He walked home as one of the richest men on Earth.\n\nBut Jesse didn't know how to play defense. He kept borrowing huge piles of money to make even bigger bets. Four years later, the market turned against him. He lost every single dollar he had and ended up totally broke.\n\nNow look at Warren Buffett and his partner Charlie Munger. In the 1960s, they had a third partner named Rick Guerin who was just as smart as them. But Rick borrowed money to buy more stocks fast. When the market dipped, the lenders forced Rick to sell his shares at rock-bottom prices. He got knocked out of the game.\n\nBuffett survived because he never borrowed dangerous money. He had what we call \"survival superpower\". In the money game, you don't win by scoring the fastest goal; you win by never getting kicked off the field."
    },
    {
        "ch": 6,
        "headline": "Chapter 6: Tails, You Win — Why You Can Be Wrong Most of the Time",
        "takeaway": "You can mess up 90% of your bets and still win big if your few rare winners hit the jackpot.",
        "audio": "Chapter 6. Tails, You Win. An art dealer bought thousands of paintings; 99% were junk, but the 1% of Picassos made him a billionaire. You can fail often and still win.",
        "insight": "Did you know you can be flat-out wrong half the time—or even 90% of the time—and still make a giant fortune? Look at Amazon: they blew hundreds of millions of dollars on the Fire Phone, a disaster so awful that nobody bought it.\n\nDid Jeff Bezos cry and go bankrupt? Nope! Because a couple of his other ideas—like Amazon Prime and AWS—were such colossal monster hits that they paid for all the failed experiments and minted billions. A tiny handful of superstar hits drives almost all success in the universe. Don't worry about making little mistakes; you just need one or two giant winners!",
        "content": "Imagine you are playing a video game where you open 100 mystery treasure chests. Ninety of them contain boring rocks, five have a few silver coins, and two have legendary magic diamonds worth a billion gold pieces!\n\nEven though 90 of your chests were total duds, you still end up rich because the rare magic diamonds pay for everything else. That is how the world works, and it is called \"Tails, You Win\".\n\nThere was once an art dealer named Heinz Berggruen. He bought thousands of paintings over his lifetime. Most of the art he bought was boring junk that nobody cared about. But among the piles of art, he bought a tiny handful of paintings by Pablo Picasso. Years later, those Picassos were worth over $100 million! He wasn't a magic fortune teller; he just bought lots of art and let his few superstar paintings carry the whole team.\n\nThe exact same thing happens with giant companies. In 2014, Amazon spent hundreds of millions of dollars building the \"Fire Phone\". It was an embarrassing flop! Nobody wanted it, and warehouses were packed with unsold phones.\n\nDid Amazon go out of business? No way! Because around the same time, Amazon created cloud servers called AWS. That one single idea made hundreds of billions of dollars, paying for every failed experiment ten times over.\n\nYou don't need every decision you make to be a winner. In business and investing, a few superstar hits will pay for all your clumsy flops."
    },
    {
        "ch": 7,
        "headline": "Chapter 7: Freedom — The Best Superpower Money Can Buy",
        "takeaway": "The greatest prize of wealth isn't fancy toys—it is the power to wake up and control your own time.",
        "audio": "Chapter 7. Freedom. More than fast sports cars or giant mansions, controlling your time is the highest dividend of wealth. Owning your calendar is true riches.",
        "insight": "The ultimate luxury money can buy is not a gold watch or a sports car with doors that open like wings. The ultimate prize is waking up on a random Tuesday, looking at the ceiling, and realizing: \"I can do whatever the heck I want today!\"\n\nScientists studied human happiness for decades, and guess what? Expensive clothes and giant houses don't make people happy for long. The one thing that truly makes people happy is autonomy: owning your own time. When you save money, you are not missing out on shopping—you are buying chunks of your future freedom!",
        "content": "What is the coolest thing in the world you could buy if you had a giant mountain of money? A sports car? A helicopter? A private island with a roller coaster?\n\nThose sound fun for about a week. But here is the real answer: the coolest thing money can buy is **your own time**.\n\nImagine two different people:\n\nPerson A earns $300,000 a year as a fancy corporate lawyer. But he has to work 16 hours every day, his boss yells at him on Saturdays, and he never has time to play soccer or hang out with his kids. He has lots of cash, but zero control over his life.\n\nPerson B earns $70,000 a year building fun website apps from home. He saved up enough money to live for two years without working. If he wants to sleep in, take a walk in the woods, or build a lego castle on a Wednesday afternoon, he can just do it!\n\nWho is actually wealthier? Person B! Person A has golden handcuffs; Person B owns his own calendar.\n\nScientists did huge studies asking thousands of people what made them truly happy. It wasn't fancy cars or luxury vacations. It was the feeling of waking up in the morning and saying: \"I am in control of my day today.\" Every dollar you save is like a little shield of freedom for your future."
    },
    {
        "ch": 8,
        "headline": "Chapter 8: The Man in the Car Paradox — The Shiny Car Trick",
        "takeaway": "Nobody is impressed by your expensive things as much as you are; people look at the shiny toy and imagine themselves in it.",
        "audio": "Chapter 8. The Man in the Car Paradox. When you see a Ferrari, you don't admire the driver; you imagine people admiring you. Expensive stuff doesn't buy respect.",
        "insight": "When you see someone driving a neon-green Lamborghini down the street, what do you think? Do you look at the driver and say, \"Wow, that guy must be so kind and wise\"? Of course not! You don't even look at the driver's face!\n\nInstead, you imagine *yourself* in the driver's seat, daydreaming about how cool everyone would think YOU are. That is the funny trick of luxury goods: people spend fortunes trying to get strangers to admire them, but the strangers are completely ignoring them and daydreaming about themselves! If you want real respect, try kindness and humor; loud cars won't buy you any of it.",
        "content": "When Morgan Housel was in college, he worked as a valet parking fancy cars at a luxury hotel in Los Angeles. People drove up in gleaming Ferraris, Lamborghinis, and Rolls-Royces worth hundreds of thousands of dollars.\n\nAs a car fan, Housel noticed something funny that happens to human brains every single day:\n\nWhenever someone pulled up in a gorgeous red Ferrari, Housel never once looked at the person behind the wheel and thought: \"Wow, that driver must be so smart, generous, and awesome!\"\n\nInstead, he looked at the shiny car and instantly imagined **himself** driving it! He thought: \"Man, if I were driving that car, everybody on the sidewalk would think I was the coolest guy on Earth!\"\n\nThink about how crazy that is! The person who bought the Ferrari spent $300,000 because they wanted other people to respect and admire them. But when other people see the car, they don't admire the driver at all! They completely ignore the driver and just imagine themselves in the seat.\n\nPeople buy expensive clothes, giant watches, and fancy cars because they want love, respect, and friends. But shiny toys don't make people respect you. Being a good friend, telling the truth, and being fun to be around will win you a million times more respect than any sports car ever could."
    },
    {
        "ch": 9,
        "headline": "Chapter 9: Wealth Is What You Don't See — Rich vs. Wealthy",
        "takeaway": "Rich is visible spending; wealth is unspent money that gives you options and safety.",
        "audio": "Chapter 9. Wealth is What You Don't See. Spending money to show people you have money is the fastest way to have less. True wealth is the freedom hidden in your bank.",
        "insight": "We have a backwards habit of judging people by what we can see: their leased SUV, their fancy sneakers, their luxury watches. But here is simple math: spending money to show people how much money you have is literally the fastest way to have less money!\n\nBeing \"rich\" is loud spending right now. Being \"wealthy\" is the money you chose *not* to spend. It is the secret power in your bank account that lets you sleep peacefully and make moves whenever you want. Next time you see a $100,000 sports car, the only thing you know for sure is that the owner has $100,000 less than before they bought it!",
        "content": "Imagine you see a kid walk into school wearing brand-new $500 designer sneakers, holding the newest iPad, and showing off a fancy jacket. You might think, \"Whoa, that kid's family must be super wealthy!\"\n\nMaybe. But maybe not! Here is the difference between two words people mix up all the time: **Rich** and **Wealthy**.\n\n- **Rich** is what you see. Rich is buying the fancy sports car, eating at expensive restaurants, and wearing designer logos. Rich is loud because people spend their money to show it to you.\n\n- **Wealthy** is what you DON'T see. Wealth is the car you didn't buy, the expensive jacket you left in the store, and the cash quietly growing in a bank account. Wealth is money you kept so you have freedom.\n\nThink about the math: If someone buys a $100,000 sports car, the only thing you know with 100% certainty is that their bank account now has $100,000 less than before!\n\nSpending money to prove you have money is the fastest way to run out of money. Building wealth is hard because you can't see other people's savings accounts. You only see what they spend. But remember: true wealth is like an invisible superpower that protects you from life's storms."
    },
    {
        "ch": 10,
        "headline": "Chapter 10: Save Money — The Only Superpower You 100% Control",
        "takeaway": "Your savings rate matters more than picking hot stocks. You don't need a specific reason to save—unallocated savings buys you independence.",
        "audio": "Chapter 10. Save Money. You don't need a specific goal like a car to save money. Saving just to save buys you secret options and peace of mind.",
        "insight": "Most finance experts say you should only save money if you have a goal—like buying a house or fixing a broken computer. Throw that idea out the window! Save money just for the pure joy of saving.\n\nWhy? Because the biggest curveballs life throws at you will be things you never saw coming! You don't need an excuse to stockpile cash. Unspent savings is pure superpower: it's the freedom to walk away from bad situations, wait out scary storms, and jump on awesome opportunities when everyone else is panicking.",
        "content": "Turn on financial news and you will hear people shouting about complicated things: which stock will jump tomorrow, what the government will do, or when the next big crash is coming.\n\nHere is a secret: nobody actually knows! But there is one thing in money that you have 100% control over: **how much money you save**.\n\nCompare two people:\n\nPerson A earns $500,000 a year, but spends $480,000 on luxury mansions, fancy parties, and private jets. He only saves $20,000.\n\nPerson B earns $80,000 a year, lives happily in a modest house, and saves $30,000 a year.\n\nPerson B is building wealth faster than Person A, even though Person A makes six times more salary! It doesn't matter how much water flows into your bucket if your bucket is full of giant holes.\n\nAnd here is the best part: you don't even need a specific reason to save! People usually save for a new bike or a college degree. But saving just to save is the best trick of all. Having a stash of cash buys you options. It gives you the power to say \"no\" to bad deals and sleep peacefully no matter what happens."
    },
    {
        "ch": 11,
        "headline": "Chapter 11: Reasonable Beats Rational — The Sleep-at-Night Rule",
        "takeaway": "Don't try to be a cold math robot; aim for a plan that lets you sleep like a baby every night.",
        "audio": "Chapter 11. Reasonable > Rational. Personal finance isn't a spreadsheet; it's about sleeping at night. An emotional plan you can stick with beats a robot formula you quit.",
        "insight": "College professors love writing complex formulas showing how humans should behave like cold calculating robots. They will show you proofs that paying off your home loan early is \"irrational\" because you could make 2% more in the stock market. But Morgan Housel paid off his home loan anyway! Why?\n\nBecause spreadsheets don't cure insomnia, and spreadsheets don't hug you when the market crashes 40%! Being emotionally \"reasonable\" is what keeps you from panicking and selling all your investments when fear hits. The best money plan isn't the one with the highest math score—it's the one that lets you sleep like a baby.",
        "content": "Math teachers love problems where there is only one perfect answer: $2 + 2 = 4$. If you answer $5$, you get a red mark.\n\nIn money, people try to act like math robots too. They use giant spreadsheets to find the \"optimal\" mathematical formula for every penny.\n\nBut here is the catch: you are a human being, not a calculator! You have feelings, bad days, worries, and fears. And when things get scary, cold robot math goes out the window.\n\nImagine you have a home loan that costs you 3% interest, and you have some extra savings. A math professor would say: \"Don't pay off your home loan! Invest that money in the stock market to earn 8%! That is mathematically rational!\"\n\nSounds smart on paper, right? But what if the stock market plunges 40%, you lose your job, and you can't sleep at night because you are terrified of losing your house? In that moment, having zero debt and owning your home free and clear feels like the greatest superpower on Earth!\n\nMorgan Housel paid off his mortgage early, even though a math robot would call it sub-optimal. Why? Because it let him sleep like a baby.\n\nNever pick a money strategy that looks brilliant on a spreadsheet but makes you sweat bullets in bed. Being reasonable always beats being a robot."
    },
    {
        "ch": 12,
        "headline": "Chapter 12: Surprise! — The Day the Giant Wave Arrived",
        "takeaway": "History is full of surprises that never happened before. Never assume the worst past event is the worst that can ever happen.",
        "audio": "Chapter 12. Surprise! Fukushima's seawall was built to stop the biggest wave in history, but a wave twice as big hit it. The future doesn't care about past records.",
        "insight": "Investors love staring at historical charts from the past 50 years to guess what will happen next. But the most important events in history are always the ones that NEVER happened before!\n\nThink about the Fukushima nuclear plant in Japan: engineers built a 19-foot wall based on the biggest tsunami ever recorded in historical records. Then in 2011, a 46-foot monster wave crashed right over it! They prepared for the past, but the future had zero obligation to copy old records. Always leave room for wild surprises.",
        "content": "Have you ever played a game with a friend who says, \"I know what move you're going to make because you made it last time\"? And then you do something totally unexpected and win?\n\nThe future does that to humans all the time.\n\nPeople love studying history books to predict what will happen to money. They say, \"The worst stock crash in history was 40%, so we only need to prepare for a 40% drop!\"\n\nThat is a dangerous trap. Consider the true story of the Fukushima nuclear power plant in Japan. The engineers wanted to protect the plant from tsunamis (giant ocean waves). So they checked hundreds of years of history and found the biggest wave ever recorded was about 19 feet high. So they built a giant concrete seawall 19 feet tall! They thought: \"We are 100% safe!\"\n\nThen in 2011, a massive earthquake shook the ocean. A monster tsunami rolled in that was 46 feet high! It surged straight over the wall and caused a terrible disaster.\n\nWhat went wrong? The engineers assumed that the worst thing that happened in the past was the worst thing that could ever happen in the future! But every record was once a brand-new surprise that had never happened before.\n\nHistory is a study of surprises. When planning your money, always remember: the craziest event of tomorrow isn't in yesterday's history book."
    },
    {
        "ch": 13,
        "headline": "Chapter 13: Room for Error — The Secret Extra Shield",
        "takeaway": "Always plan for things to go wrong. A good plan doesn't rely on being right; it relies on surviving being wrong.",
        "audio": "Chapter 13. Room for Error. The secret to winning in poker and investing isn't having the best cards—it's having enough chips to survive when bad luck strikes.",
        "insight": "The most important part of any plan is planning on your plan not going according to plan! Sounds like a tongue-twister, right?\n\nIf your plan requires everything in the world to go 100% right—no sick days, no broken cars, no stock crashes—your plan is going to get smashed to pieces. Room for error is like packing an extra shield and extra health potions before entering a video game dungeon. It doesn't mean you expect to lose; it means you want to make sure a single surprise hit doesn't give you Game Over!",
        "content": "Imagine you are building a bridge out of popsicle sticks for a school science contest. If your toy truck weighs 2 pounds, do you build a bridge that can hold exactly 2 pounds?\n\nNo way! If a gust of wind blows or you drop the truck a little too hard, SNAP! Your bridge breaks.\n\nYou build a bridge that can hold 10 pounds! That extra strength is called a **margin of safety** or \"room for error\".\n\nIn video games, before you face a tough boss, you don't walk in with 1 health point and zero healing potions. You pack extra potions, put on your strongest armor, and save your game. Why? Because you might make a mistake, or the boss might hit you with a surprise critical attack!\n\nMoney works the exact same way. Many people make money plans that only work if everything goes perfectly: their job never cuts pay, their car never breaks down, and the stock market never dips.\n\nThat is like driving without a seatbelt because you don't plan on crashing! Smart money players always keep extra cash that sits around doing \"nothing\". It feels lazy, but that cash is your invisible shield. It gives you the power to survive bad luck so you can keep playing."
    },
    {
        "ch": 14,
        "headline": "Chapter 14: You Will Change — The Future You Trap",
        "takeaway": "The person you are today will want totally different things in 10 or 20 years. Avoid making extreme, inflexible plans.",
        "audio": "Chapter 14. You'll Change. Remember what you loved five years ago? You probably think it's silly now. Future You will change just as much, so keep your plans flexible.",
        "insight": "Think back to when you were 5 years old. What did you want to be when you grew up? A dinosaur? A pirate? A professional superhero?\n\nNow look at yourself today—you probably want completely different things! But here is the trick our brains play on us: we know we changed a lot in the past, but we mistakenly think who we are today is who we will be forever! When you plan your money, don't trap yourself in extreme corners. Keep your life flexible, because Future You will have totally different dreams than Present You.",
        "content": "Think back to what your favorite cartoon, toy, or food was five years ago. Do you still play with the exact same toys every day? Probably not! You grew up and your tastes changed.\n\nNow, here is a funny trick your brain plays on you: psychologists call it the \"End of History Illusion\".\n\nWe look back at our past and laugh: \"Haha, I can't believe I used to dress like that or love that silly baby show!\" But then we look at who we are today and think: \"Okay, NOW I know who I am, and I will be like this forever!\"\n\nNope! You will change just as much in the next 10 years as you did in the last 10 years.\n\nThis makes planning for money tricky. A young college kid might say: \"I will work 90 hours a week for my entire life because I love hustle!\" Then at age 35, he has kids and wants nothing more than to play in the yard with them.\n\nOr someone says, \"I will live super cheap and only eat ramen noodles forever!\" Then at age 40, they want a comfortable home.\n\nTo avoid getting trapped, don't make extreme money choices. Don't work yourself to exhaustion, and don't be so cheap that you hate your life. Balance is key. Keep your options open so Future You has the freedom to change their mind."
    },
    {
        "ch": 15,
        "headline": "Chapter 15: Nothing's Free — The Roller Coaster Ticket",
        "takeaway": "Market drops and bumpy rides are not a punishment or a fine—they are the price of admission for long-term growth.",
        "audio": "Chapter 15. Nothing's Free. Stock market drops aren't a police fine for doing something wrong; they are just the ticket price you pay to ride the wealth roller coaster.",
        "insight": "Imagine going to Disneyland, getting on the biggest, scariest roller coaster, and when it drops 100 feet down, you scream: \"This is terrible! Call the police!\"\n\nThat sounds ridiculous, right? The drops and loops are the whole reason you bought the ticket! But when the stock market dips 20%, people freak out and act like they are being punished with a fine. Market ups and downs are not a fine; they are the ticket price of building wealth. If you want the thrill of compound growth, you have to be willing to stomach the drops!",
        "content": "Imagine you walk into a store and see a shiny new bike for $200. You have three choices:\n\n1. You can pay $200 and ride the bike home.\n2. You can decide not to buy it and walk home.\n3. Or you can sneak it out the back door and try to steal it!\n\nIf you steal it, the police will catch you and throw you in jail. Nobody wants that.\n\nNow think about investing money. You want your money to grow 10% a year so you can become wealthy. But that growth comes with a price tag! The price tag isn't paid in dollars; it is paid in **fear, uncertainty, and roller-coaster drops**.\n\nEvery few years, the stock market drops 20% or 30%. The news starts shouting: \"The world is ending! Sell everything!\"\n\nPeople treat that drop like a **fine**—like a police officer giving them a speeding ticket for doing something bad. So they panic and sell all their investments to make the pain stop.\n\nThat is a huge mistake! Don't look at market drops like a fine. Look at them like an **admission ticket** to a theme park! When you get on a giant roller coaster, you don't sue the park when the coaster drops into a dark tunnel. You hold on tight and enjoy the ride. Market dips are just the ticket price of wealth."
    },
    {
        "ch": 16,
        "headline": "Chapter 16: You & Me — Stop Copying People in Different Games",
        "takeaway": "Never take money cues from someone playing a different game with different rules and timelines.",
        "audio": "Chapter 16. You & Me. A day trader buying a stock for three minutes is playing a different game than you saving for thirty years. Don't copy their homework.",
        "insight": "Imagine you are playing a peaceful game of Minecraft building a giant brick castle, and your friend comes in playing Call of Duty throwing smoke grenades and shouting! If you start throwing grenades at your own castle, you are going to blow up your hard work!\n\nThis happens in finance every single day. Long-term savers look at crazy internet day-traders who buy hype stocks for 10 minutes, and they try to copy them. Never take advice from someone playing a different game with different rules and different time limits than yours!",
        "content": "Imagine you are in math class taking a test on fractions. The kid next to you is taking a totally different test on world history. If you peek over at his desk and copy \"Napoleon invaded Russia in 1812\" as your answer to $3/4 + 1/2$, your teacher is going to give you a big red zero!\n\nCopying someone who is playing a different game is silly. But people do it with money all the time.\n\nThink about the stock market. You might buy shares in a great company because you want your money to grow for the next 20 years. That's your game.\n\nNow enter a day-trader. He doesn't care if the company makes great products or will exist in 20 years. He just wants the stock price to tick up by 1% in the next five minutes so he can sell it and buy lunch! He is playing a game of hot potato.\n\nIf the day-trader bids the price way up, and you see it and think, \"Whoa, everyone is buying this stock, I should buy it too!\"—you just copied the history test answers for your fraction test!\n\nAlways know what game you are playing. If you are a long-term builder, ignore the noise of short-term gamblers."
    },
    {
        "ch": 17,
        "headline": "Chapter 17: The Lure of Pessimism — Why Bad News Sounds Smart",
        "takeaway": "Bad news happens in an afternoon and gets loud headlines; progress happens in quiet inches over decades. Don't let doom-and-gloom fool you.",
        "audio": "Chapter 17. The Seduction of Pessimism. If someone says a crash is coming, they sound like a genius; if someone says things will get better, they sound naive. But progress always wins.",
        "insight": "Why does bad news always sound so much smarter than good news? If someone tells you, \"Tomorrow the stock market will crash and civilization will collapse!\", everyone listens to them like a wise prophet.\n\nIf you tell someone, \"In the next 20 years, technology and medicine will get 10 times better!\", they pat you on the head and call you a naive kid. But look at history: bad disasters happen in a single afternoon (plane crashes, market panics), while awesome miracles happen in quiet 1% steps that never make the daily news. Pessimism sounds smart, but optimism builds the future!",
        "content": "Have you ever noticed that scary movie villains always sound super serious and intelligent, while happy cheerful characters are treated like silly clowns?\n\nThat happens in real life too.\n\nIf someone stands up on TV and says, \"A terrible catastrophe is coming, the economy will crash, and everyone will lose their jobs!\", people listen in terror and say, \"Wow, that guy is a brilliant expert.\"\n\nBut if someone says, \"Actually, over the next twenty years, human beings will invent amazing new medicines, clean energy, and cool tech, and things will get much better!\", people roll their eyes and say, \"What a dreamer.\"\n\nWhy does bad news sound so smart? Because bad things happen fast! A plane crash, a hurricane, or a stock crash happens in an afternoon. It makes giant, terrifying news headlines.\n\nGood things happen slowly! If doctors cure a disease or engineers make computer chips 1% faster every month, nobody writes a giant headline on Monday morning saying: \"Today computer chips got 0.03% better!\"\n\nYet over 20 or 30 years, those tiny quiet improvements add up to miracles like smartphones, electric cars, and longer lifespans. Don't let gloomy people scare you out of the game. Progress is quiet, but it always wins."
    },
    {
        "ch": 18,
        "headline": "Chapter 18: When You'll Believe Anything — The Stories We Tell",
        "takeaway": "When you desperately want something to be true, you will believe almost any story. Beware the stories your brain invents.",
        "audio": "Chapter 18. When You'll Believe Anything. In a crisis, people believe crazy fairy tales because they want a simple answer. Stories run the world more than spreadsheets.",
        "insight": "Think about alien conspiracy theories or magic get-rich-quick schemes. Why do smart people fall for them? Because when you desperately want something to be true, your brain turns off its BS detector and believes whatever story makes you feel safe!\n\nIn 1918, during the terrible Spanish Flu pandemic, people bought snake oil and wore bags of smelly garlic around their necks because they were desperate for a cure. In finance, when people want easy riches, they fall for crazy hype coins and scam artists. Always ask yourself: \"Am I believing this because it's true, or because I really, really want it to be true?\"",
        "content": "Imagine you have a big spelling test tomorrow that you completely forgot to study for. You are terrified. Then an older kid comes up to you and says, \"Hey, if you put this magic purple pebble in your pocket, you will get an A+ on every test without studying! Only costs $5.\"\n\nNormally, you know that pebbles don't make you smart. But because you are desperate and scared, a little voice in your head whispers: \"What if it works?!\"\n\nThat is how human brains work: **When we desperately want something to be true, we will believe almost any story.**\n\nDuring wars, health panics, and financial crashes, people get terrified. When people are scared, they stop looking at facts and start following anyone who promises a simple fairy tale. In investing, people who want to get rich quick fall for fake gurus, lottery tickets, and crazy scam investments because they want the story to be true so badly.\n\nAlso, remember that you only see a tiny fraction of the world, but your brain makes up stories to fill in the blanks. Be humble. Admit that you don't know everything, and don't let wishful thinking trick you into doing something silly."
    },
    {
        "ch": 19,
        "headline": "Chapter 19: All Together Now — The Master Cheat Codes",
        "takeaway": "Keep your ego small, save money without a reason, let your snowball roll, and embrace the roller coaster ride.",
        "audio": "Chapter 19. All Together Now. A quick summary of the whole game: be humble, save money, be patient, and remember that true wealth is freedom, not showing off.",
        "insight": "Here are the master cheat codes to the whole money game in one neat little package: Keep your ego small. Don't buy shiny toys to impress strangers who don't care. Save like a squirrel. Let your compounding snowball roll for decades without stopping. Pack an extra shield for surprise storms. And remember: the best prize on Earth is owning your own time!",
        "content": "Let's put all the pieces of the puzzle together! If you had to put all the secret cheat codes of money on a single note card to keep in your pocket, here is what it would say:\n\n1. **Be Humble**: You are never as smart when you win or as foolish when you lose as you think. Luck and risk are always flipping coins.\n\n2. **Less Ego, More Wealth**: Saving money is the gap between your ego and your income. Stop buying expensive stuff to show off to strangers.\n\n3. **Sleep-at-Night Metric**: Manage your money so you can sleep like an exhausted puppy every single night. If an investment keeps you awake, sell it.\n\n4. **Extend Your Time Horizon**: The biggest cheat code in the universe is time. A tiny snowball rolling for 50 years beats an Olympic sprinter who runs for five minutes.\n\n5. **Accept the Price**: Ups and downs are the ticket price for growth. Don't run away when the roller coaster dips—just hold on tight.\n\n6. **Define 'Enough'**: The fastest way to ruin a great life is moving your finish line every time you score. Learn to love what you have.\n\nFollow these rules, and you won't just build wealth—you will build a happy, awesome life."
    },
    {
        "ch": 20,
        "headline": "Chapter 20: Confessions — How the Author Actually Lives",
        "takeaway": "True financial success isn't about bragging or beating the market; it's about independent living and peace of mind.",
        "audio": "Chapter 20. Confessions. Morgan Housel reveals his own financial setup: he paid off his house, keeps lots of cash, and invests simply in index funds for freedom.",
        "insight": "At the end of the book, Morgan Housel reveals how he actually manages his own family's money. Does he have a secret bat-cave with 50 stock screens and trading algorithms? Nope!\n\nHe paid off his house mortgage so he owes zero debt to anyone. He keeps a huge pile of cash in a boring bank account for peace of mind. And he puts the rest into simple, low-cost index funds that he never touches. He doesn't care about beating other people; he only cares about sleeping well and owning his time. That is true wealth!",
        "content": "After writing an entire book about the psychology of money, people always ask author Morgan Housel: \"Okay, so what do you actually do with your own money?\"\n\nDo you think he has a secret high-tech room with flashing stock tickers, making trades every five seconds like in the movies?\n\nNot at all! His real personal setup is ridiculously simple:\n\nFirst, he and his wife paid off their house completely. Math professors would tell him that was \"irrational\" because mortgage rates were low. But Morgan says: \"It gave us a feeling of independent freedom that is worth more than any stock return.\"\n\nSecond, they keep a surprisingly large amount of cash sitting in a safe bank account. It doesn't earn much interest, but it means that if something crazy happens in the world, they will never have to panic or sell their investments.\n\nThird, every other dollar goes into simple, low-cost index funds that buy a tiny slice of the entire American and global economy. He never tries to guess which stock will win next month. He just buys, holds, and goes out to play with his kids.\n\nHis goal isn't to look rich or impress strangers. His goal is independence. And that is the biggest lesson of all: the best money plan is the one that gives you peace, freedom, and a happy life."
    }
]

# Update blinks
for i, ch_data in enumerate(chapters):
    if i < len(book["blinks"]):
        b = book["blinks"][i]
        b["headline"] = ch_data["headline"]
        b["keyTakeaway"] = ch_data["takeaway"]
        b["audioSnippetText"] = ch_data["audio"]
        b["keyInsight"] = ch_data["insight"]
        b["content"] = ch_data["content"]

# Update Idea Cards to be fun and 10yo friendly
if "ideaCards" in book and book["ideaCards"]:
    for card in book["ideaCards"]:
        if "body" in card:
            card["body"] = card["body"].replace("macroeconomic", "big money").replace("epistemic", "knowledge").replace("heuristic", "rule of thumb").replace("dichotomy", "difference")

output_code = "import { Book } from '../../types';\n\n" + prefix + json.dumps(book, indent=2) + ";\n"

with open(BOOK_PATH, "w", encoding="utf-8") as f:
    f.write(output_code)

print("Successfully updated psychologyOfMoneyExpanded.ts with fun, 10yo style!")
